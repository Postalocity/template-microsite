---
story_type: journey
emotional_arc: "confidence -> confusion -> determination -> clarity -> exhaustion -> hope"
codex_terms: [14, 35, 44, 52]
---

# The Archaeology of Lost Content: Restoring the Broadstroke Promo Site

**Date:** April 22, 2026  
**Journey Type:** Content restoration, git archaeology, process reflection  
**Length:** ~4,200 words

---

## The Morning Confidence

It started with what seemed like a simple request.

"We need to sync the Broadstroke promotional products microsite with the live production site. Also implement some SEO improvements. Should be straightforward."

I had the source configs in `config/sites/broadstroke/promo.json`. I had the generator script that produces the React microsites. I had the built output in `sites/broadstroke/promo/dist/`. Everything was version controlled. What could go wrong?

The first few hours felt like routine maintenance. I updated the benefits section title from "Reclaim Hours Weekly" to "Order Confidently with Concierge Service" (per the request). I added a logo to the hero section. I tweaked some CTAs. I regenerated the site. I committed my changes. I felt productive.

Then the user said something that stopped me cold.

"Why does it still say 'Reclaim Hours Weekly' in the built site?"

I checked the source config. It said "Order Confidently." I checked the generated site. It said "Reclaim Hours Weekly." The source and the output didn't match. I regenerated. Same result. I looked at the git history, convinced I must have somehow committed the wrong version.

That's when I discovered the first crack in my understanding: **the generator wasn't reading from where I thought it was reading from.**

---

## The First Layer of Confusion

Here's what I thought was happening:
1. Source config lives in `config/sites/broadstroke/promo.json`
2. Generator reads that config
3. Generator outputs to `sites/broadstroke/promo/`
4. Site gets built from those generated files

Here's what was actually happening:
1. Generator reads from `config/sites/broadstroke/promo.json` ✓
2. Generator writes a **new** `config.json` into the generated site's directory
3. Generated site reads from **that** config.json
4. The built JavaScript bundle contains the content from the generated config.json

The problem? **I was editing the source, but the built output was reading from a different copy that had been overwritten by an earlier generation.**

I felt that familiar sinking feeling—the one where you realize you've been working on the wrong thing for hours. But worse than that was the realization that **I didn't understand my own system**. I had built this generator. I had written the code. And somehow I'd forgotten that it creates an intermediate copy of the config.

---

## The Git Archaeology Begins

The user had a hunch. "There was a former version with different content. Check the generated config.json history."

So I started digging through git commits—not in the source directory, but in the generated site directory. This felt backwards. Why would I look at generated files in version control? They're supposed to be ephemeral, reproducible, derived from the source.

Except they weren't ephemeral. Someone (possibly me, possibly an earlier version of the AI) had been editing the generated `sites/broadstroke/promo/config.json` directly and committing those changes. The source `config/sites/broadstroke/promo.json` was being treated as... what? A template? A suggestion?

I ran `git log --all --oneline -- "sites/broadstroke/promo/config.json"` and got a shock: **20+ commits** that had modified the generated config, not the source.

```bash
$ git log --all --oneline -- "sites/broadstroke/promo/config.json"
862cf91 fix: Restore HighlightsSection to promo site
a15cb5c fix: Restructure Order Confidently section - single banner, 6 benefits...
d9b7b74 fix: Update Quality Control comparison row per Danielle's feedback
be6aa4a fix: Update Personalization comparison row per Danielle's feedback
2274409 fix: Update Design Services to Customized Logo Design with proofs messaging
# ... 15 more commits
```

Each of these commits represented a change that had been made to the **wrong file**. The source was supposed to be in `config/sites/broadstroke/promo.json`, but someone had been editing the generated copy and committing it.

---

## The Archaeological Dig

The user directed me to commit `a15cb5c~1` (the parent of a15cb5c)—the last commit before the Order Confidently section was restructured. He suspected it had 7 benefits instead of 4.

I extracted that version:

```bash
git show a15cb5c~1:sites/broadstroke/promo/config.json > /tmp/order_confidently_full.json
```

And compared it to the current source:

- **Benefits**: 7 vs 4 (we found the missing ones!)
- **Comparison rows**: 10 vs 6 (Product Samples, Product Expertise, Presentation, Personalization were missing)
- **How It Works**: Different step titles and descriptions
- **FAQs**: Different contact info and timelines
- **Services**: "Custom customization" typo in older version

It was like finding a lost civilization. The Order Confidently version had content that had been gradually stripped away in subsequent "fixes." Each later commit had removed something:
- `a15cb5c` removed the 7th benefit and changed the title back to "Reclaim Hours Weekly"
- Later commits removed 4 comparison rows
- The contact info got genericized (promo-specific email and phone removed)

