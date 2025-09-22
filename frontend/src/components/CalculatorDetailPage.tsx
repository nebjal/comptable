import { useState } from 'react';
import { 
  ArrowLeft, 
  Calculator, 
  ExternalLink, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  FileText
} from 'lucide-react';

interface CalculatorDetailPageProps {
  calculatorId?: string;
  onBack: () => void;
}

const CalculatorDetailPage = ({ calculatorId = 'reer', onBack }: CalculatorDetailPageProps) => {
  const [inputs, setInputs] = useState({
    revenus: '',
    cotisationsActuelles: '',
    age: '',
    objectifRetraite: ''
  });

  // Données du calculateur basées sur les vrais outils ServitTax
  const calculatorInfo = {
    id: calculatorId,
    title: 'Calculateur REER - Optimisation Retraite',
    description: 'Optimisez vos cotisations REER pour maximiser vos économies d\'impôt et préparer votre retraite.',
    category: 'Retraite & Épargne',
    difficulty: 'Intermédiaire',
    estimatedTime: '5-10 minutes',
    features: [
      'Calcul du plafond REER personnalisé',
      'Optimisation des économies d\'impôt',
      'Projection des revenus de retraite',
      'Comparaison REER vs CELI',
      'Stratégie de cotisation par âge'
    ],
    instructions: [
      'Rassemblez vos derniers avis de cotisation',
      'Préparez vos revenus d\'emploi actuels',
      'Définissez vos objectifs de retraite',
      'Consultez vos relevés REER existants'
    ],
    tips: [
      {
        type: 'success',
        title: 'Conseil ServitTax',
        content: 'Cotisez avant le 1er mars pour bénéficier des déductions de l\'année précédente.'
      },
      {
        type: 'warning', 
        title: 'Attention',
        content: 'Les retraits REER avant 65 ans sont imposables au taux marginal.'
      },
      {
        type: 'info',
        title: 'Le saviez-vous ?',
        content: 'Vous pouvez reporter vos droits de cotisation REER indéfiniment.'
      }
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = () => {
    const revenus = parseFloat(inputs.revenus) || 0;
    const age = parseInt(inputs.age) || 30;
    const cotisationsActuelles = parseFloat(inputs.cotisationsActuelles) || 0;
    
    // Calculs simplifiés basés sur les règles CRA 2024
    const plafondReer = Math.min(revenus * 0.18, 31560); // Plafond 2024
    const economieImpot = plafondReer * 0.35; // Taux marginal estimé
    const anneesRetraite = 65 - age;
    const projectionRetraite = cotisationsActuelles * Math.pow(1.06, anneesRetraite);

    return {
      plafondReer: plafondReer.toFixed(0),
      economieImpot: economieImpot.toFixed(0),
      cotisationOptimale: (plafondReer - cotisationsActuelles).toFixed(0),
      projectionRetraite: projectionRetraite.toFixed(0),
      anneesRetraite
    };
  };

  const results = calculateResults();

  const getTipIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTipColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container-servitax px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center text-servitax-primary hover:text-servitax-secondary transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux calculateurs
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-servitax-dark">{calculatorInfo.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-servitax-primary/10 text-servitax-primary rounded-full">
                    {calculatorInfo.category}
                  </span>
                  <span>{calculatorInfo.difficulty}</span>
                  <span>{calculatorInfo.estimatedTime}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => window.open('https://www.canada.ca/fr/services/prestations/pensionspubliques/rpc/calculatrice-revenu-retraite.html', '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-servitax-primary text-white rounded-xl hover:bg-servitax-primary/90 transition-colors duration-300"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Calculateur officiel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-servitax px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Calculator Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-servitax-dark mb-6 flex items-center">
                  <Target className="h-6 w-6 text-servitax-primary mr-3" />
                  Vos Informations
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Revenus annuels bruts ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.revenus}
                      onChange={(e) => handleInputChange('revenus', e.target.value)}
                      placeholder="75,000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Âge actuel
                    </label>
                    <input
                      type="number"
                      value={inputs.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="35"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cotisations REER actuelles ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.cotisationsActuelles}
                      onChange={(e) => handleInputChange('cotisationsActuelles', e.target.value)}
                      placeholder="5,000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Objectif revenus retraite ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.objectifRetraite}
                      onChange={(e) => handleInputChange('objectifRetraite', e.target.value)}
                      placeholder="50,000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-servitax-dark mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                  Résultats de Votre Analyse
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <span className="text-2xl font-bold text-green-800">{results.plafondReer}$</span>
                    </div>
                    <div className="text-green-700 font-semibold">Plafond REER 2024</div>
                    <div className="text-green-600 text-sm">Maximum déductible</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-800">{results.economieImpot}$</span>
                    </div>
                    <div className="text-blue-700 font-semibold">Économie d'Impôt</div>
                    <div className="text-blue-600 text-sm">Estimation annuelle</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-8 w-8 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-800">{results.cotisationOptimale}$</span>
                    </div>
                    <div className="text-purple-700 font-semibold">Cotisation Recommandée</div>
                    <div className="text-purple-600 text-sm">Pour maximiser vos avantages</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="h-8 w-8 text-orange-600" />
                      <span className="text-2xl font-bold text-orange-800">{results.projectionRetraite}$</span>
                    </div>
                    <div className="text-orange-700 font-semibold">Projection à 65 ans</div>
                    <div className="text-orange-600 text-sm">Dans {results.anneesRetraite} ans</div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-servitax-primary/5 rounded-2xl">
                  <h4 className="font-bold text-servitax-dark mb-3">Recommandations ServitTax</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cotisez {results.cotisationOptimale}$ avant le 1er mars pour optimiser vos déductions 2024</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Économie d'impôt estimée de {results.economieImpot}$ cette année</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Envisagez un REER de conjoint si applicable pour optimiser l'impôt familial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-servitax-dark mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 text-servitax-secondary mr-2" />
                  Fonctionnalités
                </h3>
                <ul className="space-y-3">
                  {calculatorInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="space-y-4">
                {calculatorInfo.tips.map((tip, index) => (
                  <div key={index} className={`p-4 border rounded-xl ${getTipColor(tip.type)}`}>
                    <div className="flex items-start space-x-3">
                      {getTipIcon(tip.type)}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-700">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-servitax-dark mb-4 flex items-center">
                  <FileText className="h-5 w-5 text-servitax-accent mr-2" />
                  Préparation
                </h3>
                <ol className="space-y-3">
                  {calculatorInfo.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3 text-sm">
                      <span className="bg-servitax-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-2xl p-6 text-white text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-servitax-light" />
                <h4 className="font-bold text-lg mb-2">Besoin d'aide ?</h4>
                <p className="text-servitax-light text-sm mb-4">
                  Nos experts peuvent analyser votre situation personnelle et vous proposer une stratégie sur mesure.
                </p>
                <button className="bg-white text-servitax-primary px-6 py-3 rounded-xl font-semibold hover:bg-servitax-light transition-colors duration-300">
                  Consultation gratuite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDetailPage;