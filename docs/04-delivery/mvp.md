# Minimum Viable Product

> **Section:** Delivery
> **Status:** Active Delivery Specification
> **Audience:** Product, Engineering, Design & Project Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the initial Minimum Viable Product scope for Mosaic.

The complete Mosaic documentation describes a Product larger than its first release.

The MVP exists to identify the smallest coherent implementation capable of proving Mosaic's central Product hypothesis:

> **People can discover AI-generated Creations, understand the Prompts behind them, customize those Prompts, create their own results externally, publish new Creations, and preserve the creative relationship between those works.**

The MVP is therefore not:

> "Every documented Mosaic feature implemented once."

It is:

> **The smallest complete Mosaic experience that proves the core creative loop while preserving the architectural foundations required for the Product to evolve safely.**

---

# 1. MVP Principle

Mosaic's MVP follows:

```text
Build the complete core loop
before building the complete platform.
```

The MVP should feel intentionally focused rather than artificially incomplete.

---

# 2. Core Product Hypothesis

Mosaic assumes that AI video Prompts become more useful when they are not merely copied as isolated text.

Instead, users should be able to:

```text
Discover
   ↓
Understand
   ↓
Customize
   ↓
Generate
   ↓
Publish
   ↓
Derive
   ↓
Discover Again
```

The MVP exists primarily to test this hypothesis.

---

# 3. MVP Success Definition

The MVP is Product-complete when a new User can successfully perform the following journey:

```text
Visit Mosaic
      ↓
Browse public Creations
      ↓
Open a Creation
      ↓
Understand its Prompt
      ↓
Create an Account
      ↓
Customize the Prompt
      ↓
Use the Prompt externally
      ↓
Generate Media with an external AI tool
      ↓
Return to Mosaic
      ↓
Publish a derived Creation
      ↓
See the relationship to the source Creation
      ↓
Allow another User to discover that new Creation
```

This is Mosaic's primary MVP acceptance journey.

---

# 4. MVP Scope Classification

Features in this document are classified as:

* **MVP Core** — required for the initial viable Product;
* **MVP Supporting** — required to make the Core usable, safe, or operational;
* **Post-MVP** — intentionally deferred;
* **Future** — strategically possible but not currently scheduled.

---

# 5. MVP Core Domains

The MVP requires these Product domains:

```text
Identity
Profiles
Creations
Prompts
Customization
Media
Lineage
Basic Discovery
Basic Social Interaction
Basic Collections / Saves
Notifications
Moderation
Administration
```

Not every documented capability inside these domains belongs to the MVP.

---

# 6. Public Browsing

**Classification:** MVP Core

Visitors MUST be able to browse public Mosaic content without authentication.

Initial public access includes:

* public Creation discovery;
* Creation detail;
* public Profile viewing;
* Prompt viewing;
* basic Lineage viewing.

Registration should not be required merely to understand what Mosaic is.

---

# 7. Account Registration

**Classification:** MVP Core

Users MUST be able to create an Account.

Initial registration includes:

* email;
* username;
* password.

Exact authentication technology remains a Technical implementation decision.

---

# 8. Authentication

**Classification:** MVP Core

Registered Users MUST be able to:

* authenticate;
* maintain an authenticated session;
* sign out.

Password recovery SHOULD be available before Mosaic is treated as a mature public service.

---

# 9. Email Verification

**Classification:** MVP Supporting

Email verification SHOULD be supported.

Whether verification is required before every Product action may be determined during implementation.

The MVP architecture MUST NOT make verification difficult to introduce or enforce.

---

# 10. Social Authentication

**Classification:** Post-MVP

Initial MVP does not require:

```text
Google Login
GitHub Login
Apple Login
```

or other OAuth/social identity providers.

Email and password are sufficient initially.

---

# 11. Profile

**Classification:** MVP Core

Each normal User MUST have a Profile.

Initial Profile capabilities should include:

* username;
* display name;
* avatar;
* short biography;
* public Creation list;
* basic social information.

---

# 12. Advanced Profile Features

**Classification:** Post-MVP

The MVP does not require:

* Profile verification;
* creator badges;
* advanced analytics;
* customizable Profile layouts;
* creator monetization;
* multiple Profile identities.

---

# 13. Creator Account Type

Mosaic will NOT introduce a separate creator account type for MVP.

A User becomes a creator by publishing.

```text
User
  ↓
Publishes
  ↓
Creator behavior
```

This preserves the existing Product model.

---

# 14. Creation

**Classification:** MVP Core

Creation is the primary published artifact.

An MVP Creation contains at minimum:

