import { useState } from 'react';
import { Folder, FolderOpen, FileText, File, Image, Download, Eye, Calendar, HardDrive } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  uploadedAt: string;
  clientEmail: string;
  status: 'processing' | 'validated' | 'rejected';
}

interface DocumentLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  clientEmail: string;
}

export default function DocumentLibrary({ isOpen, onClose, clientEmail }: DocumentLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'folders' | 'list'>('folders');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  // Documents déposés (simulation - en production, ceci viendrait d'une API)
  const documents: Document[] = [
    {
      id: '1',
      name: 'Bulletin de salaire Janvier 2025.pdf',
      size: 245760,
      type: 'application/pdf',
      category: 'revenus',
      uploadedAt: '2025-01-15T10:30:00Z',
      clientEmail,
      status: 'validated'
    },
    {
      id: '2',
      name: 'Relevé bancaire Décembre 2024.pdf',
      size: 512000,
      type: 'application/pdf',
      category: 'banque',
      uploadedAt: '2025-01-14T14:20:00Z',
      clientEmail,
      status: 'processing'
    },
    {
      id: '3',
      name: 'Facture électricité Novembre 2024.pdf',
      size: 187500,
      type: 'application/pdf',
      category: 'depenses',
      uploadedAt: '2025-01-13T09:15:00Z',
      clientEmail,
      status: 'validated'
    },
    {
      id: '4',
      name: 'Déclaration revenus 2024.docx',
      size: 320000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      category: 'impots',
      uploadedAt: '2025-01-12T16:45:00Z',
      clientEmail,
      status: 'rejected'
    },
    {
      id: '5',
      name: 'Justificatif domicile.jpg',
      size: 890000,
      type: 'image/jpeg',
      category: 'autres',
      uploadedAt: '2025-01-11T11:30:00Z',
      clientEmail,
      status: 'validated'
    },
    {
      id: '6',
      name: 'Contrat assurance santé.pdf',
      size: 678000,
      type: 'application/pdf',
      category: 'autres',
      uploadedAt: '2025-01-10T13:20:00Z',
      clientEmail,
      status: 'processing'
    }
  ];

  const categories = [
    {
      id: 'revenus',
      label: 'Documents de revenus',
      color: 'bg-green-100 text-green-800',
      icon: '💰',
      description: 'Bulletins de salaire, revenus locatifs, etc.'
    },
    {
      id: 'depenses',
      label: 'Justificatifs de dépenses',
      color: 'bg-red-100 text-red-800',
      icon: '💳',
      description: 'Factures, reçus, notes de frais'
    },
    {
      id: 'banque',
      label: 'Relevés bancaires',
      color: 'bg-blue-100 text-blue-800',
      icon: '🏦',
      description: 'Relevés de compte, virements'
    },
    {
      id: 'impots',
      label: 'Documents fiscaux',
      color: 'bg-purple-100 text-purple-800',
      icon: '📋',
      description: 'Déclarations, justificatifs fiscaux'
    },
    {
      id: 'autres',
      label: 'Autres documents',
      color: 'bg-gray-100 text-gray-800',
      icon: '📁',
      description: 'Documents divers'
    }
  ];

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5 text-green-600" />;
    if (fileType === 'application/pdf') return <FileText className="w-5 h-5 text-red-600" />;
    return <File className="w-5 h-5 text-blue-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'validated': return 'Validé';
      case 'processing': return 'En traitement';
      case 'rejected': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryStats = (categoryId: string) => {
    const categoryDocs = documents.filter(doc => doc.category === categoryId);
    return {
      total: categoryDocs.length,
      validated: categoryDocs.filter(doc => doc.status === 'validated').length,
      processing: categoryDocs.filter(doc => doc.status === 'processing').length,
      rejected: categoryDocs.filter(doc => doc.status === 'rejected').length,
      totalSize: categoryDocs.reduce((sum, doc) => sum + doc.size, 0)
    };
  };

  const handleDownload = (doc: Document) => {
    // Simulation du téléchargement
    const element = document.createElement('a');
    const file = new Blob(['Contenu du document ' + doc.name], { type: doc.type });
    element.href = URL.createObjectURL(file);
    element.download = doc.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setShowViewer(true);
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    setSelectedDocument(null);
  };

  const filteredDocuments = selectedCategory
    ? documents.filter(doc => doc.category === selectedCategory)
    : documents;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Mes documents déposés</h2>
              <p className="text-sm text-gray-600">
                {documents.length} document(s) • {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))} au total
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('folders')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'folders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Dossiers
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Liste
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {viewMode === 'folders' ? (
            // Vue par dossiers
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const stats = getCategoryStats(category.id);
                const isSelected = selectedCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        {isSelected ? (
                          <FolderOpen className="w-6 h-6 text-indigo-600" />
                        ) : (
                          <Folder className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <span className="text-2xl font-bold text-gray-600">{stats.total}</span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{category.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Validés:</span>
                        <span className="font-medium text-green-600">{stats.validated}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">En traitement:</span>
                        <span className="font-medium text-yellow-600">{stats.processing}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rejetés:</span>
                        <span className="font-medium text-red-600">{stats.rejected}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t">
                        <span className="text-gray-600">Taille totale:</span>
                        <span className="font-medium">{formatFileSize(stats.totalSize)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Vue en liste
            <div className="space-y-4">
              {selectedCategory && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {categories.find(c => c.id === selectedCategory)?.label}
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Voir tous les documents
                  </button>
                </div>
              )}

              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getFileIcon(document.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{document.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatFileSize(document.size)}</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(document.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {getStatusLabel(document.status)}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(document)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleViewDocument(document)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {selectedCategory ? 'Aucun document dans cette catégorie' : 'Aucun document déposé'}
                  </h3>
                  <p className="text-gray-600">
                    {selectedCategory
                      ? 'Déposez vos premiers documents dans cette catégorie.'
                      : 'Utilisez le bouton "Déposer un document" pour commencer.'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer */}
      {selectedDocument && (
        <DocumentViewer
          document={{
            id: selectedDocument.id,
            name: selectedDocument.name,
            type: selectedDocument.category === 'revenus' ? 'bulletin_paie' :
                  selectedDocument.category === 'depenses' ? 'facture' :
                  selectedDocument.category === 'banque' ? 'releve_bancaire' :
                  selectedDocument.category === 'impots' ? 'declaration_fiscale' :
                  selectedDocument.category === 'autres' ? 'autre' : 'autre',
            size: formatFileSize(selectedDocument.size),
            date: selectedDocument.uploadedAt,
            status: selectedDocument.status === 'validated' ? 'Prêt' :
                    selectedDocument.status === 'processing' ? 'En traitement' : 'Erreur',
            category: selectedDocument.category,
            format: selectedDocument.type === 'application/pdf' ? 'pdf' :
                    selectedDocument.type.startsWith('image/') ? selectedDocument.type.split('/')[1] : 'pdf'
          }}
          isOpen={showViewer}
          onClose={handleCloseViewer}
          clientEmail={clientEmail}
        />
      )}
    </div>
  );
}
