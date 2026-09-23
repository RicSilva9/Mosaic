# Scalability

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Infrastructure & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines Mosaic's technical approach to scalability.

Scalability means allowing the platform to handle increasing:

* Users;
* Creations;
* Media;
* interactions;
* Search traffic;
* background work;
* notifications;
* moderation workload;
* storage;
* bandwidth

without requiring unnecessary redesign of the Product domain.

Mosaic follows the principle:

> **Scale from evidence, not imagination.**

The architecture should preserve clear paths for growth without introducing distributed-system complexity before it solves a real problem.

---

# 1. Scalability Philosophy

Mosaic follows:

```text
Simple architecture
        ↓
Measure
        ↓
Identify bottleneck
        ↓
Optimize
        ↓
Scale component
        ↓
Measure again
```

rather than:

```text
Predict hypothetical massive scale
        ↓
Introduce distributed architecture
        ↓
Increase complexity
        ↓
Operate problems that do not yet exist
```

---

# 2. Initial Architecture

Mosaic begins as a:

> **Modular Monolith**

with explicit internal domain boundaries.

This architecture is compatible with meaningful scale.

A Monolith does not inherently mean:

```text
Single server forever
```

or:

```text
Everything runs in one process
```

---

# 3. Modular Monolith Scaling

The same application codebase may operate through multiple runtime processes.

Conceptually:

```text
                    Load Balancer
                         │
             ┌───────────┼───────────┐
             │           │           │
          App A        App B        App C
             │           │           │
             └───────────┼───────────┘
                         │
                   Shared Services
```

This allows horizontal application scaling without requiring Microservices.

---

# 4. Microservices

Mosaic will NOT initially adopt Microservices merely for theoretical scalability.

Microservices introduce additional requirements such as:

* service discovery;
* inter-service communication;
* distributed authentication;
* distributed tracing;
* network failure handling;
* deployment coordination;
* eventual consistency;
* message infrastructure;
* independent service monitoring;
* operational complexity.

These costs should correspond to a demonstrated benefit.

---

# 5. Extraction Principle

A Modular Monolith domain MAY later become an independently deployed service when there is a concrete reason.

Potential reasons include:

* independent scaling requirements;
* resource isolation;
* reliability isolation;
* security isolation;
* specialized infrastructure;
* independent deployment needs;
* organizational ownership.

Extraction is an optimization, not an initial goal.

---

# 6. Domain Boundaries

Mosaic's modular boundaries help future scaling.

Conceptually:

```text
Identity
Profiles
Creations
Prompts
Lineage
Media
Social
Collections
Discovery
Search
Notifications
Moderation
Administration
```

Modules should communicate through explicit application boundaries rather than uncontrolled cross-module data access.

---

# 7. Scale Dimensions

Mosaic does not have one single "scale."

Different systems scale differently.

Examples:

```text
Users
Creations
Media bytes
Video bandwidth
Search queries
Comments
Likes
Saves
Notifications
Lineage relationships
Background jobs
Moderation reports
```

Each may require a different response.

---

# 8. Scale by Bottleneck

Mosaic SHOULD scale the constrained resource rather than automatically scaling every component.

Example:

```text
Media bandwidth grows
        ↓
Improve CDN / Media delivery
```

does not inherently require:

```text
Split User service
Split Collection service
Split Comment service
```

---

# 9. Application Horizontal Scaling

Application processes SHOULD be capable of horizontal scaling where practical.

Conceptually:

```text
Request
   ↓
Load Distribution
   ↓
Any Healthy Application Instance
```

This favors minimizing unnecessary process-local authoritative state.

---

# 10. Stateless Application Direction

Ordinary request handling SHOULD remain stateless between requests where practical.

Persistent authoritative state belongs in shared infrastructure such as:

* relational persistence;
* object storage;
* approved session persistence;
* background-job infrastructure.

---

# 11. Process Memory

Application memory MAY be used for:

* temporary computation;
* local caches;
* configuration;
* request-local state.

It MUST NOT become the only authoritative location for Product state that must survive process restart.

---

# 12. Session Scalability

Session architecture must support multiple application instances.

A session MUST NOT require every request to return permanently to one specific application process unless explicitly justified.

Potential strategies depend on the final authentication implementation.

---

# 13. Database as Source of Truth

The relational database remains Mosaic's primary authoritative persistence system for structured Product data.

This includes relationships such as:

```text
User
Creation
Lineage
Follow
Like
Comment
Save
Collection
Moderation state
```

---

# 14. Database Scaling Philosophy

Mosaic should first scale the relational database through appropriate conventional techniques before introducing distributed persistence.

Potential techniques include:

* correct indexes;
* query optimization;
* connection management;
* pagination;
* data-access improvements;
* caching;
* read replicas where justified;
* archival strategies where justified.

---

# 15. Database Indexes

Indexes SHOULD reflect real query patterns.

Mosaic SHOULD NOT create large numbers of speculative indexes.

Every index has costs such as:

* storage;
* write overhead;
* maintenance.

Index strategy should evolve from actual access patterns.

---

# 16. Query Performance

Slow queries SHOULD be investigated before assuming more infrastructure is required.

Potential causes include:

```text
Missing index
N+1 access
Unbounded query
Poor filtering
Large joins
Inefficient aggregation
```

---

# 17. Database Connection Management

As application instances increase, database connections can become a scalability constraint.

Mosaic SHOULD use appropriate connection management for the selected database and deployment architecture.

🟡 **Open Infrastructure Decision**

Whether a dedicated connection pooler is required will depend on the selected environment.

---

# 18. Read Replicas

🔮 **Future Scaling Option**

Read replicas may become useful if read traffic significantly exceeds what the primary database should serve.

They are not assumed initially.

Replica lag and consistency requirements must be considered before adoption.

---

# 19. Database Partitioning

🔮 **Future Scaling Option**

Table partitioning may become useful for sufficiently large datasets such as:

* audit records;
* notifications;
* analytics events;
* high-volume interaction history.

Partitioning should solve measured operational problems.

---

# 20. Database Sharding

🔮 **Future Scaling Option**

Mosaic does not initially require database sharding.

Sharding introduces substantial complexity around:

* transactions;
* joins;
* routing;
* migrations;
* uniqueness;
* Lineage;
* operational recovery.

It should only be considered if simpler database-scaling approaches become insufficient.

---

# 21. Relationship Scale

Social relationships can grow substantially.

Examples include:

```text
Follow
Like
Save
Comment
Collection Membership
```

These relationships SHOULD use:

* appropriate indexes;
* uniqueness constraints;
* bounded retrieval;
* efficient existence checks.

---

# 22. Lineage Scale

Creative Lineage may form large trees over time.

Mosaic MUST NOT assume every Lineage can be loaded entirely into memory or returned in one API response.

---

# 23. Lineage Traversal

Large Lineages SHOULD use bounded traversal.

Potential operations include:

```text
Direct Parent
Direct Children
Ancestors
Bounded Descendants
Branch Navigation
```

Full-tree retrieval should not be required for ordinary interaction.

---

# 24. Lineage Metrics

Metrics such as total descendants may become expensive to calculate repeatedly.

Mosaic MAY eventually use:

* cached counts;
* asynchronously maintained projections;
* precomputed aggregates.

Such values remain derived data.

---

# 25. Lineage Integrity

Scalability optimizations MUST NOT weaken:

* direct-parent preservation;
* acyclic relationships;
* historical integrity;
* attribution.

Performance optimization cannot silently flatten Lineage.

---

# 26. Media Scaling

Media is expected to scale differently from ordinary application data.

Conceptually:

```text
Application
    │
    ├── Media Metadata → Database
    │
    └── Media Bytes → Object Storage
```

This prevents large binary storage from unnecessarily scaling the relational database.

---

# 27. Media Delivery Scaling

Media playback SHOULD be served through infrastructure designed for large-object delivery.

Potential architecture:

```text
User
 ↓
CDN / Delivery Layer
 ↓
Object Storage
```

rather than:

```text
User
 ↓
Application Server
 ↓
Application streams every video byte
```

---

# 28. CDN Scaling

A CDN MAY absorb a large portion of repeated public Media delivery.

This can reduce:

* origin bandwidth;
* latency;
* storage-origin load.

The exact CDN strategy remains open.

---

# 29. Media Processing Scaling

Media processing can be CPU- and resource-intensive.

Processing capacity SHOULD be capable of scaling independently from ordinary web request capacity.

Conceptually:

```text
Uploads
   ↓
Job Queue
   ↓
┌────────┬────────┬────────┐
│Worker A│Worker B│Worker C│
└────────┴────────┴────────┘
```

---

# 30. Worker Scaling

Background workers MAY scale horizontally according to queue demand.

The application does not need Microservices merely to run multiple worker processes.

---

# 31. Queue Backpressure

Background infrastructure SHOULD handle situations where incoming work temporarily exceeds processing capacity.

Instead of losing work:

```text
Incoming Jobs
      ↓
Queue
      ↓
Workers process at available capacity
```

Queue growth should be observable.

---

# 32. Backpressure

Mosaic SHOULD protect infrastructure from uncontrolled work amplification.

Potential strategies include:

* queue limits;
* upload limits;
* concurrency limits;
* rate limits;
* prioritization;
* controlled degradation.

Exact strategies depend on workload.

---

# 33. Job Priority

🟡 **Open Technical Decision**

Some background work may eventually require priority levels.

Example:

```text
Security / Moderation removal
        >
ordinary analytics processing
```

The initial job infrastructure does not need complex priority scheduling unless required.

---

# 34. Job Idempotency

Retrying background work SHOULD avoid duplicate side effects where practical.

Examples include:

* duplicate Notification creation;
* duplicate Media derivatives;
* duplicate Search indexing;
* duplicate moderation consequences.

---

# 35. Search Scaling

Initial Search is database-backed.

Mosaic should migrate to dedicated Search infrastructure only when requirements justify it.

Potential triggers include:

* unacceptable Search latency;
* Search workload harming transactional operations;
* advanced ranking requirements;
* independent Search scaling;
* semantic retrieval becoming important.

---

# 36. Dedicated Search Scaling

A future Search engine may scale independently from the authoritative database.

Conceptually:

```text
Database
   ↓
Indexing
   ↓
Search Cluster
   ↓
Search Queries
```

Search remains derived.

---

# 37. Search Failure Isolation

Failure of future Search infrastructure SHOULD NOT inherently prevent:

* direct Creation retrieval;
* authentication;
* Profile access;
* unrelated Product operations.

---

# 38. Discovery Scaling

Discovery and Feed queries may become high-volume read workloads.

Potential future optimizations include:

* caching;
* precomputed candidate sets;
* ranking projections;
* asynchronous aggregation;
* dedicated recommendation infrastructure.

None are required merely because Mosaic has a Feed.

---

# 39. Feed Architecture

🟡 **Open Future Technical Decision**

Mosaic has not selected between strategies such as:

```text
Fan-out on read
Fan-out on write
Hybrid feed generation
```

The decision should follow real User and Following graph characteristics.

---

# 40. Fan-Out on Read

Conceptually:

```text
User opens Feed
      ↓
Retrieve relevant sources
      ↓
Rank / combine
      ↓
Return Feed
```

This may be simple initially.

---

# 41. Fan-Out on Write

Conceptually:

```text
Creation Published
      ↓
Precompute / distribute Feed entries
      ↓
Followers read prepared Feed
```

This can improve read performance at the cost of more write complexity.

Mosaic does not initially require it.

---

# 42. High-Follower Accounts

If some Users eventually have very large follower counts, naive feed fan-out strategies may become expensive.

This should be handled when actual graph characteristics justify it.

---

# 43. Notifications Scaling

Notification creation SHOULD support asynchronous consequences.

Example:

```text
Comment Created
      ↓
Domain operation succeeds
      ↓
Notification job
      ↓
Notification created
```

Notification processing failure must not invalidate the Comment.

---

# 44. Notification Fan-Out

Some events may affect many recipients.

Mosaic SHOULD avoid creating enormous synchronous notification workloads inside interactive requests.

---

# 45. Notification Grouping

Grouping high-frequency Notifications may reduce:

* storage;
* delivery volume;
* User overload.

Grouping is a Product and technical concern, not merely a scalability optimization.

---

# 46. Social Counter Scaling

Counts such as:

```text
Likes
Comments
Saves
Followers
Remixes
```

may become expensive if repeatedly calculated from large relationship tables.

---

# 47. Derived Counters

Mosaic MAY use cached or denormalized counters where justified.

Conceptually:

```text
Authoritative Like rows
        ↓
Derived Like Count
```

The relationship rows remain authoritative.

---

# 48. Counter Consistency

Derived counters may tolerate limited eventual consistency where Product behavior allows it.

Security, ownership, and authorization decisions MUST NOT rely on approximate counters.

---

# 49. Cache Architecture

Caching MAY be introduced where measurement shows meaningful benefit.

Potential cache targets include:

* public Creation summaries;
* public Profiles;
* expensive aggregates;
* Discovery results;
* taxonomy;
* session data where architecture requires it.

---

# 50. Cache Is Derived

Cache contents are not authoritative.

Conceptually:

```text
Authoritative Data
       ↓
Cache
       ↓
Fast Retrieval
```

Loss of cache should degrade performance, not destroy Product truth.

---

# 51. Cache Introduction

Mosaic does not require a dedicated distributed cache on day one.

A cache system should be introduced when:

* repeated computation is expensive;
* database pressure justifies it;
* latency requirements justify it;
* session/job infrastructure requires it.

---

# 52. Cache Invalidation

Caching introduces invalidation complexity.

Mosaic SHOULD cache intentionally rather than broadly.

Security-sensitive visibility changes require appropriate invalidation behavior.

---

# 53. Cache Stampede

🔮 **Future Scaling Concern**

If high-traffic cached values expire simultaneously, many requests may regenerate the same expensive value.

Mitigations may be introduced when required.

---

# 54. Rate Limiting and Scale

Rate limiting protects both Security and infrastructure capacity.

Expensive operations may require stricter controls than cheap reads.

Exact limits remain open.

---

# 55. Load Shedding

🔮 **Future Scaling Capability**

Under extreme load, Mosaic may intentionally reject or defer lower-priority work to preserve critical functionality.

Potential priorities may include:

```text
Authentication
Core Creation access
Security actions
        >
Non-critical analytics
Optional recommendations
```

Exact policy would require operational evidence.

---

# 56. Graceful Degradation

Mosaic SHOULD prefer partial functionality over unnecessary total outage when optional systems fail.

Examples:

```text
Recommendations unavailable
        ↓
Basic Discovery remains
```

```text
Search unavailable
        ↓
Direct Creation access remains
```

```text
Notification worker delayed
        ↓
Comment creation remains available
```

---

# 57. Failure Domains

The architecture SHOULD reduce unnecessary coupling between unrelated failure domains.

This does not require independent Microservices.

Examples include separating:

* Media processing from web requests;
* background jobs from interactive operations;
* object storage from database storage;
* derived Search from authoritative persistence.

---

# 58. External Provider Failure

External provider outages SHOULD degrade the capabilities that depend on them rather than automatically corrupting Mosaic state.

Potential providers include:

* email;
* object storage;
* Media processing;
* monitoring;
* future AI services.

---

# 59. Timeouts

Calls to external infrastructure SHOULD use intentional timeout behavior.

A request SHOULD NOT wait indefinitely for a dependency.

Exact timeout values depend on the dependency.

---

# 60. Retries

Recoverable infrastructure operations MAY be retried.

Retries SHOULD consider:

* idempotency;
* exponential backoff;
* attempt limits;
* failure classification.

Blind infinite retries are unacceptable.

---

# 61. Circuit Breaking

🔮 **Future Scaling/Reliability Option**

Circuit-breaking patterns may become useful if external dependencies repeatedly fail.

They are not automatically required initially.

---

# 62. Asynchronous Work

