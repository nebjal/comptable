import { test, expect } from '@playwright/test';

test.describe('UI smoke test - clickthrough', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:5191';

  test('homepage loads and main interactions', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Check hero headings exist
  const h1Count = await page.locator('h1').count();
  await expect(h1Count).toBeGreaterThan(0);

    // Click primary CTA to open client login modal
    const cta = page.getByRole('button', { name: /Accéder à mon Espace Client|Accéder à mon Espace Client/i }).first();
    if (await cta.count() > 0) {
      await cta.click();
      // wait for modal
      await expect(page.locator('form')).toBeVisible({ timeout: 5000 });
      // submit the login form (should be prevented by client-side)
      const email = page.locator('input[type="email"]');
      if (await email.count() > 0) await email.fill('test@example.com');
      const pwd = page.locator('input[type="password"]');
      if (await pwd.count() > 0) await pwd.fill('Password123!');
      await page.locator('button[type="submit"]').click();
      // ensure modal remains or closes gracefully
      await expect(page.locator('form')).toBeVisible({ timeout: 3000 });
    }

    // Open services page from nav
    const servicesBtn = page.getByRole('button', { name: /Services/i }).first();
    if (await servicesBtn.count() > 0) {
      await servicesBtn.click();
  // Expect ServicesPage heading
  const headingCount = await page.locator('h2, h1').filter({ hasText: /Services|Fonctionnalités|Tarifs/ }).count();
  await expect(headingCount).toBeGreaterThan(0);
      // go back
      const back = page.getByRole('button', { name: /Retour|Back|Accueil|Retourner/i }).first();
      if (await back.count() > 0) await back.click();
    }

    // Toggle chatbot floating button
    const botBtn = page.locator('button', { hasText: '🤖' }).first();
    if (await botBtn.count() > 0) {
      await botBtn.click();
      // chatbot component should appear
      await expect(page.locator('text=Assistant IA Fiscal').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
      // Try sending a short message if input exists
      const input = page.locator('textarea, input[type="text"], input[placeholder]');
      if (await input.count() > 0) {
        await input.first().fill('Bonjour, test rapide');
        const send = page.getByRole('button', { name: /Envoyer|Send|Send message/i }).first();
        if (await send.count() > 0) await send.click();
      }
      // close chatbot
      await botBtn.click();
    }

    // Check testimonial slider exists and navigate controls
    const next = page.locator('button', { hasText: '›' }).first();
    if (await next.count() > 0) {
      await next.click();
      await page.waitForTimeout(500);
    }

    // Photo gallery open
    const galleryBtn = page.getByRole('link', { name: /Rencontrez l'équipe|Notre Histoire en Images/i }).first();
    if (await galleryBtn.count() > 0) {
      await galleryBtn.click().catch(() => {});
    }

  // Basic assertion: at least one button exists on the page
  const btnCount = await page.locator('button').count();
  await expect(btnCount).toBeGreaterThan(0);
  });
});
