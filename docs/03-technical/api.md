# API

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the application interface strategy for Mosaic.

The API is the trusted boundary through which clients interact with Mosaic's application capabilities.

It translates domain behavior into explicit interfaces while preserving:

* authentication;
* authorization;
* validation;
* ownership;
* domain invariants;
* historical integrity;
* privacy;
* predictable error behavior.

The API must represent Mosaic's Product model rather than expose the database directly.

---

# 1. API Architectural Decision

Mosaic will initially use:

> **REST-oriented HTTP APIs using JSON representations**

This interface will primarily serve Mosaic's web application while remaining capable of supporting future clients and integrations where justified.

---

# 2. Why REST

REST provides Mosaic with:

* familiar HTTP semantics;
* explicit resource boundaries;
* straightforward debugging;
* broad tooling support;
* understandable caching behavior;
* simple integration with web clients;
* low architectural overhead;
* compatibility with the Modular Monolith.

Mosaic does not currently require the query flexibility or client diversity that would justify GraphQL's additional complexity.

---

# 3. GraphQL

GraphQL is not prohibited.

It is simply not part of the initial architecture.

🔮 **Future Possibility**

GraphQL or another query interface could be introduced if concrete requirements emerge, such as:

* significantly different client data requirements;
* complex aggregation needs;
* external developer APIs;
* query flexibility that REST cannot provide efficiently.

Such a change should solve a demonstrated problem.

---

# 4. API Is Not Database CRUD

The API MUST NOT simply expose database tables.

Database structure and Product behavior are different concerns.

For example:

```text
Database concept:
Creation row
```

does not imply the API should expose only:

```text
Create
Read
Update
Delete
```

Mosaic contains meaningful domain actions such as:

```text
Publish Creation
Start Customization
Publish Remix
Appeal Decision
Restore Content
Block User
```

The API SHOULD represent meaningful Product behavior where generic CRUD semantics would obscure intent.

---

# 5. High-Level API Shape

Conceptually:

```text
Web Client
    │
    ▼
HTTP API
    │
    ▼
Application Layer
    │
    ▼
Domain Rules
    │
    ▼
Persistence / Infrastructure
```

The API is not the domain itself.

It is an interface to application behavior.

---

# 6. Transport

The initial API will use:

```text
HTTPS
  +
HTTP semantics
  +
JSON
```

Production API communication MUST use encrypted transport.

Exact infrastructure termination details belong to Deployment and Security.

---

# 7. Resource-Oriented Design

Primary API resources will correspond to Mosaic concepts.

Potential resource families include:

```text
auth
users
profiles
creations
prompts
customizations
lineage
follows
likes
comments
saves
collections
notifications
reports
appeals
moderation
administration
```

Final route naming will be established during implementation.

---

# 8. Route Design Principles

Routes SHOULD:

* represent Product concepts;
* use consistent naming;
* avoid leaking database implementation;
* communicate resource ownership clearly;
* preserve domain boundaries;
* avoid arbitrary RPC-style endpoints when normal resource semantics are sufficient.

Domain actions MAY use explicit action-oriented routes when they communicate Product intent more clearly.

---

# 9. Conceptual Resource Examples

Examples below illustrate semantics rather than final route contracts.

```text
GET /creations/{creation}
```

Retrieve an accessible Creation.

```text
POST /creations
```

Begin or create Creation state according to the final publication workflow.

```text
PATCH /creations/{creation}
```

Apply permitted non-material edits.

A material creative evolution MUST NOT be implemented as an ordinary update to the existing Creation.

---

# 10. Publication

Publication represents a meaningful lifecycle transition.

Conceptually:

```text
Draft
  ↓
Publish
  ↓
Published Creation
```

The API SHOULD make publication intent explicit.

A User MUST NOT accidentally publish content through an unrelated metadata update.

Potential route shape:

```text
POST /creations/{creation}/publish
```

The exact contract remains implementation-specific.

---

