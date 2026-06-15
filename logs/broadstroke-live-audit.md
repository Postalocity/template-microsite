# Broadstroke — Live vs Repo Audit

Generated: 2026-06-10T18:08:30.501Z

**7 of 7 sites need deploy** (missing prerender, asset drift, and/or live 404).

| Site | Live | Assets | Prerender (local/live) | Title match | Deploy? |
|------|------|--------|-------------------------|-------------|--------|
| carbonless-forms | [200](https://broadstrokeinc.com/carbonless-forms) | ❌ local `index-BbeYuRDQ.js` vs live `index-JwssaucC.js` | 50948 / 50948 | ✅ | **YES** |
| commercial-printing | [200](https://broadstrokeinc.com/commercial-printing) | ❌ local `index-Di_05KLj.js` vs live `index-Cn23pBly.js` | 54230 / 54230 | ✅ | **YES** |
| mail-pickup | [200](https://broadstrokeinc.com/mail-pickup) | ❌ local `index-CWmB1Dly.js` vs live `index-DP_tbXeC.js` | 45542 / 45542 | ✅ | **YES** |
| mailing | [200](https://broadstrokeinc.com/mailing) | ❌ local `index-BPq7PbGi.js` vs live `index-CEwWfhfw.js` | 52495 / 52495 | ⚠️ | **YES** |
| printing | [200](https://broadstrokeinc.com/commercial-printing) | ❌ local `index-C2ml-RK6.js` vs live `index-Cn23pBly.js` | 53804 / 54230 | ✅ | **YES** |
| promo | [200](https://broadstrokeinc.com/promo) | ❌ local `index-CCzkeTgU.js` vs live `index-D1j-SLPp.js` | 68331 / 68331 | ⚠️ | **YES** |
| wide-format | [200](https://broadstrokeinc.com/wide-format) | ❌ local `index-Bts5ima7.js` vs live `index-DKfUpcgA.js` | 51150 / 51150 | ⚠️ | **YES** |

## Deploy checklist (per site)

1. Run `npm run build:broadstroke` (or single `--service`)
2. Upload `dist/assets/*` to the site path on hosting
3. Upload `dist/index.html` as `index.html` at `broadstrokeinc.com/<slug>/`
4. Re-run `npm run audit:broadstroke-live` until prerender matches

## Details

### carbonless-forms
- Live URL: https://broadstrokeinc.com/carbonless-forms
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/carbonless-forms/dist/index.html`
- Local CSS: `index-T47WJiGZ.css`
- Local JS: `index-BbeYuRDQ.js`
- Live CSS: `index-BGqa6z4q.css`
- Live JS: `index-JwssaucC.js`
- Local title: Custom Carbonless Forms — Nationwide Distribution
- Live title: Custom Carbonless Forms — Nationwide Distribution

### commercial-printing
- Live URL: https://broadstrokeinc.com/commercial-printing
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/commercial-printing/dist/index.html`
- Local CSS: `index-DWvdtklO.css`
- Local JS: `index-Di_05KLj.js`
- Live CSS: `index-CcuGOFpJ.css`
- Live JS: `index-Cn23pBly.js`
- Local title: Commercial Printing Services Wichita KS — Broadstroke, Inc.
- Live title: Commercial Printing Services Wichita KS — Broadstroke, Inc.

### mail-pickup
- Live URL: https://broadstrokeinc.com/mail-pickup
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/mail-pickup/dist/index.html`
- Local CSS: `index-T47WJiGZ.css`
- Local JS: `index-CWmB1Dly.js`
- Live CSS: `index-BGqa6z4q.css`
- Live JS: `index-DP_tbXeC.js`
- Local title: Mail Pickup Services — Broadstroke, Inc.
- Live title: Mail Pickup Services — Broadstroke, Inc.

### mailing
- Live URL: https://broadstrokeinc.com/mailing
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/mailing/dist/index.html`
- Local CSS: `index-T47WJiGZ.css`
- Local JS: `index-BPq7PbGi.js`
- Live CSS: `index-BGqa6z4q.css`
- Live JS: `index-CEwWfhfw.js`
- Local title: Mailing Services — EDDM, Presort, Certified Mail &amp; Postalocity Automation
- Live title: Mailing Services — EDDM, Presort, Certified Mail & Postalocity Automation

### printing
- Live URL: https://broadstrokeinc.com/commercial-printing
- Notes: Alias — live microsite SSOT is /commercial-printing (repo sites/broadstroke/printing)
- Local dist: `sites/broadstroke/printing/dist/index.html`
- Local CSS: `index-Czuw974P.css`
- Local JS: `index-C2ml-RK6.js`
- Live CSS: `index-CcuGOFpJ.css`
- Live JS: `index-Cn23pBly.js`
- Local title: Commercial Printing Services Wichita KS — Broadstroke, Inc.
- Live title: Commercial Printing Services Wichita KS — Broadstroke, Inc.

### promo
- Live URL: https://broadstrokeinc.com/promo
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/promo/dist/index.html`
- Local CSS: `index-C4OZGoT-.css`
- Local JS: `index-CCzkeTgU.js`
- Live CSS: `index-C4OZGoT-.css`
- Live JS: `index-D1j-SLPp.js`
- Local title: Promotional Products &amp; Apparel — Broadstroke, Inc.
- Live title: Promotional Products & Apparel — Broadstroke, Inc.

### wide-format
- Live URL: https://broadstrokeinc.com/wide-format
- Notes: Live microsite — index.html deploy
- Local dist: `sites/broadstroke/wide-format/dist/index.html`
- Local CSS: `index-T47WJiGZ.css`
- Local JS: `index-Bts5ima7.js`
- Live CSS: `index-BGqa6z4q.css`
- Live JS: `index-DKfUpcgA.js`
- Local title: Wide Format Printing Services — Large Format Graphics &amp; Signage — Broadstroke, Inc.
- Live title: Wide Format Printing Services — Large Format Graphics & Signage — Broadstroke, Inc.
