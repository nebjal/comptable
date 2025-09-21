import { test, expect } from '@playwright/test';

test.describe('Validation des boutons de l\'application comptable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5180');
  });

  test('Vérification des boutons de navigation principaux', async ({ page }) => {
    // Attendre que la page se charge
    await page.waitForLoadState('networkidle');

    // Vérifier que le bouton "Espace Client" est présent et cliquable
    const clientButton = page.locator('button:has-text("Espace Client")');
    await expect(clientButton).toBeVisible();
    await expect(clientButton).toBeEnabled();

    // Vérifier les boutons de navigation horizontale
    const navButtons = [
      'Accueil',
      'Centre Pro des Impôts',
      'Solutions d\'Affaires',
      'Espace Client',
      'À Propos',
      'Plus'
    ];

    for (const buttonText of navButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  });

  test('Test de l\'espace client - boutons principaux', async ({ page }) => {
    // Aller à l'espace client
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();

    // Attendre la navigation
    await page.waitForLoadState('networkidle');

    // Vérifier les boutons de sélection d'espace
    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    const clientSpaceButton = page.locator('button:has-text("Espace Client")');

    await expect(adminButton).toBeVisible();
    await expect(clientSpaceButton).toBeVisible();
    await expect(adminButton).toBeEnabled();
    await expect(clientSpaceButton).toBeEnabled();

    // Sélectionner l'espace client
    await clientSpaceButton.click();

    // Attendre la navigation vers l'authentification
    await page.waitForLoadState('networkidle');

    // Vérifier les boutons de connexion
    const loginButtons = page.locator('button:has-text("Se connecter")');
    await expect(loginButtons.first()).toBeVisible();
    await expect(loginButtons.first()).toBeEnabled();
  });

  test('Test des boutons du tableau de bord administrateur', async ({ page }) => {
    // Aller à l'espace client puis admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    // Sélectionner l'espace administrateur
    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    // Vérifier les boutons de connexion admin
    const loginButton = page.locator('button:has-text("Se connecter")');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // Simuler une connexion admin (remplir le formulaire)
    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    // Cliquer sur se connecter
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Vérifier les boutons du sidebar
    const sidebarButtons = [
      'Tableau de Bord',
      'Clients',
      'Documents',
      'Signatures',
      'Communications',
      'Rapports',
      'Paramètres'
    ];

    for (const buttonText of sidebarButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }

    // Vérifier le bouton de déconnexion
    const logoutButton = page.locator('button:has-text("Déconnexion")');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();
  });

  test('Test des boutons d\'actions rapides dans le tableau de bord', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Vérifier les boutons d'actions rapides
    const actionButtons = [
      'Message Sécurisé',
      'Message Chiffré',
      'Email Client',
      'Communication Externe',
      'Planifier Appel'
    ];

    for (const buttonText of actionButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  });

  test('Test des onglets du tableau de bord', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Vérifier les onglets du tableau de bord
    const tabButtons = [
      'Vue d\'ensemble',
      'Documents',
      'Déclarations',
      'Signatures',
      'Clients',
      'Rapports',
      'Automatisation'
    ];

    for (const tabText of tabButtons) {
      const tab = page.locator(`button:has-text("${tabText}")`);
      await expect(tab).toBeVisible();
      await expect(tab).toBeEnabled();

      // Tester le clic sur chaque onglet
      await tab.click();
      await page.waitForTimeout(500); // Attendre le changement d'onglet
    }
  });

  test('Test des boutons de gestion des clients', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Clients
    const clientsTab = page.locator('button:has-text("Clients")');
    await clientsTab.click();
    await page.waitForTimeout(500);

    // Vérifier le bouton "Nouveau Client"
    const newClientButton = page.locator('button:has-text("Nouveau Client")');
    await expect(newClientButton).toBeVisible();
    await expect(newClientButton).toBeEnabled();

    // Vérifier les boutons d'action sur les clients existants
    const actionButtons = page.locator('button').filter({ hasText: /👁|✉️/ });
    const actionCount = await actionButtons.count();
    expect(actionCount).toBeGreaterThan(0);
  });

  test('Test des boutons de gestion des documents', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Documents
    const documentsTab = page.locator('button:has-text("Documents")');
    await documentsTab.click();
    await page.waitForTimeout(500);

    // Vérifier le bouton "Nouveau Document"
    const newDocButton = page.locator('button:has-text("Nouveau Document")');
    await expect(newDocButton).toBeVisible();
    await expect(newDocButton).toBeEnabled();

    // Vérifier les boutons de recherche et filtrage
    const searchInput = page.locator('input[placeholder*="Rechercher"]');
    await expect(searchInput).toBeVisible();

    const filterButton = page.locator('button:has-text("Filtrer")');
    if (await filterButton.count() > 0) {
      await expect(filterButton).toBeEnabled();
    }
  });

  test('Test des boutons de signature électronique', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Signatures
    const signaturesTab = page.locator('button:has-text("Signatures")');
    await signaturesTab.click();
    await page.waitForTimeout(500);

    // Vérifier le bouton "Envoyer Document"
    const sendDocButton = page.locator('button:has-text("Envoyer Document")');
    await expect(sendDocButton).toBeVisible();
    await expect(sendDocButton).toBeEnabled();

    // Tester l'ouverture du modal de nouvelle signature
    await sendDocButton.click();
    await page.waitForTimeout(500);

    // Vérifier les boutons dans le modal
    const modalButtons = [
      'Annuler',
      'Envoyer via Zoho Sign'
    ];

    for (const buttonText of modalButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }

    // Fermer le modal
    const cancelButton = page.locator('button:has-text("Annuler")');
    await cancelButton.click();
  });

  test('Test des boutons de communication', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Communications
    const commTab = page.locator('button:has-text("Communications")');
    await commTab.click();
    await page.waitForTimeout(500);

    // Vérifier les boutons de communication
    const commButtons = [
      'Nouveau Message',
      'Email Groupé',
      'SMS',
      'Appel Téléphonique'
    ];

    for (const buttonText of commButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      if (await button.count() > 0) {
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
      }
    }
  });

  test('Test des boutons de rapports', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Rapports
    const reportsTab = page.locator('button:has-text("Rapports")');
    await reportsTab.click();
    await page.waitForTimeout(500);

    // Vérifier les boutons de génération de rapports
    const reportButtons = [
      'Rapport Mensuel',
      'Rapport Fiscal',
      'Rapport Client',
      'Télécharger'
    ];

    for (const buttonText of reportButtons) {
      const buttons = page.locator(`button:has-text("${buttonText}")`);
      const count = await buttons.count();
      if (count > 0) {
        await expect(buttons.first()).toBeVisible();
        await expect(buttons.first()).toBeEnabled();
      }
    }
  });

  test('Test des boutons de paramètres', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Aller à l'onglet Paramètres
    const settingsTab = page.locator('button:has-text("Paramètres")');
    await settingsTab.click();
    await page.waitForTimeout(500);

    // Vérifier les boutons de paramètres
    const settingsButtons = [
      'Sauvegarder',
      'Annuler',
      'Réinitialiser'
    ];

    for (const buttonText of settingsButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      if (await button.count() > 0) {
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
      }
    }
  });

  test('Test de la fonctionnalité de déconnexion', async ({ page }) => {
    // Se connecter en tant qu'admin
    const clientButton = page.locator('button:has-text("Espace Client")');
    await clientButton.click();
    await page.waitForLoadState('networkidle');

    const adminButton = page.locator('button:has-text("Espace Administrateur")');
    await adminButton.click();
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'admin@comptable.com');
    await page.fill('input[type="password"]', 'admin123');

    const loginButton = page.locator('button:has-text("Se connecter")');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    // Tester le bouton de déconnexion
    const logoutButton = page.locator('button:has-text("Déconnexion")');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();

    // Cliquer sur déconnexion
    await logoutButton.click();
    await page.waitForLoadState('networkidle');

    // Vérifier qu'on revient à la page d'accueil
    const welcomeButton = page.locator('button:has-text("Espace Client")');
    await expect(welcomeButton).toBeVisible();
  });
});