# 11. Derived Creation

Publishing a derived Creation must preserve Lineage.

Conceptually:

```text
POST derived Creation
      │
      ├── Prompt
      ├── Media
      ├── Generation Context
      └── Source Creation
```

The authoritative application operation must ensure:

```text
Creation B created
      +
Lineage relationship to A created
```

according to Product rules.

Partial success that silently loses required Lineage is unacceptable.

---

# 12. Remix API Semantics

Remix is a Product concept, not merely a copied Creation.

The API SHOULD make derivation context explicit.

Conceptual possibilities include:

```text
POST /creations/{source}/remixes
```

or a Creation request containing explicit derivation information.

The final route form remains an implementation decision.

The semantic requirement is:

> Publishing a Remix creates a new Creation and preserves its direct source relationship.

---

# 13. Self-Derivation

The same Remix/derivation infrastructure MUST support:

```text
Author A
Creation X
   ↓
Derived Creation Y
Author A
```

No separate backend architecture is required merely because parent and child share an author.

---

# 14. Prompt Customization

Customization is private working state.

Potential API capabilities may include:

```text
Start customization
Read customization
Update working values
Preview resulting Prompt
Publish resulting Creation
```

Whether customization state requires server API persistence remains an open technical decision.

If customization remains client-side initially, publication still MUST preserve source context.

---

# 15. Authentication Strategy

Mosaic's web client requires authenticated application state for protected actions.

The initial architectural direction is:

> **Session-oriented authentication for the first-party web application**

This describes behavior, not a final technology.

Mosaic has not yet selected:

* authentication library;
* identity provider;
* cookie implementation;
* token format;
* session store;
* OAuth provider support.

---

# 16. Why Session-Oriented Authentication

Mosaic initially has:

```text
First-party web client
        ↓
Mosaic application
```

rather than an established ecosystem of independent third-party clients.

Session-oriented authentication provides a natural model for this architecture without requiring Mosaic to design a public token ecosystem prematurely.

---

# 17. Authentication Transport

🟡 **Open Technical Decision**

The exact session transport remains unresolved.

Possible mechanisms include:

* secure HTTP-only cookies;
* server-managed session identifiers;
* framework-managed sessions;
* another secure mechanism.

The Security specification will define requirements before implementation.

---

# 18. Future API Authentication

🔮 **Future Possibility**

If Mosaic later introduces:

* mobile applications;
* public developer APIs;
* external integrations;
* third-party clients;

additional authentication mechanisms may be required.

These should be introduced when those clients exist.

---

# 19. Authentication vs Authorization

Authentication answers:

```text
Who is making this request?
```

Authorization answers:

```text
May this actor perform this action
on this resource?
```

The API MUST enforce both where applicable.

---

# 20. Anonymous Requests

Public Mosaic content may be accessed anonymously where Product rules permit.

Examples may include:

```text
GET public Creation
GET public Profile
Search public Creations
Browse public Discovery
```

Protected operations require authentication.

---

# 21. Protected Operations

Examples include:

* publishing;
* Like;
* Save;
* Follow;
* Comment;
* Collection management;
* reporting;
* blocking;
* moderation actions;
* administration.

The API MUST reject protected operations when authentication requirements are not satisfied.

---

# 22. Resource Authorization

Authorization MUST be evaluated against the requested resource.

Example:

```text
PATCH /creations/A
```

requires more than:

```text
User is authenticated
```

It must also establish:

```text
User is authorized to edit Creation A
```

---

# 23. Client Is Untrusted

The API MUST assume that clients can:

* modify requests;
* bypass interface controls;
* change resource identifiers;
* replay requests;
* submit unexpected values.

Frontend restrictions improve usability.

They do not provide security.

---

# 24. Validation

API input MUST be validated before trusted domain operations occur.

Validation may include:

* required fields;
* field format;
* allowed values;
* length constraints;
* ownership;
* resource state;
* relationship validity;
* file constraints;
* domain invariants.

---

# 25. Validation Layers

Validation may exist at several layers:

```text
Request Validation
       ↓
Application Validation
       ↓
Domain Invariants
       ↓
Persistence Constraints
```

These layers serve different purposes.

Critical integrity rules SHOULD NOT rely exclusively on client validation.

---

# 26. Structured Errors

API errors SHOULD use a consistent structured representation.

Conceptually:

```json
{
  "error": {
    "code": "CREATION_NOT_EDITABLE",
    "message": "The Creation cannot be edited in its current state."
  }
}
```

Exact field names remain implementation-specific.

---

# 27. Machine-Readable Error Codes

Errors SHOULD expose stable machine-readable codes where clients need behavior-specific handling.

Examples:

```text
AUTHENTICATION_REQUIRED
FORBIDDEN
VALIDATION_FAILED
RESOURCE_NOT_FOUND
USERNAME_UNAVAILABLE
CREATION_NOT_EDITABLE
LINEAGE_CONFLICT
RATE_LIMITED
```

These are illustrative rather than a finalized error catalog.

---

# 28. Human-Readable Error Messages

API responses MAY include human-readable error descriptions.

Internal stack traces, secrets, database details, and sensitive operational information MUST NOT be exposed to ordinary clients.

---

# 29. HTTP Status Semantics

Mosaic SHOULD use HTTP status codes consistently.

Conceptually:

```text
2xx → successful operation
4xx → request / authorization / state problem
5xx → unexpected server-side failure
```

The exact status mapping will be defined with implementation conventions.

---

# 30. Resource Not Found vs Forbidden

Security-sensitive resources may require careful handling of:

```text
404 Not Found
```

versus:

```text
403 Forbidden
```

to avoid unnecessary resource-existence disclosure.

The Security specification will define where this distinction matters.

---

# 31. Pagination

Collection endpoints MUST support bounded result retrieval where result sets can grow significantly.

Examples include:

* Discovery;
* Search;
* Comments;
* Followers;
* Following;
* Notifications;
* Collections;
* Collection items;
* Lineage descendants;
* moderation queues.

---

# 32. Pagination Strategy

🟡 **Open Technical Decision**

Potential strategies include:

```text
Offset Pagination
Cursor Pagination
Hybrid Pagination
```

The strategy may differ by endpoint where justified.

For continuously changing feeds and large datasets, cursor-based approaches are likely preferable.

The exact implementation will be defined with Search, Discovery, and database decisions.

---

# 33. Pagination Stability

Pagination SHOULD minimize:

* duplicate results;
* missing results;
* unstable navigation

when data changes between requests.

Exact guarantees depend on endpoint semantics.

---

# 34. Filtering

Endpoints MAY support filtering where Product requirements justify it.

Potential examples:

```text
provider
model
category
tag
author
publication date
```

The API SHOULD NOT create arbitrary filtering capabilities that bypass privacy or authorization rules.

---

# 35. Sorting

Sorting SHOULD use explicit supported values.

Clients SHOULD NOT be permitted to submit arbitrary database expressions.

Potential conceptual values include:

```text
recent
relevant
popular
```

Actual options depend on Product decisions.

---

# 36. Search

Search should use an explicit search interface rather than pretending arbitrary database filtering is equivalent to Product Search.

Conceptually:

```text
GET /search?q=...
```

or another equivalent resource shape.

Exact Search contracts will be defined in:

```text
docs/03-technical/search.md
```

---

# 37. Field Selection

Mosaic does not initially require arbitrary client-controlled field selection.

API representations SHOULD be intentionally designed for supported client use cases.

This keeps authorization, caching, performance, and contracts understandable.

---

# 38. Resource Representations

API representations do not need to mirror persistence entities exactly.

Example:

```text
Creation API representation
```

may combine:

```text
Creation
Author summary
Media
Prompt
Generation Context
Interaction counts
Viewer-specific state
```

without implying all those values belong to one database table.

