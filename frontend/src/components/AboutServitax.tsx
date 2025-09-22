import React from 'react';
import { ScrollReveal } from './Animations';

const AboutServitax: React.FC = () => {
  const stats = [
    { number: "500+", label: "Clients Satisfaits" },
    { number: "15+", label: "Années d'Expérience" },
    { number: "100%", label: "Satisfaction Client" },
    { number: "24/7", label: "Support Disponible" }
  ];

  const values = [
    {
      title: "Intégrité",
      description: "Transparence et honnêteté dans toutes nos relations",
      icon: "🛡️"
    },
    {
      title: "Innovation",
      description: "Toujours à la pointe des nouvelles technologies",
      icon: "🚀"
    },
    {
      title: "Proximité",
      description: "Un accompagnement humain et personnalisé",
      icon: "🤝"
    }
  ];

  const team = [
    {
      name: "Bouhazza Abdelmalek",
      role: "Fondateur & Directeur Général",
      experience: "35+ ans d'expérience",
      description: "Expert en comptabilité et fiscalité avec plus de 35 ans d'expérience dans le domaine bancaire, des assurances et de la comptabilité."
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-600/30 rounded-full text-blue-600 text-sm font-medium mb-6">
            À Propos de Nous
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            L'Histoire de
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 bg-clip-text text-transparent">
              Groupe ServiTax Solutions
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Depuis plus de 15 ans, nous nous engageons à fournir des services complets
            et adaptés en matière de comptabilité, fiscalité et conseils financiers.
          </p>
        </ScrollReveal>

        {/* Histoire de l'Entreprise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Notre Histoire</h3>
                <p className="text-white/80 leading-relaxed">
                  Chez Groupe Servitax Solutions, nous nous engageons à fournir des services
                  complets et adaptés en matière de comptabilité, fiscalité et conseils financiers,
                  tant pour les particuliers que pour les entreprises et les organisations.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Depuis plus de 15 ans, notre cabinet, basé à Saint-Laurent, Québec, s'efforce
                  de devenir un partenaire de confiance pour des clients à travers tout le Canada.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Fondée en 2009 par Bouhazza Abdelmalek, notre entreprise est devenue un acteur
                  majeur dans le domaine de la fiscalité et de la comptabilité au Canada, avec un
                  fort accent sur l'innovation numérique et la satisfaction client.
                </p>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-black text-blue-600 mb-1">{stat.number}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Notre Fondateur</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-xl">BA</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{team[0].name}</h4>
                      <p className="text-blue-600 text-sm">{team[0].role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    {team[0].description}
                  </p>
                  <p className="text-cyan-400 font-medium text-sm">{team[0].experience}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Notre Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  Notre mission est de transformer la comptabilité traditionnelle en une expérience
                  moderne, accessible et efficace. Nous croyons que chaque entrepreneur mérite des
                  services comptables qui soutiennent sa croissance, pas qui la freinent.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Grâce à notre plateforme digitale innovante, nous offrons des services complets :
                  tenue de livres, fiscalité, paie, conseils stratégiques et bien plus. Notre approche
                  personnalisée garantit que chaque client reçoit exactement ce dont il a besoin
                  pour réussir.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Nos Valeurs */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Nos Valeurs Fondamentales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Équipe et Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ScrollReveal direction="left">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Notre Équipe et Réseau d'Experts</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Notre équipe composée de comptables professionnels certifiés CPA et de
                formateurs expérimentés vous assure un service de qualité supérieure.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Comptables professionnels certifiés</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Formateurs QuickBooks expérimentés</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Spécialistes en fiscalité canadienne</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span>Support technique 24/7</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Nos Outils Technologiques</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Nous utilisons les dernières technologies pour offrir des services modernes
                et sécurisés à nos clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span>Plateforme de signature électronique avancée</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span>Intelligence artificielle pour l'analyse de données</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span>Cloud sécurisé avec Google Workspace</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span>Logiciels de comptabilité intégrés</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Appel à l'Action */}
        <ScrollReveal direction="up">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-2xl rounded-3xl p-8 border border-blue-600/30">
            <h3 className="text-3xl font-bold text-white text-center mb-6">Rejoignez Notre Réseau</h3>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Découvrez comment Groupe ServiTax Solutions peut vous accompagner
              dans vos projets comptables et fiscaux.
            </p>
            <div className="text-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Nous Contacter
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutServitax;
