import { useState } from 'react';
import { ArrowLeft, FileText, Users, Building, Home, Briefcase, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

interface TaxQuestionnairesPageProps {
  onBack: () => void;
}

export default function TaxQuestionnairesPage({ onBack }: TaxQuestionnairesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const questionnaireCategories = [
    {
      id: 'nouveau-client',
      title: 'Questionnaire: Nouveaux clients',
      description: 'Questionnaire pour les nouveaux clients souhaitant nos services',
      icon: Users,
      color: 'blue',
      questionnaires: [
        {
          title: 'Informations Personnelles',
          description: 'Renseignements de base pour l\'ouverture de dossier',
          estimatedTime: '10 min',
          fields: ['Nom complet', 'Adresse', 'Numéro d\'assurance sociale', 'Situation familiale']
        }
      ]
    },
    {
      id: 'client-existant',
      title: 'Questionnaire: Clients existants',
      description: 'Questionnaire pour nos clients actuels',
      icon: Users,
      color: 'green',
      questionnaires: [
        {
          title: 'Mise à jour annuelle',
          description: 'Mise à jour de vos informations fiscales annuelles',
          estimatedTime: '15 min',
          fields: ['Changements familiaux', 'Nouveaux revenus', 'Modifications fiscales']
        }
      ]
    },
    {
      id: 'frais-medicaux',
      title: 'Questionnaire: Frais médicaux',
      description: 'Déclaration des frais médicaux pour crédits d\'impôt',
      icon: AlertTriangle,
      color: 'red',
      questionnaires: [
        {
          title: 'Frais Médicaux 2023',
          description: 'Détail de tous vos frais médicaux de l\'année',
          estimatedTime: '20 min',
          fields: ['Consultations médicales', 'Médicaments', 'Hospitalisation', 'Équipements médicaux']
        }
      ]
    },
    {
      id: 'travailleurs-autonomes',
      title: 'Questionnaire: Travailleurs autonomes',
      description: 'Questionnaires spécialisés pour les travailleurs indépendants',
      icon: Briefcase,
      color: 'purple',
      questionnaires: [
        {
          title: 'Revenus d\'Entreprise',
          description: 'Déclaration de vos revenus d\'affaires',
          estimatedTime: '25 min',
          fields: ['Revenus bruts', 'Dépenses d\'exploitation', 'Amortissement', 'Revenus nets']
        }
      ]
    },
    {
      id: 'revenu-locatif',
      title: 'Questionnaire: Revenu locatif',
      description: 'Gestion des revenus immobiliers locatifs',
      icon: Home,
      color: 'orange',
      questionnaires: [
        {
          title: 'Propriétés Locatives',
          description: 'Informations sur vos propriétés en location',
          estimatedTime: '20 min',
          fields: ['Adresse des propriétés', 'Type de location', 'Revenus locatifs', 'Dépenses associées']
        }
      ]
    },
    {
      id: 'vente-residence-principale',
      title: 'Questionnaire: Vente résidence principale',
      description: 'Déclaration de la vente de votre résidence principale',
      icon: Home,
      color: 'indigo',
      questionnaires: [
        {
          title: 'Vente de Propriété',
          description: 'Détails de la vente de votre résidence principale',
          estimatedTime: '15 min',
          fields: ['Prix de vente', 'Prix d\'achat', 'Date d\'acquisition', 'Améliorations']
        }
      ]
    },
    {
      id: 'depenses-emploi-teletravail',
      title: 'Questionnaire: Dépenses d\'emploi & télétravail',
      description: 'Déclaration des dépenses liées à votre emploi et télétravail',
      icon: Briefcase,
      color: 'teal',
      questionnaires: [
        {
          title: 'Dépenses de Télétravail',
          description: 'Frais liés au télétravail et à votre emploi',
          estimatedTime: '15 min',
          fields: ['Équipement informatique', 'Internet', 'Électricité', 'Mobilier de bureau']
        }
      ]
    },
    {
      id: 'frais-demenagement',
      title: 'Questionnaire: Frais de déménagement',
      description: 'Déclaration des frais de déménagement pour crédits d\'impôt',
      icon: Home,
      color: 'cyan',
      questionnaires: [
        {
          title: 'Déménagement Fiscal',
          description: 'Frais de déménagement admissibles aux crédits d\'impôt',
          estimatedTime: '10 min',
          fields: ['Frais de transport', 'Nouveau logement', 'Distance', 'Date de déménagement']
        }
      ]
    },
    {
      id: 'calcul-gain-capital',
      title: 'Questionnaire :Calcul de gain en capital',
      description: 'Calcul des gains et pertes en capital',
      icon: TrendingUp,
      color: 'green',
      questionnaires: [
        {
          title: 'Gains en Capital',
          description: 'Calcul de vos gains et pertes en capital',
          estimatedTime: '20 min',
          fields: ['Prix de vente', 'Prix d\'achat', 'Frais de transaction', 'Améliorations']
        }
      ]
    },
    {
      id: 'transactions-titres-crypto',
      title: 'Questionnaire: Transactions des titres & cryptomonnaies',
      description: 'Déclaration des transactions boursières et cryptomonnaies',
      icon: TrendingUp,
      color: 'orange',
      questionnaires: [
        {
          title: 'Portefeuille d\'Investissement',
          description: 'Détail de vos transactions financières',
          estimatedTime: '25 min',
          fields: ['Actions', 'Obligations', 'Cryptomonnaies', 'Options']
        }
      ]
    },
    {
      id: 'entreprises-incorporees',
      title: 'Questionnaire pour les Entreprises Incorporées',
      description: 'Questionnaires spécialisés pour les sociétés incorporées',
      icon: Building,
      color: 'blue',
      questionnaires: [
        {
          title: 'Informations Corporatives',
          description: 'Renseignements sur votre société incorporée',
          estimatedTime: '30 min',
          fields: ['Numéro d\'entreprise', 'Actionnaires', 'Revenus corporatifs', 'Dividendes']
        }
      ]
    },
    {
      id: 'autres-questionnaires',
      title: 'Autres questionnaires adminstratifs',
      description: 'Questionnaires administratifs divers',
      icon: FileText,
      color: 'purple',
      questionnaires: [
        {
          title: 'Documents Administratifs',
          description: 'Documents et formulaires administratifs',
          estimatedTime: '15 min',
          fields: ['Documents requis', 'Formulaires', 'Justificatifs', 'Autres pièces']
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 hover:bg-blue-600 text-blue-600',
      red: 'bg-red-500 hover:bg-red-600 text-red-600',
      green: 'bg-green-500 hover:bg-green-600 text-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600 text-purple-600',
      orange: 'bg-orange-500 hover:bg-orange-600 text-orange-600',
      indigo: 'bg-indigo-500 hover:bg-indigo-600 text-indigo-600',
      teal: 'bg-teal-500 hover:bg-teal-600 text-teal-600',
      cyan: 'bg-cyan-500 hover:bg-cyan-600 text-cyan-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Questionnaires Fiscaux
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Questionnaires
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fiscaux Interactifs
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bénéficiez de tarifs préférentiels en remplissant nos questionnaires en ligne !
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Accélérez et simplifiez vos démarches fiscales en complétant nos questionnaires
            sécurisés en ligne. En nous fournissant directement les informations essentielles, vous gagnez un
            temps précieux et nous permettez d'accélérer le traitement de votre dossier. Cela peut également nous inciter à vous proposer une réduction sur vos
            honoraires. Plus vous êtes précis, plus vous économisez !
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Types de questionnaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Sécurisé</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Accès en ligne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5-30min</div>
              <div className="text-gray-600">Temps d'exécution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choisissez votre situation fiscale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sélectionnez le questionnaire qui correspond le mieux à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questionnaireCategories.map((category) => {
              const Icon = category.icon;
              const colorClasses = getColorClasses(category.color);

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses.split(' ')[0]} text-white mr-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  {selectedCategory === category.id && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                      {category.questionnaires.map((questionnaire, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{questionnaire.title}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {questionnaire.estimatedTime}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{questionnaire.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {questionnaire.fields.map((field, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {field}
                              </span>
                            ))}
                          </div>
                          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                            Commencer le questionnaire
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-gray-500">
                      {category.questionnaires.length} questionnaire{category.questionnaires.length > 1 ? 's' : ''}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${colorClasses}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(selectedCategory === category.id ? null : category.id);
                      }}
                    >
                      {selectedCategory === category.id ? 'Réduire' : 'Voir détails'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à économiser sur vos honoraires ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Grâce à nos questionnaires détaillés et guidés étape par étape, vous ne risquez
            plus de laisser passer une dépense, une déduction ou un crédit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold">
              Commencer maintenant
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
              Contacter un expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