Work that does not need to complete before the User receives a successful authoritative response SHOULD be considered for asynchronous processing.

Potential examples include:

```text
Notifications
Media processing
Search indexing
Analytics
Some moderation analysis
Derived counters
```

---

# 63. Synchronous Core

Critical domain transitions should remain synchronous when the User needs authoritative confirmation.

Example:

```text
Publish Derived Creation
      ↓
Creation + required Lineage relationship
must succeed authoritatively
```

The system must not acknowledge successful publication before required core invariants exist.

---

# 64. Eventual Consistency

Derived systems MAY use eventual consistency.

Potential examples:

* Search index;
* Notification delivery;
* analytics;
* derived counts;
* recommendations.

---

# 65. Stronger Consistency

Core invariants require stronger guarantees.

Examples include:

```text
Unique username
One active Like per User/Creation
One active Save per User/Creation
Creation authorship
Direct Lineage parent
Role assignment
```

The exact transactional mechanisms belong to implementation.

---

# 66. Transaction Boundaries

Mosaic SHOULD keep authoritative transactions focused and understandable.

Distributed transactions across external systems SHOULD be avoided where possible.

---

# 67. External Side Effects

External side effects should often occur after authoritative local state succeeds.

Example:

```text
Creation Published
      ↓
Commit authoritative transaction
      ↓
Trigger Notification / Search / Analytics
```

---

# 68. Reliable Event Publication

🟡 **Open Technical Decision**

If Mosaic later depends heavily on asynchronous domain events, it may require a reliable event-publication mechanism such as an outbox pattern or equivalent.

This should be introduced when event reliability requirements justify it.

---

# 69. Event Bus

Mosaic does NOT initially require a distributed event bus.

Internal application events and background jobs may satisfy initial requirements.

---

# 70. Message Broker

🟡 **Open Technical Decision**

The selected background-job technology may or may not require a dedicated broker.

This depends on the eventual runtime and deployment stack.

---

# 71. Read Models

Mosaic MAY introduce specialized read models for high-volume or complex queries.

Examples include:

* Discovery projections;
* Lineage summaries;
* moderation queues;
* aggregate statistics.

These remain derived from authoritative state.

---

# 72. CQRS

Mosaic does NOT initially adopt full CQRS as an architectural requirement.

Separate read projections may be used pragmatically without redesigning the entire system around CQRS.

---

# 73. Event Sourcing

Mosaic does NOT initially use Event Sourcing as the primary persistence model.

Auditability and historical integrity do not require every domain entity to be reconstructed from an event stream.

---

# 74. Analytics Scaling

Analytics workloads SHOULD NOT unnecessarily compete with transactional application workloads.

As volume grows, analytics data may move to infrastructure designed for analytical queries.

---

# 75. Analytics Is Derived

Analytics MUST NOT become the authoritative source for Product relationships.

Example:

```text
Analytics says User liked Creation
```

does not replace the authoritative Like relationship.

---

# 76. Logging Scale

Application logs can grow rapidly.

Logging SHOULD remain:

* structured;
* useful;
* privacy-aware;
* retention-controlled.

Logging every possible event indefinitely is not a scalability strategy.

---

# 77. Audit Scale

Audit records may require longer retention and stronger integrity than ordinary logs.

They may eventually require specialized storage or partitioning.

The initial architecture need not separate them physically unless requirements justify it.

---

# 78. Moderation Scaling

Moderation workload can increase with platform activity.

Mosaic's hybrid model allows:

```text
Reports
   ↓
Automated / AI-assisted Triage
   ↓
Priority
   ↓
Human Review where required
```

This reduces the need for every signal to receive identical manual handling.

---

# 79. Moderation Queue

Moderation interfaces SHOULD support bounded and prioritized case retrieval.

The entire report history MUST NOT need to load into one operational view.

---

# 80. Duplicate Reports

Equivalent duplicate reports may be grouped or deprioritized according to Product rules.

This helps prevent report volume from linearly increasing human workload.

---

# 81. Administrative Scaling

Administrative interfaces should use:

* pagination;
* filters;
* bounded queries;
* audit trails.

