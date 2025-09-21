import { useState } from 'react';
import { ArrowLeft, Calculator, FileText, TrendingUp, Zap, CheckCircle, Star, Clock, LucideIcon } from 'lucide-react';

interface ServicesPageProps {
  onBack: () => void;
}

export default function ServicesPage({ onBack }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<'comptabilite' | 'fiscalite' | 'paie' | 'cloud'>('comptabilite');

  const categories: Array<{ id: 'comptabilite' | 'fiscalite' | 'paie' | 'cloud'; label: string; icon: LucideIcon }> = [
    { id: 'comptabilite', label: 'Tenue de Livres', icon: Calculator },
    { id: 'fiscalite', label: 'Centre Pro des Impôts', icon: FileText },
    { id: 'paie', label: 'Gestion de la Paie', icon: TrendingUp },
    { id: 'cloud', label: 'Solutions Cloud', icon: Zap }
  ];

  const services = {
    comptabilite: [
      {
        title: 'Migration Numérique',
        description: 'Transition vers une comptabilité sans papier avec des outils adaptés à votre secteur',
        features: ['Migration vers systèmes modernes', 'Conversion de données Excel', 'Outils comptables spécialisés', 'Accompagnement personnalisé'],
        price: 'À partir de 299$/mois',
        popular: true
      },
      {
        title: 'Nettoyage & Optimisation',
        description: 'Nettoyage et mise à jour complète de vos fichiers QuickBooks Desktop ou en ligne',
        features: ['Nettoyage des fichiers comptables', 'Optimisation des données', 'Correction des erreurs', 'Mise à jour des systèmes'],
        price: 'À partir de 199$/mois',
        popular: false
      },
      {
        title: 'Configuration & Formation',
        description: 'Configuration de vos systèmes comptables et formation sur mesure pour votre équipe',
        features: ['Configuration des systèmes', 'Formation personnalisée', 'Support technique', 'Accompagnement quotidien'],
        price: 'À partir de 399$/mois',
        popular: false
      },
      {
        title: 'Support & Dépannage',
        description: 'Service de support technique et dépannage pour tous vos problèmes comptables',
        features: ['Support technique 24/7', 'Résolution rapide des problèmes', 'Maintenance préventive', 'Conseils d\'optimisation'],
        price: 'À partir de 149$/mois',
        popular: false
      }
    ],
    fiscalite: [
      {
        title: 'Déclarations de Revenus',
        description: 'Préparation et dépôt professionnels de vos déclarations d\'impôt fédéral et provincial',
        features: ['Déclaration T1 (fédéral)', 'Déclaration provinciale', 'Optimisation fiscale légale', 'Suivi des remboursements'],
        price: 'À partir de 149$/déclaration',
        popular: true
      },
      {
        title: 'Revue de Déclarations Antérieures',
        description: 'Analyse approfondie de vos déclarations passées pour identifier des économies potentielles',
        features: ['Analyse 3 dernières années', 'Réclamation de crédits oubliés', 'Corrections d\'erreurs', 'Remboursements supplémentaires'],
        price: 'À partir de 299$/an',
        popular: false
      },
      {
        title: 'Représentation Gouvernementale',
        description: 'Représentation professionnelle auprès de l\'Agence du Revenu Canada et Revenu Québec',
        features: ['Correspondance officielle', 'Négociation avec les autorités', 'Résolution de litiges', 'Accompagnement complet'],
        price: 'À partir de 199$/heure',
        popular: false
      },
      {
        title: 'Récupération de Documents Perdus',
        description: 'Service spécialisé pour récupérer vos documents fiscaux perdus ou détruits',
        features: ['Recherche de documents CRA', 'Recherche Revenu Québec', 'Reconstitution de dossiers', 'Suivi personnalisé'],
        price: 'À partir de 99$/document',
        popular: false
      }
    ],
    paie: [
      {
        title: 'Paie Flexible & Automatisée',
        description: 'Service de paie flexible selon votre calendrier avec automatisation complète',
        features: ['Paie hebdomadaire/bimensuelle/mensuelle', 'Paiement par dépôt direct', 'Portail employé sécurisé', 'Calcul automatique des retenues'],
        price: 'À partir de 49$/employé/mois',
        popular: true
      },
      {
        title: 'Conformité & Déclarations',
        description: 'Gestion complète de la conformité et des déclarations obligatoires',
        features: ['Conformité normes CNT', 'ROE automatique', 'T4 électroniques', 'Déclarations fin d\'année'],
        price: 'À partir de 29$/employé/mois',
        popular: false
      },
      {
        title: 'Intégration Cloud',
        description: 'Module de paie intégré directement dans votre système comptable en ligne',
        features: ['Intégration temps réel', 'Mise à jour comptable automatique', 'Accès sécurisé partout', 'Réduction des erreurs'],
        price: 'À partir de 39$/employé/mois',
        popular: false
      },
      {
        title: 'Solutions Locales',
        description: 'Solutions de paie locales pour les entreprises préférant rester hors cloud',
        features: ['Solution sur site', 'Même niveau de service', 'Sécurité maximale', 'Personnalisation complète'],
        price: 'À partir de 59$/employé/mois',
        popular: false
      }
    ],
    cloud: [
      {
        title: 'Migration & Intégration Cloud',
        description: 'Migration complète vers une plateforme cloud centralisée pour tous vos processus',
        features: ['Centralisation des processus', 'Réduction des coûts', 'Accès en tout lieu', 'Mise à jour automatique'],
        price: 'À partir de 199$/mois',
        popular: true
      },
      {
        title: 'Sécurité Renforcée',
        description: 'Protection maximale de vos données avec sauvegarde et sécurité de pointe',
        features: ['Sauvegarde automatique', 'Cryptage des données', 'Accès sécurisé', 'Conformité réglementaire'],
        price: 'À partir de 99$/mois',
        popular: false
      },
      {
        title: 'Intégration d\'Applications',
        description: 'Intégration automatique d\'applications spécialisées dans votre écosystème',
        features: ['Applications RH intégrées', 'Gestion des ventes', 'Suivi des stocks', 'Comptabilité connectée'],
        price: 'À partir de 149$/mois',
        popular: false
      },
      {
        title: 'Formation & Support',
        description: 'Formation personnalisée et support technique pour votre transition cloud',
        features: ['Formation sur mesure', 'Support technique 24/7', 'Documentation complète', 'Accompagnement continu'],
        price: 'À partir de 79$/mois',
        popular: false
      }
    ]
  };

  const testimonials = [
    {
      name: 'Marie-Claude Tremblay',
      company: 'Boulangerie St-Joseph',
      rating: 5,
      comment: 'Service impeccable pour nos déclarations fiscales. Leur expertise nous a permis d\'économiser considérablement sur nos impôts !'
    },
    {
      name: 'Jean-François Dubois',
      company: 'TechNova Solutions',
      rating: 5,
      comment: 'La migration vers QuickBooks en ligne et la gestion de paie automatisée nous ont fait gagner un temps précieux. Excellent service !'
    },
    {
      name: 'Sophie Gagnon',
      company: 'Clinique Dentaire Moderne',
      rating: 5,
      comment: 'Accompagnement professionnel et réactif. Leur connaissance des normes fiscales canadiennes est remarquable.'
    }
  ];

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
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Nos Services
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
            Services
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Comptables Canadiens
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            De la tenue de livres moderne aux services fiscaux professionnels,
            nous vous accompagnons dans tous vos besoins financiers au Canada.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">35+</div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-4 mx-2 mb-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services[activeCategory].map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  service.popular ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200/50'
                }`}
              >
                {service.popular && (
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm font-semibold text-blue-600">Le plus populaire</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Mensuel</span>
                    </div>
                  </div>

                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à optimiser votre comptabilité ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bénéficiez d'une consultation gratuite pour découvrir nos solutions adaptées aux normes fiscales canadiennes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold">
              Consultation gratuite
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
              Télécharger notre guide fiscal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
