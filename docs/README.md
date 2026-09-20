# Mosaic Documentation

Welcome to the **Mosaic project documentation**.

This documentation describes the product vision, behavior, business rules, architecture, and development strategy of Mosaic.

It is designed to be accessible to both **technical and non-technical readers**.

You do not need to read every document sequentially. Use the sections below to navigate directly to the information you need.

---

# 🧭 Documentation Map

## 01 — Product

Understand **what Mosaic is, how the platform works, and how users interact with it**.

| Document                                              | Description                                                                  |
| ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Product Vision](./01-product/product-vision.md)      | Vision, purpose, target audience, value proposition, and product principles. |
| [User & Identity](./01-product/user-identity.md)      | Accounts, profiles, authentication, identity, and user states.               |
| [Publications](./01-product/publications.md)          | Structure and behavior of Mosaic publications.                               |
| [Prompt System](./01-product/prompts.md)              | How prompts are represented, documented, and managed.                        |
| [Prompt Customization](./01-product/customization.md) | Customizable prompt elements, variables, and prompt adaptation.              |
| [Remix & Lineage](./01-product/remix-lineage.md)      | Remixing, attribution, ancestry, and evolution of creations.                 |
| [Discovery & Search](./01-product/discovery.md)       | Feed, exploration, search, filters, and recommendations.                     |
| [Social System](./01-product/social.md)               | Follows, likes, comments, sharing, and community interactions.               |
| [Collections & Saves](./01-product/collections.md)    | Saving and organizing creations.                                             |
| [Notifications](./01-product/notifications.md)        | Social and platform notifications.                                           |
| [Moderation & Trust](./01-product/moderation.md)      | Reports, moderation, appeals, and community safety.                          |
| [Administration](./01-product/administration.md)      | Administrative capabilities and platform management.                         |

---

## 02 — Specification

Understand **the rules and requirements Mosaic must follow**.

| Document                                                                         | Description                                                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Business Rules](./02-specification/business-rules.md)                           | Formal rules governing product behavior.                                        |
| [User Flows](./02-specification/user-flows.md)                                   | Main user journeys throughout the platform.                                     |
| [Functional Requirements](./02-specification/functional-requirements.md)         | What the system must be able to do.                                             |
| [Non-Functional Requirements](./02-specification/non-functional-requirements.md) | Performance, reliability, accessibility, scalability, and quality requirements. |

---

## 03 — Technical Design

Understand **how Mosaic will be engineered and operated**.

> Technical decisions will be documented only after the relevant product requirements and business rules have been defined.

| Document                                                   | Description                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| [Architecture](./03-technical/architecture.md)             | Overall system architecture and major technical decisions.    |
| [Data Model](./03-technical/data-model.md)                 | Entities, relationships, and persistence strategy.            |
| [API](./03-technical/api.md)                               | API conventions, resources, and contracts.                    |
| [Media & Storage](./03-technical/media-storage.md)         | Video, images, uploads, processing, and storage.              |
| [Search](./03-technical/search.md)                         | Search infrastructure, indexing, and retrieval.               |
| [Security & Privacy](./03-technical/security.md)           | Authentication, authorization, privacy, and abuse prevention. |
| [Performance & Scalability](./03-technical/scalability.md) | Performance expectations and scaling strategy.                |
| [Observability](./03-technical/observability.md)           | Logs, metrics, monitoring, and diagnostics.                   |
| [Testing](./03-technical/testing.md)                       | Testing strategy and quality assurance.                       |
| [Deployment](./03-technical/deployment.md)                 | Environments, CI/CD, infrastructure, and deployment.          |

---

## 04 — Delivery

Understand **what will be built, in which order, and how Mosaic may evolve**.

| Document                                                  | Description                                                                 |
| --------------------------------------------------------- | --------------------------------------------------------------------------- |
| [MVP](./04-delivery/mvp.md)                               | Definition and boundaries of the first viable version of Mosaic.            |
| [Development Phases](./04-delivery/development-phases.md) | Planned implementation stages and their objectives.                         |
| [Roadmap](./04-delivery/roadmap.md)                       | Long-term product evolution.                                                |
| [Open Decisions](./04-delivery/open-decisions.md)         | Important product and technical decisions that have not yet been finalized. |
| [Glossary](./04-delivery/glossary.md)                     | Official terminology used throughout Mosaic.                                |

---

# 🚀 Where Should I Start?

### I just want to understand Mosaic

Start with:

**[Product Vision](./01-product/product-vision.md) → [Publications](./01-product/publications.md) → [Prompt System](./01-product/prompts.md) → [Remix & Lineage](./01-product/remix-lineage.md)**

These documents explain what Mosaic is and the concepts that distinguish it from a traditional prompt library.

### I want to understand the user experience

Start with:

**[User & Identity](./01-product/user-identity.md) → [Discovery & Search](./01-product/discovery.md) → [Social System](./01-product/social.md) → [Collections & Saves](./01-product/collections.md)**

### I want to work on Mosaic

Start with:

**[Architecture](./03-technical/architecture.md) → [Data Model](./03-technical/data-model.md) → [Functional Requirements](./02-specification/functional-requirements.md) → [API](./03-technical/api.md) → [Security & Privacy](./03-technical/security.md)**

### I want to understand what will be built first

Start with:

**[MVP](./04-delivery/mvp.md) → [Development Phases](./04-delivery/development-phases.md) → [Roadmap](./04-delivery/roadmap.md)**

---

# 📖 Documentation Conventions

To make the documentation easier to understand, decisions may use the following indicators:

### ✅ Decided

A product or technical decision that has already been discussed and accepted.

### 🟡 Open Decision

An important question that still requires discussion or validation.

### 🔮 Future Possibility

An idea that may be explored in the future but is **not a current requirement**.

These indicators help distinguish actual project requirements from ideas that are still being considered.

---

# 📝 Documentation Principles

The Mosaic documentation follows a few principles:

* **Accessible language** — Product documentation should be understandable even without a technical background.
* **Progressive detail** — Readers can understand the concept first and explore technical details only when necessary.
* **Clear decisions** — Confirmed decisions should be distinguishable from open questions and future ideas.
* **Single source of truth** — Important product and technical decisions should be documented rather than existing only in conversations.
* **Living documentation** — Documentation evolves together with the product.
* **Traceability** — Important requirements and technical decisions should be connected to the product needs that motivated them.

---

# 🚧 Documentation Status

Mosaic is currently in the **Planning & Specification** phase.

The current focus is defining the product, its behavior, business rules, user experience, and technical foundations before implementation begins.

Some documents may initially be incomplete or contain open decisions while the platform is being designed.

---

[← Back to Mosaic](../README.md)
