import { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import GoogleDriveService from '../services/googleDriveService';
import './DocumentViewer.css';

// Configuration PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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

interface DocumentViewerProps {
  document: DocumentData | null;
  isOpen: boolean;
  onClose: () => void;
  clientEmail?: string;
}

export default function DocumentViewer({ document, isOpen, onClose, clientEmail }: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [googleDriveService] = useState(() => new GoogleDriveService());

  // Get document URL from Google Drive
  const getDocumentUrl = useCallback(async (doc: DocumentData) => {
    if (!doc.googleDriveId) {
      return null;
    }

    try {
      // In production, this would get a signed URL from Google Drive
      // For now, we'll simulate the URL generation
      const url = await googleDriveService.getDocumentUrl(doc.googleDriveId);
      return url;
    } catch (error) {
      console.error('Error getting document URL:', error);
      return null;
    }
  }, [googleDriveService]);

  const loadDocument = useCallback(async () => {
    if (!document) return;

    setLoading(true);
    setError(null);

    try {
      const url = await getDocumentUrl(document);
      setDocumentUrl(url);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement du document depuis Google Drive:', err);
      setError('Erreur lors du chargement du document depuis Google Drive');
      setLoading(false);
    }
  }, [document, getDocumentUrl]);

  // Load document when component opens
  useEffect(() => {
    if (isOpen && document) {
      loadDocument();
    } else {
      setDocumentUrl(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, document, loadDocument]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Erreur de chargement du document:', error);
    setError('Erreur lors du chargement du document');
    setLoading(false);
  }, []);

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };

  const handlePrevious = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages || 1));
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    if (document && document.googleDriveId) {
      // Use Google Drive service to download
      googleDriveService.downloadDocument(document.googleDriveId)
        .then((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          const link = window.document.createElement('a');
          link.href = url;
          link.download = document.name;
          window.document.body.appendChild(link);
          link.click();
          window.document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch((error: Error) => {
          console.error('Download failed:', error);
          alert('Erreur lors du téléchargement du document');
        });
    }
  };

  const renderDocumentContent = () => {
    if (!document) return null;

    const format = document.type.toLowerCase();

    if (format === 'pdf' && documentUrl) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <Document
            file={documentUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Chargement du document...</span>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center py-20 text-red-600">
                <AlertCircle className="h-12 w-12 mb-2" />
                <p>Erreur lors du chargement du PDF</p>
                <p className="text-sm text-gray-500 mt-2">Document non disponible</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              loading={
                <div className="flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }
            />
          </Document>

          {numPages && numPages > 1 && (
            <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow">
              <button
                onClick={handlePrevious}
                disabled={pageNumber <= 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">
                Page {pageNumber} sur {numPages}
              </span>
              <button
                onClick={handleNext}
                disabled={pageNumber >= numPages}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      );
    } else if (['jpg', 'jpeg', 'png'].includes(format) && documentUrl) {
      return (
        <div className="flex flex-col items-center">
          <div className="relative overflow-auto max-h-full">
            <img
              src={documentUrl}
              alt={document.name}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease'
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setError('Erreur lors du chargement de l\'image');
                setLoading(false);
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600">
          <FileText className="h-16 w-16 mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Aperçu non disponible</h3>
          <p className="text-sm text-center max-w-md">
            Ce type de document ({format.toUpperCase()}) n'est pas pris en charge pour l'aperçu en ligne.
            Vous pouvez télécharger le fichier pour le consulter.
          </p>
        </div>
      );
    }
  };

  if (!isOpen || !document) return null;

  const format = document.type.toLowerCase();

  return (
    <div className={`fixed inset-0 z-50 ${isFullscreen ? 'bg-black' : 'bg-black bg-opacity-75'} flex items-center justify-center p-4`}>
      <div className={`${isFullscreen ? 'w-full h-full' : 'max-w-6xl max-h-[90vh]'} bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {format === 'pdf' ? (
              <FileText className="h-6 w-6 text-red-600" />
            ) : ['jpg', 'jpeg', 'png'].includes(format) ? (
              <ImageIcon className="h-6 w-6 text-green-600" />
            ) : (
              <FileText className="h-6 w-6 text-gray-600" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900 truncate max-w-md">{document.name}</h3>
              <p className="text-sm text-gray-600">{clientEmail || 'Client'} • {format.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-300">
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg"
                title="Zoom arrière"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="px-3 py-2 text-sm font-medium text-gray-700 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg"
                title="Zoom avant"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Rotation */}
            <button
              onClick={handleRotate}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-300"
              title="Faire pivoter"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-300"
              title={isFullscreen ? "Quitter plein écran" : "Plein écran"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-gray-300"
              title="Télécharger"
            >
              <Download className="h-4 w-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-300"
              title="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Chargement...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-red-600">
              <AlertCircle className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">Erreur de chargement</p>
              <p className="text-sm text-center">{error}</p>
            </div>
          ) : (
            renderDocumentContent()
          )}
        </div>

        {/* Footer with document info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Taille: {document.size}</span>
              <span>Reçu: {new Date(document.date).toLocaleDateString('fr-CA')}</span>
              {document.description && (
                <span className="max-w-xs truncate">Description: {document.description}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                document.status === 'Prêt' ? 'bg-green-100 text-green-700' :
                document.status === 'En traitement' ? 'bg-blue-100 text-blue-700' :
                'bg-red-100 text-red-700'
              }`}>
                {document.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
