import { useState } from 'react';
import { zohoSignService, ZohoSignRequest, ZohoSignResponse } from '../services/zohoSignService';

export interface UseSignatureRequestReturn {
  createSignatureRequest: (request: ZohoSignRequest) => Promise<ZohoSignResponse>;
  getSignatureStatus: (requestId: string) => Promise<ZohoSignResponse>;
  cancelSignatureRequest: (requestId: string) => Promise<ZohoSignResponse>;
  sendReminder: (requestId: string) => Promise<ZohoSignResponse>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useSignatureRequest = (): UseSignatureRequestReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const createSignatureRequest = async (request: ZohoSignRequest): Promise<ZohoSignResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await zohoSignService.createSignatureRequest(request);

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getSignatureStatus = async (requestId: string): Promise<ZohoSignResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await zohoSignService.getSignatureStatus(requestId);

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération du statut';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSignatureRequest = async (requestId: string): Promise<ZohoSignResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await zohoSignService.cancelSignatureRequest(requestId);

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'annulation';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendReminder = async (requestId: string): Promise<ZohoSignResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await zohoSignService.sendReminder(requestId);

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'envoi du rappel';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSignatureRequest,
    getSignatureStatus,
    cancelSignatureRequest,
    sendReminder,
    isLoading,
    error,
    clearError
  };
};
