import { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, Calendar, Search, FileText, Shield } from 'lucide-react';

interface Communication {
  id: string;
  type: 'message' | 'email' | 'appel';
  sujet: string;
  contenu: string;
  clientName: string;
  clientId: string;
  dateEnvoi: string;
  statut: 'envoye' | 'lu' | 'repondu';
  priority: 'normal' | 'urgent' | 'faible';
  attachments?: number;
}

export default function Communications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [selectedClient, setSelectedClient] = useState('tous');
  const [communications] = useState<Communication[]>([
    {
      id: '1',
      type: 'message',
      sujet: 'Demande de document',
      contenu: 'Pouvez-vous envoyer la facture de septembre ?',
      clientName: 'Entreprise ABC',
      clientId: 'c1',
      dateEnvoi: '2025-09-15T10:30:00',
      statut: 'envoye',
      priority: 'normal',
      attachments: 1,
    },
    {
      id: '2',
      type: 'email',
      sujet: 'Confirmation de signature',
      contenu: 'La déclaration fiscale a été signée électroniquement.',
      clientName: 'Entreprise XYZ',
      clientId: 'c3',
      dateEnvoi: '2025-09-14T14:20:00',
      statut: 'lu',
      priority: 'faible',
    },
    {
      id: '3',
      type: 'appel',
      sujet: 'Rendez-vous téléphonique',
      contenu: 'Appel prévu pour valider les documents.',
      clientName: 'Consultant DEF',
      clientId: 'c2',
      dateEnvoi: '2025-09-13T09:00:00',
      statut: 'repondu',
      priority: 'urgent',
    },
  ]);
  const [clients] = useState([
    { id: 'c1', nom: 'Entreprise ABC' },
    { id: 'c2', nom: 'Consultant DEF' },
    { id: 'c3', nom: 'Entreprise XYZ' },
  ]);

  // ...existing code...

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'tous' || comm.type === filterType;
    const matchesClient = selectedClient === 'tous' || comm.clientId === selectedClient;
    return matchesSearch && matchesType && matchesClient;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'email': return <Mail className="w-5 h-5 text-green-600" />;
      case 'appel': return <Phone className="w-5 h-5 text-purple-600" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'repondu': return 'bg-green-100 text-green-800';
      case 'lu': return 'bg-blue-100 text-blue-800';
      case 'envoye': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-400 bg-red-50';
      case 'normal': return 'border-l-blue-400 bg-blue-50';
      case 'faible': return 'border-l-gray-400 bg-gray-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600 mt-2">Échanges sécurisés avec vos clients</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Send className="w-5 h-5" />
          <span>Nouveau Message</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher communications..."
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
          <option value="message">Messages</option>
          <option value="email">Emails</option>
          <option value="appel">Appels</option>
        </select>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.nom}</option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
            <MessageSquare className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Message Sécurisé</div>
              <div className="text-sm text-gray-600">Envoyer un message chiffré</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
            <Mail className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Email Client</div>
              <div className="text-sm text-gray-600">Communication externe</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
            <Calendar className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Planifier Appel</div>
              <div className="text-sm text-gray-600">Rendez-vous téléphonique</div>
            </div>
          </button>
        </div>
      </div>

      {/* Communications List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Historique des Communications</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredCommunications.map((communication) => (
            <div key={communication.id} className={`p-6 border-l-4 ${getPriorityColor(communication.priority)} hover:bg-gray-50 transition-colors`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(communication.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{communication.sujet}</h3>
                      <p className="text-sm text-gray-600 mt-1">{communication.clientName}</p>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{communication.contenu}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(communication.statut)}`}>
                        {communication.statut === 'envoye' ? 'Envoyé' :
                         communication.statut === 'lu' ? 'Lu' : 'Répondu'}
                      </span>
                      {communication.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{new Date(communication.dateEnvoi).toLocaleString('fr-CA')}</span>
                      {communication.attachments && communication.attachments > 0 && (
                        <span className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{communication.attachments} pièce(s) jointe(s)</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Répondre
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Archiver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Communications Sécurisées</h3>
            <p className="text-sm text-green-800 mb-3">
              Toutes les communications sont chiffrées de bout en bout et respectent les exigences de la Loi 25 
              sur la protection des renseignements personnels. Les messages internes à l'application bénéficient 
              d'une sécurité renforcée avec authentification multi-facteurs.
            </p>
            <div className="flex items-center space-x-4 text-sm text-green-700">
              <span>• Chiffrement TLS 1.3</span>
              <span>• Authentification MFA</span>
              <span>• Audit trail complet</span>
              <span>• Conservation sécurisée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}