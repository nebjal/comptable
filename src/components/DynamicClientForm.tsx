import { useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {
  UserPlus,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  Upload,
  X,
  ChevronRight,
  ChevronLeft,
  Save,
  User,
  Heart,
  Globe,
  Home,
  FileCheck,
  Info
} from 'lucide-react';
import GoogleSheetsService from '../services/googleSheetsService.ts';

interface DynamicClientFormProps {
  onRegistrationSuccess: (clientData: ClientData) => void;
  onBackToAuth: () => void;
}

interface ClientData {
  id: string;
  googleAccount: GoogleUser;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  consentementNotaire: boolean;
  dateConsentement: string;
  ipConsentement: string;
  status: string;
  dateFinExercice: string;
  documentsCount: number;
  signaturesEnAttente: number;
}

interface GoogleUser {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  credential?: string;
}

interface FormData {
  // Informations de contact
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  genre: 'Masculin' | 'Féminin' | '';
  dateNaissance: string;
  adresse: string;
  codePostal: string;

  // État civil
  etatCivil: 'Célibataire' | 'Marié' | 'Conjoint de fait' | 'Séparé/Divorcé' | 'Veuf' | '';
  dateChangementEtatCivil: string;

  // Informations conjoint
  conjointNom: string;
  conjointPrenom: string;
  conjointDateNaissance: string;
  conjointEmail: string;
  conjointTelephone: string;
  conjointNonResident: boolean;
  conjointNouveauArrivant: boolean;

  // Nouveaux arrivants
  nouveauArrivant: boolean;
  dateEntreeCanada: string;
  revenuHorsCanadaDeclarant: string;
  revenuHorsCanadaConjoint: string;

  // Départ du Canada
  departCanada: boolean;
  dateDepartCanada: string;
  anneesConcernees: string;

  // Personnes à charge
  aPersonnesCharge: boolean;
  personnesCharge: Array<{
    nom: string;
    prenom: string;
    dateNaissance: string;
    lienParente: string;
  }>;

  // Résidence seule
  residenceSeul: boolean;

  // Pièce d'identité
  pieceIdentite: File | null;
  pieceIdentiteUrl: string;

  // Consentement notaire
  consentementNotaire: boolean;
  dateConsentement: string;
  ipConsentement: string;

  // Métadonnées
  brouillon: boolean;
  dateCreation: string;
  dateModification: string;
  progression: number;
}

export default function DynamicClientForm({ onRegistrationSuccess, onBackToAuth }: DynamicClientFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [googleSheetsService] = useState(() => new GoogleSheetsService());

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    genre: '',
    dateNaissance: '',
    adresse: '',
    codePostal: '',
    etatCivil: '',
    dateChangementEtatCivil: '',
    conjointNom: '',
    conjointPrenom: '',
    conjointDateNaissance: '',
    conjointEmail: '',
    conjointTelephone: '',
    conjointNonResident: false,
    conjointNouveauArrivant: false,
    nouveauArrivant: false,
    dateEntreeCanada: '',
    revenuHorsCanadaDeclarant: '',
    revenuHorsCanadaConjoint: '',
    departCanada: false,
    dateDepartCanada: '',
    anneesConcernees: '',
    aPersonnesCharge: false,
    personnesCharge: [],
    residenceSeul: false,
    pieceIdentite: null,
    pieceIdentiteUrl: '',
    consentementNotaire: false,
    dateConsentement: '',
    ipConsentement: '',
    brouillon: true,
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString(),
    progression: 0
  });

  const steps = [
    { id: 'auth', title: 'Authentification', icon: Shield, required: true },
    { id: 'contact', title: 'Informations de contact', icon: User, required: true },
    { id: 'civil', title: 'État civil', icon: Heart, required: true },
    { id: 'conjoint', title: 'Informations conjoint', icon: Users, required: false },
    { id: 'immigration', title: 'Situation immigration', icon: Globe, required: false },
    { id: 'charges', title: 'Personnes à charge', icon: Home, required: false },
    { id: 'documents', title: 'Documents', icon: FileText, required: true },
    { id: 'consentement', title: 'Consentement', icon: FileCheck, required: true },
    { id: 'confirmation', title: 'Confirmation', icon: CheckCircle, required: true }
  ];

  const calculateProgression = useCallback(() => {
    const requiredFields = [
      formData.nom, formData.prenom, formData.email, formData.telephone,
      formData.genre, formData.dateNaissance, formData.adresse, formData.codePostal,
      formData.etatCivil, formData.consentementNotaire
    ];

    const filledFields = requiredFields.filter(field => field && field !== '').length;
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [formData]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!googleUser) return;

    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        dateModification: new Date().toISOString(),
        progression: calculateProgression(),
        personnesCharge: JSON.stringify(formData.personnesCharge) // Convertir l'array en string
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await googleSheetsService.saveClientData(googleUser.email, dataToSave as any);
      // Ne pas mettre à jour formData avec la version stringifiée
      setFormData(prev => ({
        ...prev,
        dateModification: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde automatique:', error);
      setError('Erreur lors de la sauvegarde automatique');
    } finally {
      setSaving(false);
    }
  }, [formData, googleUser, googleSheetsService, calculateProgression]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (googleUser && currentStep > 0) {
      const interval = setInterval(autoSave, 30000);
      return () => clearInterval(interval);
    }
  }, [autoSave, googleUser, currentStep]);

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    setLoading(true);
    try {
      // Simuler récupération des données Google avec credentialResponse
      const mockGoogleUser = {
        email: 'client.exemple@gmail.com',
        name: 'Client Exemple',
        given_name: 'Client',
        family_name: 'Exemple',
        credential: credentialResponse.credential
      };
      setGoogleUser(mockGoogleUser);

      // Charger les données sauvegardées si elles existent
      const savedData = await googleSheetsService.loadClientData(mockGoogleUser.email);
      if (savedData) {
        // Convertir les données chargées en FormData
        const convertedData: FormData = {
          ...savedData,
          personnesCharge: savedData.personnesCharge ? JSON.parse(savedData.personnesCharge as string) : [],
          pieceIdentite: null, // Les fichiers ne peuvent pas être restaurés depuis le stockage
          pieceIdentiteUrl: savedData.pieceIdentiteUrl as string || ''
        } as FormData;
        setFormData(convertedData);
      } else {
        setFormData(prev => ({
          ...prev,
          email: mockGoogleUser.email,
          prenom: mockGoogleUser.given_name,
          nom: mockGoogleUser.family_name
        }));
      }

      setCurrentStep(1);
    } catch {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      dateModification: new Date().toISOString()
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation du fichier
      if (file.size > 10 * 1024 * 1024) { // 10MB max
        setError('Le fichier ne doit pas dépasser 10MB');
        return;
      }

      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setError('Format de fichier non supporté. Utilisez JPG, PNG ou PDF');
        return;
      }

      setFormData(prev => ({
        ...prev,
        pieceIdentite: file,
        dateModification: new Date().toISOString()
      }));
      setError('');
    }
  };

  const addPersonneCharge = () => {
    setFormData(prev => ({
      ...prev,
      personnesCharge: [...prev.personnesCharge, {
        nom: '',
        prenom: '',
        dateNaissance: '',
        lienParente: ''
      }]
    }));
  };

  const updatePersonneCharge = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personnesCharge: prev.personnesCharge.map((personne, i) =>
        i === index ? { ...personne, [field]: value } : personne
      )
    }));
  };

  const removePersonneCharge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      personnesCharge: prev.personnesCharge.filter((_, i) => i !== index)
    }));
  };

  const validateCurrentStep = () => {
    setError('');

    // Regex patterns for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;

    switch (currentStep) {
      case 1: {
        // Contact
        if (!formData.prenom || !formData.nom || !formData.telephone || !formData.genre ||
            !formData.dateNaissance || !formData.adresse || !formData.codePostal) {
          setError('Veuillez remplir tous les champs obligatoires');
          return false;
        }
        // Validation email
        if (!emailRegex.test(formData.email)) {
          setError('Adresse email invalide');
          return false;
        }
        // Validation téléphone
        if (!phoneRegex.test(formData.telephone.replace(/[\s\-()]/g, ''))) {
          setError('Numéro de téléphone invalide');
          return false;
        }
        break;
      }

      case 2: {
        // État civil
        if (!formData.etatCivil) {
          setError('Veuillez sélectionner votre état civil');
          return false;
        }
        if ((formData.etatCivil === 'Marié' || formData.etatCivil === 'Conjoint de fait') &&
            (!formData.conjointNom || !formData.conjointPrenom || !formData.conjointDateNaissance)) {
          setError('Veuillez remplir les informations du conjoint');
          return false;
        }
        break;
      }

      case 6: {
        // Documents
        if (!formData.pieceIdentite) {
          setError('Veuillez télécharger une pièce d\'identité');
          return false;
        }
        break;
      }

      case 7: {
        // Consentement
        if (!formData.consentementNotaire) {
          setError('Vous devez accepter le consentement pour continuer');
          return false;
        }
        break;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      await autoSave();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    if (!googleUser) {
      setError('Erreur: Utilisateur non connecté');
      return;
    }

    setLoading(true);
    try {
      const finalData = {
        ...formData,
        brouillon: false,
        dateModification: new Date().toISOString(),
        progression: 100,
        consentementNotaire: true,
        dateConsentement: new Date().toISOString(),
        ipConsentement: '192.168.1.1', // En production, récupérer l'IP réelle
        personnesCharge: JSON.stringify(formData.personnesCharge) // Convertir l'array en string
      };

      // Sauvegarder dans Google Sheets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await googleSheetsService.saveClientData(googleUser.email, finalData as any);

      // Créer l'espace client
      const clientData: ClientData = {
        id: Date.now().toString(),
        googleAccount: googleUser,
        nom: finalData.nom,
        prenom: finalData.prenom,
        email: finalData.email,
        telephone: finalData.telephone,
        consentementNotaire: finalData.consentementNotaire,
        dateConsentement: finalData.dateConsentement,
        ipConsentement: finalData.ipConsentement,
        status: 'actif',
        dateFinExercice: new Date().getFullYear() + '-12-31',
        documentsCount: 1, // Pièce d'identité
        signaturesEnAttente: 0
      };

      onRegistrationSuccess(clientData);
    } catch {
      setError('Erreur lors de la création du dossier client');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isAccessible = index <= currentStep + 1;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => isAccessible && setCurrentStep(index)}
                disabled={!isAccessible}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : isAccessible
                        ? 'bg-gray-600 border-gray-400 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Icon className="w-6 h-6" />
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderProgressBar = () => {
    const progress = calculateProgression();
    return (
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Render different steps
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl mb-6">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Formulaire Client
              </h1>
              <p className="text-gray-300 text-lg">
                Création de dossier sécurisée avec sauvegarde automatique
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-xl mb-4">
                  <Mail className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Authentification Gmail obligatoire
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Connectez-vous avec votre compte Gmail pour accéder au formulaire dynamique.
                  Toutes vos données seront sauvegardées automatiquement dans Google Cloud.
                </p>
              </div>

              {error && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Échec de la connexion Google')}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                />
              </div>

              {loading && (
                <div className="text-center py-4">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Connexion à Gmail...</p>
                </div>
              )}

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="max-w-4xl w-full">
          {/* Header with progress */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {steps[currentStep]?.title}
            </h1>
            <p className="text-gray-300">
              Étape {currentStep} sur {steps.length - 1}
            </p>
            {renderProgressBar()}
          </div>

          {renderStepIndicator()}

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Auto-save indicator */}
            {saving && (
              <div className="flex items-center justify-center mb-4 p-2 bg-blue-500/20 rounded-lg">
                <Save className="w-4 h-4 text-blue-400 mr-2 animate-spin" />
                <span className="text-blue-300 text-sm">Sauvegarde automatique...</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Step content will be rendered here based on currentStep */}
            <div className="min-h-[400px]">
              {currentStep === 1 && renderContactStep()}
              {currentStep === 2 && renderCivilStatusStep()}
              {currentStep === 3 && renderConjointStep()}
              {currentStep === 4 && renderImmigrationStep()}
              {currentStep === 5 && renderChargesStep()}
              {currentStep === 6 && renderDocumentsStep()}
              {currentStep === 7 && renderConsentementStep()}
              {currentStep === 8 && renderConfirmationStep()}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Précédent
              </button>

              <div className="flex space-x-3">
                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
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
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Suivant
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions to render each step
  function renderContactStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Informations de contact</h2>
          <p className="text-gray-300">Renseignez vos informations personnelles de base</p>
        </div>

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
              Genre *
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="Masculin">Masculin</option>
              <option value="Féminin">Féminin</option>
            </select>
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
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse de résidence actuelle *
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
        </div>
      </div>
    );
  }

  function renderCivilStatusStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">État civil</h2>
          <p className="text-gray-300">Renseignez votre situation familiale</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            État civil *
          </label>
          <select
            name="etatCivil"
            value={formData.etatCivil}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Sélectionnez votre état civil</option>
            <option value="Célibataire">Célibataire</option>
            <option value="Marié">Marié</option>
            <option value="Conjoint de fait">Conjoint de fait</option>
            <option value="Séparé/Divorcé">Séparé/Divorcé</option>
            <option value="Veuf">Veuf</option>
          </select>
        </div>

        {(formData.etatCivil === 'Marié' || formData.etatCivil === 'Conjoint de fait') && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Informations sur le changement d'état civil</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date du changement d'état civil
              </label>
              <input
                type="date"
                name="dateChangementEtatCivil"
                value={formData.dateChangementEtatCivil}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        )}

        <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-300 font-medium">À propos de l'état civil</p>
              <p className="text-blue-200 text-sm mt-1">
                Cette information est importante pour déterminer vos obligations fiscales et vos droits aux prestations gouvernementales.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderConjointStep() {
    if (formData.etatCivil !== 'Marié' && formData.etatCivil !== 'Conjoint de fait') {
      return (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">Section non applicable</h3>
          <p className="text-gray-500">Cette section n'est nécessaire que si vous êtes marié ou en union de fait.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Informations du conjoint</h2>
          <p className="text-gray-300">Renseignez les informations de votre conjoint</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prénom du conjoint *
            </label>
            <input
              type="text"
              name="conjointPrenom"
              value={formData.conjointPrenom}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Prénom du conjoint"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du conjoint *
            </label>
            <input
              type="text"
              name="conjointNom"
              value={formData.conjointNom}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Nom du conjoint"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date de naissance du conjoint *
            </label>
            <input
              type="date"
              name="conjointDateNaissance"
              value={formData.conjointDateNaissance}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email du conjoint
            </label>
            <input
              type="email"
              name="conjointEmail"
              value={formData.conjointEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Téléphone du conjoint
            </label>
            <input
              type="tel"
              name="conjointTelephone"
              value={formData.conjointTelephone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="(514) 555-1234"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conjointNonResident"
              name="conjointNonResident"
              checked={formData.conjointNonResident}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="conjointNonResident" className="ml-2 text-sm text-gray-300">
              Le conjoint est-il non-résident ou nouveau-arrivant ?
            </label>
          </div>

          {formData.conjointNonResident && (
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-300 font-medium">Information importante</p>
                  <p className="text-yellow-200 text-sm mt-1">
                    Le formulaire RC151 devra être complété pour votre conjoint non-résident.
                    Groupe Servitax Solutions peut vous aider dans cette démarche.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderImmigrationStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Situation d'immigration</h2>
          <p className="text-gray-300">Informations sur votre arrivée au Canada</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Êtes-vous un nouveau arrivant au Canada ?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="nouveauArrivant"
                  checked={formData.nouveauArrivant === true}
                  onChange={() => setFormData(prev => ({ ...prev, nouveauArrivant: true }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="nouveauArrivant"
                  checked={formData.nouveauArrivant === false}
                  onChange={() => setFormData(prev => ({ ...prev, nouveauArrivant: false }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Non</span>
              </label>
            </div>
          </div>

          {formData.nouveauArrivant && (
            <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30 space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">Bienvenue au Canada !</h3>
                <p className="text-green-200 text-sm">
                  Félicitations pour votre arrivée au Canada. Vous êtes maintenant considéré comme résident fiscal canadien.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Date d'entrée au Canada *
                </label>
                <input
                  type="date"
                  name="dateEntreeCanada"
                  value={formData.dateEntreeCanada}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Revenu gagné hors du Canada (Déclarant) - 1er janvier jusqu'à la date d'arrivée
                </label>
                <input
                  type="text"
                  name="revenuHorsCanadaDeclarant"
                  value={formData.revenuHorsCanadaDeclarant}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="0.00 $"
                />
              </div>

              {(formData.etatCivil === 'Marié' || formData.etatCivil === 'Conjoint de fait') && (
                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Revenu gagné hors du Canada (Conjoint) - 1er janvier jusqu'à la date d'arrivée
                  </label>
                  <input
                    type="text"
                    name="revenuHorsCanadaConjoint"
                    value={formData.revenuHorsCanadaConjoint}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="0.00 $"
                  />
                </div>
              )}

              <div className="bg-green-500/10 rounded-lg p-4">
                <h4 className="text-green-300 font-medium mb-2">Documents à compléter pour les prestations :</h4>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• RC66F (Fédéral)</li>
                  <li>• RC66 SCH F (Fédéral)</li>
                  <li>• RC151 (si conjoint non-résident)</li>
                  <li>• CTB9 (Québec)</li>
                  <li>• T1-DD(1) (Fédéral)</li>
                  <li>• LPF-800 (Québec)</li>
                  <li>• LPF-812 (Québec)</li>
                </ul>
                <p className="text-green-200 text-sm mt-2">
                  Groupe Servitax Solutions peut vous aider à compléter ces formulaires.
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Avez-vous quitté le Canada au cours de l'année ?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="departCanada"
                  checked={formData.departCanada === true}
                  onChange={() => setFormData(prev => ({ ...prev, departCanada: true }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="departCanada"
                  checked={formData.departCanada === false}
                  onChange={() => setFormData(prev => ({ ...prev, departCanada: false }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Non</span>
              </label>
            </div>
          </div>

          {formData.departCanada && (
            <div className="bg-red-500/20 rounded-xl p-6 border border-red-500/30 space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-300 mb-2">
                  Date de votre départ du Canada *
                </label>
                <input
                  type="date"
                  name="dateDepartCanada"
                  value={formData.dateDepartCanada}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-red-500/30 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-300 mb-2">
                  Quelles année(s) sont concernée(s) par votre déclaration ?
                </label>
                <input
                  type="text"
                  name="anneesConcernees"
                  value={formData.anneesConcernees}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-red-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ex: 2020, 2021, 2022"
                />
              </div>

              <div className="bg-red-500/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 font-medium">Obligations fiscales importantes</p>
                    <p className="text-red-200 text-sm mt-1">
                      Si vous maintenez un bien immobilier au Canada, vous pourriez avoir des obligations fiscales continues.
                      Contactez-nous pour évaluer votre situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderChargesStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Home className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Personnes à charge</h2>
          <p className="text-gray-300">Informations sur les personnes à votre charge</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Avez-vous des personnes à charge ?
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="aPersonnesCharge"
                checked={formData.aPersonnesCharge === true}
                onChange={() => setFormData(prev => ({ ...prev, aPersonnesCharge: true }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-300">Oui</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="aPersonnesCharge"
                checked={formData.aPersonnesCharge === false}
                onChange={() => setFormData(prev => ({ ...prev, aPersonnesCharge: false, personnesCharge: [] }))}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-300">Non</span>
            </label>
          </div>
        </div>

        {formData.aPersonnesCharge && (
          <div className="space-y-4">
            {formData.personnesCharge.map((personne, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-medium">Personne à charge #{index + 1}</h4>
                  <button
                    onClick={() => removePersonneCharge(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={personne.prenom}
                      onChange={(e) => updatePersonneCharge(index, 'prenom', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={personne.nom}
                      onChange={(e) => updatePersonneCharge(index, 'nom', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      value={personne.dateNaissance}
                      onChange={(e) => updatePersonneCharge(index, 'dateNaissance', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Lien de parenté
                    </label>
                    <select
                      value={personne.lienParente}
                      onChange={(e) => updatePersonneCharge(index, 'lienParente', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Enfant">Enfant</option>
                      <option value="Parent">Parent</option>
                      <option value="Frère/Soeur">Frère/Soeur</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addPersonneCharge}
              className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-300 hover:text-blue-200 transition-all duration-300 flex items-center justify-center"
            >
              <User className="w-5 h-5 mr-2" />
              Ajouter une personne à charge
            </button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Avez-vous résidé seul(e) au cours de l'année ?
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="residenceSeul"
                checked={formData.residenceSeul}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-300">Oui, j'ai résidé seul(e)</span>
            </label>
          </div>

          {formData.residenceSeul && (
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30 mt-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-300 font-medium">Crédit d'impôt pour personne vivant seule</p>
                  <p className="text-blue-200 text-sm mt-1">
                    Au Québec, vous pourriez être admissible au crédit d'impôt pour personne vivant seule si vous avez résidé seul pendant au moins 6 mois au cours de l'année.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderDocumentsStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Documents requis</h2>
          <p className="text-gray-300">Téléchargez votre pièce d'identité</p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="text-center mb-6">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Pièce d'identité *</h3>
            <p className="text-gray-300 text-sm">
              Téléchargez une copie de votre permis de conduire, passeport ou carte d'identité.
              Formats acceptés : PDF, JPG, PNG (max 10MB)
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="pieceIdentite"
            />
            <label
              htmlFor="pieceIdentite"
              className="block w-full py-4 px-6 bg-blue-600/20 hover:bg-blue-600/30 border-2 border-dashed border-blue-500/30 hover:border-blue-500/50 rounded-xl text-center cursor-pointer transition-all duration-300"
            >
              <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <span className="text-blue-300 font-medium">
                {formData.pieceIdentite ? formData.pieceIdentite.name : 'Cliquez pour sélectionner un fichier'}
              </span>
              <p className="text-blue-200 text-sm mt-1">
                {formData.pieceIdentite ? `${(formData.pieceIdentite.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, JPG, PNG jusqu\'à 10MB'}
              </p>
            </label>

            {formData.pieceIdentite && (
              <div className="flex items-center justify-between bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-300 text-sm">{formData.pieceIdentite.name}</span>
                </div>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, pieceIdentite: null }))}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-300 font-medium">Sécurité et confidentialité</p>
              <p className="text-yellow-200 text-sm mt-1">
                Votre pièce d'identité sera stockée de manière sécurisée dans Google Cloud avec chiffrement de bout en bout.
                Elle ne sera accessible qu'aux membres autorisés de Groupe Servitax Solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderConsentementStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <FileCheck className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Consentement notarial</h2>
          <p className="text-gray-300">Autorisation pour l'utilisation de vos données</p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Consentement pour l'utilisation des données par le notaire</h3>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              Je consens à ce que Groupe Servitax Solutions partage mes informations personnelles et fiscales
              avec le notaire désigné pour les besoins de mes déclarations fiscales et de mes obligations légales.
              Je comprends que ces informations sont nécessaires pour :
            </p>

            <ul className="text-gray-300 text-sm mt-3 space-y-1 list-disc list-inside">
              <li>La préparation et la validation de mes déclarations fiscales</li>
              <li>La gestion de mes obligations légales et réglementaires</li>
              <li>La communication avec les autorités fiscales compétentes</li>
              <li>L'établissement de documents officiels si nécessaire</li>
            </ul>

            <p className="text-gray-300 text-sm mt-3">
              Je comprends également que mes données seront traitées conformément aux lois sur la protection des données
              (RGPD, Loi sur la protection des renseignements personnels) et ne seront utilisées que dans le cadre
              de mes besoins fiscaux et comptables.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consentementNotaire"
              name="consentementNotaire"
              checked={formData.consentementNotaire}
              onChange={handleInputChange}
              className="w-5 h-5 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="consentementNotaire" className="text-gray-300 text-sm leading-relaxed">
              <span className="font-medium">J'accepte *</span> - Je donne mon consentement explicite pour l'utilisation
              de mes données personnelles par le notaire dans le cadre de mes services fiscaux et comptables.
            </label>
          </div>
        </div>

        <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-300 font-medium">À propos du consentement</p>
              <p className="text-blue-200 text-sm mt-1">
                Ce consentement est obligatoire pour pouvoir traiter votre dossier. Il peut être retiré à tout moment
                en nous contactant. La date et l'heure de votre consentement seront enregistrées pour des raisons de non-répudiation.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderConfirmationStep() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Confirmation</h2>
          <p className="text-gray-300">Vérifiez vos informations avant soumission</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Informations personnelles</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Nom complet:</span>
                <span className="text-white">{formData.prenom} {formData.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Téléphone:</span>
                <span className="text-white">{formData.telephone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Genre:</span>
                <span className="text-white">{formData.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date de naissance:</span>
                <span className="text-white">{formData.dateNaissance ? new Date(formData.dateNaissance).toLocaleDateString('fr-CA') : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Adresse:</span>
                <span className="text-white">{formData.adresse}, {formData.codePostal}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Situation familiale</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">État civil:</span>
                <span className="text-white">{formData.etatCivil}</span>
              </div>
              {formData.etatCivil === 'Marié' || formData.etatCivil === 'Conjoint de fait' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conjoint:</span>
                    <span className="text-white">{formData.conjointPrenom} {formData.conjointNom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date mariage:</span>
                    <span className="text-white">{formData.dateChangementEtatCivil ? new Date(formData.dateChangementEtatCivil).toLocaleDateString('fr-CA') : ''}</span>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between">
                <span className="text-gray-400">Personnes à charge:</span>
                <span className="text-white">{formData.aPersonnesCharge ? formData.personnesCharge.length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Résidence seul:</span>
                <span className="text-white">{formData.residenceSeul ? 'Oui' : 'Non'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Situation immigration</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Nouveau arrivant:</span>
                <span className="text-white">{formData.nouveauArrivant ? 'Oui' : 'Non'}</span>
              </div>
              {formData.nouveauArrivant && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Date arrivée:</span>
                  <span className="text-white">{formData.dateEntreeCanada ? new Date(formData.dateEntreeCanada).toLocaleDateString('fr-CA') : ''}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Départ Canada:</span>
                <span className="text-white">{formData.departCanada ? 'Oui' : 'Non'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Documents et consentement</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Pièce d'identité:</span>
                <span className="text-white">{formData.pieceIdentite ? 'Téléchargée' : 'Manquante'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Consentement:</span>
                <span className="text-white">{formData.consentementNotaire ? 'Accepté' : 'Non accepté'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Progression:</span>
                <span className="text-white">{calculateProgression()}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-300 mb-2">Prêt pour la soumission !</h3>
            <p className="text-green-200 text-sm">
              Toutes vos informations ont été vérifiées. Cliquez sur "Créer mon dossier" pour finaliser
              la création de votre espace client sécurisé.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