The more I dug, the clearer it became: **we had been gradually losing content through a death by a thousand commits.**

---

## The Highlight Section Mystery

Around the time I was feeling like I understood the pattern, the user asked: "Why does the HighlightSection keep getting deleted during generation?"

I checked the source config. It had a `highlight` section defined. I checked the built output. No highlight section visible. I looked at the generated `main.tsx`. No `HighlightSection` component imported or rendered.

I checked the generator template in `scripts/generate-site.ts`. The template was hardcoded with specific imports:

```typescript
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, 
         ComparisonTable, DifferenceSection, TrustBadgesSection, 
         HowItWorksSection, TestimonialsSection } from '@/components/shared';
```

No `HighlightSection`.

The component existed in the shared components folder. It was properly exported. The config had the data. But the generator simply never included it in the output. **It had never been wired up.**

I added it to the imports and the component tree, regenerated, and suddenly the "Visit Our Wichita Promo Showroom" section appeared. It had been sitting in the config for who-knows-how-many commits, completely invisible to users.

This was a different kind of problem. Not content that had been lost, but **content that had never actually worked.**

---

## The CTA That Wasn't

While fixing the HighlightSection, I noticed something else: the How It Works section had a CTA configured ("View Product Options"), but no button was rendering.

I checked the component. The interface definition didn't include `cta`:

```typescript
interface HowItWorksContent {
  section?: {
    id?: string;
    title?: string;
    description?: string;
    // cta missing!
  };
}
```

And the render logic didn't include any button. The CTA had been in the config for weeks, but the code ignored it. I fixed the interface and added the rendering logic.

Another ghost in the machine.

---

## The Long Afternoon of Tweaks

Once the major structural issues were resolved, we entered what I can only describe as "micro-optimization mode." The user had a sharp memory for specific wording:

- "Design Services should be Customized Logo Design in the comparison table"
- "Quality Control should say apparel reviewed by promo team"
- "Remove that last sentence from the free estimate FAQ"
- "Add back Sample Orders to benefits (we removed it earlier but it should be there)"

Each of these was a small edit, but they added up. I was discovering that the restoration wasn't just about finding the right historical version—it was about synthesizing the best parts of multiple versions.

The Order Confidently version (commit a15cb5c~1) had:
- 7 benefits ✓
- 10 comparison rows ✓
- Promo-specific contact info ✓
- "2-3 weeks" production timeline ✓

But it also had:
- Awkward "Custom customization" typo ✗ (we fixed this earlier)
- Generic Home & Auto description ✗ (current version is more detailed)
- No HighlightSection ✗ (never rendered)

The current version had:
- Better Home & Auto description ✓
- Correct "customization" wording ✓
- But missing comparison rows ✗
- Generic contact info ✗

We were creating a Frankenstein's monster of the best parts of each version. Which is fine, except that **I had no systematic way to track which changes were intentional improvements versus accidental losses.**

---

## The Git History Is a Liar

At one point, the user said: "Check if there was a later version where Design Services was replaced in the comparison table."

I searched the git history for "Customized Logo" in the comparison context. I found commit `2274409` with the message: "fix: Update Design Services to Customized Logo Design with proofs messaging"

Perfect! I thought. The change exists.

Except when I looked at the actual diff, it only changed the **Benefits** section title, not the comparison table. The commit message was misleading. It suggested a change that didn't actually happen (or happened somewhere else, or was reverted).

I ran into this repeatedly. Commit messages promised changes that weren't in the diff. Versions that should have had certain content didn't. The git history was technically accurate (every commit did what it said), but the **accumulated effect** was chaos.

The user had to remind me: "Maybe it's in a later commit of config.json"—meaning the generated one, not the source. I felt frustrated that we were chasing our tails between two files that were supposed to be the same thing.

---

## What We Actually Fixed (The Inventory)

By the end of the day, we had:

1. **Restored 6 benefits** (removed the 2 redundant showroom/sample benefits since they have their own HighlightSection now)
2. **Restored 4 comparison rows** (Product Samples, Product Expertise, Presentation, Personalization)
3. **Updated Design Services comparison** to "Customized Logo Design" with promo-specific proof language
4. **Updated Quality Control** to mention "Apparel reviewed by promo team"
5. **Restored promo-specific contact info** in FAQs (promoinfo@broadstrokeinc.com, 316-247-5348)
6. **Restored "2-3 weeks" timeline** with holiday ordering note
7. **Fixed the HighlightSection** (was never being rendered due to missing generator template code)
8. **Fixed the HowItWorks CTA** (was never being rendered due to missing component logic)
9. **Updated generator** to include HighlightSection in the template
10. **Updated component** to support HowItWorks CTA rendering

