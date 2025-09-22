import { useState, useEffect } from 'react';

// Types pour les données de l'application
interface Client {
  id: string;
  nom: string;
  raisonSociale: string;
  type: 'entreprise' | 'travailleur_autonome' | 'particulier';
  neq: string;
  tpsTvq: string;
  adresse: string;
  email: string;
  telephone: string;
  status: 'actif' | 'inactif' | 'suspendu';
  dateFinExercice: string;
  documentsCount: number;
  signaturesEnAttente: number;
}

interface Document {
  id: string;
  name: string;
  type: 'facture' | 'releve_bancaire' | 'bulletin_paie' | 'declaration_fiscale' | 'contrat' | 'autre';
  client: string;
  clientId: string;
  dateRecu: string;
  dateTraitement?: string;
  status: 'en_attente' | 'en_cours' | 'traite' | 'archive';
  taille: string;
  format: string;
  ocrStatus: 'en_cours' | 'complete' | 'erreur' | 'non_requis';
  metadonnees: {
    montant?: number;
    devise?: string;
    dateDocument?: string;
    numeroReference?: string;
  };
}

interface Signature {
  id: string;
  documentName: string;
  documentType: string;
  clientName: string;
  clientId: string;
  dateCreation: string;
  dateEcheance: string;
  dateSignature?: string;
  status: 'en_attente' | 'signe' | 'refuse' | 'expire';
  typeSignature: 'simple' | 'avancee' | 'qualifiee';
  methodAuth: string;
  preuveAudit?: string;
}

interface Communication {
  id: string;
  type: 'message' | 'email' | 'appel';
  sujet: string;
  contenu: string;
  clientName: string;
  clientId: string;
  dateEnvoi: string;
  statut: 'envoye' | 'lu' | 'repondu';
  priority: 'normal' | 'urgent' | 'faible';
  attachments?: number;
}

export function useData() {
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    // Données mockées pour la démonstration
    const mockClients: Client[] = [
      {
        id: 'c1',
        nom: 'Entreprise ABC Inc.',
        raisonSociale: 'ABC Technologies Inc.',
        type: 'entreprise',
        neq: '1234567890',
        tpsTvq: '123456789RT0001',
        adresse: '123 Rue Saint-Jacques, Montréal, QC H3C 1G4',
        email: 'contact@abc-tech.ca',
        telephone: '(514) 555-0123',
        status: 'actif',
        dateFinExercice: '2025-12-31',
        documentsCount: 45,
        signaturesEnAttente: 2
      },
      {
        id: 'c2',
        nom: 'Restaurant XYZ',
        raisonSociale: 'Restaurant XYZ Ltée',
        type: 'entreprise',
        neq: '2345678901',
        tpsTvq: '234567890RT0001',
        adresse: '456 Boulevard René-Lévesque, Québec, QC G1R 2B2',
        email: 'info@restaurant-xyz.qc.ca',
        telephone: '(418) 555-0456',
        status: 'actif',
        dateFinExercice: '2025-12-31',
        documentsCount: 32,
        signaturesEnAttente: 0
      },
      {
        id: 'c3',
        nom: 'Consultation DEF',
        raisonSociale: 'DEF Consultation',
        type: 'travailleur_autonome',
        neq: '3456789012',
        tpsTvq: '345678901RT0001',
        adresse: '789 Rue Sherbrooke, Sherbrooke, QC J1H 1Z1',
        email: 'def.consultation@email.ca',
        telephone: '(819) 555-0789',
        status: 'actif',
        dateFinExercice: '2025-12-31',
        documentsCount: 18,
        signaturesEnAttente: 1
      },
      {
        id: 'c4',
        nom: 'Services GHI',
        raisonSociale: 'GHI Services Professionnels',
        type: 'entreprise',
        neq: '4567890123',
        tpsTvq: '456789012RT0001',
        adresse: '321 Avenue des Pins, Trois-Rivières, QC G9A 5H7',
        email: 'services@ghi-pro.ca',
        telephone: '(819) 555-0321',
        status: 'actif',
        dateFinExercice: '2025-03-31',
        documentsCount: 67,
        signaturesEnAttente: 3
      }
    ];

    const mockDocuments: Document[] = [
      {
        id: 'd1',
        name: 'Facture Fournisseur - Équipement Bureau',
        type: 'facture',
        client: 'Entreprise ABC Inc.',
        clientId: 'c1',
        dateRecu: '2025-01-15T10:30:00',
        status: 'traite',
        taille: '2.3 MB',
        format: 'pdf',
        ocrStatus: 'complete',
        metadonnees: {
          montant: 2450.75,
          devise: 'CAD',
          dateDocument: '2025-01-12',
          numeroReference: 'FACT-2025-001'
        }
      },
      {
        id: 'd2',
        name: 'Relevé Bancaire Janvier 2025',
        type: 'releve_bancaire',
        client: 'Restaurant XYZ',
        clientId: 'c2',
        dateRecu: '2025-01-14T16:45:00',
        status: 'en_cours',
        taille: '1.8 MB',
        format: 'pdf',
        ocrStatus: 'en_cours',
        metadonnees: {
          dateDocument: '2025-01-31',
          numeroReference: 'RB-012025'
        }
      },
      {
        id: 'd3',
        name: 'Bulletin de Paie - Employé 001',
        type: 'bulletin_paie',
        client: 'Services GHI',
        clientId: 'c4',
        dateRecu: '2025-01-13T09:15:00',
        status: 'traite',
        taille: '0.8 MB',
        format: 'pdf',
        ocrStatus: 'complete',
        metadonnees: {
          montant: 4200.00,
          devise: 'CAD',
          dateDocument: '2025-01-15',
          numeroReference: 'BP-2025-001'
        }
      },
      {
        id: 'd4',
        name: 'Contrat de Service - Maintenance',
        type: 'contrat',
        client: 'Consultation DEF',
        clientId: 'c3',
        dateRecu: '2025-01-12T14:20:00',
        status: 'en_attente',
        taille: '1.2 MB',
        format: 'pdf',
        ocrStatus: 'non_requis',
        metadonnees: {
          montant: 15000.00,
          devise: 'CAD',
          dateDocument: '2025-01-10',
          numeroReference: 'CONT-2025-003'
        }
      }
    ];

    const mockSignatures: Signature[] = [
      {
        id: 's1',
        documentName: 'Déclaration TPS/TVQ T4 2024',
        documentType: 'Declaration Fiscale',
        clientName: 'Entreprise ABC Inc.',
        clientId: 'c1',
        dateCreation: '2025-01-10T08:00:00',
        dateEcheance: '2025-01-20T23:59:59',
        dateSignature: '2025-01-12T15:30:00',
        status: 'signe',
        typeSignature: 'qualifiee',
        methodAuth: 'Carte d\'identité + SMS',
        preuveAudit: 'audit-s1-20250112.pdf'
      },
      {
        id: 's2',
        documentName: 'Contrat de Prestation Comptable',
        documentType: 'Contrat',
        clientName: 'Restaurant XYZ',
        clientId: 'c2',
        dateCreation: '2025-01-14T10:00:00',
        dateEcheance: '2025-01-21T23:59:59',
        status: 'en_attente',
        typeSignature: 'avancee',
        methodAuth: 'Email + SMS'
      },
      {
        id: 's3',
        documentName: 'Autorisation Bancaire',
        documentType: 'Autorisation',
        clientName: 'Consultation DEF',
        clientId: 'c3',
        dateCreation: '2025-01-13T14:15:00',
        dateEcheance: '2025-01-25T23:59:59',
        status: 'en_attente',
        typeSignature: 'simple',
        methodAuth: 'Email'
      },
      {
        id: 's4',
        documentName: 'Déclaration Annuelle 2024',
        documentType: 'Declaration Fiscale',
        clientName: 'Services GHI',
        clientId: 'c4',
        dateCreation: '2025-01-11T09:30:00',
        dateEcheance: '2025-01-18T23:59:59',
        dateSignature: '2025-01-13T11:45:00',
        status: 'signe',
        typeSignature: 'qualifiee',
        methodAuth: 'Carte d\'identité + Biométrie',
        preuveAudit: 'audit-s4-20250113.pdf'
      }
    ];

    const mockCommunications: Communication[] = [
      {
        id: 'com1',
        type: 'message',
        sujet: 'Documents TPS/TVQ Q4 2024',
        contenu: 'Bonjour, je vous transmets les documents requis pour la déclaration TPS/TVQ du quatrième trimestre 2024. Merci de vérifier la complétude.',
        clientName: 'Entreprise ABC Inc.',
        clientId: 'c1',
        dateEnvoi: '2025-01-15T09:30:00',
        statut: 'lu',
        priority: 'normal',
        attachments: 3
      },
      {
        id: 'com2',
        type: 'email',
        sujet: 'Échéance Signature Contrat',
        contenu: 'Rappel: La signature de votre contrat de prestation comptable arrive à échéance le 21 janvier. Merci de procéder à la signature électronique.',
        clientName: 'Restaurant XYZ',
        clientId: 'c2',
        dateEnvoi: '2025-01-14T16:45:00',
        statut: 'envoye',
        priority: 'urgent'
      },
      {
        id: 'com3',
        type: 'appel',
        sujet: 'Consultation Fiscale - Crédits R&D',
        contenu: 'Appel téléphonique de 45 minutes concernant l\'optimisation des crédits d\'impôt recherche et développement. Suivi par email avec documentation.',
        clientName: 'Services GHI',
        clientId: 'c4',
        dateEnvoi: '2025-01-13T14:00:00',
        statut: 'repondu',
        priority: 'normal',
        attachments: 2
      },
      {
        id: 'com4',
        type: 'message',
        sujet: 'Clarifications Factures Décembre',
        contenu: 'Quelques questions concernant les factures de décembre. Pouvez-vous confirmer les montants des taxes pour les factures F-1205 à F-1210?',
        clientName: 'Consultation DEF',
        clientId: 'c3',
        dateEnvoi: '2025-01-12T11:20:00',
        statut: 'repondu',
        priority: 'faible'
      }
    ];

    setClients(mockClients);
    setDocuments(mockDocuments);
    setSignatures(mockSignatures);
    setCommunications(mockCommunications);
  }, []);

  return {
    clients,
    documents,
    signatures,
    communications
  };
}