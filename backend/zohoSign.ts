// Intégration Zoho Sign pour la signature électronique
import axios from 'axios';

export const sendZohoSignature = async (documentUrl: string, signerEmail: string, signerName: string) => {
  // Remplace par tes vraies clés Zoho
  const ZOHO_ACCESS_TOKEN = 'VOTRE_TOKEN_ZOHO';
  const ZOHO_API_URL = 'https://sign.zoho.com/api/v1/requests';

  const payload = {
    request_name: 'Signature Document',
    actions: [
      {
        recipient_email: signerEmail,
        recipient_name: signerName,
        action_type: 'SIGN',
      }
    ],
    files: [
      {
        file_url: documentUrl,
      }
    ]
  };

  const response = await axios.post(ZOHO_API_URL, payload, {
    headers: {
      Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
