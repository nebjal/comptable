import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search, MessageSquare, Phone, Mail, FileText } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

export default function FAQPage({ onBack }: FAQPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Toutes les questions', icon: HelpCircle },
    { id: 'services', label: 'Nos Services', icon: FileText },
    { id: 'tarifs', label: 'Tarifs & Facturation', icon: MessageSquare },
    { id: 'technique', label: 'Support Technique', icon: Phone },
    { id: 'general', label: 'Questions Générales', icon: Mail }
  ];

  const faqs = [
    {
      id: 1,
      category: 'services',
      question: 'Quels sont vos principaux services comptables ?',
      answer: 'Nous proposons une gamme complète de services comptables : tenue de comptabilité, comptabilité analytique, déclarations fiscales, comptabilité de paie, conseil en gestion, audit et due diligence, accompagnement à la création d\'entreprise, et solutions digitales avec intelligence artificielle.'
    },
    {
      id: 2,
      category: 'services',
      question: 'Proposez-vous des services de comptabilité de paie ?',
      answer: 'Oui, nous proposons un service complet de comptabilité de paie incluant l\'établissement des bulletins de salaire, les déclarations DSN mensuelles, le suivi des congés payés, et les conseils en droit social. Notre équipe spécialisée vous assure une conformité parfaite avec la législation en vigueur.'
    },
    {
      id: 3,
      category: 'tarifs',
      question: 'Comment sont fixés vos tarifs ?',
      answer: 'Nos tarifs sont fixés selon plusieurs critères : la taille de votre entreprise, la complexité de votre activité, le volume de transactions, et les services spécifiques demandés. Nous proposons des formules adaptées à chaque profil, avec possibilité de personnalisation.'
    },
    {
      id: 4,
      category: 'tarifs',
      question: 'Y a-t-il des frais de mise en route ?',
      answer: 'Oui, nous appliquons des frais de mise en route de 500€ HT pour toutes nos formules. Ces frais couvrent l\'analyse initiale de votre situation, la configuration de votre espace client, et la formation à nos outils digitaux.'
    },
    {
      id: 5,
      category: 'tarifs',
      question: 'Puis-je bénéficier d\'une remise pour un engagement annuel ?',
      answer: 'Absolument ! En choisissant la facturation annuelle, vous bénéficiez automatiquement d\'une remise de 10% sur le prix mensuel. Cette remise est appliquée automatiquement lors de votre inscription.'
    },
    {
      id: 6,
      category: 'technique',
      question: 'Comment accéder à mon espace client ?',
      answer: 'Votre espace client est accessible 24/7 via notre plateforme sécurisée. Vous recevrez vos identifiants par email après la signature de votre contrat. L\'accès est possible depuis tout navigateur web ou notre application mobile.'
    },
    {
      id: 7,
      category: 'technique',
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'La sécurité de vos données est notre priorité absolue. Nous utilisons le chiffrement SSL/TLS, des serveurs sécurisés certifiés ISO 27001, des sauvegardes automatiques multiples, et respectons strictement le RGPD. Vos données financières sont cryptées et stockées en France.'
    },
    {
      id: 8,
      category: 'technique',
      question: 'Proposez-vous une formation à vos outils ?',
      answer: 'Oui, nous incluons une formation complète à nos outils digitaux dans nos formules Professional et Enterprise. Pour les autres formules, nous proposons des sessions de formation optionnelles. Notre équipe support est également disponible pour vous accompagner.'
    },
    {
      id: 9,
      category: 'general',
      question: 'Dans quelle région intervenez-vous ?',
      answer: 'Nous intervenons principalement en Île-de-France avec nos bureaux parisiens, mais nous accompagnons également des clients dans toute la France grâce à nos solutions digitales. Pour les clients en région, nous proposons des rendez-vous physiques lors de vos déplacements à Paris ou des visioconférences.'
    },
    {
      id: 10,
      category: 'general',
      question: 'Quelle est la durée d\'engagement minimum ?',
      answer: 'L\'engagement minimum est de 12 mois pour toutes nos formules. Cette période nous permet d\'optimiser notre accompagnement et de vous proposer des solutions pérennes. Après cette période, le contrat se renouvelle tacitement mois par mois.'
    },
    {
      id: 11,
      category: 'general',
      question: 'Comment se déroule la prise en charge d\'un nouveau client ?',
      answer: 'La prise en charge suit plusieurs étapes : 1) Premier rendez-vous pour analyser vos besoins, 2) Proposition d\'un devis personnalisé, 3) Signature du contrat, 4) Récupération de vos données comptables, 5) Configuration de votre espace client, 6) Formation et accompagnement personnalisé.'
    },
    {
      id: 12,
      category: 'services',
      question: 'Proposez-vous des services de conseil en optimisation fiscale ?',
      answer: 'Oui, nous proposons un service d\'optimisation fiscale légale et stratégique. Notre équipe d\'experts analyse votre situation pour identifier les opportunités d\'optimisation, tout en respectant la législation fiscale en vigueur. Ce service est particulièrement recommandé pour les entreprises en croissance.'
    },
    {
      id: 13,
      category: 'technique',
      question: 'Puis-je intégrer mes outils existants à votre plateforme ?',
      answer: 'Oui, notre plateforme est conçue pour s\'intégrer facilement avec vos outils existants. Nous proposons des API et des connecteurs pour la plupart des logiciels de gestion (ERP, CRM, banques en ligne). Notre équipe technique vous accompagne dans ces intégrations.'
    },
    {
      id: 14,
      category: 'tarifs',
      question: 'Acceptez-vous les paiements par virement bancaire ?',
      answer: 'Oui, nous acceptons les paiements par virement bancaire, prélèvement automatique, et carte bancaire via notre plateforme sécurisée. Pour les contrats annuels, nous proposons également le paiement en plusieurs échéances pour faciliter votre trésorerie.'
    },
    {
      id: 15,
      category: 'general',
      question: 'Que faire en cas d\'urgence comptable ou fiscale ?',
      answer: 'Pour les urgences, nous disposons d\'un service de support prioritaire accessible par téléphone au 01 42 86 95 32. Notre équipe d\'experts est disponible pour vous accompagner dans les situations urgentes avec une réponse garantie sous 2 heures ouvrables.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FAQ - Questions Fréquentes
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
            Questions
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fréquentes
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services,
            nos tarifs et notre fonctionnement.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
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
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="h-6 w-6 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-8 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune question trouvée</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche ou votre filtre de catégorie.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Notre équipe est là pour vous aider. Contactez-nous directement !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-4">Réponse immédiate</p>
              <a href="tel:+33142869532" className="text-blue-600 font-semibold hover:text-blue-700">
                +33 1 42 86 95 32
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Réponse sous 24h</p>
              <a href="mailto:contact@servitax.fr" className="text-blue-600 font-semibold hover:text-blue-700">
                contact@servitax.fr
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat en Ligne</h3>
              <p className="text-gray-600 mb-4">Disponible 24/7</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Démarrer le chat
              </button>
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg font-semibold">
            Nous Contacter
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Chiffres Clés
            </h2>
            <p className="text-xl text-blue-100">
              Notre engagement pour votre satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Support disponible</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2h</div>
              <div className="text-blue-100">Temps de réponse moyen</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
