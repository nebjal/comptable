// Route pour tester la connexion aux APIs
app.post('/api/testApiConnection', async (req, res) => {
  const { service } = req.body;
  const apiConfig = getApiConfig();
  try {
    let result = false;
    if (service === 'google') {
      // Test Google Drive
      const { google } = require('googleapis');
      const auth = new google.auth.GoogleAuth({
        keyFile: 'backend/drive-service-account.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      const drive = google.drive({ version: 'v3', auth });
      await drive.files.list({ pageSize: 1 });
      result = true;
    } else if (service === 'firestore') {
      // Test Firestore
      const { Firestore } = require('@google-cloud/firestore');
      const firestore = new Firestore();
      await firestore.listCollections();
      result = true;
    } else if (service === 'zoho') {
      // Test Zoho Sign
      const axios = require('axios');
      const response = await axios.get(apiConfig.zoho.apiUrl, {
        headers: { Authorization: `Zoho-oauthtoken ${apiConfig.zoho.accessToken}` },
      });
      result = response.status === 200;
    } else if (service === 'sheets') {
      // Test Google Sheets
      const { google } = require('googleapis');
      const auth = new google.auth.GoogleAuth({
        keyFile: 'backend/drive-service-account.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const sheets = google.sheets({ version: 'v4', auth });
      await sheets.spreadsheets.get({ spreadsheetId: apiConfig.sheets.inventorySheetId });
      result = true;
    } else if (service === 'email') {
      // Test Email (Nodemailer)
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: apiConfig.email.service,
        auth: {
          user: apiConfig.email.sender,
          pass: apiConfig.email.password,
        },
      });
      await transporter.verify();
      result = true;
    }
    res.json({ success: result });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
import fs from 'fs';
function getApiConfig() {
  return JSON.parse(fs.readFileSync('backend/apiConfig.json', 'utf-8'));
}
// Route pour sauvegarder la configuration API
app.post('/api/saveApiConfig', async (req, res) => {
  try {
    fs.writeFileSync('backend/apiConfig.json', JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde de la configuration.' });
  }
});
import multer from 'multer';
import path from 'path';
import { mergeDocumentsToPdf } from './mergeDocumentsToPdf';
import { uploadToDrive } from './uploadToDrive';
// Configurer multer pour le téléversement de fichiers
const upload = multer({ dest: 'uploads/' });
// Route pour fusionner plusieurs fichiers en un seul PDF
app.post('/api/mergeDocumentsToPdf', upload.array('documents'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const filePaths = files.map(f => f.path);
    const outputPath = path.join('uploads', `merged_${Date.now()}.pdf`);
    const result = await mergeDocumentsToPdf(filePaths, outputPath);

    // Récupérer le folderId du client (à adapter selon ton workflow, ici via req.body)
    const folderId = req.body.folderId || 'VOTRE_ID_DOSSIER_CLIENT';
    const fileName = `Documents_fusionnes_${Date.now()}.pdf`;
    const driveFile = await uploadToDrive(outputPath, folderId, fileName);

    res.json({ success: true, driveLink: driveFile.webViewLink });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la fusion ou de l’upload Drive.' });
  }
});
import express from 'express';
import cors from 'cors';
import { createClientFolder } from './createClientFolder';
import { addOrUpdateClient, getClient, searchClients } from './firestoreClientManager';
import { syncDriveToSheet } from './syncDriveToSheet';
import { fixDrivePermissions } from './fixDrivePermissions';
import { sortAndReportDriveFiles } from './sortAndReportDriveFiles';
import { robotAutoWorkflow } from './robotAutoWorkflow';
import { sendZohoSignature } from './zohoSign';

const app = express();
app.use(cors());
app.use(express.json());


// Création dossier client Drive
app.post('/api/createClientFolder', async (req, res) => {
  try {
  const apiConfig = getApiConfig();
  const result = await createClientFolder({ ...req.body, apiConfig });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur ou Google Drive.' });
  }
});

// Firestore: ajout/mise à jour client
app.post('/api/client', async (req, res) => {
  try {
    const result = await addOrUpdateClient(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur Firestore.' });
  }
});

// Firestore: récupération client
app.get('/api/client/:id', async (req, res) => {
  try {
    const result = await getClient(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur Firestore.' });
  }
});

// Firestore: recherche clients
app.get('/api/searchClients', async (req, res) => {
  try {
    const result = await searchClients(req.query.q as string);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur Firestore.' });
  }
});

// Synchronisation Drive ↔ Sheets
app.post('/api/syncDriveToSheet', async (req, res) => {
  try {
    const { driveFolderId, sheetId } = req.body;
  const apiConfig = getApiConfig();
  const result = await syncDriveToSheet(driveFolderId, sheetId, apiConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur synchronisation.' });
  }
});

// Correction permissions Drive
app.post('/api/fixDrivePermissions', async (req, res) => {
  try {
    const { fileId, email, role } = req.body;
  const apiConfig = getApiConfig();
  const result = await fixDrivePermissions(fileId, email, role, apiConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur permissions.' });
  }
});

// Tri/renommage/rapport Drive
app.post('/api/sortAndReportDriveFiles', async (req, res) => {
  try {
    const { folderId } = req.body;
  const apiConfig = getApiConfig();
  const result = await sortAndReportDriveFiles(folderId, apiConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur tri/rapport.' });
  }
});

// Robot workflow automatisé
app.post('/api/robotAutoWorkflow', async (req, res) => {
  try {
    const { clientId } = req.body;
  const apiConfig = getApiConfig();
  const result = await robotAutoWorkflow(clientId, apiConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur robot.' });
  }
});

// Zoho Sign: envoi pour signature
app.post('/api/sendZohoSignature', async (req, res) => {
  try {
    const { documentUrl, signerEmail, signerName } = req.body;
  const apiConfig = getApiConfig();
  const result = await sendZohoSignature(documentUrl, signerEmail, signerName, apiConfig);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erreur Zoho Sign.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
