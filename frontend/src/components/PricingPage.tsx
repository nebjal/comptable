import { useState } from 'react';
import { ArrowLeft, Check, Star, Shield, Calculator, FileText, TrendingUp } from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
}

export default function PricingPage({ onBack }: PricingPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Idéal pour les petites entreprises et indépendants',
      monthlyPrice: 150,
      yearlyPrice: 1500,
      popular: false,
      features: [
        'Comptabilité générale',
        'Déclarations TVA',
        'Suivi de trésorerie',
        'Rapports mensuels',
        'Support email',
        'Jusqu\'à 50 écritures/mois'
      ],
      limitations: [
        'Pas de comptabilité analytique',
        'Pas de conseil fiscal avancé'
      ],
      icon: Calculator
    },
    {
      name: 'Professional',
      description: 'Pour les PME en croissance',
      monthlyPrice: 350,
      yearlyPrice: 3500,
      popular: true,
      features: [
        'Tout le pack Starter',
        'Comptabilité analytique',
        'Déclarations fiscales',
        'Optimisation fiscale de base',
        'Support téléphonique',
        'Jusqu\'à 200 écritures/mois',
        'Tableaux de bord personnalisés',
        'Formation équipe (2h/mois)'
      ],
      limitations: [
        'Pas d\'audit complet',
        'Support limité aux heures ouvrables'
      ],
      icon: TrendingUp
    },
    {
      name: 'Enterprise',
      description: 'Solution complète pour grandes entreprises',
      monthlyPrice: 750,
      yearlyPrice: 7500,
      popular: false,
      features: [
        'Tout le pack Professional',
        'Audit et due diligence',
        'Conseil fiscal avancé',
        'Comptabilité de paie',
        'Support 24/7',
        'Écritures illimitées',
        'Formation équipe illimitée',
        'Intégration API',
        'Reporting en temps réel',
        'Accompagnement personnalisé'
      ],
      limitations: [],
      icon: Shield
    }
  ];

  const addons = [
    {
      name: 'Comptabilité de Paie',
      description: 'Gestion complète de votre paie',
      price: 200,
      features: ['Bulletins de salaire', 'Déclarations DSN', 'Suivi des congés', 'Conseil social']
    },
    {
      name: 'Automatisation IA',
      description: 'Intelligence artificielle pour votre comptabilité',
      price: 150,
      features: ['Saisie automatique', 'Contrôle des écritures', 'Prévisions financières', 'Alertes intelligentes']
    },
    {
      name: 'Formation Avancée',
      description: 'Formation spécialisée pour votre équipe',
      price: 300,
      features: ['Sessions individuelles', 'Workshops thématiques', 'Support post-formation', 'Matériel pédagogique']
    }
  ];

  const faqs = [
    {
      question: 'Puis-je changer de formule à tout moment ?',
      answer: 'Oui, vous pouvez changer de formule à tout moment. Les changements prennent effet au début du mois suivant.'
    },
    {
      question: 'Y a-t-il des frais de mise en route ?',
      answer: 'Oui, des frais de mise en route de 500€ HT s\'appliquent pour toutes les formules, couvrant l\'analyse initiale et la configuration.'
    },
    {
      question: 'Quelle est la durée d\'engagement minimum ?',
      answer: 'L\'engagement minimum est de 12 mois pour toutes les formules. Après cette période, le contrat se renouvelle tacitement.'
    },
    {
      question: 'Les prix incluent-ils la TVA ?',
      answer: 'Non, tous les prix affichés sont hors TVA. La TVA applicable sera ajoutée selon votre situation fiscale.'
    },
    {
      question: 'Puis-je bénéficier d\'une remise pour un engagement annuel ?',
      answer: 'Oui, en choisissant la facturation annuelle, vous bénéficiez d\'une remise de 10% sur le prix mensuel.'
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
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Tarifs & Formules
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
            Tarifs
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transparents
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Choisissez la formule qui correspond à vos besoins et à votre budget.
            Toutes nos formules incluent un accompagnement personnalisé.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`text-lg font-semibold ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="mx-6 relative"
            >
              <div className={`w-16 h-8 rounded-full transition-colors duration-300 ${
                billingPeriod === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                } mt-1`}></div>
              </div>
            </button>
            <div className="flex items-center">
              <span className={`text-lg font-semibold ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annuel
              </span>
              <span className="ml-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                -10%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
                    plan.popular ? 'border-blue-300 ring-2 ring-blue-100 scale-105' : 'border-gray-200/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Le plus populaire
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">{price}€</span>
                      <span className="text-gray-600 ml-2">HT/{billingPeriod === 'monthly' ? 'mois' : 'an'}</span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <div className="text-green-600 text-sm mt-2">
                        Économisez {plan.monthlyPrice * 12 * 0.1}€ par an
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Limitations :</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {limitation}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {plan.popular ? 'Commencer l\'essai gratuit' : 'Choisir cette formule'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Modules Complémentaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personnalisez votre formule avec nos modules optionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addons.map((addon, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{addon.name}</h3>
                <p className="text-gray-600 mb-6">{addon.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{addon.price}€</span>
                  <span className="text-gray-600 ml-2">HT/mois</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {addon.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur nos tarifs
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bénéficiez d'un mois offert pour tester nos services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold">
              Démarrer l'essai gratuit
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold">
              Parler à un conseiller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
