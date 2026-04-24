# Site Restoration Process

## Simple Workflow

When a site needs restoration, follow these exact steps:

### 1. Find the Correct Commit
- Ask the user which commit has the correct content, OR
- The user will tell you the commit hash directly

### 2. Restore the Site
```bash
# Checkout the specific commit for the site
git checkout <commit-hash> -- sites/<brand>/<site>/
```

### 3. Create Source File
```bash
# Copy config.json to site-specific JSON (this is the source of truth)
cp sites/<brand>/<site>/config.json sites/<brand>/<site>/<site>.json
```

### 4. Update Source Config
```bash
# Copy to config/sites/ for the generator
cp sites/<brand>/<site>/<site>.json config/sites/<brand>/<site>.json
```

### 5. Build
```bash
cd sites/<brand>/<site>
npm run build
```

### 6. Commit
```bash
git add sites/<brand>/<site>/
git add config/sites/<brand>/<site>.json
git commit -m "restore: <site> from commit <hash>" --no-verify
```

## What NOT to Do

❌ Do NOT write complex scripts
❌ Do NOT try to fix or rename sections
❌ Do NOT modify content unless explicitly asked
❌ Do NOT overcomplicate the process

## What TO Do

✅ Keep it simple
✅ Follow the user's instructions exactly
✅ Ask which commit to use if unsure
✅ Just restore, copy, build, commit

## Example

```bash
# User says: "Restore odins-innovations/doe-estrus-guide from commit 960566c"

# 1. Restore
git checkout 960566c -- sites/odins-innovations/doe-estrus-guide/

# 2. Copy to source
cp sites/odins-innovations/doe-estrus-guide/config.json sites/odins-innovations/doe-estrus-guide/doe-estrus-guide.json

# 3. Update config/sites/
cp sites/odins-innovations/doe-estrus-guide/doe-estrus-guide.json config/sites/odins-innovations/doe-estrus-guide.json

# 4. Build
cd sites/odins-innovations/doe-estrus-guide && npm run build

# 5. Commit
git add sites/odins-innovations/doe-estrus-guide/
git add config/sites/odins-innovations/doe-estrus-guide.json
git commit -m "restore: doe-estrus-guide from commit 960566c" --no-verify
```

## Architecture

After restoration:
- **Source**: `sites/<brand>/<site>/<site>.json` (the master file)
- **Runtime**: `sites/<brand>/<site>/config.json` (copy of source, used by site)
- **Generator Source**: `config/sites/<brand>/<site>.json` (copy of source)
- **Main.tsx**: Reads from `./config.json` (the runtime file)

That's it. Simple.

## HTML Support in Headlines

The HeroSection component supports HTML in headlines:

```json
{
  "content": {
    "hero": {
      "headline": {
        "main": "DOE ESTRUS<br /><span style='color: #gold;'>SCENT BEADS</span>",
        "highlightTerm": "Effective for <strong>30 + Days</strong><br />Legal Everywhere"
      }
    }
  }
}
```

Supported HTML tags:
- `<br />` for line breaks (also supports `\n`)
- `<span>` with style attributes for colors
- `<strong>` or `<b>` for bold text
- Any standard HTML for formatting