---

# 39. Viewer-Specific State

Some API representations may depend on the authenticated viewer.

Example:

```json
{
  "likedByViewer": true,
  "savedByViewer": false
}
```

Such state MUST be calculated according to the requesting actor.

It must not become public shared state on the Creation itself.

---

# 40. Public vs Private Representations

The API SHOULD distinguish between:

```text
Public representation
```

and:

```text
Owner / privileged representation
```

where necessary.

Sensitive fields MUST NOT simply rely on the frontend to hide them.

---

# 41. Creation Representation

A Creation representation may conceptually include:

```text
ID
Author
Title
Description
Media
Prompt
Generation Context
Customizable Elements
Lineage Summary
Published At
Interaction Metrics
Viewer State
```

Exact response contracts will be established during implementation.

---

# 42. Profile Representation

A public Profile MUST NOT expose private Account data.

For example:

```text
Public Profile
├── Username
├── Display Name
├── Avatar
├── Bio
└── Public activity
```

must remain separate from:

```text
Account
├── Email
├── Authentication State
└── Security Metadata
```

---

# 43. Lineage Representation

The API SHOULD support Lineage exploration without requiring an entire potentially large tree to be returned in one request.

Potential capabilities include:

```text
Direct parent
Origin
Direct children
Ancestors
Descendants
Branch navigation
```

The exact traversal endpoints will be designed after the one-vs-multiple-parent Product decision is finalized.

---

# 44. Lineage Tombstones

Unavailable intermediate Creations must not cause API responses to falsely flatten Lineage.

For:

```text
A → B → C
```

if B is unavailable:

```text
A → [Unavailable] → C
```

must remain representable.

The exact tombstone information exposed remains an open Product decision.

---

# 45. Social Actions

Social actions SHOULD expose explicit resource semantics.

Conceptually:

```text
Like Creation
Unlike Creation

Follow User
Unfollow User

Create Comment
Edit Comment
Delete Comment
```

These actions MUST preserve relationship independence.

---

# 46. Idempotency

Operations that may be retried SHOULD avoid unintended duplicate effects where practical.

This is especially important for operations such as:

* publishing;
* payments if ever introduced;
* background-triggered operations;
* moderation actions;
* potentially duplicated network submissions.

---

# 47. Naturally Idempotent Relationships

Some Mosaic actions can be designed with naturally idempotent semantics.

Example:

```text
Like Creation A
```

when the User already likes A should not create multiple active Like relationships.

Similarly:

```text
Save Creation A
```

must not create duplicate active Save relationships.

---

# 48. Idempotency Keys

🟡 **Open Technical Decision**

Explicit idempotency keys MAY be introduced for operations where retries could create expensive or irreversible duplicate effects.

The initial API does not require idempotency keys globally.

---

# 49. Concurrency

The API MUST account for concurrent requests.

Examples include:

```text
Two Like requests
Two username registrations
Two publication submissions
Concurrent Collection updates
Concurrent moderation actions
```

Persistence constraints and transactions SHOULD protect critical invariants.

---

# 50. Optimistic Concurrency

🟡 **Open Technical Decision**

Version fields, timestamps, ETags, or other optimistic-concurrency mechanisms MAY be used for resources where conflicting edits matter.

The need will be evaluated per resource.

---

# 51. Rate Limiting

The API SHOULD support rate limiting and abuse controls.

Potentially sensitive operations include:

* authentication;
* registration;
* Comment creation;
* Follow;
* Like;
* Save;
* Search;
* reporting;
* media uploads.

Exact limits remain an operational decision.

---

# 52. Rate Limits Are Contextual

Mosaic SHOULD NOT define one universal request limit for every endpoint.

Different operations have different:

* cost;
* abuse risk;
* expected frequency;
* security sensitivity.

---

# 53. Media Upload API

Large media upload SHOULD NOT unnecessarily route all binary transfer through ordinary application request processing if direct object-storage upload provides a better architecture.

A possible future flow is:

```text
Client
  ↓
Request Upload Authorization
  ↓
Application validates request
  ↓
Temporary Upload Capability
  ↓
Client uploads to Object Storage
  ↓
Application confirms Media
```

The exact design belongs to Media Storage.

---

# 54. Upload Authorization

Direct storage upload MUST NOT mean unrestricted storage access.

The application must control:

* who may upload;
* where they may upload;
* permitted file constraints;
* expiration;
* association with Mosaic resources.

---

# 55. Background Operations

Some API actions may initiate asynchronous processing.

Example:

```text
Upload media
    ↓
Media accepted
    ↓
Processing begins
```

The client may receive a processing state rather than waiting for all work to complete.

---

# 56. Asynchronous Status

Where asynchronous operations affect User experience, the API SHOULD expose enough state for the client to understand:

```text
pending
processing
ready
failed
```

Exact state names depend on the relevant domain.

---

# 57. Notifications API

Notification interfaces should support:

* bounded retrieval;
* read state;
* navigation context;
* grouping where implemented.

Changing Notification state MUST NOT mutate its source event.

---

# 58. Collections API

Collections should expose operations such as:

```text
Create Collection
Rename Collection
Delete Collection
Add Creation
Remove Creation
List Collections
List Collection Contents
```

Deleting a Collection MUST NOT delete referenced Creations.

---

# 59. Save vs Collection API

🟡 **Open Product Decision**

Because Save and Collection membership remain separate concepts, API design MUST NOT yet assume:

```text
Add to Collection = Save
```

or:

```text
Unsave = Remove from every Collection
```

The final behavior will follow the Product decision.

---

# 60. Reports API

Authenticated Users should be able to submit Reports for eligible targets.

The API must preserve:

* Reporter;
* target;
* reason;
* relevant context;
* submission time.

Report submission MUST NOT itself imply enforcement.

---

# 61. Reporter Privacy

Ordinary reported-resource APIs MUST NOT expose Reporter identity.

Moderation interfaces may access Reporter information only according to authorization and operational need.

---

# 62. Moderation API

Moderation capabilities SHOULD use protected interfaces separate from ordinary User operations.

Potential capabilities include:

```text
Review queue
Case details
Automated analysis
Record decision
Apply enforcement
Review appeal
Restore content
```

Every privileged operation requires authorization.

---

# 63. Administration API

Administrative operations SHOULD use dedicated privileged interfaces.

Examples include:

* Account-state changes;
* role assignment;
* taxonomy management;
* controlled Lineage correction;
* platform configuration.

These routes MUST NOT rely solely on frontend visibility for protection.

---

# 64. Audit Context

High-impact privileged API operations SHOULD capture enough context to support audit requirements.

Potential information includes:

```text
Actor
Action
Target
Reason
Timestamp
Relevant previous state
Relevant resulting state
```

Exact audit schema belongs to the Data Model and Security specifications.

---

# 65. API Versioning

The API SHOULD be designed with evolution in mind.

However:

> Mosaic does not need artificial version proliferation before a compatibility problem exists.

---

# 66. Initial Version Strategy

🟡 **Open Technical Decision**

Potential approaches include:

```text
/api/v1/...
```

or versioning only when breaking compatibility requires it.

The selected strategy will depend on whether the API is primarily internal to the first-party web application or becomes externally consumed.

---

# 67. Breaking Changes

A breaking API change is one that invalidates an established client contract.

Examples may include:

* removing required response fields;
* changing field meaning;
* changing authorization behavior unexpectedly;
* changing resource identity semantics.

Breaking changes SHOULD be intentional and coordinated.

---

# 68. Internal First-Party API

Initially, Mosaic's API primarily serves the Mosaic web application.

Therefore the project MAY evolve client and server contracts together more freely than a public third-party API.

This flexibility MUST NOT be used to create undocumented or unstable interfaces.

---

# 69. Public Developer API

🔮 **Future Possibility**

Mosaic may eventually expose a developer API.

Such an API would require additional decisions around:

* authentication;
* authorization scopes;
* quotas;
* versioning;
* documentation;
* abuse prevention;
* developer identities;
* API keys;
* terms of use.

These are not initial requirements.

---

# 70. API Documentation

Implemented API contracts SHOULD be documented sufficiently for development and testing.

Documentation MAY later be generated from machine-readable API definitions.

---

# 71. OpenAPI

🟡 **Open Technical Decision**

Mosaic MAY use an OpenAPI specification if compatible with the selected framework and development workflow.

OpenAPI is not required by the Product model.

If adopted, it should represent the actual API rather than become stale parallel documentation.

---

# 72. Request Identification

Requests MAY receive correlation identifiers to support debugging and observability.

These identifiers SHOULD be safe to expose and MUST NOT contain sensitive information.

---

# 73. Logging

API logging SHOULD capture operationally useful information without unnecessarily recording:

* passwords;
* authentication secrets;
* private tokens;
* sensitive personal data;
* complete private content.

Detailed logging rules belong to Security and Observability.

---

# 74. Error Correlation

Unexpected server errors SHOULD be traceable internally without exposing sensitive implementation details to the User.

A client-safe error identifier MAY be returned for support and investigation.

---

# 75. Caching

HTTP caching MAY be used where resource semantics allow it.

Potential candidates include:

* public Profiles;
* public Creation representations;
* stable metadata;
* static taxonomy.

Viewer-specific or private responses require appropriate protection.

---

# 76. Cache Authorization Safety

A cache MUST NOT accidentally serve one User's private or personalized response to another User.

Cache strategy must account for:

* authentication;
* visibility;
* viewer state;
* moderation state;
* privacy.

---

# 77. Deleted and Unavailable Resources

Unavailable resources require intentional API semantics.

The API may need to distinguish internally between:

```text
Never existed
Deleted
Moderated
Unavailable
Forbidden
```

without necessarily exposing every distinction publicly.

---

# 78. Historical References

When an unavailable entity is required to preserve historical structure, APIs SHOULD be capable of returning a safe placeholder representation.

Example:

```json
{
  "available": false,
  "type": "creation"
}
```

Exact fields remain open.

---

# 79. Data Minimization

API responses SHOULD return information required for the supported interaction rather than indiscriminately serializing entire persistence entities.

This improves:

* privacy;
* security;
* performance;
* contract clarity.

---

# 80. Sensitive Fields

Sensitive internal fields MUST NOT be exposed simply because they exist in persistence models.

Examples include:

```text
Password hashes
Internal moderation notes
Private email
Security metadata
Private audit data
Storage credentials
```

---

# 81. API and Domain Events

API requests may produce internal application events.

Example:

```text
POST Comment
     ↓
Comment Created
     ↓
Application Event
     ├── Notification
     └── Analytics
```

The client does not need to understand the internal event implementation.

---

# 82. Transaction Boundary

The API response SHOULD reflect whether the authoritative requested operation succeeded.

Secondary asynchronous consequences need not complete before success is returned.

Example:

```text
POST Comment
      ↓
Comment persisted
      ↓
Return success
      ↓
Notification processed asynchronously
```

---

# 83. Secondary Failure

If Notification processing later fails:

```text
Comment remains valid.
```

If Search indexing fails:

```text
Creation remains valid.
```

The system should recover secondary work independently.

---

# 84. API Security Baseline

Every API capability MUST consider:

```text
Authentication
Authorization
Validation
Rate / abuse controls
Privacy
Resource state
Audit requirements
```

where applicable.

---

# 85. CSRF

If Mosaic uses cookie-based authenticated sessions, state-changing requests MUST receive appropriate Cross-Site Request Forgery protection according to the selected authentication architecture.

Exact mechanisms will be defined in Security.

---

# 86. CORS

