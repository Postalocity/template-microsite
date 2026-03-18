# StringRay Agents - Consumer Guide

**Version**: 1.10.6

Quick reference for **using** the StringRay AI orchestration framework in your projects.

## What is StringRay?

StringRay provides intelligent multi-agent orchestration with automatic delegation, Codex compliance validation, and async multi-agent coordination. Agents operate via OpenCode plugin injection - no manual setup needed.

## New in v1.10

- **Token Optimization**: 20K max tokens, automatic compression at 15K threshold
- **Async Multi-Agent**: Up to 3 concurrent agents with capability-based routing
- **Autonomous Reporting**: Hourly health reports with agent activities
- **44 Available Agents**: Expanded agent ecosystem

## Quick Start

```bash
# Install StringRay in your project
npx strray-ai install

# Start using agents with @agent-name syntax
@architect design a REST API for user management
```

That's it! StringRay handles the rest automatically.

## How StringRay Works

### Basic Operation

1. **Install**: Run `npx strray-ai install` to configure agents in your project
2. **Invoke**: Use `@agent-name` syntax in prompts or code comments (e.g., `@architect design this API`)
3. **Automatic Routing**: StringRay automatically routes tasks to the appropriate agent based on complexity
4. **Agent Modes**: Agents can be `primary` (main coordinator) or `subagent` (specialized helper)

### What Happens Behind the Scenes

When you invoke an agent:
- StringRay analyzes your request complexity
- Routes to the most appropriate agent (capability-based)
- For complex tasks, spawns multiple subagents concurrently (up to 3)
- The agent(s) complete the task with Codex validation
- Results are delivered back to you

You don't need to manage agents manually - just use the `@agent-name` syntax and StringRay handles everything.

## Available Agents (44 Total)

### Core Agents

| Agent | Purpose | Example Invocation |
|-------|---------|-------------------|
| `@enforcer` | Codex compliance & error prevention | `@enforcer analyze this code` |
| `@orchestrator` | Complex multi-step task coordination | `@orchestrator implement feature` |
| `@architect` | System design & technical decisions | `@architect design API` |
| `@code-reviewer` | Quality assessment | `@code-reviewer review PR` |
| `@security-auditor` | Vulnerability detection | `@security-auditor scan` |
| `@refactorer` | Technical debt elimination | `@refactorer optimize code` |
| `@testing-lead` | Testing strategy | `@testing-lead plan tests` |
| `@bug-triage-specialist` | Error investigation | `@bug-triage-specialist debug error` |

### Specialist Agents

| Agent | Purpose | Example Invocation |
|-------|---------|-------------------|
| `@researcher` | Codebase exploration | `@researcher find implementation` |
| `@storyteller` | Narrative deep reflections | `@storyteller write a journey` |
| `@strategist` | Strategic planning | `@strategist plan product launch` |
| `@seo-consultant` | SEO optimization | `@seo-consultant audit site` |
| `@content-creator` | Content generation | `@content-creator write landing page` |
| `@growth-strategist` | Growth tactics | `@growth-strategist plan acquisition` |
| `@database-engineer` | Database design | `@database-engineer design schema` |
| `@backend-engineer` | Backend development | `@backend-engineer implement API` |
| `@frontend-engineer` | Frontend development | `@frontend-engineer build component` |
| `@mobile-developer` | Mobile development | `@mobile-developer build app` |
| `@devops-engineer` | DevOps & infrastructure | `@devops-engineer setup CI/CD` |
| `@performance-engineer` | Performance optimization | `@performance-engineer optimize load` |
| `@test-architect` | Testing architecture | `@test-architect design test suite` |
| `@tech-writer` | Technical documentation | `@tech-writer write API docs` |
| `@document-writer` | General documentation | `@document-writer write guide` |
| `@frontend-ui-ux-engineer` | UI/UX design | `@frontend-ui-ux-engineer design form` |
| `@multimodal-looker` | Visual analysis | `@multimodal-looker analyze mockup` |
| `@log-monitor` | Log analysis | `@log-monitor analyze errors` |

### Storyteller Agent

The `@storyteller` agent supports multiple story types:

| Type | Description | Invoke |
|------|-------------|--------|
| `reflection` | Technical deep reflections on development process | `@storyteller write a reflection about X` |
| `saga` | Long-form technical saga spanning multiple sessions | `@storyteller write a saga about X` |
| `journey` | Investigation/learning journey | `@storyteller write a journey about X` |
| `narrative` | Technical narrative - telling the story of code | `@storyteller write a narrative about X` |

## Complexity Routing

StringRay automatically routes tasks based on complexity:

- **Simple (≤25)**: Single agent handles it directly
- **Moderate (26-95)**: Multi-agent coordination possible
- **Enterprise (>95)**: Orchestrator-led team

Formula: `Score = (files×2 + change/10 + deps×3 + duration/10) × operation_weight × risk_mult`

## CLI Commands

```bash
# Installation & Setup
npx strray-ai install         # Install and configure
npx strray-ai status         # Check configuration
npx strray-ai health          # Run health check
npx strray-ai validate        # Validate installation

# Feature Discovery
npx strray-ai capabilities   # Show all available features
npx strray-ai calibrate      # Calibrate complexity scoring

# Reporting & Analytics
npx strray-ai report          # Generate reports
npx strray-ai analytics      # View pattern analytics
```

## Configuration

### Basic Configuration

StringRay works out of the box, but you can customize it via `.opencode/strray/features.json`:

```json
{
  "token_optimization": {
    "enabled": true,
    "max_context_tokens": 8000
  },
  "agent_spawn": {
    "max_concurrent": 8,
    "max_per_type": 3
  }
}
```

### Key Configuration Files

| File | Purpose | What You Can Change |
|------|---------|---------------------|
| `.opencode/opencode.json` | Main framework config | mode, plugins, paths |
| `.opencode/strray/features.json` | Feature flags | Enable/disable features |
| `.opencode/agents/` | Custom agent configs | Add your own agents |

### Environment Variables

```bash
# Optional overrides
STRRAY_MODE=development        # or 'consumer'
STRRAY_LOG_LEVEL=info          # debug, info, warn, error
STRRAY_NO_TELEMETRY=1          # Disable analytics
```

### Modifying Features

```bash
# View current features
cat .opencode/strray/features.json

# Set feature via CLI
npx strray-ai config set --feature token_optimization.enabled --value false

# Get a specific config value
npx strray-ai config get --feature activity_logging.enabled

# Export current config
npx strray-ai config export > strray-config.json
```

## Adding Custom Agents

You can create your own agents for specialized tasks:

### Step 1: Create Agent File

Create a file in `.opencode/agents/`:

```javascript
// .opencode/agents/my-custom-agent.js
module.exports = {
  name: 'my-custom-agent',
  description: 'My custom agent description',
  handler: async (context, args) => {
    // Your agent logic here
    return { result: "Task completed", data: {} };
  }
};
```

### Step 2: Use Your Agent

Once created, use it immediately:

```
@my-custom-agent do something useful
```

The agent is auto-discovered - no registration needed!

## Integration Points

### Git Hooks Integration

```bash
# Install Git hooks
npx strray-ai install --hooks

# Available hooks:
# - pre-commit: TypeScript check, linting, Codex validation
# - post-commit: Activity logging, analytics
# - pre-push: Full validation suite
```

### CI/CD Pipeline Integration

**GitHub Actions:**
```yaml
- name: StringRay Validation
  run: |
    npx strray-ai validate
    npx strray-ai report --ci
```

**GitLab CI:**
```yaml
strray-validate:
  script:
    - npx strray-ai validate
    - npx strray-ai report --ci
```

## Common Workflows

### Invoking Agents

**Basic Usage:**
```bash
# In code comment or prompt
@architect design a REST API for user management

@enforcer analyze this code for security issues

@testing-lead create tests for authentication module
```

**Complex Tasks:**
```
@orchestrator implement feature:user-authentication
  → Automatically spawns @architect → @testing-lead → @code-reviewer
```

### Agent Selection Guide

| Task Type | Primary Agent | Supporting Agents |
|-----------|---------------|-------------------|
| New feature | @orchestrator | @architect, @testing-lead |
| Bug fix | @bug-triage-specialist | @enforcer, @code-reviewer |
| Refactor | @refactorer | @architect, @testing-lead |
| Security audit | @security-auditor | @enforcer |
| Code review | @code-reviewer | @enforcer |
| Research | @researcher | @architect |

## Activity Logging & Reporting

### Activity Logging

Logs are stored in `.opencode/logs/strray-plugin-YYYY-MM-DD.log`

Enable/disable via `features.json`:
```json
{
  "activity_logging": {
    "enabled": true
  }
}
```

### Report Generation

```bash
# Daily summary report
npx strray-ai report --daily

# Performance analysis
npx strray-ai report --performance

# Compliance report (Codex violations)
npx strray-ai report --compliance

# CI-friendly report
npx strray-ai report --ci --output json
```

## Troubleshooting

### Quick Diagnostics

```bash
# Full health check
npx strray-ai health

# Validate installation
npx strray-ai validate

# Check configuration
npx strray-ai status

# View recent activity
cat .opencode/logs/strray-plugin-$(date +%Y-%m-%d).log | tail -50
```

### Common Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| Agents not spawning | Timeout on @invoke | Run `npx strray-ai health` |
| Validation failures | Pre-commit blocks | Run `npx strray-ai validate --fix` |
| Memory issues | Slow performance | `npx strray-ai session clear-cache` |
| Config not loading | Settings ignored | Check `.opencode/opencode.json` syntax |

### Getting Help

```bash
# Framework help
npx strray-ai help

# View capabilities
npx strray-ai capabilities

# Check version
npx strray-ai --version
```

---

## Migration Guide (v1.10)

**Version 1.10 introduces token optimization and async multi-agent coordination.**

### What's New

- **Token Optimization**: 20K max tokens, compression at 15K threshold
- **Async Multi-Agent**: Up to 3 concurrent agents
- **44 Agents**: Expanded ecosystem including specialist agents
- **Autonomous Reporting**: Hourly health reports

### Upgrading

```bash
npm update strray-ai
npx strray-ai health
```

---

## Additional Resources

