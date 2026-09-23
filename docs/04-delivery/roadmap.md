# Product Roadmap

> **Section:** Delivery
> **Status:** Strategic Product Direction
> **Audience:** Product, Engineering, Contributors & Community
> **Last updated:** September 2026

---

## Overview

This document describes the expected evolution of Mosaic as a Product.

It is intentionally high-level.

The Roadmap does not define:

* implementation order;
* engineering schedules;
* release dates;
* infrastructure milestones;
* internal development dependencies.

Those concerns belong to internal delivery planning.

The Roadmap instead communicates:

> **What Mosaic is trying to become over time.**

---

# 1. Roadmap Philosophy

Mosaic follows:

> **Build for evolution, not speculation.**

The Product should have a clear direction without pretending that every future requirement can be predicted before real Users interact with the platform.

---

# 2. Roadmap Is Not a Promise

Items described beyond the MVP represent Product direction rather than guaranteed commitments.

A future capability may be:

* changed;
* delayed;
* replaced;
* combined with another capability;
* removed entirely

as Mosaic learns from real usage.

---

# 3. Evidence-Driven Evolution

After the MVP, prioritization should increasingly follow:

```text
Product Vision
      +
User Feedback
      +
Observed Behavior
      +
Technical Evidence
      +
Operational Reality
      ↓
Prioritization
```

rather than implementing features simply because they were imagined early in the project.

---

# 4. Product Horizons

Mosaic's evolution is described through four horizons:

```text
Horizon 1
MVP Foundation

Horizon 2
Product Expansion

Horizon 3
Creative Intelligence

Horizon 4
Platform Ecosystem
```

These horizons describe maturity and direction.

They are not calendar periods.

---

# Horizon 1 — MVP Foundation

## 5. Objective

Establish Mosaic's central Product experience.

The initial Product should prove that AI-generated creative work becomes more useful when its Prompt, generation context, customization possibilities, and creative history remain connected.

---

# 6. Core Creation Experience

The MVP centers on:

```text
Creation
   │
   ├── Generated Media
   ├── Prompt
   ├── Generation Context
   ├── Creator
   └── Creative Lineage
```

This establishes the fundamental Mosaic artifact.

---

# 7. Prompt Understanding

Users should be able to understand how a Creation was produced rather than seeing only its final Media.

This includes access to:

* Prompt;
* creator explanations;
* relevant generation context;
* customizable areas.

---

# 8. Prompt Customization

Users should be able to adapt creator-defined parts of a Prompt.

Conceptually:

```text
Discover Prompt
      ↓
Understand customizable areas
      ↓
Change values
      ↓
Receive customized Prompt
```

---

# 9. External Generation

Initial AI generation occurs outside Mosaic.

The User can take a customized Prompt to an external AI video generation tool and return with the generated result.

This allows Mosaic to validate its creative workflow without initially depending on AI-generation provider infrastructure.

---

# 10. Creative Lineage

Creative Lineage is part of the Product foundation.

When a User publishes a new Creation derived from another:

```text
Creation A
    ↓
Creation B
```

the relationship remains part of Mosaic's historical creative graph.

---

# 11. Creative Evolution

Creators may also evolve their own work through new derived Creations.

Example:

```text
Creation A — Original approach
       ↓
Creation B — Updated approach
       ↓
Creation C — New interpretation
```

Mosaic preserves each published creative state rather than overwriting the historical record.

---

# 12. Discovery Foundation

Users should be able to:

* browse Creations;
* search;
* explore creators;
* navigate basic Lineage relationships.

Discovery should remain useful without initially requiring sophisticated recommendation infrastructure.

---

# 13. Community Foundation

The initial community experience includes foundational interactions such as:

* Follow;
* Like;
* Comment;
* Save;
* Collections;
* sharing;
* relevant Notifications.

These interactions support Creation rather than replacing it as the Product's central focus.

---

# 14. Safety Foundation

Mosaic's initial public community requires:

* Blocking;
* Reporting;
* Moderation;
* Appeals where appropriate;
* Administration;
* auditability of important privileged actions.

Safety is part of Product viability rather than an optional later feature.

---

