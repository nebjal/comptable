import { useState } from 'react';
import { Upload, FileText, Trash2, PenTool, Calendar, AlertTriangle, BarChart3, FileCheck, Eye, Download, Save, Send } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  category: 'facture' | 'releve_bancaire' | 'bulletin_paie' | 'declaration_fiscale' | 'contrat' | 'autre';
  status: 'en_attente' | 'traite' | 'archive';
}

interface SignatureRequest {
  documentName: string;
  status: 'en_attente' | 'signe';
  dateCreation: string;
  dateSignature?: string;
}

interface FiscalAlert {
  id: string;
  type: 'echeance' | 'document_manquant' | 'signature_attente';
  message: string;
  priority: 'haute' | 'moyenne' | 'basse';
  date: string;
}

interface DeclarationForm {
  step: number;
  data: {
    typeImport: string;
    montant: string;
    origine: string;
    documents: File[];
  };
}

const mockSignatureRequests: SignatureRequest[] = [
  { documentName: 'Contrat de prestation', status: 'en_attente', dateCreation: '2025-01-15' },
  { documentName: 'Déclaration fiscale', status: 'en_attente', dateCreation: '2025-01-10' },
];

export default function ClientPortal() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [signatureRequests, setSignatureRequests] = useState<SignatureRequest[]>(mockSignatureRequests);
  const [isFirstUse, setIsFirstUse] = useState(() => {
    const hasUsed = localStorage.getItem('clientPortalUsed');
    return !hasUsed;
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'signatures' | 'declaration'>('dashboard');
  const [fiscalAlerts] = useState<FiscalAlert[]>([
    { id: '1', type: 'echeance', message: 'Déclaration TPS/TVQ Q4 2024 due le 31 mars 2025', priority: 'haute', date: '2025-03-31' },
    { id: '2', type: 'document_manquant', message: 'Relevé bancaire décembre manquant', priority: 'moyenne', date: '2025-01-20' },
    { id: '3', type: 'signature_attente', message: 'Contrat de prestation en attente de signature', priority: 'haute', date: '2025-01-25' },
  ]);
  const [declarationForm, setDeclarationForm] = useState<DeclarationForm>({
    step: 1,
    data: { typeImport: '', montant: '', origine: '', documents: [] }
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    const newFiles = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString('fr-CA'),
      category: 'autre' as const,
      status: 'en_attente' as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setToast({ message: 'Document déposé avec succès !', type: 'success' });
    setTimeout(() => setToast(null), 2500);
    // Mark as not first use after first upload
    if (isFirstUse) {
      setIsFirstUse(false);
      localStorage.setItem('clientPortalUsed', 'true');
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSign = (idx: number) => {
  setSignatureRequests(reqs => reqs.map((req, i) => i === idx ? { ...req, status: 'signe' } : req));
  setToast({ message: 'Document signé électroniquement !', type: 'success' });
  setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-0 sm:p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-white rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-lg relative">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-sm animate-fade-in ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Header visuel */}
      <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-0 bg-white/70 rounded-t-3xl border-b border-gray-100">
        <img src="/logo.png" alt="Logo" className="h-16 w-16 rounded-full border border-blue-200 shadow mb-4" />
        {isFirstUse ? (
          <>
            <h2 className="text-4xl font-extrabold mb-2 text-blue-700 tracking-tight">Créer mon dossier</h2>
            <p className="text-lg text-gray-700 mb-4 font-medium">Bienvenue ! Créez votre dossier client</p>
            <p className="text-sm text-gray-500 mb-4">Commencez par déposer vos premiers documents pour créer votre dossier.</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Commencer la création
            </button>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold mb-2 text-blue-700 tracking-tight">Accéder à mon dossier</h2>
            <p className="text-lg text-gray-700 mb-2 font-medium">Bienvenue dans votre espace sécurisé</p>
            <p className="text-sm text-gray-500 mb-2">Gérez vos documents, suivez vos signatures et communiquez avec votre comptable.</p>
          </>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white/50">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <BarChart3 className="w-5 h-5 mx-auto mb-1" />
          Tableau de Bord
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FileText className="w-5 h-5 mx-auto mb-1" />
          Documents
        </button>
        <button
          onClick={() => setActiveTab('signatures')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'signatures' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <PenTool className="w-5 h-5 mx-auto mb-1" />
          Signatures
        </button>
        <button
          onClick={() => setActiveTab('declaration')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'declaration' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FileCheck className="w-5 h-5 mx-auto mb-1" />
          Déclaration
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Résumé fiscal */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Résumé Fiscal 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$45,230</div>
                  <div className="text-sm text-gray-600">Revenus déclarés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$8,450</div>
                  <div className="text-sm text-gray-600">Taxes à payer</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$2,150</div>
                  <div className="text-sm text-gray-600">Remboursement attendu</div>
                </div>
              </div>
            </div>

            {/* Prochaines échéances */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Prochaines Échéances
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <div className="font-medium text-red-800">Déclaration TPS/TVQ Q4 2024</div>
                    <div className="text-sm text-red-600">Due le 31 mars 2025</div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Urgent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <div className="font-medium text-yellow-800">Déclaration de revenus 2024</div>
                    <div className="text-sm text-yellow-600">Due le 30 avril 2025</div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">À venir</span>
                </div>
              </div>
            </div>

            {/* Alertes et notifications */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Alertes et Notifications
              </h3>
              <div className="space-y-3">
                {fiscalAlerts.map((alert) => (
                  <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                    alert.priority === 'haute' ? 'bg-red-50 border-red-200' :
                    alert.priority === 'moyenne' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div>
                      <div className={`font-medium ${
                        alert.priority === 'haute' ? 'text-red-800' :
                        alert.priority === 'moyenne' ? 'text-yellow-800' : 'text-blue-800'
                      }`}>{alert.message}</div>
                      <div className="text-sm text-gray-600">{alert.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.priority === 'haute' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'moyenne' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.priority === 'haute' ? 'Urgent' : alert.priority === 'moyenne' ? 'Important' : 'Info'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Upload Zone */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Dépôt de Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Glissez-déposez vos documents ici</p>
                <p className="text-sm text-gray-500 mb-4">ou</p>
                <label className="inline-block">
                  <input type="file" multiple className="hidden" onChange={handleUpload} />
                  <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
                    Parcourir les fichiers
                  </span>
                </label>
              </div>
            </div>

            {/* Liste des documents */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Mes Documents</h3>
              {files.length === 0 ? (
                <div className="text-gray-500 text-center py-8">Aucun document déposé</div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">
                            {file.size} • {file.date} • {file.category} • {file.status === 'en_attente' ? 'En attente' : file.status === 'traite' ? 'Traité' : 'Archivé'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'signatures' && (
          <div className="space-y-6">
            {/* Documents en attente */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Documents en Attente de Signature</h3>
              {signatureRequests.filter(req => req.status === 'en_attente').length === 0 ? (
                <div className="text-gray-500 text-center py-8">Aucun document en attente</div>
              ) : (
                <div className="space-y-3">
                  {signatureRequests.filter(req => req.status === 'en_attente').map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{req.documentName}</div>
                        <div className="text-sm text-gray-600">Créé le {req.dateCreation}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleSign(idx)}
                        >
                          Signer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Historique des signatures */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Historique des Signatures</h3>
              {signatureRequests.filter(req => req.status === 'signe').length === 0 ? (
                <div className="text-gray-500 text-center py-8">Aucune signature effectuée</div>
              ) : (
                <div className="space-y-3">
                  {signatureRequests.filter(req => req.status === 'signe').map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{req.documentName}</div>
                        <div className="text-sm text-gray-600">
                          Signé le {req.dateSignature || req.dateCreation} • Certificat disponible
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'declaration' && (
          <div className="space-y-6">
            {/* Formulaire de déclaration d'import */}
            <div className="bg-white/80 rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Déclaration d'Import</h3>
              
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Étape {declarationForm.step} sur 4</span>
                  <span>{Math.round((declarationForm.step / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(declarationForm.step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form steps */}
              {declarationForm.step === 1 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Type d'import</h4>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={declarationForm.data.typeImport}
                    onChange={(e) => setDeclarationForm(prev => ({
                      ...prev,
                      data: { ...prev.data, typeImport: e.target.value }
                    }))}
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="marchandises">Marchandises</option>
                    <option value="services">Services</option>
                    <option value="immobilisations">Immobilisations</option>
                  </select>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    onClick={() => setDeclarationForm(prev => ({ ...prev, step: 2 }))}
                    disabled={!declarationForm.data.typeImport}
                  >
                    Suivant
                  </button>
                </div>
              )}

              {declarationForm.step === 2 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Informations financières</h4>
                  <input
                    type="number"
                    placeholder="Montant en CAD"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={declarationForm.data.montant}
                    onChange={(e) => setDeclarationForm(prev => ({
                      ...prev,
                      data: { ...prev.data, montant: e.target.value }
                    }))}
                  />
                  <div className="flex space-x-2">
                    <button 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => setDeclarationForm(prev => ({ ...prev, step: 1 }))}
                    >
                      Précédent
                    </button>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => setDeclarationForm(prev => ({ ...prev, step: 3 }))}
                      disabled={!declarationForm.data.montant}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {declarationForm.step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Documents justificatifs</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input 
                      type="file" 
                      multiple 
                      className="w-full"
                      onChange={(e) => {
                        const files = e.target.files ? Array.from(e.target.files) : [];
                        setDeclarationForm(prev => ({
                          ...prev,
                          data: { ...prev.data, documents: files }
                        }));
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => setDeclarationForm(prev => ({ ...prev, step: 2 }))}
                    >
                      Précédent
                    </button>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => setDeclarationForm(prev => ({ ...prev, step: 4 }))}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {declarationForm.step === 4 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Prévisualisation</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Type d'import:</strong> {declarationForm.data.typeImport}</p>
                    <p><strong>Montant:</strong> {declarationForm.data.montant} CAD</p>
                    <p><strong>Documents:</strong> {declarationForm.data.documents.length} fichier(s)</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => setDeclarationForm(prev => ({ ...prev, step: 3 }))}
                    >
                      Précédent
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                      <Save className="w-5 h-5 mr-2 inline" />
                      Sauvegarder
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      <Send className="w-5 h-5 mr-2 inline" />
                      Envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer branding */}
      <div className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
        © 2024 Groupe ServiTax Solutions Inc. | Espace Client
      </div>
    </div>
  );
}
