// Gestion des clients et signataires avec Firestore
import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore();

export const addOrUpdateClient = async (clientData: any) => {
  const ref = firestore.collection('clients').doc(clientData.id);
  await ref.set(clientData, { merge: true });
  return { success: true };
};

export const getClient = async (id: string) => {
  const doc = await firestore.collection('clients').doc(id).get();
  return doc.exists ? doc.data() : null;
};

export const searchClients = async (query: string) => {
  const snapshot = await firestore.collection('clients').where('nom', '>=', query).where('nom', '<=', query + '\uf8ff').get();
  return snapshot.docs.map(doc => doc.data());
};
