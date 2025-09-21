import React from 'react';
import { ScrollReveal } from './Animations';

const SolutionsAffaires: React.FC = () => {
  const businessSolutions = [
    {
      title: "Tenue de Livres",
      description: "Service complet de comptabilité pour entreprises de toutes tailles.",
      features: [
        "Comptabilité générale et analytique",
        "Préparation des états financiers",
        "Suivi des comptes clients et fournisseurs",
        "Rapports de gestion personnalisés"
      ]
    },
    {
      title: "Gestion des Taxes à la Consommation",
      description: "Gestion complète des TPS/TVQ/TVH/TVP pour votre entreprise.",
      features: [
        "Calcul et déclaration des taxes",
        "Récupération des taxes payées",
        "Conseils sur l'optimisation fiscale",
        "Conformité aux réglementations"
      ]
    },
    {
      title: "Gestion de la Paie",
      description: "Solution intégrée de gestion de la paie pour PME.",
      features: [
        "Calcul automatique des salaires",
        "Préparation des T4 et relevés d'emploi",
        "Gestion des avantages sociaux",
        "Conformité aux normes provinciales"
      ]
    },
    {
      title: "Migration et Intégration du Cloud",
      description: "Migration sécurisée vers des solutions cloud modernes.",
      features: [
        "Transfert sécurisé des données",
        "Formation des équipes",
        "Support technique continu",
        "Sauvegarde automatique"
      ]
    },
    {
      title: "Formation QuickBooks en Ligne",
      description: "Formation complète sur QuickBooks Online.",
      features: [
        "Cours personnalisés",
        "Support technique",
        "Matériel de formation",
        "Certificat de completion"
      ]
    }
  ];

  const additionalServices = [
    "Conseils pour le démarrage d'entreprise",
    "Élaboration de plans d'affaires",
    "Inscription fiscale des entreprises",
    "Préparation des états financiers",
    "Évaluation des entreprises",
    "Résolution de problèmes fiscaux",
    "Références vers des ressources spécialisées"
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 backdrop-blur-sm border border-purple-600/30 rounded-full text-purple-600 text-sm font-medium mb-6">
            Solutions d'Affaires
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Solutions Intégrées pour
            <span className="block bg-gradient-to-r from-purple-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Votre Entreprise
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Nous accompagnons les entreprises à chaque étape de leur développement
            avec des solutions complètes et adaptées à leurs besoins spécifiques.
          </p>
        </ScrollReveal>

        {/* Solutions Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {businessSolutions.map((solution, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-purple-600/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-purple-600/25">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {solution.description}
                </p>
                <ul className="space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-white/80 text-sm">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Services Additionnels */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Services Complémentaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex items-center text-white/80">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Appel à l'Action */}
        <ScrollReveal direction="up">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-400/20 backdrop-blur-2xl rounded-3xl p-8 border border-purple-600/30">
            <h3 className="text-3xl font-bold text-white text-center mb-6">Prêt à Booster Votre Entreprise ?</h3>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Découvrez comment nos solutions d'affaires peuvent transformer votre gestion comptable
              et vous permettre de vous concentrer sur la croissance de votre entreprise.
            </p>
            <div className="text-center">
              <button className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Demander une Consultation Gratuite
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default SolutionsAffaires;
