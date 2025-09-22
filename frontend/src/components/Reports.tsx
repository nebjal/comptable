import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, FileText, Users } from 'lucide-react';
import { CheckCircle, Clock, Shield } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('30_jours');
  const [reportType, setReportType] = useState('activite');
  const [documents] = useState([
    { id: '1', name: 'Facture Fournisseur 001', type: 'facture', dateRecu: '2025-09-10', status: 'traite' },
    { id: '2', name: 'Relevé Bancaire Août', type: 'releve_bancaire', dateRecu: '2025-09-05', status: 'en_cours' },
    { id: '3', name: 'Bulletin de Paie Juillet', type: 'bulletin_paie', dateRecu: '2025-08-31', status: 'traite' },
    { id: '4', name: 'Déclaration Fiscale 2024', type: 'declaration_fiscale', dateRecu: '2025-09-01', status: 'en_cours' },
  ]);
  const [signatures] = useState([
    { id: '1', typeSignature: 'qualifiee', status: 'en_attente', dateCreation: '2025-09-10' },
    { id: '2', typeSignature: 'avancee', status: 'signe', dateCreation: '2025-08-15' },
    { id: '3', typeSignature: 'simple', status: 'refuse', dateCreation: '2025-09-01' },
    { id: '4', typeSignature: 'simple', status: 'expire', dateCreation: '2025-08-01' },
  ]);

  // ...existing code...

  const getActivityData = () => {
    const now = new Date();
    const days = dateRange === '30_jours' ? 30 : dateRange === '90_jours' ? 90 : 365;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const recentDocuments = documents.filter(doc => new Date(doc.dateRecu) >= startDate);
    const recentSignatures = signatures.filter(sig => new Date(sig.dateCreation) >= startDate);

    return {
      documentsTraites: recentDocuments.filter(doc => doc.status === 'traite').length,
      documentsEnCours: recentDocuments.filter(doc => doc.status === 'en_cours').length,
      signaturesCompletes: recentSignatures.filter(sig => sig.status === 'signe').length,
      signaturesEnAttente: recentSignatures.filter(sig => sig.status === 'en_attente').length,
      totalDocuments: recentDocuments.length,
      totalSignatures: recentSignatures.length
    };
  };

  const getComplianceData = () => {
    const totalSignatures = signatures.length;
    const signaturesQualifiees = signatures.filter(sig => sig.typeSignature === 'qualifiee').length;
    const signaturesAvancees = signatures.filter(sig => sig.typeSignature === 'avancee').length;
    const signaturesSimples = signatures.filter(sig => sig.typeSignature === 'simple').length;

    return {
      conformiteLCJTI: '100%',
      signaturesQualifiees: ((signaturesQualifiees / totalSignatures) * 100).toFixed(1) + '%',
      signaturesAvancees: ((signaturesAvancees / totalSignatures) * 100).toFixed(1) + '%',
      signaturesSimples: ((signaturesSimples / totalSignatures) * 100).toFixed(1) + '%',
      archivageActif: '100%'
    };
  };

  const activityData = getActivityData();
  const complianceData = getComplianceData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports et Analytics</h1>
          <p className="text-gray-600 mt-2">Suivi de l'activité et conformité réglementaire</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Rapport Personnalisé</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="30_jours">30 derniers jours</option>
          <option value="90_jours">90 derniers jours</option>
          <option value="365_jours">Année courante</option>
        </select>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="activite">Activité</option>
          <option value="conformite">Conformité</option>
          <option value="performance">Performance</option>
        </select>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents Traités</p>
              <p className="text-3xl font-bold text-green-600">{activityData.documentsTraites}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+15% vs période précédente</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Signatures Complètes</p>
              <p className="text-3xl font-bold text-blue-600">{activityData.signaturesCompletes}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">+8% vs période précédente</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps Traitement Moyen</p>
              <p className="text-3xl font-bold text-purple-600">2.3j</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />
            <span className="text-sm text-green-600">-12% vs période précédente</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux Satisfaction</p>
              <p className="text-3xl font-bold text-orange-600">96%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+3% vs période précédente</span>
          </div>
        </div>
      </div>

      {/* Main Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Types Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition des Documents</h3>
          <div className="space-y-4">
            {[
              { type: 'Factures', count: Math.floor(documents.length * 0.4), color: 'bg-blue-500' },
              { type: 'Relevés Bancaires', count: Math.floor(documents.length * 0.25), color: 'bg-green-500' },
              { type: 'Bulletins de Paie', count: Math.floor(documents.length * 0.2), color: 'bg-purple-500' },
              { type: 'Déclarations Fiscales', count: Math.floor(documents.length * 0.1), color: 'bg-red-500' },
              { type: 'Autres', count: Math.floor(documents.length * 0.05), color: 'bg-gray-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${item.color} rounded`}></div>
                <span className="flex-1 text-sm text-gray-700">{item.type}</span>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
                <span className="text-sm text-gray-500">
                  {((item.count / documents.length) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Report */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Rapport de Conformité</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">LCJTI</p>
                  <p className="text-sm text-green-700">Loi sur les technologies de l'information</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">{complianceData.conformiteLCJTI}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Loi 25</p>
                  <p className="text-sm text-green-700">Protection des renseignements personnels</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">Conforme</span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Répartition des Types de Signature</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Signatures Qualifiées</span>
                  <span className="text-sm font-medium text-purple-600">{complianceData.signaturesQualifiees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Signatures Avancées</span>
                  <span className="text-sm font-medium text-blue-600">{complianceData.signaturesAvancees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Signatures Simples</span>
                  <span className="text-sm font-medium text-gray-600">{complianceData.signaturesSimples}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Rapports Détaillés</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Rapport d'Activité Client</h4>
                <p className="text-sm text-gray-600">Synthèse par client et période</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Dernière génération: {new Date().toLocaleDateString('fr-CA')}</p>
          </button>

          <button className="p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Audit de Conformité</h4>
                <p className="text-sm text-gray-600">LCJTI, Loi 25, archivage</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Dernière vérification: {new Date().toLocaleDateString('fr-CA')}</p>
          </button>

          <button className="p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <PieChart className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Performance Globale</h4>
                <p className="text-sm text-gray-600">KPI et métriques d'efficacité</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Mise à jour: temps réel</p>
          </button>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendances Mensuelles</h3>
        <div className="h-64 flex items-end space-x-2">
          {Array.from({ length: 12 }, (_, i) => {
            const height = Math.random() * 200 + 40;
            const month = new Date(0, i).toLocaleDateString('fr-CA', { month: 'short' });
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer"
                  style={{ height: `${height}px` }}
                  title={`${month}: ${Math.floor(height / 4)} documents`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Compliance Status */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">État de Conformité Réglementaire</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Conformité LCJTI</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Identification des signataires</span>
                <span className="text-sm font-medium text-green-600">✓ Conforme</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Intégrité des documents</span>
                <span className="text-sm font-medium text-green-600">✓ Conforme</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Consentement manifeste</span>
                <span className="text-sm font-medium text-green-600">✓ Conforme</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Archivage sécurisé</span>
                <span className="text-sm font-medium text-green-600">✓ Actif</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Protection des Données (Loi 25)</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Consentement éclairé</span>
                <span className="text-sm font-medium text-green-600">✓ Obtenu</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimisation des données</span>
                <span className="text-sm font-medium text-green-600">✓ Appliquée</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chiffrement</span>
                <span className="text-sm font-medium text-green-600">✓ AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Audit trail</span>
                <span className="text-sm font-medium text-green-600">✓ Complet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Options d'Exportation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Rapport PDF</div>
              <div className="text-sm text-gray-600">Format imprimable</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Excel/CSV</div>
              <div className="text-sm text-gray-600">Données tabulaires</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
            <Download className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Archive Complète</div>
              <div className="text-sm text-gray-600">Tous les documents</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}