import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Documents from './components/Documents';
import Signatures from './components/Signatures';
import Communications from './components/Communications';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Auth from './components/Auth';
import ClientRegistration from './components/ClientRegistration';
import ClientAccounts from './components/ClientAccounts';
import DocumentDownload from './components/DocumentDownload';
import DocumentSignature from './components/DocumentSignature';
import ContactComptable from './components/ContactComptable';
import DocumentUpload from './components/DocumentUpload';
import DocumentLibrary from './components/DocumentLibrary';
import ClientDocumentsDashboard from './components/ClientDocumentsDashboard';
import MainWebsitePlaceholder from './components/MainWebsitePlaceholder';
import FranchisePage from './components/FranchisePage';
import AIChatbot from './components/AIChatbot';

// Type definitions
interface User {
  id?: string;
  email: string;
  nom: string;
  prenom: string;
  role?: string;
  userType?: string;
}

function App() {
  const [showWebsite, setShowWebsite] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userType, setUserType] = useState<'admin' | 'client' | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [showClientRegistration, setShowClientRegistration] = useState(false);
  const [showDocumentDownload, setShowDocumentDownload] = useState(false);
  const [showDocumentSignature, setShowDocumentSignature] = useState(false);
  const [showContactComptable, setShowContactComptable] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showDocumentLibrary, setShowDocumentLibrary] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);

  // Gestion des comptes utilisateurs
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([
    // Comptes administrateurs
    {
      id: 'admin1',
      email: 'admin@comptable.com',
      password: 'admin123',
      role: 'admin',
      userType: 'admin',
      nom: 'Administrateur',
      prenom: 'Principal',
      status: 'actif',
      dateCreation: new Date().toISOString().split('T')[0]
    },
    // Comptes clients (seront ajoutés lors de l'inscription)
  ]);

  const handleLogin = (_userRole: string, userData?: User) => {
    if (userType === 'admin') {
      setRole('admin');
      setCurrentUser(userData || { email: 'admin@comptable.com', nom: 'Administrateur', prenom: '' });
      setShowWebsite(false);
    } else if (userType === 'client') {
      setRole('client');
      setCurrentUser(userData || null);
      setShowWebsite(false);
    }
  };

  const handleSwitchUserType = (type: 'admin' | 'client') => {
    setUserType(type);
  };

  // Gestion des comptes utilisateurs
  const handleAddUserAccount = (account: UserAccount) => {
    setUserAccounts(prev => [...prev, account]);
  };

  const handleUpdateUserAccount = (id: string, updates: Partial<UserAccount>) => {
    setUserAccounts(prev => prev.map(account =>
      account.id === id ? { ...account, ...updates } : account
    ));
  };

  const handleDeleteUserAccount = (id: string) => {
    setUserAccounts(prev => prev.filter(account => account.id !== id));
  };

  const handleClientRegistrationSuccess = (clientData: Client) => {
    // Ajouter le nouveau client à la liste
    const newClient: Client = {
      ...clientData,
      status: 'actif' as const,
      documentsCount: 0,
      signaturesEnAttente: 0,
      dateFinExercice: new Date().getFullYear() + '-12-31'
    };
    setClients(prev => [...prev, newClient]);
    setShowClientRegistration(false);
    alert('Votre dossier a été créé avec succès ! Vous pouvez maintenant vous connecter avec vos identifiants.');
  };

  const handleShowClientRegistration = () => {
    setShowClientRegistration(true);
  };

  const handleBackToAuth = () => {
    setShowClientRegistration(false);
  };

  // Gestion des modales client
  const handleShowDocumentDownload = () => {
    setShowDocumentDownload(true);
  };

  const handleShowDocumentSignature = () => {
    setShowDocumentSignature(true);
  };

  const handleShowContactComptable = () => {
    setShowContactComptable(true);
  };

  const handleShowDocumentUpload = () => {
    setShowDocumentUpload(true);
  };

  const handleSignatureComplete = (signatureData: { requestId: string; documentId: string; signatureData: string; method: string; timestamp: string }) => {
    console.log('Signature complétée:', signatureData);
    // Ici on pourrait envoyer la signature à l'API
  };

  const handleUploadSuccess = (documentData: { id: string; name: string; size: number; type: string; category: string; uploadedAt: string; clientEmail: string }) => {
    console.log('Document uploadé:', documentData);
    // Ici on pourrait mettre à jour la liste des documents du client
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients newClients={clients} onAddClient={(client) => setClients(prev => [...prev, client])} />;
      case 'documents':
        return <Documents />;
      case 'clientDocuments':
        return <ClientDocumentsDashboard />;
      case 'signatures':
        return <Signatures />;
      case 'communications':
        return <Communications />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'clientAccounts':
        return <ClientAccounts
          userAccounts={userAccounts}
          onAddAccount={handleAddUserAccount}
          onUpdateAccount={handleUpdateUserAccount}
          onDeleteAccount={handleDeleteUserAccount}
        />;
    }
  };

  // Show website by default
  if (showWebsite) {
    return (
      <HelmetProvider>
        <MainWebsitePlaceholder />
      </HelmetProvider>
    );
  }

  if (!role) {
    if (showClientRegistration) {
      return (
        <HelmetProvider>
          <ClientRegistration
            onRegistrationSuccess={handleClientRegistrationSuccess}
            onBackToAuth={handleBackToAuth}
          />
          <AIChatbot />
        </HelmetProvider>
      );
    }
    return (
      <HelmetProvider>
        <Auth
          onLogin={handleLogin}
          onShowClientRegistration={handleShowClientRegistration}
          userType={userType}
          onSwitchUserType={handleSwitchUserType}
        />
        <AIChatbot />
      </HelmetProvider>
    );
  }

  // Interface client : accès sécurisé à son propre tableau de bord
  if (role === 'client') {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                      Espace Client - {currentUser?.prenom} {currentUser?.nom}
                    </h1>
                    <p className="text-sm text-gray-600">Tableau de bord personnel</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRole(null);
                    setUserType(null);
                    setCurrentUser(null);
                    setShowWebsite(true);
                  }}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tableau de bord client personnalisé */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mes Documents</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {clients.find(c => c.email === currentUser?.email)?.documentsCount || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📄</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Signatures en Attente</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {clients.find(c => c.email === currentUser?.email)?.signaturesEnAttente || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-xl">✍️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Statut du Dossier</p>
                    <p className="text-lg font-semibold text-green-600">Actif</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides pour le client */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Documents & Téléchargements */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">📄</span>
                  </div>
                  Documents & Téléchargements
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleShowDocumentDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">⬇️</span>
                    Télécharger un document
                  </button>
                  <button
                    onClick={() => setShowDocumentLibrary(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">📁</span>
                    Mes documents déposés
                  </button>
                </div>
              </div>

              {/* Actions & Services */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">⚡</span>
                  </div>
                  Actions & Services
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleShowDocumentUpload}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">⬆️</span>
                    Déposer un document
                  </button>
                  <button
                    onClick={handleShowDocumentSignature}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">✍️</span>
                    Signer un document
                  </button>
                  <button
                    onClick={handleShowContactComptable}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">💬</span>
                    Contacter mon comptable
                  </button>
                </div>
              </div>
            </div>

            {/* Section Informations & Support */}
            <div className="mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-orange-600 text-sm">ℹ️</span>
                  </div>
                  Informations & Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Mes Informations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{currentUser?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nom:</span>
                        <span className="font-medium">{currentUser?.prenom} {currentUser?.nom}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className="font-medium text-green-600">Client Actif</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Support & Aide</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        📞 Support téléphonique: (514) 123-4567
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        ✉️ support@servitax.ca
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        ❓ Centre d'aide en ligne
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modales client */}
          <DocumentDownload
            isOpen={showDocumentDownload}
            onClose={() => setShowDocumentDownload(false)}
            clientEmail={currentUser?.email || ''}
          />

          <DocumentSignature
            isOpen={showDocumentSignature}
            onClose={() => setShowDocumentSignature(false)}
            _clientEmail={currentUser?.email || ''}
            onSignatureComplete={handleSignatureComplete}
          />

          <ContactComptable
            isOpen={showContactComptable}
            onClose={() => setShowContactComptable(false)}
            clientInfo={{
              email: currentUser?.email || '',
              prenom: currentUser?.prenom || '',
              nom: currentUser?.nom || ''
            }}
          />

          <DocumentUpload
            isOpen={showDocumentUpload}
            onClose={() => setShowDocumentUpload(false)}
            clientEmail={currentUser?.email || ''}
            onUploadSuccess={handleUploadSuccess}
          />

          <DocumentLibrary
            isOpen={showDocumentLibrary}
            onClose={() => setShowDocumentLibrary(false)}
            clientEmail={currentUser?.email || ''}
          />
        </div>
        <AIChatbot />
      </HelmetProvider>
    );
  }

  // Interface administrateur : accès complet au système
  if (role === 'admin') {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Tableau de Bord Administrateur
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Bienvenue, {currentUser?.prenom} {currentUser?.nom}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRole(null);
                    setUserType(null);
                    setCurrentUser(null);
                    setShowWebsite(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Déconnexion
                </button>
              </div>
              {renderView()}
            </div>
          </main>
        </div>
        <AIChatbot />
      </HelmetProvider>
    );
  }

  return null;
}

export default App;