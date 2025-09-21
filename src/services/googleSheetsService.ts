interface ClientData {
  [key: string]: string | number | boolean | null | undefined;
}

interface ClientDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

class GoogleSheetsService {
  private spreadsheetId: string;
  private apiKey: string;

  constructor() {
    // En production, ces valeurs viendraient des variables d'environnement
    this.spreadsheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID || 'demo-sheet-id';
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY || 'demo-api-key';
  }

  async saveClientData(email: string, data: ClientData): Promise<void> {
    try {
      // Simulation de sauvegarde dans Google Sheets
      console.log('Sauvegarde des données client dans Google Sheets:', { email, data, spreadsheetId: this.spreadsheetId });

      // En production, ceci ferait un appel à l'API Google Sheets
      // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A:Z:append?valueInputOption=RAW&key=${this.apiKey}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     values: [Object.values(data)]
      //   })
      // });

      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Stocker localement pour la démonstration
      const existingData = this.getStoredData();
      existingData[email] = { ...data, lastUpdated: new Date().toISOString() };
      localStorage.setItem('clientData', JSON.stringify(existingData));

      console.log('Données sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw new Error('Impossible de sauvegarder les données');
    }
  }

  async loadClientData(email: string): Promise<ClientData | null> {
    try {
      // Simulation de chargement depuis Google Sheets
      console.log('Chargement des données client depuis Google Sheets:', { email, apiKey: this.apiKey });

      // En production, ceci ferait un appel à l'API Google Sheets
      // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A:Z?key=${this.apiKey}`);
      // const data = await response.json();

      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Récupérer depuis le stockage local pour la démonstration
      const storedData = this.getStoredData();
      const clientData = storedData[email];

      if (clientData) {
        console.log('Données chargées avec succès:', clientData);
        return clientData;
      }

      return null;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      throw new Error('Impossible de charger les données');
    }
  }

  async uploadDocument(email: string, file: File, documentType: string): Promise<string> {
    try {
      console.log('Téléchargement du document:', { email, fileName: file.name, documentType });

      // En production, ceci utiliserait Google Drive API
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`
      //   },
      //   body: formData
      // });

      // Simulation d'un délai d'upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Générer un ID de fichier simulé
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      console.log('Document téléchargé avec succès, ID:', fileId);
      return fileId;
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      throw new Error('Impossible de télécharger le document');
    }
  }

  async getClientDocuments(email: string): Promise<ClientDocument[]> {
    try {
      console.log('Récupération des documents client:', email);

      // En production, ceci ferait un appel à Google Drive API
      // const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`, {
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`
      //   }
      // });

      // Simulation
      await new Promise(resolve => setTimeout(resolve, 300));

      // Retourner des documents simulés
      return [
        {
          id: 'doc1',
          name: 'Pièce d\'identité',
          type: 'identity',
          uploadedAt: new Date().toISOString(),
          size: '2.5 MB'
        }
      ];
    } catch (error) {
      console.error('Erreur lors de la récupération des documents:', error);
      throw new Error('Impossible de récupérer les documents');
    }
  }

  private getStoredData(): { [email: string]: ClientData } {
    try {
      const data = localStorage.getItem('clientData');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Erreur lors de la lecture du stockage local:', error);
      return {};
    }
  }

  async createClientFolder(email: string): Promise<string> {
    try {
      console.log('Création du dossier client:', email);

      // En production, ceci créerait un dossier dans Google Drive
      // const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name: `Client_${email}`,
      //     mimeType: 'application/vnd.google-apps.folder',
      //     parents: [process.env.REACT_APP_CLIENT_FOLDER_ID]
      //   })
      // });

      // Simulation
      await new Promise(resolve => setTimeout(resolve, 500));

      const folderId = `folder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('Dossier créé avec succès, ID:', folderId);
      return folderId;
    } catch (error) {
      console.error('Erreur lors de la création du dossier:', error);
      throw new Error('Impossible de créer le dossier client');
    }
  }
}

export default GoogleSheetsService;