```text
Author
Generated Media
Prompt
Basic Identification
Generation Context where known
Publication Metadata
Lineage Relationship where derived
```

---

# 15. Creation Draft

**Classification:** MVP Core

Users SHOULD be able to prepare a Creation before publication.

The initial Draft experience does not require sophisticated collaborative editing or long-term document history.

---

# 16. Draft Persistence

**Classification:** MVP Supporting

Drafts SHOULD survive ordinary navigation and reasonable interruptions where practical.

Exact:

* autosave;
* expiration;
* recovery;
* cross-device persistence

will depend on implementation.

---

# 17. Original Creation Publication

**Classification:** MVP Core

Users MUST be able to publish an Original Creation.

An Original Creation means:

> A Creation without a parent inside Mosaic's Lineage.

This does not constitute a legal claim of originality.

---

# 18. Derived Creation Publication

**Classification:** MVP Core

Users MUST be able to publish a Creation derived from another public Creation.

The direct source relationship MUST be preserved.

Example:

```text
Creation A
    ↓
Creation B
```

B knows that A is its direct parent.

---

# 19. Self-Derivation

**Classification:** MVP Core

Creators MUST be able to derive a new Creation from one of their own previous Creations.

The same Lineage infrastructure used for community derivation applies.

No separate technical version system should be introduced.

---

# 20. Published Creation Immutability Principle

The MVP MUST preserve the rule:

```text
Non-material correction
        ↓
Edit existing Creation
```

while:

```text
Material creative evolution
        ↓
Publish new derived Creation
```

The exact boundary between these categories remains an open Product decision that should be finalized before implementation of the editing workflow.

---

# 21. Media Type

**Classification:** MVP Core

The initial Mosaic Product focuses on:

> **AI-generated video.**

The domain architecture remains capable of supporting additional Media types later.

---

# 22. Initial Media Requirement

The MVP does not need to expose every Media capability already supported conceptually by the architecture.

The initial publication experience MAY require one primary video per Creation.

The underlying architecture should remain capable of evolving beyond that restriction.

---

# 23. Media Upload

**Classification:** MVP Core

Users MUST be able to upload generated video Media for a Creation.

Media should use the architecture defined in `media-storage.md`:

```text
Client
   ↓
Authorized Upload
   ↓
Object Storage
   ↓
Validation / Processing
   ↓
Ready Media
   ↓
Publication
```

---

# 24. Media Processing

**Classification:** MVP Supporting

The MVP requires sufficient processing to provide safe and usable web delivery.

This may include:

* validation;
* metadata extraction;
* poster/thumbnail generation;
* normalization where necessary.

Advanced streaming infrastructure is not required initially.

---

# 25. Adaptive Streaming

**Classification:** Post-MVP unless operational evidence requires it

The MVP does not require a complex adaptive-streaming architecture by default.

The architecture allows it to be introduced later if Media size, bandwidth, or playback experience justifies it.

---

# 26. Prompt

**Classification:** MVP Core

Every published Creation MUST include a Prompt or equivalent generation instructions.

Plain-text Prompt publication MUST be valid.

---

# 27. Structured Prompt

**Classification:** MVP Core, Lightweight

The MVP SHOULD support creator-defined customizable areas without requiring a universal rigid Prompt schema.

A Prompt may remain mostly text while selected areas become customizable.

---

# 28. Prompt Variables

**Classification:** MVP Core

Creators SHOULD be able to define customizable elements conceptually equivalent to:

```text
{{character}}
{{location}}
{{camera}}
{{lighting}}
```

The exact technical syntax may differ.

---

# 29. Variable Metadata

The initial variable system SHOULD support enough metadata to explain customization.

Potential initial fields:

```text
Identifier
Label
Description
Default Value
```

Additional field types and complex validation can evolve later.

---

# 30. Prompt Suggestions

**Classification:** MVP Supporting

Creators MAY provide suggestions for customizable elements.

Suggestions guide Users rather than necessarily restricting their input.

---

# 31. Prompt Customization

**Classification:** MVP Core

Users MUST be able to customize a source Prompt without modifying the source Creation.

Conceptually:

```text
Source Prompt
     +
User Values
     ↓
Customized Prompt
```

---

# 32. Customization Preview

**Classification:** MVP Core

The User SHOULD be able to see the resulting customized Prompt before using it externally.

---

# 33. Customization State

The MVP requires enough temporary state to preserve the source relationship while the User moves through the creative journey.

The exact persistence duration remains a Technical decision.

---

# 34. External AI Generation

**Classification:** MVP Core Strategy

Mosaic does NOT need to generate AI video directly during the MVP.

The flow is:

```text
Mosaic
  ↓
Customized Prompt
  ↓
External AI Video Tool
  ↓
Generated Video
  ↓
Return to Mosaic
  ↓
Publish
```

This substantially reduces initial provider integration complexity.

---

# 35. Direct AI Provider Integration

**Classification:** Post-MVP / Future

Direct generation through providers such as AI video APIs is not required for MVP viability.

The architecture remains provider-independent so integrations can be added later.

---

# 36. Generation Context

**Classification:** MVP Core

A Creation SHOULD allow the creator to identify generation context where known.

Initial useful context includes:

* Provider;
* Model;
* Model Version where relevant;
* selected generation parameters.

The system MUST permit unknown or unsupported tools to remain representable.

---

# 37. Provider Registry

**Classification:** MVP Supporting

Mosaic MAY maintain a lightweight list of known AI Providers and Models to improve consistency.

Users should not become unable to publish merely because a tool is absent from that registry.

---

# 38. Lineage

**Classification:** MVP Core

Lineage is not a future enhancement.

It is part of Mosaic's MVP identity.

The MVP MUST preserve:

```text
Direct Parent
Authorship
Derivation
Historical Chain
```

---

# 39. Lineage Tree

**Classification:** MVP Core, Basic

A Creation page SHOULD expose enough Lineage information to understand:

* whether the Creation has a parent;
* what that parent is;
* whether it has direct descendants.

A sophisticated infinite interactive graph is not required.

---

# 40. Lineage Navigation

Users SHOULD be able to navigate:

```text
Parent
  ↕
Current Creation
  ↓
Direct Derived Creations
```

Full advanced tree visualization can evolve later.

---

# 41. Lineage Origin

The system SHOULD be capable of identifying the root/origin through ancestry.

Origin MUST NOT replace the direct parent relationship.

---

# 42. Multiple Direct Parents

🟡 **Open Product Decision**

The MVP requires this decision before Lineage persistence is finalized.

The current architecture intentionally does not silently choose between:

```text
One direct parent
```

and:

```text
Multiple direct parents
```

---

# 43. Lineage Tombstones

**Classification:** MVP Supporting

If an intermediate Creation becomes unavailable, Lineage structure MUST remain truthful.

Example:

```text
A
↓
[Unavailable Creation]
↓
C
```

The exact public information displayed in the placeholder remains open.

---

# 44. Discovery

**Classification:** MVP Core

Mosaic requires a useful way to discover public Creations from the first release.

---

# 45. Home Discovery

**Classification:** MVP Core

The initial Home experience SHOULD expose public Creations.

The MVP does NOT require an advanced machine-learning recommendation engine.

---

# 46. Initial Feed

A simple initial discovery strategy may combine signals such as:

```text
Recent
+
Community Activity
+
Basic Relevance
```

Exact ranking remains an open Product decision.

---

# 47. Search

**Classification:** MVP Core

Users SHOULD be able to search public Creations.

Initial Search can use the relational/search capabilities selected during implementation.

Dedicated Search infrastructure is not required unless measurements justify it.

---

# 48. Initial Search Scope

Initial Search SHOULD prioritize useful fields such as:

* Creation title;
* description;
* Prompt;
* creator username;
* tags.

Exact field weighting remains open.

---

# 49. Advanced Semantic Search

**Classification:** Post-MVP

Embeddings, vector Search, and AI semantic retrieval are not required initially.

---

# 50. Categories

**Classification:** MVP Supporting

A small controlled category system MAY help initial discovery.

Exact category governance remains open.

---

# 51. Tags

**Classification:** MVP Supporting

Creations SHOULD support lightweight tags if implementation cost remains reasonable.

Advanced tag governance is not required.

---

# 52. Trending

**Classification:** Post-MVP

A sophisticated Trending system is not required for the first viable release.

Basic popular/recent sorting may provide sufficient initial discovery.

---

# 53. Personalized Recommendations

**Classification:** Post-MVP

Advanced personalized recommendations are explicitly outside MVP scope.

---

# 54. Following

**Classification:** MVP Core

Users SHOULD be able to Follow other Users.

Following supports the community layer without requiring a sophisticated social network.

---

# 55. Following Feed

**Classification:** MVP Supporting

A dedicated Following view is useful but may follow the primary discovery experience during implementation.

Its ranking can initially be chronological.

---

# 56. Likes

**Classification:** MVP Core

Authenticated Users SHOULD be able to Like public Creations.

One active Like per User/Creation relationship applies.

---

# 57. Self-Like

🟡 **Open Product Decision**

The MVP must decide whether creators may Like their own Creations before the behavior is implemented.

