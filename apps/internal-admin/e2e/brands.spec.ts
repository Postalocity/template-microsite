import { test, expect } from '@playwright/test';

test('brands page shows list of brands from config', async ({ page }) => {
  await page.goto('/brands');

  await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();

  // We know postalocity and odins-innovations exist in config/brands
  await expect(page.getByText('Postalocity')).toBeVisible();
  await expect(page.getByText('Odins Innovations')).toBeVisible();
});

test('can navigate to a brand detail page', async ({ page }) => {
  await page.goto('/brands');
  await page.getByRole('link', { name: 'Postalocity' }).click();

  await expect(page).toHaveURL(/\/brands\/postalocity/);
  await expect(page.getByText('postalocity.com')).toBeVisible();
});
