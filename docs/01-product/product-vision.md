# Product Vision

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

**Mosaic** is a community-driven platform for discovering, creating, sharing, customizing, and evolving prompts for AI-generated video.

Instead of treating a prompt simply as a block of text to copy and paste, Mosaic treats it as part of a creative process.

A creation can combine:

* the generated result;
* the prompt used to produce it;
* information about how it was created;
* customizable parts of the prompt;
* generation context and settings;
* its creator;
* and its relationship to other creations.

Users can discover creations from the community, understand how they were made, customize them, and publish their own interpretations.

When a new creation originates from an existing one, Mosaic preserves that relationship, creating a visible history of how an idea evolves through the community.

---

## Why Mosaic Exists

Prompts for AI video generation are commonly shared across social networks, communities, documents, videos, repositories, private collections, and other fragmented environments.

These environments were generally not designed around structured prompt discovery and reuse.

As a result, useful prompts can become:

* difficult to discover;
* separated from the media they generated;
* shared without enough context;
* copied without clear attribution;
* difficult for beginners to understand;
* difficult to customize;
* duplicated without any connection to their source;
* lost inside feeds, conversations, or private collections.

Traditional prompt libraries can improve organization, but often still treat prompts as static pieces of text.

Mosaic is designed around a different idea:

> **Prompts are creative artifacts that can be understood, transformed, and evolved.**

The platform should help users move beyond asking only:

> “What prompt generated this?”

and make it possible to explore questions such as:

> “How was this created?”

> “Which parts can I change?”

> “What did other creators change?”

> “What other versions of this idea exist?”

> “Where did this version originate?”

---

## Product Objective

The primary objective of Mosaic is to create an organized social ecosystem around AI video prompting and creative experimentation.

The platform should support a continuous creative cycle:

**Discover → Understand → Customize → Create → Publish → Evolve**

A user may discover an interesting generated video, inspect the prompt behind it, understand its customizable elements, adapt those elements, use the resulting prompt in an external AI generation tool, and publish their interpretation back to Mosaic.

That new publication can then become the starting point for additional creations.

Mosaic therefore aims to preserve not only individual content, but also the **relationships between creative works**.

---

## Target Audience

Mosaic is designed for people interested in creating or exploring AI-generated video, regardless of their level of technical knowledge.

Potential users include:

* AI video creators;
* prompt creators;
* content creators;
* filmmakers and audiovisual professionals;
* designers and creative professionals;
* marketing and advertising professionals;
* social media creators;
* AI enthusiasts;
* people learning how to create better AI-generated videos.

### Beginners

A beginner should be able to discover a creation, understand its essential components, and customize it without needing advanced knowledge of prompt engineering.

### Experienced Creators

Experienced users should have enough flexibility to document sophisticated prompts, techniques, configurations, and creative decisions without being unnecessarily constrained by simplified tools.

### Product Principle

> Mosaic should make advanced creative knowledge accessible without making advanced creators feel limited.

---

## Value Proposition

Mosaic combines experiences that are commonly separated across different platforms.

### Discover

Find AI-generated creations through a visual and community-driven environment.

### Understand

See the prompt and relevant context behind a generated result instead of receiving only the final media.

### Customize

Identify and modify parts of a prompt without necessarily rebuilding it from scratch.

### Create

Use existing creations as starting points for new creative experiments.

### Publish

Share the resulting creation and document the process behind it.

### Evolve

Allow new creations to become foundations for further variations while preserving their relationships and attribution.

The value of Mosaic therefore comes not merely from **storing prompts**, but from enabling prompts to be:

**discovered → understood → adapted → attributed → evolved**

---

## The Mosaic Concept

The name **Mosaic** represents the central philosophy of the product.

A physical mosaic is formed from individual pieces that collectively create something larger.

Mosaic follows the same principle.

Each creation contributed by a member of the community becomes one piece of a larger creative ecosystem.

There is also a second meaning.

A complex prompt can itself be understood as a composition of smaller creative elements:

```text
Character
+
Environment
+
Action
+
Camera
+
Lighting
+
Style
+
Other instructions
=
Prompt
```

These pieces can be changed and recombined to produce new results.

The name therefore represents both the **community** and the **creative structure of prompts**.

---

# Core Product Concepts

## Creation

A **Creation** is the primary content unit of Mosaic.

It represents a generated result together with the information necessary to understand the creative process behind it.

A Creation may eventually contain information such as:

* generated media;
* prompt;
* title;
* description;
* creator;
* AI model;
* generation settings;
* customizable elements;
* instructions;
* categories;
* tags;
* relationship to other creations.

The exact structure of a Creation will be defined in the [Publication System](./publications.md).

---

## Prompt

A **Prompt** is the structured set of instructions associated with a Creation.

Mosaic should not assume that prompts are only plain text.

They may contain identifiable components, customizable elements, parameters, instructions, model-specific information, and other metadata.

The complete model will be defined in the [Prompt System](./prompts.md).

---

## Customization

**Customization** allows parts of a prompt to be identified as elements that another user may easily modify.

For example, a creator could identify concepts such as:

```text
Character
Clothing
Environment
Camera
Lighting
Visual style
```

A user could then change those elements without manually reconstructing the entire prompt.

The exact behavior will be defined in [Prompt Customization](./customization.md).

---

## Remix

A **Remix** is a new Creation derived from an existing Creation.

