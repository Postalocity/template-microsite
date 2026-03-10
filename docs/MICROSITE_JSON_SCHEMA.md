# JSON Configuration Format for Microsite Platform

This document defines the JSON schema and format required for the microsite platform configuration files.

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["site", "branding", "footer", "theme", "seo", "navigation", "content"],
  "properties": {
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
          "required": ["email", "phone", "address"],
          "properties": {
            "email": { "type": "string", "format": "email" },
            "phone": { "type": "string" },
            "address": { "type": "string" }
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
            "required": ["label", "href"],
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
            "variant": { "type": "string", "enum": ["primary", "outline"] }
          }
        }
      }
    },
    "content": {
      "type": "object",
      "required": ["hero", "benefits", "services", "comparison", "faq"],
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
                "required": ["q", "a"],
                "properties": {
                  "q": { "type": "string" },
                  "a": { "type": "string" }
                }
              }
            }
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
            },
            "aggregateRating": {
              "type": "object",
              "properties": {
                "overall": { "type": "number" },
                "total": { "type": "number" },
                "distribution": { "type": "array", "items": { "type": "number" } }
              }
            }
          }
        },
        "caseStudies": {
          "type": "object",
          "properties": {
            "section": {
              "type": "object": {
                "",
              "propertiestitle": { "type": "string" },
                "description": { "type": "string" }
              }
            },
            "caseStudies": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "client": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string" },
                      "industry": { "type": "string" },
                      "size": { "type": "string" },
                      "location": { "type": "string" }
                    }
                  },
                  "metrics": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "category": { "type": "string" },
                        "before": { "type": "string" },
                        "after": { "type": "string" },
                        "delta": { "type": "string" }
                      }
                    }
                  },
                  "methodology": { "type": "string" },
                  "timeline": { "type": "string" },
                  "outcome": { "type": "string" },
                  "testimonial": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Example Configuration

```json
{
  "site": {
    "name": "Credit Repair Mailing Service",
    "slug": "credit-repair",
    "domain": "postalocity.com",
    "basename": "/credit-repair",
    "contact": {
      "email": "helpdesk@postalocity.com",
      "phone": "316-260-2220",
      "address": "820 W 2nd St N, Wichita KS 67203"
    }
  },
  "branding": {
    "logo": "/postalocity-logo.png",
    "primaryColor": "#0F766E",
    "secondaryColor": "#F59E0B"
  },
  "footer": {
    "finalCTA": {
      "headline": "Ready to streamline your mailing?",
      "href": "https://prod.postalocity.com/login.html?signUp=true&promo=bank2026"
    }
  },
  "theme": {
    "mode": "light"
  },
  "seo": {
    "title": "Automate Dispute Letter Mailing Service | Credit Repair Mailing Service",
    "description": "Automated dispute letter mailing from $1.31/letter. Reclaim hours weekly. Free signup, address verification, Certified Mail, USPS tracking, API integration.",
    "keywords": ["dispute letter mailing service", "credit repair mailing", "automated mailing service"],
    "ogTitle": "Automate Dispute Letter Mailing | Reclaim Hours Weekly",
    "ogDescription": "Credit repair professionals reclaim hours weekly with Postalocity's automated dispute letter mailing service.",
    "canonical": "https://postalocity.com/credit-repair"
  },
  "navigation": {
    "links": [
      { "label": "Benefits", "href": "#benefits" },
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
        "main": "Dispute Letter Mailing Service —",
        "highlightTerm": "Automated Credit Repair Mailing"
      },
      "subhead": "Credit repair professionals handle high volumes of dispute letters to Equifax, Experian, TransUnion, and creditors. Postalocity's automated mailing platform streamlines processing.",
      "background": {
        "image": "/credit-repair/images/credit-repair-hero.jpg",
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
          "subtext": "Explore our comprehensive services",
          "href": "#services",
          "variant": "outline"
        }
      ]
    },
    "benefits": {
      "section": {
        "title": "Why Credit Repair Professionals Choose Postalocity",
        "description": "Streamline your dispute letter operations with automated processing"
      },
      "benefits": [
        {
          "icon": "clock",
          "title": "Reclaim Hours Weekly",
          "description": "Automate printing, folding, stuffing, sealing, and postage application.",
          "detail": "Manual processes consume 40+ hours weekly. Automation reduces this to minutes.",
          "metrics": "40+ hours reclaimed weekly"
        }
      ]
    },
    "services": {
      "section": {
        "title": "Comprehensive Dispute Letter Mailing Services",
        "description": "End-to-end automated mailing designed to streamline credit repair operations"
      },
      "services": [
        {
          "icon": "upload",
          "title": "Bulk Upload Processing",
          "description": "Upload PDFs in bulk for expedited processing with options for Certified Mail, First-Class, or Standard Mail."
        }
      ]
    },
    "comparison": {
      "section": {
        "title": "Why Choose Automated Mailing vs. Manual Processing",
        "description": "Compare the efficiency and compliance advantages"
      },
      "columns": {
        "ourSolution": "Postalocity Automated Mailing",
        "traditional": "Manual In-House Processing"
      },
      "rows": [
        {
          "icon": "clock",
          "feature": "Processing Time",
          "ourSolution": "Same-day processing after approval",
          "traditionalApproach": "2-5 business days minimum"
        }
      ]
    },
    "faq": {
      "section": {
        "title": "Common Questions About Dispute Letter Mailing",
        "description": "Answers about integration, compliance, processing, and getting started"
      },
      "faqs": [
        {
          "q": "How fast can I get dispute letters mailed?",
          "a": "Same-day or next-day processing. We process 5,000+ letters with prompt submission to USPS."
        }
      ]
    }
  }
}
```

## Field Guidelines

### Headlines
- Use em dash (—) for separator, not pipe (|)
- Professional, outcome-focused language
- Hours-focused messaging (not cost-only)

### Descriptions
- First 100 words must contain primary keywords (for AI summarization)
- Professional tone, no dramatic language
- Quantified, specific claims

### CTA Buttons
- Include pricing: "Starting at $1.31"
- Subtext with clear value: "1-page. single-sided. B&W. includes postage."
- Link directly to signup with promo code

### FAQ Answers
- Avoid speculative claims (delivery times, specific hours)
- Use "prompt submission" instead of "same-day delivery"
- Professional, verifiable claims only

### Testimonials
- Include city/state locations
- Specific metrics (hours saved, percentages)
- Role and organization type