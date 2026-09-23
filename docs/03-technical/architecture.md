# Architecture

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the high-level technical architecture of Mosaic.

The architecture translates the established Product and Specification layers into technical boundaries without prematurely defining every implementation technology.

The objective is to provide a system that is:

* understandable;
* maintainable;
* secure;
* testable;
* operationally practical;
* capable of evolving;
* consistent with Mosaic's domain model.

The architecture follows the project principle:

> **Build for evolution, not speculation.**

Mosaic should support future growth without paying the operational and development cost of hypothetical future scale today.

---

# 1. Architectural Decision

## 1.1 Initial Architecture

Mosaic will initially use a:

> **Modular Monolith**

The platform will operate as one primary application while maintaining explicit internal boundaries between major domains.

This means:

```text
One application
      +
Explicit domain boundaries
      +
Shared infrastructure where appropriate
      +
Independent responsibilities
```

It does **not** mean:

```text
One unstructured codebase
where every feature directly depends
on every other feature.
```

---

## 1.2 Why a Modular Monolith

Mosaic contains strongly connected domains:

* Identity;
* Profiles;
* Creations;
* Prompts;
* Customization;
* Lineage;
* Discovery;
* Social interactions;
* Collections;
* Notifications;
* Moderation;
* Administration.

Many operations require reliable coordination between these domains.

Examples:

```text
Publish Creation
        ↓
Persist Creation
        ↓
Persist Prompt
        ↓
Persist Generation Context
        ↓
Optionally establish Lineage
```

and:

```text
Publish Remix B from Creation A
        ↓
Create B
        ↓
Preserve A as direct parent
        ↓
Commit valid Lineage relationship
```

Splitting these operations across independently deployed services at the beginning would introduce distributed-system complexity before Mosaic has demonstrated a need for it.

A Modular Monolith allows Mosaic to preserve transactional simplicity while maintaining boundaries that support future extraction if justified.

---

# 2. Why Mosaic Does Not Begin with Microservices

Microservices are not prohibited.

They are simply not the initial architecture.

Beginning with microservices would introduce concerns such as:

* service discovery;
* network communication;
* distributed transactions;
* eventual consistency across core operations;
* inter-service authentication;
* independent deployment;
* message contracts;
* distributed tracing;
* additional infrastructure;
* more complex local development;
* more complex testing;
* increased operational cost.

These costs are justified when concrete scale, ownership, reliability, or deployment requirements demand them.

Mosaic does not currently have evidence that they do.

Therefore:

> Mosaic SHOULD NOT introduce independently deployed services solely in anticipation of hypothetical future scale.

---

# 3. Architectural Evolution

The Modular Monolith is not intended to prevent future service extraction.

Instead, Mosaic will maintain boundaries that allow selected components to become independent later.

Potential future candidates could include:

```text
Media Processing
Search
Notifications
Recommendation Systems
Moderation Automation
Analytics
```

This is a possibility, not a roadmap commitment.

A component should only be extracted when a concrete problem justifies the additional operational complexity.

Possible reasons include:

* substantially different scaling characteristics;
* independent deployment requirements;
* specialized infrastructure;
* fault isolation needs;
* operational ownership;
* workload characteristics.

---

# 4. High-Level Architecture

Conceptually:

```text
                         MOSAIC
                           │
                     Web Application
                           │
                  Application Boundary
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     Identity           Creation            Social
        │                  │                  │
     Profiles            Prompt            Follow
                           │               Like
                        Lineage            Comment
                           │
                         Media
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Collections         Discovery         Moderation
        │                  │                  │
 Notifications      Search / Feed      Administration
        │
        └──────────────────┬──────────────────┘
                           │
                    Persistence Layer
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    Relational DB     Object Storage   Background Work
          │                │                │
     Source of         Generated       Notifications
       Truth             Media         Media Processing
                                      Search Indexing
                                      Moderation Tasks
```

This diagram represents conceptual responsibilities rather than mandatory deployment units.

---

# 5. Application Shape

Mosaic is initially designed as a web platform.

The application is conceptually composed of:

```text
Client Experience
        ↓
Application Interface
        ↓
Domain / Application Logic
        ↓
Persistence & Infrastructure
```

These are responsibility boundaries.

They do not necessarily require separate repositories or independently deployed applications.

---

# 6. Full-Stack Application Direction

Mosaic SHOULD initially favor a cohesive full-stack web application rather than maintaining completely independent frontend and backend products without a demonstrated need.

This approach can simplify:

* development;
* deployment;
* authentication;
* type and contract coordination;
* testing;
* contributor onboarding.

However, frontend code MUST NOT become the authoritative enforcement boundary for:

* authorization;
* ownership;
* moderation;
* privileged actions;
* Lineage integrity;
* data validation.

Trusted application-side enforcement remains required.

---

# 7. Domain Boundaries

The Modular Monolith should be organized around Mosaic's domain responsibilities rather than arbitrary technical folders alone.

Initial conceptual domains are:

```text
Identity
Profile
Creation
Prompt
Customization
Lineage
Media
Discovery
Social
Collections
Notifications
Moderation
Administration
```

These domains may be refined during implementation.

They represent responsibilities, not necessarily one module per database table or one API route per domain.

---

# 8. Identity Domain

The Identity domain is responsible for concepts such as:

* Account;
* authentication;
* Account state;
* roles;
* authorization identity;
* security-sensitive identity operations.

It should remain conceptually distinct from public Profile representation.

```text
Identity
   │
   ├── Account
   ├── Authentication
   ├── Account State
   └── Roles / Permissions
```

---

# 9. Profile Domain

The Profile domain represents public User identity.

Potential responsibilities include:

* username;
* display name;
* avatar;
* bio;
* public Profile presentation.

Conceptually:

```text
Account
   │
   └── Profile
```

The exact persistence relationship will be defined in the Data Model.

---

# 10. Creation Domain

Creation is one of Mosaic's central domains.

It coordinates the published creative artifact.

Conceptually:

```text
Creation
   │
   ├── Author
   ├── Media
   ├── Prompt
   ├── Generation Context
   ├── Discovery Metadata
   └── Lineage Context
```

Creation identity MUST remain distinct from any individual generated-media file.

---

# 11. Prompt Domain

Prompt responsibilities may include:

* Prompt content;
* optional structure;
* customizable elements;
* generation context relationships;
* Prompt presentation.

The architecture MUST NOT assume that every Prompt follows one fixed schema.

Plain text remains valid.

Structured Prompt capabilities may evolve around it.

---

# 12. Customization Domain

Customization represents temporary creative work derived from an existing Prompt.

It is not itself a public Creation.

Conceptually:

```text
Creation A
    ↓
Customization Session
    ↓
Customized Prompt
    ↓
External Generation
    ↓
Publish
    ↓
Creation B
```

The architecture SHOULD preserve source context throughout this journey so publication can establish:

```text
B.parent = A
```

without relying on the User to reconstruct attribution manually.

The exact persistence strategy for customization sessions remains to be defined.

---

# 13. Lineage Domain

Lineage is a core Mosaic domain rather than a presentation-only feature.

It is responsible for creative derivation relationships.

Core invariant:

```text
Child Creation
      │
      └── Direct Parent Creation
```

For:

```text
A → B → C
```

the system MUST preserve:

```text
B.parent = A
C.parent = B
```

It MUST NOT flatten the relationship into:

```text
C.parent = A
```

simply because A is the root.

---

# 14. Lineage Integrity

The architecture MUST support enforcement of:

* acyclic relationships;
* valid parent references;
* historical preservation;
* direct-parent integrity;
* descendant independence;
* controlled administrative correction.

Where possible, critical Lineage invariants SHOULD be protected at more than one trustworthy layer.

Exact persistence constraints will be defined in the Data Model.

---

# 15. Social Domain

Social functionality includes independent relationships such as:

```text
Follow
Like
Comment
Reply
```

These relationships MUST remain conceptually independent.

Example:

```text
Unlike Creation
```

must not implicitly mean:

```text
Unsave Creation
Unfollow Creator
Remove from Collection
```

unless an explicit future Product rule states otherwise.

---

# 16. Collections Domain

Collections organize references to Creations.

They do not own the underlying Creation.

Conceptually:

```text
User
 │
 ├── Saves
 │
 └── Collections
        │
        └── Creation References
```

Deleting a Collection MUST NOT delete its referenced Creations.

The unresolved Product relationship between Save and Collection membership remains open and MUST NOT be silently decided by the architecture.

---

# 17. Discovery Domain

Discovery is responsible for helping Users find relevant public Creations.

Potential surfaces include:

* Search;
* Home Feed;
* Following;
* Categories;
* Tags;
* Trending;
* Recommendations;
* Profiles;
* Lineage exploration.

Not every surface must exist in the initial release.

---

# 18. Discovery as Derived Representation

Discovery systems are representations of authoritative Mosaic data.

They are not themselves the source of truth.

Conceptually:

```text
Creation
   │
   └── Source of Truth
          ↓
     Discovery Index
          ↓
        Results
```

If an index becomes incorrect or unavailable, Mosaic SHOULD be capable of rebuilding or correcting it from authoritative data where practical.

---

# 19. Search Evolution

Initial Search SHOULD avoid unnecessary specialized infrastructure unless product scale or search capabilities justify it.

The architecture should allow progression such as:

```text
Basic Search
     ↓
Improved Indexing
     ↓
Dedicated Search Infrastructure
     ↓
Semantic / AI-Assisted Search
```

without making later stages mandatory today.

The initial Search implementation will be defined in:

```text
docs/03-technical/search.md
```

---

# 20. Notifications Domain

Notifications represent consequences of source events.

They are not source events themselves.

Example:

```text
Comment Created
       ↓
Notification Generated
```

If Notification generation fails:

```text
Comment remains valid.
```

Notification processing SHOULD therefore be capable of asynchronous execution.

---

# 21. Moderation Domain

Moderation manages trust and enforcement workflows.

Potential responsibilities include:

* Reports;
* triage;
* AI-assisted analysis;
* human review;
* enforcement actions;
* Appeals;
* restoration;
* moderation audit records.

Moderation SHOULD remain distinguishable from Administration even if both use privileged interfaces.

---

# 22. Administration Domain

Administration provides privileged operational capabilities.

Potential responsibilities include:

* Account-state management;
* role management;
* taxonomy management;
* controlled Lineage corrections;
* platform configuration;
* moderation escalation;
* audit access.

Administrative actions MUST use explicit authorization.

The architecture MUST NOT assume that administrative access implies unrestricted access to unrelated private User information.

---

# 23. Primary Persistence Strategy

Mosaic will use a:

> **Relational Database**

as the primary authoritative persistence mechanism for core structured domain data.

The specific database technology will be selected later.

---

# 24. Why Relational Persistence

Mosaic contains numerous strongly related entities.

Examples include:

```text
User
 ├── Profile
 ├── Creations
 ├── Followers
 ├── Following
 ├── Likes
 ├── Comments
 ├── Saves
 └── Collections
```

and:

```text
Creation
 ├── Author
 ├── Prompt
 ├── Media
 ├── Parent Creation
 ├── Likes
 ├── Comments
 ├── Saves
 └── Collection Memberships
```

Relational persistence provides a strong foundation for:

* identity;
* referential integrity;
* uniqueness;
* transactions;
* relationship modeling;
* querying;
* migrations.

The exact schema belongs to:

```text
docs/03-technical/data-model.md
```

---

# 25. Database as Source of Truth

Core structured Mosaic state SHOULD use the relational persistence layer as its authoritative source.

Examples include:

* Accounts;
* Profiles;
* Creations;
* Prompt records;
* Lineage;
* social relationships;
* Collections;
* moderation records;
* administrative audit records.

Derived systems SHOULD NOT silently become authoritative replacements.

---

# 26. Transaction Boundaries

Operations involving multiple strongly related writes SHOULD use transactional guarantees where consistency requires them.

Example:

```text
Create derived Creation B
        +
Set parent to Creation A
```

should not result in:

```text
B exists
but required Lineage relationship
was silently lost.
```

Exact transaction boundaries will be defined with the Data Model and implementation architecture.

---

# 27. Media Storage

Generated media SHOULD NOT be stored as ordinary large binary payloads inside the primary relational database without a specific justified reason.

Mosaic will conceptually separate:

```text
Structured Metadata
        ↓
Relational Database

Large Media Objects
        ↓
Object Storage
```

The exact storage provider is not yet selected.

---

# 28. Media References

The relational domain SHOULD store stable media metadata and references rather than assuming application-local filesystem paths.

Conceptually:

```text
Creation
   │
   └── Media Record
           │
           ├── Storage Reference
           ├── Media Type
           ├── Processing State
           └── Metadata
```

Exact fields will be defined in:

```text
docs/03-technical/media-storage.md
```

---

# 29. Object Storage

Object storage will be used for generated media and other large files where appropriate.

The architecture MUST NOT depend on one specific object-storage vendor at the domain level.

Potential implementation providers may be evaluated later.

---

# 30. Background Processing

Mosaic will support asynchronous background work for operations that do not need to complete inside the User's immediate request.

Potential examples:

```text
Media Processing
Notification Delivery
Search Indexing
Moderation Analysis
Analytics Processing
```

Not all of these must use background processing from the first implementation.

The architecture must simply allow it where justified.

---

# 31. Primary vs Secondary Work

A useful distinction is:

```text
PRIMARY ACTION
User publishes Creation
        ↓
Creation committed successfully

SECONDARY WORK
        ↓
Process media
Update Search
Create Notifications
Update analytics
```

Failure of secondary work SHOULD NOT unnecessarily invalidate already successful authoritative work.

---

# 32. Background Job Reliability

Background operations SHOULD consider:

* retry behavior;
* idempotency;
* failure visibility;
* duplicate prevention;
* dead or failed work;
* observability.

The specific job infrastructure remains undecided.

---

# 33. Application Events

Domains MAY communicate consequences through internal application events where this reduces unnecessary coupling.

Example:

```text
CreationPublished
        │
        ├── Search
        ├── Notifications
        └── Analytics
```

This does not require external message brokers or distributed event architecture.

Initially, these events may remain internal to the Modular Monolith.

---

# 34. Event Reliability

An internal event mechanism MUST NOT cause Mosaic to lose authoritative state when secondary processing fails.

Where an event represents required follow-up work, the technical implementation SHOULD provide a recoverable strategy.

The exact mechanism will be determined later.

---

# 35. Caching

Caching MAY be introduced where measurements demonstrate value.

Caches MUST NOT become the sole authoritative storage for critical Mosaic domain state.

Conceptually:

```text
Source of Truth
      ↓
Cache
      ↓
Fast Access
```

not:

```text
Cache
  ↓
Only Copy of Critical Data
```

---

# 36. API Boundary

Mosaic will expose application capabilities through explicit application interfaces.

These interfaces may support:

* the Mosaic web client;
* future clients;
* internal operations;
* future integrations.

The exact API style will be defined in:

```text
docs/03-technical/api.md
```

No REST, GraphQL, RPC, or other API style is selected by this document.

---

# 37. API Responsibilities

Trusted application interfaces MUST enforce:

* authentication where required;
* authorization;
* ownership;
* input validation;
* Account state;
* moderation restrictions;
* domain invariants.

The client MUST NOT be trusted to enforce these rules by itself.

---

# 38. External AI Providers

Initial Mosaic functionality does not require Mosaic to generate AI videos internally.

Users may generate content using external tools and return to Mosaic to publish the result.

Therefore:

> Mosaic's core architecture MUST NOT depend on direct integration with an AI generation provider.

---

# 39. Future AI Integrations

🔮 **Future Possibility**

Mosaic may later integrate directly with generation providers.

If introduced, provider-specific integration logic SHOULD remain separated from the core Creation domain.

Conceptually:

```text
Mosaic Domain
      │
Generation Interface
      │
 ┌────┼────┐
 │    │    │
Provider A
Provider B
Provider C
```

This allows providers to evolve without redefining Mosaic's core domain.

---

# 40. Generation Context

Generation Context belongs to the Creation's creative metadata.

Conceptually:

```text
Generation Context
      │
      ├── Provider
      ├── Model
      ├── Model Version
      └── Parameters
```

The architecture MUST NOT interpret Model Version as Creation Version.

A meaningful creative evolution produces another Creation according to Product rules.

---

# 41. Source of Truth Strategy

Mosaic distinguishes authoritative state from derived representations.

## Authoritative Examples

```text
Account
Profile
Creation
Prompt
Lineage
Like
Save
Collection
Comment
Moderation Decision
```

## Derived Examples

```text
Search Index
Notification
Cached Count
Recommendation Signal
Analytics Event
Feed Ranking
```

Derived systems may become sophisticated without replacing authoritative domain truth.

---

# 42. Consistency Model

Strong consistency SHOULD be preferred where incorrect temporary state would violate important domain invariants.

Examples:

* ownership;
* authorization;
* Creation publication;
* direct Lineage parent;
* unique active relationships where required.

Eventual consistency MAY be acceptable for derived systems.

Examples:

```text
Search Index
Notification Delivery
Analytics
Recommendation Updates
Cached Metrics
```

---

# 43. Failure Boundaries

The architecture SHOULD attempt to prevent failure of one secondary subsystem from unnecessarily propagating through the entire platform.

Example:

```text
Search unavailable
      ↓
Direct Creation URL may still work
```

or:

```text
Notification worker unavailable
      ↓
Comment creation may still succeed
```

Exact degradation behavior depends on implementation.

---

# 44. Security Architecture

Security applies across all architectural layers.

Conceptually:

```text
Client
  ↓
Authentication
  ↓
Authorization
  ↓
Application Rules
  ↓
Persistence Rules
  ↓
Infrastructure Controls
```

No single layer should be treated as the entire security model.

Detailed security design belongs to:

```text
docs/03-technical/security.md
```

---

# 45. Authorization

Authorization MUST occur at trusted application boundaries.

Examples:

```text
Can this User edit this Creation?
Can this Moderator perform this action?
Can this Administrator change this Account state?
Can this User access this private Collection?
```

The User interface may hide unavailable actions for usability, but UI visibility is not authorization.

---

# 46. Auditability

High-impact operations require stronger traceability.

Examples include:

* moderation decisions;
* Appeals;
* Account suspension;
* permanent bans;
* privileged role changes;
* Lineage corrections;
* important administrative changes.

Audit records SHOULD remain conceptually separate from ordinary User-editable content.

---

# 47. Observability

Mosaic SHOULD provide visibility into critical application behavior.

The architecture should eventually support:

* structured logs;
* error monitoring;
* health monitoring;
* background-job monitoring;
* performance metrics;
* tracing where justified.

Detailed design belongs to:

```text
docs/03-technical/observability.md
```

---

# 48. Testing Architecture

Domain boundaries SHOULD support testing without requiring full end-to-end infrastructure for every rule.

Testing should exist at appropriate levels:

```text
Domain Tests
      ↓
Application / Integration Tests
      ↓
API Tests
      ↓
End-to-End Tests
```

Not every behavior requires every test level.

Critical rules such as Lineage integrity and authorization deserve dedicated coverage.

---

# 49. Deployment Philosophy

The initial deployment SHOULD favor operational simplicity.

A Modular Monolith allows Mosaic to begin with relatively few deployable units.

A conceptual deployment may eventually include:

```text
Web / Application
Database
Object Storage
Background Worker
```

This diagram does not select a hosting provider or require each component to run independently from the first release.

Detailed deployment decisions belong to:

```text
docs/03-technical/deployment.md
```

---

# 50. Repository Strategy

🟡 **Open Decision**

This architecture does not yet prescribe:

* exact project folder structure;
* package boundaries;
* monorepo tooling;
* workspace tooling;
* framework conventions.

These decisions should follow stack selection.

Regardless of structure, domain boundaries SHOULD remain understandable in the codebase.

---

# 51. Technology Stack

🟡 **Open Decision**

The following technologies have intentionally not yet been selected:

* frontend framework;
* full-stack framework;
* runtime;
* relational database implementation;
* ORM or query layer;
* authentication solution;
* object-storage provider;
* background-job infrastructure;
* search implementation;
* caching technology;
* hosting provider;
* observability provider;
* testing frameworks.

These choices will be made from Mosaic's requirements rather than defining those requirements retroactively around a preferred tool.

---

# 52. Architectural Dependency Direction

Business and domain rules SHOULD avoid unnecessary dependency on infrastructure-specific concepts.

Conceptually:

```text
Infrastructure
      ↓
implements capabilities needed by
      ↓
Application / Domain
```

rather than:

```text
Domain Rules
      ↓
defined by one vendor SDK
```

This principle is especially important for:

* storage;
* AI providers;
* email;
* search;
* background processing;
* analytics.

---

# 53. Migration Strategy

Mosaic should expect its persistence model to evolve.

Database changes SHOULD use controlled migrations.

Migrations SHOULD:

* be reviewable;
* preserve valid historical data;
* avoid silently rewriting Product meaning;
* support deployment safely.

Detailed migration conventions will be defined after the database technology and data access strategy are selected.

---

# 54. Backward Compatibility

Changes to persistent structures and stable application contracts SHOULD consider existing data and active clients.

Backward compatibility does not mean Mosaic can never change.

It means changes should be intentional and migrated rather than accidental.

---

# 55. Architecture Principles

The following principles summarize Mosaic's technical direction.

## 55.1 Modular Before Distributed

Use clear boundaries before independently deployed services.

---

## 55.2 Relational Core

Use relational persistence for Mosaic's strongly connected structured domain.

---

## 55.3 Media Outside the Relational Core

Store large media using appropriate object storage while preserving structured metadata in the domain.

---

## 55.4 Source Before Representation

Authoritative domain state remains distinct from:

* Search;
* Notifications;
* caches;
* recommendations;
* analytics.

---

## 55.5 Async Where Appropriate

Do not make the User wait for secondary work that can safely happen later.

---