Cross-Origin Resource Sharing SHOULD default to the minimum origins and capabilities required by Mosaic's architecture.

A permissive cross-origin policy MUST NOT be used merely for development convenience in production.

---

# 87. File Inputs

File upload interfaces MUST enforce constraints appropriate to supported media.

These may include:

* file size;
* media type;
* content validation;
* upload authorization;
* processing limits.

Exact values belong to Media Storage and Security.

---

# 88. External URLs

User-provided URLs MUST be treated as untrusted input.

If Mosaic's servers later fetch external URLs, the implementation must consider server-side request risks and validation.

---

# 89. API Testing

Critical API behavior SHOULD receive automated coverage.

Important categories include:

```text
Authentication
Authorization
Validation
Publication
Lineage
Relationship uniqueness
Privacy
Moderation
Administration
```

---

# 90. Contract Testing

Where API boundaries become independently consumed, contract tests MAY be introduced to detect incompatible changes.

This becomes more important if Mosaic later develops:

* mobile clients;
* external integrations;
* independently deployed services;
* public APIs.

---

# 91. REST Resource Semantics

Mosaic SHOULD use normal HTTP resource semantics where they clearly express the operation.

Examples:

```text
GET    read
POST   create / initiate
PATCH  partial permitted modification
DELETE remove / deactivate relationship where appropriate
```

These are guidelines, not a requirement to force every domain behavior into CRUD.

---

# 92. Explicit Domain Actions

When a lifecycle transition carries important domain meaning, an explicit action MAY be clearer.

Examples:

```text
publish
appeal
restore
suspend
```

The API should optimize for domain clarity rather than ideological REST purity.

---

# 93. API Domain Boundaries

API organization SHOULD broadly reflect Modular Monolith boundaries.

Conceptually:

```text
Identity API
Profile API
Creation API
Lineage API
Social API
Collections API
Notifications API
Moderation API
Administration API
```

This does not require independent services.

---

# 94. Cross-Domain Operations

Some Product actions cross several domains.

Example:

```text
Publish Remix
      │
      ├── Creation
      ├── Prompt
      ├── Media
      ├── Generation Context
      ├── Lineage
      └── Notification consequence
```

The application layer should coordinate the authoritative operation.

The client SHOULD NOT be responsible for manually assembling several unrelated API calls in a way that can leave Mosaic in an invalid state.

---

# 95. Client Orchestration Boundary

The frontend may coordinate presentation-oriented operations.

It MUST NOT be responsible for enforcing transactional domain invariants.

Bad conceptual flow:

```text
Client creates Creation
      ↓
Client separately remembers
to create Lineage
```

Preferred conceptual flow:

```text
Client requests derived publication
      ↓
Application guarantees Creation + Lineage
```

---

# 96. API Performance

API endpoints SHOULD avoid returning unnecessarily large resource graphs.

Large relationships should use:

* pagination;
* summaries;
* dedicated endpoints;
* lazy retrieval where appropriate.

This is especially relevant to:

* Lineage;
* Comments;
* Followers;
* Collections;
* Discovery.

---

# 97. N+1 and Data Access

API design SHOULD permit efficient retrieval without requiring one persistence query per nested item.

The exact solution depends on the selected data-access technology.

This is an implementation concern that must be measured rather than solved through speculative complexity.

---

# 98. API Availability

Failure of optional or derived capabilities SHOULD not unnecessarily make unrelated API capabilities unavailable.

Example:

```text
Recommendation system unavailable
```

should not inherently prevent:

```text
GET /creations/{id}
```

from succeeding.

---

# 99. API Evolution Principle

API design follows Mosaic's architectural rule:

> **Build for evolution, not speculation.**

Therefore the API should:

* establish clear contracts;
* preserve domain semantics;
* support future clients;
* avoid unnecessary coupling;

without prematurely building:

* public API infrastructure;
* OAuth ecosystems;
* complex gateway layers;
* GraphQL federation;
* service meshes;
* multiple API versions.

---

# 100. Initial API Decisions

## API-ADR-001 — REST-Oriented HTTP API

**Status:** ✅ Decided

Mosaic will initially expose application capabilities through REST-oriented HTTP interfaces.

---

## API-ADR-002 — JSON Representation

**Status:** ✅ Decided

Structured API request and response representations will primarily use JSON.

Media binary transfer may use appropriate separate mechanisms.

---

## API-ADR-003 — Domain-Oriented API

**Status:** ✅ Decided

The API will represent Mosaic domain behavior rather than exposing database tables directly.

---

## API-ADR-004 — Server-Side Authorization

**Status:** ✅ Decided

Trusted application boundaries will enforce authorization.

Frontend visibility is not authorization.

---

## API-ADR-005 — Bounded Collection Retrieval

**Status:** ✅ Decided

Potentially large resource collections will use bounded retrieval rather than returning unbounded datasets.

---

## API-ADR-006 — First-Party Session Direction

**Status:** ✅ Decided

Mosaic's initial first-party web authentication will follow a session-oriented model.

The exact authentication technology and session transport remain open.

---

## API-ADR-007 — Cross-Domain Invariants Are Server-Coordinated

**Status:** ✅ Decided

Operations requiring multiple authoritative domain changes will be coordinated by trusted application logic rather than depending on the client to preserve invariants.

---

# 101. Open API Decisions

| Decision                         | Status                   |
| -------------------------------- | ------------------------ |
| Final route naming convention    | 🟡 Open                  |
| Authentication implementation    | 🟡 Open                  |
| Session transport                | 🟡 Open                  |
| CSRF mechanism                   | 🟡 Open                  |
| Pagination strategy              | 🟡 Open                  |
| Exact error schema               | 🟡 Open                  |
| Error-code catalog               | 🟡 Open                  |
| API versioning strategy          | 🟡 Open                  |
| OpenAPI adoption                 | 🟡 Open                  |
| Explicit idempotency-key support | 🟡 Open                  |
| Optimistic-concurrency strategy  | 🟡 Open                  |
| Rate limits                      | 🟡 Open                  |
| Media-upload protocol            | 🟡 Open                  |
| Customization persistence API    | 🟡 Open                  |
| Lineage traversal routes         | 🟡 Open                  |
| One vs multiple Lineage parents  | 🟡 Open Product Decision |
| Save ↔ Collection behavior       | 🟡 Open Product Decision |
| Blocking interaction behavior    | 🟡 Open Product Decision |
| Tombstone representation         | 🟡 Open Product Decision |
| Public developer API             | 🔮 Future Possibility    |

These decisions MUST NOT be silently finalized by implementation convenience.

---

# 102. API Summary

Mosaic's initial application interface follows:

```text
                FIRST-PARTY WEB CLIENT
                         │
                       HTTPS
                         │
                         ▼
                  REST + JSON API
                         │
              ┌──────────┼──────────┐
              │          │          │
         Authentication  │     Validation
                         │
                    Authorization
                         │
                         ▼
                 Application Layer
                         │
              Domain Operations
                         │
            ┌────────────┼────────────┐
            │            │            │
       Relational     Object      Background
       Persistence    Storage       Work
```

The API is designed around:

```text
Explicit contracts
      +
Domain behavior
      +
Trusted authorization
      +
Structured errors
      +
Bounded retrieval
      +
Historical integrity
```

rather than:

```text
Database exposure
      +
Client-enforced security
      +
Unbounded responses
      +
Premature API complexity
```

The central principle is:

> **The API exposes Mosaic's behavior. It does not expose Mosaic's database.**

---

# Related Documentation

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [User Flows](../02-specification/user-flows.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [Media Storage →](./media-storage.md)
* [Search](./search.md)
* [Security & Privacy](./security.md)
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Data Model](./data-model.md) · [Documentation Home](../README.md) · **Next:** [Media Storage →](./media-storage.md)
