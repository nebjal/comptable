// Mock service pour envoyer une notification email au client
export async function sendNotification({ to, subject, message }: { to: string; subject: string; message: string }) {
  // Ici, on simule l'envoi d'un email (en production, utiliser un vrai service SMTP ou API)
  console.log(`Envoi d'email à ${to}: ${subject}\n${message}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
}