---

# 58. Comments

**Classification:** MVP Core

Authenticated Users SHOULD be able to Comment on public Creations.

---

# 59. Replies

**Classification:** MVP Supporting

Basic replies SHOULD be supported if they can be delivered without introducing excessive thread complexity.

The maximum reply depth remains open.

---

# 60. Comment Editing

Users SHOULD be able to edit their own Comments.

Advanced edit history is not required initially.

---

# 61. Comment Creator Controls

🟡 **Open Product Decision**

The exact controls available to a Creation creator over Comments remain unresolved.

Potential behavior includes:

* report;
* hide;
* delete under defined conditions.

This must be resolved before implementation.

---

# 62. Internal Reposting

**Classification:** Post-MVP

Mosaic does not require a separate social repost mechanism initially.

Remix/derivation remains distinct and central.

---

# 63. External Sharing

**Classification:** MVP Supporting

Users SHOULD be able to share a public Creation through a stable public link.

Native platform-specific sharing integrations are optional.

---

# 64. Save

**Classification:** MVP Core

Authenticated Users SHOULD be able to privately Save Creations for later.

Save remains distinct from Like.

---

# 65. Collections

**Classification:** MVP Core, Basic

Users SHOULD be able to organize saved Creations into private Collections.

Initial capabilities:

* create Collection;
* rename Collection;
* add Creation;
* remove Creation;
* delete Collection.

---

# 66. Save and Collection Relationship

🟡 **Open Product Decision**

Before implementation, Mosaic must decide whether:

```text
Adding to Collection automatically implies Save
```

and what happens to Collection membership when a Creation is unsaved.

---

# 67. Public Collections

**Classification:** Post-MVP

Collections are private by default.

Public and collaborative Collections are deferred.

---

# 68. Collection Covers

**Classification:** Post-MVP

Custom covers and advanced Collection presentation are unnecessary initially.

---

# 69. Notifications

**Classification:** MVP Supporting

Mosaic SHOULD provide an in-app Notification system for important events.

---

# 70. Initial Notification Events

The MVP SHOULD prioritize:

* Comment on User's Creation;
* Reply to User's Comment;
* direct Remix/derivation of User's Creation;
* important moderation outcome;
* important Account/security event.

---

# 71. Follow Notifications

🟡 **Open Product Decision**

Whether a new Follow generates an individual Notification remains open.

---

# 72. Like Notifications

Like notifications MAY be supported.

If activity becomes high-volume, grouping SHOULD be possible.

---

# 73. Save Notifications

The MVP SHOULD NOT require individual Save notifications.

Save identity is private by default.

---

# 74. Notification Channels

The core MVP Notification surface is:

> **In-app notifications.**

Email should primarily support:

* authentication;
* Account recovery;
* critical Account/security communication

before broad social email notifications are introduced.

---

# 75. Push Notifications

**Classification:** Post-MVP / Future

Push notifications are not required initially.

---

# 76. Notification Preferences

**Classification:** Post-MVP unless required by selected email behavior

Advanced per-event notification preferences are not necessary for the initial in-app system.

---

# 77. Blocking

**Classification:** MVP Supporting / Safety Requirement

Users SHOULD be able to Block another User.

The exact interaction visibility matrix remains an open Product decision and MUST be resolved before implementation.

---

# 78. Reporting

**Classification:** MVP Supporting / Safety Requirement

Authenticated Users MUST be able to report supported content and behavior.

Reporting is a signal, not an automatic enforcement decision.

---

# 79. Initial Report Targets

The MVP should at minimum support reporting:

* Creations;
* Comments;
* Profiles/Users where appropriate.

Additional targets can be added as Product surfaces expand.

---

# 80. Report Categories

🟡 **Open Product/Policy Decision**

The initial report taxonomy must be defined before public launch.

It should remain manageable rather than attempting to model every possible violation.

---

# 81. AI-Assisted Moderation

**Classification:** MVP Supporting, but implementation depth may be staged

The architecture supports AI-assisted moderation triage.

However, the MVP does NOT need a highly autonomous moderation platform.

Initial moderation may combine:

```text
Basic automated signals
        +
AI-assisted analysis where useful
        +
Human review
```

---

# 82. Human Moderation

Human review MUST remain possible for:

* ambiguity;
* Appeals;
* attribution disputes;
* severe enforcement;
* low-confidence automated analysis.

---

# 83. Moderation Interface

**Classification:** MVP Supporting

Authorized moderators require a minimal internal interface or controlled workflow for:

* viewing Reports;
* reviewing target content;
* recording decisions;
* applying permitted actions.

