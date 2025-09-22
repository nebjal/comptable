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
  Clock,
  Globe,
  Sparkles,
  ChevronRight,
  Play,
  Calendar,
  BarChart3,
  Target,
  Award,
  BookOpen,
  HeadphonesIcon,
  Briefcase,
  DollarSign,
  ShieldCheck,
  UserCheck,
  FileCheck,
  ClockIcon,
  PhoneCall,
  MessageSquare,
  Send
} from 'lucide-react';

// Import new sections and pages
import BlogSection from './BlogSection';
import CalculatorsSection from './CalculatorsSection';
import FiscalCalendarSection from './FiscalCalendarSection';
import BlogArticlePage from './BlogArticlePage';
import CalculatorDetailPage from './CalculatorDetailPage';

interface MainWebsiteServitaxProps {
  onClientLogin?: () => void;
  onNewClient?: () => void;
  onAdminAccess?: () => void;
}

export default function MainWebsiteServitax({ onClientLogin, onNewClient, onAdminAccess }: MainWebsiteServitaxProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // main, blog-article, calculator-detail
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedCalculatorId, setSelectedCalculatorId] = useState<string | null>(null);

  // Navigation vers les sections
  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const sectionIds = ['accueil', 'services', 'apropos', 'ressources', 'contact', 'blog', 'calculateurs', 'echeancier'];
    const element = document.getElementById(sectionIds[sectionIndex]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Gestion des vues détaillées
  const handleBlogArticleClick = (articleId: string) => {
    setSelectedBlogId(articleId);
    setCurrentView('blog-article');
  };

  const handleCalculatorClick = (calculatorId: string) => {
    setSelectedCalculatorId(calculatorId);
    setCurrentView('calculator-detail');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedBlogId(null);
    setSelectedCalculatorId(null);
  };

  // Render different views
  if (currentView === 'blog-article') {
    return <BlogArticlePage articleId={selectedBlogId || '1'} onBack={handleBackToMain} />;
  }

  if (currentView === 'calculator-detail') {
    return <CalculatorDetailPage calculatorId={selectedCalculatorId || 'reer'} onBack={handleBackToMain} />;
  }

  // Animation des compteurs
  const [counters, setCounters] = useState({
    clients: 0,
    satisfaction: 0,
    savings: 0,
    experience: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        clients: 2500,
        satisfaction: 98,
        savings: 25,
        experience: 15
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Calculator,
      title: 'Centre Pro des Impôts',
      description: 'Déclarations pour particuliers et travailleurs autonomes, sociétés incorporées et autres formes juridiques. Révision et ajustement des années antérieures.',
      features: ['Déclarations T1/T2', 'Révision jusqu\'à 10 ans', 'Représentation gouvernementale', 'Récupération feuillets fiscaux'],
      color: 'from-servitax-primary to-servitax-teal-600',
      link: '/declaration-de-revenu'
    },
    {
      icon: Briefcase,
      title: 'Solutions d\'Affaires',
      description: 'Tenue de livres, gestion fiscale (TPS-TVQ-HST-PST), gestion de la paie et migration vers le nuage. Solutions comptables cloud.',
      features: ['Tenue de livres QuickBooks', 'Gestion taxes à la consommation', 'Paie optimisée', 'Migration cloud'],
      color: 'from-servitax-secondary to-servitax-cyan-500',
      link: '/entreprises'
    },
    {
      icon: Users,
      title: 'Services Personnalisés',
      description: 'Services adaptés aux particuliers, familles, étudiants, retraités, nouveaux arrivants, non-résidents et propriétaires locatifs.',
      features: ['Résidents/Non-résidents', 'Nouveaux arrivants', 'Propriétés locatives', 'Consultation personnalisée'],
      color: 'from-servitax-accent to-servitax-cyan-600',
      link: '/particuliers'
    },
    {
      icon: BookOpen,
      title: 'Blog & Ressources',
      description: 'Articles de blogue et ressources utiles basés sur les questions fréquentes de nos clients en comptabilité et fiscalité.',
      features: ['FAQ comptabilité', 'Guides fiscaux', 'Ressources utiles', 'Conseils personnalisés'],
      color: 'from-servitax-teal-600 to-servitax-primary',
      link: '/ressources-utiles'
    }
  ];

  const testimonials = [
    {
      name: 'Marie-Claire Dubois',
      company: 'Propriétaire PME',
      content: 'Excellent service! L\'équipe ServitTax a optimisé mes déclarations et m\'a fait économiser des milliers de dollars. Leur expertise est remarquable.',
      rating: 5,
      savings: '12 500$'
    },
    {
      name: 'Jean-François Martin',
      company: 'Consultant',
      content: 'Service professionnel et personnalisé. La plateforme en ligne est intuitive et sécurisée. Je recommande fortement ServitTax.',
      rating: 5,
      savings: '8 200$'
    },
    {
      name: 'Sophie Tremblay',
      company: 'Directrice RH',
      content: 'Support exceptionnel et conseil de qualité. ServitTax comprend vraiment les besoins des entreprises québécoises.',
      rating: 5,
      savings: '15 000$'
    }
  ];

  const advantages = [
    {
      icon: ShieldCheck,
      title: 'Expertise Reconnue',
      description: 'Plus de 15 ans d\'expérience en fiscalité canadienne avec une équipe de professionnels certifiés.'
    },
    {
      icon: Globe,
      title: 'Service Pan-Canadien',
      description: 'Services fiscaux et comptables accessibles partout au Canada avec support en français et anglais.'
    },
    {
      icon: Zap,
      title: 'Technologie Avancée',
      description: 'Plateforme sécurisée avec adoption technologique et environnements sans papier.'
    },
    {
      icon: DollarSign,
      title: 'Tarifs Compétitifs',
      description: 'Le meilleur service à des prix très raisonnables, avec transparence totale sur nos tarifs.'
    },
    {
      icon: Clock,
      title: 'Support Rapide',
      description: 'Réponse rapide et service personnalisé pour tous vos besoins fiscaux et comptables.'
    },
    {
      icon: Award,
      title: 'Satisfaction Garantie',
      description: '98% de satisfaction client avec une approche basée sur l\'honnêteté et la transparence.'
    }
  ];

  return (
    <div className="min-h-screen bg-servitax-light">
      {/* Navigation Header */}
      <nav className="nav-servitax fixed top-0 w-full z-50">
        <div className="container-servitax">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1726954665342-8809OIRJ09Q87W6TF19N/WM2.jpg?format=1500w"
                  alt="ServitTax Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Accueil', 'Services', 'À Propos', 'Ressources', 'Contact', 'Blog', 'Calculateurs', 'Échéancier'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index)}
                  className={`nav-item-servitax px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentSection === index 
                      ? 'active bg-servitax-secondary text-servitax-primary' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={onClientLogin}
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hidden md:block"
              >
                Client Existant
              </button>
              <button 
                onClick={onNewClient}
                className="bg-servitax-secondary hover:bg-servitax-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Commencer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Accueil */}
      <section id="accueil" className="hero-servitax section-padding pt-32">
        <div className="container-servitax">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8 hero-content">
              <div className="space-y-6">
                <div className="hero-badge inline-flex items-center px-4 py-2 bg-servitax-primary/10 border border-servitax-primary/20 rounded-full text-servitax-primary text-sm font-semibold">
                  <div className="w-2 h-2 bg-servitax-accent rounded-full mr-2 animate-pulse"></div>
                  Centre Professionnel des Impôts
                </div>

                <h1 className="text-5xl lg:text-6xl font-black leading-tight text-servitax-dark">
                  Votre Centre Pro des{' '}
                  <span className="text-gradient-servitax">Impôts</span>
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                  Services d'impôts et de comptabilité en ligne, accessibles partout au Canada. 
                  <span className="font-semibold text-servitax-primary"> Excellence professionnelle</span>, 
                  <span className="font-semibold text-servitax-secondary"> prix compétitifs</span> et 
                  <span className="font-semibold text-servitax-accent"> sécurité des données</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={onNewClient}
                  className="btn-servitax-primary text-lg px-8 py-4"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Commencez maintenant!
                  <ArrowRight className="h-6 w-6 ml-3" />
                </button>

                <button className="btn-servitax-outline text-lg px-8 py-4">
                  <Calendar className="h-6 w-6 mr-3" />
                  Nous contacter
                </button>
              </div>

              {/* Stats Counter */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-servitax-primary mb-2">
                    {counters.clients.toLocaleString()}+
                  </div>
                  <div className="text-gray-600 font-medium">Clients Satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-servitax-secondary mb-2">
                    {counters.satisfaction}%
                  </div>
                  <div className="text-gray-600 font-medium">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-servitax-accent mb-2">
                    {counters.savings}%
                  </div>
                  <div className="text-gray-600 font-medium">Économies Moy.</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-servitax-teal-600 mb-2">
                    {counters.experience}+
                  </div>
                  <div className="text-gray-600 font-medium">Ans d'Expérience</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-servitax-dark font-bold text-xl">Tableau de Bord Client</h3>
                      <p className="text-gray-600">Suivi en temps réel</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-servitax-accent rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-servitax-primary rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-servitax-secondary rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="card-servitax-gradient">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="h-6 w-6 text-servitax-primary" />
                      <span className="text-green-600 text-sm font-medium">+25%</span>
                    </div>
                    <div className="text-2xl font-bold text-servitax-dark">12 500$</div>
                    <div className="text-gray-600">Économies Fiscales</div>
                  </div>

                  <div className="card-servitax-gradient">
                    <div className="flex items-center justify-between mb-2">
                      <FileCheck className="h-6 w-6 text-servitax-secondary" />
                      <span className="text-green-600 text-sm font-medium">100%</span>
                    </div>
                    <div className="text-2xl font-bold text-servitax-dark">47</div>
                    <div className="text-gray-600">Documents Traités</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>Déclaration T1</span>
                      <span>Complétée</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-servitax-primary to-servitax-secondary rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>Optimisation Fiscale</span>
                      <span>En cours</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-servitax-accent to-servitax-cyan-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-servitax-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-servitax-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-servitax-secondary/10 border border-servitax-secondary/20 rounded-full text-servitax-secondary text-sm font-semibold mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Nos Services d'Excellence
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Solutions Fiscales et Comptables
              <span className="block text-gradient-accent">Nouvelle Génération</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous offrons des services personnalisés pour tous vos besoins fiscaux et comptables, 
              avec l'adoption technologique et la sécurité des données.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group hover-servitax">
                  <div className="card-servitax h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-servitax-dark mb-4 group-hover:text-servitax-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700 text-sm">
                          <CheckCircle className="h-4 w-4 text-servitax-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="btn-servitax-outline w-full">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}  
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-servitax-secondary/10 border border-servitax-secondary/20 rounded-full text-servitax-secondary text-sm font-semibold mb-6">
              <Users className="h-4 w-4 mr-2" />
              Services Spécialisés
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Clientèle Diversifiée
              <span className="block text-gradient-secondary">Solutions Personnalisées</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chaque situation est unique. Nous offrons des services sur mesure pour vous accompagner dans la gestion 
              de vos obligations fiscales et l'optimisation de vos avantages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Familles */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Familles</h3>
              <p className="text-gray-600 mb-6">
                Maximiser les prestations et crédits auxquels les familles peuvent prétendre.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Prestation pour enfants - Aide aux nouveaux arrivants</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Crédits TPS, frais de garde optimisés</span>
                </div>
              </div>
            </div>

            {/* Étudiants */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Étudiants</h3>
              <p className="text-gray-600 mb-6">
                Accompagnement dans la gestion des finances et obligations fiscales étudiantes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Clarification du statut fiscal des étudiants</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Optimisation des crédits pour frais de scolarité</span>
                </div>
              </div>
            </div>

            {/* Retraités */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Retraités</h3>
              <p className="text-gray-600 mb-6">
                Aide pour maximiser les programmes et pensions auxquels ils sont éligibles.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Pension SV, RPC, autres programmes retraite</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Crédits d'impôt pour revenus de pension</span>
                </div>
              </div>
            </div>

            {/* Personnes Handicapées */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Personnes Handicapées</h3>
              <p className="text-gray-600 mb-6">
                Services spécifiques pour obtenir les crédits et avantages fiscaux dus.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Crédit d'impôt pour personnes handicapées</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Planification dépenses médicales admissibles</span>
                </div>
              </div>
            </div>

            {/* Nouveaux Immigrants */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Nouveaux Immigrants</h3>
              <p className="text-gray-600 mb-6">
                Facilitation de l'intégration fiscale et financière pour les nouveaux arrivants.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Optimisation fiscale spécifique nouveaux immigrants</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Aide gestion finances lors installation Canada</span>
                </div>
              </div>
            </div>

            {/* Propriétaires Locatifs */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">Propriétaires Locatifs</h3>
              <p className="text-gray-600 mb-6">
                Accompagnement pour la gestion des obligations fiscales immobilières.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Déclaration revenus locatifs et déductions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Production Relevé 31 (RL31) obligatoire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section className="section-padding bg-white">
        <div className="container-servitax">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-servitax-accent/10 border border-servitax-accent/20 rounded-full text-servitax-accent text-sm font-semibold mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                Formation
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
                Formation
                <span className="block text-gradient-accent">QuickBooks Online</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Formations sur place et en ligne pour petites entreprises, comptables et aides-comptables. 
                Maîtrisez QuickBooks Online et économisez temps et argent.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-servitax-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Maîtrise complète de QuickBooks Online sur ordinateur et mobile</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-servitax-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Compréhension des concepts comptables utilisés</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-servitax-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Formation enregistrement transactions (facturation, paiements)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-servitax-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Intégration applications (paie, gestion, CRM)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-servitax-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Élaboration rapports pour comptable et fiscaliste</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-servitax-primary">
                  <Calendar className="h-5 w-5 mr-2" />
                  Réserver Formation
                </button>
                <button className="btn-servitax-outline">
                  Auto-Formation Gratuite
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-servitax-accent/10 to-servitax-primary/10 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-servitax-accent to-servitax-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-servitax-dark mb-4">Formations Disponibles</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-servitax-dark mb-2">Petites Entreprises & Travailleurs Autonomes</h4>
                  <p className="text-gray-600 text-sm">Formation complète QuickBooks Online avec intégrations</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-servitax-dark mb-2">Comptables & Commis Comptables</h4>
                  <p className="text-gray-600 text-sm">Préparation certifications de base et avancées sur demande</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-servitax-dark mb-2">Formation Personnalisée</h4>
                  <p className="text-gray-600 text-sm">Présentiel ou à distance selon vos besoins spécifiques</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="text-yellow-800 text-sm font-medium text-center">
                  💡 Formation certifiante QuickBooks disponible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ressources Section */}
      <section className="section-padding bg-gradient-to-br from-servitax-primary/5 to-servitax-secondary/5">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-servitax-primary/10 border border-servitax-primary/20 rounded-full text-servitax-primary text-sm font-semibold mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Ressources Utiles
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Outils & Informations
              <span className="block text-gradient-primary">Essentiels</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ressources complètes pour vous accompagner dans la gestion de vos finances, démarches fiscales 
              et optimisation de vos processus professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Calculateurs</h3>
              <p className="text-gray-600 mb-6">
                Estimez vos impôts, crédits d'impôt et autres calculs financiers pour planifier efficacement.
              </p>
              <button className="btn-servitax-outline w-full">Accéder aux calculateurs</button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Échéancier Fiscal</h3>
              <p className="text-gray-600 mb-6">
                Dates clés pour vos obligations fiscales (déclarations revenus, TPS/TVQ, etc.).
              </p>
              <button className="btn-servitax-outline w-full">Consulter échéancier</button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Guides & Formulaires</h3>
              <p className="text-gray-600 mb-6">
                Formulaires fiscaux et guides pratiques pour vos déclarations et démarches.
              </p>
              <button className="btn-servitax-outline w-full">Télécharger guides</button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Info-Remboursement</h3>
              <p className="text-gray-600 mb-6">
                Tenez-vous informé des délais et modalités de remboursement fiscal.
              </p>
              <button className="btn-servitax-outline w-full">Suivre remboursement</button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Contacter Gouvernement</h3>
              <p className="text-gray-600 mb-6">
                Coordonnées principales agences fiscales et administratives.
              </p>
              <button className="btn-servitax-outline w-full">Voir coordonnées</button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-servitax-dark mb-4">Cours de Fiscalité</h3>
              <p className="text-gray-600 mb-6">
                Formation approfondie fiscalité canadienne. <strong>Bientôt disponible.</strong>
              </p>
              <button className="btn-servitax-outline w-full opacity-50 cursor-not-allowed">Bientôt disponible</button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-padding bg-servitax-light">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Pourquoi choisir 
              <span className="block text-gradient-servitax">ServitTax ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre expertise en développements législatifs et technologiques nous distingue. 
              Service personnalisé, rapide et sécurisé pour tous vos besoins comptables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="group hover-servitax">
                  <div className="card-servitax text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-servitax-dark mb-4">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - À Propos */}
      <section id="apropos" className="section-padding bg-white">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Ce que disent nos
              <span className="block text-gradient-accent">clients</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez les témoignages de nos clients qui ont bénéficié de notre expertise 
              et de notre approche personnalisée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-servitax hover-servitax">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-servitax-dark">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-servitax-primary font-bold">Économies</div>
                    <div className="text-servitax-primary text-lg font-black">{testimonial.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ressources */}
      <section id="ressources" className="section-padding bg-gradient-to-br from-servitax-primary via-servitax-secondary to-servitax-accent text-white">
        <div className="container-servitax text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
              Prêt à optimiser vos finances ?
            </h2>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Rejoignez plus de 2 500 clients qui font confiance à ServitTax pour leurs besoins fiscaux et comptables.
              <br />
              <span className="font-semibold">Consultation gratuite • Service personnalisé • Tarifs transparents</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={onClientLogin}
                className="bg-white text-servitax-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <UserCheck className="h-6 w-6 mr-3 inline" />
                Client Existant - Accéder à mon dossier
              </button>

              <button 
                onClick={onNewClient}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 text-lg"
              >
                <Users className="h-6 w-6 mr-3 inline" />
                Nouveau Client - Créer mon dossier
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Support Téléphonique</div>
                  <div className="text-white/80">Lun-Ven 8h-18h</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Support par Courriel</div>
                  <div className="text-white/80">Réponse sous 24h</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <HeadphonesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Chat en Direct</div>
                  <div className="text-white/80">Support immédiat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection onArticleClick={handleBlogArticleClick} />

      {/* Calculators Section */}
      <CalculatorsSection onCalculatorClick={handleCalculatorClick} />

      {/* Fiscal Calendar Section */}
      <FiscalCalendarSection />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-servitax">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-servitax-primary/10 border border-servitax-primary/20 rounded-full text-servitax-primary text-sm font-semibold mb-6">
              <Mail className="h-4 w-4 mr-2" />
              Nous Contacter
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
              Parlons de Vos
              <span className="block text-gradient-accent">Besoins Fiscaux</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Contactez-nous par email, téléphone ou WhatsApp pour toute question concernant vos 
              déclarations de revenus, planification fiscale ou solutions comptables cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-servitax-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-servitax-dark mb-2">Téléphone</h4>
                  <p className="text-gray-600 mb-2">Appelez-nous directement :</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-servitax-primary">(514) 215-2020</p>
                    <p className="font-semibold text-servitax-primary">(514) 215-2001</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-servitax-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-servitax-dark mb-2">Email</h4>
                  <p className="text-gray-600 mb-2">Écrivez-nous à :</p>
                  <p className="font-semibold text-servitax-secondary">info@servitax.ca</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-servitax-dark mb-2">WhatsApp</h4>
                  <p className="text-gray-600 mb-2">Chat direct :</p>
                  <p className="font-semibold text-green-600">(514) 691-1815</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-servitax-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-servitax-dark mb-2">Adresse</h4>
                  <div className="text-gray-600">
                    <p>100-1490, Rue La Fontaine</p>
                    <p>Saint-Laurent, QC, H4L5M1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Mockup */}
            <div className="bg-gradient-to-br from-servitax-primary/5 to-servitax-secondary/5 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-servitax-dark mb-6">Prendre Rendez-vous</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                    <div className="w-full h-12 bg-white rounded-lg border border-gray-200"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <div className="w-full h-12 bg-white rounded-lg border border-gray-200"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="w-full h-12 bg-white rounded-lg border border-gray-200"></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                  <div className="w-full h-12 bg-white rounded-lg border border-gray-200"></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <div className="w-full h-32 bg-white rounded-lg border border-gray-200"></div>
                </div>
                <button className="btn-servitax-primary w-full">
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer le Message
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Ou prenez rendez-vous directement via 
                  <a href="#" className="text-servitax-primary font-semibold ml-1">Calendly</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-servitax-dark text-white section-padding">
        <div className="container-servitax">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-3xl flex items-center justify-center shadow-lg">
                  <Shield className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">ServitTax</h3>
                  <p className="text-servitax-accent font-medium">Centre Pro des Impôts</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Votre partenaire de confiance pour tous vos besoins fiscaux et comptables au Canada. 
                Excellence, sécurité et service personnalisé depuis plus de 15 ans.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center text-servitax-accent">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Expertise Reconnue</span>
                </div>
                <div className="flex items-center text-servitax-secondary">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Sécurisé & Conforme</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Nos Services</h4>
              <ul className="space-y-3">
                {['Déclarations de revenus', 'Solutions d\'affaires', 'Services personnalisés', 'Ressources & formation', 'Support professionnel'].map((service) => (
                  <li key={service}>
                    <button className="text-gray-300 hover:text-servitax-accent transition-colors duration-300 text-left group">
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
              <h4 className="text-xl font-bold">Nous Contacter</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-primary/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-primary/30 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-servitax-accent" />
                  </div>
                  <div className="group-hover:text-servitax-accent transition-colors duration-300">
                    <div className="font-medium">Téléphone</div>
                    <div className="text-sm">(514) 215-2020</div>
                    <div className="text-sm">(514) 215-2001</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-secondary/30 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-servitax-secondary" />
                  </div>
                  <div className="group-hover:text-servitax-secondary transition-colors duration-300">
                    <div className="font-medium">Email</div>
                    <div className="text-sm">info@servitax.ca</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-accent/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-accent/30 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-servitax-accent" />
                  </div>
                  <div className="group-hover:text-servitax-accent transition-colors duration-300">
                    <div className="font-medium">Adresse</div>
                    <div className="text-sm">100-1490, Rue La Fontaine</div>
                    <div className="text-sm">Saint-Laurent, QC, H4L5M1</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="group-hover:text-green-400 transition-colors duration-300">
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm">(514) 691-1815</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 ServitTax - Centre Pro des Impôts. Tous droits réservés.
              <span className="text-servitax-accent ml-2">🍁 Fait au Canada</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-servitax-accent transition-colors duration-300">Politique de Confidentialité</button>
              <button className="hover:text-servitax-accent transition-colors duration-300">Conditions d'Utilisation</button>
              <button className="hover:text-servitax-accent transition-colors duration-300">Nous Contacter</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Hidden Admin Access - Only visible on double-click or key combination */}
      <div 
        className="fixed bottom-4 right-4 opacity-10 hover:opacity-100 transition-opacity duration-500"
        onDoubleClick={onAdminAccess}
        title="Double-cliquez pour accès administrateur"
      >
        <div className="w-8 h-8 bg-servitax-primary rounded-full flex items-center justify-center cursor-pointer">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}