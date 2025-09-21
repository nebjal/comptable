// Environment-based configuration loader for backend services
import * as fs from 'fs';
import * as path from 'path';

// Load configuration from environment variables or .env file
const loadConfig = () => {
  // Try to load from .env file if exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envLines = envFile.split('\n');
    
    envLines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key]) {
        process.env[key] = value.replace(/"/g, '');
      }
    });
  }

  return {
    google: {
      driveParentFolderId: process.env.VITE_GOOGLE_DRIVE_PARENT_FOLDER_ID || "",
      serviceAccountEmail: process.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      apiKey: process.env.VITE_GOOGLE_API_KEY || ""
    },
    firestore: {
      projectId: process.env.VITE_FIRESTORE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || "",
      clientEmail: process.env.VITE_FIRESTORE_CLIENT_EMAIL || "",
      privateKey: process.env.VITE_FIRESTORE_PRIVATE_KEY || ""
    },
    zoho: {
      accessToken: process.env.VITE_ZOHO_ACCESS_TOKEN || "",
      apiUrl: "https://sign.zoho.com/api/v1/requests"
    },
    sheets: {
      inventorySheetId: process.env.VITE_SHEETS_INVENTORY_SHEET_ID || "",
      apiKey: process.env.VITE_SHEETS_API_KEY || process.env.VITE_GOOGLE_API_KEY || ""
    },
    email: {
      sender: process.env.VITE_EMAIL_SENDER || "",
      password: process.env.VITE_EMAIL_PASSWORD || "",
      service: "gmail"
    }
  };
};

export default loadConfig();