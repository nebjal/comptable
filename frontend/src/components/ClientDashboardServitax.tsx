import { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Eye,
  Edit,
  Send,
  Plus,
  Calculator,
  DollarSign,
  TrendingUp,
  Shield,
  Home,
  BookOpen,
  Target,
  Award,
  Briefcase,
  PieChart
} from 'lucide-react';

interface Document {
  id: string;
  nom: string;
  type: string;
  statut: 'requis' | 'uploade' | 'valide' | 'rejete';
  date_upload?: string;
  commentaire?: string;
  taille?: string;
}

interface Message {
  id: string;
  expediteur: string;
  message: string;
  date: string;
  lu: boolean;
  type: 'recu' | 'envoye';
}

interface RendezVous {
  id: string;
  date: string;
  heure: string;
  type: string;
  statut: 'confirme' | 'en_attente' | 'annule';
  conseiller: string;
}

const ClientDashboardServitax = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [clientInfo] = useState({
    nom: 'Jean Tremblay',
    email: 'j.tremblay@email.com',
    telephone: '(514) 555-0101',
    adresse: '123 Rue Saint-Denis, Montréal, QC H2X 3K8',
    numero_client: 'CLT-2025-001',
    type_service: 'Déclaration T1 Personal',
    statut_dossier: 'en_cours',
    progression: 75,
    conseiller: 'A. Bouhazza'
  });

  const [documents] = useState<Document[]>([
    {
      id: '1',
      nom: 'T4 - Feuillet de revenus d\'emploi',
      type: 'T4',
      statut: 'valide',
      date_upload: '2025-01-15',
      taille: '2.1 MB'
    },
    {
      id: '2',
      nom: 'Reçus médicaux 2024',
      type: 'Médicaux',
      statut: 'uploade',
      date_upload: '2025-01-14',
      taille: '1.8 MB',
      commentaire: 'En cours de validation'
    },
    {
      id: '3',
      nom: 'Relevé 31 - Revenus locatifs',
      type: 'RL31',
      statut: 'requis',
      commentaire: 'Document requis pour compléter votre déclaration'
    },
    {
      id: '4',
      nom: 'Reçus REER 2024',
      type: 'REER',
      statut: 'requis',
      commentaire: 'Nécessaire pour optimiser vos déductions'
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      expediteur: 'A. Bouhazza',
      message: 'Bonjour Jean, votre déclaration T1 progresse bien. Il nous manque seulement votre Relevé 31 pour les revenus locatifs.',
      date: '2025-01-16 10:30',
      lu: true,
      type: 'recu'
    },
    {
      id: '2',
      expediteur: 'Vous',
      message: 'Merci pour la mise à jour. Je vais vous envoyer le RL31 dans les prochains jours.',
      date: '2025-01-16 14:45',
      lu: true,
      type: 'envoye'
    },
    {
      id: '3',
      expediteur: 'Système ServitTax',
      message: 'Rappel: Échéance REER le 1er mars 2025. Consultez nos calculateurs pour optimiser vos cotisations.',
      date: '2025-01-15 09:00',
      lu: false,
      type: 'recu'
    }
  ]);

  const [rendezVous] = useState<RendezVous[]>([
    {
      id: '1',
      date: '2025-01-22',
      heure: '14:00',
      type: 'Consultation fiscale',
      statut: 'confirme',
      conseiller: 'A. Bouhazza'
    },
    {
      id: '2',
      date: '2025-02-05',
      heure: '10:30',
      type: 'Révision finale déclaration',
      statut: 'en_attente',
      conseiller: 'A. Bouhazza'
    }
  ]);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'valide': case 'confirme': return 'bg-green-100 text-green-800';
      case 'uploade': case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'requis': case 'annule': return 'bg-red-100 text-red-800';
      case 'rejete': return 'bg-red-100 text-red-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, action }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {action && (
          <button className="text-servitax-primary hover:text-servitax-secondary transition-colors duration-300">
            {action}
          </button>
        )}
      </div>
      <div className="text-2xl font-bold text-servitax-dark mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{title}</div>
      {subtitle && <div className="text-gray-500 text-xs mt-1">{subtitle}</div>}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bienvenue, {clientInfo.nom.split(' ')[0]} !</h2>
            <p className="text-servitax-light mb-4">
              Votre déclaration {clientInfo.type_service} progresse bien
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-servitax-light" />
                <span className="text-servitax-light">#{clientInfo.numero_client}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-servitax-light" />
                <span className="text-servitax-light">Conseiller: {clientInfo.conseiller}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{clientInfo.progression}%</div>
            <div className="text-servitax-light">Progression</div>
            <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${clientInfo.progression}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Documents"
          value={documents.filter(d => d.statut === 'valide').length}
          subtitle={`${documents.filter(d => d.statut === 'requis').length} requis`}
          color="bg-gradient-to-br from-green-500 to-green-600"
          action={<Eye className="h-5 w-5" />}
        />
        <StatCard
          icon={MessageSquare}
          title="Messages"
          value={messages.filter(m => !m.lu && m.type === 'recu').length}
          subtitle="Non lus"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          action={<Send className="h-5 w-5" />}
        />
        <StatCard
          icon={Calendar}
          title="Rendez-vous"
          value={rendezVous.filter(r => r.statut === 'confirme').length}
          subtitle="Confirmés"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          action={<Plus className="h-5 w-5" />}
        />
        <StatCard
          icon={TrendingUp}
          title="Économies"
          value="2,340$"
          subtitle="Estimées 2024"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          action={<Calculator className="h-5 w-5" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
            <Target className="h-6 w-6 text-servitax-primary mr-3" />
            Actions Prioritaires
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <div className="font-semibold text-red-800">Documents requis</div>
                  <div className="text-red-600 text-sm">2 documents manquants</div>
                </div>
              </div>
              <button className="btn-servitax-primary">
                Voir
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-800">Prochain RDV</div>
                  <div className="text-blue-600 text-sm">22 janvier - 14:00</div>
                </div>
              </div>
              <button className="btn-servitax-secondary">
                Confirmer
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center space-x-3">
                <Calculator className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">Calculateur REER</div>
                  <div className="text-green-600 text-sm">Optimisez vos cotisations</div>
                </div>
              </div>
              <button className="btn-servitax-accent">
                Utiliser
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
            <Award className="h-6 w-6 text-servitax-secondary mr-3" />
            Progression du Dossier
          </h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-servitax-dark">Documents reçus</div>
                <div className="text-gray-600 text-sm">T4, reçus médicaux validés</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-servitax-dark">En cours de traitement</div>
                <div className="text-gray-600 text-sm">Calculs et optimisations</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-600">En attente</div>
                <div className="text-gray-500 text-sm">Documents requis manquants</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Send className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-500">Finalisation</div>
                <div className="text-gray-400 text-sm">Révision et envoi</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
          <MessageSquare className="h-6 w-6 text-servitax-accent mr-3" />
          Messages Récents
        </h3>
        <div className="space-y-4">
          {messages.slice(0, 3).map((message) => (
            <div key={message.id} className={`p-4 rounded-xl border ${message.lu ? 'bg-gray-50 border-gray-100' : 'bg-blue-50 border-blue-100'}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-servitax-dark">{message.expediteur}</div>
                <div className="text-gray-600 text-sm">{message.date}</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{message.message}</p>
              {!message.lu && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    Nouveau
                  </span>
                </div>
              )}
            </div>
          ))}
          <button className="w-full text-center text-servitax-primary font-semibold hover:text-servitax-secondary transition-colors duration-300">
            Voir tous les messages →
          </button>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-servitax-dark">Mes Documents</h2>
          <p className="text-gray-600">Gérez et suivez vos documents fiscaux</p>
        </div>
        <button className="bg-gradient-to-r from-servitax-primary to-servitax-primary hover:from-servitax-primary/90 hover:to-servitax-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Nouveau Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              {documents.filter(d => d.statut === 'valide').length}
            </span>
          </div>
          <div className="text-green-700 font-semibold">Documents Validés</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-800">
              {documents.filter(d => d.statut === 'uploade').length}
            </span>
          </div>
          <div className="text-yellow-700 font-semibold">En Validation</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-red-800">
              {documents.filter(d => d.statut === 'requis').length}
            </span>
          </div>
          <div className="text-red-700 font-semibold">Requis</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">{documents.length}</span>
          </div>
          <div className="text-blue-700 font-semibold">Total</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  doc.statut === 'valide' ? 'bg-green-100' :
                  doc.statut === 'uploade' ? 'bg-yellow-100' :
                  doc.statut === 'requis' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <FileText className={`h-6 w-6 ${
                    doc.statut === 'valide' ? 'text-green-600' :
                    doc.statut === 'uploade' ? 'text-yellow-600' :
                    doc.statut === 'requis' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-servitax-dark">{doc.nom}</div>
                  {doc.date_upload && (
                    <div className="text-gray-600 text-sm">
                      Uploadé le {doc.date_upload} • {doc.taille}
                    </div>
                  )}
                  {doc.commentaire && (
                    <div className="text-gray-600 text-sm mt-1">{doc.commentaire}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(doc.statut)}`}>
                  {doc.statut}
                </span>
                <div className="flex items-center space-x-2">
                  {doc.statut === 'requis' ? (
                    <button className="p-2 bg-servitax-primary text-white rounded-lg hover:bg-servitax-primary/90 transition-colors duration-300">
                      <Upload className="h-4 w-4" />
                    </button>
                  ) : (
                    <button className="p-2 bg-servitax-secondary/10 text-servitax-secondary rounded-lg hover:bg-servitax-secondary/20 transition-colors duration-300">
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button className="p-2 bg-servitax-accent/10 text-servitax-accent rounded-lg hover:bg-servitax-accent/20 transition-colors duration-300">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home, color: 'text-servitax-primary' },
    { id: 'documents', label: 'Mes Documents', icon: FileText, color: 'text-servitax-secondary' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'text-servitax-accent' },
    { id: 'rendez-vous', label: 'Rendez-vous', icon: Calendar, color: 'text-purple-600' },
    { id: 'calculateurs', label: 'Calculateurs', icon: Calculator, color: 'text-green-600' },
    { id: 'profil', label: 'Mon Profil', icon: User, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-servitax-primary/5">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-servitax-dark">Espace Client ServitTax</h1>
              <p className="text-gray-600 text-sm">Gestion de votre dossier fiscal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 hover:text-servitax-primary cursor-pointer transition-colors duration-300" />
              {messages.filter(m => !m.lu && m.type === 'recu').length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-servitax-secondary rounded-full"></div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {clientInfo.nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-servitax-dark">{clientInfo.nom}</div>
                <div className="text-gray-600 text-sm">{clientInfo.numero_client}</div>
              </div>
            </div>
            <button className="p-2 text-gray-600 hover:text-servitax-primary transition-colors duration-300">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-servitax-primary/10 to-servitax-primary/5 border-l-4 border-servitax-primary text-servitax-primary'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-servitax-primary'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${activeSection === item.id ? 'text-servitax-primary' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'messages' && messages.filter(m => !m.lu && m.type === 'recu').length > 0 && (
                    <span className="bg-servitax-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {messages.filter(m => !m.lu && m.type === 'recu').length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'documents' && renderDocuments()}
          {activeSection === 'messages' && (
            <div className="text-center py-16">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Centre de Messages</h3>
              <p className="text-gray-500">Communiquez avec votre conseiller fiscal</p>
            </div>
          )}
          {activeSection === 'rendez-vous' && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibent text-gray-600 mb-2">Gestion des Rendez-vous</h3>
              <p className="text-gray-500">Planifiez vos consultations</p>
            </div>
          )}
          {activeSection === 'calculateurs' && (
            <div className="text-center py-16">
              <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Calculateurs Fiscaux</h3>
              <p className="text-gray-500">Outils d'estimation et de planification</p>
            </div>
          )}
          {activeSection === 'profil' && (
            <div className="text-center py-16">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Mon Profil</h3>
              <p className="text-gray-500">Informations personnelles et préférences</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardServitax;