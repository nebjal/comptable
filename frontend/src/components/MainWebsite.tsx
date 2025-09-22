import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Users, 
  FileText, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Calculator,
  Building2,
  Zap,
  Award,
  Clock,
  Globe,
  Sparkles,
  ChevronRight,
  Play,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  BarChart3,
  Target,
  Briefcase,
  Heart,
  Lightbulb
} from 'lucide-react';
import { ScrollReveal, AnimatedCounter, FloatingElement, GradientText } from './Animations';
import AnimatedTestimonialSlider from './AnimatedTestimonialSlider';
import AnimatedFeatureSlider from './AnimatedFeatureSlider';
import MetricsDashboard from './MetricsDashboard';
import PhotoGallery from './PhotoGallery';

export default function MainWebsite() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Animation des particules flottantes
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Données pour les témoignages
  const testimonials = [
    {
      id: '1',
      name: 'Marie Dubois',
      company: 'Boulangerie Artisanale',
      role: 'Propriétaire',
      content: 'Grâce à Centre Pro des Impôts, j\'ai économisé plus de 15 000$ sur mes impôts cette année. Leur expertise en fiscalité canadienne est remarquable !',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      achievement: 'Économies de 15 000$ en impôts'
    },
    {
      id: '2',
      name: 'Jean-François Martin',
      company: 'TechNova Solutions',
      role: 'Directeur Général',
      content: 'La plateforme digitale a révolutionné notre gestion comptable. Tout est automatisé, sécurisé et conforme aux normes canadiennes. Un service exceptionnel !',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      achievement: 'Automatisation complète réussie'
    },
    {
      id: '3',
      name: 'Sophie Tremblay',
      company: 'Clinique Dentaire Moderne',
      role: 'Comptable',
      content: 'L\'accompagnement personnalisé et la signature électronique nous ont fait gagner un temps précieux. Leur support 24/7 est vraiment appréciable.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      achievement: 'Gain de temps de 40%'
    }
  ];

  // Données pour les fonctionnalités
  const features = [
    {
      id: 'signature',
      title: 'Signature Électronique Avancée',
      description: 'Signez vos documents en toute sécurité avec notre technologie Zoho Sign intégrée, conforme aux normes LCJTI.',
      icon: FileText,
      benefits: [
        'Conformité légale LCJTI garantie',
        'Signature en quelques clics',
        'Traçabilité complète des documents',
        'Archivage automatique sécurisé'
      ],
      stats: {
        value: '99.9%',
        label: 'Fiabilité'
      },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'automation',
      title: 'Automatisation Intelligente',
      description: 'Notre IA traite automatiquement vos documents comptables et optimise vos déclarations fiscales.',
      icon: Zap,
      benefits: [
        'Traitement automatique des factures',
        'Optimisation fiscale par IA',
        'Détection d\'erreurs en temps réel',
        'Suggestions d\'économies personnalisées'
      ],
      stats: {
        value: '75%',
        label: 'Temps économisé'
      },
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'security',
      title: 'Sécurité Maximale',
      description: 'Vos données sont protégées par un chiffrement de niveau bancaire et des sauvegardes automatiques.',
      icon: Shield,
      benefits: [
        'Chiffrement AES-256',
        'Sauvegarde automatique 24/7',
        'Conformité RGPD et Loi 25',
        'Accès sécurisé multi-facteurs'
      ],
      stats: {
        value: '100%',
        label: 'Sécurité'
      },
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  // Photos pour la galerie
  const galleryPhotos = [
    {
      id: '1',
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      alt: 'Équipe comptable moderne',
      title: 'Notre Équipe d\'Experts',
      description: 'Des professionnels certifiés CPA à votre service',
      category: 'team' as const,
      location: 'Montréal, QC'
    },
    {
      id: '2',
      src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      alt: 'Bureau moderne',
      title: 'Nos Bureaux Modernes',
      description: 'Un environnement de travail technologique et accueillant',
      category: 'office' as const,
      location: 'Saint-Laurent, QC'
    },
    {
      id: '3',
      src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      alt: 'Certification excellence',
      title: 'Certifications d\'Excellence',
      description: 'Reconnus pour notre expertise et notre innovation',
      category: 'achievements' as const
    }
  ];

  const services = [
    {
      icon: Calculator,
      title: 'Tenue de Livres Moderne',
      description: 'Comptabilité digitale complète avec IA',
      features: ['Automatisation des écritures', 'Rapports en temps réel', 'Conformité garantie'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Centre Pro des Impôts',
      description: 'Optimisation fiscale et déclarations',
      features: ['Déclarations T1/T2', 'Optimisation TPS/TVQ', 'Conseils personnalisés'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Gestion de la Paie',
      description: 'Solution complète de paie automatisée',
      features: ['Calculs automatiques', 'Conformité légale', 'Portail employés'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Signature Électronique',
      description: 'Documents signés en toute sécurité',
      features: ['Conformité LCJTI', 'Traçabilité complète', 'Archivage sécurisé'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Navigation moderne */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/25">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1726954665342-8809OIRJ09Q87W6TF19N/WM2.jpg?format=1500w"
                    alt="ServitTax Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Centre Pro des Impôts</h1>
                <p className="text-xs text-cyan-300/70">Excellence Comptable Canadienne</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Accueil', 'Services', 'À Propos', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => setCurrentSection(index)}
                  className={`relative px-4 py-2 text-white/80 hover:text-cyan-300 transition-all duration-300 font-medium ${
                    currentSection === index ? 'text-cyan-300' : ''
                  }`}
                >
                  {item}
                  {currentSection === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            <button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Commencer
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Section Hero ultra-moderne */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Formes géométriques animées en arrière-plan */}
        <div className="absolute inset-0">
          <FloatingElement delay={0} duration={8} className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl" />
          <FloatingElement delay={2} duration={10} className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
          <FloatingElement delay={4} duration={12} className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-xl" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Contenu principal */}
          <ScrollReveal direction="left" className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                Plateforme Comptable Nouvelle Génération
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white mb-2">Révolutionnez</span>
                <GradientText className="block text-6xl lg:text-7xl" animate>
                  votre comptabilité
                </GradientText>
                <span className="block text-white/90 text-4xl lg:text-5xl font-semibold mt-4">
                  avec l'IA canadienne
                </span>
              </h1>

              <p className="text-2xl text-white/80 leading-relaxed max-w-2xl">
                La première plateforme comptable intelligente du Canada. 
                <span className="text-cyan-300 font-semibold">Signature électronique</span>, 
                <span className="text-emerald-300 font-semibold"> automatisation IA</span> et 
                <span className="text-purple-300 font-semibold"> conformité LCJTI</span> intégrées.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-3" />
                  Accéder à mon Espace Client
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>

              <button className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="relative flex items-center justify-center">
                  <Play className="h-6 w-6 mr-3" />
                  Voir la Démonstration
                </div>
              </button>
            </div>

            {/* Statistiques impressionnantes */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">
                  <AnimatedCounter end={2500} suffix="+" />
                </div>
                <div className="text-white/60 font-semibold">Clients Satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <div className="text-white/60 font-semibold">Satisfaction Client</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-white/60 font-semibold">Support Disponible</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Aperçu de l'interface */}
          <ScrollReveal direction="right" delay={0.3} className="relative">
            <div className="relative">
              {/* Interface mockup avec animations */}
              <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Tableau de Bord Client</h3>
                      <p className="text-white/60">Performance en Temps Réel</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <Calculator className="h-6 w-6 text-cyan-400" />
                      <span className="text-emerald-400 text-sm font-medium">+24%</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter end={125} prefix="$" suffix="K" />
                    </div>
                    <div className="text-white/60">Économies Fiscales</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-6 w-6 text-purple-400" />
                      <span className="text-emerald-400 text-sm font-medium">100%</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter end={247} />
                    </div>
                    <div className="text-white/60">Documents Traités</div>
                  </div>
                </div>

                {/* Graphique animé */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Efficacité IA</span>
                      <span>94%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-2000" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Conformité LCJTI</span>
                      <span>100%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-2000 delay-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Satisfaction Client</span>
                      <span>98%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-2000 delay-1000" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments flottants décoratifs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </ScrollReveal>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Découvrir</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services avec slider animé */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Services Premium
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Solutions Comptables
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Nouvelle Génération
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos services innovants qui transforment la comptabilité traditionnelle 
              en une expérience moderne, automatisée et sécurisée.
            </p>
          </ScrollReveal>

          {/* Slider de fonctionnalités */}
          <AnimatedFeatureSlider features={features} />
        </div>
      </section>

      {/* Section Services Grid */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Nos Services
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                d'Excellence
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={index * 0.1}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-white/80 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Métriques avec dashboard */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Performance
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                en Chiffres
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Des résultats concrets qui témoignent de notre excellence et de la confiance de nos clients.
            </p>
          </ScrollReveal>

          <MetricsDashboard />
        </div>
      </section>

      {/* Section Témoignages avec slider */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Témoignages Clients
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Ce que disent
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                nos clients
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Découvrez les témoignages authentiques de nos clients qui ont transformé 
              leur gestion comptable avec nos solutions innovantes.
            </p>
          </ScrollReveal>

          <AnimatedTestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Section Galerie Photo */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-20">
            <PhotoGallery 
              photos={galleryPhotos}
              title="Rencontrez l'Équipe"
              subtitle="Découvrez les visages derrière votre succès comptable"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Pourquoi Choisir
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Centre Pro des Impôts
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation Constante',
                description: 'Nous intégrons les dernières technologies IA pour optimiser votre comptabilité.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Sécurité Maximale',
                description: 'Chiffrement de niveau bancaire et conformité aux normes canadiennes.',
                color: 'from-emerald-400 to-teal-500'
              },
              {
                icon: Target,
                title: 'Résultats Garantis',
                description: 'Économies fiscales moyennes de 25% pour nos clients.',
                color: 'from-blue-400 to-cyan-500'
              },
              {
                icon: Clock,
                title: 'Gain de Temps',
                description: 'Automatisation de 80% des tâches comptables répétitives.',
                color: 'from-purple-400 to-pink-500'
              },
              {
                icon: Users,
                title: 'Support Humain',
                description: 'Équipe d\'experts CPA disponible 24/7 pour vous accompagner.',
                color: 'from-indigo-400 to-purple-500'
              },
              {
                icon: Award,
                title: 'Excellence Reconnue',
                description: 'Certifiés CPA avec plus de 35 ans d\'expérience combinée.',
                color: 'from-pink-400 to-red-500'
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={index * 0.1}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Prêt à Commencer ?
              </div>

              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Transformez votre
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  comptabilité aujourd'hui
                </span>
              </h2>

              <p className="text-2xl text-white/80 leading-relaxed mb-12">
                Rejoignez plus de 2 500 entreprises qui ont choisi l'excellence comptable canadienne.
                <br />
                <span className="text-cyan-300 font-semibold">Consultation gratuite • Sans engagement</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 overflow-hidden text-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    <Calendar className="h-6 w-6 mr-3" />
                    Consultation Gratuite
                    <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </button>

                <button className="group relative px-12 py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-xl">
                  <div className="relative flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 mr-3" />
                    Parler à un Expert
                  </div>
                </button>
              </div>

              {/* Contact rapide */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Téléphone</div>
                    <div className="text-cyan-300">1 (514) 215-2020</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Courriel</div>
                    <div className="text-purple-300">info@servitax.ca</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Adresse</div>
                    <div className="text-emerald-300">Saint-Laurent, QC</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer moderne */}
      <footer className="relative bg-gradient-to-b from-black to-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo et description */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                    <Shield className="h-9 w-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">Centre Pro des Impôts</h3>
                  <p className="text-cyan-300/70 font-medium">Excellence Comptable Canadienne</p>
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                Votre partenaire de confiance pour tous vos besoins comptables et fiscaux au Canada. 
                Innovation, sécurité et expertise depuis plus de 15 ans.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center text-emerald-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Certifié CPA</span>
                </div>
                <div className="flex items-center text-cyan-400">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Conforme LCJTI</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Globe className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Canada-wide</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Services</h4>
              <ul className="space-y-3">
                {['Tenue de Livres', 'Déclarations Fiscales', 'Gestion de Paie', 'Signature Électronique', 'Consultation IA'].map((service) => (
                  <li key={service}>
                    <button className="text-white/70 hover:text-cyan-300 transition-colors duration-300 text-left group">
                      <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                        {service}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Contact</h4>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-cyan-300" />
                  </div>
                  <span className="group-hover:text-cyan-300 transition-colors duration-300">
                    1 (514) 215-2020
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-purple-300" />
                  </div>
                  <span className="group-hover:text-purple-300 transition-colors duration-300">
                    info@servitax.ca
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-emerald-300" />
                  </div>
                  <span className="group-hover:text-emerald-300 transition-colors duration-300">
                    Saint-Laurent, QC
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2025 Groupe ServiTax Solutions Inc. Tous droits réservés.
              <span className="text-cyan-400/70 ml-2">✨ Propulsé par l'IA</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <button className="hover:text-cyan-300 transition-colors duration-300">Politique de Confidentialité</button>
              <button className="hover:text-cyan-300 transition-colors duration-300">Conditions d'Utilisation</button>
              <button className="hover:text-cyan-300 transition-colors duration-300">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}