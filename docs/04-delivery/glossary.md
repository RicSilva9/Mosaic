# Glossary

> **Section:** Delivery  
> **Status:** Active Reference  
> **Audience:** Product, Engineering, Design, Moderation, Operations & Contributors  
> **Last updated:** September 2026

---

# Overview

This document defines the shared vocabulary used throughout Mosaic. Terms may have meanings more specific than their ordinary use. Domain documentation remains authoritative for complete rules; this Glossary defines the canonical conceptual meaning.

The goal is simple: the same concept should use the same name across Product, Engineering, Design, Moderation, and documentation.

---

# Core Product Terms

## Mosaic

The platform documented by this project: a social platform for discovering, creating, sharing, customizing, and evolving Prompts and Creations associated with AI-generated Media.

## User

A person represented by Mosaic's identity model. There is no separate creator Account type; a User behaves as a Creator when they publish.

## Visitor

A person accessing public Mosaic surfaces without being authenticated.

## Creator / Author

A User responsible for publishing a Creation. Creator is a Product behavior, not a privileged authorization Role.

## Account

The private authentication and security representation associated with a User, including credentials, sessions, Account state, and security settings.

## Profile

The public or community-facing representation of a User, including username, display name, avatar, biography, published Creations, and social information.

## Role

A privileged authorization classification. Conceptual Roles include `USER`, `MODERATOR`, and `ADMINISTRATOR`.

---

# Creation & Publication

## Creation

The primary creative artifact in Mosaic. A Creation may combine Generated Media, Prompt, Generation Context, Creator, descriptive/discovery metadata, customizable elements, and Lineage.

A Creation is not merely a video, Prompt, database row, or social post.

## Publication

The act or state transition that makes a Creation available according to Mosaic's publication rules. Publication is the action; Creation is the artifact.

## Draft

A private unpublished working state that may contain incomplete Media, Prompt, metadata, or Generation Context.

## Original Creation / Origin

A Creation with no parent inside Mosaic's recorded Lineage. "Original" means a root of recorded Mosaic Lineage; it is not a legal claim of originality or exclusive ownership.

## Derived Creation

A new independent Creation intentionally created from another Creation. It has its own identity and may have different Media, Prompt, Model, or Generation Context while preserving its relationship to its source.

## Remix

Product-facing language for publishing a Derived Creation from another Creation. `Derived Creation` is the more neutral domain term.

## Self-Derivation

A derivation where the parent and child Creations have the same Creator. It represents creative evolution and does not create an internal version of the parent Creation.

## Edit

A permitted non-material correction to an existing Creation. The exact boundary between an Edit and a new Derived Creation remains an Open Decision.

## Creative Evolution

A meaningful change to published creative work represented by a new Derived Creation rather than by overwriting the historical Creation.

## Unavailable Creation / Tombstone

A limited placeholder used when a Creation can no longer be normally accessed but its existence must remain represented for Lineage integrity. A Tombstone does not necessarily expose the unavailable content.

---

# Prompt & Customization

## Prompt

The creative instructions associated with a Creation and used to guide AI generation. A Prompt may be plain text or contain richer structured information.

## Raw Prompt

The Prompt content associated with the published creative state before User-specific Customization is applied.

## Customizable Element / Prompt Variable

A creator-defined part of a Prompt intended to be easily changed. A Customizable Element may include an identifier, label, description, default value, suggestions, or input behavior. Exact syntax remains an implementation decision.

## Prompt Suggestion

A creator-provided example or suggested value that guides Customization without necessarily restricting valid input.

## Customization

The private process of adapting a Prompt before publication. Customization does not modify the source Creation and does not create public Lineage by itself.

## Customization Session

A temporary or persistent working context representing a User customizing a source Prompt. Exact persistence remains an Open Decision.

## Customized Prompt

The resulting Prompt after User-selected values or modifications are applied to a source Prompt. It is not automatically a published Creation.

---

# Media & Generation

## Media

A digital asset associated with a Creation. Mosaic initially focuses on AI-generated video, while the architecture is not permanently limited to video.

## Generated Media

Media produced through an AI-generation workflow and associated with a Creation.

## Primary Media

The principal Media asset used to represent a Creation.

## Media Derivative

A technical representation such as a thumbnail, poster, preview, or transcode. A Media Derivative does not create creative Lineage.

## Generation Context

Information describing the technical context in which Media was generated, potentially including Provider, Model, Model Version, and Parameters.

## Provider

A company, service, or system providing AI-generation capabilities.

## Model

An AI-generation model used through or associated with a Provider.

## Model Version

A particular version of an AI Model. Model Version belongs to Generation Context and is not a Creation version.

## Generation Parameters

Model- or Provider-specific settings used during generation, such as duration, aspect ratio, seed, motion, guidance, or quality.

## External Generation

The initial workflow where a User takes a Prompt from Mosaic, generates Media through an external AI tool, and returns to Mosaic to publish the result.

## Direct Generation

A possible future capability where Mosaic communicates directly with AI-generation Providers and allows generation inside the Product.

---

# Lineage

## Lineage

The persistent creative relationship graph connecting Creations derived from one another.

## Parent / Direct Parent

The immediate source Creation from which a Derived Creation was created.

For `A → B → C`, B is C's Direct Parent.

## Child / Direct Descendant

A Creation directly derived from another Creation.

## Ancestor

Any Creation earlier in the Lineage path of another Creation.

## Descendant

Any Creation derived directly or indirectly from another Creation.

## Origin

The root Creation of a Lineage path. For `A → B → C`, C's Direct Parent is B and its Origin is A.

## Branch

A path of creative evolution extending from a Creation.

## Lineage Integrity

The requirement to preserve truthful structural relationships between Creations, including preventing cycles, invalid self-parenting, silent flattening, and unauthorized relationship changes.

## Lineage Correction

A controlled change to an incorrectly recorded Lineage relationship. It is not ordinary creative editing.

---

# Discovery & Social

## Discovery

The Product systems that help Users encounter relevant Creations and Creators. Search is one Discovery mechanism, not the whole Discovery system.

## Search

Explicit User-driven retrieval based on a query and optional filters.

## Feed

A ranked or ordered Discovery surface presenting Creations to a Visitor or User.

## Category

A relatively broad classification used to organize Creations.

## Tag

A flexible descriptive label associated with a Creation. Tags are conceptually less rigid than Categories.

## Trending

A Discovery concept representing meaningful recent attention. It is not synonymous with all-time popularity.

## Relevance

The degree to which a result matches a User's current Search or Discovery context. Popularity may contribute to ranking but does not define Relevance by itself.

## Follow

A directional User-to-User relationship. `A follows B` does not imply `B follows A`.

## Like

A User-to-Creation relationship expressing lightweight social engagement.

## Comment / Reply

A User-authored discussion message attached to a Creation; a Reply responds to another Comment. Exact reply depth remains an Open Decision.

## Share

Distribution of access to an existing Creation. Share does not create Lineage.

## Repost

A possible future social redistribution mechanism. Repost is not Remix and does not create a new creative work.

---

# Saves & Collections

## Save

A private User-to-Creation relationship indicating that the User wants to keep a Creation for later. Save is distinct from Like.

## Collection

A User-created organizational grouping of Creations. Initial Collections are private by default.

## Collection Membership

The relationship indicating that a Creation belongs to a Collection. Its exact behavioral dependency on Save remains an Open Decision.

---

# Notifications, Safety & Governance

## Notification

A derived User-facing record informing a User about a relevant event. The underlying Product event remains authoritative.

## Report

A User-submitted signal requesting review of a possible policy, safety, attribution, or abuse problem. A Report is not proof of wrongdoing or a Moderation Decision.

## Moderation Case

A structured context used to evaluate Reports, evidence, content, and decisions.

## AI-Assisted Moderation

Use of AI for moderation support such as triage, classification, prioritization, and evidence organization. AI is not the sole final authority for consequential or ambiguous cases.

## Moderation Decision

The recorded determination resulting from moderation review.

## Enforcement

A moderation or administrative action restricting content, interactions, or an Account.

## Appeal

A User request asking Mosaic to review an eligible Moderation Decision again.

## Block

A User-controlled safety relationship restricting interactions with another User. Blocking is not Moderation and does not rewrite historical Lineage.

## Moderator

A privileged User authorized to perform selected moderation operations.

## Administrator

A privileged User authorized to perform selected platform-governance and operational actions. Administrator is a permission Role, not a Creator status.

## Audit Record

A protected historical record of important privileged or security-sensitive actions. Audit Records are not ordinary application logs.

---

# Technical Terms

## Modular Monolith

Mosaic's initial application architecture: one primary cohesive application with explicit internal domain boundaries. It does not imply one server, one process, or no background workers.

## Domain Boundary

A conceptual and implementation boundary separating responsibilities between Product domains.

## Source of Truth / Authoritative Data

The authoritative representation of Product state. Derived systems must not silently override it.

## Derived Data

Data calculated or projected from authoritative Product state, such as Search indexes or caches. It should generally be rebuildable where practical.

## Relational Database

Mosaic's authoritative structured persistence direction. The exact database technology remains an Open Decision.

## Object Storage

Infrastructure designed to store large Media objects separately from relational data.

## Transaction

A persistence boundary ensuring related authoritative changes succeed or fail together where Product integrity requires it.

## API

The application interface through which clients or components interact with Mosaic behavior. The initial direction is REST-oriented HTTP using JSON.

## Authentication

The process of establishing who a User is.

## Authorization

The process of deciding whether an actor may perform a particular action on a particular resource.

## Object-Level Authorization

Authorization that evaluates the specific resource being accessed, not only whether the actor is authenticated.

## Background Job

Work executed outside the immediate User request lifecycle.

## Worker

A runtime process responsible for executing Background Jobs.

## Idempotency

The property that safely repeating an operation does not incorrectly duplicate its intended effect.

## Cache

A temporary derived representation used to reduce repeated computation or data access. Cache is not authoritative Product storage.

## Search Index

A derived representation optimized for Search. It is not Mosaic's authoritative Product source of truth.

## Eventual Consistency

A model where derived systems may temporarily lag behind authoritative state, such as Search indexing after publication.

## Strong Consistency

A requirement that critical Product state remain sufficiently authoritative to preserve invariants such as authorship and Lineage.

---

# Operations & Delivery

## Observability

The ability to understand Mosaic's technical behavior through logs, metrics, traces, errors, health signals, and related telemetry.

## Log

An operational record describing an application or infrastructure event. Logs are not Audit Records.

## Metric

A numerical measurement of system behavior over time.

## Trace

A representation of work flowing through multiple operations or components.

## SLI / SLO

A Service Level Indicator is a measurement of service behavior; a Service Level Objective is a target established for an SLI. Mosaic has not yet defined formal production SLOs.

## Build

The process of transforming source code and dependencies into a deployable representation.

## Release

An identifiable application version considered eligible for deployment.

## Deployment

The controlled process of making a Release run in a target environment.

## Migration

A controlled change to persistent database schema or related data structure.

## Rollback

Returning application execution to a previous known Release where safe. It does not automatically reverse database changes or external side effects.

## Forward Fix

Correcting a production problem through a new change rather than reverting previous state.

## CI

Continuous Integration: automated validation of source changes through activities such as tests, static analysis, and build validation.

## CD

Continuous Delivery or Continuous Deployment depending on context. Mosaic has not yet selected its final production delivery model.

## MVP

Minimum Viable Product: the smallest coherent Mosaic Product capable of validating its central creative hypothesis while preserving necessary Product integrity. MVP does not mean disposable prototype.

## Core Creative Loop

`Discover → Understand → Customize → Generate → Publish → Derive → Discover Again`

## Product Roadmap

A high-level representation of Mosaic's possible Product evolution. It is not an implementation schedule or guaranteed feature commitment.

## Open Decision

A known unresolved question intentionally preserved until enough context exists to resolve it.

