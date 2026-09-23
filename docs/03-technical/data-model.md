# Data Model

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Data & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the logical data model of Mosaic.

It translates the established Product, Business Rules, User Flows, Functional Requirements, Non-Functional Requirements, and Architecture into persistent domain entities and relationships.

The purpose is to answer questions such as:

* What entities exist?
* Which entities are authoritative?
* How are they related?
* Which relationships require integrity guarantees?
* Which data represents historical truth?
* Which information is private?
* Which concepts should remain independent?
* Which decisions must remain flexible?

This document does **not** yet define:

* SQL syntax;
* database-specific column types;
* ORM models;
* indexes;
* migration files;
* physical partitioning;
* database vendor;
* exact storage engine behavior.

Those decisions belong to implementation and later technical refinement.

---

# 1. Data Modeling Principles

Mosaic's data model follows several principles.

## 1.1 Domain Before Tables

The model begins with Product concepts.

Database tables should represent the domain rather than redefine it.

---

## 1.2 Stable Identity

Persistent entities SHOULD have stable identifiers independent from mutable presentation fields.

Examples:

```text
User identity ≠ username
Creation identity ≠ title
Media identity ≠ file URL
Collection identity ≠ collection name
```

---

## 1.3 Relationships Are First-Class

Mosaic is highly relational.

Important relationships include:

```text
User → Creation
Creation → Creation
User → User
User → Creation
Collection → Creation
Comment → Comment
Report → Target
Moderation Case → Target
```

These relationships must be modeled intentionally.

---

## 1.4 Historical Truth Matters

The data model MUST preserve Mosaic's historical creative model.

A published Creation represents a creative state.

Material creative evolution produces:

```text
New Creation
      +
Lineage relationship
```

rather than silently rewriting the previous Creation.

---

## 1.5 Independent Relationships Stay Independent

Relationships such as:

```text
Like
Save
Follow
Collection Membership
Lineage
```

MUST NOT be coupled merely because they involve the same entities.

---

## 1.6 Source of Truth

Core relational data is authoritative.

Derived systems such as:

* Search indexes;
* caches;
* recommendations;
* analytics;
* feed rankings

are not authoritative replacements for the domain model.

---

# 2. Conceptual Entity Map

The initial logical model contains the following major entities:

```text
User
├── Account
├── Profile
├── Creations
├── Follows
├── Likes
├── Comments
├── Saves
├── Collections
├── Notifications
├── Reports
└── Moderation / Administrative Relationships

Creation
├── Author
├── Media
├── Prompt
├── Generation Context
├── Customizable Elements
├── Lineage
├── Likes
├── Comments
├── Saves
├── Collection Memberships
├── Reports
└── Moderation State
```

Additional supporting entities will exist where relationships or history require them.

---

# 3. Logical Relationship Overview

Conceptually:

```text
                         USER
                          │
            ┌─────────────┼─────────────┐
            │             │             │
         Account        Profile      Social Graph
                                      │
                              ┌───────┼───────┐
                              │       │       │
                           Follow    Like   Comment
                                      │
                                      ▼
                                  CREATION
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │                          │                          │
         Media                      Prompt                 Generation Context
                                      │
                              Customizable Elements
                                      │
                                      ▼
                                   Lineage
                                      │
                              Parent / Descendants
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │                          │                          │
          Save                    Collection                Moderation
                                      │
                              Collection Membership
```

This diagram is conceptual and does not prescribe physical table layout.

---

# 4. User

`User` represents the platform-level identity that connects Account behavior, Profile behavior, authorship, social relationships, and platform activity.

Conceptually:

```text
User
 ├── Account
 └── Profile
```

The implementation MAY represent User, Account, and Profile through separate persistent records or another normalized structure.

The final physical mapping will be selected during implementation.

---

# 5. User Identity Requirements

A User SHOULD have:

* stable internal identity;
* Account relationship;
* Profile relationship;
* Account state;
* creation timestamp;
* relevant lifecycle metadata.

The stable internal identity MUST NOT depend on:

* email;
* username;
* display name.

These values may evolve independently.

---

# 6. Account

`Account` represents authentication and security-oriented User information.

Potential logical attributes include:

```text
Account
├── User
├── Email
├── Credential Information
├── Email Verification State
├── Account State
├── Created At
└── Security Metadata
```

Sensitive authentication information MUST remain separate from public Profile representation.

---

# 7. Email

Email is private Account information.

The model MUST support:

* normalized comparison;
* uniqueness according to Account rules;
* verification state;
* secure lifecycle management.

Email MUST NOT be treated as a public User identifier.

---

# 8. Account State

The Product model currently recognizes states conceptually equivalent to:

```text
ACTIVE
DEACTIVATED
SUSPENDED
BANNED
DELETED
```

Exact technical representation remains implementation-specific.

Account state SHOULD be represented explicitly rather than inferred indirectly from unrelated fields.

---

# 9. Profile

`Profile` represents the User's public identity.

Potential logical attributes include:

```text
Profile
├── User
├── Username
├── Display Name
├── Avatar
├── Bio
├── Created At
└── Updated At
```