Creating a Remix does not modify or replace the original.

Instead, Mosaic creates a new independent Creation while preserving its relationship with the Creation from which it originated.

Detailed rules will be defined in [Remix & Lineage](./remix-lineage.md).

---

## Lineage

**Lineage** represents the relationship between creations as they evolve.

For example:

```text
Original Creation
│
├── Remix A
│   ├── Remix C
│   └── Remix D
│
├── Remix B
│
└── Remix E
```

A Creation may therefore simultaneously be:

* derived from an earlier Creation;
* and the origin of future Creations.

Lineage allows users to explore not only a finished creation but also the history of an idea.

---

## Discovery

**Discovery** represents the mechanisms through which users find creators and creations.

Mosaic should prioritize visual exploration while supporting mechanisms such as search, categories, tags, filters, collections, creators, and other discovery tools.

Recommendations and trend-based discovery may be introduced as the product evolves.

Detailed behavior will be defined in [Discovery & Search](./discovery.md).

---

# Product Principles

## 1. Creation is open by default

✅ **Decided**

Public creations are intended to inspire additional creation.

Users should generally be free to customize and remix publicly available creations without requesting individual authorization from the original creator.

Openness does not eliminate attribution, moderation, platform rules, or applicable rights.

---

## 2. Attribution should survive transformation

✅ **Decided**

A Remix should preserve its relationship with the Creation from which it originated.

Further transformations should not erase the history of the creative chain.

Mosaic should preserve provenance whenever reasonably possible.

---

## 3. Prompts are structured creative artifacts

✅ **Decided**

Mosaic should not be architected around the assumption that a prompt is merely a text field.

Prompts may eventually contain structured elements, variables, parameters, explanations, model information, and relationships.

---

## 4. Discovery should lead to creation

✅ **Decided**

Mosaic is not intended to encourage only passive consumption.

Discovering an interesting Creation should provide paths toward understanding, saving, customizing, or transforming it.

---

## 5. Complexity should remain approachable

✅ **Decided**

Mosaic should expose useful complexity without requiring every user to understand advanced prompt engineering.

Simple workflows and advanced capabilities should coexist.

---

## 6. Every registered user can become a creator

✅ **Decided**

Mosaic should not require users to choose permanently between being a consumer and being a creator.

A person may join Mosaic only to explore content and later decide to publish a Creation.

Publishing should therefore be a capability of a regular account rather than requiring a separate creator account type.

Professional or advanced creator features may exist in the future without changing this principle.

---

## 7. Community freedom requires accountability

✅ **Decided**

Creative freedom does not mean the absence of community rules.

Mosaic should provide appropriate mechanisms for reporting abuse, enforcing platform rules, handling disputes, and protecting the community.

---

## 8. Moderation should be designed to scale

✅ **Decided — Principle**

The moderation architecture should not assume that every case can permanently be reviewed manually.

Automation and AI-assisted systems may help identify, classify, prioritize, and process cases as the platform grows.

Sensitive, ambiguous, contested, or high-impact decisions should support appropriate human oversight.

Detailed moderation rules are intentionally deferred to [Moderation & Trust](./moderation.md).

---

## 9. Users should have meaningful recourse

✅ **Decided — Principle**

When Mosaic restricts content or accounts, affected users should have appropriate mechanisms to understand the action and, where applicable, challenge it.

Appeals and reviewed moderation decisions will be specified separately.

---

## 10. Build for evolution, not speculation

✅ **Decided**

Mosaic should be designed so important future capabilities are not unnecessarily blocked by early architectural decisions.

However, possible future features should not create unnecessary complexity in the first implementation.

The project should distinguish between:

**what Mosaic needs today** and **what Mosaic may need tomorrow**.

---

# Product Scope

## Mosaic Is

Mosaic is intended to be:

* a discovery platform;
* a prompt-sharing platform;
* a creative community;
* a structured knowledge environment for AI video prompting;
* a platform for prompt customization;
* a system for tracing creative evolution;
* a social environment centered around generative creation.

---

## Mosaic Is Not

At its initial scope, Mosaic is **not** intended to be:

* an AI video generation model;
* a replacement for AI video generation platforms;
* a general-purpose social network;
* a marketplace;
* an AI model training platform;
* a complete generative media suite.

Users may generate their media using external AI tools and use Mosaic as the environment where the creative process can be documented, shared, discovered, transformed, and discussed.

---

# Long-Term Vision

🔮 **Future Possibility**

Mosaic begins with **AI video generation**.

However, the fundamental concepts behind the platform are broader:

* structured prompts;
* creative discovery;
* customization;
* remixing;
* lineage;
* attribution;
* collaboration;
* community knowledge.

These concepts may eventually support additional forms of generative creativity.

Potential directions include:

* additional generative media formats;
* richer creator tools;
* advanced recommendations;
* creator analytics;
* collaborative workflows;
* integrations with AI generation platforms;
* expanded creation tools;
* new ways of exploring the evolution of ideas.

These possibilities are **not current requirements**.

They represent potential directions that early product and architectural decisions should avoid unnecessarily preventing.

---

# Related Documentation

* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Prompt System](./prompts.md)
* [Prompt Customization](./customization.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Moderation & Trust](./moderation.md)
* [MVP](../04-delivery/mvp.md)

---

[← Documentation Home](../README.md) · **Next: [User & Identity →](./user-identity.md)**
