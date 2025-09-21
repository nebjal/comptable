import { useState } from 'react';
import { User, Shield, Bell, Database, Gavel, Globe, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profil');

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'securite', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'donnees', label: 'Données', icon: Database },
    { id: 'conformite', label: 'Conformité', icon: Gavel },
    { id: 'general', label: 'Général', icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profil':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Professionnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
                  <input type="text" defaultValue="Marie Comptable" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre Professionnel</label>
                  <input type="text" defaultValue="CPA, CA" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de Membre CPA</label>
                  <input type="text" defaultValue="123456" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cabinet/Entreprise</label>
                  <input type="text" defaultValue="Cabinet Conseil QC" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'securite':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de Sécurité</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-900">Authentification Multi-Facteurs (MFA)</p>
                    <p className="text-sm text-green-700">Protection renforcée activée</p>
                  </div>
                  <span className="text-green-600 font-bold">Activé</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-blue-900">Chiffrement de Bout en Bout</p>
                    <p className="text-sm text-blue-700">TLS 1.3 + AES-256</p>
                  </div>
                  <span className="text-blue-600 font-bold">Actif</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div>
                    <p className="font-medium text-purple-900">Audit de Sécurité</p>
                    <p className="text-sm text-purple-700">Dernière vérification: 15 sept. 2025</p>
                  </div>
                  <span className="text-purple-600 font-bold">Conforme</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'conformite':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conformité Réglementaire</h3>
              <div className="space-y-4">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">LCJTI - Loi concernant le cadre juridique des TI</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Signatures électroniques conformes à l'article 2827 du Code civil</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Identification des signataires et intégrité des documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Archivage électronique à valeur probante</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Loi 25 - Protection des renseignements personnels</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Consentement libre et éclairé des clients</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Minimisation et limitation de la finalité</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Délai de conservation respecté (6 ans)</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Obligations Fiscales TPS/TVQ</h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Conservation des registres et pièces justificatives</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Archivage automatique selon Revenu Québec</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Traçabilité complète des modifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres Généraux</h3>
              <p className="text-gray-600">Sélectionnez un onglet pour configurer les paramètres.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">Configuration de l'application et conformité</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">État du Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Services Opérationnels</p>
              <p className="text-sm text-gray-600">Tous les services fonctionnent</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Sauvegardes</p>
              <p className="text-sm text-gray-600">Dernière: il y a 2h</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Certificats SSL</p>
              <p className="text-sm text-gray-600">Valides jusqu'en 2026</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col space-y-2">
            <h4 className="font-semibold text-blue-900">Exportation des Données</h4>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => alert('Exportation CSV en cours...')}>Exporter au format CSV</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => alert('Exportation PDF en cours...')}>Exporter au format PDF</button>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex flex-col space-y-2">
            <h4 className="font-semibold text-yellow-900">Importation & Réinitialisation</h4>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => alert('Importation des données en cours...')}>Importer des données</button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => alert('Réinitialisation de l\'application en cours...')}>Réinitialiser l'application</button>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Documentation & Support</h4>
          <a href="https://www.ocaq.qc.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Documentation OCAQ</a>
          <span className="mx-2">|</span>
          <a href="https://www.revenuquebec.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Revenu Québec</a>
          <span className="mx-2">|</span>
          <a href="mailto:support@cabinet.comptable" className="text-blue-600 hover:underline">Support Technique</a>
        </div>
      </div>
    </div>
  );
}