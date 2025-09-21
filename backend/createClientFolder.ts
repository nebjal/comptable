import { google } from 'googleapis';
import nodemailer from 'nodemailer';

interface ClientData {
  clientEmail: string;
  clientName: string;
  type: 'particulier' | 'compagnie';
}

export const createClientFolder = async (data: ClientData) => {
  // Authentification Google Drive
  const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/drive-service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  // Création du dossier
  const folderMetadata = {
    name: `${data.clientName} - ${data.type}`,
    mimeType: 'application/vnd.google-apps.folder',
    parents: ['ID_DOSSIER_PARENT'], // Remplacer par l'ID du dossier parent
  };
  const folder = await drive.files.create({
    resource: folderMetadata,
    fields: 'id, webViewLink',
  });

  // Attribution des permissions
  await drive.permissions.create({
    fileId: folder.data.id!,
    resource: {
      type: 'user',
      role: 'writer', // ou 'reader'
      emailAddress: data.clientEmail,
    },
    sendNotificationEmail: true,
  });

  // Envoi d’email (exemple avec nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ton.email@gmail.com',
      pass: 'motdepasse',
    },
  });
  await transporter.sendMail({
    from: 'ton.email@gmail.com',
    to: data.clientEmail,
    subject: 'Accès à votre dossier sécurisé',
    html: `Bonjour ${data.clientName},<br>Votre dossier est prêt : <a href="${folder.data.webViewLink}">Accéder au dossier</a>`,
  });

  return { folderId: folder.data.id, link: folder.data.webViewLink };
};
