import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Calculator, FileText, TrendingUp, Shield, Zap, BookOpen, Globe, LucideIcon } from 'lucide-react';
import {
  searchResources,
  getContextualSuggestions,
  getRelevantCalculations,
  CRA_RESOURCES,
  RQ_RESOURCES,
  TAX_DEADLINES,
  COMMON_DEDUCTIONS,
  BUSINESS_DEDUCTIONS
} from './TaxKnowledgeBase';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'calculation' | 'document';
  metadata?: Record<string, unknown>;
}

interface AISuggestions {
  category: string;
  suggestions: string[];
  icon: LucideIcon;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant IA spécialisé en comptabilité et fiscalité. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions: AISuggestions[] = [
    {
      category: 'Déclarations fiscales',
      icon: FileText,
      suggestions: [
        'Comment préparer ma déclaration T1 ?',
        'Quels sont les crédits d\'impôt disponibles ?',
        'Comment déclarer mes revenus locatifs ?',
        'Guide officiel CRA pour déclaration'
      ]
    },
    {
      category: 'Comptabilité',
      icon: Calculator,
      suggestions: [
        'Comment faire ma tenue de livres ?',
        'Quels sont les principes comptables ?',
        'Comment calculer mes charges sociales ?',
        'Logiciels de comptabilité recommandés'
      ]
    },
    {
      category: 'Entreprises & Impôts',
      icon: TrendingUp,
      suggestions: [
        'Comment réduire mes impôts légalement ?',
        'Quelle est la meilleure structure d\'entreprise ?',
        'Comment optimiser mes déductions ?',
        'Guide incorporation CRA'
      ]
    },
    {
      category: 'Taxes & TPS/TVQ',
      icon: Shield,
      suggestions: [
        'Comment calculer la TPS/TVH ?',
        'Obligations TVQ au Québec',
        'Remboursements de taxes',
        'Calculateur officiel TPS/TVQ'
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();

    // Recherche de ressources pertinentes
    const relevantResources = searchResources(userMessage);
    const contextualSuggestions = getContextualSuggestions(userMessage);
    const relevantCalculations = getRelevantCalculations(userMessage);

    // Réponses spécialisées avec ressources officielles

    if (message.includes('déclaration') || message.includes('t1') || message.includes('impôt fédéral')) {
      const craResources = relevantResources.filter(r => r.jurisdiction === 'federal');
      return {
        id: Date.now().toString(),
        content: `📋 **Guide complet pour votre déclaration d'impôt T1**\n\n**Ressources officielles Revenu Canada :**\n${craResources.map(r => `🔗 [${r.title}](${r.url})`).join('\n')}\n\n**Étapes essentielles :**\n1. **Rassemblez vos documents** : T4, T5, reçus médicaux, dons\n2. **Calculez vos revenus** : Salaire, investissements, location\n3. **Déductions disponibles** :\n${COMMON_DEDUCTIONS.federal.map(d => `   • ${d}`).join('\n')}\n\n**Échéances importantes :**\n• Déclaration T1 : ${TAX_DEADLINES.federal.T1}\n• TPS/TVH : ${TAX_DEADLINES.federal['GST/HST']}\n\n� **Outil utile** : [Calculateur d'impôt CRA](${CRA_RESOURCES.find(r => r.id === 'cra-calculator')?.url})\n\nAvez-vous des questions spécifiques sur votre situation fiscale ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    if (message.includes('québec') || message.includes('provincial') || message.includes('impôt québec')) {
      const rqResources = relevantResources.filter(r => r.jurisdiction === 'quebec');
      return {
        id: Date.now().toString(),
        content: `🏛️ **Impôt provincial du Québec - Revenu Québec**\n\n**Ressources officielles :**\n${rqResources.map(r => `🔗 [${r.title}](${r.url})`).join('\n')}\n\n**Particularités québécoises :**\n• Crédit d'impôt santé (jusqu'à 1 200 $)\n• Crédit d'impôt pour solidarité\n• Déduction pour frais de garde d'enfants\n• Cotisations syndicales déductibles\n\n**Échéances fiscales :**\n• Déclaration de revenus : ${TAX_DEADLINES.quebec['Income Tax']}\n• TVQ : ${TAX_DEADLINES.quebec.TVQ}\n\n**Calculateur provincial :** [Estimation impôt Québec](${RQ_RESOURCES.find(r => r.id === 'rq-calculator')?.url})\n\nSouhaitez-vous des détails sur un crédit spécifique ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    if (message.includes('crédit') || message.includes('déduction') || message.includes('réduction')) {
      return {
        id: Date.now().toString(),
        content: `💡 **Crédits d'impôt et déductions fiscales**\n\n**Crédits fédéraux populaires :**\n• Crédit pour la TPS/TVH (jusqu'à 496 $)\n• Crédit pour personnes handicapées\n• Crédit pour enfants (jusqu'à 6 765 $)\n• Crédit pour études (jusqu'à 1 677 $)\n\n**Crédits provinciaux (Québec) :**\n• Solidarité (jusqu'à 1 546 $)\n• Santé (jusqu'à 1 200 $)\n• Travail (jusqu'à 1 546 $)\n\n**Déductions fédérales :**\n${COMMON_DEDUCTIONS.federal.slice(0, 4).map(d => `   • ${d}`).join('\n')}\n\n**Ressources détaillées :**\n🔗 [Crédits d'impôt CRA](${CRA_RESOURCES.find(r => r.id === 'cra-credits')?.url})\n🔗 [Crédits Revenu Québec](${RQ_RESOURCES.find(r => r.id === 'rq-taxes-credits')?.url})\n\nQuel type de crédit vous intéresse particulièrement ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    if (message.includes('calculateur') || message.includes('estimation') || message.includes('calcul')) {
      return {
        id: Date.now().toString(),
        content: `🧮 **Calculateurs fiscaux officiels**\n\n**Outils CRA :**\n🔗 [Calculateur d'impôt fédéral](${CRA_RESOURCES.find(r => r.id === 'cra-calculator')?.url})\n🔗 [Calculateur TPS/TVH](https://www.canada.ca/fr/agence-revenu/services/impot/tps-tvh-entreprises/calculateur-tps-tvh.html)\n\n**Outils Revenu Québec :**\n🔗 [Calculateur d'impôt provincial](${RQ_RESOURCES.find(r => r.id === 'rq-calculator')?.url})\n🔗 [Calculateur TVQ](https://www.revenuquebec.ca/fr/entreprises/taxes/taxe-de-vente-du-quebec-tvq/calculateur-de-tvq/)\n\n**Calculateurs spécialisés :**\n• Impôt sur les dividendes\n• Crédits pour enfants\n• Déductions médicales\n• Impôt des entreprises\n\n💡 **Astuce** : Ces calculateurs sont mis à jour automatiquement avec les derniers taux et règles fiscales.\n\nQuel type de calcul souhaitez-vous effectuer ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    if (message.includes('entreprise') || message.includes('incorporation') || message.includes('business')) {
      const businessResources = relevantResources.filter(r =>
        r.category === 'entreprises' || r.keywords.includes('entreprise')
      );
      return {
        id: Date.now().toString(),
        content: `🏢 **Guide fiscal pour entrepreneurs**\n\n**Ressources essentielles :**\n${businessResources.map(r => `🔗 [${r.title}](${r.url})`).join('\n')}\n\n**Structures d'affaires au Canada :**\n• **Entreprise individuelle** : Simple, responsabilité illimitée\n• **Société de personnes** : Partage des responsabilités\n• **Corporation** : Protection des actifs, fiscalité avantageuse\n\n**Déductions d'affaires courantes :**\n${BUSINESS_DEDUCTIONS.slice(0, 6).map(d => `   • ${d}`).join('\n')}\n\n**Taux d'impôt corporatif :**\n• Fédéral : 15% (petites entreprises)\n• Québec : 11.5% (petites entreprises)\n\n📊 [Guide incorporation CRA](${CRA_RESOURCES.find(r => r.id === 'cra-business')?.url})\n\nQuelle est la nature de votre projet d'entreprise ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    if (message.includes('tps') || message.includes('tvq') || message.includes('taxe vente')) {
      const taxResources = relevantResources.filter(r =>
        r.category === 'tps' || r.category === 'tvq' || r.keywords.includes('taxe')
      );
      return {
        id: Date.now().toString(),
        content: `💰 **Guide TPS/TVQ complet**\n\n**Ressources officielles :**\n${taxResources.map(r => `� [${r.title}](${r.url})`).join('\n')}\n\n**Taux de taxes actuels :**\n• **TPS fédéral** : 5%\n• **TVQ Québec** : 9.975%\n• **Combiné (HST)** : 13% dans certaines provinces\n\n**Calculs courants :**\n${relevantCalculations.map(calc => `📊 **${calc.type.toUpperCase()}** : ${calc.description}\n   Exemple : ${calc.example}`).join('\n\n')}\n\n**Échéances de déclaration :**\n• Mensuelle : 15 du mois suivant\n• Trimestrielle : Dernier jour du trimestre suivant\n\n⚠️ **Important** : Les pénalités pour retard peuvent être substantielles.\n\nAvez-vous des questions sur vos obligations TPS/TVQ ?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'calculation'
      };
    }

    // Réponse par défaut avec ressources pertinentes
    const defaultResources = relevantResources.slice(0, 3);
    return {
      id: Date.now().toString(),
      content: `🤖 **Assistant IA Fiscal - Réponse personnalisée**\n\nJ'ai analysé votre question : "${userMessage}"\n\n**Ressources recommandées :**\n${defaultResources.map(r => `🔗 [${r.title}](${r.url})`).join('\n')}\n\n**Suggestions contextuelles :**\n${contextualSuggestions.map(s => `   • ${s}`).join('\n')}\n\n**Domaines d'expertise :**\n🎯 Déclarations d'impôt fédérales et provinciales\n💼 Comptabilité d'entreprise et tenue de livres\n💰 Gestion de la paie et conformité\n🏢 Optimisation fiscale et crédits\n📊 TPS/TVQ et taxes à la consommation\n\n**Ressources officielles :**\n🏛️ [Revenu Canada](https://www.canada.ca/fr/agence-revenu.html)\n🏛️ [Revenu Québec](https://www.revenuquebec.ca/fr/)\n\nPouvez-vous préciser votre situation pour une réponse plus ciblée ?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation de délai de réponse IA
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </button>

        {/* Pulsing ring effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 animate-ping"></div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Assistant IA Fiscal</h3>
                <p className="text-sm opacity-90">Expert comptabilité & fiscalité</p>
                <div className="flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1" />
                  <span className="text-xs opacity-75">Ressources officielles CRA & RQ</span>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-medium">IA Avancée</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {message.sender === 'bot' ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString('fr-CA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-500">Assistant IA réfléchit...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Guide d'utilisation et suggestions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="mb-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Fonctionnalités de l'Assistant IA</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• <strong>Ressources officielles</strong> : Liens directs vers CRA et Revenu Québec</li>
                      <li>• <strong>Calculateurs intégrés</strong> : Estimations fiscales précises</li>
                      <li>• <strong>Conseils personnalisés</strong> : Réponses adaptées à votre situation</li>
                      <li>• <strong>Mises à jour automatiques</strong> : Informations fiscales à jour</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-700 mb-3">Questions populaires :</h4>
              <div className="space-y-2">
                {suggestions.slice(0, 2).map((category, idx) => (
                  <div key={idx}>
                    <div className="flex items-center space-x-2 mb-2">
                      <category.icon className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-600">{category.category}</span>
                    </div>
                    <div className="space-y-1">
                      {category.suggestions.slice(0, 1).map((suggestion, sidx) => (
                        <button
                          key={sidx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left text-xs bg-white hover:bg-blue-50 text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question fiscale..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                Réponse IA instantanée
              </span>
              <span className="flex items-center">
                <Globe className="h-3 w-3 mr-1 text-blue-500" />
                Ressources officielles
              </span>
              <span className="flex items-center">
                <Shield className="h-3 w-3 mr-1 text-green-500" />
                100% confidentiel
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
