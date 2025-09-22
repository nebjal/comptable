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
  Home
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

interface Document {
  id: string;
  nom: string;
  client: string;
  type: string;
  statut: 'recu' | 'en_cours' | 'complete' | 'envoye';
  date_upload: string;
  taille: string;
}

interface Task {
  id: string;
  titre: string;
  client: string;
  priorite: 'haute' | 'moyenne' | 'basse';
  echeance: string;
  statut: 'a_faire' | 'en_cours' | 'complete';
  assignee: string;
}

const AdminDashboardServitax = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('tous');

  // Données de démonstration avec vraies informations ServitTax
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
    },
    {
      id: '3',
      nom: 'Pierre Lavoie Inc.',
      email: 'p.lavoie@entreprise.com',
      telephone: '(514) 555-0103',
      statut: 'actif',
      derniere_connexion: '2025-01-16',
      documents_en_attente: 0,
      type_service: 'Déclaration T2',
      progres_declaration: 90
    }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      nom: 'T4-2024-Tremblay.pdf',
      client: 'Jean Tremblay',
      type: 'T4',
      statut: 'recu',
      date_upload: '2025-01-15',
      taille: '2.1 MB'
    },
    {
      id: '2',
      nom: 'Reçus-Médicaux-Dubois.pdf',
      client: 'Marie Dubois', 
      type: 'Médicaux',
      statut: 'en_cours',
      date_upload: '2025-01-14',
      taille: '1.8 MB'
    }
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      titre: 'Finaliser déclaration T1 - Jean Tremblay',
      client: 'Jean Tremblay',
      priorite: 'haute',
      echeance: '2025-01-20',
      statut: 'en_cours',
      assignee: 'A. Bouhazza'
    },
    {
      id: '2',
      titre: 'Révision tenue de livres - Marie Dubois',
      client: 'Marie Dubois',
      priorite: 'moyenne', 
      echeance: '2025-01-25',
      statut: 'a_faire',
      assignee: 'A. Bouhazza'
    }
  ]);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'actif': case 'complete': case 'envoye': return 'bg-green-100 text-green-800';
      case 'en_attente': case 'a_faire': case 'recu': return 'bg-yellow-100 text-yellow-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'inactif': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-servitax-dark mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{title}</div>
      {subtitle && <div className="text-gray-500 text-xs mt-1">{subtitle}</div>}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          icon={Users}
          title="Clients Actifs"
          value={stats.clients_actifs}
          color="bg-gradient-to-br from-servitax-primary to-servitax-primary"
          trend="+12%"
        />
        <StatCard
          icon={FileText}
          title="Déclarations"
          value={stats.declarations_en_cours}
          subtitle="En cours"
          color="bg-gradient-to-br from-servitax-secondary to-servitax-secondary"
          trend="+8%"
        />
        <StatCard
          icon={Upload}
          title="Documents"
          value={stats.documents_recus}
          subtitle="Reçus ce mois"
          color="bg-gradient-to-br from-servitax-accent to-servitax-accent"
          trend="+15%"
        />
        <StatCard
          icon={DollarSign}
          title="Revenus"
          value={`${(stats.revenus_mensuel / 1000).toFixed(0)}K$`}
          subtitle="Ce mois"
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="+22%"
        />
        <StatCard
          icon={Target}
          title="Completion"
          value={`${stats.taux_completion}%`}
          subtitle="Taux moyen"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="+5%"
        />
        <StatCard
          icon={Award}
          title="Satisfaction"
          value={`${stats.satisfaction_client}%`}
          subtitle="Clients satisfaits"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend="+3%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
            <Zap className="h-6 w-6 text-servitax-primary mr-3" />
            Actions Rapides
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-br from-servitax-primary/10 to-servitax-primary/5 rounded-xl hover:from-servitax-primary/20 hover:to-servitax-primary/10 transition-all duration-300 group">
              <Plus className="h-8 w-8 text-servitax-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-sm font-semibold text-servitax-dark">Nouveau Client</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-servitax-secondary/10 to-servitax-secondary/5 rounded-xl hover:from-servitax-secondary/20 hover:to-servitax-secondary/10 transition-all duration-300 group">
              <Upload className="h-8 w-8 text-servitax-secondary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-sm font-semibold text-servitax-dark">Upload Document</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-servitax-accent/10 to-servitax-accent/5 rounded-xl hover:from-servitax-accent/20 hover:to-servitax-accent/10 transition-all duration-300 group">
              <Send className="h-8 w-8 text-servitax-accent mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-sm font-semibold text-servitax-dark">Envoyer Message</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl hover:from-green-500/20 hover:to-green-500/10 transition-all duration-300 group">
              <BarChart3 className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-sm font-semibold text-servitax-dark">Nouveau Rapport</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
            <Clock className="h-6 w-6 text-servitax-secondary mr-3" />
            Tâches Urgentes
          </h3>
          <div className="space-y-4">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-semibold text-servitax-dark text-sm">{task.titre}</div>
                  <div className="text-gray-600 text-xs">{task.client} • {task.echeance}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPrioriteColor(task.priorite)}`}>
                  {task.priorite}
                </span>
              </div>
            ))}
            <button className="w-full text-center text-servitax-primary font-semibold text-sm hover:text-servitax-secondary transition-colors duration-300">
              Voir toutes les tâches →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
          <Bell className="h-6 w-6 text-servitax-accent mr-3" />
          Activité Récente
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-servitax-dark">Déclaration T1 complétée</div>
              <div className="text-gray-600 text-sm">Jean Tremblay • Il y a 2 heures</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-servitax-dark">Nouveau document reçu</div>
              <div className="text-gray-600 text-sm">Marie Dubois • Il y a 4 heures</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-servitax-dark">Nouveau client inscrit</div>
              <div className="text-gray-600 text-sm">Pierre Lavoie Inc. • Il y a 6 heures</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-servitax-dark">Gestion des Clients</h2>
          <p className="text-gray-600">Gérez vos clients et suivez leurs dossiers</p>
        </div>
        <button className="bg-gradient-to-r from-servitax-primary to-servitax-primary hover:from-servitax-primary/90 hover:to-servitax-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Client
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
          >
            <option value="tous">Tous les clients</option>
            <option value="actif">Clients actifs</option>
            <option value="en_attente">En attente</option>
            <option value="inactif">Inactifs</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Client</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Contact</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Service</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Statut</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Progrès</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-300">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-servitax-primary to-servitax-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {client.nom.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-servitax-dark">{client.nom}</div>
                        <div className="text-gray-600 text-sm">
                          {client.documents_en_attente > 0 && (
                            <span className="text-orange-600">
                              {client.documents_en_attente} doc(s) en attente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="text-servitax-dark">{client.email}</div>
                      <div className="text-gray-600">{client.telephone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-servitax-primary/10 text-servitax-primary rounded-full text-sm font-medium">
                      {client.type_service}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(client.statut)}`}>
                      {client.statut}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-servitax-primary to-servitax-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${client.progres_declaration}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-servitax-dark">{client.progres_declaration}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-servitax-primary/10 text-servitax-primary rounded-lg hover:bg-servitax-primary/20 transition-colors duration-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-servitax-secondary/10 text-servitax-secondary rounded-lg hover:bg-servitax-secondary/20 transition-colors duration-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-servitax-accent/10 text-servitax-accent rounded-lg hover:bg-servitax-accent/20 transition-colors duration-300">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-servitax-dark">Gestion des Documents</h2>
          <p className="text-gray-600">Gérez les documents clients et leur traitement</p>
        </div>
        <button className="bg-gradient-to-r from-servitax-secondary to-servitax-secondary hover:from-servitax-secondary/90 hover:to-servitax-secondary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Upload className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-800">89</span>
            </div>
            <div className="text-blue-700 font-semibold">Documents Reçus</div>
            <div className="text-blue-600 text-sm">Ce mois</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-800">23</span>
            </div>
            <div className="text-yellow-700 font-semibold">En Traitement</div>
            <div className="text-yellow-600 text-sm">En cours</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">56</span>
            </div>
            <div className="text-green-700 font-semibold">Complétés</div>
            <div className="text-green-600 text-sm">Ce mois</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Send className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-800">45</span>
            </div>
            <div className="text-purple-700 font-semibold">Envoyés</div>
            <div className="text-purple-600 text-sm">Ce mois</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Document</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Client</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Type</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Statut</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-servitax-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-300">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-servitax-accent to-servitax-accent rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-servitax-dark">{doc.nom}</div>
                        <div className="text-gray-600 text-sm">{doc.taille}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-servitax-dark">{doc.client}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-servitax-secondary/10 text-servitax-secondary rounded-full text-sm font-medium">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(doc.statut)}`}>
                      {doc.statut}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-servitax-dark">{doc.date_upload}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-servitax-primary/10 text-servitax-primary rounded-lg hover:bg-servitax-primary/20 transition-colors duration-300">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-servitax-secondary/10 text-servitax-secondary rounded-lg hover:bg-servitax-secondary/20 transition-colors duration-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-servitax-accent/10 text-servitax-accent rounded-lg hover:bg-servitax-accent/20 transition-colors duration-300">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home, color: 'text-servitax-primary' },
    { id: 'clients', label: 'Clients', icon: Users, color: 'text-servitax-secondary' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-servitax-accent' },
    { id: 'signatures', label: 'Signatures', icon: Edit, color: 'text-purple-600' },
    { id: 'communications', label: 'Communications', icon: MessageSquare, color: 'text-green-600' },
    { id: 'reports', label: 'Rapports', icon: BarChart3, color: 'text-orange-600' },
    { id: 'settings', label: 'Paramètres', icon: Settings, color: 'text-gray-600' },
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
              <h1 className="text-xl font-bold text-servitax-dark">ServitTax Admin</h1>
              <p className="text-gray-600 text-sm">Centre de gestion professionnel</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 hover:text-servitax-primary cursor-pointer transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-servitax-secondary rounded-full"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AB</span>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-servitax-dark">A. Bouhazza</div>
                <div className="text-gray-600 text-sm">Administrateur</div>
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
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'clients' && renderClients()}
          {activeSection === 'documents' && renderDocuments()}
          {activeSection === 'signatures' && (
            <div className="text-center py-16">
              <Edit className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Gestion des Signatures</h3>
              <p className="text-gray-500">Fonctionnalité en développement</p>
            </div>
          )}
          {activeSection === 'communications' && (
            <div className="text-center py-16">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Communications Client</h3>
              <p className="text-gray-500">Fonctionnalité en développement</p>
            </div>
          )}
          {activeSection === 'reports' && (
            <div className="text-center py-16">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Rapports & Analyses</h3>
              <p className="text-gray-500">Fonctionnalité en développement</p>
            </div>
          )}
          {activeSection === 'settings' && (
            <div className="text-center py-16">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Paramètres Système</h3>
              <p className="text-gray-500">Fonctionnalité en développement</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardServitax;