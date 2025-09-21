import { useState, useRef, useEffect } from 'react';
import { PenTool, X, CheckCircle, RotateCcw, Type, Upload, Shield, FileText, Clock, AlertTriangle } from 'lucide-react';

// Type definitions
interface SignatureData {
  requestId: string;
  documentId: string;
  signatureData: string;
  method: SignatureMethod;
  timestamp: string;
}

interface DocumentSignatureProps {
  isOpen: boolean;
  onClose: () => void;
  _clientEmail: string;
  onSignatureComplete: (signatureData: SignatureData) => void;
}

type SignatureMethod = 'draw' | 'type' | 'upload';
type SignatureStatus = 'idle' | 'creating' | 'sending' | 'completed' | 'error';

interface ZohoSignRequest {
  documentId: string;
  signerEmail: string;
  signerName: string;
  signatureData: string;
  signatureMethod: SignatureMethod;
}

export default function DocumentSignature({ isOpen, onClose, _clientEmail, onSignatureComplete }: DocumentSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [signatureMethod, setSignatureMethod] = useState<SignatureMethod>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [uploadedSignature, setUploadedSignature] = useState<File | null>(null);
  const [signatureStatus, setSignatureStatus] = useState<SignatureStatus>('idle');
  const [zohoRequestId, setZohoRequestId] = useState<string>('');
  const [legalConsent, setLegalConsent] = useState(false);

  // Documents en attente de signature (avec métadonnées Zoho)
  const pendingDocuments = [
    {
      id: '1',
      name: 'Contrat de services comptables 2025',
      type: 'PDF',
      pages: 3,
      deadline: '2024-12-20',
      zohoTemplateId: 'template_12345',
      requiredSignatures: 2,
      currentSignatures: 1
    },
    {
      id: '2',
      name: 'Mandat de représentation fiscale',
      type: 'PDF',
      pages: 2,
      deadline: '2024-12-18',
      zohoTemplateId: 'template_67890',
      requiredSignatures: 1,
      currentSignatures: 0
    },
    {
      id: '3',
      name: 'Accord de confidentialité',
      type: 'PDF',
      pages: 1,
      deadline: '2024-12-15',
      zohoTemplateId: 'template_11111',
      requiredSignatures: 2,
      currentSignatures: 1
    }
  ];

  useEffect(() => {
    if (isOpen && canvasRef.current && signatureMethod === 'draw') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen, signatureMethod]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (signatureMethod !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || signatureMethod !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (signatureMethod === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    } else if (signatureMethod === 'type') {
      setTypedSignature('');
      setHasSignature(false);
    } else if (signatureMethod === 'upload') {
      setUploadedSignature(null);
      setHasSignature(false);
    }
  };

  const handleSignatureFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation du fichier de signature
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image (PNG, JPG, etc.)');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB
        alert('Le fichier est trop volumineux (max 2MB)');
        return;
      }
      setUploadedSignature(file);
      setHasSignature(true);
    }
  };

  const validateSignature = (): boolean => {
    switch (signatureMethod) {
      case 'draw':
        return hasSignature;
      case 'type':
        return typedSignature.trim().length > 0;
      case 'upload':
        return uploadedSignature !== null;
      default:
        return false;
    }
  };

  const simulateZohoSignAPI = async (_requestData: ZohoSignRequest): Promise<string> => {
    // Simulation de l'appel API Zoho Sign
    console.log('Envoi à Zoho Sign:', _requestData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockRequestId = 'zoho_req_' + Date.now();
        resolve(mockRequestId);
      }, 2000);
    });
  };

  const handleSignatureSubmit = async () => {
    if (!selectedDocument || !validateSignature() || !legalConsent) return;

    setSignatureStatus('creating');

    try {
      let signatureData = '';

      // Préparer les données selon la méthode de signature
      switch (signatureMethod) {
        case 'draw': {
          const canvas = canvasRef.current;
          if (canvas) {
            signatureData = canvas.toDataURL('image/png');
          }
          break;
        }
        case 'type':
          signatureData = typedSignature;
          break;
        case 'upload':
          if (uploadedSignature) {
            // Convertir le fichier en base64 (simulation)
            signatureData = 'uploaded_signature_data';
          }
          break;
      }

      // Créer la requête Zoho Sign
      const zohoRequest: ZohoSignRequest = {
        documentId: selectedDocument,
        signerEmail: _clientEmail,
        signerName: 'Client', // À récupérer du contexte utilisateur
        signatureData,
        signatureMethod
      };

      setSignatureStatus('sending');

      // Simuler l'appel API Zoho Sign
      const requestId = await simulateZohoSignAPI(zohoRequest);
      setZohoRequestId(requestId);

      setSignatureStatus('completed');

      onSignatureComplete({
        requestId,
        documentId: selectedDocument,
        signatureData,
        method: signatureMethod,
        timestamp: new Date().toISOString()
      });

      setTimeout(() => {
        alert(`Document signé avec succès via Zoho Sign !\nID de requête: ${zohoRequestId}\nUne confirmation vous sera envoyée par email.`);
        onClose();
      }, 1500);

    } catch {
      setSignatureStatus('error');
      alert('Erreur lors de la signature. Veuillez réessayer.');
    }
  };

  const renderSignatureInput = () => {
    switch (signatureMethod) {
      case 'draw':
        return (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
            <div className="text-center mb-4">
              <PenTool className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800 font-medium">
                Dessinez votre signature
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Utilisez votre souris pour signer naturellement
              </p>
            </div>

            <div className="border border-blue-200 rounded-lg p-4 bg-white">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="border border-gray-300 rounded cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        );

      case 'type':
        return (
          <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
            <div className="text-center mb-4">
              <Type className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-800 font-medium">
                Saisissez votre signature
              </p>
              <p className="text-xs text-green-600 mt-1">
                Tapez votre nom complet
              </p>
            </div>

            <div className="border border-green-200 rounded-lg p-4 bg-white">
              <input
                type="text"
                value={typedSignature}
                onChange={(e) => {
                  setTypedSignature(e.target.value);
                  setHasSignature(e.target.value.trim().length > 0);
                }}
                placeholder="Votre nom complet"
                className="w-full text-center text-2xl font-signature border-none outline-none bg-transparent"
                style={{ fontFamily: 'cursive' }}
              />
              {typedSignature && (
                <div className="mt-4 text-center">
                  <div className="inline-block border-b-2 border-gray-400 px-8 py-2">
                    <span className="text-2xl font-signature" style={{ fontFamily: 'cursive' }}>
                      {typedSignature}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50">
            <div className="text-center mb-4">
              <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-800 font-medium">
                Importez votre signature
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Formats acceptés : PNG, JPG, GIF (max 2MB)
              </p>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-white">
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureFileUpload}
                className="hidden"
                id="signature-upload"
              />
              <label
                htmlFor="signature-upload"
                className="cursor-pointer flex flex-col items-center justify-center py-8"
              >
                {uploadedSignature ? (
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800 font-medium">
                      {uploadedSignature.name}
                    </p>
                    <p className="text-xs text-green-600">
                      {(uploadedSignature.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-purple-600">
                      Cliquez pour sélectionner un fichier
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-5xl w-full mx-4 max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Signature Électronique Zoho Sign</h2>
              <p className="text-sm text-gray-600 mt-1">Sécurisé • Légal • Traçable</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sélection du document */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Documents à signer
              </h3>
              <div className="space-y-3">
                {pendingDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDocument === doc.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedDocument(doc.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{doc.name}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                          <span>{doc.pages} page{doc.pages > 1 ? 's' : ''}</span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {doc.deadline}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Progression:</span>
                            <span className="font-medium">
                              {doc.currentSignatures}/{doc.requiredSignatures}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${(doc.currentSignatures / doc.requiredSignatures) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      {selectedDocument === doc.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Méthode de signature */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choisissez votre méthode de signature</h3>

              {/* Sélecteur de méthode */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'draw', label: 'Dessiner', icon: PenTool, color: 'blue' },
                  { id: 'type', label: 'Saisir', icon: Type, color: 'green' },
                  { id: 'upload', label: 'Importer', icon: Upload, color: 'purple' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSignatureMethod(method.id as SignatureMethod);
                      setHasSignature(false);
                      setTypedSignature('');
                      setUploadedSignature(null);
                    }}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                      signatureMethod === method.id
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mx-auto mb-2 text-${method.color}-600`} />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                ))}
              </div>

              {/* Zone de signature */}
              <div className="mb-6">
                {renderSignatureInput()}
              </div>

              {/* Boutons d'action pour la signature */}
              <div className="flex justify-center space-x-3 mb-6">
                <button
                  onClick={clearSignature}
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={signatureStatus !== 'idle'}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Effacer
                </button>
              </div>

              {/* Consentement légal */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">
                      Consentement légal requis
                    </h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      En signant ce document, vous acceptez que votre signature électronique soit légalement
                      contraignante et équivalente à une signature manuscrite, conformément à la loi LCJTI.
                    </p>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={legalConsent}
                        onChange={(e) => setLegalConsent(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-yellow-800">
                        J'accepte les conditions légales de signature électronique
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Informations Zoho Sign */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-medium text-blue-800">
                    Signature sécurisée avec Zoho Sign
                  </h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Chiffrement AES 256 bits</li>
                  <li>• Horodatage qualifié</li>
                  <li>• Traçabilité complète</li>
                  <li>• Conformité eIDAS et LCJTI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedDocument && validateSignature() && legalConsent && (
              <span className="text-green-600 font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Prêt pour signature Zoho Sign
              </span>
            )}
            {signatureStatus === 'creating' && (
              <span className="text-blue-600 font-medium">Création de la demande...</span>
            )}
            {signatureStatus === 'sending' && (
              <span className="text-blue-600 font-medium">Envoi à Zoho Sign...</span>
            )}
            {signatureStatus === 'completed' && (
              <span className="text-green-600 font-medium">Signature complétée !</span>
            )}
            {signatureStatus === 'error' && (
              <span className="text-red-600 font-medium">Erreur lors de la signature</span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={signatureStatus !== 'idle'}
            >
              Annuler
            </button>
            <button
              onClick={handleSignatureSubmit}
              disabled={!selectedDocument || !validateSignature() || !legalConsent || signatureStatus !== 'idle'}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {signatureStatus === 'idle' && (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Signer avec Zoho Sign
                </>
              )}
              {signatureStatus === 'creating' && (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Création...
                </>
              )}
              {signatureStatus === 'sending' && (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Envoi...
                </>
              )}
              {signatureStatus === 'completed' && (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminé
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
