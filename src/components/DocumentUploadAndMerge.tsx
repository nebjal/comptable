import React, { useState } from 'react';

export default function DocumentUploadAndMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleUploadAndMerge = async () => {
    if (files.length === 0) {
      setError('Veuillez sélectionner au moins un fichier.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));
    try {
      // Ajoute le folderId du client si besoin
      formData.append('folderId', 'VOTRE_ID_DOSSIER_CLIENT');
      const res = await fetch('/api/mergeDocumentsToPdf', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.driveLink) {
        setDriveLink(data.driveLink);
      } else {
        setError('Erreur lors de la fusion ou de l’upload Drive.');
      }
    } catch {
      setError('Erreur réseau ou serveur.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Téléverser et fusionner des documents</h2>
      <input
        type="file"
        multiple
        accept="application/pdf,image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUploadAndMerge}
        disabled={loading || files.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded font-bold mb-4"
      >
        {loading ? 'Fusion en cours...' : 'Fusionner en PDF'}
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {driveLink && (
        <div className="mt-4">
          <a href={driveLink} target="_blank" rel="noopener noreferrer" className="text-green-600 underline font-bold">
            Voir le PDF fusionné sur Google Drive
          </a>
        </div>
      )}
    </div>
  );
}
