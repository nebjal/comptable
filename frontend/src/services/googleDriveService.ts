// Google Drive API Service for document management
// This service handles integration with Google Drive for secure document storage and retrieval

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  modifiedTime: string;
  webContentLink?: string;
  thumbnailLink?: string;
  parents?: string[];
}

interface GoogleDriveFolder {
  id: string;
  name: string;
  mimeType: 'application/vnd.google-apps.folder';
  parents?: string[];
}

class GoogleDriveService {
  private apiKey: string;
  private clientId: string;
  private baseUrl = 'https://www.googleapis.com/drive/v3';

  constructor() {
    // In production, these would come from environment variables
    this.apiKey = import.meta.env.VITE_GOOGLE_API_KEY || 'demo_api_key';
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo_client_id';
  }

  // Initialize Google API client
  async initialize(): Promise<void> {
    try {
      // Load Google API script dynamically
      await this.loadGoogleApiScript();

      // Initialize the Google API client
      await window.gapi.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file'
      });

      console.log('Google Drive API initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Drive API:', error);
      throw new Error('Google Drive initialization failed');
    }
  }

  // Load Google API script
  private loadGoogleApiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          resolve();
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Authenticate user
  async authenticate(): Promise<void> {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Google authentication failed');
    }
  }

  // Get client documents folder
  async getClientDocumentsFolder(clientId: string): Promise<GoogleDriveFolder | null> {
    try {
      const response = await window.gapi.client.drive.files.list({
        q: `name = '${clientId}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, mimeType, parents)',
        spaces: 'drive'
      });

      const folders = response.result.files;
      return folders && folders.length > 0 ? folders[0] as GoogleDriveFolder : null;
    } catch (error) {
      console.error('Failed to get client folder:', error);
      return null;
    }
  }

  // Create client documents folder if it doesn't exist
  async createClientDocumentsFolder(clientId: string): Promise<GoogleDriveFolder> {
    try {
      const fileMetadata = {
        name: clientId,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER || 'root']
      };

      const response = await window.gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: 'id,name,mimeType,parents'
      });

      return response.result as GoogleDriveFolder;
    } catch (error) {
      console.error('Failed to create client folder:', error);
      throw new Error('Could not create client documents folder');
    }
  }

  // List documents in client's folder
  async listClientDocuments(clientId: string): Promise<GoogleDriveFile[]> {
    try {
      let folder = await this.getClientDocumentsFolder(clientId);

      if (!folder) {
        folder = await this.createClientDocumentsFolder(clientId);
      }

      const response = await window.gapi.client.drive.files.list({
        q: `'${folder.id}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType, size, modifiedTime, webContentLink, thumbnailLink)',
        orderBy: 'modifiedTime desc'
      });

      return response.result.files as GoogleDriveFile[];
    } catch (error) {
      console.error('Failed to list client documents:', error);
      return [];
    }
  }

  // Download document from Google Drive
  async downloadDocument(fileId: string): Promise<Blob> {
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      // Convert response to Blob
      const blob = new Blob([response.body], { type: response.headers['content-type'] || 'application/octet-stream' });
      return blob;
    } catch (error) {
      console.error('Failed to download document:', error);
      throw new Error('Document download failed');
    }
  }

  // Get document URL for viewing (creates a temporary view URL)
  async getDocumentUrl(fileId: string): Promise<string | null> {
    try {
      // Get file metadata including webContentLink
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'webContentLink, webViewLink, thumbnailLink'
      });

      const file = response.result;

      // Return webContentLink if available, otherwise webViewLink
      if (file.webContentLink) {
        return file.webContentLink;
      } else if (file.webViewLink) {
        return file.webViewLink;
      }

      // If no direct link available, create a blob URL from download
      const blob = await this.downloadDocument(fileId);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to get document URL:', error);
      return null;
    }
  }

  // Upload document to client's folder
  async uploadDocument(clientId: string, file: File, folderName: string = 'DocumentsTelecharges'): Promise<GoogleDriveFile> {
    try {
      let clientFolder = await this.getClientDocumentsFolder(clientId);

      if (!clientFolder) {
        clientFolder = await this.createClientDocumentsFolder(clientId);
      }

      // Create or get subfolder
      const subfolder = await this.getOrCreateSubfolder(clientFolder.id, folderName);

      // Convert file to PDF if needed (simulation)
      const pdfFile = await this.convertToPDF(file);

      const fileMetadata = {
        name: pdfFile.name,
        parents: [subfolder.id]
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
      form.append('file', pdfFile);

      const response = await fetch(`${this.baseUrl}/files?uploadType=multipart`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${window.gapi.auth.getToken().access_token}`
        },
        body: form
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      return result as GoogleDriveFile;
    } catch (error) {
      console.error('Failed to upload document:', error);
      throw new Error('Document upload failed');
    }
  }

  // Get or create subfolder
  private async getOrCreateSubfolder(parentId: string, folderName: string): Promise<GoogleDriveFolder> {
    try {
      // Check if subfolder exists
      const response = await window.gapi.client.drive.files.list({
        q: `name = '${folderName}' and '${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, mimeType, parents)'
      });

      if (response.result.files && response.result.files.length > 0) {
        return response.result.files[0] as GoogleDriveFolder;
      }

      // Create subfolder
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId]
      };

      const createResponse = await window.gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: 'id,name,mimeType,parents'
      });

      return createResponse.result as GoogleDriveFolder;
    } catch (error) {
      console.error('Failed to get/create subfolder:', error);
      throw new Error('Subfolder creation failed');
    }
  }

  // Convert file to PDF (simulation)
  private async convertToPDF(file: File): Promise<File> {
    // In a real implementation, this would use a PDF conversion service
    // For now, we'll simulate the conversion by renaming the file
    if (file.type === 'application/pdf') {
      return file;
    }

    // Simulate conversion delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create a new file with PDF extension (simulation)
    const pdfBlob = new Blob([await file.arrayBuffer()], { type: 'application/pdf' });
    const pdfFileName = file.name.replace(/\.[^/.]+$/, '') + '.pdf';

    return new File([pdfBlob], pdfFileName, { type: 'application/pdf' });
  }

  // Create signature request folder
  async createSignatureRequestFolder(clientId: string): Promise<GoogleDriveFolder> {
    try {
      let clientFolder = await this.getClientDocumentsFolder(clientId);

      if (!clientFolder) {
        clientFolder = await this.createClientDocumentsFolder(clientId);
      }

      return await this.getOrCreateSubfolder(clientFolder.id, 'DocumentsASigner');
    } catch (error) {
      console.error('Failed to create signature request folder:', error);
      throw new Error('Signature request folder creation failed');
    }
  }

  // Move signed document to signed folder
  async moveToSignedFolder(clientId: string, fileId: string): Promise<void> {
    try {
      const clientFolder = await this.getClientDocumentsFolder(clientId);

      if (!clientFolder) {
        throw new Error('Client folder not found');
      }

      const signedFolder = await this.getOrCreateSubfolder(clientFolder.id, 'DocumentsSignes');

      // Move file to signed folder
      await window.gapi.client.drive.files.update({
        fileId: fileId,
        addParents: signedFolder.id,
        removeParents: clientFolder.id,
        fields: 'id, parents'
      });
    } catch (error) {
      console.error('Failed to move signed document:', error);
      throw new Error('Could not move signed document');
    }
  }
}

// Extend window interface for Google API
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi: any;
  }
}

export default GoogleDriveService;
