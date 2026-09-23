# Development Phases

> **Section:** Delivery
> **Status:** Active Delivery Specification
> **Audience:** Product, Engineering, Design & Project Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the recommended implementation sequence for Mosaic.

The objective is not to assign speculative calendar estimates.

Instead, it defines:

* implementation dependencies;
* development milestones;
* phase objectives;
* entry conditions;
* exit criteria;
* Product capabilities unlocked by each phase.

Mosaic follows the principle:

> **Build foundations in the order required to unlock complete Product behavior.**

---

# 1. Development Philosophy

Mosaic should not be developed as a random collection of independent screens.

The implementation should progressively establish:

```text id="phase001"
Foundation
    ↓
Identity
    ↓
Creation Core
    ↓
Media + Prompt
    ↓
Lineage + Customization
    ↓
Discovery
    ↓
Community
    ↓
Safety
    ↓
Production Readiness
```

Each phase should leave the application in a more coherent state.

---

# 2. Phases Are Not Calendar Estimates

A Phase represents a logical development milestone.

It does NOT automatically mean:

```text id="phase002"
One week
One sprint
One month
```

Actual duration depends on:

* implementation stack;
* contributor count;
* experience;
* design complexity;
* discovered technical constraints;
* testing;
* revisions.

Calendar planning should be added only when enough implementation evidence exists.

---

# 3. Phases Are Not Hard Silos

Some work naturally overlaps.

For example:

```text id="phase003"
Security
Testing
Observability
Accessibility
```

should not wait until the end.

They develop alongside Product functionality.

The phases describe primary focus and dependency order.

---

# 4. Vertical Delivery

Where practical, Mosaic should prefer completing usable vertical capabilities.

For example:

```text id="phase004"
Creation UI
   ↓
API
   ↓
Domain
   ↓
Database
   ↓
Tests
```

rather than implementing every database table first, then every API, then every screen.

---

# 5. Continuous Concerns

The following concerns apply throughout development:

```text id="phase005"
Testing
Security
Authorization
Accessibility
Observability
Documentation
Data Integrity
```

They are not isolated final phases.

---

# 6. Phase Model

Mosaic's initial implementation is organized into:

```text id="phase006"
Phase 0 — Technical Foundation
Phase 1 — Identity & Access
Phase 2 — Creation Foundation
Phase 3 — Media & Publication
Phase 4 — Lineage & Customization
Phase 5 — Discovery & Search
Phase 6 — Community
Phase 7 — Safety & Governance
Phase 8 — Production Readiness
Phase 9 — MVP Release & Validation
```

---

# Phase 0 — Technical Foundation

## 7. Objective

Create the minimum technical environment required to build Mosaic consistently.

This phase establishes the project skeleton without attempting to implement the Product prematurely.

---

# 8. Decisions Required Before Phase 0

The implementation cannot meaningfully begin until several currently open technical decisions are resolved.

At minimum:

```text id="phase007"
Web Framework / Runtime
Relational Database
Database Access Layer
Authentication Direction / Library
Repository Structure
Development Environment
Testing Foundation
```

Hosting does not necessarily need to be completely finalized before local development begins.

---

# 9. Phase 0 Scope

Phase 0 should establish:

* application project;
* repository structure;
* dependency management;
* environment configuration;
* database connection;
* migration system;
* testing framework;
* formatting/linting conventions where selected;
* basic CI;
* local development workflow.

---

# 10. Project Structure

The implementation should reflect the Modular Monolith architecture.

Conceptually:

```text id="phase008"
Application
│
├── Identity
├── Profiles
├── Creations
├── Prompts
├── Lineage
├── Media
├── Discovery
├── Social
├── Collections
├── Notifications
├── Moderation
└── Administration
```

Exact filesystem organization depends on the selected stack.

---

# 11. Architecture Enforcement

Phase 0 should establish conventions that discourage uncontrolled coupling between domains.

This does not require complicated framework machinery.

Clear module boundaries and dependency conventions may be sufficient initially.

---

# 12. Database Foundation

Phase 0 should establish:

```text id="phase009"
Database
   ↓
Migration System
   ↓
Application Access
   ↓
Test Database Strategy
```

without creating every future Mosaic table immediately.

---

# 13. Initial CI

Initial CI SHOULD at least be capable of validating:

