import React, { useState, useEffect } from 'react';
// ...existing code...
import apiConfig, { ApiConfig } from '../config/apiConfig';

const SettingsAPI: React.FC = () => {
  const [testResults, setTestResults] = useState<{[key: string]: string}>({});

  const handleTestConnection = async (service: string) => {
    setTestResults(prev => ({ ...prev, [service]: 'Test en cours...' }));
    try {
      const res = await fetch('/api/testApiConnection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResults(prev => ({ ...prev, [service]: '✅ Connexion réussie' }));
      } else {
        setTestResults(prev => ({ ...prev, [service]: `❌ Erreur : ${data.error || 'Connexion impossible'}` }));
      }
    } catch {
      setTestResults(prev => ({ ...prev, [service]: '❌ Erreur réseau ou serveur' }));
    }
  };
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/backend/apiConfig.json')
      .then(res => res.json())
      .then(data => setConfig(data));
  }, []);

  const handleChange = (section: string, key: string, value: string) => {
    setConfig((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/saveApiConfig', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    const data = await res.json();
    if (data.success) setMessage('Configuration enregistrée !');
    else setMessage('Erreur lors de la sauvegarde.');
    setLoading(false);
  };

  if (!config) return <div>Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Paramètres API</h2>
      {/* Section Excel Clients */}
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-blue-600">Fichier Excel Clients</h3>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm mb-1">Chemin ou ID du fichier Excel</label>
          <input
            type="text"
            value={config?.excelClientsFile || ''}
            onChange={e => handleChange('excelClientsFileSection', 'excelClientsFile', e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Ex: /public/clients.xlsx ou ID Google Drive"
          />
        </div>
      </div>
      {/* Sections API dynamiques */}
      {Object.keys(config).filter(section => section !== 'excelClientsFileSection').map(section => (
        <div key={section} className="mb-6">
          <h3 className="font-bold mb-2 text-blue-600">{section}</h3>
          {Object.keys(config[section]).map(key => (
            <div key={key} className="mb-2">
              <label className="block text-gray-700 text-sm mb-1">{key}</label>
              <input
                type="text"
                value={config[section][key]}
                onChange={e => handleChange(section, key, e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
          <button
            onClick={() => handleTestConnection(section)}
            className="bg-gray-200 text-blue-700 px-4 py-1 rounded font-bold mt-2"
          >
            Tester la connexion
          </button>
          {testResults[section] && (
            <div className="mt-2 text-sm font-bold">{testResults[section]}</div>
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded font-bold"
      >
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
      {message && <div className="mt-4 text-green-600 font-bold">{message}</div>}
    </div>
  );
// ...rien à la place, suppression de l'accolade fermante en trop...
};

export default SettingsAPI;
