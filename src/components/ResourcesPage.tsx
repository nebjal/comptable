import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, FileText, User, Shield, CheckCircle, Star, TrendingUp, Users, Award, Zap } from 'lucide-react';

interface ResourcesPageProps {
  onBack: () => void;
}

export default function ResourcesPage({ onBack }: ResourcesPageProps) {
  const [activeTab, setActiveTab] = useState<'vitrine' | 'connexion'>('vitrine');

  const ServiceCard = ({
    title,
    description,
    features,
    icon: Icon,
    gradient,
    delay = 0
  }: {
    title: string;
    description: string;
    features: string[];
    icon: any;
    gradient: string;
    delay?: number;
  }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${delay ? `animate-fade-in-up` : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <div className="p-8">
        <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-center">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const Section = ({
    id,
    title,
    children,
    icon: Icon,
    subtitle
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
    icon?: any;
    subtitle?: string;
  }) => (
    <section id={id} className="my-20">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4">
          {Icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <Icon className="h-6 w-6 text-white" />
            </div>
          )}
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation améliorée */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Plateforme ServiTax</div>
                  <div className="text-sm text-gray-500">Excellence fiscale à votre service</div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('vitrine')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'vitrine'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏠 Accueil
              </button>
              <button
                onClick={() => setActiveTab('connexion')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'connexion'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔐 Connexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'vitrine' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Services Fiscaux
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  d'Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Découvrez notre gamme complète de services fiscaux professionnels,
                conçus pour optimiser votre situation financière et vous accompagner
                dans toutes vos démarches fiscales.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700 font-medium">Expertise reconnue</span>
                </div>
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">Optimisation fiscale</span>
                </div>
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700 font-medium">Accompagnement personnalisé</span>
                </div>
              </div>
            </div>
          </section>

          <Section
            id="declarations-fiscales"
            title="Déclarations Fiscales"
            icon={FileText}
            subtitle="Préparation et dépôt professionnels de vos déclarations fiscales"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="T1 / TP-1 Particuliers"
                description="Déclaration de revenus personnelle complète avec optimisation de vos crédits et déductions."
                features={[
                  "Collecte et vérification des pièces justificatives",
                  "Maximisation des crédits d'impôt admissibles",
                  "Soumission électronique sécurisée",
                  "Suivi personnalisé du dossier"
                ]}
                icon={FileText}
                gradient="from-blue-500 to-blue-600"
                delay={100}
              />
              <ServiceCard
                title="T2 Sociétés"
                description="Déclaration d'entreprise complète pour sociétés avec optimisation fiscale avancée."
                features={[
                  "Analyse des états financiers",
                  "Calcul des provisions fiscales",
                  "Optimisation des crédits provinciaux",
                  "Préparation des annexes requises"
                ]}
                icon={Calculator}
                gradient="from-green-500 to-green-600"
                delay={200}
              />
              <ServiceCard
                title="T3 Fiducies"
                description="Gestion complète des déclarations de fiducie familiale et successorale."
                features={[
                  "Répartition des revenus aux bénéficiaires",
                  "Calcul des retenues fiscales",
                  "Conformité successorale",
                  "Rapports détaillés"
                ]}
                icon={Shield}
                gradient="from-purple-500 to-purple-600"
                delay={300}
              />
            </div>
          </Section>

          <Section
            id="taxes-consommation"
            title="Taxes à la Consommation"
            icon={Calculator}
            subtitle="Gestion experte de la TPS, TVQ et TVH pour votre entreprise"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Gestion TPS/TVQ/TVH"
                description="Service complet de gestion des taxes à la consommation pour tous types d'entreprises."
                features={[
                  "Inscription aux fichiers de taxes",
                  "Préparation des rapports périodiques",
                  "Optimisation des crédits de taxe",
                  "Conseils sur les régimes fiscaux"
                ]}
                icon={Calculator}
                gradient="from-indigo-500 to-indigo-600"
                delay={100}
              />
              <ServiceCard
                title="Remboursements"
                description="Assistance spécialisée pour vos demandes de remboursement et crédits fiscaux."
                features={[
                  "Évaluation de l'admissibilité",
                  "Préparation de la documentation",
                  "Suivi auprès des autorités",
                  "Optimisation des délais"
                ]}
                icon={TrendingUp}
                gradient="from-teal-500 to-teal-600"
                delay={200}
              />
              <ServiceCard
                title="Calculateurs Interactifs"
                description="Outils avancés pour estimer l'impact des taxes sur vos prix et marges."
                features={[
                  "Calculateurs en temps réel",
                  "Guides d'intégration TPS/TVQ",
                  "Optimisation des facturations",
                  "Support technique continu"
                ]}
                icon={Zap}
                gradient="from-orange-500 to-orange-600"
                delay={300}
              />
            </div>
          </Section>

          <Section
            id="planification-fiscale"
            title="Planification Fiscale"
            icon={Award}
            subtitle="Stratégies personnalisées pour optimiser votre situation fiscale"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ServiceCard
                title="Conseil Fiscal Personnalisé"
                description="Analyse approfondie de votre situation pour identifier les meilleures stratégies fiscales."
                features={[
                  "Évaluation complète de votre profil fiscal",
                  "Recommandations chiffrées et pragmatiques",
                  "Optimisation légale des revenus",
                  "Accompagnement dans la mise en œuvre"
                ]}
                icon={Users}
                gradient="from-pink-500 to-pink-600"
                delay={100}
              />
              <ServiceCard
                title="Optimisation Avancée"
                description="Mise en place de mécanismes sophistiqués d'optimisation fiscale conforme."
                features={[
                  "Structure de rémunération optimale",
                  "Utilisation stratégique des crédits fiscaux",
                  "Planification successorale intégrée",
                  "Suivi et ajustements réguliers"
                ]}
                icon={Award}
                gradient="from-cyan-500 to-cyan-600"
                delay={200}
              />
            </div>

            {/* Calendrier fiscal mis en avant */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">📅 Échéancier Fiscal 2024</h3>
                <p className="text-xl mb-6 opacity-90">
                  Restez informé des dates importantes et évitez les pénalités
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl font-bold mb-2">31 Mars</div>
                    <div className="opacity-90">Acomptes provisionnels T1</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl font-bold mb-2">30 Avril</div>
                    <div className="opacity-90">Date limite déclaration T1</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl font-bold mb-2">15 Juin</div>
                    <div className="opacity-90">Balance de TPS/TVQ</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* CTA Section */}
          <section className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Prêt à optimiser votre fiscalité ?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Contactez notre équipe d'experts pour une consultation personnalisée
                et découvrez comment nous pouvons vous aider à atteindre vos objectifs financiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
                  📞 Consultation Gratuite
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg">
                  📧 Demander un Devis
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'connexion' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section de Connexion */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Accès à votre
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Espace Sécurisé
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connectez-vous à votre plateforme ServiTax pour accéder à vos documents,
                suivre vos déclarations et communiquer avec votre équipe comptable.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">Connexion sécurisée SSL</span>
                </div>
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <User className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700 font-medium">Accès 24/7</span>
                </div>
                <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-gray-700 font-medium">Support intégré</span>
                </div>
              </div>
            </div>
          </section>

          {/* Formulaire de Connexion Principal */}
          <div className="max-w-md mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header avec dégradé */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Connexion Client</h2>
                  <p className="text-blue-100">Accédez à votre espace personnel</p>
                </div>
              </div>

              {/* Formulaire */}
              <div className="p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email ou numéro de client
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
                  >
                    � Se connecter
                  </button>
                </form>

                {/* Séparateur */}
                <div className="mt-8 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
                    </div>
                  </div>
                </div>

                {/* Connexion sociale */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fonctionnalités de l'Espace Client */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Découvrez votre <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Espace Client</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents Fiscaux</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Accédez à tous vos documents fiscaux : déclarations, avis de cotisation,
                  relevés et justificatifs en toute sécurité.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Téléchargement instantané
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Historique complet
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Partage sécurisé
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Suivi Déclarations</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Suivez en temps réel l'état de vos déclarations fiscales,
                  recevez des notifications et consultez l'historique complet.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Statut en temps réel
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Notifications push
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Rappels automatiques
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Messagerie Sécurisée</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Communiquez directement avec votre équipe comptable dédiée
                  via notre système de messagerie intégré et sécurisé.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Réponses sous 24h
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Chiffrement end-to-end
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Historique conservé
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section d'Aide */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Besoin d'aide pour vous connecter ?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Notre équipe est là pour vous accompagner dans votre première connexion
                et vous guider dans l'utilisation de votre espace client.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
                  📞 Contacter le Support
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg">
                  📧 Guide d'utilisation
                </button>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

