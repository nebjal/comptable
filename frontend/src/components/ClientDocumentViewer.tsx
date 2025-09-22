import { useState } from 'react';
import {
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Grid,
  List,
  Upload
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';

// Importer le type DocumentData depuis DocumentViewer
interface DocumentData {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'Prêt' | 'En traitement' | 'Erreur';
  googleDriveId?: string;
  category: string;
  description?: string;
  format?: string;
}

interface ClientDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  category: string;
  status: 'validated' | 'processing' | 'rejected';
  uploadedAt: string;
  description?: string;
  format: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  documents: ClientDocument[];
}

export default function ClientDocumentViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewerDoc, setViewerDoc] = useState<DocumentData | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Données simulées des documents du client
  const documents: ClientDocument[] = [
    // Documents de revenus
    {
      id: 'd1',
      name: 'Déclaration de revenus 2024',
      type: 'Déclaration de revenus',
      size: 245000,
      category: 'revenus',
      status: 'validated',
      uploadedAt: '2025-01-15',
      description: 'Déclaration d\'impôt sur le revenu 2024',
      format: 'pdf'
    },
    {
      id: 'd2',
      name: 'Bulletins de salaire Décembre 2024',
      type: 'Bulletin de salaire',
      size: 180000,
      category: 'revenus',
      status: 'validated',
      uploadedAt: '2025-01-10',
      description: 'Salaire mensuel décembre 2024',
      format: 'pdf'
    },
    {
      id: 'd3',
      name: 'Bulletins de salaire Novembre 2024',
      type: 'Bulletin de salaire',
      size: 175000,
      category: 'revenus',
      status: 'validated',
      uploadedAt: '2025-01-08',
      description: 'Salaire mensuel novembre 2024',
      format: 'pdf'
    },
    {
      id: 'd4',
      name: 'Revenus locatifs Appartement Paris',
      type: 'Revenus locatifs',
      size: 320000,
      category: 'revenus',
      status: 'processing',
      uploadedAt: '2025-01-12',
      description: 'Revenus locatifs appartement Paris 2024',
      format: 'pdf'
    },

    // Justificatifs de dépenses
    {
      id: 'd5',
      name: 'Facture Électricité Décembre 2024',
      type: 'Facture',
      size: 95000,
      category: 'depenses',
      status: 'validated',
      uploadedAt: '2025-01-05',
      description: 'Facture électricité appartement',
      format: 'pdf'
    },
    {
      id: 'd6',
      name: 'Note de frais Restaurant Client',
      type: 'Note de frais',
      size: 45000,
      category: 'depenses',
      status: 'validated',
      uploadedAt: '2025-01-03',
      description: 'Dîner d\'affaires avec client Dupont',
      format: 'pdf'
    },
    {
      id: 'd7',
      name: 'Facture Fournitures Bureau',
      type: 'Facture',
      size: 125000,
      category: 'depenses',
      status: 'processing',
      uploadedAt: '2025-01-14',
      description: 'Achat de fournitures de bureau',
      format: 'pdf'
    },
    {
      id: 'd8',
      name: 'Reçu Assurance Habitation',
      type: 'Assurance',
      size: 78000,
      category: 'depenses',
      status: 'validated',
      uploadedAt: '2025-01-07',
      description: 'Prime annuelle assurance habitation',
      format: 'pdf'
    },

    // Relevés bancaires
    {
      id: 'd9',
      name: 'Relevé Banque Populaire Décembre 2024',
      type: 'Relevé bancaire',
      size: 500000,
      category: 'banque',
      status: 'processing',
      uploadedAt: '2025-01-16',
      description: 'Relevé de compte principal décembre 2024',
      format: 'pdf'
    },

    // Documents fiscaux
    {
      id: 'd10',
      name: 'Justificatif Réduction Impôt',
      type: 'Justificatif fiscal',
      size: 312500,
      category: 'fiscaux',
      status: 'rejected',
      uploadedAt: '2025-01-11',
      description: 'Justificatifs pour réduction d\'impôt 2024',
      format: 'pdf'
    },

    // Autres documents
    {
      id: 'd11',
      name: 'Contrat Assurance Vie',
      type: 'Contrat',
      size: 850000,
      category: 'autres',
      status: 'validated',
      uploadedAt: '2025-01-09',
      description: 'Contrat d\'assurance vie 2024',
      format: 'pdf'
    },
    {
      id: 'd12',
      name: 'Attestation Employeur',
      type: 'Attestation',
      size: 120000,
      category: 'autres',
      status: 'processing',
      uploadedAt: '2025-01-13',
      description: 'Attestation de l\'employeur pour prêt',
      format: 'pdf'
    },
    {
      id: 'd13',
      name: 'CV Mis à Jour',
      type: 'CV',
      size: 550000,
      category: 'autres',
      status: 'validated',
      uploadedAt: '2025-01-06',
      description: 'Curriculum vitae actualisé 2025',
      format: 'pdf'
    }
  ];

  const categories: DocumentCategory[] = [
    {
      id: 'revenus',
      name: 'Documents de revenus',
      icon: '💰',
      description: 'Bulletins de salaire, revenus locatifs, etc.',
      color: 'bg-green-100 text-green-800 border-green-200',
      documents: documents.filter(doc => doc.category === 'revenus')
    },
    {
      id: 'depenses',
      name: 'Justificatifs de dépenses',
      icon: '💳',
      description: 'Factures, reçus, notes de frais',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      documents: documents.filter(doc => doc.category === 'depenses')
    },
    {
      id: 'banque',
      name: 'Relevés bancaires',
      icon: '🏦',
      description: 'Relevés de compte, virements',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      documents: documents.filter(doc => doc.category === 'banque')
    },
    {
      id: 'fiscaux',
      name: 'Documents fiscaux',
      icon: '📋',
      description: 'Déclarations, justificatifs fiscaux',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      documents: documents.filter(doc => doc.category === 'fiscaux')
    },
    {
      id: 'autres',
      name: 'Autres documents',
      icon: '📁',
      description: 'Documents divers',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      documents: documents.filter(doc => doc.category === 'autres')
    }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'validated':
        return 'Validé';
      case 'processing':
        return 'En traitement';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'validated':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTotalStats = () => {
    const totalDocs = documents.length;
    const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
    const validated = documents.filter(doc => doc.status === 'validated').length;
    const processing = documents.filter(doc => doc.status === 'processing').length;
    const rejected = documents.filter(doc => doc.status === 'rejected').length;

    return { totalDocs, totalSize, validated, processing, rejected };
  };

  const getCategoryStats = (categoryDocs: ClientDocument[]) => {
    return {
      total: categoryDocs.length,
      validated: categoryDocs.filter(doc => doc.status === 'validated').length,
      processing: categoryDocs.filter(doc => doc.status === 'processing').length,
      rejected: categoryDocs.filter(doc => doc.status === 'rejected').length,
      totalSize: categoryDocs.reduce((sum, doc) => sum + doc.size, 0)
    };
  };

  const handleViewDocument = (doc: ClientDocument) => {
    // Convertir le document au format attendu par DocumentViewer
    const viewerDocument: DocumentData = {
      id: doc.id,
      name: doc.name,
      type: doc.category === 'revenus' ? 'bulletin_paie' :
            doc.category === 'depenses' ? 'facture' :
            doc.category === 'banque' ? 'releve_bancaire' :
            doc.category === 'fiscaux' ? 'declaration_fiscale' :
            doc.category === 'autres' ? 'contrat' : 'autre',
      size: formatFileSize(doc.size),
      date: doc.uploadedAt,
      status: doc.status === 'validated' ? 'Prêt' :
              doc.status === 'processing' ? 'En traitement' : 'Erreur',
      category: doc.category,
      description: doc.description,
      format: doc.format
    };

    setViewerDoc(viewerDocument);
    setIsViewerOpen(true);
  };

  const handleDownload = (doc: ClientDocument) => {
    // Simulation du téléchargement
    const element = document.createElement('a');
    const file = new Blob(['Contenu du document ' + doc.name], { type: doc.format });
    element.href = URL.createObjectURL(file);
    element.download = doc.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredDocuments = selectedCategory
    ? documents.filter(doc =>
        doc.category === selectedCategory &&
        (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header avec statistiques globales */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mes Documents Déposés</h1>
            <p className="text-gray-600 mt-1">
              {stats.totalDocs} document(s) • {formatFileSize(stats.totalSize)} au total
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Déposer un document</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans mes documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Vue Dossiers */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryStats = getCategoryStats(category.documents);

            return (
              <div
                key={category.id}
                className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                  selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{categoryStats.total} document(s)</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-400">{categoryStats.total}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Validés:</span>
                      <span className="font-semibold text-green-600">{categoryStats.validated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">En traitement:</span>
                      <span className="font-semibold text-yellow-600">{categoryStats.processing}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rejetés:</span>
                      <span className="font-semibold text-red-600">{categoryStats.rejected}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="text-gray-600">Taille totale:</span>
                      <span className="text-gray-900">{formatFileSize(categoryStats.totalSize)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vue Liste des documents */}
      {(viewMode === 'list' || selectedCategory) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCategory
                  ? categories.find(cat => cat.id === selectedCategory)?.name
                  : 'Tous mes documents'
                }
              </h3>
              <div className="flex items-center space-x-2">
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    ← Retour aux dossiers
                  </button>
                )}
                <span className="text-sm text-gray-600">
                  {filteredDocuments.length} document(s)
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getStatusIcon(doc.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>Déposé le {formatDate(doc.uploadedAt)}</span>
                        <span>{doc.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusLabel(doc.status)}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Visualiser"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      <DocumentViewer
        document={viewerDoc}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setViewerDoc(null);
        }}
      />
    </div>
  );
}