It does not require a polished enterprise moderation suite.

---

# 84. Enforcement

The MVP needs a minimal enforceable action model.

Potential initial actions include:

```text
No Action
Content Removal
Temporary Account Restriction / Suspension
Permanent Ban
```

🟡 The final initial enforcement ladder remains a Product/Policy decision.

---

# 85. Appeals

**Classification:** MVP Supporting

Meaningful moderation actions SHOULD support an Appeal path.

The initial Appeal interface can remain simple.

---

# 86. Moderation Auditability

Moderation decisions MUST be sufficiently traceable for:

* review;
* Appeals;
* restoration;
* accountability.

---

# 87. Administration

**Classification:** MVP Supporting

Mosaic requires a minimal administrative capability before public operation.

---

# 88. Initial Administrative Capabilities

The MVP administration surface should support enough capability to manage:

* Account states;
* Moderator permissions;
* known Providers/Models where implemented;
* Categories where implemented;
* serious moderation escalations;
* controlled Lineage corrections if required.

---

# 89. Administrative Interface

The initial Administration interface may prioritize functionality over visual sophistication.

Security and auditability matter more than visual polish.

---

# 90. Advanced Administration

**Classification:** Post-MVP

The MVP does not require:

* advanced operational dashboards;
* complex bulk operations;
* support impersonation;
* sophisticated editorial promotion;
* enterprise separation-of-duties workflows.

---

# 91. Creator Analytics

**Classification:** Post-MVP

Detailed creator analytics are not necessary to prove the core Product.

Basic visible engagement counts may be sufficient.

---

# 92. View Counts

🟡 **Open Product Decision**

The exact definition of a View remains unresolved.

MVP should not expose a misleading View count until that definition exists.

---

# 93. Engagement Counts

The MVP MAY display basic counts such as:

* Likes;
* Comments;
* direct derived Creations.

Exact metric visibility remains a Product decision.

---

# 94. Remix Count

Mosaic must distinguish if necessary between:

```text
Direct descendants
```

and:

```text
All descendants
```

before labeling a single number ambiguously as "Remixes."

---

# 95. Private Accounts

**Classification:** Post-MVP unless Product decision changes

The initial Mosaic model favors public Profiles and public published Creations.

Private Account behavior remains an open broader Product decision but is not required to prove the initial core loop.

---

# 96. Private Creations

The MVP does not require a complete private-publication social model.

Drafts remain private.

Published Creations are public unless Product scope changes before implementation.

---

# 97. Username Changes

**Classification:** Post-MVP unless inexpensive and safely defined

Username changes are not required to prove MVP viability.

The data model should not make future changes impossible.

---

# 98. Account Deactivation

**Classification:** MVP Supporting

Users SHOULD have a controlled way to stop using their Account.

Exact Deactivation vs Deletion workflow will follow privacy and Product requirements.

---

# 99. Account Deletion

**Classification:** MVP Supporting / Privacy Requirement

Mosaic MUST support an appropriate Account deletion path before mature public operation.

Deletion behavior must preserve legitimate historical creative structure while respecting privacy obligations.

---

# 100. Deleted User Representation

Historical Creations may use a neutral representation such as:

```text
Deleted User
```

when identity must no longer remain available.

Exact retained data depends on privacy requirements.

---

# 101. Search Engine Optimization

**Classification:** MVP Supporting

Public Creation and Profile pages SHOULD be structurally suitable for basic web discovery.

Advanced SEO optimization is not the primary MVP goal.

---

# 102. Accessibility

**Classification:** MVP Requirement

Accessibility is not postponed as a future redesign.

Core MVP flows SHOULD be:

* keyboard usable;
* semantically structured;
* understandable without color alone;
* compatible with accessible labels and focus behavior.

Exact formal conformance target remains open.

---

# 103. Responsive Web

**Classification:** MVP Requirement

The MVP MUST provide a usable responsive web experience.

A native mobile application is not required.

---

# 104. Native Mobile Application

**Classification:** Future

Mosaic begins as a web platform.

Native iOS/Android applications are outside MVP scope.

---

# 105. Internationalization

**Classification:** Post-MVP unless launch strategy requires otherwise

The architecture SHOULD avoid making localization unnecessarily difficult.

A complete multi-language Product is not required initially.

---

# 106. Public API

**Classification:** Future

The MVP does not expose a general third-party developer API.

Initial APIs exist to support Mosaic's own Product.

---

# 107. Monetization

**Classification:** Future

The MVP does not require:

* subscriptions;
* creator payments;
* marketplace;
* paid Prompts;
* advertising;
* premium plans.

The initial objective is Product validation.

