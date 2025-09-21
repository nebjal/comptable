import { useState, useEffect } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import {
  UserPlus,
  Mail,
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
  CreditCard,
  Users
} from 'lucide-react';

// Type definitions
interface GoogleUser {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  [key: string]: unknown;
}

interface ClientData {
  id: string;
  nom: string;
  raisonSociale: string;
  type: 'entreprise' | 'travailleur_autonome' | 'particulier';
  neq: string;
  tpsTvq: string;
  adresse: string;
  email: string;
  telephone: string;
  status: 'actif' | 'inactif' | 'suspendu';
  dateFinExercice: string;
  documentsCount: number;
  signaturesEnAttente: number;
  googleAccount?: GoogleUser;
  dateCreation?: string;
  [key: string]: unknown;
}

interface ClientRegistrationProps {
  onRegistrationSuccess: (clientData: ClientData) => void;
  onBackToAuth: () => void;
}

interface ClientFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  raisonSociale: string;
  type: 'entreprise' | 'travailleur_autonome' | 'particulier';
  adresse: string;
  ville: string;
  codePostal: string;
  province: string;
  neq: string;
  tpsTvq: string;
  dateNaissance: string;
  numeroAssuranceSociale: string;
}

export default function ClientRegistration({ onRegistrationSuccess, onBackToAuth }: ClientRegistrationProps) {
  const [step, setStep] = useState<'google_auth' | 'personal_info' | 'business_info' | 'documents' | 'confirmation'>('google_auth');
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [formData, setFormData] = useState<ClientFormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    raisonSociale: '',
    type: 'particulier',
    adresse: '',
    ville: '',
    codePostal: '',
    province: 'Québec',
    neq: '',
    tpsTvq: '',
    dateNaissance: '',
    numeroAssuranceSociale: ''
  });
  const [driveLink, setDriveLink] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    setLoading(true);
    // Simuler la récupération des données Google depuis credentialResponse
    console.log('Google auth successful:', credentialResponse);
    setTimeout(() => {
      const mockGoogleUser = {
        email: 'client.exemple@gmail.com',
        name: 'Client Exemple',
        given_name: 'Client',
        family_name: 'Exemple'
      };
      setGoogleUser(mockGoogleUser);
      setFormData(prev => ({
        ...prev,
        email: mockGoogleUser.email,
        prenom: mockGoogleUser.given_name,
        nom: mockGoogleUser.family_name
      }));
      setStep('personal_info');
      setLoading(false);
    }, 1500);
  };

  const handleGoogleError = () => {
    setError('Échec de la connexion Google. Veuillez réessayer.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePersonalInfo = () => {
    if (!formData.prenom || !formData.nom || !formData.telephone || !formData.dateNaissance) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    if (!formData.numeroAssuranceSociale || formData.numeroAssuranceSociale.length !== 9) {
      setError('Le numéro d\'assurance sociale doit contenir 9 chiffres.');
      return false;
    }
    return true;
  };

  const validateBusinessInfo = () => {
    if (formData.type === 'entreprise' && !formData.raisonSociale) {
      setError('La raison sociale est obligatoire pour les entreprises.');
      return false;
    }
    if (!formData.adresse || !formData.ville || !formData.codePostal) {
      setError('Veuillez remplir l\'adresse complète.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError('');

    if (step === 'personal_info') {
      if (validatePersonalInfo()) {
        setStep('business_info');
      }
    } else if (step === 'business_info') {
      if (validateBusinessInfo()) {
        setStep('documents');
      }
    } else if (step === 'documents') {
      setStep('confirmation');
    }
  };

  const handlePrevStep = () => {
    if (step === 'personal_info') {
      setStep('google_auth');
    } else if (step === 'business_info') {
      setStep('personal_info');
    } else if (step === 'documents') {
      setStep('business_info');
    } else if (step === 'confirmation') {
      setStep('documents');
    }
  };

  const handleSubmitRegistration = () => {
    setLoading(true);
    const clientData = {
      clientEmail: formData.email,
      clientName: formData.nom + ' ' + formData.prenom,
      type: formData.type === 'entreprise' ? 'compagnie' : 'particulier',
    };
    fetch('/api/createClientFolder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    })
      .then(res => res.json())
      .then(result => {
        setDriveLink(result.link);
        alert('Dossier Drive créé et email envoyé au client !');
        setLoading(false);
        // On peut aussi appeler onRegistrationSuccess ici si besoin
      })
      .catch(() => {
        alert('Erreur lors de la création du dossier client.');
        setLoading(false);
      });
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'google_auth', label: 'Authentification', icon: Shield },
      { key: 'personal_info', label: 'Informations', icon: Users },
      { key: 'business_info', label: 'Entreprise', icon: Building2 },
      { key: 'documents', label: 'Documents', icon: FileText },
      { key: 'confirmation', label: 'Confirmation', icon: CheckCircle }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = step === stepItem.key;
          const isCompleted = steps.findIndex(s => s.key === step) > index;

          return (
            <div key={stepItem.key} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-gray-300 border-gray-300 text-gray-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (step === 'google_auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
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

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl mb-6">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Créer mon dossier
              </h1>
              <p className="text-gray-300 text-lg">
                Inscription sécurisée pour nouveaux clients
              </p>
            </div>

            {/* Authentification Gmail Obligatoire */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-xl mb-4">
                  <Mail className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Authentification Gmail obligatoire
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Pour créer votre dossier client, vous devez vous connecter avec votre compte Gmail.
                  Cette authentification garantit la sécurité de vos données.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              {/* Google Login */}
              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                />
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-4">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Connexion à Gmail...</p>
                </div>
              )}

              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={onBackToAuth}
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

  if (step === 'personal_info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {renderStepIndicator()}

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Informations personnelles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre prénom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email (Gmail)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="(514) 555-1234"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Numéro d'assurance sociale *
                  </label>
                  <input
                    type="text"
                    name="numeroAssuranceSociale"
                    value={formData.numeroAssuranceSociale}
                    onChange={(e) => handleInputChange({
                      ...e,
                      target: { ...e.target, value: e.target.value.replace(/\D/g, '').slice(0, 9) }
                    })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="123456789"
                    maxLength={9}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mt-6">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}
              {/* Affichage du lien Drive après création */}
              {driveLink && (
                <div className="flex items-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl mt-6">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-300 text-sm">
                    Dossier Drive créé : <a href={driveLink} target="_blank" rel="noopener noreferrer" className="underline">Accéder au dossier</a>
                  </span>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Précédent
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'business_info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {renderStepIndicator()}

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Informations d'entreprise
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type d'entité *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="particulier">Particulier</option>
                    <option value="travailleur_autonome">Travailleur autonome</option>
                    <option value="entreprise">Entreprise</option>
                  </select>
                </div>

                {formData.type === 'entreprise' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Raison sociale *
                      </label>
                      <input
                        type="text"
                        name="raisonSociale"
                        value={formData.raisonSociale}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Nom de l'entreprise"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          NEQ
                        </label>
                        <input
                          type="text"
                          name="neq"
                          value={formData.neq}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="1234567890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          TPS/TVQ
                        </label>
                        <input
                          type="text"
                          name="tpsTvq"
                          value={formData.tpsTvq}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="TPS123-TVQ456"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="123 rue Principale"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Montréal"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      name="codePostal"
                      value={formData.codePostal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="H1A 1A1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Province
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Québec">Québec</option>
                      <option value="Ontario">Ontario</option>
                      <option value="Alberta">Alberta</option>
                      <option value="Colombie-Britannique">Colombie-Britannique</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mt-6">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Précédent
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'documents') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {renderStepIndicator()}

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Documents requis
              </h2>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Carte d'identité</p>
                        <p className="text-gray-400 text-sm">Permis de conduire ou passeport</p>
                      </div>
                    </div>
                    <div className="text-green-400">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Preuve d'adresse</p>
                        <p className="text-gray-400 text-sm">Facture d'utilité ou relevé bancaire</p>
                      </div>
                    </div>
                    <div className="text-yellow-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {formData.type === 'entreprise' && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Documents d'entreprise</p>
                          <p className="text-gray-400 text-sm">Statuts, NEQ, etc.</p>
                        </div>
                      </div>
                      <div className="text-yellow-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 font-medium">Documents à fournir ultérieurement</p>
                    <p className="text-blue-200 text-sm mt-1">
                      Vous pourrez télécharger vos documents une fois votre compte créé.
                      Notre équipe vous contactera pour valider les informations fournies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Précédent
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {renderStepIndicator()}

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-xl mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Confirmation de l'inscription
                </h2>
                <p className="text-gray-300">
                  Vérifiez vos informations avant de finaliser la création de votre dossier
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Nom:</span>
                      <p className="text-white font-medium">{formData.prenom} {formData.nom}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="text-white font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Téléphone:</span>
                      <p className="text-white font-medium">{formData.telephone}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Date de naissance:</span>
                      <p className="text-white font-medium">{new Date(formData.dateNaissance).toLocaleDateString('fr-CA')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Informations d'entreprise</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <p className="text-white font-medium capitalize">{formData.type.replace('_', ' ')}</p>
                    </div>
                    {formData.raisonSociale && (
                      <div>
                        <span className="text-gray-400">Raison sociale:</span>
                        <p className="text-white font-medium">{formData.raisonSociale}</p>
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="text-gray-400">Adresse:</span>
                      <p className="text-white font-medium">
                        {formData.adresse}, {formData.ville}, {formData.codePostal}, {formData.province}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-300 font-medium">Prochaines étapes</p>
                      <ul className="text-yellow-200 text-sm mt-2 space-y-1">
                        <li>• Téléchargement des documents justificatifs</li>
                        <li>• Validation de votre dossier par notre équipe</li>
                        <li>• Activation de votre accès client</li>
                        <li>• Invitation à votre première rencontre</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mt-6">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Précédent
                </button>
                <button
                  onClick={handleSubmitRegistration}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Création du dossier...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Créer mon dossier
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