## 55.6 Strong Integrity Where It Matters

Use strong consistency for critical domain invariants.

---

## 55.7 Eventual Consistency Where It Helps

Derived systems may update asynchronously when temporary delay does not violate core Product rules.

---

## 55.8 Provider Independence

Do not define Mosaic around one AI, storage, search, or infrastructure provider.

---

## 55.9 Extract When Necessary

A domain becomes a separate service because concrete requirements justify it, not because microservices are fashionable.

---

## 55.10 Preserve Historical Truth

Architecture MUST respect Mosaic's historical model:

```text
Creative evolution
        =
New Creation + Lineage
```

not hidden mutation of previous creative history.

---

# 56. Initial Architecture Decision Record

## ADR-001 — Use a Modular Monolith

**Status:** ✅ Decided

**Decision**

Mosaic will initially use a Modular Monolith.

**Reason**

The Product contains interconnected domains requiring reliable coordination, while current requirements do not justify distributed-system complexity.

**Consequence**

Domain boundaries must remain explicit even though they share one primary application deployment.

---

## ADR-002 — Use Relational Persistence for Core Structured Data

**Status:** ✅ Decided

**Decision**

A relational database will be the primary authoritative persistence mechanism for Mosaic's structured domain.

**Reason**

Mosaic contains strong relationships, uniqueness requirements, transactional workflows, and historical integrity requirements.

**Consequence**

The Data Model will be designed relationally.

The exact database technology remains undecided.

---

## ADR-003 — Separate Media Storage from Core Relational Persistence

**Status:** ✅ Decided

**Decision**

Large generated-media objects will use dedicated object-storage capabilities rather than being treated as ordinary relational records.

**Reason**

Media has storage, delivery, processing, and scaling characteristics different from structured application data.

**Consequence**

The relational domain will maintain Media records and storage references.

The exact provider remains undecided.

---

## ADR-004 — Support Asynchronous Background Processing

**Status:** ✅ Decided

**Decision**

Mosaic's architecture will support background processing for suitable secondary operations.

**Reason**

Operations such as media processing, Notifications, indexing, and automated moderation should not unnecessarily block primary User actions.

**Consequence**

The architecture must support reliable asynchronous work.

The exact infrastructure remains undecided.

---

# 57. Open Architectural Decisions

The following remain intentionally unresolved.

| Decision                          | Status  |
| --------------------------------- | ------- |
| Frontend / full-stack framework   | 🟡 Open |
| Runtime                           | 🟡 Open |
| Relational database technology    | 🟡 Open |
| Data access / ORM strategy        | 🟡 Open |
| Authentication implementation     | 🟡 Open |
| Object-storage provider           | 🟡 Open |
| Background-job infrastructure     | 🟡 Open |
| Search implementation             | 🟡 Open |
| Cache technology                  | 🟡 Open |
| API style                         | 🟡 Open |
| Hosting / cloud provider          | 🟡 Open |
| Observability stack               | 🟡 Open |
| Repository/package structure      | 🟡 Open |
| Deployment topology               | 🟡 Open |
| Customization-session persistence | 🟡 Open |
| Internal event implementation     | 🟡 Open |

Open decisions MUST NOT be treated as decided merely because a particular implementation is convenient.

---

# 58. Architecture Evolution Rule

Any future architectural change should answer:

```text
What concrete problem are we solving?
```

before:

```text
What new technology can we introduce?
```

A new service, database, queue, cache, framework, or infrastructure provider should exist because Mosaic needs its properties.

Not because the architecture is trying to predict every possible future.

---

# Architecture Summary

Mosaic begins as:

```text
                   MODULAR MONOLITH
                          │
            ┌─────────────┼─────────────┐
            │             │             │
        Web Client    Application    Background Work
                          │
                 Explicit Domains
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
 Relational DB       Object Storage    Derived Systems
       │                  │                  │
 Source of Truth         Media         Search
                                       Notifications
                                       Analytics
                                       Recommendations
```

The architecture favors:

```text
Simplicity now
      +
Clear boundaries
      +
Strong domain integrity
      +
Evolution paths
```

rather than:

```text
Premature distribution
      +
Infrastructure complexity
      +
Speculative scalability
```

The central architectural principle remains:

> **Build for evolution, not speculation.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
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

* [Data Model →](./data-model.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Search](./search.md)
* [Security & Privacy](./security.md)
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Non-Functional Requirements](../02-specification/non-functional-requirements.md) · [Documentation Home](../README.md) · **Next:** [Data Model →](./data-model.md)
