import { useState } from 'react';
import { FileText, Users, LogIn, ArrowRight, Menu, X, Star, Shield, Phone, Mail, MapPin, Home, Briefcase, Building2, TrendingUp, Award, CheckCircle, DollarSign, Target } from 'lucide-react';
import AIChatbot from './AIChatbot';
import { StaggeredAnimation, ScrollReveal, PulsingButton } from './Animations';
import { SEOHead } from './SEO';
import { StructuredData, organizationSchema } from '../utils/seoUtils';

type FranchisePageType = 'home' | 'opportunities' | 'benefits' | 'process' | 'contact';

export default function FranchisePage({ onBackToWebsite }: { onBackToWebsite?: () => void }) {
    // Navigation items
    const navigationItems = [
      { id: 'home', label: 'Accueil', icon: Home },
      { id: 'opportunities', label: 'Opportunités', icon: Target },
      { id: 'benefits', label: 'Avantages', icon: Award },
      { id: 'process', label: 'Processus', icon: Briefcase },
      { id: 'contact', label: 'Contact', icon: Phone },
    ];

    // Franchise benefits array
    const franchiseBenefits = [
      {
        title: "Modèle Prouvé",
        description: "Notre système éprouvé depuis 10 ans garantit votre succès avec un taux de réussite de 95%.",
        icon: Award,
        stats: "95%",
        statsLabel: "Taux de Réussite"
      },
      {
        title: "Support Complet",
        description: "Formation initiale de 8 semaines, support technique 24/7 et accompagnement marketing continu.",
        icon: Users,
        stats: "24/7",
        statsLabel: "Support Disponible"
      },
      {
        title: "ROI Rapide",
        description: "Récupération de votre investissement en moyenne 18 mois grâce à notre modèle optimisé.",
        icon: TrendingUp,
        stats: "18",
        statsLabel: "Mois ROI Moyen"
      },
      {
        title: "Marque Forte",
        description: "Bénéficiez d'une marque reconnue avec plus de 500 clients satisfaits et une réputation d'excellence.",
        icon: Star,
        stats: "500+",
        statsLabel: "Clients Satisfaits"
      }
    ];

    // Franchise opportunities array
    const opportunities = [
      {
        title: "Franchise Standard",
        investment: "150,000 - 250,000 $",
        territory: "Zone exclusive de 50km",
        roi: "18-24 mois",
        features: [
          "Formation complète incluse",
          "Support marketing local",
          "Logiciels et outils fournis",
          "Accompagnement personnalisé"
        ],
        color: "from-[#f5af19] to-[#2c5364]"
      },
      {
        title: "Franchise Premium",
        investment: "300,000 - 500,000 $",
        territory: "Zone exclusive de 100km",
        roi: "12-18 mois",
        features: [
          "Formation avancée + management",
          "Équipe dédiée de 3 personnes",
          "Marketing digital inclus",
          "Support stratégique"
        ],
        color: "from-[#2c5364] to-[#0f2027]"
      },
      {
        title: "Master Franchise",
        investment: "750,000 - 1,500,000 $",
        territory: "Province entière",
        roi: "24-36 mois",
        features: [
          "Droits exclusifs régionaux",
          "Sous-franchises incluses",
          "Royalties sur le réseau",
          "Support développement"
        ],
        color: "from-[#0f2027] to-[#f5af19]"
      }
    ];

    // Process steps array
    const processSteps = [
      {
        step: "01",
        title: "Candidature",
        description: "Soumettez votre dossier de candidature avec votre parcours professionnel et motivations.",
        icon: FileText,
        details: [
          "Questionnaire détaillé",
          "Analyse de votre profil",
          "Entretien préliminaire",
          "Validation des critères"
        ]
      },
      {
        step: "02",
        title: "Évaluation",
        description: "Notre équipe analyse votre potentiel et définit le modèle de franchise adapté.",
        icon: Target,
        details: [
          "Étude de marché locale",
          "Analyse financière",
          "Définition du territoire",
          "Proposition personnalisée"
        ]
      },
      {
        step: "03",
        title: "Formation",
        description: "Formation intensive de 8 semaines pour maîtriser tous les aspects de votre franchise.",
        icon: Users,
        details: [
          "Formation comptable avancée",
          "Gestion d'équipe et management",
          "Marketing et développement",
          "Outils et technologies"
        ]
      },
      {
        step: "04",
        title: "Lancement",
        description: "Accompagnement complet pour le lancement et le développement de votre franchise.",
        icon: TrendingUp,
        details: [
          "Support d'ouverture",
          "Marketing de lancement",
          "Suivi des premiers mois",
          "Optimisation continue"
        ]
      }
    ];

    // State variables
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);

    // Page change handler with smooth scrolling
    const handlePageChange = (page: FranchisePageType) => {
      trackEvent('page_change', { page });

      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Smooth scroll to section
      const sectionId = page === 'home' ? 'hero' : page;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Client login handler
    const handleClientLogin = () => {
      setShowLoginModal(true);
      trackEvent('client_login_click');
    };

    // Track event function
    const trackEvent = (event: string, data?: Record<string, unknown>) => {
      console.log('Event tracked:', event, data);
    };

    return (
      <div>
        <SEOHead
          title="Franchise Servitax - Rejoignez Notre Réseau de Succès"
          description="Devenez franchisé Servitax et bénéficiez d'un modèle éprouvé, d'un support complet et d'un ROI rapide. Plus de 500 clients satisfaits."
          keywords={["franchise", "comptabilité", "Canada", "franchisé", "business opportunity", "investissement", "ROI"]}
          aiKeywords={["franchise comptable", "opportunité d'affaires", "réseau de franchises", "investissement rentable"]}
          aiDescription="Plateforme de franchise comptable de nouvelle génération avec modèle éprouvé et support complet pour votre succès entrepreneurial."
          structuredData={organizationSchema}
        />
        <StructuredData data={organizationSchema} />

        {/* Main content */}
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#f5af19] relative overflow-hidden font-[Playfair_Display]">
          {/* Navigation Bar */}
          <nav className="fixed top-0 left-0 w-full z-40 bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f5af19] via-[#2c5364] to-[#0f2027] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#f5af19]/25">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#f5af19] to-[#2c5364] rounded-full animate-ping"></div>
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-black bg-gradient-to-r from-[#f5af19] via-[#2c5364] to-[#0f2027] bg-clip-text text-transparent tracking-wide">Servitax</h1>
                    <p className="text-xs text-[#f5af19]/70 font-medium">Franchise Excellence</p>
                  </div>
                </div>

                {/* Navigation Desktop */}
                <div className="hidden lg:block">
                  <div className="flex items-center space-x-2">
                    {navigationItems.slice(1, 5).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handlePageChange(item.id as FranchisePageType)}
                          className="group relative px-6 py-3 text-white/80 hover:text-[#f5af19] transition-all duration-300 rounded-xl overflow-hidden font-semibold tracking-wide"
                        >
                          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-[#f5af19] to-[#2c5364] group-hover:w-full transition-all duration-300 rounded-xl"></span>
                          <div className="relative flex items-center">
                            <Icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Premium Login Button */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onBackToWebsite}
                    className="group relative px-6 py-3 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded-2xl shadow-2xl shadow-gray-500/25 hover:shadow-gray-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden tracking-wide"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <ArrowRight className="h-5 w-5 mr-3 rotate-180" />
                      Retour au Site
                    </div>
                  </button>

                  {/* Mobile Menu */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-3 text-white/80 hover:text-[#f5af19] transition-colors duration-300 rounded-xl hover:bg-white/10"
                    >
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0f2027]/95 backdrop-blur-2xl border-b border-[#f5af19]/10 rounded-b-3xl shadow-2xl">
                  <div className="px-4 py-6 space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handlePageChange(item.id as FranchisePageType)}
                          className="w-full group relative px-6 py-4 text-white/80 hover:text-[#f5af19] transition-all duration-300 rounded-xl overflow-hidden text-left font-semibold tracking-wide"
                        >
                          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-[#f5af19] to-[#2c5364] group-hover:w-full transition-all duration-300 rounded-xl"></span>
                          <div className="relative flex items-center">
                            <Icon className="h-5 w-5 mr-4" />
                            {item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal direction="left" className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#f5af19]/20 to-[#2c5364]/20 backdrop-blur-sm border border-[#f5af19]/30 rounded-full text-[#f5af19] text-sm font-medium tracking-wide shadow-lg">
                      <div className="w-2 h-2 bg-[#f5af19] rounded-full mr-2 animate-pulse"></div>
                      Franchise Comptable Premium
                    </div>

                    <h1 className="text-7xl lg:text-8xl leading-tight tracking-tight font-[Playfair_Display]">
                      <span className="block text-white mb-2 drop-shadow-lg">Devenez</span>
                      <span className="block bg-gradient-to-r from-[#f5af19] via-[#2c5364] to-[#0f2027] bg-clip-text text-transparent animate-gradient drop-shadow-xl">
                        Franchisé Servitax
                      </span>
                      <span className="block text-white/90 text-5xl lg:text-6xl font-semibold mt-4 drop-shadow-lg">
                        Votre succès entrepreneurial
                      </span>
                    </h1>

                    <p className="text-2xl text-white/80 leading-relaxed max-w-xl font-[Inter] drop-shadow-lg">
                      Rejoignez le réseau de franchises comptables le plus performant du Canada.
                      Modèle éprouvé, support complet, ROI rapide garanti.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleClientLogin}
                      className="group relative px-10 py-5 bg-gradient-to-r from-[#f5af19] via-[#2c5364] to-[#0f2027] text-white font-bold rounded-2xl shadow-2xl shadow-[#f5af19]/25 hover:shadow-[#f5af19]/40 transition-all duration-500 transform hover:scale-105 overflow-hidden text-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <LogIn className="h-7 w-7 mr-3" />
                        Devenir Franchisé
                        <ArrowRight className="h-7 w-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </button>
                    <button
                      onClick={() => handlePageChange('opportunities')}
                      className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-xl tracking-wide"
                    >
                      <div className="relative flex items-center justify-center">
                        <Target className="h-7 w-7 mr-3" />
                        Voir les Opportunités
                      </div>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-4xl font-black text-[#f5af19] mb-1 drop-shadow-lg">500+</div>
                      <div className="text-white/60 text-lg font-semibold">Franchisés Actifs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-[#2c5364] mb-1 drop-shadow-lg">95%</div>
                      <div className="text-white/60 text-lg font-semibold">Taux de Réussite</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-[#0f2027] mb-1 drop-shadow-lg">18</div>
                      <div className="text-white/60 text-lg font-semibold">Mois ROI Moyen</div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.3} className="relative">
                  <div className="relative">
                    <div className="relative bg-[#2c5364]/60 backdrop-blur-2xl rounded-3xl p-10 border border-[#f5af19]/20 shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#f5af19] to-[#2c5364] rounded-xl flex items-center justify-center">
                            <Building2 className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-xl">Tableau de Bord Franchise</h3>
                            <p className="text-white/60 text-lg">Performance en Temps Réel</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-4 h-4 bg-[#f5af19] rounded-full animate-pulse"></div>
                          <div className="w-4 h-4 bg-[#2c5364] rounded-full animate-pulse delay-75"></div>
                          <div className="w-4 h-4 bg-[#0f2027] rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-[#f5af19]/20 to-[#2c5364]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#f5af19]/20">
                          <div className="flex items-center justify-between mb-2">
                            <DollarSign className="h-7 w-7 text-[#f5af19]" />
                            <span className="text-[#f5af19] text-lg font-medium">+25%</span>
                          </div>
                          <div className="text-3xl font-bold text-white">CA Moyen</div>
                          <div className="text-white/60 text-lg">450,000$ / an</div>
                        </div>
                        <div className="bg-gradient-to-br from-[#2c5364]/20 to-[#0f2027]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#2c5364]/20">
                          <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="h-7 w-7 text-[#2c5364]" />
                            <span className="text-[#f5af19] text-lg font-medium">ROI</span>
                          </div>
                          <div className="text-3xl font-bold text-white">18 mois</div>
                          <div className="text-white/60 text-lg">Récupération Investissement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950">
            <div className="max-w-7xl mx-auto relative z-10">
              <ScrollReveal direction="up" className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
                  <Award className="h-4 w-4 mr-2" />
                  Pourquoi Choisir Servitax
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                  Un modèle qui
                  <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    fait ses preuves
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Découvrez pourquoi plus de 500 franchisés ont choisi Servitax pour leur réussite entrepreneuriale.
                  Des avantages concrets qui font la différence.
                </p>
              </ScrollReveal>

              <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {franchiseBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <ScrollReveal
                      key={index}
                      direction="up"
                      delay={index * 0.1}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-emerald-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-emerald-500/25">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 transform group-hover:rotate-6 transition-transform duration-300">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping"></div>
                        </div>

                        <div className="text-center mb-4">
                          <div className="text-3xl font-black text-emerald-400 mb-1">{benefit.stats}</div>
                          <div className="text-white/60 text-sm font-medium">{benefit.statsLabel}</div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                          {benefit.description}
                        </p>

                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </StaggeredAnimation>
            </div>
          </section>

          {/* Opportunities Section */}
          <section id="opportunities" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
            <div className="max-w-7xl mx-auto relative z-10">
              <ScrollReveal direction="up" className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mb-6">
                  <Target className="h-4 w-4 mr-2 fill-current" />
                  Opportunités d'Investissement
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                  Choisissez votre
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                    niveau d'engagement
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Trois modèles de franchise adaptés à votre profil d'investisseur et à vos ambitions entrepreneuriales.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {opportunities.map((opportunity, index) => (
                  <ScrollReveal
                    key={index}
                    direction="up"
                    delay={index * 0.2}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-purple-500/25">
                      <div className="text-center mb-8">
                        <div className={`w-20 h-20 bg-gradient-to-br ${opportunity.color} rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                          <Building2 className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {opportunity.title}
                        </h3>
                        <div className="text-purple-400 font-semibold text-lg mb-1">{opportunity.investment}</div>
                        <div className="text-white/60 text-sm">ROI: {opportunity.roi}</div>
                      </div>

                      <div className="space-y-4 mb-8">
                        {opportunity.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-white/80 group-hover:text-white/90 transition-colors duration-300">
                            <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <div className="text-white/60 text-sm mb-2">Territoire exclusif</div>
                        <div className="text-purple-300 font-semibold">{opportunity.territory}</div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-indigo-950">
            <div className="max-w-7xl mx-auto relative z-10">
              <ScrollReveal direction="up" className="text-center mb-20">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-6">
                  <Users className="h-4 w-4 mr-2" />
                  Votre Parcours Vers le Succès
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                  Un accompagnement
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    étape par étape
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  De la candidature à l'ouverture de votre franchise, nous vous accompagnons à chaque étape
                  pour garantir votre succès.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <ScrollReveal
                      key={index}
                      direction={index % 2 === 0 ? "left" : "right"}
                      delay={index * 0.2}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-cyan-500/25">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 transform group-hover:rotate-6 transition-transform duration-300">
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-center mt-2">
                              <div className="text-2xl font-black text-cyan-400">{step.step}</div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                              {step.description}
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                              {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center text-white/80 group-hover:text-white/90 transition-colors duration-300">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></div>
                                  <span className="text-sm">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <ScrollReveal direction="up">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Prêt à rejoindre le
                  <span className="block text-cyan-300">réseau Servitax ?</span>
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Rejoignez plus de 500 franchisés qui ont choisi la réussite avec Servitax.
                  Votre franchise vous attend.
                </p>
                <StaggeredAnimation className="flex flex-col sm:flex-row gap-4 justify-center">
                  <PulsingButton
                    onClick={handleClientLogin}
                    className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold flex items-center mx-auto shadow-2xl"
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    Devenir Franchisé
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </PulsingButton>
                  <PulsingButton
                    onClick={() => handlePageChange('contact')}
                    variant="outline"
                    className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600"
                  >
                    Nous Contacter
                  </PulsingButton>
                </StaggeredAnimation>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative bg-gradient-to-b from-slate-950 to-black border-t border-white/10">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                        <FileText className="h-9 w-9 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1">Servitax Franchise</h3>
                      <p className="text-cyan-300/70 font-medium">Excellence Entrepreneuriale</p>
                    </div>
                  </div>

                  <p className="text-white/70 text-lg leading-relaxed max-w-md">
                    Rejoignez le réseau de franchises comptables le plus performant du Canada.
                    Modèle éprouvé, support complet, ROI rapide garanti.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white mb-6">Navigation</h4>
                  <ul className="space-y-4">
                    {[
                      { label: 'Accueil', action: () => handlePageChange('home') },
                      { label: 'Opportunités', action: () => handlePageChange('opportunities') },
                      { label: 'Avantages', action: () => handlePageChange('benefits') },
                      { label: 'Processus', action: () => handlePageChange('process') },
                      { label: 'Contact', action: () => handlePageChange('contact') }
                    ].map((item) => (
                      <li key={item.label}>
                        <button
                          onClick={item.action}
                          className="text-white/70 hover:text-cyan-300 transition-colors duration-300 text-left group"
                        >
                          <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white mb-6">Contact Franchise</h4>
                  <div className="space-y-4 text-white/70">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                        <Phone className="h-4 w-4 text-cyan-300" />
                      </div>
                      <span className="group-hover:text-cyan-300 transition-colors duration-300">
                        +1 (514) 123-4567
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                        <Mail className="h-4 w-4 text-purple-300" />
                      </div>
                      <span className="group-hover:text-purple-300 transition-colors duration-300">
                        franchise@servitax.ca
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                        <MapPin className="h-4 w-4 text-emerald-300" />
                      </div>
                      <span className="group-hover:text-emerald-300 transition-colors duration-300">
                        Montréal, QC
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-white/60 text-sm">
                  © 2025 Servitax Franchise. Tous droits réservés.
                  <span className="text-cyan-400/70 ml-2">✨ Propulsé par l'IA</span>
                </div>
              </div>
            </div>
          </footer>

          {/* Login Modal */}
          {showLoginModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="relative bg-black/80 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                          <LogIn className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Connexion Franchisé</h3>
                        <p className="text-white/60 text-sm">Accès à votre espace dédié</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); trackEvent('login_attempt', { source: 'login_modal' }); }}>
                    <div>
                      <label className="block text-white/80 font-semibold mb-3 text-sm">
                        Email Professionnel
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="votre.email@entreprise.com"
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                          required
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 font-semibold mb-3 text-sm">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Votre mot de passe sécurisé"
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                          required
                        />
                        <Shield className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <LogIn className="h-5 w-5 mr-3" />
                        Se connecter à mon espace
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Chatbot */}
          {showChatbot && (
            <div className="fixed bottom-6 right-6 z-50">
              <AIChatbot />
            </div>
          )}

          {/* Chatbot Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-75 animate-ping"></div>
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center group"
              >
                <div className="relative">
                  <span className="text-2xl group-hover:animate-bounce">🤖</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