That's a lot for a day that started with "should be straightforward."

---

## What We Learned (The Hard Way)

### 1. The Source of Truth Is Not Where You Think

We had two files claiming to be the source of truth:
- `config/sites/broadstroke/promo.json` (the intended source)
- `sites/broadstroke/promo/config.json` (the generated copy)

The generator overwrote the second one from the first, but then we (or previous AI sessions) kept editing the second one and committing it. Result: **two divergent sources of truth.**

**Lesson:** The generated output should never be edited manually. If it needs to change, the source changes and the generator runs. Full stop. No exceptions.

### 2. The Generator Template Is Code Too

When I added the HighlightSection component to the shared components folder, I thought the job was done. But the generator had a hardcoded list of which components to import and render. The HighlightSection was never added to that list.

**Lesson:** Adding a component isn't enough. The generator template, the site-specific main.tsx template, and the component registry all need to stay in sync. This needs a checklist or automated validation.

### 3. Commit Messages Are Not Documentation

I found commits that said they did one thing but actually did another (or did it in a different place than expected). The commit `2274409` said it updated "Design Services to Customized Logo Design" but only updated the Benefits section, not the comparison table where we actually needed the change.

**Lesson:** Don't trust commit messages for understanding what changed. Always check the actual diff. And if a commit does multiple things, the message should list them all.

### 4. Content Drift Is Real

Over 20+ commits, we had gradually stripped away content:
- 7 benefits became 4
- 10 comparison rows became 6
- Promo-specific contact became generic
- "Order Confidently" became "Reclaim Hours Weekly"

None of these were intentional decisions. They were side effects of other changes, miscommunications, or edits to the wrong file.

**Lesson:** Content needs the same version control discipline as code. When you have parallel versions (source vs generated), they will drift. You need automated checks to catch drift.

### 5. Ghost Features Abound

The HighlightSection had been in the config for weeks but never rendered. The HowItWorks CTA had been in the config but never displayed. These were **ghost features**—configuration that looked valid but had no effect.

**Lesson:** Every config option should have a test that verifies it actually works. If it's in the schema but not used, it should throw a warning.

---

## What Should Happen Next

We need a content restoration protocol. Here's what I'm proposing:

### Immediate Actions

1. **Document the source of truth**: Create a README in `config/sites/broadstroke/` explaining that only files in this directory should be edited, and changes should be followed by regeneration.

2. **Add a git hook**: Pre-commit hook that checks if generated files were edited manually and blocks the commit with a warning.

3. **Schema validation**: Every config should validate against a schema that checks:
   - Required sections exist
   - All configured sections are actually rendered by the generator
   - No orphaned content

### Process Improvements

4. **Content inventory**: Create a manifest file that lists every piece of content (benefits, comparison rows, FAQ items) with their purpose. When something is removed, require a justification.

5. **Snapshot tests**: Before/after regeneration, compare the generated config to ensure no unexpected content was lost.

6. **Documentation**: For each site, maintain a changelog of intentional content changes (not just code changes).

### Generator Fixes

7. **Template audit**: Audit all generator templates to ensure they include all available components.

8. **Component registry**: Create a single source of truth for which components are available and which sites use them.

9. **Automated drift detection**: Daily job that compares source configs to generated configs and alerts on differences.

---

## The Emotional Arc

This was supposed to be a simple sync job. Instead, it became an archaeological expedition through our own version control, uncovering layer after layer of forgotten changes, broken assumptions, and missing infrastructure.

I felt confident at the start. Then confused when the source and output didn't match. Then determined as we pieced together what happened. Then exhausted as we chased down the twentieth micro-tweak. And finally, strangely hopeful—because now we know what we didn't know, and we can fix the system, not just the content.

The promo site is restored. But more importantly, we now understand why it needed restoring. That's the lesson that matters.

---

## Key Takeaways

- **Most important lesson:** Generated files should never be manually edited; they will always drift from the source if you do.
- **Technical insight:** A component being available doesn't mean it's being used; the generator template is the real gatekeeper.
- **Emotional takeaway:** The bugs that take the longest to fix are usually infrastructure problems disguised as content problems.

## What Next?

- **Related Codex terms:** [14: No stale branches], [35: Document configuration], [44: Validate assumptions], [52: Content drift detection]
- **Next story to write:** Implementing automated content drift detection and the generator template validation system
- **Files to review:** 
  - `scripts/generate-site.ts` (generator template logic)
  - `common/components/shared/index.ts` (component exports)
  - `config/sites/broadstroke/promo.json` (source of truth)
  - `docs/reflections/content-restoration-protocol.md` (to be written)

---

*Written at the end of a very long day of git archaeology and content restoration.*