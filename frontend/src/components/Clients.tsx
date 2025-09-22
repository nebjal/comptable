import React, { useState } from 'react';
import { Plus, Search, Filter, Building2, FileText, Calendar, Phone, Mail, MapPin, PenTool, Users } from 'lucide-react';

interface Client {
  id: string;
  nom: string;
  raisonSociale: string;
  type: 'entreprise' | 'travailleur_autonome' | 'particulier';
  neq: string;
  tpsTvq: string;
  adresse: string;
  email: string;
  telephone: string;
  status: string;
  dateFinExercice: string;
  documentsCount: number;
  signaturesEnAttente: number;
}

interface SignatureRequest {
  clientId: string;
  documentName: string;
  status: string;
}

interface ClientsProps {
  newClients?: Client[];
  onAddClient?: (client: Client) => void;
}

export default function Clients({ newClients = [], onAddClient }: ClientsProps) {
  const [clients, setClients] = useState<Client[]>([
      {
        id: '1',
        nom: 'Jean Dupont',
        raisonSociale: 'Dupont Inc.',
        type: 'entreprise',
        neq: '1234567890',
        tpsTvq: 'TPS123-TVQ456',
        adresse: '123 rue Principale, Montréal, QC',
        email: 'jean.dupont@email.com',
        telephone: '514-555-1234',
        status: 'actif',
        dateFinExercice: '2025-12-31',
        documentsCount: 12,
        signaturesEnAttente: 2,
      },
      {
        id: '2',
        nom: 'Alice Martin',
        raisonSociale: 'Martin Conseil',
        type: 'travailleur_autonome',
        neq: '9876543210',
        tpsTvq: 'TPS987-TVQ654',
        adresse: '456 rue Sainte-Catherine, Montréal, QC',
        email: 'alice.martin@email.com',
        telephone: '514-555-5678',
        status: 'actif',
        dateFinExercice: '2025-06-30',
        documentsCount: 8,
        signaturesEnAttente: 1,
      },
      {
        id: '3',
        nom: 'Benoît Tremblay',
        raisonSociale: 'Tremblay Resto',
        type: 'entreprise',
        neq: '1122334455',
        tpsTvq: 'TPS112-TVQ233',
        adresse: '789 rue Ontario, Montréal, QC',
        email: 'benoit.tremblay@email.com',
        telephone: '514-555-9012',
        status: 'inactif',
        dateFinExercice: '2025-03-31',
        documentsCount: 5,
        signaturesEnAttente: 0,
      },
      ...newClients
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [showClientActions, setShowClientActions] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [signatureDocName, setSignatureDocName] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [showForm, setShowForm] = useState(false);
  const [signatureRequests, setSignatureRequests] = useState<SignatureRequest[]>([]);
  const [form, setForm] = useState<Partial<Client>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const filteredClients = clients
    .filter((client: Client) => {
      const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.raisonSociale.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.neq.includes(searchTerm);
      const matchesFilter = filterType === 'tous' || client.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' }));

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'entreprise': return 'Entreprise';
      case 'travailleur_autonome': return 'Travailleur Autonome';
      case 'particulier': return 'Particulier';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-gray-100 text-gray-800';
      case 'suspendu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNew = () => {
    setForm({
      id: '',
      nom: '',
      raisonSociale: '',
      type: 'entreprise',
      neq: '',
      tpsTvq: '',
      adresse: '',
      email: '',
      telephone: '',
      status: 'actif',
      dateFinExercice: '',
      documentsCount: 0,
      signaturesEnAttente: 0,
    });
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (client: Client) => {
    setForm(client);
    setEditId(client.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c: Client) => c.id !== id));
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.nom || !form.raisonSociale) return;
    const newClient = { ...(form as Client), id: editId || Date.now().toString() };

    if (editId) {
      setClients(clients.map((c: Client) => c.id === editId ? newClient : c));
    } else {
      if (onAddClient) {
        onAddClient(newClient);
      } else {
        setClients([...clients, newClient]);
      }
    }
    setShowForm(false);
  };

  // ENVOYER EMAIL
  const handleSendEmail = (client: Client) => {
    window.open(`mailto:${client.email}`);
  };

  // ENVOYER DOCUMENT
  const handleSendDocument = (client: Client) => {
    setCurrentClient(client);
    setShowUploadModal(true);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleConfirmUpload = () => {
    if (uploadedFile && currentClient) {
      alert(`Document "${uploadedFile.name}" envoyé à ${currentClient.nom}`);
      setShowUploadModal(false);
      setUploadedFile(null);
      setCurrentClient(null);
    }
  };

  // DEMANDE DE SIGNATURE
  const handleSendSignature = (client: Client) => {
    setCurrentClient(client);
    setShowSignatureModal(true);
  };

  const handleConfirmSignature = () => {
    if (!signatureDocName || !currentClient) return;
    setSignatureRequests(prev => [...prev, {
      clientId: currentClient.id,
      documentName: signatureDocName,
      status: 'en_attente',
    }]);
    setClients(clients.map(c => c.id === currentClient.id ? { ...c, signaturesEnAttente: c.signaturesEnAttente + 1 } : c));
    alert('Demande de signature envoyée au client !');
    setShowSignatureModal(false);
    setSignatureDocName('');
    setCurrentClient(null);
  };

  return (
    <div className="space-y-6">
      {/* Actions Rapides */}
      <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold shadow transition-colors" onClick={handleNew}>
          <Plus className="w-5 h-5" />
          <span>Nouveau Client</span>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold shadow transition-colors" onClick={() => filteredClients[0] && window.open(`mailto:${filteredClients[0].email}`)}>
          <Mail className="w-5 h-5" />
          <span>Envoyer Email</span>
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold shadow transition-colors" onClick={() => filteredClients[0] && handleSendDocument(filteredClients[0])}>
          <FileText className="w-5 h-5" />
          <span>Envoyer Document</span>
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold shadow transition-colors" onClick={() => filteredClients[0] && handleSendSignature(filteredClients[0])}>
          <PenTool className="w-5 h-5" />
          <span>Demande Signature</span>
        </button>
      </div>
      {/* ...existing code... */}
      {/* Liste des clients en bas de page */}
      {!selectedClientId && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Liste des Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map(client => (
              <div key={client.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 shadow transition-all duration-200 cursor-pointer" onClick={() => { setSelectedClientId(client.id); setShowClientActions(true); }}>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{client.nom}</h3>
                <p className="text-sm text-gray-600 mb-2">{client.raisonSociale}</p>
                <div className="text-sm text-gray-700 mb-1"><span className="font-medium">Type:</span> {getTypeLabel(client.type)}</div>
                <div className="text-sm text-gray-700 mb-1"><span className="font-medium">Statut:</span> {client.status.charAt(0).toUpperCase() + client.status.slice(1)}</div>
                <div className="text-sm text-gray-700"><span className="font-medium">Email:</span> {client.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dossier du client sélectionné avec boutons d'action */}
      {selectedClientId && (() => {
        const client = filteredClients.find(c => c.id === selectedClientId);
        if (!client) return null;
        return (
          <div className="bg-sky-50 p-6 rounded-lg border border-sky-100 mt-4 max-w-2xl mx-auto">
            <button className="mb-4 text-blue-600 hover:underline" onClick={() => { setSelectedClientId(''); setShowClientActions(false); }}>&larr; Retour à la liste</button>
            <h3 className="font-semibold text-sky-700 mb-2 text-xl">Dossier du client</h3>
            <ul className="text-gray-700 mb-4">
              <li><strong>Nom :</strong> {client.nom}</li>
              <li><strong>Email :</strong> {client.email}</li>
              <li><strong>Statut :</strong> {client.status}</li>
              <li><strong>Raison sociale :</strong> {client.raisonSociale}</li>
              <li><strong>Type :</strong> {getTypeLabel(client.type)}</li>
              <li><strong>NEQ :</strong> {client.neq}</li>
              <li><strong>TPS/TVQ :</strong> {client.tpsTvq}</li>
              <li><strong>Adresse :</strong> {client.adresse}</li>
              <li><strong>Téléphone :</strong> {client.telephone}</li>
              <li><strong>Date fin exercice :</strong> {client.dateFinExercice}</li>
            </ul>
            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => handleEdit(client)}>Renommer</button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDelete(client.id)}>Supprimer</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleSendEmail(client)}>Envoyer un Email</button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleSendDocument(client)}>Envoyer un Document</button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" onClick={() => handleSendSignature(client)}>Envoyer à signer</button>
            </div>
      {/* Modal d'envoi de document */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Envoyer un document à {currentClient?.nom}</h2>
            <input type="file" onChange={handleUploadFile} className="mb-4" />
            {uploadedFile && <p className="mb-2">Fichier sélectionné : {uploadedFile.name}</p>}
            <div className="flex justify-end space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleConfirmUpload} disabled={!uploadedFile}>Envoyer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowUploadModal(false); setUploadedFile(null); setCurrentClient(null); }}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal demande de signature */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Demande de signature à {currentClient?.nom}</h2>
            <input type="text" value={signatureDocName} onChange={e => setSignatureDocName(e.target.value)} placeholder="Nom du document à signer" className="border p-2 rounded w-full mb-4" />
            <div className="flex justify-end space-x-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleConfirmSignature} disabled={!signatureDocName}>Envoyer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowSignatureModal(false); setSignatureDocName(''); setCurrentClient(null); }}>Annuler</button>
            </div>
          </div>
        </div>
      )}
            {/* Liste des demandes de signature pour ce client */}
            {signatureRequests.filter(req => req.clientId === client.id).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-purple-700 mb-2">Documents à signer envoyés</h4>
                <ul className="divide-y divide-gray-200">
                  {signatureRequests.filter(req => req.clientId === client.id).map((req, idx) => (
                    <li key={idx} className="py-1 flex justify-between items-center">
                      <span className="font-medium text-gray-900">{req.documentName}</span>
                      <span className="text-xs text-orange-600">{req.status === 'en_attente' ? 'En attente' : 'Signé'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })()}
      {/* Modern header section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8 shadow flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight mb-2">Gestion des Clients</h1>
            <p className="text-lg text-blue-900">Gérez votre portefeuille client et leurs informations fiscales</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold shadow transition-colors" onClick={handleNew}>
            <Plus className="w-6 h-6" />
            <span>Nouveau Client</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, raison sociale ou NEQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
          >
            <option value="tous">Tous les types</option>
            <option value="entreprise">Entreprises</option>
            <option value="travailleur_autonome">Travailleurs Autonomes</option>
            <option value="particulier">Particuliers</option>
          </select>
          <button className="flex items-center space-x-2 px-6 py-3 border border-blue-200 rounded-xl bg-white hover:bg-blue-50 text-blue-700 text-lg font-semibold shadow transition-colors">
            <Filter className="w-6 h-6" />
            <span>Filtres Avancés</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow flex flex-col items-center">
            <p className="text-blue-700 font-semibold mb-1">Total</p>
            <p className="text-3xl font-extrabold text-blue-900">{clients.length}</p>
            <Building2 className="w-8 h-8 text-blue-400 mt-2" />
          </div>
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow flex flex-col items-center">
            <p className="text-blue-700 font-semibold mb-1">Entreprises</p>
            <p className="text-3xl font-extrabold text-blue-900">{clients.filter(c => c.type === 'entreprise').length}</p>
            <Building2 className="w-8 h-8 text-blue-500 mt-2" />
          </div>
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow flex flex-col items-center">
            <p className="text-blue-700 font-semibold mb-1">Signatures en Attente</p>
            <p className="text-3xl font-extrabold text-blue-900">{clients.reduce((sum, c) => sum + c.signaturesEnAttente, 0)}</p>
            <PenTool className="w-8 h-8 text-blue-500 mt-2" />
          </div>
          <div className="bg-white p-6 rounded-xl border border-blue-100 shadow flex flex-col items-center">
            <p className="text-blue-700 font-semibold mb-1">Documents Traités</p>
            <p className="text-3xl font-extrabold text-blue-900">{clients.reduce((sum, c) => sum + c.documentsCount, 0)}</p>
            <FileText className="w-8 h-8 text-blue-500 mt-2" />
          </div>
        </div>
      </div>

  {/* ...existing code... (la liste n'est plus dupliquée) ... */}

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun client trouvé</h3>
          <p className="text-gray-600 mb-6">Ajustez vos critères de recherche ou ajoutez un nouveau client</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors" onClick={handleNew}>
            Ajouter un Client
          </button>
        </div>
      )}

      {/* Formulaire Client */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Modifier le client' : 'Nouveau client'}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="nom" value={form.nom || ''} onChange={handleChange} placeholder="Nom" className="border p-2 rounded" />
              <input name="raisonSociale" value={form.raisonSociale || ''} onChange={handleChange} placeholder="Raison sociale" className="border p-2 rounded" />
              <select name="type" value={form.type || 'entreprise'} onChange={handleChange} className="border p-2 rounded">
                <option value="entreprise">Entreprise</option>
                <option value="travailleur_autonome">Travailleur Autonome</option>
                <option value="particulier">Particulier</option>
              </select>
              <input name="neq" value={form.neq || ''} onChange={handleChange} placeholder="NEQ" className="border p-2 rounded" />
              <input name="tpsTvq" value={form.tpsTvq || ''} onChange={handleChange} placeholder="TPS/TVQ" className="border p-2 rounded" />
              <input name="adresse" value={form.adresse || ''} onChange={handleChange} placeholder="Adresse" className="border p-2 rounded" />
              <input name="email" value={form.email || ''} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
              <input name="telephone" value={form.telephone || ''} onChange={handleChange} placeholder="Téléphone" className="border p-2 rounded" />
              <select name="status" value={form.status || 'actif'} onChange={handleChange} className="border p-2 rounded">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
                <option value="suspendu">Suspendu</option>
              </select>
              <input name="dateFinExercice" value={form.dateFinExercice || ''} onChange={handleChange} placeholder="Date fin exercice" type="date" className="border p-2 rounded" />
            </div>
            <div className="flex justify-end space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>Enregistrer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}