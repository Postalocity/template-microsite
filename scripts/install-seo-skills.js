#!/usr/bin/env node

/**
 * SEO Skills Installation Script
 * Integrates the 12 StringRay SEO skills into the framework
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up two levels to reach project root
const PROJECT_ROOT = path.join(__dirname, "..");
const INTEGRATIONS_DIR = path.join(PROJECT_ROOT, ".opencode/integrations/claude-seo");
const SKILLS_DIR = path.join(PROJECT_ROOT, ".opencode/skills");
const SEO_SKILLs = [
  "seo-audit",
  "seo-page",
  "seo-sitemap",
  "seo-schema",
  "seo-technical",
  "seo-content",
  "seo-geo",
  "seo-plan",
  "seo-programmatic",
  "seo-competitor-pages",
  "seo-hreflang",
  "seo-images"
];

async function installSEOSkills() {
  console.log("🚀 Installing StringRay SEO Skills...
");

  if (!fs.existsSync(INTEGRATIONS_DIR)) {
    console.error("❌ Error: SEO integrations directory not found");
    console.error(`   Expected: ${INTEGRATIONS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(SKILLS_DIR)) {
    console.error("❌ Error: Skills directory not found");
    console.error(`   Expected: ${SKILLS_DIR}`);
    process.exit(1);
  }

  let installedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  console.log("Installing SEO skills from:");
  console.log(`  Source: ${INTEGRATIONS_DIR}`);
  console.log(`  Target: ${SKILLS_DIR}
`);

  for (const skill of SEO_SKILLs) {
    const sourceDir = path.join(INTEGRATIONS_DIR, skill);
    const targetDir = path.join(SKILLS_DIR, skill);

    try {
      if (!fs.existsSync(sourceDir)) {
        console.error(`❌ Error: Source skill directory not found: ${skill}`);
        errorCount++;
        continue;
      }

      const skillFile = path.join(sourceDir, "SKILL.md");
      if (!fs.existsSync(skillFile)) {
        console.error(`❌ Error: SKILL.md not found for: ${skill}`);
        errorCount++;
        continue;
      }

      if (fs.existsSync(targetDir)) {
        console.log(`⏭️  Skipped (already exists): ${skill}`);
        skippedCount++;
        continue;
      }

      fs.symlinkSync(sourceDir, targetDir, "dir");
      console.log(`✅ Installed: ${skill}`);
      installedCount++;
    } catch (error) {
      console.error(`❌ Error installing ${skill}:`, error.message);
      errorCount++;
    }
  }

  console.log("
══════════════════════════════════════════════════════════");
  console.log("Installation Summary");
  console.log("══════════════════════════════════════════════════════════");
  console.log(`✅ Successfully installed: ${installedCount} skills`);
  console.log(`⏭️  Skipped (already exists): ${skippedCount} skills`);
  console.log(`❌ Errors: ${errorCount} errors`);
  console.log("══════════════════════════════════════════════════════════");

  if (errorCount > 0) {
    console.error("
⚠️  Installation completed with errors");
    process.exit(1);
  }

  console.log("
✅ SEO Skills Installation Complete!");
  console.log("
📝 Next Steps:");
  console.log("   1. Verify installation: strray-ai health");
  console.log("   2. Check capabilities: strray-ai capabilities");
  console.log("   3. Use SEO skills: @seo-consultant \"Perform SEO audit\"");
  console.log("
💡 Keywords that trigger automatic skill loading:");
  console.log("   - \"SEO audit\", \"technical SEO\", \"Core Web Vitals\"");
  console.log("   - \"E-E-A-T\", \"content quality\", \"GEO optimization\"");
  console.log("   - \"schema markup\", \"sitemap audit\", \"comparison page\"");
}

installSEOSkills().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});