```text id="phase010"
Install
   ↓
Static checks where applicable
   ↓
Tests
   ↓
Build
```

---

# 14. Initial Observability

Development logging and error visibility should exist from the beginning.

A complete production observability stack is not required yet.

---

# 15. Phase 0 Exit Criteria

Phase 0 is complete when:

* a contributor can obtain the repository;
* configure a local environment;
* start the application;
* connect to the development database;
* execute migrations;
* run automated tests;
* build the application;
* CI can validate the project.

---

# Phase 1 — Identity & Access

## 16. Objective

Establish Mosaic's User identity and trusted access model.

---

# 17. Phase 1 Scope

Primary capabilities:

```text id="phase011"
Registration
Authentication
Session
Logout
Profile
Authorization Foundation
Account State
```

---

# 18. User Foundation

Implement the technical representation of:

* User;
* Account;
* Profile.

The exact physical split should follow the final Data Model decision.

---

# 19. Registration

Users should be able to create an Account with:

```text id="phase012"
Email
Username
Password
```

Registration behavior must preserve the distinction between:

```text id="phase013"
Account successfully created
```

and:

```text id="phase014"
Authenticated session established
```

if the final authentication flow keeps these as separate operations.

---

# 20. Authentication

Implement:

* credential verification;
* authenticated state;
* logout;
* session invalidation;
* protected routes/operations.

---

# 21. Password Security

Passwords must use the final secure password-storage implementation selected for the stack.

Plaintext or reversible password storage is never acceptable.

---

# 22. Profile Foundation

Users should be able to establish and view basic Profile information.

Initial fields may include:

```text id="phase015"
Username
Display Name
Avatar
Biography
```

---

# 23. Public Profile

A public Profile route should exist even before the User has published Creations.

---

# 24. Authorization Foundation

Create reusable server-side authorization mechanisms.

The system should already distinguish:

```text id="phase016"
Anonymous
Authenticated User
Resource Owner
Moderator
Administrator
```

even if privileged interfaces arrive later.

---

# 25. Account State

The technical model should support documented states such as:

```text id="phase017"
ACTIVE
DEACTIVATED
SUSPENDED
BANNED
DELETED
```

Not every management workflow needs to exist yet.

---

# 26. Phase 1 Testing

Priority tests include:

* registration validation;
* username uniqueness;
* authentication;
* invalid credentials;
* logout;
* protected access;
* object-level authorization foundation;
* private Account fields not exposed publicly.

---

# 27. Phase 1 Exit Criteria

Phase 1 is complete when:

```text id="phase018"
Visitor
  ↓
Register
  ↓
Authenticate
  ↓
Use protected Mosaic capabilities
  ↓
View public Profile
  ↓
Logout
```

works reliably.

---

# Phase 2 — Creation Foundation

## 28. Objective

Establish Mosaic's central domain artifact before introducing its more complex Media and Lineage behavior.

---

# 29. Phase 2 Scope

Primary capabilities:

```text id="phase019"
Creation Identity
Draft
Prompt
Generation Context
Creation Editing Foundation
Ownership
Validation
```

---

# 30. Creation Entity

Implement stable Creation identity.

A Creation should not be modeled as merely:

```text id="phase020"
Video row
```

The entity must remain capable of associating:

```text id="phase021"
Prompt
Media
Generation Context
Lineage
Discovery Metadata
```

---

# 31. Draft Creation

Authenticated Users should be able to create and edit private Drafts.

Drafts establish the authoring workflow before public publication.

---

# 32. Prompt Foundation

A Draft should support Prompt content.

Plain text must work without requiring structured Prompt components.

---

# 33. Customizable Element Model

The data model for creator-defined customizable Prompt areas should be introduced during this phase or prepared for Phase 4.

The implementation must avoid requiring every Prompt to use variables.

---

# 34. Generation Context

Drafts should be able to record generation context such as:

```text id="phase022"
Provider
Model
Model Version
Parameters
```

where known.

Unknown tools must remain representable.

---

# 35. Provider / Model Registry

If the MVP uses a known Provider/Model registry, its initial data model may be introduced here.

The registry must not prevent publication with an unknown tool.

---

# 36. Creation Ownership

Only authorized creators may modify their Drafts.

Identifier manipulation must not permit cross-User Draft access.

---

# 37. Edit vs Evolution

