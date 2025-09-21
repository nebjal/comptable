import SettingsAPI from './SettingsAPI';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  UserCheck,
  Zap,
  Bell,
  Download,
  Eye,
  Edit,
  Send,
  Archive,
  Search,
  Plus,
  Star,
  Target,
  Activity,
  PieChart,
  Mail,
  Phone,
  DollarSign,
  Timer,
  File,
  RefreshCw,
  Clock,
  Shield,
  Lock,
  ExternalLink,
  X,
  Upload,
  FileCheck,
  Building2,
  Calculator,
  Award
} from 'lucide-react';

export default function DashboardServitax() {
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
    { id: 'c1', name: 'Entreprise ABC', status: 'actif', sector: 'Commerce', contact: 'Marie Dupont', email: 'marie@abc.com', phone: '+1 514-123-4567', lastInteraction: '2025-09-15', totalRevenue: 250000, pendingTasks: 3, avatar: 'MA', savings: 25000 },
    { id: 'c2', name: 'Consultation DEF', status: 'actif', sector: 'Services', contact: 'Jean Martin', email: 'jean@def.com', phone: '+1 438-987-6543', lastInteraction: '2025-09-14', totalRevenue: 180000, pendingTasks: 1, avatar: 'JM', savings: 18000 },
    { id: 'c3', name: 'Restaurant XYZ', status: 'inactif', sector: 'Restauration', contact: 'Sophie Tremblay', email: 'sophie@xyz.com', phone: '+1 450-555-0123', lastInteraction: '2025-08-20', totalRevenue: 95000, pendingTasks: 0, avatar: 'ST', savings: 12000 },
    { id: 'c4', name: 'Services GHI', status: 'actif', sector: 'Technologie', contact: 'Pierre Dubois', email: 'pierre@ghi.com', phone: '+1 514-777-8888', lastInteraction: '2025-09-16', totalRevenue: 320000, pendingTasks: 5, avatar: 'PD', savings: 32000 },
  ]);

  const documents = [
    { id: 'd1', name: 'Déclaration T1 - Marie Dupont', type: 'declaration', client: 'Entreprise ABC', dateRecu: '2025-09-10', status: 'en_cours', taille: '1.2 MB', priority: 'haute', deadline: '2025-09-20', assignedTo: 'Alice', progress: 75, icon: FileText },
    { id: 'd2', name: 'TPS/TVQ Q3 - Jean Martin', type: 'fiscal', client: 'Consultation DEF', dateRecu: '2025-09-05', status: 'traite', taille: '800 KB', priority: 'moyenne', deadline: '2025-09-18', assignedTo: 'Bob', progress: 100, icon: FileText },
    { id: 'd3', name: 'Rapport Financier - Restaurant XYZ', type: 'rapport', client: 'Restaurant XYZ', dateRecu: '2025-08-31', status: 'en_attente', taille: '2.3 MB', priority: 'haute', deadline: '2025-09-25', assignedTo: 'Charlie', progress: 0, icon: FileText },
    { id: 'd4', name: 'Paie Mensuelle - Services GHI', type: 'paie', client: 'Services GHI', dateRecu: '2025-09-12', status: 'en_cours', taille: '950 KB', priority: 'moyenne', deadline: '2025-09-22', assignedTo: 'Alice', progress: 60, icon: FileText },
  ];

  const signatures = [
    { id: 's1', documentName: 'Contrat de Service Fiscal', clientName: 'Entreprise ABC', status: 'en_attente', dateEcheance: '2025-09-18', signers: ['Marie Dupont'], progress: 0, type: 'contrat' },
    { id: 's2', documentName: 'Mandat de Représentation', clientName: 'Services GHI', status: 'signe', dateEcheance: '2025-09-10', signers: ['Pierre Dubois'], progress: 100, type: 'mandat' },
    { id: 's3', documentName: 'Déclaration T2 Corporation', clientName: 'Consultation DEF', status: 'en_attente', dateEcheance: '2025-09-20', signers: ['Jean Martin'], progress: 0, type: 'declaration' },
  ];

  const declarations = [
    { id: 'dec1', name: 'Déclaration T1 - Particulier', client: 'Marie Dupont', status: 'en_cours', progress: 85, deadline: '2025-09-30', assignedTo: 'Alice', type: 'T1', amount: 5500, savings: 1200 },
    { id: 'dec2', name: 'TPS/TVQ Trimestrielle', client: 'Entreprise ABC', status: 'validee', progress: 100, deadline: '2025-09-25', assignedTo: 'Bob', type: 'TPS/TVQ', amount: 15000, savings: 2800 },
    { id: 'dec3', name: 'Déclaration T2 Corporation', client: 'Services GHI', status: 'en_attente', progress: 0, deadline: '2025-10-15', assignedTo: 'Charlie', type: 'T2', amount: 25000, savings: 6200 },
    { id: 'dec4', name: 'Impôt Provincial Québec', client: 'Restaurant XYZ', status: 'en_revision', progress: 90, deadline: '2025-09-20', assignedTo: 'Alice', type: 'Provincial', amount: 8500, savings: 1800 },
  ];

  // Statistics calculations
  const totalFiles = documents.length;
  const urgentFiles = documents.filter(d => d.priority === 'haute' && d.status !== 'traite').length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const totalSavings = clients.reduce((sum, client) => sum + (client.savings || 0), 0);
  const completionRate = Math.round((documents.filter(d => d.status === 'traite').length / totalFiles) * 100);
  const activeClients = clients.filter(c => c.status === 'actif').length;

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
      case 'en_cours': return 'bg-servitax-primary/10 text-servitax-primary border-servitax-primary/20';
      case 'traite': return 'bg-green-100 text-green-700 border-green-200';
      case 'archive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'validee': return 'bg-green-100 text-green-700 border-green-200';
      case 'en_revision': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'signe': return 'bg-green-100 text-green-700 border-green-200';
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
      {/* Enhanced Statistics Cards with ServitTax Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-servitax group hover-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Clients Actifs</p>
              <p className="text-4xl font-bold text-servitax-primary">{activeClients}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center text-sm">
            <div className="flex items-center text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12%</span>
            </div>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="card-servitax group hover-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Documents Urgents</p>
              <p className="text-4xl font-bold text-red-600">{urgentFiles}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-6">
            <span className="text-red-600 font-semibold text-sm">Attention requise</span>
          </div>
        </div>

        <div className="card-servitax group hover-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Économies Totales</p>
              <p className="text-4xl font-bold text-servitax-accent">${(totalSavings / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-servitax-accent to-servitax-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center text-sm">
            <div className="flex items-center text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+18%</span>
            </div>
            <span className="text-gray-500 ml-2">économies clients</span>
          </div>
        </div>

        <div className="card-servitax group hover-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Taux Complétude</p>
              <p className="text-4xl font-bold text-servitax-secondary">{completionRate}%</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-servitax-secondary to-servitax-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-6">
            <span className="text-servitax-secondary font-semibold text-sm">Objectif: 90%</span>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions with ServitTax Branding */}
      <div className="card-servitax">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-servitax-dark">Actions Rapides ServitTax</h3>
          </div>
          <span className="text-sm text-gray-500 bg-servitax-light px-3 py-1 rounded-full">
            Services Professionnels
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Nouvelle Déclaration */}
          <button className="group p-6 bg-gradient-to-br from-servitax-primary/5 to-servitax-secondary/5 border border-servitax-primary/20 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-servitax-primary/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-servitax-dark mb-2">Nouvelle Déclaration</h4>
              <p className="text-sm text-gray-600">Créer une déclaration T1/T2</p>
            </div>
          </button>

          {/* Optimisation Fiscale */}
          <button className="group p-6 bg-gradient-to-br from-servitax-accent/5 to-servitax-cyan-300/5 border border-servitax-accent/20 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-servitax-accent/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-accent to-servitax-cyan-500 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-servitax-dark mb-2">Optimisation Fiscale</h4>
              <p className="text-sm text-gray-600">Analyse des économies</p>
            </div>
          </button>

          {/* Signature Électronique */}
          <button className="group p-6 bg-gradient-to-br from-servitax-secondary/5 to-servitax-teal-400/5 border border-servitax-secondary/20 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-servitax-secondary/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-secondary to-servitax-teal-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-servitax-dark mb-2">Signature Électronique</h4>
              <p className="text-sm text-gray-600">Envoyer pour signature</p>
            </div>
          </button>

          {/* Communication Client */}
          <button className="group p-6 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-purple-500/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-servitax-dark mb-2">Communication</h4>
              <p className="text-sm text-gray-600">Contacter un client</p>
            </div>
          </button>

          {/* Planifier RDV */}
          <button className="group p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-orange-500/40">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-servitax-dark mb-2">Planifier RDV</h4>
              <p className="text-sm text-gray-600">Consultation client</p>
            </div>
          </button>
        </div>
      </div>

      {/* Documents en Priorité et Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents Prioritaires */}
        <div className="card-servitax">
          <h3 className="text-lg font-semibold text-servitax-dark mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-servitax-primary" />
            Documents Prioritaires
          </h3>
          <div className="space-y-3">
            {documents.filter(d => d.priority === 'haute' || d.status === 'en_cours').slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-servitax-light rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    doc.priority === 'haute' ? 'bg-red-500 animate-pulse' :
                    doc.status === 'en_cours' ? 'bg-servitax-primary' : 'bg-gray-400'
                  }`} />
                  <div>
                    <h5 className="font-medium text-servitax-dark">{doc.name}</h5>
                    <p className="text-sm text-gray-600">{doc.client} • {doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(doc.deadline).toLocaleDateString('fr-CA')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures en Attente */}
        <div className="card-servitax">
          <h3 className="text-lg font-semibold text-servitax-dark mb-4 flex items-center">
            <Edit className="h-5 w-5 mr-2 text-servitax-secondary" />
            Signatures en Attente
          </h3>
          <div className="space-y-3">
            {signatures.filter(s => s.status === 'en_attente').map((sig) => (
              <div key={sig.id} className="p-4 bg-servitax-light rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-servitax-dark">{sig.documentName}</h4>
                    <p className="text-sm text-gray-600">{sig.clientName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getStatusColor(sig.status)}`}>
                    En attente
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Signataire:</span>
                    <span className="text-sm bg-servitax-primary/10 text-servitax-primary px-2 py-1 rounded">
                      {sig.signers[0]}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-servitax-primary hover:text-servitax-secondary text-sm font-medium">
                      Relancer
                    </button>
                    <button className="text-servitax-secondary hover:text-servitax-primary text-sm font-medium">
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card-servitax">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-servitax-dark">Performance ServitTax</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Tous systèmes opérationnels</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-servitax-primary/5 rounded-xl">
            <div className="text-3xl font-black text-servitax-primary mb-2">
              {Math.round((documents.filter(d => d.status === 'traite').length / totalFiles) * 100)}%
            </div>
            <div className="text-gray-600 font-medium text-sm">Taux de Complétude</div>
          </div>

          <div className="text-center p-4 bg-servitax-secondary/5 rounded-xl">
            <div className="text-3xl font-black text-servitax-secondary mb-2">
              {Math.round(totalSavings / activeClients / 1000)}K
            </div>
            <div className="text-gray-600 font-medium text-sm">Économies Moy./Client</div>
          </div>

          <div className="text-center p-4 bg-servitax-accent/5 rounded-xl">
            <div className="text-3xl font-black text-servitax-accent mb-2">
              2.8
            </div>
            <div className="text-gray-600 font-medium text-sm">Jours Moy. Traitement</div>
          </div>

          <div className="text-center p-4 bg-green-500/5 rounded-xl">
            <div className="text-3xl font-black text-green-600 mb-2">
              98%
            </div>
            <div className="text-gray-600 font-medium text-sm">Satisfaction Client</div>
          </div>
        </div>
      </div>
    </div>

    {/* API Settings Section */}
    <div className="mt-12">
      <SettingsAPI />
    </div>
    </>
  );

  return (
    <div className="min-h-screen bg-servitax-light relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-servitax-primary/10 to-servitax-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-servitax-accent/10 to-servitax-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header with ServitTax Branding */}
      <div className="relative z-10 flex items-center justify-between p-8 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveTab('overview')} role="button" aria-label="Accueil">
          <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-servitax-dark">
              Tableau de Bord ServitTax
            </h1>
            <p className="text-servitax-primary mt-1 font-medium">Centre Pro des Impôts - Vue Administrateur</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-servitax-light px-4 py-2 rounded-xl border border-gray-200">
            <Clock className="w-4 h-4 text-servitax-primary" />
            <span>Dernière sync: {lastUpdate.toLocaleTimeString('fr-CA')}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="btn-servitax-primary p-3 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="bg-white text-servitax-primary p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-servitax-primary/20">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs with ServitTax Theme */}
      <div className="relative z-10 px-8 py-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-2 border border-gray-200/50 shadow-xl">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-servitax-primary to-servitax-secondary text-white shadow-lg scale-105'
                      : 'text-servitax-dark hover:text-servitax-primary hover:bg-servitax-light'
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
        {/* Other tabs would be implemented similarly with ServitTax theme */}
      </div>
    </div>
  );
}