---

# 108. Reputation System

**Classification:** Post-MVP / Future

Creator reputation, levels, badges, and ranking systems are not required.

---

# 109. Advanced Attribution Detection

**Classification:** Future

Automatic similarity analysis to detect copied Prompts or missing Lineage relationships is not required initially.

Manual reporting and moderation can cover initial disputes.

---

# 110. Collaborative Creation

**Classification:** Future

Multi-author Creation workflows are outside MVP scope.

---

# 111. Multiple Media Assets

**Classification:** Post-MVP

The architecture can support multiple Media assets.

The initial publication UI may focus on one primary video.

---

# 112. Advanced Prompt Editor

**Classification:** Post-MVP

The MVP does not require:

* node-based Prompt editing;
* visual Prompt graphs;
* AI Prompt rewriting;
* collaborative Prompt editing;
* complex Prompt templates.

---

# 113. AI-Assisted Customization

**Classification:** Future

Mosaic may eventually help Users modify Prompts using AI.

This is not required for MVP validation.

---

# 114. Direct Generation

**Classification:** Future Product Expansion

A future Mosaic experience may become:

```text
Discover
   ↓
Customize
   ↓
Generate inside Mosaic
   ↓
Publish
```

The MVP intentionally validates the Product without requiring this infrastructure.

---

# 115. MVP Discovery Philosophy

The first release should answer:

> **Can Users find interesting Creations?**

not:

> **Can Mosaic build the world's most sophisticated recommendation engine?**

---

# 116. MVP Social Philosophy

The first release should answer:

> **Can Users interact around Creations and creators?**

not:

> **Can Mosaic reproduce every social-network feature?**

---

# 117. MVP Moderation Philosophy

The first release should answer:

> **Can Mosaic receive, review, act on, and audit safety problems?**

not:

> **Can Mosaic fully automate Trust & Safety?**

---

# 118. MVP Infrastructure Philosophy

The first release should answer:

> **Can Mosaic operate reliably for real Users?**

not:

> **Can Mosaic already serve hundreds of millions of Users?**

---

# 119. MVP Architecture Requirement

MVP simplification MUST NOT destroy foundational Product invariants.

The MVP may simplify:

```text
Recommendation sophistication
UI complexity
Moderation automation
Analytics
Streaming
Notification channels
```

It MUST NOT simplify away:

```text
Authorship
Lineage
Authorization
Privacy
Creation identity
Historical integrity
Safety controls
```

---

# 120. MVP Technical Baseline

The initial implementation follows the established architecture:

```text
Responsive Web Application
        ↓
REST-Oriented HTTP API
        ↓
Modular Monolith
        ↓
Relational Database
        +
Object Storage
        +
Background Processing
```

with derived Search and observability capabilities appropriate to initial scale.

---

# 121. Technology Selection

🟡 **Open Delivery Decision**

The exact implementation stack remains to be selected.

This includes:

* web framework;
* runtime;
* relational database;
* ORM/query layer;
* authentication implementation;
* object-storage provider;
* background-job infrastructure;
* hosting;
* observability tooling.

These decisions should now be made against the MVP requirements rather than abstract preference.

---

# 122. MVP Does Not Mean Disposable

The MVP codebase is intended to become Mosaic.

The project should not intentionally build a throwaway prototype that violates the documented architecture.

---

# 123. MVP Does Not Mean Overengineering

At the same time, the MVP does not need infrastructure for hypothetical scale.

Mosaic continues to follow:

> **Build for evolution, not speculation.**

---

# 124. MVP Data Integrity

The MVP MUST protect important constraints such as:

* unique identity;
* ownership;
* relationship uniqueness;
* Lineage integrity;
* acyclic Lineage;
* authorization;
* referential integrity.

---

# 125. MVP Security

Before public launch, Mosaic requires at minimum:

```text
Secure Authentication
Authorization
Object-Level Access Control
Secure Sessions
Input Validation
Upload Validation
Secret Management
HTTPS
Basic Abuse Protection
Privileged Access Protection
```

---

# 126. MVP Observability

Before public launch, Mosaic SHOULD have enough observability to diagnose:

* application errors;
* failed requests;
* database failures;
* worker failures;
* Media-processing failures;
* deployment regressions.

---

# 127. MVP Testing

Before public launch, Mosaic requires automated coverage of critical behavior.

Priority includes:

```text
Authentication
Authorization
Creation Publication
Lineage
Prompt Customization
Media
Relationship Integrity
Moderation
Administration
```

---

# 128. MVP Deployment

The MVP SHOULD use:

* repeatable deployment;
* separated production configuration;
* secure secret handling;
* controlled migrations;
* automated backups;
* deployment observability.

---

# 129. MVP User Experience

The initial experience should prioritize clarity around:

```text
What is this Creation?
What Prompt produced it?
What can I customize?
How do I use it?
Where did this Creation come from?
How can I publish my result?
```

These questions are more important to the MVP than extensive visual customization.

---

# 130. Visual Design

The MVP requires a coherent, usable interface.

It does NOT require Mosaic's final visual identity or an elaborate custom design system before Product behavior is validated.

---

# 131. Initial Product Surfaces

The MVP will likely require surfaces equivalent to:

```text
Home / Discovery
Search
Creation Detail
Creation Publication
Prompt Customization
Profile
Saved Content
Collections
Notifications
Authentication
Settings
Moderation
Administration
```

Exact route structure belongs to implementation.

---

# 132. Core Product Dependencies

The highest-priority implementation path is:

```text
Identity
   ↓
Creation
   ↓
Prompt
   ↓
Media
   ↓
Publication
   ↓
Lineage
   ↓
Customization
   ↓
Discovery
```

Social and operational systems build around this foundation.

---

# 133. MVP Priority Model

### P0 — Product Cannot Work Without It

```text
Authentication
Profiles
Creation
Prompt
Media Upload
Publication
Customization
Lineage
Basic Discovery
Authorization
```

### P1 — Required for a Viable Public Community

```text
Search
Follow
Like
Comment
Save
Basic Collections
Notifications
Reporting
Blocking
Moderation
Administration
Accessibility
Observability
Backups
```

### P2 — Useful After Core Stability

```text
Advanced Discovery
Trending
Advanced Notification Preferences
Advanced Profile Features
Public Collections
Creator Analytics
Advanced Media Delivery
```

### P3 — Future Expansion

```text
Direct AI Generation
Marketplace
Monetization
Native Apps
Public Developer API
Advanced AI Recommendations
AI Customization Assistant
Collaborative Creation
Advanced Attribution Detection
```

---

# 134. MVP Scope Guard

A feature SHOULD NOT enter the MVP merely because:

* it would be interesting;
* another social platform has it;
* it may eventually be useful;
* the architecture can support it;
* implementation seems easy.

It should enter when it materially supports:

```text
Core Creative Loop
        OR
Public Product Viability
        OR
Safety / Security / Privacy
        OR
Operational Reliability
```

---

# 135. MVP Open Decisions

The following decisions materially affect MVP implementation and should be resolved before or during Development Planning:

| Decision                               | Status  |
| -------------------------------------- | ------- |
| Exact Edit vs New Creation boundary    | 🟡 Open |
| One vs multiple direct Lineage parents | 🟡 Open |
| Self-derivation UI terminology         | 🟡 Open |
| Tombstone public information           | 🟡 Open |
| Initial Feed ranking                   | 🟡 Open |
| Category governance                    | 🟡 Open |
| Tag governance                         | 🟡 Open |
| Self-Like                              | 🟡 Open |
| Comment reply depth                    | 🟡 Open |
| Creator Comment controls               | 🟡 Open |
| Save ↔ Collection relationship         | 🟡 Open |
| Follow Notifications                   | 🟡 Open |
| Blocking interaction matrix            | 🟡 Open |
| Initial Report taxonomy                | 🟡 Open |
| Initial enforcement ladder             | 🟡 Open |
| View definition                        | 🟡 Open |
| Engagement metric visibility           | 🟡 Open |
| Account deletion details               | 🟡 Open |
| Technology stack                       | 🟡 Open |
| Hosting                                | 🟡 Open |
| Production region                      | 🟡 Open |
| CI/CD workflow                         | 🟡 Open |

Material implementation and launch-gating decisions are tracked in Mosaic's internal planning register.

---

# 136. MVP Exit Criteria

Mosaic may be considered ready to move from MVP implementation toward an initial public release when:

### Core Product

* Users can register and authenticate.
* Public Creations can be discovered.
* Users can publish Original Creations.
* Creations contain Media and Prompt information.
* Users can customize supported Prompt elements.
* Users can publish derived Creations.
* Lineage remains correct.
* Self-derivation works.

### Community

* Users can Follow.
* Users can Like.
* Users can Comment.
* Users can Save.
* Basic Collections work.
* Important Notifications work.

### Safety

* Users can Report.
* Users can Block.
* Moderators can review relevant Reports.
* Appropriate enforcement can be applied.
* Appeals can be handled for meaningful enforcement.
* Privileged actions are protected and auditable.

### Technical

