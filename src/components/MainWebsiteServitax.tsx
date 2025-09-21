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
  PhoneCall
} from 'lucide-react';

export default function MainWebsiteServitax() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      description: 'Déclarations pour particuliers et travailleurs autonomes, sociétés incorporées et autres formes juridiques.',
      features: ['Déclarations T1/T2', 'Optimisation fiscale', 'Révision des années antérieures'],
      color: 'from-servitax-primary to-servitax-teal-600',
      link: '/declaration-de-revenu'
    },
    {
      icon: Briefcase,
      title: 'Solutions d\'Affaires',
      description: 'Tenue de livres, gestion fiscale (TPS-TVQ-HST-PST), gestion de la paie et migration vers le nuage.',
      features: ['Tenue de livres', 'Gestion fiscale complète', 'Paie automatisée'],
      color: 'from-servitax-secondary to-servitax-cyan-500',
      link: '/entreprises'
    },
    {
      icon: Users,
      title: 'Services Personnalisés',
      description: 'Services adaptés aux particuliers, familles, étudiants, retraités, nouveaux arrivants et non-résidents.',
      features: ['Conseil personnalisé', 'Support multilingue', 'Accompagnement complet'],
      color: 'from-servitax-accent to-servitax-cyan-600',
      link: '/particuliers'
    },
    {
      icon: BookOpen,
      title: 'Ressources & Formation',
      description: 'Articles de blogue et ressources utiles basés sur les questions fréquentes de nos clients.',
      features: ['Base de connaissances', 'Guides pratiques', 'FAQ détaillée'],
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
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-servitax-dark">ServitTax</h1>
                <p className="text-sm text-servitax-primary font-medium">Centre Pro des Impôts</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Accueil', 'Services', 'À Propos', 'Ressources', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => setCurrentSection(index)}
                  className={`nav-item-servitax px-4 py-2 rounded-lg ${
                    currentSection === index ? 'active bg-servitax-primary/10' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="btn-servitax-outline hidden md:block">
                Client Existant
              </button>
              <button className="btn-servitax-primary">
                <Sparkles className="h-5 w-5 mr-2" />
                Commencer
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-servitax section-padding pt-32">
        <div className="container-servitax">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-servitax-primary/10 border border-servitax-primary/20 rounded-full text-servitax-primary text-sm font-semibold">
                  <div className="w-2 h-2 bg-servitax-accent rounded-full mr-2 animate-pulse"></div>
                  Centre Professionnel des Impôts
                </div>

                <h1 className="text-5xl lg:text-6xl font-black leading-tight text-servitax-dark">
                  Votre Centre Pro des{' '}
                  <span className="text-gradient-servitax">Impôts</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Services fiscaux et comptables en ligne, accessibles partout au Canada. 
                  <span className="font-semibold text-servitax-primary"> Excellence professionnelle</span>, 
                  <span className="font-semibold text-servitax-secondary"> prix compétitifs</span> et 
                  <span className="font-semibold text-servitax-accent"> sécurité des données</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="btn-servitax-primary text-lg px-8 py-4">
                  <Play className="h-6 w-6 mr-3" />
                  Commencer maintenant!
                  <ArrowRight className="h-6 w-6 ml-3" />
                </button>

                <button className="btn-servitax-outline text-lg px-8 py-4">
                  <Calendar className="h-6 w-6 mr-3" />
                  Consultation gratuite
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
      <section className="section-padding bg-white">
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

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-servitax-primary via-servitax-secondary to-servitax-accent text-white">
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
              <button className="bg-white text-servitax-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
                <UserCheck className="h-6 w-6 mr-3 inline" />
                Client Existant - Accéder à mon dossier
              </button>

              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 text-lg">
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
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-primary/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-primary/30 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-servitax-accent" />
                  </div>
                  <span className="group-hover:text-servitax-accent transition-colors duration-300">
                    Support Téléphonique
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-secondary/30 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-servitax-secondary" />
                  </div>
                  <span className="group-hover:text-servitax-secondary transition-colors duration-300">
                    support@servitax.ca
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-servitax-accent/20 rounded-lg flex items-center justify-center group-hover:bg-servitax-accent/30 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-servitax-accent" />
                  </div>
                  <span className="group-hover:text-servitax-accent transition-colors duration-300">
                    Partout au Canada
                  </span>
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
    </div>
  );
}