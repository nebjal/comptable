import { useState } from 'react';
import { ArrowLeft, Users, Award, TrendingUp, Target, Heart, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'team' | 'history'>('mission');

  const tabs = [
    { id: 'mission' as const, label: 'Notre Mission' },
    { id: 'values' as const, label: 'Nos Valeurs' },
    { id: 'team' as const, label: 'Notre Équipe' },
    { id: 'history' as const, label: 'Notre Histoire' }
  ];

  const stats = [
    { number: '500+', label: 'Clients satisfaits', icon: Users },
    { number: '15+', label: 'Années d\'expérience', icon: Award },
    { number: '98%', label: 'Taux de satisfaction', icon: TrendingUp },
    { number: '24/7', label: 'Support disponible', icon: Target }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Intégrité',
      description: 'Nous agissons toujours avec honnêteté et transparence dans toutes nos relations.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque service que nous offrons à nos clients.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous travaillons en étroite collaboration avec nos clients pour atteindre leurs objectifs.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Nous adoptons les dernières technologies pour améliorer nos services.'
    }
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Générale',
      experience: '20 ans',
      specialite: 'Comptabilité générale',
      image: 'MD'
    },
    {
      name: 'Pierre Martin',
      role: 'Comptable Agréé',
      experience: '15 ans',
      specialite: 'Fiscalité d\'entreprise',
      image: 'PM'
    },
    {
      name: 'Sophie Garcia',
      role: 'Conseillère Financière',
      experience: '12 ans',
      specialite: 'Planification financière',
      image: 'SG'
    },
    {
      name: 'Jean-François Tremblay',
      role: 'Expert en TI',
      experience: '10 ans',
      specialite: 'Solutions technologiques',
      image: 'JT'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Fondation du cabinet' },
    { year: '2012', event: 'Certification CPA' },
    { year: '2015', event: 'Ouverture du bureau de Québec' },
    { year: '2018', event: 'Lancement de la plateforme digitale' },
    { year: '2020', event: 'Certification ISO 27001' },
    { year: '2023', event: 'Expansion internationale' },
    { year: '2025', event: 'Lancement de l\'IA comptable' }
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
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  À propos de nous
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
            Notre
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Histoire
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous accompagnons les entreprises et particuliers dans leur gestion comptable
            avec passion, expertise et innovation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 mx-2 mb-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-12">
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Accompagner nos clients dans leur réussite financière en leur offrant des services comptables
                  d'excellence, des conseils stratégiques personnalisés et des solutions technologiques innovantes
                  qui simplifient leur quotidien et optimisent leur performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fiabilité</h3>
                    <p className="text-gray-600">Services conformes aux normes les plus strictes</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Proximité</h3>
                    <p className="text-gray-600">Relation de confiance avec chaque client</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                    <p className="text-gray-600">Adoption des dernières technologies</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200/50">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.map((member, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">{member.image}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-2">{member.experience} d'expérience</p>
                      <p className="text-gray-500 text-sm">{member.specialite}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/50">
                            <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                            <div className="text-gray-900 font-semibold">{milestone.event}</div>
                          </div>
                        </div>
                        <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez comment nous pouvons vous accompagner dans votre réussite financière
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold">
            Contactez-nous
          </button>
        </div>
      </section>
    </div>
  );
}
