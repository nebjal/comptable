import { 
  Calculator, 
  Users, 
  Building2, 
  Clock,
  Globe,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  DollarSign,
  TrendingUp,
  FileText,
  Home
} from 'lucide-react';

const CalculatorsSection = ({ onCalculatorClick }: { onCalculatorClick?: (calculatorId: string) => void }) => {
  const calculatorCategories = [
    {
      title: 'Général',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      calculators: [
        {
          name: 'Calculatrice Financière',
          description: 'Calculatrice financière complète pour tous vos besoins',
          link: 'https://calculatrices-financieres.ca/#/?hideHelp&palette=green&shade=light',
          icon: Calculator
        },
        {
          name: 'Taux de Change',
          description: 'Taux de change quotidiens de la Banque du Canada',
          link: 'https://www.banqueducanada.ca/taux/taux-de-change/taux-de-change-quotidiens/',
          icon: TrendingUp
        },
        {
          name: 'Taxe de Bienvenue',
          description: 'Calcul des droits de mutation immobilière',
          link: 'https://www.taxedebienvenue.com/',
          icon: Home
        },
        {
          name: 'Taxe Scolaire',
          description: 'Calcul de la taxe scolaire municipale',
          link: 'http://www.calculconversion.com/calcul-taxes-scolaire.html',
          icon: GraduationCap
        }
      ]
    },
    {
      title: 'Familles',
      icon: Users,
      color: 'from-green-500 to-green-600',
      calculators: [
        {
          name: 'Revenu Disponible',
          description: 'Estimation des aides financières selon votre situation',
          link: 'http://www.budget.finances.gouv.qc.ca/budget/outils/revenu-disponible-fr.asp',
          icon: DollarSign
        },
        {
          name: 'Allocation Canadienne pour Enfants',
          description: 'Calcul de l\'ACE selon vos revenus familiaux',
          link: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/calculateur-prestations-enfants-familles.html',
          icon: Users
        },
        {
          name: 'Frais de Garde',
          description: 'Coût net quotidien des frais de garde d\'enfants',
          link: 'http://www.budget.finances.gouv.qc.ca/Budget/outils/garde-net-fr.asp',
          icon: Clock
        },
        {
          name: 'RQAP',
          description: 'Prestations du Régime Québécois d\'assurance parentale',
          link: 'https://www.rqap.gouv.qc.ca/fr/a-propos-du-regime/simulateur-de-calcul-de-prestations',
          icon: Users
        }
      ]
    },
    {
      title: 'Entreprises',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      calculators: [
        {
          name: 'Retenues sur la Paie',
          description: 'Calculateur en direct des retenues sur la paie ARC',
          link: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-electroniques-entreprises/calculateur-direct-retenues-paie.html',
          icon: Calculator
        },
        {
          name: 'Retenues Québec',
          description: 'Retenues à la source et cotisations employeur Québec',
          link: 'https://www.revenuquebec.ca/fr/services-en-ligne/outils/webras-calculer-les-retenues-a-la-source/',
          icon: FileText
        },
        {
          name: 'TPS et TVQ',
          description: 'Calcul des taxes de vente (méthode usuelle)',
          link: 'http://www.calculconversion.com/calcul-taxes-tps-tvq.html',
          icon: DollarSign
        },
        {
          name: 'Avantages Automobiles',
          description: 'Calcul des avantages imposables pour automobiles',
          link: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-electroniques-entreprises/calculateur-direct-avantages-relatifs-automobiles-avis-non-responsabilite.html',
          icon: TrendingUp
        }
      ]
    },
    {
      title: 'Retraités',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      calculators: [
        {
          name: 'Revenus de Retraite',
          description: 'Calcul programmes fédéral et provincial de retraite',
          link: 'https://www.retraitequebec.gouv.qc.ca/fr/Pages/accueil.aspx',
          icon: Clock
        },
        {
          name: 'Sécurité de la Vieillesse',
          description: 'Calcul SV, SRG, Allocation et Allocation au survivant',
          link: 'https://www.canada.ca/fr/services/prestations/pensionspubliques/rpc/securite-vieillesse/paiements.html',
          icon: DollarSign
        },
        {
          name: 'Calculatrice Revenu Retraite',
          description: 'Calculatrice du revenu de retraite canadienne',
          link: 'https://www.canada.ca/fr/services/prestations/pensionspubliques/rpc/calculatrice-revenu-retraite.html',
          icon: Calculator
        },
        {
          name: 'Rente RRQ',
          description: 'Méthode de calcul de la rente de retraite RRQ',
          link: 'https://www.rrq.gouv.qc.ca/fr/services/publications/regime_rentes/retraite/Pages/calcul_rente.aspx',
          icon: TrendingUp
        }
      ]
    },
    {
      title: 'Non-Résidents',
      icon: Globe,
      color: 'from-red-500 to-red-600',
      calculators: [
        {
          name: 'Impôt Non-Résidents',
          description: 'Calcul de l\'impôt pour les non-résidents du Canada',
          link: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/calculateur-impot-non-residents-avis-non-responsabilite.html',
          icon: Globe
        }
      ]
    },
    {
      title: 'Étudiants',
      icon: GraduationCap,
      color: 'from-teal-500 to-teal-600',
      calculators: [
        {
          name: 'Aide Financière aux Études',
          description: 'Calcul du montant d\'aide financière aux études Québec',
          link: 'http://www.afe.gouv.qc.ca/prets-et-boursesetudes-a-temps-plein/calcul-de-laide/simulateur-de-calcul/',
          icon: GraduationCap
        },
        {
          name: 'Remboursement Prêts Étudiants',
          description: 'Estimateur de remboursement des prêts fédéraux',
          link: 'http://tools.canlearn.ca/cslgs-scpse/cln-cln/crp-lrc/af.nlindex-fra.do',
          icon: Calculator
        }
      ]
    }
  ];

  return (
    <section id="calculateurs" className="section-padding bg-white">
      <div className="container-servitax">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-servitax-accent/10 border border-servitax-accent/20 rounded-full text-servitax-accent text-sm font-semibold mb-6">
            <Calculator className="h-4 w-4 mr-2" />
            Calculateurs
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
            Outils de Calcul
            <span className="block text-gradient-accent">Professionnels</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accédez à nos calculatrices spécialisées pour faire des simulations précises selon vos objectifs financiers 
            et fiscaux. Outils gouvernementaux officiels et calculateurs professionnels.
          </p>
        </div>

        <div className="space-y-16">
          {calculatorCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-servitax-dark">{category.title}</h3>
                  <p className="text-gray-600">Calculateurs spécialisés pour {category.title.toLowerCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.calculators.map((calculator, calcIndex) => (
                  <a
                    key={calcIndex}
                    href={calculator.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-servitax-primary/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <calculator.icon className="h-6 w-6 text-white" />
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-servitax-primary transition-colors duration-300" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-servitax-dark mb-3 group-hover:text-servitax-primary transition-colors duration-300">
                      {calculator.name}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {calculator.description}
                    </p>
                    
                    <div className="inline-flex items-center text-servitax-primary font-semibold text-sm group-hover:text-servitax-secondary transition-colors duration-300">
                      Utiliser le calculateur
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-servitax-primary/5 to-servitax-secondary/5 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-servitax-dark mb-6">
            Besoin d'aide avec vos calculs ?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nos experts peuvent vous accompagner dans l'utilisation de ces outils et l'interprétation des résultats 
            pour optimiser votre situation fiscale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-servitax-primary">
              Consultation gratuite
            </button>
            <button className="btn-servitax-outline">
              Voir tous les calculateurs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;