// Gestion des clients et signataires avec Firestore
import { Firestore } from '@google-cloud/firestore';

// Initialize Firestore with environment variables
const projectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIRESTORE_PROJECT_ID;

if (!projectId) {
  console.warn('Firestore project ID not configured. Please set VITE_FIREBASE_PROJECT_ID or VITE_FIRESTORE_PROJECT_ID in environment variables.');
}

const firestore = projectId ? new Firestore({ projectId }) : null;

export const addOrUpdateClient = async (clientData: any) => {
  if (!firestore) {
    throw new Error('Firestore not initialized. Check environment configuration.');
  }
  
  const ref = firestore.collection('clients').doc(clientData.id);
  await ref.set(clientData, { merge: true });
  return { success: true };
};

export const getClient = async (id: string) => {
  if (!firestore) {
    throw new Error('Firestore not initialized. Check environment configuration.');
  }
  
  const doc = await firestore.collection('clients').doc(id).get();
  return doc.exists ? doc.data() : null;
};

export const searchClients = async (query: string) => {
  if (!firestore) {
    throw new Error('Firestore not initialized. Check environment configuration.');
  }
  
  const snapshot = await firestore.collection('clients').where('nom', '>=', query).where('nom', '<=', query + '\uf8ff').get();
  return snapshot.docs.map(doc => doc.data());
};
