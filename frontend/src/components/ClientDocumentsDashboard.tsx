import { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Download,
  Eye,
  Clock,
  User,
  Search,
  Filter,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  BarChart3,
  PieChart,
  Users,
  FileCheck,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Trophy,
  Target,
  Award
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import { LucideIcon } from 'lucide-react';

interface ClientDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  category: string;
  status: 'validated' | 'processing' | 'rejected';
  uploadedAt: string;
  clientId: string;
  clientName: string;
}

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  documentsCount: number;
  lastActivity: string;
  avatar?: string;
  satisfaction?: number;
}

// Type for the document viewer (matches DocumentViewer DocumentData interface)
interface ViewerDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'Prêt' | 'En traitement' | 'Erreur';
  googleDriveId?: string;
  category: string;
  description?: string;
  format?: string;
  client?: string;
  clientId?: string;
  dateRecu?: string;
  taille?: string;
  ocrStatus?: string;
  metadonnees?: Record<string, unknown>;
}

// Type for StatCard component props
interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
  subtitle?: string;
}

// Type for ClientDocumentsDashboardWithViewer props
interface ClientDocumentsDashboardWithViewerProps {
  [key: string]: unknown;
}

export default function ClientDocumentsDashboard() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    totalClients: 0,
    totalDocuments: 0,
    processingDocs: 0,
    totalSize: 0
  });

  // Viewer modal state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerDocument, setViewerDocument] = useState<ViewerDocument | null>(null);

  // Données simulées des clients avec plus de détails
  const clients: Client[] = useMemo(() => [
    {
      id: '1',
      nom: 'Dubois',
      prenom: 'Marie',
      email: 'marie.dubois@email.com',
      documentsCount: 12,
      lastActivity: '2024-12-15',
      avatar: 'MD',
      satisfaction: 95
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Pierre',
      email: 'pierre.martin@email.com',
      documentsCount: 8,
      lastActivity: '2024-12-14',
      avatar: 'PM',
      satisfaction: 88
    },
    {
      id: '3',
      nom: 'Garcia',
      prenom: 'Sophie',
      email: 'sophie.garcia@email.com',
      documentsCount: 15,
      lastActivity: '2024-12-16',
      avatar: 'SG',
      satisfaction: 92
    },
    {
      id: '4',
      nom: 'Lefebvre',
      prenom: 'Jean',
      email: 'jean.lefebvre@email.com',
      documentsCount: 6,
      lastActivity: '2024-12-13',
      avatar: 'JL',
      satisfaction: 85
    }
  ], []);

  // Données simulées des documents
  const documents: ClientDocument[] = useMemo(() => [
    // Documents de Marie Dubois
    {
      id: '1',
      name: 'Déclaration de revenus 2024',
      type: 'PDF',
      size: 2450000,
      category: 'Déclarations fiscales',
      status: 'validated',
      uploadedAt: '2024-12-15',
      clientId: '1',
      clientName: 'Marie Dubois'
    },
    {
      id: '2',
      name: 'Justificatifs de frais professionnels',
      type: 'PDF',
      size: 1800000,
      category: 'Frais professionnels',
      status: 'processing',
      uploadedAt: '2024-12-14',
      clientId: '1',
      clientName: 'Marie Dubois'
    },
    {
      id: '3',
      name: 'Contrat de location bureau',
      type: 'PDF',
      size: 3200000,
      category: 'Contrats',
      status: 'validated',
      uploadedAt: '2024-12-13',
      clientId: '1',
      clientName: 'Marie Dubois'
    },
    // Documents de Pierre Martin
    {
      id: '4',
      name: 'Bilan comptable 2024',
      type: 'XLSX',
      size: 1500000,
      category: 'Comptabilité',
      status: 'validated',
      uploadedAt: '2024-12-14',
      clientId: '2',
      clientName: 'Pierre Martin'
    },
    {
      id: '5',
      name: 'Factures fournisseurs Q4',
      type: 'PDF',
      size: 2800000,
      category: 'Factures',
      status: 'processing',
      uploadedAt: '2024-12-13',
      clientId: '2',
      clientName: 'Pierre Martin'
    },
    // Documents de Sophie Garcia
    {
      id: '6',
      name: 'Déclaration TVA trimestrielle',
      type: 'PDF',
      size: 950000,
      category: 'Déclarations fiscales',
      status: 'rejected',
      uploadedAt: '2024-12-16',
      clientId: '3',
      clientName: 'Sophie Garcia'
    },
    {
      id: '7',
      name: 'Bulletins de salaire 2024',
      type: 'PDF',
      size: 4200000,
      category: 'Paie',
      status: 'validated',
      uploadedAt: '2024-12-15',
      clientId: '3',
      clientName: 'Sophie Garcia'
    },
    {
      id: '8',
      name: 'Statuts société modifiés',
      type: 'PDF',
      size: 1800000,
      category: 'Juridique',
      status: 'processing',
      uploadedAt: '2024-12-14',
      clientId: '3',
      clientName: 'Sophie Garcia'
    }
  ], []);

  const categories = [
    'all',
    'Déclarations fiscales',
    'Comptabilité',
    'Factures',
    'Frais professionnels',
    'Paie',
    'Contrats',
    'Juridique',
    'Banque',
    'Assurance'
  ];

  // Animation des statistiques au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        totalClients: clients.length,
        totalDocuments: documents.length,
        processingDocs: documents.filter(doc => doc.status === 'processing').length,
        totalSize: documents.reduce((sum, doc) => sum + doc.size, 0)
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [clients, documents]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'validated':
        return 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white';
      case 'processing':
        return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
      case 'rejected':
        return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'processing':
        return <Activity className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'validated':
        return 'Validé';
      case 'processing':
        return 'En traitement';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500 drop-shadow-sm" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="w-6 h-6 text-emerald-500 drop-shadow-sm" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-500 drop-shadow-sm" />;
      default:
        return <FileText className="w-6 h-6 text-purple-500 drop-shadow-sm" />;
    }
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 80) return 'text-amber-500';
    return 'text-red-500';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesClient = !selectedClient || doc.clientId === selectedClient;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClient && matchesCategory && matchesSearch;
  });

  const clientDocuments = selectedClient
    ? documents.filter(doc => doc.clientId === selectedClient)
    : documents;

  const getClientStats = (clientId: string) => {
    const clientDocs = documents.filter(doc => doc.clientId === clientId);
    return {
      total: clientDocs.length,
      validated: clientDocs.filter(doc => doc.status === 'validated').length,
      processing: clientDocs.filter(doc => doc.status === 'processing').length,
      rejected: clientDocs.filter(doc => doc.status === 'rejected').length,
      totalSize: clientDocs.reduce((sum, doc) => sum + doc.size, 0)
    };
  };

  const handleDownload = (doc: ClientDocument) => {
    setIsLoading(true);
    alert(`Téléchargement du document "${doc.name}" en cours...`);
    // Simulation du téléchargement avec délai
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob(['Contenu du document ' + doc.name], { type: doc.type });
      element.href = URL.createObjectURL(file);
      element.download = doc.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setIsLoading(false);
      alert(`Téléchargement terminé : "${doc.name}"`);
    }, 1000);
  };

  const mapDocumentToViewer = (doc: ClientDocument): ViewerDocument => {
    // Map the local ClientDocument shape to the DocumentViewer expected shape
    const category = (doc.category || '').toLowerCase();
    let type = 'autre';
    if (category.includes('facture') || category.includes('factures')) type = 'facture';
    else if (category.includes('banc') || category.includes('relev')) type = 'releve_bancaire';
    else if (category.includes('paie')) type = 'bulletin_paie';
    else if (category.includes('déclarations') || category.includes('declaration')) type = 'declaration_fiscale';
    else if (category.includes('contrat')) type = 'contrat';

    const statusMap: Record<string, 'Prêt' | 'En traitement' | 'Erreur'> = {
      validated: 'Prêt',
      processing: 'En traitement',
      rejected: 'Erreur'
    };

    return {
      id: doc.id,
      name: doc.name,
      type,
      size: formatFileSize(doc.size),
      date: doc.uploadedAt,
      status: statusMap[doc.status] || 'En traitement',
      category: doc.category,
      format: (doc.type || '').toLowerCase(),
      client: doc.clientName,
      clientId: doc.clientId,
      dateRecu: doc.uploadedAt,
      taille: formatFileSize(doc.size),
      ocrStatus: (doc.type || '').toLowerCase() === 'pdf' ? 'complete' : 'non_requis',
      metadonnees: {}
    };
  };

  const handleViewDocument = (doc: ClientDocument) => {
    alert(`Ouverture du document "${doc.name}"...`);
    setViewerDocument(mapDocumentToViewer(doc));
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewerDocument(null);
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }: StatCardProps) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Icon className="w-8 h-8" />
          </div>
          {trend && (
            <div className="flex items-center text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              {trend}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-white/80 font-medium">{title}</p>
          {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20"></div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header avec titre wow */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tableau de Bord Client
            </h1>
            <p className="text-gray-600 text-lg">Gestion documentaire intelligente et moderne</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-gray-600">Satisfaction client moyenne: 90%</span>
          <Target className="w-5 h-5 text-blue-500 ml-4" />
          <span className="text-sm text-gray-600">Objectif: 95%</span>
        </div>
      </div>

      {/* Statistiques principales avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Clients"
          value={animatedStats.totalClients}
          icon={Users}
          color="from-blue-500 to-blue-600"
          trend="+12%"
          subtitle="Nouveaux cette semaine"
        />
        <StatCard
          title="Documents Totaux"
          value={animatedStats.totalDocuments}
          icon={FileCheck}
          color="from-emerald-500 to-emerald-600"
          trend="+8%"
          subtitle="Traités ce mois"
        />
        <StatCard
          title="En Attente"
          value={animatedStats.processingDocs}
          icon={Activity}
          color="from-amber-500 to-orange-500"
          trend="-5%"
          subtitle="À traiter rapidement"
        />
        <StatCard
          title="Taille Totale"
          value={formatFileSize(animatedStats.totalSize)}
          icon={BarChart3}
          color="from-purple-500 to-purple-600"
          trend="+15%"
          subtitle="Stockage utilisé"
        />
      </div>

      {/* Filtres et recherche avec design moderne */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 w-full lg:w-auto">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="🔍 Rechercher un document ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Liste déroulante de catégorie supprimée */}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl">
              <PieChart className="w-4 h-4" />
              <span className="font-medium">
                {filteredDocuments.length} document(s) trouvé(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Liste des clients avec design moderne */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Clients Actifs</h3>
                  <p className="text-sm text-gray-600">Sélectionnez un client</p>
                </div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {clients.map((client) => {
                const stats = getClientStats(client.id);
                const isSelected = selectedClient === client.id;

                return (
                  <div
                    key={client.id}
                    className={`p-4 border-b border-gray-50 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border-l-4 border-l-indigo-500 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedClient(isSelected ? null : client.id)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white bg-gradient-to-r ${
                        isSelected ? 'from-indigo-500 to-purple-600' : 'from-gray-400 to-gray-600'
                      }`}>
                        {client.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">
                          {client.prenom} {client.nom}
                        </h4>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600">{stats.total}</div>
                        <div className="text-xs text-gray-500">docs</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(client.lastActivity)}
                      </span>
                      <span className={`font-medium ${getSatisfactionColor(client.satisfaction || 0)}`}>
                        ⭐ {client.satisfaction}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-medium text-gray-900">
                          {stats.validated}/{stats.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(stats.validated / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Documents avec design moderne */}
        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedClient
                        ? `Documents de ${clients.find(c => c.id === selectedClient)?.prenom} ${clients.find(c => c.id === selectedClient)?.nom}`
                        : 'Tous les Documents'
                      }
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedClient ? clientDocuments.length : documents.length} document(s) • {formatFileSize(filteredDocuments.reduce((sum, doc) => sum + doc.size, 0))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round((filteredDocuments.filter(d => d.status === 'validated').length / filteredDocuments.length) * 100)}% validés
                  </span>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredDocuments.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aucun document trouvé
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {searchTerm || selectedCategory !== 'all'
                      ? 'Essayez de modifier vos filtres de recherche pour trouver ce que vous cherchez.'
                      : 'Aucun document n\'a encore été déposé. Commencez par en ajouter un !'
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filteredDocuments.map((doc, index) => (
                    <div
                      key={doc.id}
                      className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                              {doc.name}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center">
                                <Zap className="w-4 h-4 mr-1 text-blue-500" />
                                {formatFileSize(doc.size)}
                              </span>
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1 text-purple-500" />
                                {doc.clientName}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium">
                                {doc.category}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-orange-500" />
                                {formatDate(doc.uploadedAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium ${getStatusColor(doc.status)} shadow-lg`}>
                            {getStatusIcon(doc.status)}
                            <span>{getStatusLabel(doc.status)}</span>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDownload(doc)}
                              disabled={isLoading}
                              className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
                              title="Télécharger"
                              aria-label={`Télécharger le document ${doc.name}`}
                            >
                              <Download className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => handleViewDocument(doc)}
                              className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                              title="Voir les détails"
                              aria-label={`Voir le document ${doc.name}`}
                            >
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Document viewer modal */}
      <DocumentViewer document={viewerDocument} isOpen={isViewerOpen} onClose={handleCloseViewer} />
    </>
  );
}

// Render viewer as a sibling to the dashboard root
export function ClientDocumentsDashboardWithViewer(props: ClientDocumentsDashboardWithViewerProps) {
  return (
    <>
      <ClientDocumentsDashboard {...props} />
    </>
  );
}