Administrative scale should not justify unrestricted database access.

---

# 82. Storage Growth

Mosaic SHOULD monitor growth across:

```text
Database
Object Storage
Backups
Logs
Audit Records
Search Indexes
Analytics
```

Each has different lifecycle and retention requirements.

---

# 83. Retention as Scalability

Retention policies can affect infrastructure growth.

However:

> **Data MUST NOT be deleted merely to solve a scalability problem when Product, privacy, audit, or legal requirements require retention.**

Retention is a policy decision informed by multiple concerns.

---

# 84. Archival

🔮 **Future Scaling Option**

Cold or historical data may eventually be archived where appropriate.

Archived data must preserve required historical and recovery semantics.

---

# 85. Pagination

Potentially large collections MUST use bounded retrieval.

This includes:

```text
Search Results
Comments
Followers
Following
Notifications
Collections
Collection Items
Moderation Queues
Lineage Descendants
```

---

# 86. Cursor Pagination

Cursor-based pagination may become preferable for:

* dynamic feeds;
* high-volume ordered datasets;
* continuously changing result sets.

Exact pagination remains an API-level decision.

---

# 87. Unbounded Endpoints

Mosaic MUST avoid endpoints conceptually equivalent to:

```text
GET every Creation
GET every User
GET every Comment
GET entire Lineage forever
```

without bounded retrieval.

---

# 88. Batch Operations

Batch operations MAY improve efficiency for selected internal workloads.

They must preserve:

* authorization;
* partial-failure semantics;
* auditability;
* domain invariants.

---

# 89. Bulk Administration

Future bulk administrative operations require particular care because a single action may affect many resources.

Bulk capabilities SHOULD include appropriate safeguards and audit context.

---

# 90. Geographic Scaling

Mosaic does not initially require multi-region active-active infrastructure.

A single appropriate deployment region is sufficient until concrete requirements justify geographic distribution.

---

# 91. Multi-Region Deployment

🔮 **Future Scaling Option**

Multi-region architecture may eventually improve:

* latency;
* resilience;
* geographic availability.

It also complicates:

* consistency;
* database writes;
* session management;
* deployment;
* observability;
* Media storage;
* incident response.

---

# 92. Data Residency

Geographic expansion may introduce data-residency requirements.

Infrastructure architecture should not make future compliance unnecessarily difficult, but Mosaic will not speculate about specific regional obligations here.

---

# 93. Vertical Scaling

Increasing resources available to an existing component is a valid scaling strategy.

Examples include:

```text
More CPU
More Memory
Faster Database
Larger Worker
```

Vertical scaling should not be dismissed merely because horizontal scaling exists.

---

# 94. Horizontal Scaling

Horizontal scaling becomes useful when workloads can be distributed across multiple instances.

Potential candidates include:

```text
Web Application
Background Workers
Media Processing
Future Search
```

---

# 95. Cost Efficiency

Scalability includes economic sustainability.

An architecture capable of enormous traffic but prohibitively expensive at small scale is not necessarily appropriate.

Mosaic should consider:

```text
Performance
Reliability
Complexity
Cost
```

together.

---

# 96. Cost Visibility

Infrastructure should eventually make major cost drivers observable.

Likely categories include:

* Media storage;
* Media bandwidth;
* processing;
* database;
* Search;
* background jobs;
* monitoring.

---

# 97. Premature Optimization

Mosaic SHOULD avoid optimizations that:

* increase complexity significantly;
* have no measured bottleneck;
* reduce maintainability;
* create vendor lock-in without benefit;
* make Product development slower.

---

# 98. Performance Measurement

Scaling decisions SHOULD be informed by:

* metrics;
* profiling;
* traces;
* database analysis;
* queue behavior;
* infrastructure utilization;
* realistic load tests.

Guessing should not substitute for measurement.

---

# 99. Capacity Planning

As Mosaic approaches real production traffic, capacity planning MAY estimate:

```text
Requests
Concurrent Users
Database Load
Storage Growth
Media Bandwidth
Worker Throughput
```

Early estimates should remain revisable.