Additional public fields may be introduced later.

---

# 10. Username

Username belongs to Profile identity.

The model MUST support case-insensitive uniqueness.

Conceptually:

```text
@Ricardo
@ricardo
@RICARDO
```

cannot represent three different active usernames if Mosaic considers them equivalent.

The exact normalization strategy will be defined during implementation.

---

# 11. Username History

🟡 **Open Decision**

Username changes remain unresolved.

Therefore, this document does not require a username-history entity yet.

If username changes are later allowed, Mosaic may need to preserve:

* previous usernames;
* redirect behavior;
* change timestamps;
* abuse-prevention metadata.

---

# 12. Deleted User Representation

Historical content may need to survive User deletion.

Therefore:

```text
User Deleted
      ↓
Historical Creation remains
```

MUST NOT require:

```text
Creation deleted
```

The system SHOULD support a historical representation such as:

```text
Deleted User
```

without unnecessarily exposing deleted personal identity.

The exact implementation may use:

* retained internal identity with anonymization;
* nullable public Profile association;
* tombstone identity representation;
* another controlled strategy.

The physical strategy remains open.

---

# 13. Roles

Privileged roles conceptually include:

```text
USER
MODERATOR
ADMINISTRATOR
```

Roles represent permissions, not public Account types.

The data model SHOULD allow role assignment to remain distinct from Profile identity.

---

# 14. Role Assignment

The system SHOULD be capable of representing:

```text
User
  ↓
Role Assignment
  ↓
Role
```

rather than requiring privileged status to be encoded directly into public Profile data.

This supports:

* auditing;
* future permission evolution;
* role lifecycle;
* least privilege.

The initial implementation MAY use a simpler representation if it preserves these rules.

---

# 15. Creation

`Creation` is the central creative entity in Mosaic.

A Creation represents a published or draft creative artifact.

Potential logical attributes include:

```text
Creation
├── Stable ID
├── Author
├── State
├── Title
├── Description
├── Prompt
├── Generation Context
├── Media
├── Discovery Metadata
├── Lineage Context
├── Created At
├── Published At
└── Updated At
```

Not every conceptual component must be stored directly on the Creation record.

---

# 16. Creation State

The model SHOULD explicitly distinguish relevant lifecycle states.

At minimum, Mosaic needs to distinguish:

```text
Draft
Published
Unavailable
```

Additional states may be introduced for:

* moderation;
* processing;
* deletion;
* administrative restriction.

The exact state machine will be refined during implementation and moderation design.

---

# 17. Creation Identity

Creation identity MUST remain stable across non-material corrections.

Example:

```text
Creation A
   ↓
Fix typo in description
   ↓
Still Creation A
```

Material creative evolution requires:

```text
Creation A
   ↓
Meaningful evolution
   ↓
Creation B
```

with an appropriate Lineage relationship.

---

# 18. Creation Author

Every published Creation MUST have an author or preserved historical author representation.

Conceptually:

```text
Creation
   │
   └── authored_by → User
```

Ordinary editing MUST NOT reassign authorship.

---

# 19. Draft Creation

A Draft is private working content.

Conceptually:

```text
Draft Creation
      │
      └── Owner
```

Drafts MUST NOT appear in public Discovery.

Exact draft persistence, autosave, expiration, and recovery behavior remain to be defined.

---

# 20. Prompt

`Prompt` represents the instructions associated with a Creation.

A Prompt MUST support plain text.

It MAY additionally support structured information.

Conceptually:

```text
Prompt
├── Creation
├── Raw Content
├── Structured Representation (optional)
└── Metadata
```

The model MUST NOT require every Prompt to use a fixed structured schema.

---

# 21. Prompt Relationship

A published Creation must preserve the Prompt associated with that creative state.

Conceptually:

```text
Creation A
      │
      └── Prompt A
```

A materially changed Prompt used to create a new creative result belongs to the new Creation:

```text
Creation A → Creation B

Prompt A       Prompt B
```

Prompt B MUST NOT silently replace Prompt A as historical truth.

---

# 22. Prompt Storage Strategy

🟡 **Open Technical Decision**

The physical Prompt representation may involve:

* text columns;
* structured data;
* related component records;
* hybrid storage.

The selected approach must preserve:

* plain-text compatibility;
* extensibility;
* historical integrity;
* query needs.

---

# 23. Customizable Element

A Prompt may expose customizable elements.

Conceptually:

```text
Customizable Element
├── Prompt
├── Identifier
├── Label
├── Description
├── Default Value
├── Input Behavior
└── Suggestions
```

Not every Prompt requires customizable elements.

---

# 24. Customizable Element Identity

Customizable elements SHOULD have stable identity within their Prompt context where persistence requires it.

The model SHOULD NOT assume the visible label is a stable identifier.

Example:

```text
Identifier: character
Label: Main character
```

The label may change without redefining the conceptual element.

---

# 25. Customizable Suggestions

Suggestions associated with customizable elements MAY require their own records or structured representation.

The implementation should depend on:

* ordering requirements;
* editing behavior;
* expected query patterns;
* future metadata needs.

No physical representation is selected yet.

---

# 26. Customization Session

`Customization Session` represents private working state while a User adapts a source Prompt.

Conceptually:

```text
Customization Session
├── User
├── Source Creation
├── Working Prompt
├── Selected Values
├── Created At
└── Updated At
```

A Customization Session is not a public Creation.

---

# 27. Customization Persistence

🟡 **Open Technical Decision**

Customization sessions may eventually be:

* persisted server-side;
* persisted temporarily;
* stored client-side;
* hybrid.

Regardless of strategy, publication from a known source MUST preserve sufficient source context to establish correct Lineage.

---

# 28. Media

`Media` represents generated media associated with a Creation.

Conceptually:

```text
Media
├── Creation
├── Media Type
├── Storage Reference
├── Processing State
├── Metadata
├── Created At
└── Availability State
```

Large media binary data belongs in object storage rather than ordinary relational fields.

---

# 29. Creation-to-Media Relationship

The model SHOULD NOT assume forever that:

```text
Creation = exactly one video
```

The logical relationship should permit media evolution.

Conceptually:

```text
Creation
   │
   └── one or more Media records
```

The initial Product experience may still present one primary generated video.

This flexibility avoids redefining Creation if Mosaic later supports:

* alternate media;
* thumbnails;
* previews;
* images;
* other generated-media types.

---

# 30. Primary Media

If multiple Media records are supported, Mosaic may require a concept such as:

```text
Primary Media
```

The exact strategy remains a technical decision.

Potential approaches include:

* role field;
* explicit primary-media reference;
* ordering;
* media-purpose classification.

---

# 31. Media Storage Reference

Media records SHOULD reference storage objects through stable internal metadata.

The domain MUST NOT depend directly on temporary delivery URLs.

Conceptually:

```text
Media
   │
   └── Storage Object Reference
              ↓
        Object Storage
```

Delivery URLs may be generated independently.

---

# 32. Media Processing State

Media MAY require processing states such as:

```text
UPLOADING
PROCESSING
READY
FAILED
```

The final state model will be defined in Media Storage.

Processing state is not Creation versioning.

---

# 33. Generation Context

`Generation Context` represents how the generated result was produced.

Conceptually:

```text
Generation Context
├── Creation
├── Provider
├── Model
├── Model Version
└── Parameters
```

These values describe generation context.

They do not define Creation identity.

---

# 34. Provider

Provider identifies the generation platform or tool where known.

Mosaic MUST support:

```text
Known Provider
```

and:

```text
Unknown / Other Tool
```

so publication is not blocked by an incomplete provider registry.

---

# 35. Provider Registry

Mosaic MAY maintain a platform-managed registry of known providers.

Conceptually:

```text
Provider
├── ID
├── Name
├── Status
└── Metadata
```

Historical Creation records MUST remain understandable if a Provider later becomes deprecated or unsupported.

---

# 36. Model Registry

Mosaic MAY maintain known generation models.

Conceptually:

```text
Provider
   │
   └── Model
          │
          └── Model Version
```

The registry MUST NOT prevent representation of unknown or newly released models.

---

# 37. Generation Parameters

Generation parameters vary significantly between models and providers.

Therefore the data model MUST NOT require one universal rigid parameter schema.

A flexible representation is required.

Potential physical approaches include:

* structured document fields;
* parameter records;
* hybrid representations.

The exact choice remains open.

---

# 38. Lineage

Lineage represents creative derivation between Creations.

Conceptually:

```text
Parent Creation
       ↓
Derived Creation
```

Lineage is historical domain data.

It is not merely a calculated UI relationship.

---

# 39. Direct Parent

For:

```text
A → B → C
```

the data model MUST preserve:

```text
B directly derives from A
C directly derives from B
```

C MUST NOT silently replace B with A as its direct parent.

---

# 40. Origin

Origin is derived from ancestry.

For:

```text
A → B → C → D
```

the origin is:

```text
A
```

but the direct parent of D remains:

```text
C
```

Origin SHOULD generally be derivable from Lineage rather than replacing the direct-parent relationship.

Whether Mosaic stores an optimized origin reference in addition to derivation remains a technical optimization decision.

---

# 41. Lineage Relationship Entity

Conceptually, Lineage may be represented through a relationship entity:

```text
Creation Derivation
├── Parent Creation
├── Child Creation
├── Relationship Type
├── Created At
└── Administrative Metadata
```

This representation supports future evolution better than treating ancestry purely as display metadata.

---

# 42. One vs Multiple Direct Parents

🟡 **Open Product Decision**

Mosaic has not yet decided whether a derived Creation may have:

```text
Exactly one direct parent
```

or:

```text
Multiple direct parents
```

The logical model MUST NOT accidentally settle this Product decision through implementation convenience.

Until resolved, Lineage SHOULD be conceptualized as a derivation relationship rather than assuming a permanent single `parent_id` field directly on Creation.

---

# 43. Lineage Cycle Prevention

The data model and application logic MUST prevent:

```text
A → B → C → A
```

and other cycles.

Lineage is acyclic.

The exact enforcement strategy will depend on the selected relational database and application architecture.

