# Open Decisions

> **Section:** Delivery
> **Status:** Active Decision Register
> **Audience:** Product, Engineering, Design & Project Contributors
> **Last updated:** September 2026

---

## Overview

This document centralizes Mosaic decisions that remain intentionally unresolved.

Throughout Mosaic's documentation, some questions were deliberately left open because deciding them prematurely would introduce assumptions without enough Product, technical, operational, or legal evidence.

This register exists so those questions do not become:

* forgotten;
* duplicated;
* inconsistently answered;
* silently decided during implementation.

The governing principle is:

> **Delay decisions when evidence is missing, but never allow an unresolved decision to become an accidental implementation decision.**

---

# 1. Purpose

An Open Decision represents a known question whose final answer may materially affect:

* Product behavior;
* User experience;
* data modeling;
* API behavior;
* Security;
* Moderation;
* infrastructure;
* delivery.

Open does not mean unimportant.

It means:

> **The decision has not yet reached the point where committing to one answer provides more value than preserving flexibility.**

---

# 2. Decision Status

Mosaic uses:

### 🟡 Open Decision

A meaningful decision that still requires resolution.

### ⏳ Decision Gate

An Open Decision that must be resolved before a specific implementation or launch milestone.

### 🔮 Future Decision

A question that does not need to be answered for the MVP and should remain deferred.

### ✅ Decided

A decision already established elsewhere in Mosaic documentation.

Decided items generally do not remain in this register except where necessary for context.

---

# 3. Decision Priority

Open Decisions are grouped by urgency:

```text id="od001"
A — Before Implementation
B — Before Dependent Capability
C — Before Public Launch
D — Post-MVP / Evidence-Driven
E — Future
```

---

# 4. Priority A — Before Implementation

These decisions affect foundational implementation choices and should be resolved before significant Product code is built.

---

## OD-TECH-001 — Web Framework and Runtime

**Status:** 🟡 Open
**Gate:** ⏳ Before implementation foundation
**Domain:** Technical

Mosaic has not selected its primary web framework/runtime.

The selection should support:

* responsive web UI;
* server-side Product logic;
* REST-oriented API behavior;
* authentication;
* relational persistence;
* background work integration;
* Media workflows;
* testing;
* deployment.

The choice should follow Mosaic's documented requirements rather than framework popularity alone.

---

## OD-TECH-002 — Relational Database

**Status:** 🟡 Open
**Gate:** ⏳ Before persistence implementation
**Domain:** Technical

Mosaic has decided to use relational persistence for authoritative structured Product data.

The specific database remains open.

The selection should support:

* transactions;
* relational integrity;
* constraints;
* indexing;
* Search requirements;
* migrations;
* reliable production operation.

---

## OD-TECH-003 — Database Access Layer

**Status:** 🟡 Open
**Gate:** ⏳ Before persistence implementation
**Domain:** Technical

Mosaic has not selected:

* ORM;
* query builder;
* direct database abstraction;
* migration tooling.

The choice should preserve visibility into important constraints and transactions rather than hiding critical domain behavior.

---

## OD-TECH-004 — Authentication Implementation

**Status:** 🟡 Open
**Gate:** ⏳ Before Identity implementation
**Domain:** Security / Technical

Mosaic's current technical direction uses first-party session-oriented authentication.

The exact implementation remains open.

Questions include:

* authentication library;
* session persistence;
* credential handling integration;
* session revocation;
* Account recovery implementation.

---

## OD-TECH-005 — Session Persistence

**Status:** 🟡 Open
**Gate:** ⏳ Before production authentication
**Domain:** Security

The system must determine where authenticated session state is stored and how it remains valid across horizontally scaled application instances.

---

## OD-TECH-006 — Session Lifetime

**Status:** 🟡 Open
**Gate:** ⏳ Before public launch
**Domain:** Security / Product

Define:

* idle expiration;
* absolute expiration;
* persistent login behavior;
* session rotation;
* logout invalidation.

---

## OD-TECH-007 — Repository Implementation Structure

**Status:** 🟡 Open
**Gate:** ⏳ Before implementation foundation
**Domain:** Engineering

The Modular Monolith architecture is decided.

The exact implementation structure remains open.

This includes:

* module directories;
* shared code boundaries;
* server/client organization;
* worker organization;
* test organization.

---

# 5. Identity & Account Decisions

---

## OD-ID-001 — User / Account / Profile Physical Model

**Status:** 🟡 Open
**Gate:** ⏳ Before Identity persistence
**Domain:** Identity / Data

Conceptually Mosaic distinguishes:

```text id="od002"
User
Account
Profile
```

The exact physical representation remains open.

Possible implementations may use separate records or carefully combined structures.

The conceptual separation must remain preserved regardless of table layout.

---

## OD-ID-002 — Registration Authentication Behavior

**Status:** 🟡 Open
**Gate:** ⏳ Before registration flow implementation
**Domain:** Identity / Product

After successful registration, Mosaic must decide whether the User:

```text id="od003"
Immediately receives authenticated state
```

or:

```text id="od004"
Completes registration
      ↓
Authenticates separately
```

Registration and authentication remain conceptually distinct.

---

## OD-ID-003 — Email Verification Requirement

**Status:** 🟡 Open
**Gate:** ⏳ Before public launch
**Domain:** Identity / Security

Email verification is supported conceptually.

Open questions include whether verification is required before:

* publishing;
* commenting;
* social actions;
* Account recovery-sensitive actions.

---

## OD-ID-004 — Username Changes

**Status:** 🟡 Open
**Priority:** D — Post-MVP unless required earlier
**Domain:** Identity

Mosaic has not defined whether usernames may change after registration.

If introduced, implications include:

* public URLs;
* historical references;
* impersonation;
* change frequency;
* previous-name reuse.

---

## OD-ID-005 — Private Accounts

**Status:** 🟡 Open
**Priority:** D — Post-MVP
**Domain:** Identity / Privacy

The MVP favors public Profiles and public published Creations.

A complete private-account model remains undefined.

---

## OD-ID-006 — Multiple Active Sessions

**Status:** 🟡 Open
**Gate:** ⏳ Before mature Account security
**Domain:** Security

Mosaic must eventually define whether Users can maintain multiple active sessions and whether they can inspect or revoke them individually.

---

## OD-ID-007 — Multi-Factor Authentication

**Status:** 🔮 Future Decision
**Domain:** Security

General User MFA is not required for the MVP.

Privileged-role MFA may need earlier consideration.

---

## OD-ID-008 — Privileged MFA

**Status:** 🟡 Open
**Gate:** ⏳ Before mature privileged production access
**Domain:** Security / Administration

Mosaic should determine whether Moderator and/or Administrator access requires stronger authentication.

---

# 6. Creation Decisions

---

## OD-CRE-001 — Edit vs New Derived Creation Boundary

**Status:** 🟡 Open
**Gate:** ⏳ Before published Creation editing
**Domain:** Product

Mosaic has decided:

```text id="od005"
Non-material correction
        ↓
Edit existing Creation

Material creative evolution
        ↓
New derived Creation
```

The remaining decision is where the practical boundary lies.

Potential factors include:

* Prompt changes;
* Media replacement;
* generation technique;
* Provider/Model change;
* description-only corrections;
* metadata corrections.

This decision must preserve historical creative integrity without making ordinary correction unnecessarily difficult.

---

## OD-CRE-002 — Initial Creation Media Cardinality

**Status:** 🟡 Open
**Gate:** ⏳ Before publication UI implementation
**Domain:** Product / Media

The architecture supports multiple Media records.

The MVP may restrict the authoring UI to one primary video.

The exact initial Product behavior remains to be confirmed.

---

## OD-CRE-003 — Publication During Media Processing

**Status:** 🟡 Open
**Gate:** ⏳ Before Media publication implementation
**Domain:** Media / Product

Mosaic must decide whether a Creation may enter a published state while Media processing is incomplete.

A broken public Creation experience must not result.

---

## OD-CRE-004 — Generation Context Required Fields

**Status:** 🟡 Open
**Gate:** ⏳ Before publication validation
**Domain:** Product

Determine which Generation Context fields are:

* required;
* optional;
* unknown-capable.

Mosaic must remain compatible with Providers/Models not present in its registry.

---

# 7. Prompt & Customization Decisions

---

## OD-PRM-001 — Customizable Element Syntax

**Status:** 🟡 Open
**Gate:** ⏳ Before Prompt customization implementation
**Domain:** Prompt / Technical

Conceptual examples use:

```text id="od006"
{{character}}
{{location}}
{{camera}}
```

The exact stored and displayed syntax remains open.

---

## OD-PRM-002 — Initial Customizable Element Types

**Status:** 🟡 Open
**Gate:** ⏳ Before customization UI
**Domain:** Prompt / Product

Determine the minimum initial set of input behaviors.

Potential examples:

* text;
* multiline text;
* selection;
* number.

The MVP should avoid unnecessary form-system complexity.

---

## OD-PRM-003 — Customization Persistence

**Status:** 🟡 Open
**Gate:** ⏳ Before customization workflow
**Domain:** Product / Technical

Determine how long customization state persists.

Potential approaches include:

* browser-local temporary state;
* server-side temporary session;
* persistent authenticated draft-like state;
* hybrid approach.

The selected model must preserve source attribution through derived publication.

---

## OD-PRM-004 — AI-Assisted Customization

**Status:** 🔮 Future Decision
**Domain:** Product / AI

AI assistance remains a future capability and does not require MVP resolution.

---

# 8. Lineage Decisions

These decisions are particularly important because Lineage is a foundational Mosaic capability.

---

## OD-LIN-001 — Direct Parent Cardinality

**Status:** 🟡 Open
**Gate:** ⏳ Before Lineage persistence is finalized
**Domain:** Lineage / Data Model

Mosaic must decide whether an initial derived Creation may have:

```text id="od007"
Exactly one direct parent
```

or:

```text id="od008"
Multiple direct parents
```

### Current design consideration

One direct parent provides:

* simpler navigation;
* simpler ancestry;
* simpler cycle prevention;
* simpler metrics;
* simpler moderation;
* clearer derivation semantics.

Multiple parents better represent work intentionally combining multiple sources but turn Lineage into a more complex graph.

The architecture must not accidentally finalize this decision before Product confirmation.

---

## OD-LIN-002 — Self-Derivation Terminology

**Status:** 🟡 Open
**Gate:** ⏳ Before final Lineage UI copy
**Domain:** Product / UX

Self-derived Creations use the same underlying Lineage relationship as community Remix.

Possible UI terminology includes:

* Evolution;
* Continuation;
* Updated Approach;
* Derived Creation.

The terminology should communicate creative evolution without implying internal versioning.

---

## OD-LIN-003 — Tombstone Public Information

**Status:** 🟡 Open
**Gate:** ⏳ Before unavailable-Lineage UI
**Domain:** Lineage / Privacy / Moderation

When a Creation becomes unavailable:

```text id="od009"
A
↓
[Unavailable Creation]
↓
C
```

Mosaic must define what information remains visible.

Potential information includes:

* existence;
* former title;
* former author identity;
* removal reason category;
* no additional information.

Privacy, moderation, and historical integrity must be balanced.

---

## OD-LIN-004 — Parent Relationship Correction

**Status:** 🟡 Open
**Gate:** ⏳ Before Lineage administration workflow
**Domain:** Lineage / Administration

Determine how an incorrect parent relationship can be corrected.

The current direction favors controlled Moderator/Administrator correction rather than ordinary creator mutation.

Exact workflow remains open.

---

## OD-LIN-005 — Lineage Relationship Disputes

**Status:** 🟡 Open
**Gate:** ⏳ Before mature attribution moderation
**Domain:** Lineage / Moderation

Define how Users dispute:

* false derivation;
* missing attribution;
* incorrect parent;
* abusive attribution.

---

## OD-LIN-006 — Direct vs Total Descendant Metrics

**Status:** 🟡 Open
**Gate:** ⏳ Before public Remix/derivation counts
**Domain:** Product

Mosaic must not label an ambiguous count simply as:

```text id="od010"
Remixes: 120
```

without defining whether it means:

* direct children;
* all descendants.

---

## OD-LIN-007 — Multi-Source Derivation

**Status:** 🔮 Future Decision if single-parent MVP is selected
**Domain:** Lineage

If the MVP chooses one direct parent, multiple-source derivation may be revisited later based on real creative behavior.

---

# 9. Discovery Decisions

---

## OD-DIS-001 — Initial Home Ranking

**Status:** 🟡 Open
**Gate:** ⏳ Before Home Discovery implementation
**Domain:** Discovery

Define the initial understandable ranking model.

Possible signals include:

```text id="od011"
Recency
Basic engagement
Relevance
Following
```

No arbitrary weights have been established.

---

## OD-DIS-002 — Empty Search Query Behavior

**Status:** 🟡 Open
**Gate:** ⏳ Before Search UI finalization
**Domain:** Search

Determine whether an empty Search query:

* returns discovery results;
* returns recent content;
* shows suggestions;
* requires text input.

---

## OD-DIS-003 — Initial Search Filters

**Status:** 🟡 Open
**Gate:** ⏳ Before Search MVP finalization
**Domain:** Search

Potential filters include:

* creator;
* category;
* tag;
* Provider;
* Model.

The initial set should follow actual usefulness.

---

## OD-DIS-004 — Initial Search Sort Options

**Status:** 🟡 Open
**Gate:** ⏳ Before Search MVP finalization
**Domain:** Search

Potential sorts include:

* relevance;
* recent;
* engagement.

Exact options remain open.

---

## OD-DIS-005 — Category Governance

**Status:** 🟡 Open
**Gate:** ⏳ Before Categories become public authoring metadata
**Domain:** Discovery / Administration

Determine:

* who creates Categories;
* who renames them;
* who removes them;
* whether creators choose one or multiple Categories.

---

## OD-DIS-006 — Tag Governance

**Status:** 🟡 Open
**Gate:** ⏳ Before Tags become public metadata
**Domain:** Discovery

Determine:

* normalization;
* casing;
* duplicate behavior;
* limits;
* moderation;
* creation permissions.

---

## OD-DIS-007 — Dedicated Creator Search

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Search

Creator Search may be separate or part of a future unified Search experience.

---

## OD-DIS-008 — Dedicated Search Infrastructure

**Status:** ⏳ Evidence Gate
**Priority:** D — Evidence-Driven
**Domain:** Technical

Mosaic begins with database-backed Search.

A dedicated Search engine should be introduced only when measured requirements justify it.

---

## OD-DIS-009 — Semantic Search

**Status:** 🔮 Future Decision
**Domain:** Search / AI

Semantic/vector Search is not required for MVP.

---

# 10. Social Decisions

---

## OD-SOC-001 — Self-Like

**Status:** 🟡 Open
**Gate:** ⏳ Before Like behavior is finalized
**Domain:** Social

Determine whether a creator may Like their own Creation.

---

## OD-SOC-002 — Comment Reply Depth

**Status:** 🟡 Open
**Gate:** ⏳ Before Comment threading implementation
**Domain:** Social

Determine whether Comments support:

```text id="od012"
One reply level
Limited nested levels
Arbitrary nesting
```

The MVP should avoid unnecessary discussion-tree complexity.

---

## OD-SOC-003 — Creator Comment Controls

**Status:** 🟡 Open
**Gate:** ⏳ Before Comment moderation behavior
**Domain:** Social / Moderation

Determine whether a Creation creator may:

* hide Comments;
* delete Comments;
* only Report Comments;
* use some controlled combination.

Creator ownership of a Creation does not automatically imply moderation ownership over another User's speech.

---

## OD-SOC-004 — Comment Edit History

**Status:** 🔮 Future Decision
**Domain:** Social

Users may edit their own Comments.

Public or Moderator-visible edit history remains undefined.

---

## OD-SOC-005 — Internal Repost

**Status:** 🔮 Future Decision
**Domain:** Social

A social repost mechanism remains separate from Remix/Lineage and is not required for MVP.

---

## OD-SOC-006 — View Definition

**Status:** 🟡 Open
**Gate:** ⏳ Before exposing View metrics
**Domain:** Product Analytics

Define what constitutes a View before exposing or relying on View counts.

Potential dimensions include:

* page load;
* minimum visibility;
* playback;
* unique User/session;
* repeated views.

---

## OD-SOC-007 — Engagement Metric Visibility

**Status:** 🟡 Open
**Gate:** ⏳ Before final Creation UI metrics
**Domain:** Product

Determine which public counts are visible.

Potential examples:

* Likes;
* Comments;
* Saves;
* direct descendants;
* total descendants;
* Views.

---

# 11. Save & Collection Decisions

---

## OD-COL-001 — Save ↔ Collection Relationship

**Status:** 🟡 Open
**Gate:** ⏳ Before Collections implementation
**Domain:** Collections

