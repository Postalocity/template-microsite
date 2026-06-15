# Postalocity — Live vs Repo Audit

Generated: 2026-06-10T18:08:30.923Z

**7 of 8 sites need deploy** (missing prerender, asset drift, and/or live 404).

| Site | Live | Assets | Prerender (local/live) | Title match | Deploy? |
|------|------|--------|-------------------------|-------------|--------|
| credit-repair | [200](https://postalocity.com/credit-repair) | ❌ local `index-o7Mo7yLV.js` vs live `index-DtUJXBOZ.js` | 51485 / 51485 | ✅ | **YES** |
| debt-collection | [200](https://postalocity.com/debt-collection) | ❌ local `index-jVYS3KfE.js` vs live `index-COOA9TWE.js` | 49423 / 49423 | ✅ | **YES** |
| education | [200](https://postalocity.com/education) | ❌ local `index-DAl9JQ6e.js` vs live `index-DjHVM-z_.js` | 42887 / 42887 | ⚠️ | **YES** |
| healthcare-billing | [200](https://www.postalocity.com/healthcare/) | ❌ local `index-CwaK4fT_.js` vs live `index-Ca2sdHRn.js` | 53523 / 0 | ⚠️ | **YES** |
| healthcare-mailing-services | [200](https://www.postalocity.com/healthcare/) | ❌ local `index-4QxRYdTf.js` vs live `index-Ca2sdHRn.js` | 53532 / 0 | ⚠️ | **YES** |
| postcard | — | — local `index-CCIT13r7.js` vs live `—` | 35867 / 0 | — | **no** |
| real-estate | [200](https://postalocity.com/real-estate) | ❌ local `index-CVd5eDV7.js` vs live `index-D_9mQscu.js` | 46254 / 46254 | ⚠️ | **YES** |
| self-storage | [200](https://postalocity.com/self-storage) | ❌ local `index-C0EvGX-N.js` vs live `index-OdG8wlGW.js` | 44539 / 44539 | ⚠️ | **YES** |

## Deploy checklist (per site)

1. Run `npm run build:postalocity` (or single `--service`)
2. Upload `dist/assets/*` to the site path on hosting
3. Upload `dist/index.html` as `index.html` at `postalocity.com/<slug>/`
4. Re-run `npm run audit:postalocity-live` until prerender matches

## Details

### credit-repair
- Live URL: https://postalocity.com/credit-repair
- Notes: Live microsite — index.html deploy
- Local dist: `sites/postalocity/credit-repair/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-o7Mo7yLV.js`
- Live CSS: `index-BbirUzND.css`
- Live JS: `index-DtUJXBOZ.js`
- Local title: Automate Dispute Letter Mailing Service | Credit Repair Mailing Service
- Live title: Automate Dispute Letter Mailing Service | Credit Repair Mailing Service

### debt-collection
- Live URL: https://postalocity.com/debt-collection
- Notes: Live microsite — index.html deploy
- Local dist: `sites/postalocity/debt-collection/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-jVYS3KfE.js`
- Live CSS: `index-Cm3lMJfJ.css`
- Live JS: `index-COOA9TWE.js`
- Local title: Debt Collection Mailing Service — Automated Mailing Services for Debt Collection Agencies
- Live title: Debt Collection Mailing Service — Automated Mailing Services for Debt Collection Agencies

### education
- Live URL: https://postalocity.com/education
- Notes: Live microsite — index.html deploy
- Local dist: `sites/postalocity/education/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-DAl9JQ6e.js`
- Live CSS: `index-ChbFthgY.css`
- Live JS: `index-DjHVM-z_.js`
- Local title: Education Mailing Services — Acceptance Letters &amp; Transcripts
- Live title: Education Mailing Services — Acceptance Letters & Transcripts

### healthcare-billing
- Live URL: https://www.postalocity.com/healthcare/
- Notes: Alias — live SSOT is /healthcare/ (same as healthcare-mailing-services)
- Local dist: `sites/postalocity/healthcare-billing/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-CwaK4fT_.js`
- Live CSS: `index-BAjlo7qa.css`
- Live JS: `index-Ca2sdHRn.js`
- Local title: Secure Healthcare Mailing Service | Automate Patient Statements &amp; Billing Mail
- Live title: Healthcare Mailing Service | Automated Patient Statements & Billing – Postalocity

### healthcare-mailing-services
- Live URL: https://www.postalocity.com/healthcare/
- Notes: Live microsite at /healthcare/ (not /healthcare-mailing-services)
- Local dist: `sites/postalocity/healthcare-mailing-services/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-4QxRYdTf.js`
- Live CSS: `index-BAjlo7qa.css`
- Live JS: `index-Ca2sdHRn.js`
- Local title: Secure Healthcare Mailing Service | Automate Patient Statements &amp; Billing Mail
- Live title: Healthcare Mailing Service | Automated Patient Statements & Billing – Postalocity

### postcard
- Live URL: not mapped
- Notes: No live microsite at /postcard (404). Excluded from content compare until hosting path confirmed.
- Local dist: `sites/postalocity/postcard/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-CCIT13r7.js`
- Live CSS: `—`
- Live JS: `—`
- Local title: Professional Postcard Mailing | Postalocity
- Live title: —

### real-estate
- Live URL: https://postalocity.com/real-estate
- Notes: Live microsite — index.html deploy
- Local dist: `sites/postalocity/real-estate/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-CVd5eDV7.js`
- Live CSS: `index-BbirUzND.css`
- Live JS: `index-D_9mQscu.js`
- Local title: Real Estate Mailing Service — Automated Tenant Notices &amp; Property Management Mailing
- Live title: Real Estate Mailing Service — Automated Tenant Notices & Property Management Mailing

### self-storage
- Live URL: https://postalocity.com/self-storage
- Notes: Live microsite — index.html deploy
- Local dist: `sites/postalocity/self-storage/dist/index.html`
- Local CSS: `index-OWQ8IxgE.css`
- Local JS: `index-C0EvGX-N.js`
- Live CSS: `index-Cm3lMJfJ.css`
- Live JS: `index-OdG8wlGW.js`
- Local title: Self-Storage Mailing — Automated Lien Notices &amp; Tenant Communications
- Live title: Self-Storage Mailing — Automated Lien Notices & Tenant Communications
