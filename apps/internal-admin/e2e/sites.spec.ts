import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const CREATED_SITES: string[] = [];

test.describe('Sites Management', () => {

  test.afterAll(async () => {
    // Cleanup any test sites we created
    for (const sitePath of CREATED_SITES) {
      if (fs.existsSync(sitePath)) {
        fs.rmSync(sitePath, { recursive: true, force: true });
      }
    }
  });

  test('can create a new site and see it in the list', async ({ page }) => {
    const uniqueSlug = `test-site-${Date.now()}`;
    const configPath = path.join(process.cwd(), `../../config/sites/postalocity/${uniqueSlug}.json`);
    CREATED_SITES.push(configPath);

    await page.goto('/sites');

    await page.getByRole('link', { name: /New Site/i }).click();

    await page.getByLabel('Brand').selectOption('postalocity');
    await page.getByLabel('Service / Slug').fill(uniqueSlug);

    await page.getByRole('button', { name: /Create Site/i }).click();

    await expect(page).toHaveURL(new RegExp(`/sites/editor/postalocity/${uniqueSlug}`));

    await page.goto('/sites');
    await expect(page.getByText(uniqueSlug)).toBeVisible();
  });

  test('editing content shows live validation errors', async ({ page }) => {
    await page.goto('/sites/editor/postalocity/credit-repair');

    const headlineInput = page.getByLabel('Headline Main');
    await headlineInput.fill('');

    await page.waitForTimeout(800);

    await expect(page.getByText(/Validation Errors/i)).toBeVisible();
    await expect(page.getByText(/Hero section is missing a headline/i)).toBeVisible();
  });

  test('can trigger generation and see logs in the modal', async ({ page }) => {
    await page.goto('/sites/editor/postalocity/credit-repair');

    await page.getByRole('button', { name: /Generate Site/i }).click();

    await expect(page.getByText(/Generation Logs/i)).toBeVisible();

    await page.waitForTimeout(4500);

    const logContainer = page.locator('pre').first();
    await expect(logContainer).not.toBeEmpty();

    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('can edit content, save, and verify it persists', async ({ page }) => {
    const testHeadline = `Updated Headline ${Date.now()}`;

    await page.goto('/sites/editor/postalocity/credit-repair');

    // Change the headline
    await page.getByLabel('Headline Main').fill(testHeadline);

    // Save
    await page.getByRole('button', { name: /Save Changes/i }).click();
    await page.waitForTimeout(500); // give it time to save

    // Reload the page
    await page.reload();

    // Verify the change persisted
    await expect(page.getByLabel('Headline Main')).toHaveValue(testHeadline);
  });

  test('full generation flow creates actual site files', async ({ page }) => {
    const uniqueSlug = `full-gen-${Date.now()}`;
    const configPath = path.join(process.cwd(), `../../config/sites/postalocity/${uniqueSlug}.json`);
    const generatedPath = path.join(process.cwd(), `../../sites/postalocity/${uniqueSlug}`);

    CREATED_SITES.push(configPath);

    // Create site
    await page.goto('/sites/new');
    await page.getByLabel('Brand').selectOption('postalocity');
    await page.getByLabel('Service / Slug').fill(uniqueSlug);
    await page.getByRole('button', { name: /Create Site/i }).click();

    await expect(page).toHaveURL(new RegExp(`/sites/editor/postalocity/${uniqueSlug}`));

    // Trigger generation
    await page.getByRole('button', { name: /Generate Site/i }).click();

    // Wait until generation finishes
    await expect(page.getByText(/Generation finished|finished with code/i)).toBeVisible({ timeout: 180000 });

    await page.getByRole('button', { name: 'Close' }).click();

    // Verify generated files exist on disk
    await expect.poll(() => fs.existsSync(generatedPath), { timeout: 5000 }).toBe(true);

    expect(fs.existsSync(path.join(generatedPath, 'main.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(generatedPath, 'config.json'))).toBe(true);
    expect(fs.existsSync(path.join(generatedPath, 'index.html'))).toBe(true);
  });
});
