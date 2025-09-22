import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Shield,
  Zap,
  Settings,
  RefreshCw,
  Eye,
  Download,
  BarChart3,
  TrendingUp,
  Activity,
  Server,
  Lock,
  Wifi,
  AlertCircle,
  FileText,
  Users,
  Key
} from 'lucide-react';

interface AuditResult {
  id: string;
  category: string;
  name: string;
  status: 'critical' | 'warning' | 'good' | 'info';
  description: string;
  impact: string;
  recommendation: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  lastChecked: Date;
}

interface DatabaseStats {
  totalConnections: number;
  activeQueries: number;
  responseTime: number;
  errorRate: number;
  uptime: number;
  dataIntegrity: number;
}

export default function DatabaseAudit() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAudit, setLastAudit] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState<DatabaseStats>({
    totalConnections: 142,
    activeQueries: 8,
    responseTime: 85,
    errorRate: 0.2,
    uptime: 99.8,
    dataIntegrity: 94.5
  });

  // Simulated audit results based on real analysis
  const mockAuditResults: AuditResult[] = [
    {
      id: 'db-001',
      category: 'Architecture',
      name: 'Incohérence Base de Données',
      status: 'critical',
      description: 'Configuration simultanée Firebase/Firestore ET MongoDB détectée',
      impact: 'Conflits potentiels, performance dégradée, désynchronisation des données',
      recommendation: 'Standardiser sur Firestore, supprimer références MongoDB orphelines',
      priority: 'P0',
      lastChecked: new Date()
    },
    {
      id: 'sec-001',
      category: 'Sécurité',
      name: 'Clés API Exposées',
      status: 'critical',
      description: 'Clés Firebase exposées en dur dans firebase.js',
      impact: 'Risque de sécurité majeur, exposition des credentials',
      recommendation: 'Migration immédiate vers variables d\'environnement, rotation des clés',
      priority: 'P0',
      lastChecked: new Date()
    },
    {
      id: 'cfg-001',
      category: 'Configuration',
      name: 'API Configuration Vide',
      status: 'warning',
      description: 'Toutes les clés API sont vides dans apiConfig.json',
      impact: 'Services Google Drive, Zoho Sign, Sheets non opérationnels',
      recommendation: 'Configuration immédiate des clés API requises',
      priority: 'P1',
      lastChecked: new Date()
    },
    {
      id: 'arch-001',
      category: 'Architecture',
      name: 'Types TypeScript Manquants',
      status: 'warning',
      description: 'Utilisation de type "any" dans firestoreClientManager.ts',
      impact: 'Perte de sécurité des types, erreurs à l\'exécution potentielles',
      recommendation: 'Implémentation de types stricts et validation avec Zod',
      priority: 'P2',
      lastChecked: new Date()
    },
    {
      id: 'dep-001',
      category: 'Dépendances',
      name: 'Vulnérabilités de Sécurité',
      status: 'warning',
      description: '7 vulnérabilités détectées (2 low, 4 moderate, 1 high)',
      impact: 'Risques de sécurité, exposition aux attaques',
      recommendation: 'Mise à jour immédiate des dépendances vulnérables',
      priority: 'P1',
      lastChecked: new Date()
    },
    {
      id: 'perf-001',
      category: 'Performance',
      name: 'Optimisation Requêtes',
      status: 'info',
      description: 'Possibilité d\'optimisation des requêtes Firestore',
      impact: 'Performance légèrement dégradée',
      recommendation: 'Implémentation de cache et optimisation des index',
      priority: 'P3',
      lastChecked: new Date()
    },
    {
      id: 'mon-001',
      category: 'Monitoring',
      name: 'Logging Insuffisant',
      status: 'warning',
      description: 'Système de logging basique, pas de centralisation',
      impact: 'Difficulté de debugging, pas de traçabilité',
      recommendation: 'Mise en place de logging structuré avec Winston/Pino',
      priority: 'P2',
      lastChecked: new Date()
    },
    {
      id: 'val-001',
      category: 'Validation',
      name: 'Validation des Données',
      status: 'good',
      description: 'Validation basique en place mais peut être améliorée',
      impact: 'Risque limité mais perfectible',
      recommendation: 'Renforcement avec schémas de validation Zod',
      priority: 'P3',
      lastChecked: new Date()
    }
  ];

  useEffect(() => {
    setAuditResults(mockAuditResults);
  }, []);

  const runAudit = async () => {
    setIsLoading(true);
    // Simulate audit process
    setTimeout(() => {
      setAuditResults([...mockAuditResults]);
      setLastAudit(new Date());
      setIsLoading(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0':
        return 'bg-red-500 text-white';
      case 'P1':
        return 'bg-orange-500 text-white';
      case 'P2':
        return 'bg-yellow-500 text-white';
      case 'P3':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const categories = ['all', 'Architecture', 'Sécurité', 'Configuration', 'Performance', 'Dépendances', 'Monitoring', 'Validation'];
  const filteredResults = selectedCategory === 'all' 
    ? auditResults 
    : auditResults.filter(result => result.category === selectedCategory);

  const criticalCount = auditResults.filter(r => r.status === 'critical').length;
  const warningCount = auditResults.filter(r => r.status === 'warning').length;
  const goodCount = auditResults.filter(r => r.status === 'good').length;
  const infoCount = auditResults.filter(r => r.status === 'info').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-servitax">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-servitax-dark">Audit Base de Données ServitTax</h2>
              <p className="text-gray-600">Analyse complète de l'intégrité et sécurité des données</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Dernier audit</div>
              <div className="font-semibold text-servitax-primary">
                {lastAudit.toLocaleDateString('fr-CA')} {lastAudit.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <button
              onClick={runAudit}
              disabled={isLoading}
              className="btn-servitax-primary flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Analyse...' : 'Lancer Audit'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-servitax-primary mb-1">{stats.totalConnections}</div>
            <div className="text-sm text-gray-600">Connexions</div>
          </div>
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-servitax-secondary mb-1">{stats.activeQueries}</div>
            <div className="text-sm text-gray-600">Requêtes</div>
          </div>
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-servitax-accent mb-1">{stats.responseTime}ms</div>
            <div className="text-sm text-gray-600">Temps Réponse</div>
          </div>
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.errorRate}%</div>
            <div className="text-sm text-gray-600">Taux Erreur</div>
          </div>
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.uptime}%</div>
            <div className="text-sm text-gray-600">Disponibilité</div>
          </div>
          <div className="text-center p-4 bg-servitax-light rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.dataIntegrity}%</div>
            <div className="text-sm text-gray-600">Intégrité</div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Problèmes Critiques</p>
              <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-600 font-semibold text-sm">Action immédiate requise</span>
          </div>
        </div>

        <div className="card-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Avertissements</p>
              <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-yellow-600 font-semibold text-sm">À corriger prochainement</span>
          </div>
        </div>

        <div className="card-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Status OK</p>
              <p className="text-3xl font-bold text-green-600">{goodCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 font-semibold text-sm">Fonctionnement optimal</span>
          </div>
        </div>

        <div className="card-servitax">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Informations</p>
              <p className="text-3xl font-bold text-blue-600">{infoCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-blue-600 font-semibold text-sm">Recommandations</span>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="card-servitax">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-servitax-dark">Résultats d'Audit Détaillés</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-servitax"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>
            <button className="btn-servitax-outline flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter PDF
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(result.status)}
                  <div>
                    <h4 className="text-lg font-semibold text-servitax-dark">{result.name}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600">{result.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(result.priority)}`}>
                        {result.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>Vérifié le</div>
                  <div>{result.lastChecked.toLocaleDateString('fr-CA')}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Description</h5>
                  <p className="text-gray-700 text-sm">{result.description}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Impact</h5>
                  <p className="text-gray-700 text-sm">{result.impact}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Recommandation</h5>
                  <p className="text-servitax-primary text-sm font-medium">{result.recommendation}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">ID: {result.id}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-servitax-primary hover:text-servitax-secondary text-sm font-medium">
                    Voir détails
                  </button>
                  <button className="text-servitax-secondary hover:text-servitax-primary text-sm font-medium">
                    Marquer résolu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="card-servitax">
        <h3 className="text-xl font-bold text-servitax-dark mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-servitax-accent" />
          Actions Prioritaires Recommandées
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <h4 className="font-bold text-red-900">Sécurité Critique</h4>
            </div>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Rotation des clés Firebase exposées</li>
              <li>• Migration vers variables d'environnement</li>
              <li>• Audit de sécurité complet</li>
            </ul>
            <button className="btn-servitax-primary w-full mt-4">
              Corriger maintenant
            </button>
          </div>

          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-yellow-600 mr-3" />
              <h4 className="font-bold text-yellow-900">Architecture</h4>
            </div>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• Unification sur Firestore</li>
              <li>• Suppression références MongoDB</li>
              <li>• Types TypeScript stricts</li>
            </ul>
            <button className="btn-servitax-secondary w-full mt-4">
              Planifier refactoring
            </button>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center mb-4">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h4 className="font-bold text-blue-900">Configuration</h4>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Configuration clés API</li>
              <li>• Tests de connectivité</li>
              <li>• Monitoring avancé</li>
            </ul>
            <button className="btn-servitax-accent w-full mt-4">
              Configurer services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}