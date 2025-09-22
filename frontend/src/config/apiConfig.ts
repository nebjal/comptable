// Centralisation des paramètres API pour Google OAuth, Google Cloud Storage, etc.

export interface ApiConfig {
  googleClientId: string;
  googleCloudBucket: string;
  googleCloudProjectId: string;
  apiBaseUrl: string;
  firestoreEnabled: boolean;
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

// Valeurs par défaut (à personnaliser dans l'interface admin)
// Configuration centralisée des APIs et services externes

export const apiConfig = {
  google: {
    driveParentFolderId: 'VOTRE_ID_DOSSIER_PARENT',
    serviceAccountEmail: 'drive-automation@votre-projet-id.iam.gserviceaccount.com',
    apiKey: 'VOTRE_API_KEY_GOOGLE',
  },
  firestore: {
    projectId: 'votre-projet-id',
    clientEmail: 'firestore-service@votre-projet-id.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n',
  },
  zoho: {
    accessToken: 'VOTRE_TOKEN_ZOHO',
    apiUrl: 'https://sign.zoho.com/api/v1/requests',
  },
  sheets: {
    inventorySheetId: 'VOTRE_ID_FEUILLE_INVENTAIRE',
    apiKey: 'VOTRE_API_KEY_SHEETS',
  },
  email: {
    sender: 'ton.email@gmail.com',
    password: 'motdepasse',
    service: 'gmail',
  },
};

export default apiConfig;
