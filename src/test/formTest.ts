// Test du formulaire client dynamique
// Ce fichier peut être utilisé pour tester les fonctionnalités du formulaire

import GoogleSheetsService from '../services/googleSheetsService';

// Test du service Google Sheets
const testGoogleSheetsService = async () => {
  console.log('🧪 Test du service Google Sheets...');

  const service = new GoogleSheetsService();

  // Test de sauvegarde
  const testData = {
    nom: 'Test',
    prenom: 'Client',
    email: 'test@example.com',
    progression: 50,
    dateCreation: new Date().toISOString()
  };

  try {
    await service.saveClientData('test@example.com', testData);
    console.log('✅ Sauvegarde réussie');
  } catch (error) {
    console.log('❌ Erreur lors de la sauvegarde:', error);
  }

  // Test de chargement
  try {
    const loadedData = await service.loadClientData('test@example.com');
    console.log('✅ Chargement réussi:', loadedData);
  } catch (error) {
    console.log('❌ Erreur lors du chargement:', error);
  }
};

// Test des fonctionnalités du formulaire
const testFormFeatures = () => {
  console.log('🧪 Test des fonctionnalités du formulaire...');

  // Test de validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log('✅ Validation email:', emailRegex.test('test@example.com'));

  // Test de validation téléphone
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  console.log('✅ Validation téléphone:', phoneRegex.test('5145551234'));

  // Test de calcul de progression
  const calculateProgression = (filledFields: number, totalFields: number) => {
    return Math.round((filledFields / totalFields) * 100);
  };
  console.log('✅ Calcul progression:', calculateProgression(8, 10), '%');
};

// Fonction principale de test
export const runTests = async () => {
  console.log('🚀 Démarrage des tests du formulaire client dynamique...\n');

  await testGoogleSheetsService();
  testFormFeatures();

  console.log('\n✨ Tests terminés !');
};

// Exporter pour utilisation dans la console du navigateur
if (typeof window !== 'undefined') {
  (window as { runFormTests?: typeof runTests }).runFormTests = runTests;
}

export default runTests;
