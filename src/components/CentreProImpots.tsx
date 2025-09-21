import React from 'react';
import { ScrollReveal } from './Animations';

const CentreProImpots: React.FC = () => {
  const services = [
    {
      title: "Déclaration de Revenus",
      description: "Nous traitons tous les types de déclarations fiscales pour les résidents canadiens, non-résidents, et expatriés.",
      features: [
        "Déclarations de revenus pour particuliers et travailleurs autonomes",
        "Révision et ajustement des déclarations passées (jusqu'à 10 ans)",
        "Représentation auprès du gouvernement en cas de vérification",
        "Téléchargement des feuillets fiscaux manquants"
      ]
    },
    {
      title: "Tenue de Livres",
      description: "Service complet de tenue de livres pour particuliers et entreprises.",
      features: [
        "Comptabilité courante et analytique",
        "Préparation des états financiers",
        "Suivi des comptes clients et fournisseurs",
        "Rapports de gestion personnalisés"
      ]
    },
    {
      title: "Gestion de la Paie",
      description: "Solution complète de gestion de la paie conforme aux normes canadiennes.",
      features: [
        "Calcul des salaires et déductions",
        "Préparation des T4 et relevés d'emploi",
        "Gestion des avantages sociaux",
        "Conformité aux lois provinciales et fédérales"
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Compléter le questionnaire",
      description: "Remplissez le questionnaire en ligne pour recueillir toutes les informations nécessaires."
    },
    {
      step: 2,
      title: "Soumettre les documents",
      description: "Téléchargez vos documents requis via notre plateforme sécurisée."
    },
    {
      step: 3,
      title: "Traitement & Suivi",
      description: "Nous traitons votre dossier et vous tenons informé de l'avancement."
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-600/30 rounded-full text-blue-600 text-sm font-medium mb-6">
            Centre Pro des Impôts
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Services Complets de
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 bg-clip-text text-transparent">
              Fiscalité Canadienne
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Notre Centre Pro des Impôts offre des services complets et personnalisés
            pour tous vos besoins fiscaux au Canada, des particuliers aux entreprises.
          </p>
        </ScrollReveal>

        {/* Services Principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-blue-600/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-blue-600/25">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-white/80 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Processus en 3 Étapes */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Processus Simple en 3 Étapes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">{step.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Informations de Contact */}
        <ScrollReveal direction="up">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Contactez-Nous</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📞</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Téléphone</h4>
                <p className="text-white/70">1 (514) 215-2020</p>
                <p className="text-white/70">1 (514) 215-2001</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📠</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Fax</h4>
                <p className="text-white/70">1 (819) 200-0040</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📧</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                <p className="text-white/70">info@servitax.ca</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-white/70">100-1490, Rue La Fontaine, Saint-Laurent, QC, H4L 5M1</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default CentreProImpots;
