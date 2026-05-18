import { test, expect } from '@playwright/test';

test('can navigate to IKB editor from brand page', async ({ page }) => {
  await page.goto('/brands/postalocity');

  // Look for IKB link (we added it in the brand detail)
  await page.getByRole('link', { name: /IKB/i }).click();

  await expect(page).toHaveURL(/\/brands\/postalocity\/ikb/);
  await expect(page.getByRole('heading', { name: /IKB Rules/i })).toBeVisible();
});

test('can add a phrase, save, reload, and see it persist', async ({ page }) => {
  await page.goto('/brands/postalocity/ikb');

  const testPhrase = `test-blocked-phrase-${Date.now()}`;

  // Add a new phrase
  await page.getByRole('button', { name: /Add Phrase/i }).click();

  // Fill the newly added input (the last one)
  const lastInput = page.locator('input').last();
  await lastInput.fill(testPhrase);

  // Save
  await page.getByRole('button', { name: /Save IKB Rules/i }).click();

  // Wait for save to complete (simple wait for now)
  await page.waitForTimeout(600);

  // Reload the page
  await page.reload();

  // The phrase should still be present after reload
  await expect(page.getByDisplayValue(testPhrase)).toBeVisible();
});