---

# 100. Load Testing

Load tests SHOULD target realistic Product workflows rather than meaningless request volume.

Examples include:

```text
Browse Discovery
Open Creation
Search
Publish Creation
Upload Media
Like
Comment
Save
Explore Lineage
```

---

# 101. Scaling Trigger

A scaling change SHOULD have a concrete reason.

Good examples:

```text
Database CPU remains saturated
Search latency exceeds accepted target
Media queue grows faster than workers drain it
Bandwidth cost becomes excessive
A query repeatedly dominates database load
```

Poor example:

```text
"We might have millions of Users someday."
```

---

# 102. Extraction Trigger

A module should not become a service solely because it has a domain name.

Potential extraction evidence includes:

```text
Independent scaling need
Independent reliability need
Specialized runtime
Deployment bottleneck
Security isolation requirement
Clear ownership boundary
```

---

# 103. Reversibility

Where practical, scaling changes SHOULD preserve the ability to revise architecture.

Examples include:

* derived caches;
* rebuildable Search indexes;
* provider adapters;
* replaceable job infrastructure.

---

# 104. Provider Independence

Mosaic should avoid unnecessary coupling between Product semantics and infrastructure-provider concepts.

Provider-specific capabilities may still be used when they provide meaningful value.

Independence does not mean refusing useful managed services.

---

# 105. Managed Services

Managed infrastructure MAY reduce operational burden.

Potential candidates include:

```text
Database
Object Storage
CDN
Queues
Search
Monitoring
```

Selection should consider:

* cost;
* reliability;
* operational effort;
* portability;
* Product stage.

---

# 106. Scaling and Deployment

Deployment architecture should support adding application or worker capacity without redesigning Mosaic's Product model.

Exact hosting architecture belongs to `deployment.md`.

---

# 107. Scaling and Observability

Mosaic cannot scale responsibly without observing where constraints occur.

The next technical specification defines:

```text
Metrics
Logs
Tracing
Health
Alerts
Operational visibility
```

---

# 108. Scaling and Testing

Performance and load testing should verify scaling assumptions before expensive architecture changes are introduced.

---

# 109. Scaling and Security

Scaling MUST NOT bypass security.

Examples:

```text
Direct storage upload
        ↓
still authorized
```

```text
Cache
        ↓
still privacy-aware
```

```text
Read replica
        ↓
still respects access rules
```

---

# 110. Scaling and Historical Integrity

Optimization MUST NOT silently change Mosaic's historical model.

For example:

```text
A → B → C
```

cannot become:

```text
A → C
```

because flattening the relationship makes retrieval cheaper.

---

# 111. Scalability Decisions

## SCALE-ADR-001 — Scale the Modular Monolith First

**Status:** ✅ Decided

Mosaic will scale its Modular Monolith through appropriate application, database, worker, storage, and delivery techniques before introducing Microservices.

---

## SCALE-ADR-002 — Horizontal Application Scaling

**Status:** ✅ Decided

Application architecture will permit multiple application instances where deployment requires them.

---

## SCALE-ADR-003 — Independent Worker Scaling

**Status:** ✅ Decided

Background-processing capacity may scale independently from interactive application capacity.

---

## SCALE-ADR-004 — Scale by Bottleneck

**Status:** ✅ Decided

Infrastructure changes should target measured constraints rather than hypothetical platform size.

---

## SCALE-ADR-005 — Derived Data May Scale Independently

**Status:** ✅ Decided

Search indexes, caches, counters, analytics, and other derived representations may use specialized scalable infrastructure without becoming authoritative Product state.

---

## SCALE-ADR-006 — Bounded Retrieval

**Status:** ✅ Decided

Potentially large collections and graph traversals will use bounded retrieval.

---

## SCALE-ADR-007 — No Premature Microservices

**Status:** ✅ Decided

Microservices will not be introduced solely for theoretical scalability.

---

## SCALE-ADR-008 — No Initial Database Sharding

**Status:** ✅ Decided

Mosaic will use conventional relational database scaling techniques before considering sharding.

---

