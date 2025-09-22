import { useState, useEffect } from 'react';
import { Download, FileText, X, CheckCircle, AlertCircle, RefreshCw, Cloud, Shield, Eye } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface DocumentDownloadProps {
  isOpen: boolean;
  onClose: () => void;
  clientEmail: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'Prêt' | 'En traitement' | 'Erreur';
  googleDriveId?: string;
  category: string;
  description?: string;
}

export default function DocumentDownload({ isOpen, onClose, clientEmail }: DocumentDownloadProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [viewerDocument, setViewerDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Simuler le chargement des documents depuis Google Drive
  useEffect(() => {
    if (isOpen) {
      loadDocumentsFromGoogleDrive();
    }
  }, [isOpen, clientEmail]);

  const loadDocumentsFromGoogleDrive = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulation de l'appel à Google Drive API
      // En production, ceci serait un appel réel à l'API Google Drive
      setTimeout(() => {
        const mockDocuments: Document[] = [
          {
            id: '1',
            name: 'Déclaration de revenus 2024',
            type: 'PDF',
            size: '2.3 MB',
            date: '2024-12-15',
            status: 'Prêt',
            googleDriveId: '1abc123def456',
            category: 'Déclarations fiscales',
            description: 'Déclaration d\'impôt sur le revenu 2024'
          },
          {
            id: '2',
            name: 'Rapport fiscal annuel',
            type: 'PDF',
            size: '1.8 MB',
            date: '2024-12-10',
            status: 'Prêt',
            googleDriveId: '2def456ghi789',
            category: 'Rapports',
            description: 'Rapport annuel de l\'exercice fiscal'
          },
          {
            id: '3',
            name: 'Relevé de compte bancaire',
            type: 'PDF',
            size: '0.9 MB',
            date: '2024-12-08',
            status: 'Prêt',
            googleDriveId: '3ghi789jkl012',
            category: 'Banque',
            description: 'Relevé bancaire du mois de novembre'
          },
          {
            id: '4',
            name: 'Facture services comptables',
            type: 'PDF',
            size: '0.5 MB',
            date: '2024-12-05',
            status: 'Prêt',
            googleDriveId: '4jkl012mno345',
            category: 'Factures',
            description: 'Facturation des services comptables'
          },
          {
            id: '5',
            name: 'Contrat de location bureau',
            type: 'PDF',
            size: '3.2 MB',
            date: '2024-12-03',
            status: 'En traitement',
            category: 'Contrats',
            description: 'Contrat de location du bureau principal'
          }
        ];

        setDocuments(mockDocuments);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Erreur lors du chargement des documents:', err);
      setError('Erreur lors du chargement des documents');
      setLoading(false);
    }
  };

  const syncWithGoogleDrive = async () => {
    setSyncing(true);
    setError(null);

    try {
      // Simulation de synchronisation avec Google Drive
      setTimeout(() => {
        // Simuler l'ajout d'un nouveau document
        const newDocument: Document = {
          id: '6',
          name: 'Bulletin de salaire décembre',
          type: 'PDF',
          size: '0.7 MB',
          date: '2024-12-16',
          status: 'Prêt',
          googleDriveId: '5mno345pqr678',
          category: 'Paie',
          description: 'Bulletin de salaire du mois de décembre'
        };

        setDocuments(prev => [newDocument, ...prev]);
        setSyncing(false);
        alert('Synchronisation terminée ! Un nouveau document a été ajouté.');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la synchronisation:', err);
      setError('Erreur lors de la synchronisation');
      setSyncing(false);
    }
  };

  const handleDownload = async (document: Document) => {
    if (!document.googleDriveId) {
      alert('Document non disponible dans Google Drive');
      return;
    }

    setDownloading(document.id);

    try {
      // Simulation du téléchargement depuis Google Drive
      // En production, ceci utiliserait l'API Google Drive pour récupérer le fichier
      setTimeout(() => {
        // Créer un fichier fictif pour la démonstration
        const element = window.document.createElement('a');
        const file = new Blob(['Contenu du document ' + document.name], { type: 'application/pdf' });
        element.href = URL.createObjectURL(file);
        element.download = document.name + '.pdf';
        window.document.body.appendChild(element);
        element.click();
        window.document.body.removeChild(element);

        setDownloading(null);
        setDownloaded(prev => [...prev, document.id]);

        // Notification de succès
        setTimeout(() => {
          alert(`Document "${document.name}" téléchargé avec succès depuis Google Drive !`);
        }, 500);
      }, 2000);
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      setDownloading(null);
      alert('Erreur lors du téléchargement du document');
    }
  };

  const handlePreview = (document: Document) => {
    setViewerDocument(document);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewerDocument(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Prêt':
        return 'text-green-600 bg-green-100';
      case 'En traitement':
        return 'text-blue-600 bg-blue-100';
      case 'Erreur':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Prêt':
        return <CheckCircle className="w-4 h-4" />;
      case 'En traitement':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'Erreur':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mes Documents Reçus</h2>
              <p className="text-sm text-gray-600 mt-1">Documents stockés de manière sécurisée dans Google Drive</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={syncWithGoogleDrive}
              disabled={syncing}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {syncing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Synchroniser
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="px-6 py-3 bg-green-50 border-b border-green-200">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-green-700 font-medium">
              Tous les documents sont stockés de manière sécurisée dans Google Cloud avec chiffrement de bout en bout
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-gray-600">Chargement des documents depuis Google Drive...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={loadDocumentsFromGoogleDrive}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                      {doc.description && (
                        <p className="text-sm text-gray-600 mb-1">{doc.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{doc.type} • {doc.size}</span>
                        <span>{doc.date}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">{doc.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span>{doc.status}</span>
                    </div>

                    {downloaded.includes(doc.id) ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Téléchargé</span>
                      </div>
                    ) : doc.status === 'Prêt' ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePreview(doc)}
                          className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Aperçu
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          disabled={downloading === doc.id}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          {downloading === doc.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Téléchargement...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Non disponible</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {documents.length === 0 && !loading && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun document disponible</h3>
              <p className="text-gray-600 mb-6">
                Vos documents seront disponibles ici une fois préparés par votre comptable et synchronisés avec Google Drive.
              </p>
              <button
                onClick={syncWithGoogleDrive}
                disabled={syncing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {syncing ? 'Synchronisation...' : 'Synchroniser maintenant'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {documents.length} document(s) disponible(s) • Stockage sécurisé Google Cloud
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>

      {/* Document Viewer */}
      <DocumentViewer
        document={viewerDocument}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        clientEmail={clientEmail}
      />
    </div>
  );
}
