# Extended Microsite Config Schema (for SEO & Marketing AI)

This document defines the extended JSON schema for microsite configuration, supporting both the standard format and the comprehensive SEO/research format used by AI systems like Grok.

## Full Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "version": {
      "type": "string",
      "description": "Version identifier and microsite type (e.g., 'Postalocity Microsite Config — Debt Collection Agencies')"
    },
    "planningSessionSummary": {
      "type": "string",
      "description": "Summary of the planning session for this microsite"
    },
    "research": {
      "type": "object",
      "description": "SEO research data from AI analysis",
      "properties": {
        "currentRankingSnapshot": {
          "type": "string",
          "description": "Current ranking positions for target keywords"
        },
        "keywordOpportunityAnalysis": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "keyword": { "type": "string" },
              "volume": { "type": "string" },
              "difficulty": { "type": "string" },
              "intent": { "type": "string" },
              "priority": { "type": "string" }
            }
          }
        },
        "competitiveGapInsights": {
          "type": "array",
          "items": { "type": "string" }
        },
        "actionableRecommendations": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "site": {
      "type": "object",
      "required": ["name", "slug", "domain", "basename", "contact"],
      "properties": {
        "name": { "type": "string" },
        "slug": { "type": "string" },
        "domain": { "type": "string" },
        "basename": { "type": "string" },
        "contact": {
          "type": "object",
          "properties": {
            "email": { "type": "string" },
            "phone": { "type": "string" },
            "address": { "type": "string" }
          }
        }
      }
    },
    "seo": {
      "type": "object",
      "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" },
        "keywords": { "type": "array", "items": { "type": "string" } },
        "ogTitle": { "type": "string" },
        "ogDescription": { "type": "string" },
        "canonical": { "type": "string" }
      }
    },
    "navigation": {
      "type": "object",
      "properties": {
        "links": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "label": { "type": "string" },
              "href": { "type": "string" }
            }
          }
        },
        "cta": {
          "type": "object",
          "properties": {
            "text": { "type": "string" },
            "subtext": { "type": "string" },
            "href": { "type": "string" },
            "variant": { "type": "string" }
          }
        }
      }
    },
    "content": {
      "type": "object",
      "properties": {
        "hero": {
          "type": "object",
          "properties": {
            "headline": {
              "type": "object",
              "properties": {
                "main": { "type": "string" },
                "highlightTerm": { "type": "string" }
              }
            },
            "subhead": { "type": "string" },
            "background": {
              "type": "object",
              "properties": {
                "image": { "type": "string" },
                "overlay": { "type": "boolean" }
              }
            },
            "ctas": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "text": { "type": "string" },
                  "subtext": { "type": "string" },
                  "href": { "type": "string" },
                  "variant": { "type": "string" }
                }
              }
            }
          }
        },
        "benefits": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object",
              "properties": {
                "title": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "heading": { "type": "string" },
            "items": {
              "type": "array",
              "items": { "type": "string" }
            },
            "benefits": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "icon": { "type": "string" },
                  "title": { "type": "string" },
                  "description": { "type": "string" },
                  "detail": { "type": "string" },
                  "metrics": { "type": "string" }
                }
              }
            }
          }
        },
        "howItWorks": {
          "type": "object",
          "description": "NEW: Step-by-step process section",
          "properties": {
            "heading": { "type": "string" },
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "step": { "type": "number" },
                  "title": { "type": "string" },
                  "description": { "type": "string" }
                }
              }
            }
          }
        },
        "services": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object",
              "properties": {
                "title": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "heading": { "type": "string" },
            "items": {
              "type": "array",
              "items": { "type": "string" }
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "icon": { "type": "string" },
                  "title": { "type": "string" },
                  "description": { "type": "string" }
                }
              }
            }
          }
        },
        "comparison": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object",
              "properties": {
                "title": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "columns": {
              "type": "object",
              "properties": {
                "ourSolution": { "type": "string" },
                "traditional": { "type": "string" }
              }
            },
            "rows": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "icon": { "type": "string" },
                  "feature": { "type": "string" },
                  "ourSolution": { "type": "string" },
                  "traditionalApproach": { "type": "string" }
                }
              }
            }
          }
        },
        "faq": {
          "type": "object",
          "oneOf": [
            {
              "properties": {
                "section": {
                  "type": "object",
                  "properties": {
                    "title": { "type": "string" },
                    "description": { "type": "string" }
                  }
                },
                "faqs": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "q": { "type": "string" },
                      "a": { "type": "string" }
                    }
                  }
                }
              }
            },
            {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "question": { "type": "string" },
                  "answer": { "type": "string" }
                }
              }
            }
          ]
        },
        "fullArticleCopy": {
          "type": "object",
          "description": "NEW: Long-form SEO article content",
          "properties": {
            "introduction": { "type": "string" },
            "sections": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "heading": { "type": "string" },
                  "content": { "type": "string" }
                }
              }
            },
            "conclusion": { "type": "string" }
          }
        },
        "about": {
          "type": "object",
          "properties": {
            "company": {
              "type": "object",
              "properties": {
                "founded": { "type": "string" },
                "teamSize": { "type": "string" },
                "locations": { "type": "array", "items": { "type": "string" } }
              }
            },
            "mission": { "type": "string" },
            "values": { "type": "array", "items": { "type": "string" } }
          }
        },
        "trustSignals": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object",
              "properties": {
                "title": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "signals": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": { "type": "string" },
                  "name": { "type": "string" },
                  "organization": { "type": "string" },
                  "year": { "type": "string" },
                  "verified": { "type": "boolean" }
                }
              }
            }
          }
        },
        "reviews": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object",
              "properties": {
                "title": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "reviews": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "location": { "type": "string" },
                  "role": { "type": "string" },
                  "rating": { "type": "number" },
                  "text": { "type": "string" },
                  "date": { "type": "string" },
                  "verified": { "type": "boolean" }
                }
              }
            }
          }
        }
      }
    },
    "branding": {
      "type": "object",
      "properties": {
        "logo": { "type": "string" },
        "primaryColor": { "type": "string" },
        "secondaryColor": { "type": "string" }
      }
    },
    "footer": {
      "type": "object",
      "properties": {
        "finalCTA": {
          "type": "object",
          "properties": {
            "headline": { "type": "string" },
            "href": { "type": "string" }
          }
        }
      }
    },
    "theme": {
      "type": "object",
      "properties": {
        "mode": { "type": "string", "enum": ["light", "dark", "system"] }
      }
    }
  }
}
```

## Example: Debt Collection Microsite

```json
{
  "version": "Postalocity Microsite Config — Debt Collection Agencies",
  "planningSessionSummary": "Complete microsite for debt collection agencies. Emphasizes reclaiming operational hours through automation of notices, validation letters, and certified mail. Core differentiators: built-in address verification, inclusive real-time tracking, simple PDF upload. No delivery claims, no specific hour savings, ISO 9001 documented processes.",
  "research": {
    "currentRankingSnapshot": "Top 3–5 positions on primary transactional phrases: mailing services for debt collection agencies, debt collection letter printing and mailing services, certified mail for debt collection agencies.",
    "keywordOpportunityAnalysis": [
      {
        "keyword": "mailing services for debt collection agencies",
        "volume": "800–2,000 (est.)",
        "difficulty": "Low–Medium",
        "intent": "Transactional",
        "priority": "High"
      },
      {
        "keyword": "debt collection letter printing and mailing services",
        "volume": "600–1,500 (est.)",
        "difficulty": "Low",
        "intent": "Transactional",
        "priority": "High"
      }
    ],
    "competitiveGapInsights": [
      "Competitors emphasize turnaround windows and specialized certified proof",
      "Postalocity advantage: free address verification + inclusive tracking on every letter"
    ],
    "actionableRecommendations": [
      "Add FAQ + Benefits sections for snippet capture",
      "Implement FAQPage schema for rich results"
    ]
  },
  "site": {
    "name": "Debt Collection Mailing Service",
    "slug": "debt-collection",
    "domain": "postalocity.com",
    "basename": "/debt-collection",
    "contact": {
      "email": "helpdesk@postalocity.com",
      "phone": "316-260-2220",
      "address": "820 W 2nd St N, Wichita KS 67203"
    }
  },
  "seo": {
    "title": "Debt Collection Mailing Service — Automated Notices & Certified Letters",
    "description": "Automate debt collection mailing for notices, certified letters, compliance documents, and payment reminders. Reclaim hours weekly with address verification, USPS tracking, and secure PDF upload processing from $1.31 per letter.",
    "keywords": [
      "debt collection mailing service",
      "automated mailing for collection agencies",
      "certified mail for debt collection agencies"
    ],
    "ogTitle": "Debt Collection Mailing Service — Reclaim Hours Weekly",
    "ogDescription": "Collection agencies streamline high-volume notices and certified mailings with Postalocity's automated platform.",
    "canonical": "https://postalocity.com/debt-collection"
  },
  "navigation": {
    "links": [
      { "label": "Benefits", "href": "#benefits" },
      { "label": "How It Works", "href": "#how-it-works" },
      { "label": "Services", "href": "#services" },
      { "label": "FAQ", "href": "#faq" }
    ],
    "cta": {
      "text": "Starting at $1.31",
      "subtext": "1-page. single-sided. B&W. includes postage.",
      "href": "https://prod.postalocity.com/login.html?signUp=true&promo=bank2026",
      "variant": "primary"
    }
  },
  "content": {
    "hero": {
      "headline": {
        "main": "Debt Collection Mailing Service —",
        "highlightTerm": "Automated Notices & Certified Letters"
      },
      "subhead": "Collection agencies manage high volumes of collection notices, certified letters, compliance documents, and payment reminders. Postalocity's automated mailing platform streamlines processing, includes address verification to reduce returned mail, and provides real-time USPS tracking for every letter.",
      "background": {
        "image": "/debt-collection/images/debt-collection-hero.jpg",
        "overlay": true
      },
      "ctas": [
        {
          "text": "Starting at $1.31",
          "subtext": "1-page. single-sided. B&W. includes postage.",
          "href": "https://prod.postalocity.com/login.html?signUp=true&promo=bank2026",
          "variant": "primary"
        },
        {
          "text": "See How It Works",
          "subtext": "Explore automated mailing for collection agencies",
          "href": "#how-it-works",
          "variant": "outline"
        }
      ]
    },
    "benefits": {
      "heading": "Benefits of Automated Mailing for Collection Agencies",
      "items": [
        "Reclaim hours weekly from manual letter preparation and mailing tasks",
        "Reduce returned mail through built-in address verification",
        "Support compliance documentation with real-time USPS tracking for every letter",
        "Scale high-volume processing without proportional staffing increases",
        "Eliminate need for mailing equipment, postage meters, or separate certified mail workflows"
      ]
    },
    "howItWorks": {
      "heading": "How It Works",
      "steps": [
        {
          "step": 1,
          "title": "Upload Your Letters",
          "description": "Securely upload batch PDFs of collection notices, validation letters, or payment reminders from your existing system."
        },
        {
          "step": 2,
          "title": "Address Verification",
          "description": "Built-in verification identifies and corrects inaccuracies before production begins."
        },
        {
          "step": 3,
          "title": "Automated Production",
          "description": "Print, fold, stuff, seal, and apply First-Class postage — all handled automatically."
        },
        {
          "step": 4,
          "title": "Prompt USPS Submission",
          "description": "Same-day or next-day processing and submission to USPS."
        },
        {
          "step": 5,
          "title": "Real-Time Tracking",
          "description": "Monitor submission and status for every letter directly in the dashboard."
        }
      ]
    },
    "services": {
      "heading": "Included Services & Features",
      "items": [
        "Secure PDF batch upload",
        "Address verification (included at no extra cost)",
        "Black & white printing, folding, stuffing, sealing",
        "First-Class Mail postage with real-time tracking",
        "Certified mail options available for validation notices",
        "No hardware or software installation required",
        "ISO 9001 documented processes"
      ]
    },
    "faq": [
      {
        "question": "What types of debt collection letters can be processed?",
        "answer": "The platform handles collection notices, FDCPA validation letters, payment reminders, cease communications, and certified mail where proof of mailing is required."
      },
      {
        "question": "Is address verification included?",
        "answer": "Yes — address verification is built-in and included with every mailing to help reduce returned mail and associated rework."
      },
      {
        "question": "Does every letter include tracking?",
        "answer": "Yes — real-time USPS tracking is provided for every letter, supporting proof-of-mailing documentation."
      },
      {
        "question": "What is the starting price?",
        "answer": "Processing starts at $1.31 per letter (1-page, single-sided, black & white, including envelope and First-Class postage with tracking)."
      }
    ],
    "fullArticleCopy": {
      "introduction": "Debt collection agencies process high volumes of notices, validation letters, payment reminders, and compliance documents while meeting FDCPA and Regulation F requirements. Postalocity's automated mailing service streamlines debt collection mailing through secure PDF upload, print-fold-stuff-seal, address verification, postage application, prompt USPS submission, and real-time tracking — enabling agencies to reclaim hours weekly from manual preparation and mailing tasks.",
      "sections": [
        {
          "heading": "Operational Challenges in Debt Collection Mailing",
          "content": "Collection agencies must produce timely, accurate mailings for validation notices, payment demands, and compliance documents. Manual preparation, printing, folding, inserting, sealing, and postage handling consume significant staff time that could be redirected to account management and debtor communication. Returned mail from outdated addresses adds rework and delays outreach effectiveness."
        },
        {
          "heading": "How Postalocity Automates Debt Collection Mailing",
          "content": "Agencies upload batch PDFs securely. Postalocity performs address verification, automated production (print, fold, stuff, seal), First-Class postage with tracking, prompt USPS submission (same-day or next-day processing), and provides real-time tracking for each letter. No equipment investment or separate certified mail handling is required."
        },
        {
          "heading": "Key Benefits for Collection Agencies",
          "content": "Reclaim hours weekly by eliminating manual envelope stuffing and postage tasks. Reduce returned mail through proactive address verification. Support compliance documentation with real-time USPS tracking for proof of mailing and submission. Scale efficiently for high volumes without proportional staffing increases."
        }
      ],
      "conclusion": "Automated mailing streamlines compliance-related communication while freeing operational resources for core collection activities. Sign up today using promo code bank2026 at https://prod.postalocity.com/login.html?signUp=true&promo=bank2026 or contact helpdesk@postalocity.com | 316-260-2220."
    }
  }
}
```

## Key Differences: Standard vs Extended Format

| Field | Standard | Extended (AI Research) |
|-------|----------|----------------------|
| `version` | ❌ | ✅ Planning session identifier |
| `planningSessionSummary` | ❌ | ✅ Summary from AI planning |
| `research` | ❌ | ✅ Keyword research, competitive gaps |
| `benefits.heading` | ❌ | ✅ Simple string for list format |
| `benefits.items` | ❌ | ✅ Array of strings |
| `howItWorks` | ❌ | ✅ NEW: Step-by-step section |
| `services.heading` | ❌ | ✅ Simple string for list format |
| `services.items` | ❌ | ✅ Array of strings |
| `faq` | `{q, a}` format | ✅ Can be simple `{question, answer}` array |
| `fullArticleCopy` | ❌ | ✅ NEW: Long-form SEO article |

## CTA Button Format (REQUIRED)

```json
{
  "text": "Starting at $1.31",
  "subtext": "1-page. single-sided. B&W. includes postage.",
  "href": "https://prod.postalocity.com/login.html?signUp=true&promo=bank2026",
  "variant": "primary"
}
```

## Rules Summary

| Rule | Standard | Extended |
|------|----------|----------|
| Headline separator | Em dash (—) | Em dash (—) |
| No specific hours | ✅ | ✅ "Reclaim hours weekly" |
| No delivery claims | ✅ | ✅ "Prompt USPS submission" |
| Pricing | $1.31/page | $1.31/page |
| Promo code | bank2026 | bank2026 |