- [Full Documentation](https://github.com/htafolla/stringray)
- [Configuration Guide](https://github.com/htafolla/stringray/blob/master/docs/CONFIGURATION.md)
- [Troubleshooting](https://github.com/htafolla/stringray/blob/master/docs/TROUBLESHOOTING.md)

---

**Version**: 1.10.6 | [GitHub](https://github.com/htafolla/stringray)

---

# Project Context: Multi-Brand Microsite Platform

This section provides context for AI agents working on this codebase.

## Project Overview

**Purpose**: A multi-brand microsite generator that supports multiple brands (Postalocity, Promo, TechSP) with separated brand configurations and institutional knowledge bases (IKBs).

**Key Files**:
- `common/contexts/BrandContext.tsx` - Multi-brand support via React context
- `common/contexts/IKBContext.tsx` - Institutional knowledge base (prevents AI hallucination)
- `engine/config-loader.ts` - Brand/IKB loading with validation
- `scripts/generate-site.ts` - Site generator with `--brand` and `--service` flags

## Brand System

### Supported Brands
- **postalocity** - Direct mail automation (default)
- **promo** - Promotional/branding solutions
- **techsp** - Enterprise technology platform

### Brand Config Structure
```
config/brands/{brand}/
├── brand.json      # id, name, slug, domain, urls, logo
├── contact.json    # phone, email, address, hours
└── social.json     # twitter, linkedin, facebook, instagram
```

## IKB System (Institutional Knowledge Base)

### Purpose
Prevents AI hallucination by providing verified business rules, pricing, and terminology.

### IKB Config Structure
```
config/ikb/{brand}/
├── rules.json          # Trust signals, promo codes, blocklists
├── pricing.json        # Base prices, tiers, add-ons
├── proof-options.json  # Proof options and upgrades
└── terminology.json    # Industry-specific terms
```

### Key IKB Rules
- **Trust Signals**: Verified certifications (NCOA, CASS, ISO 9001)
- **Promo Codes**: Service-specific promo codes per brand
- **Blocklisted Content**: testimonial, video, live-chat, team, awards, reviews
- **Blocklisted Phrases**: "guaranteed delivery", "100% accurate", "award-winning", etc.

## Context Hooks

### BrandContext Hooks
```typescript
useBrand()           // { brand, contact, social, promoCode }
useBrandName()       // string - e.g., "Postalocity"
useBrandUrls()       // { app, website, blog, ... }
useBrandContact()     // { phone, email, address, hours }
useBrandSocial()      // { twitter, linkedin, facebook, instagram }
usePromoCode()       // string | undefined
useAppUrl()          // string with promo code appended
```

### IKBContext Hooks
```typescript
useIKB()                    // Full context with validation
useIKBRules()              // { trustSignals, promoCodes, blocklistedContent, ... }
useTrustSignals()           // string[] - e.g., ["NCOA Verified 2024", "CASS Certified 2024"]
usePromoCodeFromIKB(slug)  // Get promo code for service slug
useIKBPricing()             // { basePrice, currency, tiers, addOns }
useIKBTerminology()         // { mailClasses, certifications, industryTerms }
```

### Content Validation
```typescript
isContentAllowed('testimonial')  // false (blocklisted)
isPhraseAllowed('guaranteed delivery')  // false (blocklisted)
```

## Testing

```bash
npm test              # 158 tests across 9 files
npm run test:coverage # Coverage report
```

### Test Files
| File | Tests |
|------|-------|
| `BrandContext.test.tsx` | 20 |
| `IKBContext.test.tsx` | 19 |
| `generate-site.test.ts` | 24 |
| `config-loader.test.ts` | 23 |
| `content-factory.test.ts` | 42 |

## Site Generation

```bash
# Generate a site
npm run generate -- --brand postalocity --service credit-repair

# Then build
cd sites/credit-repair && npm install && npm run build
```

## Important Patterns

### 1. Always Use Context Hooks
❌ **Don't**: `<a href="https://prod.postalocity.com/login.html">`
✅ **Do**: `<a href={useAppUrl()}>`

### 2. Don't Hardcode Brand Names
❌ **Don't**: "Postalocity handles everything"
✅ **Do**: `{useBrandName()} handles everything`

### 3. Trust Signals from IKB
❌ **Don't**: Hardcode certifications
✅ **Do**: Use `useTrustSignals()` hook

### 4. Validate Content Against Blocklists
Before adding testimonials, videos, or promotional phrases, check:
```typescript
const { isContentAllowed, isPhraseAllowed } = useIKB();
isContentAllowed('testimonial');  // false
isPhraseAllowed('guaranteed results');  // false
```

## Error Handling

- Missing `BrandProvider`: Throws in dev mode, falls back to Postalocity defaults in prod
- Missing `IKBProvider`: Throws in dev mode, uses default IKB in prod
- Invalid brand/IKB config: Validation errors in `config-loader.ts`

## Adding a New Brand

1. Create `config/brands/mybrand/{brand,contact,social}.json`
2. Create `config/ikb/mybrand/{rules,pricing,proof-options,terminology}.json`
3. Update `generate-site.ts` with new brand defaults (if needed)
4. Add tests for new brand configurations