Before published Creation editing is finalized, the Product decision defining:

```text id="phase023"
Non-material edit
vs
Material creative evolution
```

must be resolved.

The system should not create internal creative versioning.

---

# 38. Phase 2 Testing

Priority tests include:

* Draft ownership;
* Draft privacy;
* Prompt persistence;
* flexible Prompt structure;
* generation context;
* unknown Provider/Model;
* unauthorized Draft access;
* Creation identity.

---

# 39. Phase 2 Exit Criteria

Phase 2 is complete when an authenticated User can:

```text id="phase024"
Create Draft
    ↓
Write Prompt
    ↓
Add basic Creation information
    ↓
Record Generation Context
    ↓
Return to Draft
```

with ownership and privacy preserved.

---

# Phase 3 — Media & Publication

## 40. Objective

Turn private Creation Drafts into real public Mosaic Creations.

---

# 41. Phase 3 Scope

Primary capabilities:

```text id="phase025"
Media Upload
Media Validation
Media Processing
Publication
Public Creation Detail
Creation Availability
```

---

# 42. Object Storage

Integrate the selected object-storage infrastructure.

Media bytes should remain separate from the relational database.

---

# 43. Upload Authorization

Implement authorized upload behavior.

A User must not be able to attach arbitrary or another User's storage objects to their Creation.

---

# 44. Upload Workflow

Conceptually:

```text id="phase026"
Draft
  ↓
Request Upload
  ↓
Authorized Storage Upload
  ↓
Confirm Upload
  ↓
Validate / Process
  ↓
Media Ready
```

---

# 45. Media Processing

Introduce background processing infrastructure where required.

Initial processing may include:

* metadata extraction;
* validation;
* poster/thumbnail generation;
* normalization if necessary.

---

# 46. Processing Failure

The UI must represent processing failure rather than leaving a Creation permanently in an unexplained state.

---

# 47. Publication

Once required Creation state is valid, the creator can publish.

Publication establishes public historical state.

---

# 48. Original Publication

At this stage, Mosaic must support publishing:

> **Original Creations without a Mosaic parent.**

Derived publication is introduced in the next phase.

---

# 49. Public Creation Page

A public Creation page should expose:

* Media;
* Prompt;
* creator;
* description/basic metadata;
* Generation Context where available.

---

# 50. Public URL

Published Creations should have stable public URLs suitable for sharing.

---

# 51. Basic SEO Structure

Public pages should include sufficient semantic metadata for ordinary web indexing where appropriate.

Advanced SEO remains unnecessary.

---

# 52. Publication Transaction

The authoritative publication transition must be reliable.

A User should not receive a successful publication response while required authoritative state is incomplete.

---

# 53. Phase 3 Testing

Priority tests include:

* upload authorization;
* Media ownership;
* invalid Media;
* processing state;
* processing failure;
* publication requirements;
* public availability;
* Draft remains private before publication.

---

# 54. Phase 3 Exit Criteria

Phase 3 is complete when:

```text id="phase027"
User
 ↓
Creates Draft
 ↓
Adds Prompt
 ↓
Uploads Video
 ↓
Media becomes usable
 ↓
Publishes
 ↓
Anonymous Visitor opens Creation
```

works end-to-end.

At this point, Mosaic becomes a basic publishing platform.

It is not yet fully Mosaic.

---

# Phase 4 — Lineage & Customization

## 55. Objective

Implement Mosaic's primary Product differentiator.

This is the phase where Mosaic stops being merely an AI Prompt publishing platform.

---

# 56. Phase 4 Scope

Primary capabilities:

```text id="phase028"
Prompt Variables
Customization
Derived Publication
Direct Parent
Ancestry
Self-Derivation
Basic Lineage Navigation
Tombstones
```

---

# 57. Required Product Decisions

Before Lineage persistence is finalized, resolve:

* one vs multiple direct parents;
* self-derivation terminology;
* tombstone public information;
* Lineage correction policy sufficiently for initial architecture.

---

# 58. Lineage Relationship

Implement explicit Creation derivation relationships.

The model must preserve direct parentage.

---

# 59. Derived Publication

Publishing a derived Creation must create the required Lineage relationship as part of the authoritative operation.

Conceptually:

```text id="phase029"
Publish B
   +
Parent = A
   ↓
Authoritative Success
```

---

# 60. Lineage Integrity

The implementation must prevent:

```text id="phase030"
Self-parent
Cycles
Unauthorized relationship manipulation
Silent flattening
```

---

# 61. Customization

Implement the User experience:

```text id="phase031"
Open Creation
      ↓
Customize Prompt
      ↓
Preview Resulting Prompt
      ↓
Use Externally
```

---

# 62. Source Preservation

Customization must never modify the source Creation.

---

# 63. Source Context

The system must preserve enough source context so that:

```text id="phase032"
Customize A
   ↓
Generate externally
   ↓
Return
   ↓
Publish B
```

results in:

```text id="phase033"
A → B
```

without requiring the User to manually reconstruct attribution.

---

# 64. Self-Derivation

Creators should be able to start the same derivation flow from their own published Creation.

---

# 65. Basic Lineage Navigation

Creation Detail should expose:

* direct parent;
* direct children;
* ancestry/origin where useful.

The UI does not require a sophisticated graph visualization.

---

# 66. Tombstones

Unavailable intermediate Creations must remain structurally represented.

Example:

```text id="phase034"
A
↓
[Unavailable]
↓
C
```

---

# 67. Lineage Tests

This phase requires particularly strong automated coverage for:

* direct parent;
* ancestry;
* cycles;
* self-parent;
* removal;
* unavailable parent;
* self-derivation;
* cross-User derivation;
* ownership independence;
* customization source preservation.

---

# 68. Phase 4 Exit Criteria

Phase 4 is complete when the full creative loop works:

```text id="phase035"
Discover A
   ↓
Understand Prompt
   ↓
Customize
   ↓
Generate externally
   ↓
Publish B
   ↓
A → B
   ↓
Another User discovers B
```

This is the first point at which Mosaic's central Product hypothesis is technically demonstrable.

---

# Phase 5 — Discovery & Search

## 69. Objective

Make the growing Creation library meaningfully explorable.

---

# 70. Phase 5 Scope

Primary capabilities:

```text id="phase036"
Home Discovery
Search
Basic Filters
Categories / Tags where selected
Creator Discovery
Lineage Discovery
```

---

# 71. Home Discovery

Build the initial public Home/Discovery experience.

The first algorithm should remain understandable and inexpensive.

---

# 72. Initial Ranking

Before implementation, define the first ranking approach sufficiently to avoid accidental permanent ordering behavior.

It may combine simple signals such as:

```text id="phase037"
Recency
Basic engagement
Basic relevance
```

without machine-learning infrastructure.

---

# 73. Search

Implement the Search boundary established in `search.md`.

Initial Search remains database-backed unless implementation evidence indicates otherwise.

---

# 74. Search Visibility

Search must respect:

* publication state;
* moderation state;
* privacy/access;
* blocking rules once finalized.

---

# 75. Search Prompt Content

Prompt text should be searchable according to the initial Search scope.

This is important because Prompt discovery is central to Mosaic.

---

# 76. Categories and Tags

If included in the MVP, introduce the initial:

* category model;
* tag behavior;
* filtering.

Governance rules should be resolved before public launch.

---

# 77. Lineage Discovery

Derived Creations should remain independently discoverable.

Search and Discovery MUST NOT collapse a Lineage into only its root Creation.

---

# 78. Phase 5 Testing

Priority tests include:

* Search matching;
* Search visibility;
* Draft exclusion;
* unavailable content;
* bounded retrieval;
* basic ranking;
* filter behavior;
* Lineage independence.

---

# 79. Phase 5 Exit Criteria

Phase 5 is complete when a Visitor can:

```text id="phase038"
Open Mosaic
    ↓
Browse useful Creations
    ↓
Search
    ↓
Find relevant Creation
    ↓
Open creator / lineage
    ↓
Enter creative loop
```

---

# Phase 6 — Community

## 80. Objective

Transform Mosaic from a content library into a community around Creations.

---

# 81. Phase 6 Scope

Primary capabilities:

```text id="phase039"
Follow
Like
Comment
Reply
Save
Collections
Notifications
Sharing
```

---

# 82. Product Decisions Required

Before or during this phase, resolve:

* Self-Like;
* Comment reply depth;
* creator Comment controls;
* Save ↔ Collection relationship;
* Follow Notification behavior;
* engagement metric visibility.

---

# 83. Follow

Implement directional User following.

No self-follow.

---

# 84. Following View

Introduce a simple way to discover content from followed Users.

Initial chronological behavior is acceptable if selected.

---

# 85. Like

Implement independent User ↔ Creation Like relationships.

Like counts may be derived.

---

# 86. Comments

Implement Comments and basic replies.

Authorization must protect editing/deletion behavior.

---

# 87. Save

Implement private Save behavior.

Save remains distinct from Like.

---

# 88. Collections

Implement basic private Collections.

Initial operations:

```text id="phase040"
Create
Rename
Add Creation
Remove Creation
Delete Collection
```

---

# 89. Notifications

Implement the in-app Notification foundation.

Priority events include:

* Comments;
* replies;
* direct derivation/Remix;
* important moderation events.

---

# 90. Notification Independence

A Notification failure must not invalidate the source action.

---

# 91. Sharing

Public Creations should be shareable through stable links.

---

# 92. Phase 6 Testing

Priority tests include:

* relationship uniqueness;
* independence between relationships;
* authorization;
* Comment ownership;
* private Save;
* private Collection;
* Notification recipients;
* Notification failure isolation.

---

# 93. Phase 6 Exit Criteria

Phase 6 is complete when Users can:

```text id="phase041"
Discover
Create
Derive
Follow
Like
Discuss
Save
Organize
Receive important awareness
```

without compromising Lineage or privacy.

---

# Phase 7 — Safety & Governance

## 94. Objective

Make Mosaic suitable for operation as a public community rather than merely a technical demo.

---

# 95. Phase 7 Scope

Primary capabilities:

```text id="phase042"
Blocking
Reporting
Moderation
Appeals
Administration
Auditability
Account Enforcement
```

---

# 96. Decisions Required

Before public launch, resolve:

* blocking interaction matrix;
* Report taxonomy;
* enforcement ladder;
* moderation visibility behavior;
* initial privileged-role safeguards;
* bootstrap Administrator process.

---

# 97. Blocking

Implement the final Product interaction matrix.

Regardless of UI behavior:

```text id="phase043"
Block
  ≠
Rewrite Lineage
```

---

# 98. Reporting

Users must be able to submit Reports against supported targets.

Report submission must not directly determine guilt.

---

# 99. Moderation Queue

Create a minimal operational interface for reviewing Reports and relevant context.

---

# 100. Moderation Decision

Authorized reviewers should be able to record:

* decision;
* reason;
* action;
* relevant evidence/context.

---

# 101. Enforcement

Implement the selected initial enforcement ladder.

Account enforcement and content enforcement should remain distinguishable.

---

# 102. Appeals

Implement a basic Appeal workflow for meaningful enforcement.

---

# 103. Restoration

Successful Appeal should restore the existing resource where appropriate rather than creating a duplicate.

---

# 104. Administration

Create minimal protected administrative capabilities for:

* Account state;
* privileged roles;
* taxonomy;
* serious moderation escalation;
* controlled platform corrections.

---

# 105. Privileged Audit

Sensitive Moderator and Administrator actions should create appropriate audit records.

---

# 106. AI-Assisted Moderation

AI-assisted triage MAY be introduced during this phase if useful.

It is not required to become the sole decision-maker.

---

# 107. Phase 7 Testing

Priority tests include:

* Reporter permissions;
* duplicate Report behavior;
* moderation authorization;
* enforcement;
* Appeals;
* restoration;
* role boundaries;
* privilege escalation;
* audit creation;
* Lineage preservation during moderation.

---

# 108. Phase 7 Exit Criteria

Phase 7 is complete when Mosaic can:

```text id="phase044"
Receive safety problem
      ↓
Review
      ↓
Decide
      ↓
Enforce
      ↓
Audit
      ↓
Appeal where applicable
      ↓
Restore where appropriate
```

without giving ordinary Users or source creators unauthorized control over others' content.

---

# Phase 8 — Production Readiness

## 109. Objective

Prepare the implemented Product for real external Users.

This phase is not where quality suddenly begins.

It consolidates production requirements built throughout previous phases.

---

# 110. Phase 8 Scope

Primary areas:

```text id="phase045"
Security Review
Performance
Accessibility
Observability
Deployment
Backups
Recovery
Abuse Protection
Production Configuration
Release Validation
```

---

# 111. Production Infrastructure

Finalize the initial production choices for:

* hosting;
* database;
* object storage;
* workers;
* email;
* observability;
* secrets;
* domain/DNS.

---

# 112. Deployment Pipeline

Establish the production release workflow.

At minimum:

```text id="phase046"
Validated Source
      ↓
CI
      ↓
Build
      ↓
Deployment
      ↓
Health Validation
      ↓
Observation
```

---

# 113. Database Production Readiness

Verify:

* migrations;
* constraints;
* indexes;
* backups;
* restoration capability;
* production connection behavior.

---

# 114. Media Production Readiness

Verify:

* upload restrictions;
* processing;
* failure handling;
* storage permissions;
* delivery;
* cleanup.

---

# 115. Security Review

Review critical areas:

```text id="phase047"
Authentication
Sessions
Authorization
CSRF where applicable
XSS
Input validation
Uploads
Secrets
Privileged operations
Rate limiting
```

---

# 116. Authorization Review

Explicitly test object-level access across:

* Drafts;
* Profiles where private fields exist;
* Collections;
* Notifications;
* Reports;
* moderation;
* administration.

---

# 117. Accessibility Review

Critical User journeys should receive both automated and manual accessibility validation.

---

# 118. Performance Baseline

Measure realistic initial workflows.

Potential targets include:

* Home;
* Search;
* Creation Detail;
* publication;
* Lineage;
* Media upload.

Do not invent scaling infrastructure before measuring.

---

# 119. Observability

Production should provide enough visibility into:

```text id="phase048"
Errors
Requests
Database
Workers
Queues
Media
Deployments
```

---

# 120. Alerts

Create only useful initial alerts for conditions that require action.

Avoid alert noise.

---

# 121. Backup and Recovery

Production backup must exist and restoration should be validated appropriately.

---

# 122. Abuse Protection

Introduce appropriate initial controls for:

* authentication abuse;
* spam;
* expensive endpoints;
* uploads;
* reporting abuse.

Exact rate limits should follow risk and measurement.

---

# 123. Privacy Review

Verify that:

* private Account data is not public;
* Saves remain private;
* private Collections remain private;
* Drafts remain private;
* Reporter identity is protected;
* operational logs do not unnecessarily expose personal data.

---

# 124. Production Data

Development and test environments must not depend on production User data.

---

# 125. Phase 8 Exit Criteria

Phase 8 is complete when the Product is technically suitable for controlled real-User access.

---

# Phase 9 — MVP Release & Validation

## 126. Objective

Release Mosaic to real Users in a controlled manner and validate the Product hypothesis.

---

# 127. Release Strategy

The initial release SHOULD favor controlled learning over immediate maximum reach.

Potential release models include:

```text id="phase049"
Private Alpha
Invite-Based Alpha
Limited Public Beta
Public Beta
```

🟡 Exact launch model remains open.

---

# 128. Product Validation

The release should evaluate whether Users successfully move through:

```text id="phase050"
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
```

---

# 129. Qualitative Validation

Early Product feedback should investigate:

* Is the concept understandable?
* Are useful Prompts discoverable?
* Is customization understandable?
* Is external generation too much friction?
* Do Users understand Lineage?
* Do creators value attribution?
* Do Users publish derived results?
* What prevents repeat usage?

---

# 130. Quantitative Validation

Once analytics exist, useful measurements MAY include:

```text id="phase051"
Creation views
Prompt customization starts
Customization completion
Derived publications
Search usage
Saves
Repeat visits
Creator activity
```

Exact Product metrics belong to a future analytics specification.

---

# 131. Metrics Must Have Definitions

Mosaic should not measure ambiguous metrics merely because tooling provides them.

For example:

```text id="phase052"
View
```

must have a defined meaning before being treated as a Product metric.

---

# 132. Validation Before Expansion

Major Post-MVP features should be prioritized based partly on evidence from the MVP.

Example:

```text id="phase053"
Users frequently leave Mosaic to generate
and fail to return
        ↓
Direct generation integration may become valuable
```

rather than:

```text id="phase054"
Direct generation sounds impressive
        ↓
Build immediately
```

---

# 133. MVP Feedback Loop

After release:

```text id="phase055"
Observe
   ↓
Collect Feedback
   ↓
Measure
   ↓
Identify Friction
   ↓
Prioritize
   ↓
Improve
```

---

# 134. Development Dependencies

The primary dependency chain is:

```text id="phase056"
Technical Foundation
        ↓
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
        ↓
Community
        ↓
Safety
        ↓
Production
```

---

# 135. Parallelizable Work

Not every task must wait for the previous phase to be completely finished.

Potential parallel work includes:

```text id="phase057"
Product UI Design
Documentation refinement
Test infrastructure
Media research
Moderation policy work
Deployment research
Accessibility
```

provided implementation dependencies remain respected.

---

# 136. Avoiding Horizontal Overbuild

Mosaic should avoid this pattern:

```text id="phase058"
Build every database model
      ↓
Build every API
      ↓
Build every screen
      ↓
Integrate everything at the end
```

because major Product assumptions remain unvalidated until late.

---

# 137. Preferred Development Pattern

Prefer:

```text id="phase059"
Small vertical capability
        ↓
Works end-to-end
        ↓
Test
        ↓
Integrate
        ↓
Next capability
```

within the broader Phase sequence.

---

# 138. Documentation During Development

Implementation discoveries may reveal necessary documentation changes.

When that happens:

```text id="phase060"
Implementation discovery
       ↓
Review Product/Technical implications
       ↓
Update documentation
       ↓
Update implementation/tests
```

Documentation should remain alive.

---

# 139. Architecture Changes

Developers MUST NOT silently bypass documented architecture because an alternative is faster locally.

If a documented architectural decision becomes inappropriate:

```text id="phase061"
Identify problem
      ↓
Discuss
      ↓
Update decision
      ↓
Implement
```

---

# 140. Open Decisions During Development

Some decisions intentionally remain open until implementation provides enough context.

That is acceptable.

The important rule is:

> **An open decision should become explicit before dependent implementation accidentally makes it permanent.**

---

# 141. Decision Gates

Mosaic should resolve decisions at the latest before their dependent phase.

Conceptually:

| Decision                                 | Required Before |
| ---------------------------------------- | --------------- |
| Core technology stack                    | Phase 0         |
| Authentication implementation            | Phase 1         |
| User/Account/Profile physical model      | Phase 1         |
| Edit vs New Creation boundary            | Phase 3         |
| Media provider/processing implementation | Phase 3         |
| One vs multiple direct parents           | Phase 4         |
| Self-derivation terminology              | Phase 4         |
| Tombstone display                        | Phase 4         |
| Initial Discovery ranking                | Phase 5         |
| Category/tag governance                  | Phase 5         |
| Self-Like                                | Phase 6         |
| Comment controls                         | Phase 6         |
| Save ↔ Collection                        | Phase 6         |
| Blocking matrix                          | Phase 7         |
| Report taxonomy                          | Phase 7         |
| Enforcement ladder                       | Phase 7         |
| Admin bootstrap                          | Phase 7         |
| Production hosting                       | Phase 8         |
| Production region                        | Phase 8         |
| CI/CD production workflow                | Phase 8         |
| Launch model                             | Phase 9         |

---

# 142. Scope Changes

New ideas discovered during implementation should not automatically enter the active Phase.

They should be evaluated against:

```text id="phase062"
Required for current Phase?
Required for MVP?
Post-MVP?
Future?
```

This protects delivery focus.

---

# 143. Technical Debt

MVP speed does not justify knowingly violating core Product integrity.

However, some non-critical implementation improvements may be deferred deliberately.

Deferred technical work should be:

* explicit;
* understood;
* tracked;
* revisited when relevant.

---

# 144. Refactoring

Refactoring is expected during implementation.

The Modular Monolith should evolve internally as the engineering team learns more about real boundaries.

Tests should protect Product behavior while permitting this evolution.

---

# 145. Completion Does Not Mean Perfection

A Phase is complete when its required Product behavior and technical guarantees are sufficiently established to safely unlock the next stage.

It does not mean every conceivable enhancement is implemented.

---

# 146. Phase Summary

