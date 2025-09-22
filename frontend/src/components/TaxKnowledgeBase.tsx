// Base de connaissances pour Revenu Canada et Revenu Québec
export interface TaxResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
  jurisdiction: 'federal' | 'quebec' | 'both';
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TaxCalculation {
  type: string;
  formula: string;
  description: string;
  example: string;
  jurisdiction: 'federal' | 'quebec' | 'both';
}

export const CRA_RESOURCES: TaxResource[] = [
  {
    id: 'cra-t1-guide',
    title: 'Guide de la déclaration d\'impôt des particuliers T1',
    description: 'Guide complet pour préparer votre déclaration d\'impôt T1',
    url: 'https://www.canada.ca/fr/agence-revenu/services/impot/impot-particuliers/guide-preparation-declaration-impot-particuliers.html',
    category: 'déclarations',
    keywords: ['déclaration', 't1', 'impôt', 'revenus', 'guide'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'cra-credits',
    title: 'Crédits d\'impôt pour particuliers',
    description: 'Liste complète des crédits d\'impôt disponibles',
    url: 'https://www.canada.ca/fr/agence-revenu/services/impot/impot-particuliers/credits-impot-particuliers.html',
    category: 'crédits',
    keywords: ['crédits', 'impôt', 'réduction', 'enfants', 'études'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'cra-business',
    title: 'Impôt des entreprises',
    description: 'Guide pour les propriétaires d\'entreprise',
    url: 'https://www.canada.ca/fr/agence-revenu/services/impot/impot-entreprises.html',
    category: 'entreprises',
    keywords: ['entreprise', 'corporation', 'impôt', 'business'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'cra-gst-hst',
    title: 'TPS/TVH',
    description: 'Guide de la taxe sur les produits et services',
    url: 'https://www.canada.ca/fr/agence-revenu/services/impot/tps-tvh-entreprises.html',
    category: 'tps',
    keywords: ['tps', 'tvq', 'taxe', 'ventes', 'gst', 'hst'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'cra-calculator',
    title: 'Calculateur d\'impôt',
    description: 'Calculez votre impôt fédéral estimé',
    url: 'https://www.canada.ca/fr/agence-revenu/services/impot/impot-particuliers/calculateur-impot.html',
    category: 'calculateurs',
    keywords: ['calculateur', 'estimation', 'impôt', 'revenus'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'medium'
  },
  {
    id: 'cra-forms',
    title: 'Formulaires et publications',
    description: 'Tous les formulaires fiscaux disponibles',
    url: 'https://www.canada.ca/fr/agence-revenu/services/formulaires-publications.html',
    category: 'formulaires',
    keywords: ['formulaires', 'publications', 'documents'],
    jurisdiction: 'federal',
    lastUpdated: '2024-01-01',
    priority: 'medium'
  }
];

export const RQ_RESOURCES: TaxResource[] = [
  {
    id: 'rq-income-tax',
    title: 'Impôt sur le revenu',
    description: 'Guide de l\'impôt sur le revenu des particuliers',
    url: 'https://www.revenuquebec.ca/fr/impot-sur-le-revenu/',
    category: 'déclarations',
    keywords: ['impôt', 'revenu', 'québec', 'déclaration'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'rq-taxes-credits',
    title: 'Crédits d\'impôt',
    description: 'Crédits d\'impôt disponibles au Québec',
    url: 'https://www.revenuquebec.ca/fr/impot-sur-le-revenu/credits-dimpot/',
    category: 'crédits',
    keywords: ['crédits', 'impôt', 'québec', 'réduction'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'rq-tvq',
    title: 'Taxe de vente du Québec (TVQ)',
    description: 'Guide complet de la TVQ',
    url: 'https://www.revenuquebec.ca/fr/taxes/taxe-de-vente-du-quebec-tvq/',
    category: 'tvq',
    keywords: ['tvq', 'taxe', 'vente', 'québec'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'rq-business',
    title: 'Entreprises et impôt',
    description: 'Information fiscale pour les entreprises',
    url: 'https://www.revenuquebec.ca/fr/entreprises/',
    category: 'entreprises',
    keywords: ['entreprise', 'impôt', 'québec', 'business'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'high'
  },
  {
    id: 'rq-calculator',
    title: 'Calculateur d\'impôt',
    description: 'Calculez votre impôt provincial',
    url: 'https://www.revenuquebec.ca/fr/impot-sur-le-revenu/calculateur-dimpot/',
    category: 'calculateurs',
    keywords: ['calculateur', 'estimation', 'impôt', 'québec'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'medium'
  },
  {
    id: 'rq-forms',
    title: 'Formulaires fiscaux',
    description: 'Formulaires et guides de Revenu Québec',
    url: 'https://www.revenuquebec.ca/fr/formulaires/',
    category: 'formulaires',
    keywords: ['formulaires', 'guides', 'documents', 'québec'],
    jurisdiction: 'quebec',
    lastUpdated: '2024-01-01',
    priority: 'medium'
  }
];

export const TAX_CALCULATIONS: TaxCalculation[] = [
  {
    type: 'federal-income-tax',
    formula: 'Impôt fédéral = (Revenus - Déductions) × Taux marginal',
    description: 'Calcul de l\'impôt fédéral sur le revenu',
    example: 'Pour un revenu de 75 000 $, l\'impôt fédéral serait d\'environ 12 500 $',
    jurisdiction: 'federal'
  },
  {
    type: 'quebec-income-tax',
    formula: 'Impôt provincial = (Revenus - Déductions) × Taux marginal provincial',
    description: 'Calcul de l\'impôt provincial du Québec',
    example: 'Pour un revenu de 75 000 $, l\'impôt provincial serait d\'environ 8 500 $',
    jurisdiction: 'quebec'
  },
  {
    type: 'gst-hst',
    formula: 'TPS/TVH = Montant HT × Taux applicable',
    description: 'Calcul de la TPS/TVH (5% fédéral, 13% combiné dans certaines provinces)',
    example: 'Pour un achat de 100 $, la TPS serait de 5 $',
    jurisdiction: 'federal'
  },
  {
    type: 'tvq',
    formula: 'TVQ = Montant HT × 9.975%',
    description: 'Calcul de la taxe de vente du Québec',
    example: 'Pour un achat de 100 $, la TVQ serait de 9.98 $',
    jurisdiction: 'quebec'
  },
  {
    type: 'cpp-contribution',
    formula: 'RPC = Salaire × 5.95% (maximum 3 500 $)',
    description: 'Contribution au Régime de pensions du Canada',
    example: 'Pour un salaire de 60 000 $, la contribution RPC serait de 2 850 $',
    jurisdiction: 'federal'
  },
  {
    type: 'ei-premium',
    formula: 'AE = Salaire × 1.63% (maximum 1 002.45 $)',
    description: 'Prime d\'assurance-emploi',
    example: 'Pour un salaire de 60 000 $, la prime AE serait de 979.80 $',
    jurisdiction: 'federal'
  }
];

export const TAX_DEADLINES = {
  federal: {
    'T1': '30 avril',
    'T2': '15 juin (sociétés)',
    'GST/HST': 'Mensuel ou trimestriel selon le volume',
    'Payroll': '15 du mois suivant'
  },
  quebec: {
    'Income Tax': '30 avril',
    'TVQ': 'Mensuel ou trimestriel selon le volume',
    'Payroll': '15 du mois suivant'
  }
};

export const COMMON_DEDUCTIONS = {
  federal: [
    'RER (jusqu\'à 31 560 $ en 2024)',
    'Frais de bureau à domicile',
    'Dons de charité (jusqu\'à 200 $)',
    'Frais médicaux (seuil de 2 397 $)',
    'Intérêts sur prêt étudiant',
    'Frais de déménagement'
  ],
  quebec: [
    'RER (même que fédéral)',
    'Frais de garde d\'enfants',
    'Cotisations syndicales',
    'Frais médicaux (seuil de 1 200 $)',
    'Intérêts sur prêt étudiant',
    'Dons de charité (crédit additionnel)'
  ]
};

export const BUSINESS_DEDUCTIONS = [
  'Salaires et avantages sociaux',
  'Loyer commercial',
  'Équipement et amortissement',
  'Fournitures de bureau',
  'Frais de véhicule (si utilisé pour affaires)',
  'Marketing et publicité',
  'Assurances commerciales',
  'Frais professionnels (compta, avocat)',
  'Intérêts sur emprunt d\'affaires'
];

// Fonction pour rechercher des ressources pertinentes
export function searchResources(query: string, jurisdiction?: 'federal' | 'quebec' | 'both'): TaxResource[] {
  const allResources = [...CRA_RESOURCES, ...RQ_RESOURCES];
  const searchTerms = query.toLowerCase().split(' ');

  const filteredResources = allResources.filter(resource => {
    if (jurisdiction && jurisdiction !== 'both' && resource.jurisdiction !== jurisdiction) {
      return false;
    }

    return searchTerms.some(term =>
      resource.title.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term) ||
      resource.keywords.some(keyword => keyword.toLowerCase().includes(term))
    );
  });

  // Trier par priorité
  filteredResources.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return filteredResources.slice(0, 5); // Retourner les 5 plus pertinentes
}

// Fonction pour obtenir des suggestions basées sur le contexte
export function getContextualSuggestions(context: string): string[] {
  const contextLower = context.toLowerCase();

  if (contextLower.includes('déclaration') || contextLower.includes('impôt')) {
    return [
      'Guide de préparation de la déclaration T1',
      'Liste des crédits d\'impôt disponibles',
      'Calculateur d\'impôt fédéral',
      'Formulaires fiscaux à télécharger'
    ];
  }

  if (contextLower.includes('entreprise') || contextLower.includes('business')) {
    return [
      'Guide de l\'impôt des entreprises',
      'Incorporation d\'entreprise',
      'TPS/TVH pour entreprises',
      'Déductions d\'affaires'
    ];
  }

  if (contextLower.includes('tps') || contextLower.includes('tvq') || contextLower.includes('taxe')) {
    return [
      'Guide de la TPS/TVH',
      'Guide de la TVQ',
      'Calculateur de taxes',
      'Déclarations de taxes'
    ];
  }

  if (contextLower.includes('paie') || contextLower.includes('salaire')) {
    return [
      'Guide de la paie',
      'Déductions à la source',
      'Formulaires T4',
      'Cotisations sociales'
    ];
  }

  return [
    'Guide de la déclaration d\'impôt',
    'Crédits d\'impôt disponibles',
    'Impôt des entreprises',
    'TPS/TVH et TVQ'
  ];
}

// Fonction pour obtenir des calculs fiscaux pertinents
export function getRelevantCalculations(query: string): TaxCalculation[] {
  const queryLower = query.toLowerCase();

  if (queryLower.includes('impôt') || queryLower.includes('revenu')) {
    return TAX_CALCULATIONS.filter(calc =>
      calc.type.includes('income-tax') || calc.type.includes('federal') || calc.type.includes('quebec')
    );
  }

  if (queryLower.includes('tps') || queryLower.includes('tvq') || queryLower.includes('taxe')) {
    return TAX_CALCULATIONS.filter(calc =>
      calc.type.includes('gst') || calc.type.includes('tvq') || calc.type.includes('hst')
    );
  }

  if (queryLower.includes('paie') || queryLower.includes('salaire') || queryLower.includes('cpp') || queryLower.includes('ae')) {
    return TAX_CALCULATIONS.filter(calc =>
      calc.type.includes('cpp') || calc.type.includes('ei')
    );
  }

  return TAX_CALCULATIONS.slice(0, 3);
}
