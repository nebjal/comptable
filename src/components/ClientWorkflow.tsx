import React, { useState } from 'react';

export default function ClientWorkflow() {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [zohoStatus, setZohoStatus] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWorkflow = async () => {
    setLoading(true);
    try {
      // 1. Création client Firestore
      await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: clientId, nom: clientName, email: clientEmail }),
      });

      // 2. Création dossier Drive
      const driveRes = await fetch('/api/createClientFolder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientEmail, clientName, type: 'particulier' }),
      });
      const driveData = await driveRes.json();
      setDriveLink(driveData.link);

      // 3. Attribution permissions (déjà fait dans createClientFolder)

      // 4. Envoi pour signature Zoho
      const zohoRes = await fetch('/api/sendZohoSignature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentUrl: driveData.link, signerEmail: clientEmail, signerName: clientName }),
      });
      const zohoData = await zohoRes.json();
      setZohoStatus(zohoData.status || 'Demande envoyée');

      // 5. Rapport d'opérations (tri/renommage)
      const reportRes = await fetch('/api/sortAndReportDriveFiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId: driveData.folderId }),
      });
      const reportData = await reportRes.json();
      setReport(reportData.report);
    } catch (e) {
      setReport('Erreur dans le workflow.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Workflow Client Complet</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ID Client"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Nom Client"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email Client"
          value={clientEmail}
          onChange={e => setClientEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleWorkflow}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded font-bold mb-4"
      >
        {loading ? 'Traitement...' : 'Lancer le workflow'}
      </button>
      {driveLink && (
        <div className="mb-2">
          <strong>Dossier Drive :</strong> <a href={driveLink} target="_blank" rel="noopener noreferrer">{driveLink}</a>
        </div>
      )}
      {zohoStatus && (
        <div className="mb-2">
          <strong>Signature Zoho :</strong> {zohoStatus}
        </div>
      )}
      {report && (
        <div className="mb-2">
          <strong>Rapport d'opérations :</strong>
          <pre className="bg-gray-100 p-2 rounded mt-1">{report}</pre>
        </div>
      )}
    </div>
  );
}
