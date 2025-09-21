// Synchronisation Google Drive ↔ Google Sheets
import { google } from 'googleapis';

export const syncDriveToSheet = async (driveFolderId: string, sheetId: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-service-account.json',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets'
    ],
  });
  const drive = google.drive({ version: 'v3', auth });
  const sheets = google.sheets({ version: 'v4', auth });

  // Récupérer les fichiers du dossier Drive
  const files = await drive.files.list({ q: `'${driveFolderId}' in parents` });

  // Mettre à jour la feuille Google Sheets
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: 'Inventaire!A2',
    valueInputOption: 'RAW',
    requestBody: {
      values: files.data.files?.map(f => [f.name, f.id, f.webViewLink]) || [],
    },
  });
  return { success: true };
};