---

# 44. Lineage Temporal Integrity

A parent Creation must logically exist before its derived relationship is established.

The system MUST NOT create ancestry pointing to a future or nonexistent Creation.

---

# 45. Self-Derivation

A User may derive a new Creation from their own previous Creation.

Example:

```text
Creation A — @Ana
      ↓
Creation B — @Ana
```

This uses the same underlying Lineage model as community derivation.

A separate ownership model is unnecessary.

---

# 46. Lineage Tombstones

When an intermediate Creation becomes unavailable, Lineage should remain historically truthful.

Example:

```text
A
↓
[Creation unavailable]
↓
C
```

The system MUST NOT rewrite this as:

```text
A
↓
C
```

The exact information visible in the tombstone remains an open Product decision.

---

# 47. Follow

`Follow` represents a directional User-to-User relationship.

Conceptually:

```text
Follower User
      ↓
Follow
      ↓
Followed User
```

Required properties include:

* follower;
* followed User;
* created timestamp.

A User MUST NOT follow themselves.

---

# 48. Follow Uniqueness

The active relationship:

```text
Follower + Followed User
```

MUST be unique.

The model should prevent duplicate active Follow relationships.

---

# 49. Follow History

🟡 **Open Technical Decision**

Mosaic may:

* delete Follow relationships when unfollowing;
* retain inactive relationship history;
* record events separately.

No Product requirement currently requires full Follow history.

The simplest implementation that preserves Product behavior may be selected later.

---

# 50. Like

`Like` represents a User expressing appreciation for a Creation.

Conceptually:

```text
User
 ↓
Like
 ↓
Creation
```

Only one active Like may exist for:

```text
User + Creation
```

---

# 51. Like Independence

Like MUST remain independent from:

* Save;
* Follow;
* Collection Membership;
* Share;
* Lineage.

Deleting or deactivating a Like MUST NOT implicitly alter those relationships.

---

# 52. Self-Like

🟡 **Open Product Decision**

Whether a User may Like their own Creation remains unresolved.

The persistence model SHOULD be capable of supporting either rule without redesign.

---

# 53. Comment

`Comment` represents User-authored discussion attached to a Creation.

Conceptually:

```text
Comment
├── Author
├── Creation
├── Parent Comment (optional)
├── Content
├── State
├── Created At
└── Updated At
```

---

# 54. Comment Reply

Replies may reference another Comment.

Conceptually:

```text
Creation
   │
   └── Comment A
          │
          └── Comment B
```

The allowed reply depth remains an open Product decision.

---

# 55. Comment Deletion

Deleting a parent Comment MUST NOT automatically delete valid replies authored by other Users.

The model should support:

```text
[Comment unavailable]
        ↓
Existing Replies
```

where required.

---

# 56. Comment State

Comment lifecycle SHOULD support representation of unavailable content without requiring destructive loss of discussion structure.

Potential states may include:

```text
ACTIVE
DELETED
MODERATED
```

Exact values remain implementation-specific.

---

# 57. Save

`Save` represents a User privately retaining a reference to a Creation.

Conceptually:

```text
User
 ↓
Save
 ↓
Creation
```

Only one active Save may exist for:

```text
User + Creation
```

---

# 58. Save Privacy

Individual Save relationships are private by default.

The data model MUST NOT expose saver identity through public data merely because aggregate Save information may exist later.

---

# 59. Save Timestamp

Save SHOULD preserve:

```text
Saved At
```

to support personal organization and future sorting.

---

# 60. Collection

`Collection` represents User-owned organization of Creation references.

Conceptually:

```text
Collection
├── Owner
├── Name
├── Description (possible)
├── Visibility
├── Created At
└── Updated At
```

A Collection does not own the Creations it references.

---

# 61. Collection Membership

The relationship between Collection and Creation is conceptually:

```text
Collection Membership
├── Collection
├── Creation
├── Added At
└── Ordering Metadata (possible)
```

This relationship SHOULD be modeled independently from the Creation itself.

---

# 62. Collection Membership Uniqueness

A Creation SHOULD NOT appear as duplicate membership entries inside the same Collection unless a future Product rule explicitly introduces such behavior.

Conceptually:

```text
Collection + Creation
```

should be unique.

---

# 63. Multiple Collections

The same Creation may belong to multiple Collections owned by the same User.

Example:

```text
Creation A
 ├── Cinematic Ideas
 ├── Camera Experiments
 └── Favorites
```

Each membership remains independent.

---

# 64. Save vs Collection Membership

🟡 **Open Product Decision**

The Product has not yet decided whether:

```text
Add to Collection
        ↓
Automatically creates Save
```

or whether these relationships remain completely independent.

The data model MUST therefore preserve them as separate concepts.

This decision can later define application behavior without requiring the underlying concepts to be merged.

---

# 65. Collection Visibility

Private Collections are supported and private by default.

Future possibilities may include:

* public Collections;
* unlisted Collections;
* collaborative Collections.

The model SHOULD avoid making future visibility states impossible.

---

# 66. Collection Ordering

🟡 **Open Product Decision**

The Product has not yet defined whether Collection items are ordered by:

* added date;
* manual ordering;
* another strategy.

The model MAY reserve room for ordering metadata if implementation cost is low, but MUST NOT expose an undecided ordering rule as Product behavior.

---

# 67. Notification

`Notification` represents awareness of another source event.

Conceptually:

```text
Notification
├── Recipient
├── Type
├── Actor (optional)
├── Source Context
├── Destination
├── Read State
└── Created At
```

Notification is derived data.

It is not the source event.

---

# 68. Notification Source Context

Notifications SHOULD reference enough source context to navigate to the relevant platform state.

Potential examples:

```text
Comment
Creation
Follow
Remix
Moderation Case
Account Event
```

The exact polymorphic-reference strategy will be decided during implementation.

---

# 69. Notification Read State

Read/unread state belongs to the Notification.

Changing it MUST NOT alter the source event.

---

# 70. Notification Grouping

Notifications may eventually be grouped.

Example:

```text
10 Users liked your Creation
```

The data model SHOULD avoid making future grouping impossible.

The exact grouping strategy remains open.

---

# 71. Report

`Report` represents a User-submitted signal about potentially problematic content or behavior.

Conceptually:

```text
Report
├── Reporter
├── Target
├── Reason
├── Context
├── Created At
└── Processing State
```

A Report is not itself a moderation verdict.

---

# 72. Report Target

Reports may target different entity types.

Potential targets include:

* Creation;
* Comment;
* Profile;
* User behavior;
* other eligible content.

The target model should be explicit and auditable.

The exact relational strategy will be determined during implementation.

---

# 73. Report Reason

The final Report taxonomy remains an open Product decision.

Therefore the data model SHOULD support controlled evolution of Report reasons without requiring destructive schema redesign.

---

# 74. Reporter Privacy

Reporter identity is sensitive moderation data.

It MUST NOT be automatically exposed to the reported User through ordinary Product interfaces.

---

# 75. Moderation Case

A `Moderation Case` represents the platform's processing of moderation concerns.

Conceptually:

```text
Moderation Case
├── Target
├── Related Reports
├── State
├── Priority
├── Risk Information
├── Assigned Reviewer
├── Decision
├── Created At
└── Updated At
```

A Moderation Case may aggregate or relate multiple Reports where appropriate.

---

# 76. Moderation Case vs Report

These concepts MUST remain distinct.

```text
Report
   =
User signal
```

while:

```text
Moderation Case
   =
Platform review process
```

Multiple Reports do not automatically equal multiple independent enforcement decisions.

---

# 77. Automated Moderation Analysis

AI or automated systems may generate analysis associated with a Moderation Case.

Conceptually:

```text
Moderation Analysis
├── Case
├── Source
├── Classification
├── Confidence
├── Risk
├── Evidence / Signals
├── Recommendation
└── Created At
```

Automated analysis is not necessarily the final decision.

---

# 78. Moderation Decision

A moderation decision SHOULD preserve:

* Case;
* decision type;
* responsible actor or system;
* reason;
* timestamp;
* relevant reviewed content state.

Meaningful decisions MUST be auditable.

---

# 79. Enforcement Action

An enforcement action represents an applied consequence.

Potential examples include:

```text
Warning
Content Restriction
Content Removal
Interaction Restriction
Temporary Suspension
Account Suspension
Permanent Ban
```

The final enforcement ladder remains an open Product decision.

Therefore the model SHOULD support action categories without prematurely hardcoding the final policy ladder.

---

# 80. Appeal

`Appeal` represents a request to reconsider an eligible moderation decision.

Conceptually:

```text
Appeal
├── Moderation Decision
├── Appellant
├── Reason / Context
├── State
├── Reviewer
├── Decision
├── Created At
└── Resolved At
```

---

# 81. Restoration

Successful restoration MUST restore the existing entity where appropriate.

Example:

```text
Creation A
   ↓
Removed
   ↓
Successful Appeal
   ↓
Creation A restored
```

not:

```text
Creation A
   ↓
Creation B created as replacement
```

Restoration is state recovery, not creative evolution.

---

# 82. Block

`Block` represents a personal User-to-User control relationship.

Conceptually:

```text
Blocking User
      ↓
Block
      ↓
Blocked User
```

Block is not a moderation verdict.

---

# 83. Block Uniqueness

Only one active Block relationship should exist for:

```text
Blocking User + Blocked User
```

A User cannot meaningfully block themselves.

---

# 84. Blocking Effects

🟡 **Open Product Decision**

The exact blocking interaction matrix remains unresolved.

Therefore the Block entity should preserve the relationship without embedding every visibility consequence directly into the data model.

Application policies can later determine:

* Profile visibility;
* comments;
* following;
* discovery;
* notifications;
* interactions.

Lineage MUST remain preserved regardless.

---

# 85. Administrative Action

High-impact administrative operations SHOULD produce auditable records.

Conceptually:

```text
Administrative Action
├── Administrator
├── Action Type
├── Target
├── Reason
├── Previous State
├── Resulting State
└── Created At
```

Exact fields may vary by action type.

---

# 86. Audit Record

Audit data represents security- or governance-relevant historical activity.

Potential sources include:

* Moderation;
* Administration;
* role changes;
* Lineage corrections;
* Account-state changes.

Audit records MUST NOT behave like ordinary User-editable content.

---

# 87. Audit Immutability

Audit records SHOULD receive stronger protection against casual modification or deletion.

This does not necessarily require technically immutable storage from the first implementation.

It does require that ordinary Product operations cannot silently rewrite governance history.

---

# 88. Lineage Correction Record

If an authorized actor corrects a Lineage relationship, the correction SHOULD be auditable.

Conceptually:

```text
Lineage Correction
├── Relationship
├── Previous State
├── Corrected State
├── Authorized Actor
├── Reason
└── Created At
```

The exact Product workflow remains open.

---

# 89. Category

Mosaic may use broad platform-managed Categories.

Conceptually:

```text
Category
├── Name
├── Identifier
├── State
└── Metadata
```

Category governance remains an open Product decision.

The model SHOULD allow categories without requiring them to behave exactly like Tags.

---

# 90. Tag

Tags represent flexible discovery metadata.

Conceptually:

```text
Creation
   ↓
Creation Tag
   ↓
Tag
```

Tag governance remains open.

The physical model should allow many-to-many relationships if Tags are implemented as normalized entities.

---

# 91. Creation Discovery Metadata

Creation may participate in discovery through metadata such as:

* title;
* description;
* categories;
* tags;
* author;
* provider;
* model;
* publication time.

Discovery metadata SHOULD remain connected to authoritative domain entities.

Search-specific indexes remain derived.

---

# 92. Counts

Visible counts may include:

* Likes;
* Comments;
* Saves;
* Followers;
* descendants.

Counts MAY be computed, cached, or materialized for performance.

They MUST NOT become the authoritative replacement for underlying relationships.

Example:

```text
Like rows = source relationships

like_count = derived representation
```

---

# 93. Lineage Counts

🟡 **Open Product Decision**

Mosaic has not yet finalized whether displayed descendant metrics mean:

```text
Direct children
```

or:

```text
All descendants
```

The underlying Lineage data MUST support both calculations.

---

# 94. View Events

🟡 **Open Product Decision**

The Product has not yet defined what counts as a View.

Therefore no authoritative View entity or counter semantics are established by this document.

If Views are introduced, their definition must be finalized before metrics are treated as Product truth.

---

# 95. Share Events

Sharing does not create a new Creation or Lineage relationship.

Whether Mosaic needs persistent Share-event records depends on:

* analytics;
* internal sharing;
* abuse prevention;
* Product behavior.

No mandatory Share entity is defined yet.

---

# 96. Soft Deletion vs Hard Deletion

Mosaic contains historical relationships that make destructive deletion potentially dangerous.

Therefore deletion strategy MUST be selected per entity.

Potential behaviors include:

```text
Hard Delete
Soft Delete
Anonymize
Tombstone
Deactivate
Restrict
```

There is no universal deletion strategy for all Mosaic entities.

---

# 97. Historical Entities

Entities likely to require historical preservation include:

* published Creations;
* Lineage;
* moderation decisions;
* Appeals;
* administrative actions;
* audit records.

Entities with different lifecycle requirements may use different deletion strategies.

---

# 98. Personal Data Deletion

Historical preservation MUST NOT be interpreted as permission to preserve unnecessary personal data indefinitely.

Account deletion and privacy requirements may require:

```text
Preserve structural history
        +
Remove or anonymize personal identity
```

The exact legal and technical strategy will be defined in Security & Privacy.

---

# 99. Timestamps

Persistent entities SHOULD use timestamps where lifecycle history matters.

Common conceptual timestamps include:

```text
Created At
Updated At
Published At
Deleted At
Resolved At
Added At
Saved At
```

Not every entity requires every timestamp.

---

# 100. Time Representation

The system SHOULD use a consistent canonical time representation internally.

User-facing timezone presentation should remain separate from stored canonical timestamps.

The exact database type will be selected with the database technology.

---

# 101. Identifiers

Persistent entities SHOULD use stable internal identifiers.

🟡 **Open Technical Decision**

The exact identifier strategy remains unresolved.

Possible strategies include:

* UUID-family identifiers;
* sortable distributed identifiers;
* database-generated numeric identifiers;
* hybrid public/internal identifiers.

The choice should consider:

* security;
* indexing;
* URL usage;
* distributed generation;
* database performance;
* developer ergonomics.

---

# 102. Public Identifiers

Mosaic MAY distinguish:

```text
Internal Database Identifier
```

from:

```text
Public Resource Identifier
```

if implementation requirements justify it.

This is not required by the current Product specification.

---

# 103. Flexible Metadata

Flexible metadata MAY use structured document-style persistence where relational normalization would provide little value.

Potential candidates include:

* generation parameters;
* provider-specific metadata;
* media metadata;
* moderation analysis details.

Flexible storage MUST NOT become an excuse to place the entire domain inside opaque unvalidated documents.

---

# 104. Referential Integrity

Critical relationships SHOULD use database-level referential integrity where compatible with required lifecycle behavior.

Examples include:

```text
Creation → Author
Comment → Creation
Like → User
Like → Creation
Collection Membership → Collection
Collection Membership → Creation
Lineage → Creation
```

Deletion behavior must be explicitly selected.

---

# 105. Unique Constraints

Rules requiring uniqueness SHOULD be protected at the persistence layer where possible.

Potential examples include:

```text
normalized username
normalized active email
active Follow pair
active Like pair
active Save pair
Collection + Creation membership
```

Application validation alone SHOULD NOT be the only protection against race conditions for critical uniqueness rules.

---

# 106. Transactional Integrity

Operations involving related authoritative writes SHOULD use transactions where partial persistence would violate Product rules.

Examples:

```text
Publish derived Creation
        +
Create required Lineage relationship
```

and potentially:

```text
Create Account
        +
Create required Profile
```

The exact transaction boundaries will be finalized with implementation design.

---

# 107. Derived Data

Derived representations may include:

* counts;
* Search documents;
* feed scores;
* recommendation signals;
* Notification grouping;
* analytics aggregates.

Derived data SHOULD be reproducible or correctable from authoritative data where practical.

---

# 108. Search Index

Search data is a derived representation.

Conceptually:

```text
Relational Domain
       ↓
Search Projection
       ↓
Search Index
```

Search indexing failure MUST NOT redefine the underlying Creation state.

---

# 109. Event Data

Application events MAY be persisted when reliability or auditability requires it.

Examples:

```text
CreationPublished
CommentCreated
RemixPublished
ModerationDecisionMade
```

The architecture does not yet require a universal event store.

Mosaic is not being designed as an event-sourced system.

---

# 110. No Event Sourcing Requirement

Mosaic's historical requirements do not imply that the entire application must use Event Sourcing.

Historical truth can be preserved through:

* stable entities;
* explicit relationships;
* lifecycle states;
* audit records;
* controlled mutation.

Event Sourcing MAY only be considered later if concrete requirements justify it.

---

# 111. Entity Relationship Summary

The principal relationships can be summarized as:

| Source          | Relationship          | Target                | Cardinality                 |
| --------------- | --------------------- | --------------------- | --------------------------- |
| User            | owns                  | Account               | approximately 1:1           |
| User            | owns                  | Profile               | approximately 1:1           |
| User            | authors               | Creation              | 1:N                         |
| Creation        | contains              | Prompt                | conceptually 1:1            |
| Creation        | references            | Media                 | 1:N capable                 |
| Creation        | has                   | Generation Context    | conceptually 1:1            |
| Prompt          | defines               | Customizable Element  | 1:N                         |
| User            | customizes            | Creation              | N:N through private session |
| Creation        | derives from          | Creation              | 🟡 cardinality pending      |
| User            | follows               | User                  | N:N through Follow          |
| User            | likes                 | Creation              | N:N through Like            |
| User            | comments on           | Creation              | N:N through Comment         |
| Comment         | replies to            | Comment               | self-reference              |
| User            | saves                 | Creation              | N:N through Save            |
| User            | owns                  | Collection            | 1:N                         |
| Collection      | contains reference to | Creation              | N:N through Membership      |
| User            | receives              | Notification          | 1:N                         |
| User            | submits               | Report                | 1:N                         |
| Report          | concerns              | Reportable Target     | N:1 conceptual              |
| Moderation Case | aggregates            | Report                | 1:N capable                 |
| Moderation Case | produces              | Decision              | 1:N capable                 |
| Decision        | may receive           | Appeal                | 1:N capable                 |
| User            | blocks                | User                  | N:N through Block           |
| Administrator   | performs              | Administrative Action | 1:N                         |

Exact physical cardinalities may be refined where Product decisions remain open.

---

# 112. Authoritative Entity Classification

## Core Authoritative Entities

Likely authoritative entities include:

```text
User
Account
Profile
Creation
Prompt
Media Metadata
Generation Context
Lineage Relationship
Follow
Like
Comment
Save
Collection
Collection Membership
Block
Report
Moderation Case
Moderation Decision
Appeal
Administrative Action
Audit Record
```

---

## Derived or Projection-Oriented Data

Likely derived data includes:

```text
Search Index
Feed Ranking
Recommendation Score
Cached Counts
Analytics Aggregates
Notification Grouping
Trending Score
```

A Notification itself may be persisted, but its existence remains a consequence of another authoritative event.

---

# 113. Data Ownership

Data ownership in this document means domain responsibility, not intellectual-property ownership.

Examples:

```text
Identity domain
    owns Account persistence responsibility

Creation domain
    owns Creation state

Lineage domain
    owns derivation relationships

Collections domain
    owns Collection Membership
```

This distinction helps maintain modular boundaries inside the Modular Monolith.

---

# 114. Cross-Domain References

Domains may reference stable identifiers owned by other domains.

They SHOULD avoid directly modifying another domain's state without going through appropriate application behavior.

Example:

```text
Collections
     ↓
references Creation
```

but:

```text
Delete Collection
```

MUST NOT directly delete:

```text
Creation
```

---

# 115. Data Model Evolution

The schema will evolve as Mosaic develops.

Changes SHOULD use controlled migrations.

A migration MUST NOT silently change Product meaning.

Example:

Adding a database field called:

```text
parent_creation_id
```

would not be an innocent implementation detail while the Product still has an open decision about multiple direct parents.

Technical convenience MUST NOT resolve Product decisions implicitly.

---

# 116. Initial Data Modeling Decisions

## DMD-001 — Relational Core

**Status:** ✅ Decided

Core structured Mosaic domain data will use relational persistence.

---

## DMD-002 — Stable Entity Identity

**Status:** ✅ Decided

Persistent core entities will use stable internal identity independent from mutable presentation fields.

---

## DMD-003 — Explicit Relationship Entities

**Status:** ✅ Decided

Important many-to-many or historical relationships SHOULD be modeled explicitly where they carry their own lifecycle or metadata.

Examples:

```text
Follow
Like
Save
Collection Membership
Creation Derivation
Block
```

---

## DMD-004 — Lineage Is Persistent Domain Data

**Status:** ✅ Decided

Lineage will be persisted as authoritative historical relationship data.

It will not exist only as calculated presentation metadata.

---

## DMD-005 — Media Metadata Separate from Media Object

**Status:** ✅ Decided

Structured Media records will exist separately from large media objects stored in object storage.

---

## DMD-006 — Search Is Derived

**Status:** ✅ Decided

Search representations are derived from authoritative domain data.

---

## DMD-007 — Creative Evolution Creates New Creation

**Status:** ✅ Decided

Material creative evolution is represented through a new Creation and Lineage relationship rather than internal creative version records.

---

# 117. Open Data Model Decisions

The following remain intentionally unresolved.

| Decision                                      | Status                   |
| --------------------------------------------- | ------------------------ |
| Exact User / Account / Profile physical split | 🟡 Open                  |
| Identifier strategy                           | 🟡 Open                  |
| Username-change history                       | 🟡 Open                  |
| Private Account representation                | 🟡 Open                  |
| Prompt physical representation                | 🟡 Open                  |
| Customizable-element storage                  | 🟡 Open                  |
| Customization-session persistence             | 🟡 Open                  |
| Exact Creation state machine                  | 🟡 Open                  |
| Exact Media role / primary-media strategy     | 🟡 Open                  |
| Generation-parameter storage                  | 🟡 Open                  |
| Provider / Model registry implementation      | 🟡 Open                  |
| One vs multiple direct Lineage parents        | 🟡 Open Product Decision |
| Lineage tombstone visibility                  | 🟡 Open Product Decision |
| Lineage correction workflow                   | 🟡 Open                  |
| Follow-history retention                      | 🟡 Open                  |
| Self-Likes                                    | 🟡 Open Product Decision |
| Comment reply depth                           | 🟡 Open Product Decision |
| Save ↔ Collection behavior                    | 🟡 Open Product Decision |
| Collection ordering                           | 🟡 Open Product Decision |
| Notification grouping                         | 🟡 Open                  |
| Notification retention                        | 🟡 Open                  |
| Report-target implementation                  | 🟡 Open                  |
| Report taxonomy                               | 🟡 Open Product Decision |
| Enforcement ladder                            | 🟡 Open Product Decision |
| Blocking interaction matrix                   | 🟡 Open Product Decision |
| View model                                    | 🟡 Open Product Decision |
| Share-event persistence                       | 🟡 Open                  |
| Deletion strategy per entity                  | 🟡 Open                  |
| Audit-storage implementation                  | 🟡 Open                  |
| Category / Tag governance                     | 🟡 Open Product Decision |

These decisions MUST NOT be silently resolved through schema convenience.

---

# 118. Data Model Principles Summary

Mosaic's logical data model follows:

```text
Stable identity
      +
Explicit relationships
      +
Historical integrity
      +
Relational consistency
      +
Independent social relationships
      +
Provider flexibility
      +
Derived-system separation
```

The most important historical rule remains:

```text
Material Creative Change
          ↓
     New Creation
          +
        Lineage
```

The most important relational rule remains:

```text
Relationships represent Product meaning.
```

The database should enforce Mosaic's rules.

Mosaic's rules should not be invented by the database.

---

# Related Documentation

## Product

* [User & Identity](../01-product/user-identity.md)
* [Publications](../01-product/publications.md)
* [Prompt System](../01-product/prompts.md)
* [Prompt Customization](../01-product/customization.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery & Search](../01-product/discovery.md)
* [Social System](../01-product/social.md)
* [Collections & Saves](../01-product/collections.md)
* [Notifications](../01-product/notifications.md)
* [Moderation & Trust](../01-product/moderation.md)
* [Administration](../01-product/administration.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [User Flows](../02-specification/user-flows.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [← Architecture](./architecture.md)
* [API →](./api.md)
* [Media Storage](./media-storage.md)
* [Search](./search.md)
* [Security & Privacy](./security.md)
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Architecture](./architecture.md) · [Documentation Home](../README.md) · **Next:** [API →](./api.md)