# 15. Horizon 1 Outcome

At the end of the MVP Foundation, Mosaic should support the complete conceptual loop:

```text
Discover
   ↓
Understand
   ↓
Customize
   ↓
Generate Externally
   ↓
Publish
   ↓
Derive
   ↓
Discover Again
```

---

# Horizon 2 — Product Expansion

## 16. Objective

Improve the usefulness, depth, and retention of the Product after the core creative loop has been validated.

Priorities inside this horizon should follow real MVP evidence.

---

# 17. Richer Discovery

Potential improvements include:

* improved ranking;
* richer filters;
* better category navigation;
* improved tag discovery;
* Trending;
* creator discovery;
* related Creations;
* richer Lineage exploration.

---

# 18. Personalized Discovery

Mosaic may gradually personalize Discovery based on appropriate signals.

Potential signals include:

```text
Following
Saves
Likes
Creative interests
Categories
Tags
Creation interactions
```

Private behavioral data must remain subject to Mosaic's Privacy principles.

---

# 19. Recommendation Evolution

Recommendations may evolve from simple rules toward more sophisticated ranking.

Potential evolution:

```text
Basic Rules
    ↓
Behavioral Signals
    ↓
Personalized Ranking
    ↓
Advanced Recommendation Models
```

Mosaic does not require the final stage merely because it is technically possible.

---

# 20. Semantic Search

🔮 **Future Possibility**

Search may eventually understand semantic similarity rather than relying only on textual matching.

Potential capabilities include:

* concept-based retrieval;
* similar Prompt discovery;
* natural-language queries;
* hybrid keyword + semantic Search.

---

# 21. Richer Creator Profiles

Creator Profiles may evolve to provide:

* featured Creations;
* selected Collections;
* creative activity;
* Lineage impact;
* creator-specific discovery.

---

# 22. Creator Analytics

🔮 **Future Product Capability**

Creators may eventually receive private analytics about their Creations.

Potential information could include:

* discovery;
* engagement;
* Saves;
* derived Creations;
* Lineage activity.

Exact analytics require clearly defined metrics.

---

# 23. Lineage Analytics

Mosaic may expose useful information about how creative work evolves.

Examples may include:

```text
Direct Derived Creations
Total Descendants
Branches
Creative continuation
```

Metrics must clearly distinguish direct and indirect relationships.

---

# 24. Advanced Lineage Exploration

The basic parent/child interface may evolve into richer visual exploration.

Potential representations include:

```text
Tree
Graph
Timeline
Branch Explorer
```

The visualization must preserve the actual Lineage model rather than simplifying relationships incorrectly.

---

# 25. Richer Collections

Collections may evolve beyond private organization.

Potential capabilities include:

* public Collections;
* unlisted Collections;
* collaborative Collections;
* Collection descriptions;
* custom covers;
* Collection discovery.

---

# 26. Social Expansion

Possible community improvements include:

* richer Following experiences;
* improved discussions;
* activity surfaces;
* creator discovery;
* interaction controls.

Mosaic should avoid adding social mechanics that distract from the creative workflow without providing clear value.

---

# 27. Notification Controls

Users may receive more granular control over:

* Notification types;
* email delivery;
* grouping;
* digests;
* future push notifications.

---

# 28. Content Organization

As Mosaic grows, categories and tags may require stronger governance.

Potential evolution includes:

```text
Simple taxonomy
      ↓
Managed taxonomy
      ↓
Improved discovery metadata
```

without forcing every creative concept into rigid classification.

---

# 29. Media Experience

Media capabilities may evolve according to real usage.

Potential improvements include:

* improved encoding;
* additional derivatives;
* adaptive streaming;
* richer previews;
* broader Media support.

---

# 30. Additional Media Types

🔮 **Future Product Expansion**

Although AI-generated video is Mosaic's initial focus, the Creation model may later support additional Media.

Examples might include:

* images;
* animation;
* audio;
* mixed-media creative artifacts.

Expansion should occur only when it fits Mosaic's Product identity.

---

# 31. Moderation Evolution

As the community grows, moderation may evolve through:

* better triage;
* improved Report grouping;
* moderation analytics;
* more sophisticated abuse detection;
* better case management;
* stronger operational workflows.

Human oversight remains important for consequential or ambiguous decisions.

---

# 32. AI-Assisted Moderation

Automated and AI-assisted systems may increasingly help with:

```text
Classification
Prioritization
Duplicate detection
Risk analysis
Evidence organization
```

They should support moderation rather than silently redefine Product policy.

---

# 33. Administration Evolution

Administration may gain:

* richer platform configuration;
* operational tools;
* improved taxonomy management;
* safer bulk operations;
* stronger privileged-role safeguards;
* more advanced audit capabilities.

---

# 34. Horizon 2 Outcome

Product Expansion should make Mosaic:

```text
Easier to discover
      +
More useful to creators
      +
More engaging to communities
      +
Safer to operate
```

without changing the fundamental creative model.

---

# Horizon 3 — Creative Intelligence

## 35. Objective

Reduce creative friction by allowing Mosaic to assist more directly in the creative process.

This horizon depends heavily on evidence gathered from earlier Product usage.

---

# 36. AI-Assisted Prompt Customization

🔮 **Future Possibility**

Mosaic may help Users modify Prompts through AI assistance.

Example:

```text
Original Prompt
      ↓
User intention
      ↓
AI-assisted modification
      ↓
User review
      ↓
Customized Prompt
```

The User remains in control of the resulting creative instructions.

---

# 37. Prompt Explanation

Mosaic may help explain complex Prompt sections.

For example:

```text
Camera movement
Lighting terminology
Model-specific syntax
Generation parameters
```

This could make advanced Prompt techniques more approachable.

---

# 38. Prompt Improvement Assistance

🔮 **Future Possibility**

Creators may optionally request assistance improving:

* clarity;
* structure;
* model compatibility;
* customizable areas.

AI assistance should not silently replace the creator's authored Prompt.

---

# 39. Direct AI Generation

🔮 **Major Future Capability**

Mosaic may integrate directly with AI generation Providers.

The creative loop could become:

```text
Discover
   ↓
Customize
   ↓
Generate inside Mosaic
   ↓
Review
   ↓
Publish
   ↓
Derive
```

---

# 40. Provider Integration

Direct generation may support multiple Providers through Mosaic's existing Provider-independent Generation Context model.

Conceptually:

```text
Mosaic Generation Interface
           │
    ┌──────┼──────┐
    │      │      │
Provider A B      C
```

The Product should avoid redefining Creation around a single AI vendor.

---

# 41. Model-Specific Assistance

Mosaic may understand differences between AI generation models.

Potential capabilities include:

* model-specific Prompt guidance;
* parameter suggestions;
* compatibility information;
* Prompt adaptation.

---

# 42. Cross-Model Adaptation

A User may adapt a Creation designed for one model to another.

When published, this remains a derived Creation.

Example:

```text
Creation A
Provider / Model X
       ↓
Adaptation
       ↓
Creation B
Provider / Model Y
```

Lineage preserves the relationship.

---

# 43. Generation Parameter Assistance

Mosaic may help explain or suggest generation parameters while keeping them distinct from the Prompt itself.

---

# 44. Intelligent Customization

Customizable elements may evolve beyond basic text fields.

Potential future behavior includes:

* contextual suggestions;
* compatible value recommendations;
* dependent fields;
* AI-generated alternatives.

---

# 45. Creative Exploration

Mosaic may help Users discover creative branches from a Creation.

Example:

```text
Creation
   │
   ├── Change environment
   ├── Change camera language
   ├── Change visual style
   └── Adapt to another model
```

These are suggestions, not forced transformations.

---

# 46. Similarity Assistance

🔮 **Future Possibility**

Similarity systems may help:

* discover related Creations;
* identify potentially missing attribution;
* assist moderation;
* explore creative families.

Similarity alone must not automatically establish authorship or wrongdoing.

---

# 47. Attribution Assistance

Mosaic may eventually suggest possible source relationships when Users publish highly related work without declaring Lineage.

Such systems should assist rather than automatically rewrite creative history.

---

# 48. Creative Intelligence Principle

Mosaic's AI capabilities should follow:

> **Assist creation without taking creative agency away from the User.**

---

# 49. Horizon 3 Outcome

Creative Intelligence may transform Mosaic from:

```text
Platform for discovering and adapting Prompts
```

into:

```text
Platform that actively assists the complete creative process
while preserving authorship and creative history.
```

---

# Horizon 4 — Platform Ecosystem

## 50. Objective

Explore whether Mosaic can evolve from a Product into a broader creative ecosystem.

Capabilities in this horizon are intentionally speculative.

---

# 51. Public Developer API

🔮 **Future Possibility**

Mosaic may expose selected capabilities through a documented public API.

Potential use cases include:

* Creation retrieval;
* Prompt tooling;
* publishing integrations;
* Lineage exploration;
* third-party creative tools.

Public API access requires separate security, rate-limit, permission, and platform-governance decisions.

---

# 52. External Integrations

Third-party AI tools may eventually integrate with Mosaic.

Example:

```text
Mosaic Prompt
     ↓
External Creative Tool
     ↓
Generated Result
     ↓
Publish back to Mosaic
```

with Lineage preserved where supported.

---

# 53. Browser or Tool Integrations

🔮 **Future Possibility**

Mosaic may eventually provide integrations that reduce friction when moving Prompts between Mosaic and external generation tools.

Exact implementation remains intentionally undefined.

---

# 54. Creator Ecosystem

Creators may eventually build deeper audiences around their work.

Possible capabilities include:

* advanced creator pages;
* curated creative libraries;
* educational Prompt content;
* reusable Prompt systems;
* creator-specific communities.

---

# 55. Reputation

🔮 **Future Possibility**

Mosaic may eventually introduce reputation or trust signals.

Such systems require careful design to avoid turning popularity into a misleading measure of quality or authority.

---

# 56. Verification

🔮 **Future Possibility**

Selected creator or organizational verification may become useful if impersonation or authenticity becomes a meaningful Product problem.

Verification is not required merely for social status.

---

# 57. Monetization

🔮 **Future Possibility**

Potential monetization models may eventually include:

* premium capabilities;
* creator tools;
* generation-related services;
* marketplace functionality;
* paid creative assets;
* platform services.

No monetization model is currently committed.

---

# 58. Creator Monetization

If creator monetization is introduced, Mosaic must define:

* ownership;
* licensing;
* attribution;
* payment rules;
* refunds/disputes;
* platform fees;
* derivative rights.

These are significant Product and legal decisions.

---

# 59. Prompt Marketplace

🔮 **Future Possibility**

A Prompt or creative-template marketplace may become possible.

It is not assumed to be the inevitable direction of Mosaic.

---

# 60. Licensing

A commercial creative ecosystem may require explicit licensing models for:

* Prompts;
* Media;
* derivatives;
* reusable templates.

These rules must not be inferred from Lineage alone.

---

# 61. Lineage Is Not Licensing

An important future principle remains:

```text
Creative relationship
        ≠
Legal permission
```

Mosaic Lineage records derivation and attribution.

It does not automatically define intellectual-property rights.

---

# 62. Collaborative Creation

🔮 **Future Possibility**

Mosaic may eventually support multiple creators collaborating on a Creation.

This would require extending:

* authorship;
* permissions;
* attribution;
* Lineage;
* moderation;
* ownership rules.

---

# 63. Multi-Source Creation

🔮 **Future Possibility**

Future creative workflows may derive from multiple source Creations.

This would change Lineage from a primarily tree-like model toward a graph.

It should only be introduced if real creative behavior justifies the additional complexity.

---

# 64. Native Applications

🔮 **Future Possibility**

Native mobile applications may become useful if Product usage demonstrates meaningful benefit beyond the responsive web experience.

---

# 65. International Expansion

Mosaic may eventually expand localization and regional support.

Potential concerns include:

* interface languages;
* moderation languages;
* search behavior;
* legal requirements;
* regional infrastructure.

---

# 66. Ecosystem Governance

A broader Mosaic ecosystem may require stronger rules around:

* API usage;
* integrations;
* commercial activity;
* automated publishing;
* attribution;
* platform abuse.

These systems should evolve only when the ecosystem requires them.

---

# 67. Horizon 4 Outcome

The Platform Ecosystem horizon asks whether Mosaic can become:

> **An open creative layer connecting creators, Prompts, AI generation tools, and the evolution of generated work.**

This is a direction to explore, not a guaranteed destination.

---

# 68. Capabilities Across Horizons

Conceptually:

| Capability        | MVP Foundation | Product Expansion  | Creative Intelligence | Platform Ecosystem             |
| ----------------- | -------------- | ------------------ | --------------------- | ------------------------------ |
| Public Creations  | Core           | Enhanced           | Enhanced              | Ecosystem                      |
| Prompt Publishing | Core           | Enhanced           | AI-assisted           | Integrable                     |
| Customization     | Core           | Richer             | Intelligent           | Extensible                     |
| Lineage           | Core           | Richer exploration | Assisted attribution  | Broader creative graph         |
| Search            | Basic          | Advanced           | Semantic              | API-accessible                 |
| Discovery         | Basic          | Personalized       | Intelligent           | Ecosystem-aware                |
| Social            | Foundation     | Expanded           | —                     | Creator ecosystem              |
| Collections       | Basic private  | Richer/public      | —                     | Potentially integrable         |
| Moderation        | Foundation     | Advanced           | AI-assisted           | Ecosystem governance           |
| AI Generation     | External       | External           | Direct integration    | Multi-provider ecosystem       |
| Analytics         | Minimal        | Creator analytics  | Creative insights     | Platform analytics             |
| API               | Internal       | Internal           | Internal              | Potential public API           |
| Monetization      | None required  | Not required       | Possible exploration  | Potential ecosystem capability |

---

# 69. Stable Product Core

Some Mosaic concepts should remain stable even as capabilities expand:

```text
User
Creation
Prompt
Media
Generation Context
Authorship
Lineage
```

Their implementations may evolve.

Their conceptual meaning should remain coherent.

---

# 70. Evolvable Edges

The following areas are expected to evolve more aggressively:

```text
AI Providers
Models
Generation Parameters
Search
Recommendations
Media Delivery
AI Assistance
Analytics
Integrations
Monetization
```

This reflects Mosaic's architectural principle:

> **Stable core, evolvable edges.**

---

# 71. Provider Independence

No Roadmap horizon should make Mosaic conceptually dependent on one AI generation Provider.

Providers and Models are Generation Context.

They are not Mosaic's identity.

---

# 72. Media Independence

Video is Mosaic's initial focus.

Future Media expansion should not require redefining what a Creation fundamentally means.

---

# 73. Historical Integrity

Product evolution must continue preserving published creative history.

Future capabilities must not introduce internal creative versioning that overwrites meaningful published states.

---

# 74. Lineage Integrity

Future recommendation, AI, marketplace, or integration systems MUST NOT silently rewrite Lineage.

Changes to historical relationships require explicit controlled rules.

---

# 75. User Agency

Future AI assistance should remain understandable and controllable.

Mosaic should help Users create rather than force opaque creative decisions.

---

# 76. Privacy

Product expansion must not treat increasingly available behavioral data as automatically appropriate for unrestricted use.

Recommendations, analytics, AI assistance, and monetization must respect Mosaic's Privacy principles.

---

# 77. Safety Evolution

Safety capabilities should grow proportionally with:

* User scale;
* content scale;
* abuse patterns;
* commercial activity;
* integration surface.

Mosaic should not wait for severe abuse to consider basic safety, nor build enterprise-scale systems before they are needed.

---

# 78. Infrastructure Evolution

Infrastructure should evolve according to measured requirements.

Conceptually:

```text
Initial architecture
       ↓
Measure
       ↓
Identify constraint
       ↓
Scale relevant subsystem
```

The Roadmap does not prescribe premature microservices or distributed infrastructure.

---

# 79. Product Expansion Gate

A Post-MVP capability should generally answer at least one of these questions positively:

```text
Does it solve observed User friction?

Does it strengthen Mosaic's core creative loop?

Does it materially improve discovery?

Does it help creators?

Does it improve safety or trust?

Does it unlock a validated new Product opportunity?
```

---

# 80. Technology Is Not the Roadmap

Adopting a new:

* framework;
* database;
* cloud provider;
* Search engine;
* AI model

is not itself a Product milestone.

Technology supports Product outcomes.

---

# 81. Roadmap Review

The Roadmap SHOULD be revisited as Mosaic obtains real Product evidence.

Potential triggers include:

* MVP feedback;
* major changes in AI-generation workflows;
* significant User behavior changes;
* new safety requirements;
* validated commercial opportunities.

---

# 82. Removing Roadmap Items

Removing an idea from the Roadmap is acceptable.

A Product Roadmap is useful only when it can respond to evidence.

---

# 83. Adding Roadmap Items

New capabilities may be introduced when they align with Mosaic's Product Vision.

They should not enter merely because another platform offers them.

---

# 84. Roadmap Decision Summary

## ROADMAP-ADR-001 — Horizon-Based Roadmap

**Status:** ✅ Decided

Mosaic's public Product Roadmap is organized around capability horizons rather than implementation phases or calendar deadlines.

---

## ROADMAP-ADR-002 — MVP Establishes the Creative Loop

**Status:** ✅ Decided

The first horizon focuses on proving Mosaic's core creative loop and Lineage model.

---

## ROADMAP-ADR-003 — Post-MVP Priorities Are Evidence-Driven

**Status:** ✅ Decided

Capabilities beyond the MVP will be reprioritized using real Product evidence.

---

## ROADMAP-ADR-004 — Direct Generation Is Not Required Initially

**Status:** ✅ Decided

Direct AI-generation integration remains a later Product capability.

---

## ROADMAP-ADR-005 — Advanced AI Is Progressive

**Status:** ✅ Decided

Mosaic will not make advanced AI recommendation, semantic Search, or creative assistance prerequisites for basic Product usefulness.

---

## ROADMAP-ADR-006 — Provider Independence Remains

**Status:** ✅ Decided

Future AI integration will preserve Mosaic's provider-independent Product model.

---

## ROADMAP-ADR-007 — Platform Ecosystem Is Exploratory

**Status:** ✅ Decided

API, marketplace, monetization, collaborative creation, and broader ecosystem capabilities remain possibilities rather than commitments.

---

## ROADMAP-ADR-008 — Public Roadmap Avoids Internal Delivery Detail

**Status:** ✅ Decided

The Product Roadmap communicates direction without exposing internal implementation sequence, schedules, infrastructure plans, or operational dependencies.

---

# 85. Roadmap Summary

Mosaic's Product evolution can be summarized as:

```text
MVP FOUNDATION
Creation
Prompt
Customization
Lineage
Discovery
Community
Safety
        │
        ▼
PRODUCT EXPANSION
Better Discovery
Richer Profiles
Creator Capabilities
Richer Collections
Better Media
Platform Maturity
        │
        ▼
CREATIVE INTELLIGENCE
AI Assistance
Semantic Discovery
Direct Generation
Cross-Model Adaptation
Creative Exploration
        │
        ▼
PLATFORM ECOSYSTEM
Integrations
Developer API
Creator Ecosystem
Collaboration
Potential Monetization
Broader Creative Network
```

Throughout these horizons, Mosaic preserves:

```text
Authorship
    +
Creative History
    +
Lineage
    +
User Agency
    +
Provider Independence
    +
Product Evolvability
```

The central principle is:

> **Mosaic should know where it wants to go without pretending it already knows every step required to get there.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
* [Publications](../01-product/publications.md)
* [Prompt System](../01-product/prompts.md)
* [Customization](../01-product/customization.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery](../01-product/discovery.md)
* [Social](../01-product/social.md)
* [Moderation](../01-product/moderation.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](../03-technical/architecture.md)
* [Scalability](../03-technical/scalability.md)

## Delivery

* [MVP](./mvp.md)
* [Glossary](./glossary.md)

---

**Previous:** [← MVP](./mvp.md) · [Documentation Home](../README.md) · **Next:** [Glossary →](./glossary.md)
