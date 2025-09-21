import { useState, useRef } from 'react';
import { Upload, X, FileText, File, Image, CheckCircle, AlertCircle } from 'lucide-react';

// Type definitions
interface DocumentData {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  uploadedAt: string;
  clientEmail: string;
}

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  clientEmail: string;
  onUploadSuccess: (documentData: DocumentData) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function DocumentUpload({ isOpen, onClose, clientEmail, onUploadSuccess }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const categories = [
    { value: 'revenus', label: 'Documents de revenus' },
    { value: 'depenses', label: 'Justificatifs de dépenses' },
    { value: 'banque', label: 'Relevés bancaires' },
    { value: 'impots', label: 'Documents fiscaux' },
    { value: 'autres', label: 'Autres documents' }
  ];

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5 text-green-600" />;
    if (fileType === 'application/pdf') return <FileText className="w-5 h-5 text-red-600" />;
    return <File className="w-5 h-5 text-blue-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Type de fichier non autorisé. Formats acceptés : PDF, images, Word, Excel';
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return 'Fichier trop volumineux. Taille maximale : 10MB';
    }
    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const error = validateFile(file);
      const fileId = Date.now() + Math.random().toString(36).substr(2, 9);

      const newFile: UploadedFile = {
        id: fileId,
        progress: 0,
        status: error ? 'error' : 'uploading',
        ...(error && { error })
      };

      setUploadedFiles(prev => [...prev, newFile]);

      if (!error) {
        // Simulation de l'upload
        simulateUpload(fileId);
      }
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === fileId && f.status === 'uploading') {
          const newProgress = f.progress + Math.random() * 30;
          if (newProgress >= 100) {
            clearInterval(interval);
            onUploadSuccess({
              id: fileId,
              name: f.file.name,
              size: f.file.size,
              type: f.file.type,
              category: selectedCategory,
              uploadedAt: new Date().toISOString(),
              clientEmail
            });
            return { ...f, progress: 100, status: 'success' };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    const successfulUploads = uploadedFiles.filter(f => f.status === 'success');
    if (successfulUploads.length > 0) {
      alert(`${successfulUploads.length} document(s) déposé(s) avec succès ! Votre comptable recevra une notification.`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Déposer un document</h2>
              <p className="text-sm text-gray-600">Téléversez vos documents pour votre comptable</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Zone de dépôt */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Déposez vos fichiers ici
            </h3>
            <p className="text-gray-600 mb-4">
              ou <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                parcourez vos fichiers
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Formats acceptés : PDF, images, Word, Excel • Max 10MB par fichier
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={allowedTypes.join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Fichiers uploadés */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Fichiers ({uploadedFiles.length})
              </h4>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.file.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                        <p className="text-xs text-gray-600">{formatFileSize(file.file.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{Math.round(file.progress)}%</span>
                        </div>
                      )}

                      {file.status === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}

                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-xs text-red-600">{file.error}</span>
                        </div>
                      )}

                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {uploadedFiles.filter(f => f.status === 'success').length} fichier(s) prêt(s)
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploadedFiles.filter(f => f.status === 'success').length === 0}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Déposer les documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
