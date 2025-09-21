// Upload d'un fichier local vers Google Drive
import { google } from 'googleapis';
import fs from 'fs';

export const uploadToDrive = async (filePath: string, folderId: string, fileName: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, webViewLink',
  });
  return file.data;
};
