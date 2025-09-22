import { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Calculator,
  Shield,
  Phone,
  CheckCircle,
  ArrowRight,
  Users,
  Star,
  Globe,
  Sparkles
} from 'lucide-react';

interface AuthProps {
  onLogin: (role: string, userData?: any) => void;
  onShowClientRegistration?: () => void;
  userType?: 'admin' | 'client' | null;
  onSwitchUserType?: (type: 'admin' | 'client') => void;
}

const Auth = ({ onLogin, onShowClientRegistration, userType = null, onSwitchUserType }: AuthProps) => {
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, login, twofa, dashboard
  const [selectedType, setSelectedType] = useState<'admin' | 'client' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '', twoFaCode: '' });
  
  useEffect(() => {
    if (userType) {
      setSelectedType(userType);
      setCurrentStep('welcome');
    } else {
      setSelectedType(null);
      setCurrentStep('welcome');
    }
  }, [userType]);

  const handleTypeSelection = (type: 'admin' | 'client') => {
    setSelectedType(type);
    setCurrentStep('welcome');
  };

  const handleLogin = () => {
    // Simulation d'authentification
    if (selectedType === 'admin' && credentials.email.includes('admin')) {
      setCurrentStep('twofa');
    } else if (selectedType === 'client') {
      setCurrentStep('twofa');
    } else {
      setCurrentStep('twofa');
    }
  };

  const handleTwoFa = () => {
    if (credentials.twoFaCode === '123456') {
      // Prepare user data based on type
      let userData = null;
      if (selectedType === 'admin') {
        userData = {
          id: 'admin1',
          email: credentials.email || 'admin@comptable.com',
          nom: 'Administrateur',
          prenom: 'Principal',
          role: 'admin'
        };
      } else if (selectedType === 'client') {
        userData = {
          id: 'client1',
          email: credentials.email || 'client@exemple.com',
          nom: 'Client',
          prenom: 'Test',
          role: 'client'
        };
      }
      
      // Call the onLogin function from props
      onLogin(selectedType === 'admin' ? 'admin' : 'client', userData);
    }
  };

  if (currentStep === 'dashboard') {
    // This should not happen as onLogin should be called before reaching this state
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-servitax-primary via-servitax-secondary to-servitax-accent">
      <div className="min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-servitax-primary/90 to-servitax-secondary/90"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <Calculator className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-black mb-6">
                Bienvenue chez
                <span className="block text-5xl mt-2 bg-gradient-to-r from-white to-servitax-light bg-clip-text text-transparent">
                  ServitTax
                </span>
              </h1>
              <p className="text-xl text-servitax-light leading-relaxed mb-8">
                Services fiscaux et comptables en ligne, accessibles partout au Canada. 
                Excellence professionnelle, prix compétitifs et sécurité des données.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Shield className="h-8 w-8 text-servitax-light mb-2" />
                  <div className="font-semibold">Sécurisé</div>
                  <div className="text-servitax-light">Chiffrement SSL</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Users className="h-8 w-8 text-servitax-light mb-2" />
                  <div className="font-semibold">125+ Clients</div>
                  <div className="text-servitax-light">Satisfaits</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Star className="h-8 w-8 text-servitax-light mb-2" />
                  <div className="font-semibold">20+ Ans</div>
                  <div className="text-servitax-light">D'expérience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Globe className="h-8 w-8 text-servitax-light mb-2" />
                  <div className="font-semibold">Partout</div>
                  <div className="text-servitax-light">Au Canada</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-12">
          <div className="max-w-md mx-auto w-full">
            
            {/* Type Selection */}
            {!selectedType && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-servitax-dark mb-4">Accès Sécurisé</h2>
                  <p className="text-gray-600">Choisissez votre type d'accès pour continuer</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => onSwitchUserType && onSwitchUserType('admin')}
                    className="w-full p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-servitax-primary hover:bg-servitax-primary/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-servitax-dark text-lg">Espace Administrateur</h3>
                        <p className="text-gray-600 text-sm">Gestion complète et tableau de bord</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-servitax-primary transition-colors duration-300" />
                    </div>
                  </button>

                  <button
                    onClick={() => onSwitchUserType && onSwitchUserType('client')}
                    className="w-full p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-servitax-secondary hover:bg-servitax-secondary/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-servitax-secondary to-servitax-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-servitax-dark text-lg">Espace Client</h3>
                        <p className="text-gray-600 text-sm">Accès à votre dossier personnel</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-servitax-secondary transition-colors duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Welcome Screen */}
            {selectedType && currentStep === 'welcome' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className={`w-16 h-16 ${selectedType === 'admin' ? 'bg-gradient-to-br from-servitax-primary to-servitax-secondary' : 'bg-gradient-to-br from-servitax-secondary to-servitax-accent'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    {selectedType === 'admin' ? <Shield className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-white" />}
                  </div>
                  <h2 className="text-3xl font-bold text-servitax-dark mb-4">
                    {selectedType === 'admin' ? 'Espace Administrateur' : 'Espace Client'}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {selectedType === 'admin' 
                      ? 'Gérez votre portefeuille clients et accédez aux outils professionnels'
                      : 'Accédez à votre dossier fiscal et suivez l\'avancement de vos déclarations'
                    }
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep('login')}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                    selectedType === 'admin' 
                      ? 'bg-gradient-to-r from-servitax-primary to-servitax-secondary hover:shadow-xl hover:shadow-servitax-primary/25'
                      : 'bg-gradient-to-r from-servitax-secondary to-servitax-accent hover:shadow-xl hover:shadow-servitax-secondary/25'
                  }`}
                >
                  Accéder à mon espace {selectedType === 'admin' ? 'administrateur' : 'client'}
                </button>

                <button
                  onClick={() => {
                    setSelectedType(null);
                    setCurrentStep('welcome');
                  }}
                  className="w-full py-3 text-gray-600 hover:text-servitax-primary transition-colors duration-300"
                >
                  ← Changer de type d'accès
                </button>
              </div>
            )}

            {/* Login Form */}
            {currentStep === 'login' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className={`w-16 h-16 ${selectedType === 'admin' ? 'bg-gradient-to-br from-servitax-primary to-servitax-secondary' : 'bg-gradient-to-br from-servitax-secondary to-servitax-accent'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-servitax-dark mb-4">Connexion Sécurisée</h2>
                  <p className="text-gray-600">Entrez vos identifiants pour accéder à votre espace</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        placeholder={selectedType === 'admin' ? 'admin@comptable.com' : 'votre@email.com'}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        placeholder={selectedType === 'admin' ? 'admin123' : 'Votre mot de passe'}
                        className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-servitax-primary transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-servitax-primary border-gray-300 rounded focus:ring-servitax-primary" />
                      <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <button type="button" className="text-sm text-servitax-primary hover:text-servitax-secondary transition-colors duration-300">
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                      selectedType === 'admin' 
                        ? 'bg-gradient-to-r from-servitax-primary to-servitax-secondary hover:shadow-xl hover:shadow-servitax-primary/25'
                        : 'bg-gradient-to-r from-servitax-secondary to-servitax-accent hover:shadow-xl hover:shadow-servitax-secondary/25'
                    }`}
                  >
                    Se connecter
                  </button>
                </form>

                {selectedType === 'admin' && (
                  <div className="bg-servitax-primary/5 rounded-2xl p-4">
                    <p className="text-sm text-servitax-dark">
                      <strong>Démo :</strong> Utilisez admin@comptable.com / admin123 pour tester l'accès administrateur
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="w-full py-3 text-gray-600 hover:text-servitax-primary transition-colors duration-300"
                >
                  ← Retour
                </button>
              </div>
            )}

            {/* Two-Factor Authentication */}
            {currentStep === 'twofa' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-servitax-dark mb-4">Authentification 2FA</h2>
                  <p className="text-gray-600 mb-8">
                    Entrez le code de vérification pour sécuriser votre connexion
                  </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleTwoFa(); }}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                      Code de vérification (6 chiffres)
                    </label>
                    <input
                      type="text"
                      value={credentials.twoFaCode}
                      onChange={(e) => setCredentials({...credentials, twoFaCode: e.target.value})}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full py-4 text-2xl text-center font-mono bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none transition-all duration-300 tracking-widest"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <strong>Code de démonstration :</strong> Utilisez <code className="bg-blue-100 px-2 py-1 rounded font-mono">123456</code> pour continuer
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Vérifier le code
                  </button>
                </form>

                <div className="text-center">
                  <button className="text-sm text-servitax-primary hover:text-servitax-secondary transition-colors duration-300">
                    Renvoyer le code
                  </button>
                </div>

                <button
                  onClick={() => setCurrentStep('login')}
                  className="w-full py-3 text-gray-600 hover:text-servitax-primary transition-colors duration-300"
                >
                  ← Retour à la connexion
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>© 2025 ServitTax - Services fiscaux et comptables professionnels</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="hover:text-servitax-primary transition-colors duration-300">Confidentialité</button>
              <button className="hover:text-servitax-primary transition-colors duration-300">Conditions</button>
              <button className="hover:text-servitax-primary transition-colors duration-300">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
