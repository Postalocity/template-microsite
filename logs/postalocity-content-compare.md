# postalocity — Prerender vs Live Content Compare

Generated: 2026-06-10T17:48:26.701Z

**7 of 8 sites have prerender content aligned with live.**

Live content is captured via Playwright (CSR render), then compared to local `dist/index.html` #root.

| Site | Score | Text (local/live chars) | H1 | Match? |
|------|-------|-------------------------|-----|--------|
| credit-repair | 97% | 51485 / 8284 | — | **YES** |
| debt-collection | 97% | 49423 / 6122 | — | **YES** |
| education | 98% | 42887 / 5333 | — | **YES** |
| healthcare-billing | 97% | 53523 / 6747 | — | **YES** |
| healthcare-mailing-services | 97% | 53532 / 6747 | — | **YES** |
| postcard | 0% | 35867 / 0 | — | **NO** |
| real-estate | 97% | 46254 / 6299 | — | **YES** |
| self-storage | 97% | 44539 / 5200 | — | **YES** |

## Details

### credit-repair
- Live: https://postalocity.com/credit-repair (200)
- Local prerender bytes: 51485
- Live visible text chars: 8284
- Score: 97.2%
- Match: **YES**

- Fingerprints: `logs/postalocity/credit-repair/local-fingerprint.json` vs `live-fingerprint.json`

### debt-collection
- Live: https://postalocity.com/debt-collection (200)
- Local prerender bytes: 49423
- Live visible text chars: 6122
- Score: 97.1%
- Match: **YES**

- Fingerprints: `logs/postalocity/debt-collection/local-fingerprint.json` vs `live-fingerprint.json`

### education
- Live: https://postalocity.com/education (200)
- Local prerender bytes: 42887
- Live visible text chars: 5333
- Score: 98.3%
- Match: **YES**

- Fingerprints: `logs/postalocity/education/local-fingerprint.json` vs `live-fingerprint.json`

### healthcare-billing
- Live: https://www.postalocity.com/healthcare/ (200)
- Local prerender bytes: 53523
- Live visible text chars: 6747
- Score: 97.4%
- Match: **YES**

- Fingerprints: `logs/postalocity/healthcare-billing/local-fingerprint.json` vs `live-fingerprint.json`

### healthcare-mailing-services
- Live: https://www.postalocity.com/healthcare/ (200)
- Local prerender bytes: 53532
- Live visible text chars: 6747
- Score: 97.4%
- Match: **YES**

- Fingerprints: `logs/postalocity/healthcare-mailing-services/local-fingerprint.json` vs `live-fingerprint.json`

### postcard
- Live: not mapped
- Local prerender bytes: 35867
- Live visible text chars: 0
- Score: 0.0%
- Match: **NO**
- Issues:
  - no live URL mapped
- Fingerprints: `logs/postalocity/postcard/local-fingerprint.json` vs `live-fingerprint.json`

### real-estate
- Live: https://postalocity.com/real-estate (200)
- Local prerender bytes: 46254
- Live visible text chars: 6299
- Score: 97.3%
- Match: **YES**

- Fingerprints: `logs/postalocity/real-estate/local-fingerprint.json` vs `live-fingerprint.json`

### self-storage
- Live: https://postalocity.com/self-storage (200)
- Local prerender bytes: 44539
- Live visible text chars: 5200
- Score: 96.8%
- Match: **YES**

- Fingerprints: `logs/postalocity/self-storage/local-fingerprint.json` vs `live-fingerprint.json`
