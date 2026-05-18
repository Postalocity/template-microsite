import { test, expect } from '@playwright/test';

test('dashboard loads and shows navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Microsite Admin')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Brands' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sites' })).toBeVisible();
});

test('can navigate to brands page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Brands' }).click();

  await expect(page).toHaveURL(/\/brands/);
  await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
});
