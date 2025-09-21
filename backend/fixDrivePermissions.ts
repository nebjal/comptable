// Correction des permissions Google Drive
import { google } from 'googleapis';

export const fixDrivePermissions = async (fileId: string, email: string, role: 'reader' | 'writer') => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  // Supprimer toutes les permissions existantes
  const perms = await drive.permissions.list({ fileId });
  for (const perm of perms.data.permissions || []) {
    if (perm.id && perm.emailAddress !== email) {
      await drive.permissions.delete({ fileId, permissionId: perm.id });
    }
  }
  // Ajouter la permission correcte
  await drive.permissions.create({
    fileId,
    resource: { type: 'user', role, emailAddress: email },
    sendNotificationEmail: false,
  });
  return { success: true };
};
