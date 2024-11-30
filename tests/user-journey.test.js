const { test, expect } = require('@playwright/test');

test.describe('Parcours utilisateur complet', () => {
  test('Parcours de bout en bout', async ({ page }) => {
    // 1. Visite de la page d'accueil
    await test.step('Visite de la page d\'accueil', async () => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Événements/);
      await expect(page.locator('h1')).toBeVisible();
    });

    // 2. Navigation vers la page d'inscription
    await test.step('Navigation vers l\'inscription', async () => {
      await page.click('button:has-text("S\'inscrire")');
      await expect(page).toHaveURL(/register.html/);
      await expect(page.locator('h1')).toContainText('Créer un compte');
    });

    // 3. Remplissage du formulaire d'inscription
    await test.step('Inscription d\'un nouvel utilisateur', async () => {
      await expect(page.locator('#registerForm')).toBeVisible();
      
      await page.fill('input[name="firstName"]', 'Jean');
      await page.fill('input[name="lastName"]', 'Dupont');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'MotDePasse123!');
      await page.fill('input[name="confirmPassword"]', 'MotDePasse123!');
      await page.check('input[name="terms"]');
      
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
      await submitButton.click();
    });

    // 4. Connexion avec le nouveau compte
    await test.step('Connexion utilisateur', async () => {
      await expect(page.locator('#loginForm')).toBeVisible();
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'MotDePasse123!');
      
      const loginButton = page.locator('button[type="submit"]');
      await expect(loginButton).toBeVisible();
      await loginButton.click();
    });

    // 5. Accès à la page sessions
    await test.step('Navigation vers la page sessions', async () => {
      await page.goto('/sessions.html');
      await expect(page).toHaveURL(/sessions.html/);
      
      // Vérifier que nous sommes bien sur la page sessions
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('.sidebar')).toBeVisible();
    });

    // 6. Création d'un événement depuis la page sessions
    await test.step('Création d\'un événement', async () => {
      // Vérifier que le formulaire est accessible
      await expect(page.locator('#eventForm')).toBeVisible();
      
      // Remplir le formulaire d'événement
      await page.fill('input[name="eventName"]', 'Atelier de Peinture');
      await page.fill('input[name="eventDate"]', '2024-02-01');
      await page.fill('input[name="eventTime"]', '14:00');
      await page.fill('input[name="eventLocation"]', 'Studio d\'Art, Paris');
      await page.selectOption('select[name="eventType"]', 'atelier');
      await page.fill('textarea[name="eventDescription"]', 'Un atelier de peinture pour tous les niveaux');
      
      // Soumettre le formulaire
      const createButton = page.locator('button:has-text("Créer l\'événement")');
      await expect(createButton).toBeVisible();
      await createButton.click();
      
      // Vérifier que l'événement a été créé
      await expect(page.locator('text=Événement créé avec succès')).toBeVisible();
    });
  });
});
