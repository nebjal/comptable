import { useState } from 'react';
import { Plus, Search, PenTool, Clock, CheckCircle, AlertCircle, Shield } from 'lucide-react';

interface Signature {
  id: string;
  documentName: string;
  documentType: string;
  clientName: string;
  clientId: string;
  dateCreation: string;
  dateEcheance: string;
  dateSignature?: string;
  status: 'en_attente' | 'signe' | 'refuse' | 'expire';
  typeSignature: 'simple' | 'avancee' | 'qualifiee';
  methodAuth: string;
  preuveAudit?: string;
}

export default function Signatures() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterType, setFilterType] = useState('tous');
    const [signatures] = useState<Signature[]>([
      {
        id: '1',
        documentName: 'Facture Fournisseur 001',
        documentType: 'Facture',
        clientName: 'Entreprise ABC',
        clientId: 'c1',
        dateCreation: '2025-09-10',
        dateEcheance: '2025-09-20',
        status: 'en_attente',
        typeSignature: 'qualifiee',
        methodAuth: 'SMS',
        preuveAudit: 'audit-001.pdf',
      },
      {
        id: '2',
        documentName: 'Contrat de Prestation',
        documentType: 'Contrat',
        clientName: 'Consultant DEF',
        clientId: 'c2',
        dateCreation: '2025-08-15',
        dateEcheance: '2025-09-01',
        dateSignature: '2025-08-20',
        status: 'signe',
        typeSignature: 'avancee',
        methodAuth: 'Email',
        preuveAudit: 'audit-002.pdf',
      },
      {
        id: '3',
        documentName: 'Déclaration Fiscale 2024',
        documentType: 'Déclaration Fiscale',
        clientName: 'Entreprise XYZ',
        clientId: 'c3',
        dateCreation: '2025-09-01',
        dateEcheance: '2025-09-15',
        status: 'refuse',
        typeSignature: 'simple',
        methodAuth: 'Mot de passe',
      },
      {
        id: '4',
        documentName: 'Bulletin de Paie Juillet',
        documentType: 'Bulletin de Paie',
        clientName: 'Consultant DEF',
        clientId: 'c2',
        dateCreation: '2025-08-01',
        dateEcheance: '2025-08-10',
        status: 'expire',
        typeSignature: 'simple',
        methodAuth: 'Mot de passe',
      },
    ]);

  // ...existing code...
// ...existing code...

  const filteredSignatures = signatures.filter(signature => {
    const matchesSearch = signature.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signature.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'tous' || signature.status === filterStatus;
    const matchesType = filterType === 'tous' || signature.typeSignature === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signe': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'en_attente': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'refuse': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'expire': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signe': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-orange-100 text-orange-800';
      case 'refuse': return 'bg-red-100 text-red-800';
      case 'expire': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeSignatureColor = (type: string) => {
    switch (type) {
      case 'qualifiee': return 'bg-purple-100 text-purple-800';
      case 'avancee': return 'bg-blue-100 text-blue-800';
      case 'simple': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeSignatureLabel = (type: string) => {
    switch (type) {
      case 'qualifiee': return 'Qualifiée';
      case 'avancee': return 'Avancée';
      case 'simple': return 'Simple';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Signatures Électroniques</h1>
          <p className="text-gray-600 mt-2">Gestion conforme LCJTI et archivage sécurisé</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Nouvelle Signature</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher signatures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="signe">Signé</option>
          <option value="refuse">Refusé</option>
          <option value="expire">Expiré</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les types</option>
          <option value="simple">Signature Simple</option>
          <option value="avancee">Signature Avancée</option>
          <option value="qualifiee">Signature Qualifiée</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-orange-600">
                {signatures.filter(s => s.status === 'en_attente').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Signées</p>
              <p className="text-2xl font-bold text-green-600">
                {signatures.filter(s => s.status === 'signe').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Qualifiées</p>
              <p className="text-2xl font-bold text-purple-600">
                {signatures.filter(s => s.typeSignature === 'qualifiee').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ce Mois</p>
              <p className="text-2xl font-bold text-blue-600">
                {signatures.filter(s => new Date(s.dateCreation).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <PenTool className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Signatures List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Liste des Signatures</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSignatures.map((signature) => (
            <div key={signature.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(signature.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{signature.documentName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{signature.clientName}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Type: {signature.documentType} • Auth: {signature.methodAuth}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signature.status)}`}>
                        {signature.status === 'en_attente' ? 'En Attente' :
                         signature.status === 'signe' ? 'Signé' :
                         signature.status === 'refuse' ? 'Refusé' : 'Expiré'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeSignatureColor(signature.typeSignature)}`}>
                        {getTypeSignatureLabel(signature.typeSignature)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>Créée: {new Date(signature.dateCreation).toLocaleDateString('fr-CA')}</span>
                      <span>Échéance: {new Date(signature.dateEcheance).toLocaleDateString('fr-CA')}</span>
                      {signature.dateSignature && (
                        <span className="text-green-600">
                          Signée: {new Date(signature.dateSignature).toLocaleDateString('fr-CA')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {signature.preuveAudit && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Preuve d'Audit
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Détails
                      </button>
                    </div>
                  </div>
                  {signature.status === 'en_attente' && (
                    <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800">
                        <strong>Action requise:</strong> En attente de signature du client. 
                        Rappel automatique dans {Math.ceil((new Date(signature.dateEcheance).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} jours.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LCJTI Compliance Notice */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Conformité LCJTI Assurée</h3>
            <p className="text-sm text-blue-800 mb-3">
              Toutes les signatures électroniques respectent les exigences de la Loi concernant le cadre juridique 
              des technologies de l'information du Québec. Chaque signature génère automatiquement une preuve 
              d'audit horodatée et sécurisée.
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <span>• Identification du signataire</span>
              <span>• Intégrité du document</span>
              <span>• Consentement manifeste</span>
              <span>• Archivage 6 ans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}