* Authorization protects private resources.
* Media upload and processing are reliable enough for public use.
* Database migrations are controlled.
* Backups exist.
* Critical automated tests pass.
* Production failures are observable.
* Deployment is repeatable.

### Product Integrity

* Lineage cannot silently flatten.
* Source Creations are not modified by customization.
* Material creative evolution does not overwrite historical Creations.
* Removal does not automatically destroy descendants.
* Independent social relationships remain independent.

---

# 137. MVP Exclusions Summary

The following are explicitly not required for initial MVP completion:

```text
Direct AI video generation
Advanced recommendation engine
Semantic/vector Search
Sophisticated Trending
Native mobile apps
Public developer API
Marketplace
Subscriptions
Creator payments
Advanced analytics
Creator reputation system
Public collaborative Collections
Complex repost system
Advanced Prompt editor
AI Prompt assistant
Multi-author Creations
Advanced attribution detection
Multi-region architecture
Enterprise moderation infrastructure
Enterprise administration infrastructure
```

Their exclusion does not prevent future implementation.

---

# 138. Product Evolution After MVP

Mosaic should evolve from evidence.

Conceptually:

```text
MVP
 ↓
Observe Users
 ↓
Measure Friction
 ↓
Identify Valuable Improvements
 ↓
Prioritize
 ↓
Build
 ↓
Measure Again
```

The Roadmap should not become a promise to implement every imaginable future capability.

---

# 139. MVP Decision Summary

## MVP-ADR-001 — Core Creative Loop Defines MVP

**Status:** ✅ Decided

The MVP is centered on:

```text
Discover → Understand → Customize → Generate → Publish → Derive → Discover Again
```

---

## MVP-ADR-002 — External Generation First

**Status:** ✅ Decided

Initial AI Media generation happens outside Mosaic.

Direct AI provider generation is deferred.

---

## MVP-ADR-003 — Lineage Is MVP Core

**Status:** ✅ Decided

Creative Lineage is a foundational MVP capability rather than a later social enhancement.

---

## MVP-ADR-004 — Video First

**Status:** ✅ Decided

The initial Product focuses on AI-generated video while preserving a Media model capable of future expansion.

---

## MVP-ADR-005 — Public Discovery First

**Status:** ✅ Decided

Public published Creations are discoverable without requiring authentication.

---

## MVP-ADR-006 — Web First

**Status:** ✅ Decided

The MVP is a responsive web Product.

Native applications are deferred.

---

## MVP-ADR-007 — Basic Social Layer Included

**Status:** ✅ Decided

Follow, Like, Comment, Save, and basic Collections are part of the initial community experience.

---

## MVP-ADR-008 — Safety Is Not Post-MVP

**Status:** ✅ Decided

Reporting, Blocking, basic Moderation, and Administration are required for viable public operation.

---

## MVP-ADR-009 — Advanced Recommendation Systems Deferred

**Status:** ✅ Decided

Initial Discovery will not depend on advanced machine-learning recommendation infrastructure.

---

## MVP-ADR-010 — No Monetization Requirement

**Status:** ✅ Decided

Monetization is not required to validate the initial Product.

---

## MVP-ADR-011 — Architecture Survives MVP

**Status:** ✅ Decided

MVP implementation will use Mosaic's intended architecture rather than a deliberately disposable prototype.

---

## MVP-ADR-012 — Scope Follows Product Value

**Status:** ✅ Decided

Features enter MVP based on contribution to the creative loop, public viability, safety, privacy, security, or operational reliability rather than feature count.

---

# 140. MVP Summary

The Mosaic MVP can be summarized as:

```text
PUBLIC DISCOVERY
      ↓
CREATION
      ↓
PROMPT
      ↓
CUSTOMIZATION
      ↓
EXTERNAL GENERATION
      ↓
MEDIA UPLOAD
      ↓
DERIVED PUBLICATION
      ↓
LINEAGE
      ↓
COMMUNITY DISCOVERY
```

supported by:

```text
Identity
Profiles
Search
Social Interaction
Saves & Collections
Notifications
Moderation
Administration
Security
Testing
Observability
Deployment
```

The MVP intentionally excludes Product complexity that does not need to exist in order to validate Mosaic's central idea.

The central principle is:

> **Mosaic's MVP should be small enough to build, complete enough to use, and structurally correct enough to become the real Product.**

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
* [Deployment](../03-technical/deployment.md)

## Delivery

* [Roadmap](./roadmap.md)
* [Glossary](./glossary.md)

---

**Previous:** [← Deployment](../03-technical/deployment.md) · [Documentation Home](../README.md) · **Next:** [Product Roadmap →](./roadmap.md)