Mosaic must define whether Collection membership requires an active Save.

Possible models include:

```text id="od013"
Collection membership implies Save
```

or:

```text id="od014"
Save and Collection membership remain fully independent
```

---

## OD-COL-002 — Unsaving a Collected Creation

**Status:** 🟡 Open
**Gate:** ⏳ With OD-COL-001
**Domain:** Collections

If a Creation belongs to one or more Collections and the User removes its Save state, determine whether:

* Collection membership remains;
* memberships are removed;
* User is asked;
* unsaving is prevented until memberships change.

---

## OD-COL-003 — Save Count Visibility

**Status:** 🟡 Open
**Gate:** ⏳ Before exposing aggregate Save metrics
**Domain:** Collections / Privacy

Individual Save identity remains private.

Whether an aggregate Save count becomes public remains open.

---

## OD-COL-004 — Saving Own Creation

**Status:** 🟡 Open
**Gate:** ⏳ Before Save behavior finalization
**Domain:** Collections

Determine whether Users may Save their own Creations.

---

## OD-COL-005 — Duplicate Collection Names

**Status:** 🟡 Open
**Gate:** ⏳ Before Collection validation
**Domain:** Collections

Determine whether one User may create multiple Collections with the same name.

---

## OD-COL-006 — Public Collections

**Status:** 🔮 Future Decision
**Domain:** Collections

MVP Collections are private by default.

Public, unlisted, and collaborative Collections remain future possibilities.

---

# 12. Notification Decisions

---

## OD-NOT-001 — Follow Notifications

**Status:** 🟡 Open
**Gate:** ⏳ Before initial Notification event set
**Domain:** Notifications

Determine whether a User receives an individual Notification when followed.

---

## OD-NOT-002 — Like Notifications

**Status:** 🟡 Open
**Gate:** ⏳ Before initial Notification event set
**Domain:** Notifications

Determine initial Like Notification behavior and grouping.

---

## OD-NOT-003 — Notification Retention

**Status:** 🟡 Open
**Gate:** ⏳ Before production Notification storage policy
**Domain:** Notifications / Data

Determine how long Notification records are retained.

---

## OD-NOT-004 — Notification Dismissal / Deletion

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Notifications

Determine whether Users can:

* mark read;
* dismiss;
* permanently delete

Notification records.

---

## OD-NOT-005 — Email Social Notifications

**Status:** 🟡 Open
**Priority:** D — Post-MVP unless needed
**Domain:** Notifications

Initial email use should prioritize Account/security communication.

Broad social email delivery remains undefined.

---

## OD-NOT-006 — Push Notifications

**Status:** 🔮 Future Decision
**Domain:** Notifications

Push is not required for web MVP.

---

# 13. Blocking Decisions

---

## OD-BLK-001 — Blocking Interaction Matrix

**Status:** 🟡 Open
**Gate:** ⏳ Before Blocking implementation
**Domain:** Safety / Social

Mosaic must define exactly how blocking affects:

* Profile visibility;
* Creation visibility;
* Search;
* Comments;
* Likes;
* Follows;
* Notifications;
* Saves;
* Lineage navigation;
* Remix ability.

Historical Lineage MUST NOT be destroyed.

---

## OD-BLK-002 — Existing Follow Relationship

**Status:** 🟡 Open
**Gate:** ⏳ With Blocking matrix
**Domain:** Social

Determine whether blocking automatically removes existing Follow relationships.

---

## OD-BLK-003 — Existing Comments

**Status:** 🟡 Open
**Gate:** ⏳ With Blocking matrix
**Domain:** Social

Determine how historical Comments between blocked Users are displayed.

---

# 14. Moderation Decisions

---

## OD-MOD-001 — Initial Report Taxonomy

**Status:** 🟡 Open
**Gate:** ⏳ Before public launch
**Domain:** Moderation / Policy

Define a manageable initial set of Report reasons.

The taxonomy should support useful triage without pretending to model every possible policy violation.

---

## OD-MOD-002 — Anonymous Reporting

**Status:** 🟡 Open
**Priority:** D — Evidence/Policy Driven
**Domain:** Moderation

Determine whether unauthenticated Visitors may submit Reports.

MVP currently assumes authenticated reporting.

---

## OD-MOD-003 — Initial Enforcement Ladder

**Status:** 🟡 Open
**Gate:** ⏳ Before public launch
**Domain:** Moderation

Define the initial available enforcement actions.

Potential actions include:

```text id="od015"
No Action
Warning
Content Restriction
Content Removal
Interaction Restriction
Temporary Suspension
Suspension
Permanent Ban
```

The MVP does not necessarily require every level.

---

## OD-MOD-004 — Content Under Review Visibility

**Status:** 🟡 Open
**Gate:** ⏳ Before moderation workflow finalization
**Domain:** Moderation

Determine whether reported content remains visible while awaiting review.

Behavior may depend on risk.

---

## OD-MOD-005 — Low-Effort Remix Boundary

**Status:** 🟡 Open
**Priority:** C/D
**Domain:** Moderation / Lineage

Mosaic has not defined when a minimally changed derivative becomes abusive duplication rather than legitimate creative derivation.

No arbitrary similarity percentage should define this automatically.

---

## OD-MOD-006 — Moderation Evidence Retention

**Status:** 🟡 Open
**Gate:** ⏳ Before mature production moderation
**Domain:** Moderation / Privacy

Determine what evidence may be retained after content removal and for how long.

---

## OD-MOD-007 — AI Moderation Implementation

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Moderation / AI

The architecture supports AI-assisted moderation.

The exact provider, model, thresholds, and initial automation depth remain open.

---

# 15. Administration Decisions

---

## OD-ADM-001 — Initial Administrator Bootstrap

**Status:** 🟡 Open
**Gate:** ⏳ Before Administration implementation
**Domain:** Administration / Security

Define how the first Administrator is established securely.

Permanent privileged credentials MUST NOT be hardcoded into public source code.

---

## OD-ADM-002 — Administrator Assignment

**Status:** 🟡 Open
**Gate:** ⏳ Before multiple Administrators are supported
**Domain:** Administration

Define who may grant or revoke Administrator privileges.

---

## OD-ADM-003 — High-Risk Action Safeguards

**Status:** 🟡 Open
**Gate:** ⏳ Before high-impact Administration actions
**Domain:** Administration / Security

Potential safeguards include:

* re-authentication;
* MFA;
* explicit reason;
* confirmation;
* multiple-party approval.

The required combination remains open.

---

## OD-ADM-004 — Support Impersonation

**Status:** 🔮 Future Decision
**Domain:** Administration / Security

Mosaic does not require User impersonation for initial support operations.

If ever introduced, strong safeguards and auditability will be required.

---

## OD-ADM-005 — Editorial Promotion

**Status:** 🔮 Future Decision
**Domain:** Administration / Discovery

Mosaic has not decided whether administrators/editors may manually promote selected Creations.

If introduced, editorial placement should remain distinguishable from organic popularity.

---

# 16. Media Decisions

---

## OD-MED-001 — Object Storage Provider

**Status:** 🟡 Open
**Gate:** ⏳ Before Media implementation
**Domain:** Infrastructure

Mosaic has decided to use object storage for large Media.

The provider remains open.

---

## OD-MED-002 — Initial Media Limits

**Status:** 🟡 Open
**Gate:** ⏳ Before upload implementation
**Domain:** Media / Product

Define initial:

* maximum file size;
* duration;
* accepted formats;
* resolution constraints where needed.

Limits should follow Product usability, processing cost, security, and infrastructure capability.

---

## OD-MED-003 — Initial Transcoding Strategy

**Status:** 🟡 Open
**Gate:** ⏳ Before production Media processing
**Domain:** Media

Determine whether Mosaic:

* accepts a constrained web-ready format;
* transcodes uploads;
* normalizes selected formats.

---

## OD-MED-004 — Malware Scanning

**Status:** 🟡 Open
**Gate:** ⏳ Before mature public upload system
**Domain:** Media / Security

Determine whether and how uploaded Media receives malware/security scanning.

---

## OD-MED-005 — Media Delivery / CDN

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Media / Infrastructure

Determine initial Media delivery strategy and whether a CDN is required immediately.

---

## OD-MED-006 — Signed vs Public Media Delivery

**Status:** 🟡 Open
**Gate:** ⏳ Before final storage access design
**Domain:** Media / Security

Public Creations require efficient Media delivery.

Private or restricted resources require appropriate access control.

The exact URL/access model remains open.

---

## OD-MED-007 — Physical Media Retention

**Status:** 🟡 Open
**Gate:** ⏳ Before deletion/moderation production policy
**Domain:** Media / Privacy

Determine how long physically removed/unavailable Media may remain retained for:

* recovery;
* Appeals;
* moderation evidence;
* legal requirements.

---

# 17. Background Processing Decisions

---

## OD-JOB-001 — Background Job Technology

**Status:** 🟡 Open
**Gate:** ⏳ Before asynchronous processing implementation
**Domain:** Technical

Mosaic requires asynchronous processing capability.

The exact job infrastructure remains open.

---

## OD-JOB-002 — Message Broker Requirement

**Status:** 🟡 Open
**Priority:** Evidence-Driven
**Domain:** Technical

A dedicated external message broker is not required by architecture initially.

It should be introduced only if the selected job system or operational requirements justify it.

---

## OD-JOB-003 — Job Priority

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Technical

Determine whether job classes require priority levels.

Potential examples:

```text id="od016"
Media processing
Moderation
Notifications
Search indexing
Analytics
```

---

## OD-JOB-004 — Reliable Event / Outbox Pattern

**Status:** 🟡 Open
**Priority:** Evidence-Driven
**Domain:** Architecture

A transactional outbox or equivalent mechanism may become useful if reliable asynchronous side effects require stronger delivery guarantees.

It is not mandated prematurely.

---

# 18. API Decisions

---

## OD-API-001 — Pagination Strategy

**Status:** 🟡 Open
**Gate:** ⏳ Before collection APIs stabilize
**Domain:** API

Bounded retrieval is required.

The exact use of:

* cursor pagination;
* offset pagination;
* mixed strategy

remains open.

---

## OD-API-002 — Error Representation

**Status:** 🟡 Open
**Gate:** ⏳ Before API implementation stabilizes
**Domain:** API

Mosaic requires structured errors.

The exact error envelope and machine-readable error code conventions remain open.

---

## OD-API-003 — API Versioning

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** API

A first-party Product API may not require explicit public versioning initially.

Versioning should be introduced when compatibility requirements justify it.

---

## OD-API-004 — OpenAPI Specification

**Status:** 🟡 Open
**Priority:** B/D
**Domain:** API / Documentation

Determine whether the internal REST API will maintain a formal OpenAPI specification from the beginning or introduce it later.

---

## OD-API-005 — Idempotency Keys

**Status:** 🟡 Open
**Gate:** ⏳ Before high-risk duplicate-sensitive operations if required
**Domain:** API

Potential candidates include:

* publication;
* Media confirmation;
* selected administrative operations.

Database constraints remain necessary regardless.

---

## OD-API-006 — Optimistic Concurrency

**Status:** 🟡 Open
**Priority:** Evidence-Driven
**Domain:** API / Data

Determine whether editable resources require explicit optimistic concurrency controls.

---

# 19. Search Infrastructure Decisions

---

## OD-SRCH-001 — Search Extraction Threshold

**Status:** ⏳ Evidence Gate
**Domain:** Search / Scalability

A dedicated Search system should only replace database-backed Search when evidence such as:

* latency;
* database load;
* ranking complexity;
* Search feature requirements;
* semantic retrieval

justifies extraction.

No arbitrary scale threshold is currently defined.

---

## OD-SRCH-002 — Search Index Technology

**Status:** 🔮 Future Decision
**Domain:** Search

No dedicated Search technology should be selected before extraction becomes necessary.

---

## OD-SRCH-003 — Search Analytics Retention

**Status:** 🟡 Open
**Priority:** D
**Domain:** Search / Privacy

If Search queries are logged for Product improvement, retention and privacy rules must be defined.

---

# 20. Scalability Decisions

---

## OD-SCALE-001 — Distributed Cache

**Status:** ⏳ Evidence Gate
**Domain:** Scalability

No distributed cache is required initially.

Introduce one when measured workloads justify it.

---

## OD-SCALE-002 — Read Replicas

**Status:** 🔮 Future Decision
**Domain:** Scalability

Read replicas remain a future scaling option.

---

## OD-SCALE-003 — Database Partitioning

**Status:** 🔮 Future Decision
**Domain:** Scalability

Partitioning should follow measured table growth and workload characteristics.

---

## OD-SCALE-004 — Database Sharding

**Status:** 🔮 Future Decision
**Domain:** Scalability

Initial Mosaic architecture explicitly does not require database sharding.

---

## OD-SCALE-005 — Feed Fan-Out Strategy

**Status:** ⏳ Evidence Gate
**Domain:** Discovery / Scalability

If Following feeds reach scale where direct read-time generation becomes problematic, Mosaic may evaluate:

* fan-out on read;
* fan-out on write;
* hybrid strategies.

---

## OD-SCALE-006 — Multi-Region

**Status:** 🔮 Future Decision
**Domain:** Infrastructure

No initial multi-region requirement exists.

---

# 21. Observability Decisions

---

## OD-OBS-001 — Logging Provider

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Observability

---

## OD-OBS-002 — Error Tracking Provider

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Observability

---

## OD-OBS-003 — Metrics Platform

**Status:** 🟡 Open
**Gate:** ⏳ Before mature production operation
**Domain:** Observability

---

## OD-OBS-004 — Distributed Tracing

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Observability

Tracing is useful but not necessarily required for the initial Modular Monolith.

---

## OD-OBS-005 — OpenTelemetry

**Status:** 🟡 Open
**Priority:** D
**Domain:** Observability

Mosaic may use OpenTelemetry or provider-specific instrumentation.

---

## OD-OBS-006 — Telemetry Retention

**Status:** 🟡 Open
**Gate:** ⏳ Before production telemetry policy
**Domain:** Observability / Privacy

---

## OD-OBS-007 — Formal SLIs / SLOs

**Status:** 🟡 Open
**Priority:** D — Evidence-Driven
**Domain:** Reliability

Formal service targets should be based on Product needs and operational evidence rather than invented during design.

---

# 22. Testing Decisions

---

## OD-TEST-001 — Unit Testing Framework

**Status:** 🟡 Open
**Gate:** ⏳ With technology stack
**Domain:** Testing

---

## OD-TEST-002 — Integration Testing Framework

**Status:** 🟡 Open
**Gate:** ⏳ With technology stack
**Domain:** Testing

---

## OD-TEST-003 — End-to-End Testing Framework

**Status:** 🟡 Open
**Gate:** ⏳ Before critical UI journey automation
**Domain:** Testing

---

## OD-TEST-004 — Browser Matrix

**Status:** 🟡 Open
**Gate:** ⏳ Before public release validation
**Domain:** Testing / Compatibility

---

## OD-TEST-005 — Accessibility Tooling

**Status:** 🟡 Open
**Gate:** ⏳ Before accessibility automation
**Domain:** Testing / Accessibility

---

## OD-TEST-006 — Coverage Threshold

**Status:** 🟡 Open
**Priority:** D / Evidence-Driven
**Domain:** Testing

Mosaic does not currently mandate an arbitrary global percentage.

---

## OD-TEST-007 — Visual Regression Testing

**Status:** 🔮 Future / Evidence-Driven
**Domain:** Testing

---

## OD-TEST-008 — Property-Based / Mutation Testing

**Status:** 🔮 Future Decision
**Domain:** Testing

Potentially useful for selected high-risk invariants but not required initially.

---

# 23. Deployment Decisions

---

## OD-DEP-001 — Hosting Provider

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Infrastructure

---

## OD-DEP-002 — Production Runtime Model

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Infrastructure

Potential models include:

* long-running application runtime;
* containers;
* selected serverless capabilities;
* hybrid deployment.

The choice must support Mosaic's web, worker, Media, database, and session requirements.

---

## OD-DEP-003 — Containerization

**Status:** 🟡 Open
**Gate:** Depends on hosting selection
**Domain:** Deployment

---

## OD-DEP-004 — CI Provider

**Status:** 🟡 Open
**Gate:** ⏳ Before implementation workflow stabilizes
**Domain:** Delivery

---

## OD-DEP-005 — CD Provider / Mechanism

**Status:** 🟡 Open
**Gate:** ⏳ Before production deployment
**Domain:** Delivery

---

## OD-DEP-006 — Continuous Delivery vs Continuous Deployment

**Status:** 🟡 Open
**Gate:** ⏳ Before production release workflow
**Domain:** Delivery

---

## OD-DEP-007 — Git Branching / Release Strategy

**Status:** 🟡 Open
**Gate:** ⏳ Before contributor workflow stabilizes
**Domain:** Delivery

---

## OD-DEP-008 — Validation / Staging Topology

**Status:** 🟡 Open
**Gate:** ⏳ Before production release process
**Domain:** Deployment

---

## OD-DEP-009 — Preview Environments

**Status:** 🔮 Future / Optional
**Domain:** Deployment

---

## OD-DEP-010 — Production Region

**Status:** 🟡 Open
**Gate:** ⏳ Before production infrastructure
**Domain:** Infrastructure

Selection should consider expected Users, database location, Media, provider support, legal requirements, and cost.

---

## OD-DEP-011 — Deployment Strategy

**Status:** 🟡 Open
**Gate:** Depends on hosting
**Domain:** Deployment

Potential mechanisms include:

* replacement;
* rolling;
* blue-green;
* canary.

Advanced strategies are not required without justification.

---

## OD-DEP-012 — Automatic Rollback

**Status:** 🟡 Open
**Priority:** D
**Domain:** Deployment

---

## OD-DEP-013 — Infrastructure as Code

**Status:** 🔮 Future Technical Direction
**Domain:** Infrastructure

IaC should become more valuable as infrastructure complexity grows.

---

## OD-DEP-014 — Feature Flags

**Status:** 🟡 Open
**Priority:** D
**Domain:** Delivery

---

# 24. Backup & Recovery Decisions

---

## OD-REC-001 — Backup Provider / Mechanism

**Status:** 🟡 Open
**Gate:** ⏳ Before real production data
**Domain:** Recovery

---

## OD-REC-002 — Backup Schedule

**Status:** 🟡 Open
**Gate:** ⏳ Before real production data
**Domain:** Recovery

---

## OD-REC-003 — Backup Retention

**Status:** 🟡 Open
**Gate:** ⏳ Before real production data
**Domain:** Recovery / Privacy

---

## OD-REC-004 — Recovery Point Objective

**Status:** 🟡 Open
**Priority:** C/D
**Domain:** Reliability

Formal RPO should follow actual Product requirements.

---

## OD-REC-005 — Recovery Time Objective

**Status:** 🟡 Open
**Priority:** C/D
**Domain:** Reliability

Formal RTO should follow actual Product requirements.

---

# 25. Privacy Decisions

---

## OD-PRIV-001 — Account Deletion Details

**Status:** 🟡 Open
**Gate:** ⏳ Before mature public launch
**Domain:** Privacy

Define how deletion affects:

* Profile identity;
* Creations;
* Comments;
* Lineage;
* Likes;
* Follows;
* Saves;
* Collections;
* Notifications;
* Reports;
* audit records.

Historical integrity and privacy obligations must both be respected.

---

## OD-PRIV-002 — Data Retention Matrix

**Status:** 🟡 Open
**Gate:** ⏳ Before mature public operation
**Domain:** Privacy

Mosaic should eventually define retention rules for:

* Account data;
* deleted content;
* Media;
* Reports;
* moderation evidence;
* Notifications;
* operational telemetry;
* audit records.

---

## OD-PRIV-003 — User Data Export

**Status:** 🟡 Open / Legal-Requirement Dependent
**Domain:** Privacy

The exact self-service export workflow remains undefined.

---

## OD-PRIV-004 — Application-Level Encryption

**Status:** 🟡 Open
**Priority:** Risk-Driven
**Domain:** Security / Privacy

Determine whether selected sensitive fields require encryption beyond infrastructure-level encryption at rest.

---

# 26. Product Analytics Decisions

---

## OD-ANL-001 — Analytics Platform

**Status:** 🟡 Open
**Priority:** Before meaningful MVP validation
**Domain:** Product Analytics

Mosaic should eventually collect enough privacy-aware Product evidence to evaluate the core creative loop.

Exact tooling remains open.

---

## OD-ANL-002 — Core Product Metrics

**Status:** 🟡 Open
**Gate:** ⏳ Before MVP validation
**Domain:** Product

Potential metrics include:

```text id="od017"
Discovery → Creation Detail
Creation Detail → Customization
Customization → External generation intent
Customization → Derived Publication
Search → Useful result
Repeat creation
Repeat visit
```

Exact definitions remain open.

---

## OD-ANL-003 — Analytics Privacy

**Status:** 🟡 Open
**Gate:** ⏳ Before Product analytics collection
**Domain:** Privacy / Analytics

Define what behavioral data is collected, why, and for how long.

---

# 27. Legal & Ownership Decisions

---

## OD-LEGAL-001 — Repository License

**Status:** 🟡 Open
**Gate:** Before intentionally licensing repository code
**Domain:** Legal

The repository currently should not imply an open-source license until ownership and commercial intentions are defined.

---

## OD-LEGAL-002 — Platform Terms

**Status:** 🟡 Open
**Gate:** ⏳ Before mature public launch
**Domain:** Legal / Product

Public operation will eventually require appropriate platform terms.

---

## OD-LEGAL-003 — Content Licensing

**Status:** 🟡 Open
**Gate:** Before Mosaic defines reusable legal rights
**Domain:** Legal / Creative Ownership

Lineage records creative relationship.

It does not itself grant legal permission to reuse a Prompt or Media.

---

## OD-LEGAL-004 — Commercial Creator Model

**Status:** 🔮 Future Decision
**Domain:** Legal / Monetization

Marketplace or creator monetization would require substantial additional ownership and licensing decisions.

---

# 28. Future Product Decisions

These questions intentionally remain outside MVP decision pressure.

---

## OD-FUT-001 — Direct AI Generation

**Status:** 🔮 Future Decision

Mosaic may eventually integrate AI-generation Providers directly.

---

## OD-FUT-002 — Public Developer API