## SCALE-ADR-009 — No Initial Multi-Region Requirement

**Status:** ✅ Decided

Mosaic does not require active-active multi-region deployment initially.

---

## SCALE-ADR-010 — Preserve Domain Integrity While Scaling

**Status:** ✅ Decided

Scalability optimizations MUST preserve Mosaic's authoritative domain rules, authorization, attribution, and Lineage.

---

# 112. Open Scalability Decisions

| Decision                             | Status                               |
| ------------------------------------ | ------------------------------------ |
| Database connection-pooling strategy | 🟡 Open                              |
| Dedicated cache                      | 🟡 Open                              |
| Cache technology                     | 🟡 Open                              |
| Background-job technology            | 🟡 Open                              |
| Message broker                       | 🟡 Open                              |
| Job priority model                   | 🟡 Open                              |
| Reliable event/outbox mechanism      | 🟡 Open                              |
| CDN provider                         | 🟡 Open                              |
| Search extraction threshold          | 🟡 Open                              |
| Read replicas                        | 🔮 Future Scaling Option             |
| Database partitioning                | 🔮 Future Scaling Option             |
| Database sharding                    | 🔮 Future Scaling Option             |
| Feed fan-out strategy                | 🟡 Open Future Decision              |
| Dedicated analytics infrastructure   | 🔮 Future Scaling Option             |
| Data archival                        | 🔮 Future Scaling Option             |
| Multi-region architecture            | 🔮 Future Scaling Option             |
| Load-shedding policy                 | 🔮 Future Scaling Capability         |
| Circuit breakers                     | 🔮 Future Scaling/Reliability Option |
| Capacity targets                     | 🟡 Open                              |
| Formal scaling thresholds            | 🟡 Open                              |
| Infrastructure cost budgets          | 🟡 Open                              |

These decisions should be made from operational evidence or concrete Delivery requirements.

---

# 113. Scalability Architecture Summary

Initial architecture:

```text
                         USERS
                           │
                           ▼
                     LOAD / ROUTING
                           │
                ┌──────────┼──────────┐
                │          │          │
              APP        APP        APP
                │          │          │
                └──────────┼──────────┘
                           │
           ┌───────────────┼────────────────┐
           │               │                │
           ▼               ▼                ▼
      RELATIONAL       OBJECT           BACKGROUND
       DATABASE        STORAGE            QUEUE
                                            │
                                   ┌────────┼────────┐
                                   │        │        │
                                 WORKER   WORKER   WORKER
```

Potential evolution:

```text
                    MODULAR MONOLITH
                           │
          ┌────────────────┼────────────────┐
          │                │                │
      Application      Background        Media
        Scaling          Scaling         Delivery
          │                │                │
          ▼                ▼                ▼
      App Instances     Workers        CDN / Storage
          │
          ▼
       Database
          │
    ┌─────┼─────┐
    │     │     │
Indexes Cache  Read Replica
      when justified

Derived capabilities may later scale independently:

Search
Notifications
Analytics
Recommendations
Media Processing
```

The scaling process remains:

```text
Measure
   ↓
Find Bottleneck
   ↓
Apply Simplest Effective Change
   ↓
Validate
   ↓
Repeat
```

The architecture prioritizes:

```text
Measured growth
      +
Clear domain boundaries
      +
Horizontal application scaling
      +
Independent background work
      +
Specialized Media delivery
      +
Bounded data access
      +
Rebuildable derived systems
```

rather than:

```text
Premature Microservices
      +
Premature Sharding
      +
Premature Multi-Region
      +
Speculative infrastructure
```

The central principle is:

> **Mosaic should be easy to operate while small, capable of growing when needed, and never made complex merely to prove that it could scale.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
* [Publications](../01-product/publications.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery & Search](../01-product/discovery.md)
* [Notifications](../01-product/notifications.md)
* [Moderation & Trust](../01-product/moderation.md)

## Specification

* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Search](./search.md)
* [Security & Privacy](./security.md)
* [Observability →](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Security & Privacy](./security.md) · [Documentation Home](../README.md) · **Next:** [Observability →](./observability.md)