## Decision Gate

The latest meaningful point at which an Open Decision must be resolved before dependent work proceeds.

## Evidence-Gated Decision

A decision intentionally deferred until real Product or operational evidence justifies it.

---

# Terms That Must Not Be Confused

| Terms | Distinction |
| --- | --- |
| Creation vs Media | Creation is the creative artifact; Media is an associated digital asset. |
| Creation vs Publication | Creation is the artifact; Publication is an act/state transition. |
| Prompt vs Creation | Prompt contains generation instructions; Creation is the complete creative artifact. |
| Customization vs Remix | Customization is private preparation; Remix is published derivation. |
| Remix vs Repost | Remix creates a new derived work; Repost redistributes an existing work. |
| Edit vs Creative Evolution | Edit is non-material correction; Creative Evolution creates a new Derived Creation. |
| Parent vs Origin | Parent is immediate source; Origin is the Lineage root. |
| Model Version vs Creation Version | Model Version is Generation Context; Mosaic does not use internal creative versions for published Creation evolution. |
| Media Derivative vs Derived Creation | Media Derivative is technical processing; Derived Creation is creative Lineage. |
| Save vs Like | Save is personal retention; Like is social engagement. |
| Save vs Collection | Save is a User-Creation relation; Collection is an organizational container. |
| Report vs Moderation Decision | Report requests review; Moderation Decision is a reviewed determination. |
| Block vs Moderation | Block is a personal safety control; Moderation is platform governance. |
| User vs Account vs Profile | User is conceptual identity; Account handles private auth/security; Profile is public presentation. |
| Authentication vs Authorization | Authentication establishes identity; Authorization evaluates permission. |
| Search vs Discovery | Search is explicit retrieval; Discovery is the broader content-finding experience. |
| Category vs Tag | Category is broader/managed classification; Tag is flexible descriptive metadata. |
| Log vs Audit Record | Log is operational telemetry; Audit Record exists for accountability. |
| Roadmap vs Development Plan | Roadmap communicates Product direction; development planning is internal implementation sequencing. |

---

# Naming Guidance

Documentation should prefer canonical domain terminology. Use `Creation`, `Derived Creation`, `Lineage`, `Direct Parent`, `Prompt`, `Customization`, `Generation Context`, and `Media` instead of vague substitutes when the canonical term communicates a specific Mosaic concept.

Avoid using `version` for creative evolution. `Model Version`, software version, and API version are valid uses of the word.

Use `Media` in architecture unless a rule is intentionally video-specific. Domain terminology and UI terminology do not need to be identical; for example, the domain may use `Derived Creation` while the UI uses `Remix`.

---

# Glossary Maintenance

When a domain decision changes, update the authoritative domain specification first and then update this Glossary. The Glossary must not silently preserve obsolete terminology.

The central rule is:

> **Clear language creates clearer Product rules, clearer architecture, and fewer implementation mistakes.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
* [User Identity](../01-product/user-identity.md)
* [Publications](../01-product/publications.md)
* [Prompts](../01-product/prompts.md)
* [Customization](../01-product/customization.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery](../01-product/discovery.md)
* [Social](../01-product/social.md)
* [Collections](../01-product/collections.md)
* [Notifications](../01-product/notifications.md)
* [Moderation](../01-product/moderation.md)
* [Administration](../01-product/administration.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [User Flows](../02-specification/user-flows.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](../03-technical/architecture.md)
* [Data Model](../03-technical/data-model.md)
* [API](../03-technical/api.md)
* [Media Storage](../03-technical/media-storage.md)
* [Search](../03-technical/search.md)
* [Security](../03-technical/security.md)
* [Scalability](../03-technical/scalability.md)
* [Observability](../03-technical/observability.md)
* [Testing](../03-technical/testing.md)
* [Deployment](../03-technical/deployment.md)

## Delivery

* [MVP](./mvp.md)
* [Product Roadmap](./roadmap.md)

---

**Previous:** [← Product Roadmap](./roadmap.md) · [Documentation Home](../README.md)