**Status:** 🔮 Future Decision

---

## OD-FUT-003 — Native Mobile Applications

**Status:** 🔮 Future Decision

---

## OD-FUT-004 — Monetization

**Status:** 🔮 Future Decision

---

## OD-FUT-005 — Marketplace

**Status:** 🔮 Future Decision

---

## OD-FUT-006 — Creator Reputation

**Status:** 🔮 Future Decision

---

## OD-FUT-007 — Creator Verification

**Status:** 🔮 Future Decision

---

## OD-FUT-008 — Collaborative Creation

**Status:** 🔮 Future Decision

---

## OD-FUT-009 — Advanced Attribution Detection

**Status:** 🔮 Future Decision

---

## OD-FUT-010 — Multi-Media Product Expansion

**Status:** 🔮 Future Decision

Video remains the initial focus.

---

# 29. Immediate Decision Queue

Not every item in this register deserves attention now.

The next decisions that materially block implementation are:

```text id="od018"
1. Technology stack
2. Relational database
3. Database access / migration layer
4. Authentication implementation
5. User / Account / Profile physical model
6. Repository implementation structure
```

Shortly after those:

```text id="od019"
7. Media storage / processing stack
8. Initial Media constraints
9. Edit vs New Creation boundary
10. Lineage direct-parent cardinality
11. Customization representation / persistence
12. Background job technology
```

Later Product decisions can remain open until their dependent capabilities approach implementation.

---

# 30. Pre-Public-Launch Decision Queue

Before Mosaic operates as a mature public community, important unresolved questions include:

```text id="od020"
Email verification behavior
Session policies
Blocking matrix
Report taxonomy
Enforcement ladder
Moderation visibility
Administrator bootstrap
Privileged safeguards
Media limits
Backup policy
Account deletion
Retention
Analytics privacy
Platform legal requirements
```

---

# 31. Evidence-Gated Decisions

The following should specifically NOT be decided through speculation alone:

```text id="od021"
Dedicated Search engine
Distributed cache
Read replicas
Database partitioning
Database sharding
Feed fan-out strategy
Multi-region architecture
Advanced recommendation infrastructure
Formal large-scale SLOs
Complex autoscaling
```

These require operational evidence.

---

# 32. Decision Record Process

When an Open Decision is resolved:

```text id="od022"
Question
   ↓
Context
   ↓
Options
   ↓
Trade-offs
   ↓
Decision
   ↓
Consequences
   ↓
Documentation update
```

The relevant source documents should then be updated.

---

# 33. Avoiding Duplicate Truth

`open-decisions.md` is the central register.

It does not replace the detailed context in Product or Technical documents.

When a decision changes from:

```text id="od023"
🟡 Open
```

to:

```text id="od024"
✅ Decided
```

the authoritative domain document should also be updated.

---

# 34. Decision Ownership

Decisions may involve different concerns:

```text id="od025"
Product
Engineering
Security
Privacy
Moderation
Operations
Legal
```

A decision should not be treated as purely technical when it changes User-facing Product semantics.

---

# 35. Implementation Rule

Developers MUST NOT resolve a documented Open Decision merely by choosing the easiest implementation without surfacing the choice.

If implementation reaches an unresolved gate:

```text id="od026"
Stop at decision boundary
       ↓
Review options
       ↓
Decide
       ↓
Document
       ↓
Implement
```

---

# 36. Reversibility

When evidence remains limited, Mosaic should prefer reversible choices where the cost is reasonable.

Reversibility does not mean avoiding all decisions.

It means recognizing uncertainty.

---

# 37. Decision Urgency

Urgency should be determined by dependency.

A decision becomes urgent when:

> **Work that depends on it is about to begin.**

Not simply because the question exists.

---

# 38. Decision Summary by Gate

## Before Initial Implementation

Highest priority:

```text id="od027"
Technology stack
Database
Database access layer
Authentication implementation
User/Account/Profile representation
Repository structure
Testing foundation
```

---

## Before Creation & Media

```text id="od028"
Edit vs New Creation
Initial Media cardinality
Object storage
Media limits
Transcoding strategy
Generation Context requirements
```

---

## Before Customization & Lineage

```text id="od029"
Direct parent cardinality
Self-derivation terminology
Tombstone behavior
Prompt variable representation
Customization persistence
Lineage correction policy
```

---

## Before Discovery & Community

```text id="od030"
Home ranking
Search filters
Categories
Tags
Self-Like
Comment depth
Comment controls
Save ↔ Collection
Notification events
```

---

## Before Public Community Operation

```text id="od031"
Blocking matrix
Report taxonomy
Enforcement ladder
Moderation visibility
Administrator bootstrap
Privileged safeguards
Account deletion
Retention
Backups
Production Security
```

---

## Evidence-Driven Later

```text id="od032"
Dedicated Search
Semantic Search
Distributed Cache
Read Replicas
Sharding
Advanced Recommendations
Multi-Region
Advanced Analytics
Advanced Moderation Automation
```

---

## Future Product Expansion

```text id="od033"
Direct AI Generation
Public API
Native Apps
Marketplace
Monetization
Collaboration
Reputation
Verification
Additional Media types
```

---

# 39. Final Principle

Mosaic should not attempt to answer every future question today.

At the same time, unresolved decisions must remain visible.

The decision system therefore follows:

```text id="od034"
Know what is decided
       +
Know what is open
       +
Know when it must be decided
       +
Preserve flexibility until then
```

The central principle is:

> **An intentional open decision is flexibility. An invisible open decision is risk.**

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
* [Glossary →](./glossary.md)

---

**Previous:** [← Product Roadmap](./roadmap.md) · [Documentation Home](../README.md) · **Next:** [Glossary →](./glossary.md)
