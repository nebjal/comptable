// Tri, renommage et rapport d'opérations Google Drive
import { google } from 'googleapis';

export const sortAndReportDriveFiles = async (folderId: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  // Exemple: Renommer tous les fichiers en ajoutant un préfixe
  const files = await drive.files.list({ q: `'${folderId}' in parents` });
  let report = '';
  for (const file of files.data.files || []) {
    const newName = 'A_SIGNER_' + file.name;
    await drive.files.update({ fileId: file.id!, requestBody: { name: newName } });
    report += `Renommé: ${file.name} → ${newName}\n`;
  }
  return { success: true, report };
};
