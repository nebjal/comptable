import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Key,
  Clock,
  Users
} from 'lucide-react';

// Types pour les comptes clients
interface ClientAccount {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'client';
}

// Types pour les données utilisateur
interface UserData {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'client';
}

// Type definitions
interface UserData {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'client';
}

interface ClientAccount {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'client';
}

interface AuthProps {
  onLogin: (role: string, userData?: UserData) => void;
  onShowClientRegistration?: () => void;
  userType?: 'admin' | 'client' | null;
  onSwitchUserType?: (type: 'admin' | 'client') => void;
}

export default function Auth({ onLogin, onShowClientRegistration, userType = null, onSwitchUserType }: AuthProps) {
  const [step, setStep] = useState<'welcome' | 'login' | '2fa' | 'success'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [rememberMe, setRememberMe] = useState(false);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  // Timer for 2FA resend
  useEffect(() => {
    if (step === '2fa' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulation de vérification des comptes selon le type d'utilisateur
    setTimeout(() => {
      let userFound = false;

      if (userType === 'admin') {
        // Vérification compte admin
        if (email === 'admin@comptable.com' && password === 'admin123') {
          userFound = true;
        }
      } else if (userType === 'client') {
        // Simulation de recherche dans les comptes clients
        // En production, ceci viendrait d'une API
        const mockClientAccounts = [
          {
            id: 'client1',
            email: 'client@exemple.com',
            password: 'client123',
            nom: 'Client',
            prenom: 'Test',
            role: 'client'
          }
        ];

        const clientAccount = mockClientAccounts.find(
          account => account.email === email && account.password === password
        );

        if (clientAccount) {
          userFound = true;
        }
      }

      if (userFound) {
        setStep('2fa');
        setTimeLeft(30);
      } else {
        setError(userType === 'admin'
          ? 'Identifiants administrateur incorrects'
          : 'Email ou mot de passe incorrect'
        );
      }
      setLoading(false);
    }, 1500);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    setLoading(true);
    setError('');

    try {
      // Vérifier que le credential existe
      if (!credentialResponse.credential) {
        setError('Erreur lors de la récupération des données Google');
        setLoading(false);
        return;
      }

      // Décoder le JWT token Google pour obtenir les données utilisateur
      const tokenParts = credentialResponse.credential.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));

      const googleUser = {
        email: payload.email,
        name: payload.name,
        given_name: payload.given_name,
        family_name: payload.family_name,
        email_verified: payload.email_verified,
        sub: payload.sub // Google user ID
      };

      // Simulation de comptes clients existants (en production, ceci viendrait d'une API)
      const mockClientAccounts: ClientAccount[] = [
        {
          id: 'client1',
          email: 'client@exemple.com',
          password: 'client123',
          nom: 'Client',
          prenom: 'Test',
          role: 'client'
        },
        {
          id: 'client2',
          email: 'client.exemple@gmail.com',
          password: 'gmail123',
          nom: 'Exemple',
          prenom: 'Client',
          role: 'client'
        },
        {
          id: 'client3',
          email: googleUser.email, // Dynamiquement ajouter l'email Google
          password: 'google_auth',
          nom: googleUser.family_name || 'Utilisateur',
          prenom: googleUser.given_name || 'Google',
          role: 'client'
        }
      ];

      // Vérifier si l'utilisateur a un compte enregistré avec cet email Gmail
      const existingClientAccount = mockClientAccounts.find(
        (account: ClientAccount) => account.email === googleUser.email
      );

      if (existingClientAccount) {
        // Stocker temporairement les données Google pour la 2FA
        setEmail(googleUser.email);
        setPassword('google_auth'); // Indicateur que c'est une connexion Google

        // L'utilisateur a un compte enregistré - passer directement à la 2FA
        setStep('2fa');
        setTimeLeft(30);
        setError('');
      } else {
        // L'utilisateur n'a pas de compte enregistré
        setError(`Aucun compte trouvé pour ${googleUser.email}. Veuillez créer un compte d'abord.`);
      }
    } catch (error) {
      console.error('Erreur lors du traitement des données Google:', error);
      setError('Erreur lors de la connexion Google. Veuillez réessayer.');
    }

    setLoading(false);
  };

  const handleGoogleError = () => {
    setError('Échec de la connexion Google');
  };

  const handle2faSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123456') {
      setStep('success');

      // Déterminer les données utilisateur selon le type
      let userData: UserData | null = null;
      if (userType === 'admin') {
        userData = {
          id: 'admin1',
          email: 'admin@comptable.com',
          nom: 'Administrateur',
          prenom: 'Principal',
          role: 'admin'
        };
      } else if (userType === 'client') {
        // Pour les clients, utiliser les données stockées (peuvent venir de Google ou de login classique)
        if (password === 'google_auth') {
          // C'est une connexion Google - utiliser les données Google
          const mockClientAccounts: ClientAccount[] = [
            {
              id: 'client1',
              email: 'client@exemple.com',
              password: 'client123',
              nom: 'Client',
              prenom: 'Test',
              role: 'client'
            },
            {
              id: 'client2',
              email: 'client.exemple@gmail.com',
              password: 'gmail123',
              nom: 'Exemple',
              prenom: 'Client',
              role: 'client'
            },
            {
              id: 'client3',
              email: email,
              password: 'google_auth',
              nom: 'Utilisateur',
              prenom: 'Google',
              role: 'client'
            }
          ];

          const clientAccount = mockClientAccounts.find(
            (account: ClientAccount) => account.email === email
          );

          if (clientAccount) {
            userData = {
              id: clientAccount.id,
              email: clientAccount.email,
              nom: clientAccount.nom,
              prenom: clientAccount.prenom,
              role: 'client'
            };
          }
        } else {
          // Connexion classique avec email/mot de passe
          const mockClientAccounts: ClientAccount[] = [
            {
              id: 'client1',
              email: 'client@exemple.com',
              password: 'client123',
              nom: 'Client',
              prenom: 'Test',
              role: 'client'
            }
          ];

          const clientAccount = mockClientAccounts.find(
            (account: ClientAccount) => account.email === email && account.password === password
          );

          if (clientAccount) {
            userData = {
              id: clientAccount.id,
              email: clientAccount.email,
              nom: clientAccount.nom,
              prenom: clientAccount.prenom,
              role: 'client'
            };
          }
        }
      }

      setTimeout(() => {
        onLogin(userType === 'admin' ? 'admin' : 'client', userData || undefined);
      }, 2000);
    } else {
      setError('Code incorrect');
    }
  };

  const resendCode = () => {
    setTimeLeft(30);
    setError('');
    // Simulate resend
    setTimeout(() => {
      setError('Nouveau code envoyé');
    }, 500);
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Logo & Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Centre Pro des Impôts
              </h1>
              <p className="text-gray-300 text-lg">
                Services d'impôts et de comptabilité en ligne
              </p>
            </div>

            {/* Welcome Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Choisissez votre espace
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Sélectionnez l'espace qui correspond à votre profil pour accéder à vos services.
                </p>
              </div>

              {/* User Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => onSwitchUserType && onSwitchUserType('admin')}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'admin'
                      ? 'bg-blue-500/20 border-blue-400 text-white'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-bold mb-2">Espace Administrateur</h3>
                    <p className="text-sm leading-relaxed">
                      Accès complet au système de gestion comptable, clients, documents et rapports.
                    </p>
                    <div className="mt-4 text-xs text-blue-300">
                      Pour comptables et administrateurs
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => onSwitchUserType && onSwitchUserType('client')}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'client'
                      ? 'bg-green-500/20 border-green-400 text-white'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
                    <h3 className="text-xl font-bold mb-2">Espace Client</h3>
                    <p className="text-sm leading-relaxed">
                      Accès à vos documents personnels, déclarations et suivi de vos dossiers.
                    </p>
                    <div className="mt-4 text-xs text-green-300">
                      Pour clients inscrits
                    </div>
                  </div>
                </button>
              </div>

              {/* Action Buttons */}
              {userType && (
                <div className="space-y-4">
                  <button
                    onClick={() => setStep('login')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <span>Accéder à mon espace {userType === 'admin' ? 'administrateur' : 'client'}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {userType === 'client' && (
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        Pas encore de compte ?
                        <button
                          onClick={onShowClientRegistration}
                          className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors"
                        >
                          Créer mon dossier
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!userType && (
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Veuillez sélectionner votre espace pour continuer
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                © 2025 Groupe ServiTax Solutions Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Connexion Espace Client
              </h1>
              <p className="text-gray-300">
                Connexion sécurisée avec authentification robuste
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleEmailLogin} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Votre mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/5 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                      Se souvenir de moi
                    </label>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium">
                    Mot de passe oublié ?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : null}
                  <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">ou continuer avec</span>
                </div>
              </div>

              {/* Google Login */}
              <div className="mb-6 relative z-10">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
                {error && error.includes('Aucun compte trouvé') && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Vous n'avez pas encore de compte ?{' '}
                      <button
                        onClick={() => {
                          if (onShowClientRegistration) {
                            onShowClientRegistration();
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        Créer votre dossier client
                      </button>
                    </p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="text-center space-y-4">
                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-3">
                    Nouveau client ?
                    <button
                      onClick={() => {
                        if (onShowClientRegistration) {
                          onShowClientRegistration();
                        }
                      }}
                      className="text-blue-400 hover:text-blue-300 ml-2 font-semibold transition-colors underline"
                    >
                      Créer un compte
                    </button>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setStep('welcome')}
                    className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                  >
                    ← Retour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === '2fa') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Double authentification
              </h1>
              <p className="text-gray-300">
                Vérifiez votre identité pour continuer
              </p>
            </div>

            {/* 2FA Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl mb-4">
                  <Key className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Un code de vérification a été envoyé à votre appareil.
                  <br />
                  <strong className="text-white">Code de démonstration : 123456</strong>
                </p>
              </div>

              <form onSubmit={handle2faSubmit} className="space-y-6">
                {/* Code Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                    Entrez le code à 6 chiffres
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full text-center text-2xl font-mono tracking-widest py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Vérifier le code</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>

              {/* Resend Code */}
              <div className="text-center mt-6">
                {timeLeft > 0 ? (
                  <p className="text-gray-400 text-sm flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Renvoyer le code dans {timeLeft}s
                  </p>
                ) : (
                  <button
                    onClick={resendCode}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Renvoyer le code
                  </button>
                )}
              </div>

              {/* Back Button */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setStep('login')}
                  className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                >
                  ← Retour à la connexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-ping" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full shadow-2xl mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Authentification réussie !
              </h1>
              <p className="text-gray-300 text-lg">
                Bienvenue dans votre espace sécurisé
              </p>
            </div>

            {/* Loading Animation */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
              <p className="text-white font-medium">
                Connexion en cours...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
