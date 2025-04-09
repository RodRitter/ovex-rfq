import { test, expect } from '@playwright/test';

test('should load the homepage and display the correct title', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Traderly');
});
