# Quick Start Guide

## 5-Minute Setup for First Site

### Prerequisite Checklist
- [x] Node.js 18+ installed
- [x] npm or pnpm available

### Step 1: Install Template Dependencies
```bash
cd template-microsite
npm install
```

### Step 2: Generate Your First Site
```bash
npm run generate healthcare-billing
```

### Step 3: Start Development Server
```bash
cd sites/healthcare-billing
npm install
npm run dev
```

Result: Fully functional microsite running at `http://localhost:3000`

---

## Creating Your Own Site

### 1. Create Site Config
Create `config/sites/your-vertical.json`:

```json
{
  "site": {
    "id": "your-vertical",
    "name": "Your Vertical Name",
    "slug": "your-vertical",
    "domain": "your-vertical.com",
    "basename": "/your-vertical",
    "contact": {
      "email": "contact@your-vertical.com"
    }
  },
  "branding": {
    "tagline": "Your Professional Tagline"
  },
  "theme": {
    "primary": { "h": 217, "s": 91, "l": 60 },
    "gradients": {
      "hero": "217 91% 60%",
      "cta": "217 91% 60%"
    }
  },
  "navigation": {
    "links": [
      { "label": "Benefits", "href": "#benefits" },
      { "label": "Services", "href": "#services" }
    ]
  },
  "content": { /* See example config */ }
}
```

### 2. Generate Site
```bash
npm run generate your-vertical
```

### 3. Customize Content
Edit `sites/your-vertical/config.json` with your content.

### 4. Deploy
```bash
cd sites/your-vertical
npm run build
# Upload ./dist to your hosting
```

---

## File Structure After Generation

```
template-microsite/
├── common/                          # Shared components & styles
│   ├── components/
│   │   └── shared/                 # 7 reusable components
│   └── globals.css
├── config/sites/                   # Site configurations
├── scripts/generate-site.ts        # Generation script
└── sites/                          # Generated microsites
    └── your-vertical/              # Your generated site
        ├── index.tsx              # Main app (imports from ../common)
        ├── config.json            # Site-specific content
        ├── vite.config.ts         # Build configuration
        └── package.json           # Dependencies
```

---

## Content Structure

Each section in `content` object:

### Hero (`content.hero`)
- `headline.main` - Main headline text
- `headline.highlightTerm` - Term for gradient highlighting
- `subhead` - Subheadline/description
- `background.image` - Hero background image path
- `ctas[]` - Call-to-action button configurations

### Benefits (`content.benefits`)
- `section.title` - Section heading
- `benefits[]` - Array of benefit objects with icon, title, detail, metrics

### Services (`content.services`)
- `section.title` - Section heading
- `services[]` - Array of service objects with icon, title, description

### FAQ (`content.faq`)
- `section.title` - Section heading
- `faqs[]` - Array of Q&A objects

### Comparison (`content.comparison`)
- `section.title` - Section heading
- `columns` - Column headers
- `rows[]` - Comparison row data

---

## Time Breakdown

| Task | Manual | Template | Savings |
|------|--------|----------|---------|
| Setup & Structure | 2-3 hours | 10 mins | 2-2.5 hrs |
| Components | 3-5 hours | 0 mins | 3-5 hrs |
| Content Creation | 2-3 hours | 5 mins | 2-2.5 hrs |
| Build & Test | 30 mins | 15 mins | 15 mins |
| **Total** | **8-11 hours** | **30 mins** | **7.5-10.5 hrs** |

**Result: 15-20 minute site creation vs. 4-8 hour manual copy-paste**

---

## Icon Options

Use emoji icons for simplicity:

- `⏰` - Time/scheduling
- `📊` - Data/analytics
- `💬` - Communication
- `🎯` - Targeting/goals
- `📋` - Documents/lists
- `📈` - Charts/growth
- `🔍` - Search/discovery
- `💰` - Finance/money
- `📞` - Phone/communication
- `🔒` - Security
- `🚀` - Performance/speed
- `🎨` - Design/creative

---

## Next Steps

1. **Customize Theme**
   - Edit `theme.primary` colors (HSL values)
   - Adjust gradient colors

2. **Add Images**
   - Place in `sites/your-vertical/public/images/`
   - Reference in config with `/images/filename.jpg`

3. **Add Sections**
   - Define types in `common/types/content.ts`
   - Create component in `common/components/shared/`
   - Import and use in `index.tsx`

4. **Deploy**
   - `npm run build` in your site directory
   - Upload `dist/` to Vercel, Netlify, or any static host

---

## Need Help?

- Check `README.md` for architecture details
- Review `config/sites/healthcare-billing.json` for example
- See `common/types/content.ts` for type definitions