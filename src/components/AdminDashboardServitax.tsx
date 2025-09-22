import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Calculator, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Mail,
  Phone,
  Building2,
  User,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Send,
  MessageSquare,
  Briefcase,
  PieChart,
  Target,
  Award,
  Globe,
  Shield,
  Zap,
  BookOpen,
  LogOut,
  Home,
  Menu,
  X
} from 'lucide-react';

interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  statut: 'actif' | 'inactif' | 'en_attente';
  derniere_connexion: string;
  documents_en_attente: number;
  type_service: string;
  progres_declaration: number;
}

const AdminDashboardServitax = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Données réalistes
  const [stats] = useState({
    clients_actifs: 127,
    declarations_en_cours: 34,
    documents_recus: 89,
    revenus_mensuel: 45280,
    taux_completion: 78,
    satisfaction_client: 96
  });

  const [clients] = useState<Client[]>([
    {
      id: '1',
      nom: 'Jean Tremblay',
      email: 'j.tremblay@email.com',
      telephone: '(514) 555-0101',
      statut: 'actif',
      derniere_connexion: '2025-01-15',
      documents_en_attente: 3,
      type_service: 'Déclaration T1',
      progres_declaration: 75
    },
    {
      id: '2', 
      nom: 'Marie Dubois',
      email: 'm.dubois@email.com',
      telephone: '(514) 555-0102',
      statut: 'en_attente',
      derniere_connexion: '2025-01-10',
      documents_en_attente: 1,
      type_service: 'Tenue de livres',
      progres_declaration: 25
    }
  ]);

  const StatCard = ({ icon: Icon, title, value, change, color, trend }: any) => (
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-bold">+{change}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-servitax-dark mb-2">{value}</div>
      <div className="text-gray-600 font-semibold">{title}</div>
    </div>
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home, color: 'text-servitax-primary' },
    { id: 'clients', label: 'Clients', icon: Users, color: 'text-servitax-secondary', badge: clients.length },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-servitax-accent', badge: stats.documents_recus },
    { id: 'signatures', label: 'Signatures', icon: Edit, color: 'text-purple-600' },
    { id: 'communications', label: 'Messages', icon: MessageSquare, color: 'text-green-600', badge: 12 },
    { id: 'rapports', label: 'Rapports', icon: BarChart3, color: 'text-orange-600' },
    { id: 'calendrier', label: 'Calendrier', icon: Calendar, color: 'text-blue-600' },
    { id: 'parametres', label: 'Paramètres', icon: Settings, color: 'text-gray-600' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-servitax-primary via-servitax-secondary to-servitax-accent rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-3">Bonjour, A. Bouhazza ! 👋</h1>
            <p className="text-servitax-light text-xl mb-6">
              Voici un aperçu de votre activité ServitTax aujourd'hui
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-servitax-light" />
                <span className="text-servitax-light font-semibold">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-servitax-light" />
                <span className="text-servitax-light font-semibold">
                  {new Date().toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-black mb-2">{stats.clients_actifs}</div>
            <div className="text-servitax-light text-lg">Clients Actifs</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          icon={Users}
          title="Clients Actifs"
          value={stats.clients_actifs}
          change="12"
          color="bg-gradient-to-br from-servitax-primary to-servitax-primary"
          trend={true}
        />
        <StatCard
          icon={FileText}
          title="Déclarations"
          value={stats.declarations_en_cours}
          change="8"
          color="bg-gradient-to-br from-servitax-secondary to-servitax-secondary"
          trend={true}
        />
        <StatCard
          icon={Upload}
          title="Documents"
          value={stats.documents_recus}
          change="15"
          color="bg-gradient-to-br from-servitax-accent to-servitax-accent"
          trend={true}
        />
        <StatCard
          icon={DollarSign}
          title="Revenus"
          value={`${(stats.revenus_mensuel / 1000).toFixed(0)}K$`}
          change="22"
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend={true}
        />
        <StatCard
          icon={Target}
          title="Completion"
          value={`${stats.taux_completion}%`}
          change="5"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend={true}
        />
        <StatCard
          icon={Award}
          title="Satisfaction"
          value={`${stats.satisfaction_client}%`}
          change="3"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend={true}
        />
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-servitax-dark mb-8 flex items-center">
            <Zap className="h-7 w-7 text-servitax-primary mr-3" />
            Actions Rapides
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="group p-6 bg-gradient-to-br from-servitax-primary/10 to-servitax-primary/5 rounded-2xl hover:from-servitax-primary/20 hover:to-servitax-primary/10 transition-all duration-300 border border-servitax-primary/20">
              <Plus className="h-10 w-10 text-servitax-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-servitax-dark">Nouveau Client</div>
                <div className="text-gray-600 text-sm">Ajouter un client</div>
              </div>
            </button>
            <button className="group p-6 bg-gradient-to-br from-servitax-secondary/10 to-servitax-secondary/5 rounded-2xl hover:from-servitax-secondary/20 hover:to-servitax-secondary/10 transition-all duration-300 border border-servitax-secondary/20">
              <Upload className="h-10 w-10 text-servitax-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-servitax-dark">Documents</div>
                <div className="text-gray-600 text-sm">Gérer uploads</div>
              </div>
            </button>
            <button className="group p-6 bg-gradient-to-br from-servitax-accent/10 to-servitax-accent/5 rounded-2xl hover:from-servitax-accent/20 hover:to-servitax-accent/10 transition-all duration-300 border border-servitax-accent/20">
              <Send className="h-10 w-10 text-servitax-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-servitax-dark">Messages</div>
                <div className="text-gray-600 text-sm">Communication</div>
              </div>
            </button>
            <button className="group p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl hover:from-green-500/20 hover:to-green-500/10 transition-all duration-300 border border-green-500/20">
              <BarChart3 className="h-10 w-10 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="font-bold text-servitax-dark">Rapports</div>
                <div className="text-gray-600 text-sm">Générer rapports</div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-servitax-dark mb-8 flex items-center">
            <Bell className="h-7 w-7 text-servitax-secondary mr-3" />
            Activité Récente
          </h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-servitax-dark">Déclaration T1 complétée</div>
                <div className="text-gray-600 text-sm">Jean Tremblay • Il y a 2 heures</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-servitax-dark">Nouveau document reçu</div>
                <div className="text-gray-600 text-sm">Marie Dubois • Il y a 4 heures</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-servitax-dark">Nouveau client inscrit</div>
                <div className="text-gray-600 text-sm">Pierre Lavoie Inc. • Il y a 6 heures</div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 text-center text-servitax-primary font-bold hover:text-servitax-secondary transition-colors duration-300 p-3 bg-servitax-primary/5 rounded-2xl hover:bg-servitax-primary/10">
            Voir toute l'activité →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-servitax-primary/5">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center">
                <Calculator className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-servitax-dark">ServitTax Admin</h1>
                <p className="text-gray-600 text-sm">Centre de gestion professionnel</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 hover:text-servitax-primary cursor-pointer transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-servitax-secondary rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-gray-200/50">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">AB</span>
              </div>
              <div className="hidden md:block">
                <div className="font-bold text-servitax-dark">A. Bouhazza</div>
                <div className="text-gray-600 text-sm">Administrateur</div>
              </div>
            </div>
            <button className="p-3 text-gray-600 hover:text-servitax-primary hover:bg-white/50 rounded-2xl transition-all duration-300">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-white/90 backdrop-blur-lg border-r border-gray-200/50 min-h-screen transition-all duration-500 ease-in-out`}>
          <div className="p-6">
            <nav className="space-y-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-servitax-primary to-servitax-secondary text-white shadow-lg shadow-servitax-primary/25'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-servitax-primary'
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${activeSection === item.id ? 'text-white' : item.color}`} />
                  {sidebarOpen && (
                    <>
                      <span className="font-semibold flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeSection === item.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-servitax-primary text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'clients' && (
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-servitax-dark mb-6">Gestion des Clients</h2>
              <p className="text-gray-600 mb-8">Interface de gestion complète en développement...</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <div key={client.id} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {client.nom.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-servitax-dark">{client.nom}</div>
                        <div className="text-gray-600 text-sm">{client.type_service}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Progrès:</span>
                        <span className="font-semibold">{client.progres_declaration}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-servitax-primary to-servitax-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${client.progres_declaration}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection !== 'dashboard' && activeSection !== 'clients' && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Section en développement</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Cette fonctionnalité sera bientôt disponible dans votre tableau de bord ServitTax.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardServitax;