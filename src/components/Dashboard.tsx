import DashboardServitax from './DashboardServitax';

export default DashboardServitax;
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Quick Actions Modal States
  const [showSecureMessage, setShowSecureMessage] = useState(false);
  const [showEncryptedMessage, setShowEncryptedMessage] = useState(false);
  const [showClientEmail, setShowClientEmail] = useState(false);
  const [showExternalComm, setShowExternalComm] = useState(false);
  const [showScheduleCall, setShowScheduleCall] = useState(false);
  const [showNewSignature, setShowNewSignature] = useState(false);

  // Signature request hook
  const { createSignatureRequest, isLoading: signatureLoading, error: signatureError } = useSignatureRequest();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdate(new Date());
    }, 1500);
  };

  // Gestion des clients pour validation admin
  const [clients, setClients] = useState([
    { id: 'c1', name: 'Entreprise ABC', status: 'actif', sector: 'Commerce', contact: 'Marie Dupont', email: 'marie@abc.com', phone: '+1 514-123-4567', lastInteraction: '2025-09-15', totalRevenue: 250000, pendingTasks: 3, avatar: 'MA' },
    { id: 'c2', name: 'Consultation DEF', status: 'actif', sector: 'Services', contact: 'Jean Martin', email: 'jean@def.com', phone: '+1 438-987-6543', lastInteraction: '2025-09-14', totalRevenue: 180000, pendingTasks: 1, avatar: 'JM' },
    { id: 'c3', name: 'Restaurant XYZ', status: 'inactif', sector: 'Restauration', contact: 'Sophie Tremblay', email: 'sophie@xyz.com', phone: '+1 450-555-0123', lastInteraction: '2025-08-20', totalRevenue: 95000, pendingTasks: 0, avatar: 'ST' },
    { id: 'c4', name: 'Services GHI', status: 'actif', sector: 'Technologie', contact: 'Pierre Dubois', email: 'pierre@ghi.com', phone: '+1 514-777-8888', lastInteraction: '2025-09-16', totalRevenue: 320000, pendingTasks: 5, avatar: 'PD' },
  ]);

  // Fonction de validation admin
  const handleValidateClient = (id: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: 'actif' } : c));
    // Optionnel : notification ou callback
    alert('Le client a été validé et activé.');
  };

  const clientsEnAttente = clients.filter(c => c.status === 'en_attente');

  // ...existing code...

  // Affichage de la section validation admin en haut du dashboard
  // (avant le reste du contenu)
  // On peut l'intégrer dans le return principal :

  // ...existing code...

  // ...clients sont maintenant gérés par useState plus haut...

  const documents = [
    { id: 'd1', name: 'Facture Fournisseur 001', type: 'facture', client: 'Entreprise ABC', dateRecu: '2025-09-10', status: 'en_attente', taille: '1.2 MB', priority: 'haute', deadline: '2025-09-20', assignedTo: 'Alice', progress: 0, icon: FileText },
    { id: 'd2', name: 'Relevé Bancaire Août', type: 'releve_bancaire', client: 'Entreprise ABC', dateRecu: '2025-09-05', status: 'traite', taille: '800 KB', priority: 'moyenne', deadline: '2025-09-18', assignedTo: 'Bob', progress: 100, icon: FileText },
    { id: 'd3', name: 'Bulletin de Paie Juillet', type: 'bulletin_paie', client: 'Consultation DEF', dateRecu: '2025-08-31', status: 'archive', taille: '350 KB', priority: 'basse', deadline: '2025-09-15', assignedTo: 'Alice', progress: 100, icon: FileText },
    { id: 'd4', name: 'Déclaration Fiscale 2024', type: 'declaration_fiscale', client: 'Restaurant XYZ', dateRecu: '2025-09-01', status: 'en_cours', taille: '2.1 MB', priority: 'haute', deadline: '2025-09-25', assignedTo: 'Charlie', progress: 75, icon: FileText },
    { id: 'd5', name: 'Contrat Client', type: 'contrat', client: 'Services GHI', dateRecu: '2025-09-12', status: 'en_attente', taille: '950 KB', priority: 'haute', deadline: '2025-09-22', assignedTo: 'Alice', progress: 0, icon: FileText },
    { id: 'd6', name: 'Rapport Annuel', type: 'rapport', client: 'Entreprise ABC', dateRecu: '2025-09-08', status: 'en_cours', taille: '3.2 MB', priority: 'moyenne', deadline: '2025-09-30', assignedTo: 'Bob', progress: 60, icon: FileText },
  ];

  const signatures = [
    { id: 's1', documentName: 'Déclaration TPS/TVQ', clientName: 'Entreprise ABC', status: 'en_attente', dateEcheance: '2025-09-18', signers: ['Marie Dupont'], progress: 0 },
    { id: 's2', documentName: 'Contrat de travail', clientName: 'Services GHI', status: 'signe', dateEcheance: '2025-09-10', signers: ['Pierre Dubois'], progress: 100 },
    { id: 's3', documentName: 'Facture fournisseur', clientName: 'Restaurant XYZ', status: 'en_attente', dateEcheance: '2025-09-20', signers: ['Sophie Tremblay'], progress: 0 },
    { id: 's4', documentName: 'Rapport mensuel', clientName: 'Consultation DEF', status: 'signe', dateEcheance: '2025-09-05', signers: ['Jean Martin'], progress: 100 },
  ];

  const declarations = [
    { id: 'dec1', name: 'Déclaration TPS/TVQ T3', client: 'Entreprise ABC', status: 'en_cours', progress: 75, deadline: '2025-09-30', assignedTo: 'Alice', type: 'TPS/TVQ', amount: 12500 },
    { id: 'dec2', name: 'Déclaration de Revenus', client: 'Consultation DEF', status: 'validee', progress: 100, deadline: '2025-09-25', assignedTo: 'Bob', type: 'Impôt fédéral', amount: 8500 },
    { id: 'dec3', name: 'Rapport d\'impôt provincial', client: 'Services GHI', status: 'en_attente', progress: 0, deadline: '2025-10-15', assignedTo: 'Charlie', type: 'Impôt provincial', amount: 15200 },
    { id: 'dec4', name: 'Déclaration annuelle', client: 'Restaurant XYZ', status: 'en_revision', progress: 90, deadline: '2025-09-20', assignedTo: 'Alice', type: 'Impôt fédéral', amount: 6200 },
  ];

  const accountants = [
    { id: 'acc1', name: 'Alice Johnson', role: 'Senior Accountant', workload: 85, activeClients: 12, completedTasks: 45, avatar: 'AJ', status: 'online' },
    { id: 'acc2', name: 'Bob Smith', role: 'Tax Specialist', workload: 70, activeClients: 8, completedTasks: 32, avatar: 'BS', status: 'busy' },
    { id: 'acc3', name: 'Charlie Brown', role: 'Audit Manager', workload: 95, activeClients: 15, completedTasks: 67, avatar: 'CB', status: 'away' },
  ];

  const alerts = [
    { id: 'a1', type: 'urgent', message: 'Déclaration TPS/TVQ pour Entreprise ABC arrive à échéance dans 2 jours', priority: 'haute', date: '2025-09-16', icon: AlertTriangle },
    { id: 'a2', type: 'anomaly', message: 'Incohérence détectée dans les relevés bancaires de Services GHI', priority: 'moyenne', date: '2025-09-15', icon: AlertTriangle },
    { id: 'a3', type: 'urgent', message: 'Document manquant pour Restaurant XYZ - Bulletin de paie août', priority: 'haute', date: '2025-09-14', icon: AlertTriangle },
    { id: 'a4', type: 'info', message: 'Nouveau client Consultation DEF ajouté au système', priority: 'basse', date: '2025-09-13', icon: CheckCircle },
  ];

  // Statistics calculations
  const totalFiles = documents.length;
  const filesByStatus = {
    en_attente: documents.filter(d => d.status === 'en_attente').length,
    en_cours: documents.filter(d => d.status === 'en_cours').length,
    traite: documents.filter(d => d.status === 'traite').length,
    archive: documents.filter(d => d.status === 'archive').length,
  };

  const urgentFiles = documents.filter(d => d.priority === 'haute' && d.status !== 'traite').length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const avgProcessingTime = 3.2; // days
  const completionRate = 78; // percentage

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'declarations', label: 'Déclarations', icon: Target },
    { id: 'signatures', label: 'Signatures', icon: Edit },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'reports', label: 'Rapports', icon: TrendingUp },
    { id: 'automation', label: 'Automatisation', icon: Zap },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'en_cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'traite': return 'bg-green-100 text-green-700 border-green-200';
      case 'archive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'validee': return 'bg-green-100 text-green-700 border-green-200';
      case 'en_revision': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return 'bg-red-100 text-red-700 border-red-200';
      case 'moyenne': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'basse': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderOverview = () => (
    <>
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Total Dossiers</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{totalFiles}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-6 flex items-center text-sm">
            <div className="flex items-center text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12%</span>
            </div>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Dossiers Urgents</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{urgentFiles}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <span className="text-red-600 font-semibold text-sm">Priorité haute</span>
          </div>
        </div>

        <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Revenus Totaux</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-6 flex items-center text-sm">
            <div className="flex items-center text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8%</span>
            </div>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Taux Complétude</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{completionRate}%</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <span className="text-indigo-600 font-semibold text-sm">Objectif: 85%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Actions Rapides</h3>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Communication & Planification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Message Sécurisé */}
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment envoyer un message sécurisé ?')) setShowSecureMessage(true);
            }}
            className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-blue-300"
            aria-label="Envoyer un message sécurisé"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Message Sécurisé</h4>
              <p className="text-sm text-gray-600">Envoyer un message sécurisé</p>
            </div>
          </button>

          {/* Envoyer un message chiffré */}
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment envoyer un message chiffré ?')) setShowEncryptedMessage(true);
            }}
            className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-purple-300"
            aria-label="Envoyer un message chiffré"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Message Chiffré</h4>
              <p className="text-sm text-gray-600">Communication cryptée</p>
            </div>
          </button>

          {/* Email Client */}
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment envoyer un email au client ?')) setShowClientEmail(true);
            }}
            className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-green-300"
            aria-label="Envoyer un email au client"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Email Client</h4>
              <p className="text-sm text-gray-600">Communication directe</p>
            </div>
          </button>

          {/* Communication externe */}
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment communiquer avec un partenaire externe ?')) setShowExternalComm(true);
            }}
            className="group p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-orange-300"
            aria-label="Communication externe"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Communication Externe</h4>
              <p className="text-sm text-gray-600">Partenaires externes</p>
            </div>
          </button>

          {/* Planifier Appel */}
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment planifier un appel ?')) setShowScheduleCall(true);
            }}
            className="group p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-cyan-300"
            aria-label="Planifier un appel"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Planifier Appel</h4>
              <p className="text-sm text-gray-600">Rendez-vous téléphonique</p>
            </div>
          </button>
        </div>
      </div>

      {/* Status Distribution & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Status Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-500" />
            Répartition par Statut
          </h3>
          <div className="space-y-3">
            {Object.entries(filesByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    status === 'en_attente' ? 'bg-orange-400' :
                    status === 'en_cours' ? 'bg-blue-400' :
                    status === 'traite' ? 'bg-green-400' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-900 mr-2">{count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        status === 'en_attente' ? 'bg-orange-400' :
                        status === 'en_cours' ? 'bg-blue-400' :
                        status === 'traite' ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                      style={{ width: `${(count / totalFiles) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Alertes Critiques</h3>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {alerts.filter(a => a.priority === 'haute').length} urgentes
            </span>
          </div>
          <div className="space-y-4">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-102 ${
                alert.priority === 'haute' ? 'border-red-200 bg-gradient-to-r from-red-50 to-orange-50' :
                alert.priority === 'moyenne' ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50' :
                'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        alert.priority === 'haute' ? 'bg-red-500 animate-pulse' :
                        alert.priority === 'moyenne' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <p className="text-sm font-bold text-gray-900">{alert.message}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 ml-6">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(alert.date).toLocaleDateString('fr-CA')}
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    alert.priority === 'haute' ? 'bg-red-100 text-red-700' :
                    alert.priority === 'moyenne' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Distribution */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Équipe Comptable</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {accountants.slice(0, 3).map((acc) => (
                <div key={acc.id} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">
                  {acc.avatar}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {accountants.length} membres
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accountants.map((accountant) => (
            <div key={accountant.id} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg mr-4">
                    {accountant.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{accountant.name}</h4>
                    <p className="text-sm text-gray-600">{accountant.role}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  accountant.status === 'online' ? 'bg-green-500' :
                  accountant.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Charge de travail</span>
                    <span className="font-bold text-gray-900">{accountant.workload}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        accountant.workload > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        accountant.workload > 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${accountant.workload}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{accountant.activeClients} clients</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>{accountant.completedTasks} tâches</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-12">
      <SettingsAPI />
    </div>
    </>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Flow Management */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            Gestion des Flux de Documents
          </h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Document
            </button>
          </div>
        </div>

        {/* Priority Queue */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Documents en Attente de Traitement</h4>
          <div className="space-y-3">
            {documents
              .filter(doc => doc.status === 'en_attente')
              .sort((a, b) => {
                const priorityOrder: Record<string, number> = { haute: 3, moyenne: 2, basse: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      doc.priority === 'haute' ? 'bg-red-500' :
                      doc.priority === 'moyenne' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <h5 className="font-medium text-gray-900">{doc.name}</h5>
                      <p className="text-sm text-gray-600">{doc.client} • {doc.type} • {doc.taille}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(doc.priority)}`}>
                      {doc.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      Échéance: {new Date(doc.deadline).toLocaleDateString('fr-CA')}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Traiter
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Incomplete Documents */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Documents Incomplets</h4>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                3 documents nécessitent des pièces complémentaires
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-yellow-700">
                • Bulletin de paie manquant pour Restaurant XYZ
              </div>
              <div className="text-sm text-yellow-700">
                • Relevé bancaire incomplet pour Services GHI
              </div>
              <div className="text-sm text-yellow-700">
                • Justificatifs de dépenses manquants pour Consultation DEF
              </div>
            </div>
            <button className="mt-3 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors">
              Envoyer Notifications
            </button>
          </div>
        </div>

        {/* Document History */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Historique des Documents Traités</h4>
          <div className="space-y-3">
            {documents
              .filter(doc => doc.status === 'traite' || doc.status === 'archive')
              .slice(0, 5)
              .map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{doc.name}</h5>
                      <p className="text-xs text-gray-600">
                        Traité par {doc.assignedTo} • {new Date(doc.dateRecu).toLocaleDateString('fr-CA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{doc.taille}</span>
                    <button className="text-green-600 hover:text-green-700 text-sm">
                      <Archive className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeclarations = () => (
    <div className="space-y-6">
      {/* Declaration Tracking */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Target className="h-5 w-5 mr-2 text-green-500" />
          Suivi des Déclarations en Cours
        </h3>

        {/* Calendar View */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Calendrier des Échéances</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {declarations.map((decl) => (
              <div key={decl.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{decl.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(decl.status)}`}>
                    {decl.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{decl.client}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{decl.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${decl.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Échéance: {new Date(decl.deadline).toLocaleDateString('fr-CA')}</span>
                    <span>${decl.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Workflow */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Workflow de Validation</h4>
          <div className="space-y-3">
            {declarations
              .filter(decl => decl.status === 'en_revision')
              .map((decl) => (
                <div key={decl.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{decl.name}</h5>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                        Approuver
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                        Rejeter
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">En révision par {decl.assignedTo}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">Client: {decl.client}</span>
                    <span className="text-gray-500">Montant: ${decl.amount.toLocaleString()}</span>
                    <span className="text-gray-500">Échéance: {new Date(decl.deadline).toLocaleDateString('fr-CA')}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignatures = () => (
    <div className="space-y-6">
      {/* Signature Module */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Edit className="h-5 w-5 mr-2 text-purple-500" />
            Module de Signature Électronique
          </h3>
          <button
            onClick={() => setShowNewSignature(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Envoyer Document
          </button>
        </div>

        <div className="space-y-4">
          {signatures.map((sig) => (
            <div key={sig.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{sig.documentName}</h4>
                  <p className="text-sm text-gray-600">{sig.clientName}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sig.status)}`}>
                    {sig.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Échéance: {new Date(sig.dateEcheance).toLocaleDateString('fr-CA')}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Signataires:</span>
                  {sig.signers.map((signer, index) => (
                    <span key={index} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {signer}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Space */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
          Espace de Collaboration
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Discussion: Déclaration TPS/TVQ Entreprise ABC</h4>
              <span className="text-xs text-gray-500">2 messages non lus</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Marie Dupont: "Pouvez-vous vérifier les montants de la période Q3?"</p>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Répondre..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Envoyer
              </button>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Notification: Document signé</h4>
              <span className="text-xs text-gray-500">Il y a 5 min</span>
            </div>
            <p className="text-sm text-gray-600">Pierre Dubois a signé le contrat de travail pour Services GHI</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      {/* Client Management */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-500" />
            Gestion des Relations Clients
          </h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Client
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600">{client.sector}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  client.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {client.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <UserCheck className="h-4 w-4 mr-2" />
                  {client.contact}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {client.phone}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-600">Dernière interaction:</span>
                  <span className="font-medium ml-1">
                    {new Date(client.lastInteraction).toLocaleDateString('fr-CA')}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="text-purple-600 hover:text-purple-700" onClick={() => { setSelectedClientId(client.id); setActiveTab('documents'); }}>Voir les documents</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Scheduling */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-orange-500" />
          Planification des Rendez-vous
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">Consultation avec Marie Dupont</h4>
                <p className="text-sm text-gray-600">Entreprise ABC - Révision fiscale</p>
              </div>
              <span className="text-sm text-orange-600 font-medium">Aujourd'hui 14:00</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-6">
      {/* Automation & Productivity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Automatisation et Productivité
        </h3>

        {/* Customizable Workflows */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Workflows Personnalisables</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">Traitement PME</h5>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Actif</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Workflow automatisé pour les petites et moyennes entreprises
              </p>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">Traitement Corporate</h5>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Actif</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Workflow spécialisé pour les grandes entreprises
              </p>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Templates */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Templates de Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <File className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h5 className="font-medium text-gray-900 text-center">Déclaration TPS/TVQ</h5>
              <p className="text-sm text-gray-600 text-center">Template pré-rempli</p>
              <button className="w-full mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                Utiliser
              </button>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <File className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h5 className="font-medium text-gray-900 text-center">Rapport Financier</h5>
              <p className="text-sm text-gray-600 text-center">Synthèse mensuelle</p>
              <button className="w-full mt-3 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                Utiliser
              </button>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <File className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h5 className="font-medium text-gray-900 text-center">Contrat Client</h5>
              <p className="text-sm text-gray-600 text-center">Modèle standard</p>
              <button className="w-full mt-3 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                Utiliser
              </button>
            </div>
          </div>
        </div>

        {/* Intelligent Notifications */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Notifications Intelligentes</h4>
          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">Rappel d'échéance</h5>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-gray-600">
                Notification 3 jours avant l'échéance des déclarations importantes
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">Documents manquants</h5>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-gray-600">
                Alerte automatique quand des pièces justificatives sont manquantes
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">Tâches terminées</h5>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-gray-600">
                Confirmation de traitement et notification aux clients concernés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-8 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveTab('overview')} role="button" aria-label="Accueil">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tableau de Bord Comptable
            </h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble complète de votre activité</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4" />
            <span>Dernière synchronisation: {lastUpdate.toLocaleTimeString('fr-CA')}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="bg-white text-gray-700 p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 px-8 py-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-2 border border-gray-200/50 shadow-xl">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 pb-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'declarations' && renderDeclarations()}
        {activeTab === 'signatures' && renderSignatures()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'automation' && renderAutomation()}
      </div>
    </div>
  );
}