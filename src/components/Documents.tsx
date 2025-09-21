import React, { useState } from 'react';
import { Plus, Search, Upload, Download, Eye, FileText, Image, File } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface Document {
  id: string;
  name: string;
  type: 'facture' | 'releve_bancaire' | 'bulletin_paie' | 'declaration_fiscale' | 'contrat' | 'autre';
  client: string;
  clientId: string;
  dateRecu: string;
  dateTraitement?: string;
  status: 'en_attente' | 'en_cours' | 'traite' | 'archive';
  taille: string;
  format: string;
  ocrStatus: 'en_cours' | 'complete' | 'erreur' | 'non_requis';
  metadonnees: {
    montant?: number;
    devise?: string;
    dateDocument?: string;
    numeroReference?: string;
  };
}

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'd1',
      name: 'Facture Fournisseur 001',
      type: 'facture',
      client: 'Entreprise ABC',
      clientId: 'c1',
      dateRecu: '2025-09-10',
      status: 'en_attente',
      taille: '1.2 MB',
      format: 'svg',
      ocrStatus: 'en_cours',
      metadonnees: { montant: 1200, devise: 'CAD', numeroReference: 'F-001' },
    },
    {
      id: 'd2',
      name: 'Relevé Bancaire Août',
      type: 'releve_bancaire',
      client: 'Entreprise ABC',
      clientId: 'c1',
      dateRecu: '2025-09-05',
      status: 'traite',
      taille: '800 KB',
      format: 'svg',
      ocrStatus: 'complete',
      metadonnees: {},
    },
    {
      id: 'd3',
      name: 'Bulletin de Paie Juillet',
      type: 'bulletin_paie',
      client: 'Consultant DEF',
      clientId: 'c2',
      dateRecu: '2025-08-31',
      status: 'archive',
      taille: '350 KB',
      format: 'pdf',
      ocrStatus: 'non_requis',
      metadonnees: {},
    },
    {
      id: 'd4',
      name: 'Déclaration Fiscale 2024',
      type: 'declaration_fiscale',
      client: 'Entreprise XYZ',
      clientId: 'c3',
      dateRecu: '2025-09-01',
      status: 'en_cours',
      taille: '2.1 MB',
      format: 'pdf',
      ocrStatus: 'en_cours',
      metadonnees: {},
    },
  ]);
  const [viewerDoc, setViewerDoc] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs: Document[] = Array.from(files).map((file, idx) => ({
      id: Date.now().toString() + idx,
      name: file.name,
      type: 'autre',
      client: 'Nouveau Client',
      clientId: 'c0',
      dateRecu: new Date().toISOString().slice(0, 10),
      status: 'en_attente',
      taille: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      format: file.type.split('/')[1] || 'pdf',
      ocrStatus: 'en_cours',
      metadonnees: {},
    }));
    setDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    if (viewerDoc && viewerDoc.id === id) {
      setViewerDoc(null);
      setIsViewerOpen(false);
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'tous' || document.type === filterType;
    const matchesStatus = filterStatus === 'tous' || document.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'facture': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'releve_bancaire': return <File className="w-5 h-5 text-green-600" />;
      case 'bulletin_paie': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'declaration_fiscale': return <File className="w-5 h-5 text-red-600" />;
      case 'contrat': return <FileText className="w-5 h-5 text-orange-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'facture': return 'Facture';
      case 'releve_bancaire': return 'Relevé Bancaire';
      case 'bulletin_paie': return 'Bulletin de Paie';
      case 'declaration_fiscale': return 'Déclaration Fiscale';
      case 'contrat': return 'Contrat';
      default: return 'Autre';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'traite': return 'bg-green-100 text-green-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'archive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOcrStatusBadge = (status: string) => {
    switch (status) {
      case 'complete': return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">OCR Terminé</span>;
      case 'en_cours': return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">OCR en Cours</span>;
      case 'erreur': return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Erreur OCR</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Documents</h1>
          <p className="text-gray-600 mt-2">Traitement intelligent et classification automatique</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Télécharger</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Image className="w-5 h-5" />
            <span>Numériser</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les types</option>
          <option value="facture">Factures</option>
          <option value="releve_bancaire">Relevés Bancaires</option>
          <option value="bulletin_paie">Bulletins de Paie</option>
          <option value="declaration_fiscale">Déclarations Fiscales</option>
          <option value="contrat">Contrats</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="en_cours">En cours</option>
          <option value="traite">Traité</option>
          <option value="archive">Archivé</option>
        </select>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Glissez vos documents ici</h3>
          <p className="text-gray-600 mb-4">Ou cliquez pour sélectionner des fichiers</p>
          <p className="text-sm text-gray-500">Formats supportés: PDF, JPEG, PNG • Taille max: 10 MB</p>
          <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer inline-block">
            Sélectionner Fichiers
            <input type="file" multiple accept=".pdf,.jpeg,.jpg,.png" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Documents Récents</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(document.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{document.client} • {getTypeLabel(document.type)}</p>
                      {document.metadonnees.montant && (
                        <p className="text-sm text-gray-700 mt-1 font-medium">
                          Montant: {document.metadonnees.montant.toLocaleString('fr-CA', {
                            style: 'currency',
                            currency: document.metadonnees.devise || 'CAD'
                          })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                        {document.status === 'en_attente' ? 'En Attente' :
                         document.status === 'en_cours' ? 'En Cours' :
                         document.status === 'traite' ? 'Traité' : 'Archivé'}
                      </span>
                      {getOcrStatusBadge(document.ocrStatus)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Reçu: {new Date(document.dateRecu).toLocaleDateString('fr-CA')}</span>
                      <span>Taille: {document.taille}</span>
                      <span>Format: {document.format.toUpperCase()}</span>
                      {document.metadonnees.numeroReference && (
                        <span>Réf: {document.metadonnees.numeroReference}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => {
                        setViewerDoc(document);
                        setIsViewerOpen(true);
                      }}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors" onClick={() => handleDelete(document.id)}>
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Queue */}
      {/* Document Viewer */}
      <DocumentViewer
        document={viewerDoc ? {
          id: viewerDoc.id,
          name: viewerDoc.name,
          type: viewerDoc.type,
          size: viewerDoc.taille,
          date: viewerDoc.dateRecu,
          status: viewerDoc.status === 'traite' ? 'Prêt' :
                  viewerDoc.status === 'en_cours' ? 'En traitement' : 'Erreur',
          category: viewerDoc.type,
          format: viewerDoc.format
        } : null}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setViewerDoc(null);
        }}
        clientEmail={viewerDoc?.client}
      />
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">File de Traitement OCR</h2>
        <div className="space-y-3">
          {documents.filter(doc => doc.ocrStatus === 'en_cours').map((document) => (
            <div key={document.id} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{document.name}</p>
                <p className="text-xs text-gray-600">Traitement OCR en cours...</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