| Phase                        | Primary Outcome                             |
| ---------------------------- | ------------------------------------------- |
| 0 — Technical Foundation     | Mosaic can be developed consistently        |
| 1 — Identity & Access        | Users can securely exist and authenticate   |
| 2 — Creation Foundation      | Users can author private Creation drafts    |
| 3 — Media & Publication      | Users can publish public AI video Creations |
| 4 — Lineage & Customization  | Mosaic's core creative loop works           |
| 5 — Discovery & Search       | Creations can be meaningfully found         |
| 6 — Community                | Users can interact and organize content     |
| 7 — Safety & Governance      | Public community can be governed            |
| 8 — Production Readiness     | Mosaic is operationally ready               |
| 9 — MVP Release & Validation | Real Product assumptions can be tested      |

---

# 147. Development Decision Summary

## DELIVERY-ADR-001 — Dependency-Driven Phases

**Status:** ✅ Decided

Mosaic's development sequence is based on technical and Product dependencies rather than arbitrary calendar units.

---

## DELIVERY-ADR-002 — Vertical Implementation

**Status:** ✅ Decided

Within each Phase, Mosaic will prefer usable end-to-end capabilities over large disconnected horizontal implementation layers.

---

## DELIVERY-ADR-003 — Quality Is Continuous

**Status:** ✅ Decided

Testing, Security, Accessibility, Observability, and documentation evolve throughout development rather than being postponed to final release preparation.

---

## DELIVERY-ADR-004 — Core Loop Before Platform Breadth

**Status:** ✅ Decided

Creation, Prompt, Media, Customization, and Lineage are established before broad social-platform expansion.

---

## DELIVERY-ADR-005 — Safety Before Public Operation

**Status:** ✅ Decided

Required moderation, blocking, reporting, and administrative controls must exist before Mosaic operates as an unrestricted public community.

---

## DELIVERY-ADR-006 — No Speculative Schedule

**Status:** ✅ Decided

Mosaic will not assign unsupported calendar estimates before implementation capacity and complexity are known.

---

## DELIVERY-ADR-007 — Decisions Have Gates

**Status:** ✅ Decided

Open decisions must be resolved before implementation phases that structurally depend on them.

---

## DELIVERY-ADR-008 — MVP Release Produces Evidence

**Status:** ✅ Decided

Post-MVP prioritization will incorporate real Product evidence rather than relying exclusively on pre-launch assumptions.

---

# 148. Open Development Decisions

| Decision                            | Status                                 |
| ----------------------------------- | -------------------------------------- |
| Technology stack                    | 🟡 Open                                |
| Repository implementation structure | 🟡 Open                                |
| Authentication implementation       | 🟡 Open                                |
| Initial Provider/Model registry     | 🟡 Open                                |
| Media implementation stack          | 🟡 Open                                |
| Lineage parent cardinality          | 🟡 Open                                |
| Initial Discovery ranking           | 🟡 Open                                |
| Community policy details            | 🟡 Open                                |
| Moderation policy details           | 🟡 Open                                |
| Hosting                             | 🟡 Open                                |
| CI/CD tooling                       | 🟡 Open                                |
| Production release model            | 🟡 Open                                |
| MVP launch model                    | 🟡 Open                                |
| Calendar estimates                  | Deferred until implementation evidence |

These decisions will be consolidated in `open-decisions.md`.

---

# 149. Development Sequence Summary

The Mosaic development journey is:

```text id="phase063"
DOCUMENTED PRODUCT
        ↓
TECHNICAL FOUNDATION
        ↓
IDENTITY
        ↓
CREATION
        ↓
MEDIA
        ↓
PUBLICATION
        ↓
LINEAGE + CUSTOMIZATION
        ↓
DISCOVERY
        ↓
COMMUNITY
        ↓
SAFETY
        ↓
PRODUCTION
        ↓
REAL USERS
        ↓
EVIDENCE
        ↓
PRODUCT EVOLUTION
```

The central principle is:

> **Every Phase should reduce uncertainty, unlock the next dependency, and move Mosaic closer to a complete real-User experience without building complexity before it is needed.**

---

# Related Documentation

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
* [Security](../03-technical/security.md)
* [Testing](../03-technical/testing.md)
* [Deployment](../03-technical/deployment.md)

## Delivery

* [MVP](./mvp.md)
* [Roadmap →](./roadmap.md)
* [Open Decisions](./open-decisions.md)
* [Glossary](./glossary.md)

---

**Previous:** [← MVP](./mvp.md) · [Documentation Home](../README.md) · **Next:** [Roadmap →](./roadmap.md)
