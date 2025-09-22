import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Building2, 
  Users, 
  DollarSign,
  FileText,
  Target,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const FiscalCalendarSection = () => {
  const fiscalEvents = [
    {
      date: 'Fin février',
      title: 'Sommaires et Feuillets',
      description: 'Production des T-4, T-5, relevés 1 et 3. Paiement frais CNT.',
      additionalInfo: 'Date limite pour cotiser à votre REER et remboursement RAP/REEP.',
      type: 'employeur',
      priority: 'high',
      icon: FileText
    },
    {
      date: '15 mars',
      title: 'CSST & Acomptes Provisionnels',
      description: 'Production sommaire CSST. Premier versement acompte provisionnel.',
      type: 'employeur',
      priority: 'medium',
      icon: Building2
    },
    {
      date: '30 avril',
      title: 'Déclarations Particuliers',
      description: 'Production déclarations particuliers sans revenu d\'entreprise.',
      additionalInfo: 'Paiement solde d\'impôt tous particuliers incluant entreprises individuelles.',
      type: 'particulier',
      priority: 'high',
      icon: Users
    },
    {
      date: '15 juin',
      title: 'Entreprises & Acomptes',
      description: 'Déclarations particuliers avec revenu d\'entreprise et conjoints.',
      additionalInfo: 'Deuxième versement acompte provisionnel pour particuliers.',
      type: 'entreprise',
      priority: 'high',
      icon: Building2
    },
    {
      date: '15 septembre',
      title: 'Acomptes Provisionnels',
      description: 'Troisième versement d\'acompte provisionnel pour les particuliers.',
      type: 'particulier',
      priority: 'medium',
      icon: DollarSign
    },
    {
      date: '15 décembre',
      title: 'Dernier Acompte',
      description: 'Dernier versement d\'acompte provisionnel pour les particuliers.',
      type: 'particulier',
      priority: 'medium',
      icon: DollarSign
    }
  ];

  const monthlyObligations = [
    {
      frequency: 'Le 10 du mois',
      description: '1ère remise employeur (retenues entre 15 000$ et 50 000$)',
      detail: 'Pour rémunération après le 15ème jour du mois précédent',
      type: 'employeur'
    },
    {
      frequency: 'Le 15 du mois',
      description: 'Remise retenues mensuelles inférieures à 15 000$',
      detail: 'Pour rémunération du mois précédent',
      type: 'employeur'
    },
    {
      frequency: 'Le 25 du mois',
      description: '2e remise employeur (retenues entre 15 000$ et 50 000$)',
      detail: 'Pour rémunération avant le 16ème jour du mois précédent',
      type: 'employeur'
    },
    {
      frequency: 'Dernier jour du mois',
      description: 'Versement acomptes provisionnels société',
      detail: 'Le dernier jour du mois courant',
      type: 'entreprise'
    }
  ];

  const corporateSchedule = [
    {
      timeline: '2 mois après fin d\'exercice',
      description: 'Paiement solde d\'impôt société',
      detail: 'Sans intérêts et sans pénalité (3 mois pour certaines SPCC)',
      priority: 'high',
      icon: DollarSign
    },
    {
      timeline: '6 mois après fin d\'exercice',
      description: 'Production déclarations fiscales et états financiers',
      detail: 'Avec des intérêts mais sans pénalité',
      priority: 'medium',
      icon: FileText
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-orange-500 to-orange-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employeur': return 'bg-blue-100 text-blue-800';
      case 'entreprise': return 'bg-purple-100 text-purple-800';
      case 'particulier': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="echeancier" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-servitax">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-servitax-secondary/10 border border-servitax-secondary/20 rounded-full text-servitax-secondary text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            Échéancier Fiscal
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
            Dates Clés
            <span className="block text-gradient-secondary">Obligations Fiscales</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ne manquez aucune échéance importante ! Calendrier complet des obligations fiscales 
            pour particuliers, entreprises et employeurs.
          </p>
        </div>

        {/* Annual Events */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-servitax-dark mb-8 flex items-center">
            <Target className="h-8 w-8 text-servitax-primary mr-3" />
            Échéances Annuelles
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fiscalEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(event.priority)} rounded-xl flex items-center justify-center`}>
                      <event.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-servitax-primary">{event.date}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                  {event.priority === 'high' && (
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-servitax-dark mb-3">{event.title}</h4>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                {event.additionalInfo && (
                  <div className="bg-servitax-primary/5 rounded-2xl p-4">
                    <p className="text-sm text-servitax-dark font-medium">{event.additionalInfo}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Obligations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-servitax-dark mb-8 flex items-center">
            <Clock className="h-8 w-8 text-servitax-secondary mr-3" />
            Obligations Mensuelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthlyObligations.map((obligation, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-servitax-primary">{obligation.frequency}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(obligation.type)}`}>
                    {obligation.type}
                  </span>
                </div>
                <h4 className="font-bold text-servitax-dark mb-2">{obligation.description}</h4>
                <p className="text-gray-600 text-sm">{obligation.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Schedule */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-servitax-dark mb-8 flex items-center">
            <Building2 className="h-8 w-8 text-servitax-accent mr-3" />
            Échéancier Sociétés
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corporateSchedule.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(item.priority)} rounded-xl flex items-center justify-center`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  {item.priority === 'high' && (
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                
                <div className="text-lg font-bold text-servitax-primary mb-2">{item.timeline}</div>
                <h4 className="font-bold text-servitax-dark mb-3">{item.description}</h4>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-servitax-primary/10 to-servitax-secondary/10 rounded-3xl p-8 lg:p-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-servitax-dark mb-4">
                Note Importante - TPS/TVQ
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Compagnies :</strong> Paiement dans les 3 mois suivant chaque échéance annuelle</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Entreprises individuelles :</strong> Paiement avant fin avril de chaque année</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Fréquence trimestrielle :</strong> Paiement dans 30 jours suivant chaque échéance</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Fréquence mensuelle :</strong> Paiement dans 30 jours suivant chaque échéance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-servitax-dark mb-6">
            Ne manquez aucune échéance !
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent pour respecter toutes vos obligations fiscales 
            et éviter les pénalités et intérêts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-servitax-primary">
              <Calendar className="h-5 w-5 mr-2" />
              Service de rappel
            </button>
            <button className="btn-servitax-outline">
              Consultation gratuite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiscalCalendarSection;