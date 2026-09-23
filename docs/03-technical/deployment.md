# Deployment

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Operations & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines Mosaic's technical deployment principles.

Deployment covers the process through which tested application changes become available in a running environment.

It includes:

* environments;
* builds;
* configuration;
* secrets;
* database migrations;
* application deployment;
* worker deployment;
* release validation;
* rollback and recovery;
* deployment observability.

Mosaic follows the principle:

> **Deployment should be repeatable, observable, recoverable, and boring.**

A deployment should not depend on undocumented manual knowledge.

---

# 1. Deployment Goals

Mosaic's deployment architecture should support:

```text
Repeatability
Automation
Security
Traceability
Validation
Recovery
Observability
Scalability
```

The deployment process should evolve with the Product without becoming unnecessarily complex.

---

# 2. Deployment Philosophy

Mosaic should prefer:

```text
Small understandable releases
        +
Automated validation
        +
Repeatable deployment
        +
Observable results
        +
Recovery capability
```

rather than:

```text
Large manual releases
        +
Undocumented steps
        +
Production experimentation
        +
Hope
```

---

# 3. Deployment Is Not Hosting

Deployment defines how Mosaic releases software.

Hosting defines where Mosaic runs.

These are related but separate concerns.

This document does NOT select a hosting provider.

---

# 4. Initial Deployment Model

Mosaic begins as a Modular Monolith.

Conceptually:

```text
Application Codebase
        │
        ├── Web / API Runtime
        │
        └── Background Worker Runtime
```

These runtimes may use the same codebase while scaling and operating independently.

---

# 5. Deployable Units

Initial deployable responsibilities may include:

```text
Web Application / API
Background Workers
Database Migrations
```

External infrastructure may include:

```text
Relational Database
Object Storage
CDN / Delivery Layer
Job Infrastructure
Observability
Email
```

depending on final technology choices.

---

# 6. Monolith Does Not Mean One Runtime

The Modular Monolith does not require:

```text
One machine
+
One process
+
One deployment instance
```

The same application may run through multiple web and worker processes.

---

# 7. Environment Model

Mosaic SHOULD distinguish environments with different purposes.

Conceptually:

```text
Development
     ↓
Validation / Staging
     ↓
Production
```

The exact number of environments depends on Delivery requirements.

---

# 8. Development Environment

Development supports local engineering work.

It SHOULD allow developers to:

* run Mosaic;
* run tests;
* use safe local configuration;
* inspect failures;
* develop without production credentials.

---

# 9. Local Dependencies

Local development MAY use:

* local services;
* containers;
* emulators;
* managed development resources;
* controlled test doubles.

Exact development infrastructure remains open.

---

# 10. Development Data

Local development MUST NOT depend on real production User data.

Synthetic or intentionally created development data is preferred.

---

# 11. Validation Environment

Mosaic SHOULD eventually have an environment suitable for integration and release validation before meaningful production deployment.

It may be called:

```text
Staging
Preview
Validation
Test Environment
```

The exact topology remains open.

---

# 12. Production Environment

Production is the environment containing real Mosaic User activity and authoritative production data.

Production access and changes require stronger controls than local development.

---

# 13. Environment Separation

Production SHOULD be isolated appropriately from non-production environments.

Separation may include:

* credentials;
* databases;
* object storage;
* provider configuration;
* sessions;
* API keys;
* job infrastructure.

---

# 14. Production Credentials

Production secrets MUST NOT be reused casually in local or test environments.

---

# 15. Environment Parity

Non-production environments SHOULD resemble production where meaningful enough to detect integration problems.

Exact infrastructure does not need to be identical when doing so creates unnecessary cost or complexity.

---

# 16. Configuration

Environment-specific behavior SHOULD be configured externally rather than requiring source-code modification for each deployment.

Potential configuration includes:

```text
Database connection
Storage configuration
Email provider
Application origin
Session configuration
Observability
Feature configuration
```

---

# 17. Configuration Validation

Required configuration SHOULD be validated when the application starts or before deployment completes.

Missing critical configuration should fail clearly rather than producing unpredictable runtime behavior.

---

# 18. Configuration Typing

Where the selected runtime permits it, configuration SHOULD be parsed and validated into explicit expected types.

For example:

```text
PORT = integer
FEATURE_ENABLED = boolean
```

rather than treating every configuration value as unchecked text.

---

# 19. Secrets

Secrets MUST NOT be committed to source control.

Examples include:

* database passwords;
* session secrets;
* API keys;
* storage credentials;
* private cryptographic keys.

---

# 20. Secret Management

Production secrets SHOULD be supplied through secure deployment or secret-management infrastructure.

Exact technology remains open.

---

# 21. Secret Exposure

Secrets SHOULD NOT be:

* printed in logs;
* returned through APIs;
* exposed to client-side bundles;
* included in error pages.

---

# 22. Client Configuration

Values delivered to browser code MUST be treated as public.

A value does not become secret merely because it is stored in an environment variable during frontend build.

---

# 23. Secret Rotation

The architecture SHOULD permit credentials and secrets to be rotated without redesigning Product behavior.

Exact rotation procedures depend on selected providers.

---

# 24. Build Process

Mosaic SHOULD have a repeatable build process.

Given the same source and compatible dependency inputs, the build should produce a predictable deployable application.

---

# 25. Build Failure

A failed build MUST prevent that artifact from being considered deployable.

---

# 26. Build Identification

Deployable builds SHOULD have an identifiable version.

Potential identifiers include:

```text
Commit SHA
Build ID
Release ID
```

Exact strategy remains open.

---

# 27. Dependency Installation

Dependency installation SHOULD use reproducible dependency metadata appropriate to the selected package ecosystem.

Lockfiles SHOULD be preserved where the selected tooling uses them.

---

# 28. Production Dependencies

Production deployment SHOULD avoid unnecessary development-only tooling where practical.

Exact bundling depends on the runtime.

---

# 29. Build Artifacts

Where the platform uses build artifacts, the same validated artifact SHOULD preferably progress through release stages rather than rebuilding materially different code for each environment.

---

# 30. Continuous Integration

Mosaic SHOULD use Continuous Integration once implementation begins.

CI should validate changes before they become deployable.

---

# 31. CI Responsibilities

Potential CI responsibilities include:

```text
Install Dependencies
        ↓
Static Validation
        ↓
Tests
        ↓
Build
        ↓
Artifact / Deployment Eligibility
```

Exact steps depend on the selected stack.

---

# 32. Static Validation

CI MAY include:

* formatting checks;
* linting;
* type checking;
* dependency validation;
* documentation checks.

Exact tooling remains open.

---

# 33. Test Gate

Required automated tests MUST pass before a change is considered eligible for normal production deployment.

---

# 34. Security Gate

Selected security checks MAY participate in CI.

Potential examples include:

* dependency vulnerability analysis;
* secret detection;
* static security analysis.

The exact initial set remains open.

---

# 35. Continuous Deployment

🟡 **Open Delivery Decision**

Mosaic has not decided whether every accepted change should automatically deploy to production.

Possible models include:

```text
Continuous Deployment
```

or:

```text
Continuous Delivery
+
Explicit Production Promotion
```

This should be decided when the development workflow is defined.

---

# 36. Deployment Trigger

Production deployments SHOULD originate from a controlled and traceable source state.

Examples may include:

* protected main branch;
* release tag;
* approved release artifact.

Exact Git workflow remains open.

---

# 37. Manual Production Changes

Routine production releases SHOULD NOT depend on manually copying files or modifying application code directly on production servers.

---

# 38. Infrastructure Changes

Infrastructure changes SHOULD become reproducible and reviewable where practical.

🔮 **Future Technical Direction**

Infrastructure as Code may become appropriate depending on hosting complexity.

It is not mandatory before infrastructure justifies it.

---

# 39. Database Migrations

Database schema changes MUST use controlled migrations.

Production schema should not depend on undocumented manual database edits.

---

# 40. Migration History

Applied migrations SHOULD be traceable.

The system should know which schema changes have been applied to an environment.

---

# 41. Migration Testing

Migrations SHOULD be validated before production execution.

Important migrations should verify:

* schema correctness;
* application compatibility;
* data preservation;
* expected constraints.

---

# 42. Forward-Compatible Migrations

Where practical, migrations SHOULD allow safe application rollout.

A useful pattern is:

```text
Expand
   ↓
Deploy compatible application
   ↓
Migrate usage/data
   ↓
Contract later
```

rather than making incompatible destructive changes in one step.

---

# 43. Expand and Contract

Example:

```text
Add new field
      ↓
Application supports old + new state
      ↓
Backfill if required
      ↓
Application fully adopts new field
      ↓
Remove obsolete field later
```

This becomes increasingly useful when multiple application instances may temporarily run different versions.

---

# 44. Destructive Migrations

Destructive schema operations require additional caution.

Examples include:

```text
DROP COLUMN
DROP TABLE
Irreversible transformation
```

They SHOULD NOT be coupled casually to ordinary deployment.

---

# 45. Data Backfills

Large data backfills SHOULD be separated from request handling where appropriate.

Potential strategy:

```text
Schema change
      ↓
Application compatible
      ↓
Background backfill
      ↓
Validation
      ↓
Later cleanup
```

---

# 46. Long-Running Migrations

Migrations SHOULD avoid unnecessarily locking critical production data for long periods.

Exact database behavior depends on the selected relational database.

---

# 47. Migration Ownership

Schema migrations belong to the application development lifecycle and should be reviewed like code.

---

# 48. Migration Failure

A failed migration MUST NOT be ignored.

Deployment behavior should make the failure visible and prevent incompatible application state where possible.

---

# 49. Migration Rollback

Not every database migration can be safely reversed.

Mosaic should distinguish:

```text
Application rollback
```

from:

```text
Database rollback
```

They are not always equivalent.

---

# 50. Forward Recovery

For some production database changes, correcting the problem with a new forward migration may be safer than attempting destructive rollback.

The appropriate strategy depends on the migration.

---

# 51. Application Deployment

Application deployment SHOULD replace or update runtime instances in a controlled manner.

The exact mechanism depends on hosting.

---

# 52. Health Validation

New application instances SHOULD demonstrate sufficient health before receiving normal production traffic where infrastructure supports this behavior.

---

# 53. Readiness

Readiness checks MAY prevent traffic from reaching an application instance before it can safely serve requests.

---

# 54. Graceful Shutdown

Application processes SHOULD support graceful shutdown where the runtime and hosting model require it.

Conceptually:

```text
Stop accepting new work
        ↓
Complete / safely terminate current work
        ↓
Exit
```

---

# 55. In-Flight Requests

Deployment SHOULD avoid unnecessarily terminating valid in-flight requests.

Exact behavior depends on the hosting platform.

---

# 56. Background Worker Deployment

Workers may use the same application source but run independently from web request processes.

Conceptually:

```text
Application Release
      │
      ├── Web Runtime
      │
      └── Worker Runtime
```

---

# 57. Worker Compatibility

Application and worker versions SHOULD remain compatible during deployment transitions where both versions may temporarily coexist.

---

# 58. Worker Shutdown

Workers SHOULD stop safely.

A worker terminating during a job should not silently mark incomplete work as successful.

---

# 59. Job Recovery

Interrupted jobs SHOULD follow the job system's retry/recovery semantics.

Job handlers SHOULD remain idempotent where retries are possible.

---

# 60. Worker Scaling

Deployment architecture SHOULD permit worker capacity to change independently from web application capacity.

---

# 61. Scheduled Jobs

If Mosaic introduces scheduled work, execution SHOULD avoid unintended duplicate effects when multiple application instances exist.

Exact scheduler architecture remains open.

---

# 62. Media Deployment Independence

Media objects SHOULD NOT be bundled into application deployments.

User-generated Media belongs in object storage independently from application releases.

---

# 63. Static Assets

Application static assets MAY use immutable/versioned filenames where supported.

This enables long-lived caching without serving stale code under the same asset identity.

---

# 64. CDN Cache and Deployment

Application deployment SHOULD consider cache behavior for frontend/static assets.

New releases must not accidentally depend on cached assets that no longer match the application.

---

# 65. User Media Cache

User-generated Media caching has different lifecycle requirements from application asset caching.

Removal/moderation requirements must remain enforceable.

---

# 66. Release Strategy

Mosaic SHOULD favor incremental releases.

Smaller changes are generally easier to:

* validate;
* observe;
* diagnose;
* recover.

---

# 67. Deployment Strategies

Potential future deployment strategies include:

```text
Rolling
Blue-Green
Canary
```

No advanced strategy is required initially.

---

# 68. Rolling Deployment

A rolling deployment gradually replaces old application instances with new ones.

This may be sufficient for Mosaic if the selected hosting platform supports it safely.

---

# 69. Blue-Green Deployment

🔮 **Future Deployment Option**

Blue-Green deployment may provide strong environment switching and rollback capabilities at additional infrastructure cost.

---

# 70. Canary Deployment

🔮 **Future Deployment Option**

Canary releases may expose a new version to limited traffic before wider rollout.

This becomes more useful at meaningful production scale.

---

# 71. Feature Flags

🟡 **Open Technical Decision**

Feature flags MAY allow code deployment to be separated from Product feature activation.

Potential uses include:

* staged rollout;
* operational disable switches;
* incomplete feature isolation.

They should not become permanent undocumented configuration complexity.

---

# 72. Feature Flag Lifecycle

If feature flags are adopted, temporary flags SHOULD be removed after they no longer serve a purpose.

---

# 73. Kill Switches

Certain external integrations or expensive optional capabilities MAY benefit from operational disable switches.

Examples might include:

```text
Recommendation subsystem
External AI integration
Optional email campaign
```

Critical Product integrity must not depend on informal feature switches.

---

# 74. Release Validation

A deployment is not considered successful merely because the deployment command completed.

Post-deployment validation SHOULD confirm basic system health.

---

# 75. Smoke Tests

Potential production-safe smoke checks include:

```text
Application responds
Health checks succeed
Database connectivity works
Public read path works
Critical worker system is healthy
```

---

# 76. Destructive Smoke Tests

Production smoke testing MUST NOT create uncontrolled:

* fake Creations;
* Likes;
* Comments;
* Follows;
* Reports;
* moderation actions.

---

# 77. Deployment Observability

Deployments SHOULD be identifiable in observability systems.

This helps correlate:

```text
Deployment
      ↓
Error increase
Latency change
Worker failure
Queue growth
```

---

# 78. Deployment Events

Mosaic MAY emit deployment markers to monitoring systems.

Exact implementation depends on selected tooling.

---

# 79. Release Metadata

Useful release metadata may include:

```text
Release ID
Commit
Deployment time
Environment
```

---

# 80. Rollback

Application deployment SHOULD support recovery to a previously known working release where practical.

---

# 81. Rollback Is Not Universal Recovery

A code rollback does not automatically undo:

* database migrations;
* external side effects;
* User-generated data;
* background jobs already processed.

Recovery procedures must consider these independently.

---

# 82. Rollback Compatibility

A previous application release can only be safely restored if it remains compatible with the current database and infrastructure state.

This is another reason to prefer backward-compatible migrations.

---

# 83. Failed Deployment

A failed deployment should lead to:

```text
Detection
   ↓
Stop / Limit rollout
   ↓
Diagnose
   ↓
Rollback or Forward Fix
   ↓
Validate
```

rather than continuing blindly.

---

# 84. Automatic Rollback

🟡 **Open Operational Decision**

Automatic rollback based on health signals may become useful.

It is not initially required.

Poorly designed automatic rollback can create additional instability.

---

# 85. Recovery

Deployment recovery may involve:

* application rollback;
* forward fix;
* worker restart;
* migration correction;
* provider configuration correction.

Recovery strategy depends on failure type.

---

# 86. Database Backup

Production database infrastructure MUST have an appropriate backup strategy before Mosaic relies on it for real User data.

---

# 87. Backup Automation

Backups SHOULD be automated.

Manual occasional database copies are not a sufficient production recovery strategy.

---

# 88. Backup Retention

🟡 **Open Operational Decision**

Exact backup retention remains undefined.

It should follow:

* recovery requirements;
* privacy requirements;
* cost;
* operational maturity.

---

# 89. Restore Testing

Backups SHOULD eventually be tested through restoration.

A successful backup job does not prove the data can be successfully restored.

---

# 90. Recovery Objectives

🟡 **Open Operational Decision**

Formal:

```text
RPO — Recovery Point Objective
RTO — Recovery Time Objective
```

remain undefined.

They should be selected according to actual Product importance and operational expectations.

---

# 91. Object Storage Recovery

Media recovery strategy depends on the selected storage provider and retention model.

Potential capabilities may include:

* object versioning;
* deletion protection;
* backups;
* replication.

Exact strategy remains open.

---

# 92. Search Recovery

Search is derived.

If a Search index is lost:

```text
Authoritative Database
        ↓
Rebuild Search Index
```

should be possible.

---

# 93. Cache Recovery

Cache is derived.

Loss of cache SHOULD NOT cause loss of authoritative Product data.

---

# 94. Notification Recovery

Pending or failed Notification work should be recoverable according to job retention and retry rules.

---

# 95. Media Processing Recovery

Failed Media processing should be retryable where the failure is recoverable and the original required source object remains available.

---

# 96. Deployment Access

Production deployment capability SHOULD be restricted to authorized actors or systems.

---

# 97. Least Privilege

CI/CD and deployment identities SHOULD receive only the permissions needed to perform their responsibilities.

---

# 98. Deployment Credentials

Deployment credentials SHOULD:

* be protected;
* avoid source control;
* support rotation;
* be scoped where provider capabilities permit.

---

# 99. CI Security

Pull-request or untrusted code execution MUST NOT automatically gain unrestricted production secrets.

This becomes particularly important for a public repository.

---

# 100. Public Repository

Mosaic's planned public repository increases the importance of separating:

```text
Public Source Code
```

from:

```text
Private Deployment Credentials
Production Configuration
User Data
```

---

# 101. Fork Security

If external contributors can create pull requests from forks, CI workflows MUST be designed so untrusted contributions cannot extract production secrets.

---

# 102. Dependency Supply Chain

Deployment should use trusted dependency sources and reproducible dependency metadata where possible.

Future security tooling may analyze dependency integrity.

---

# 103. Artifact Integrity

🔮 **Future Security Capability**

Artifact signing or provenance verification may become useful as Mosaic's deployment maturity grows.

It is not initially required.

---

# 104. Deployment Auditability

Production deployments SHOULD be traceable.

It should eventually be possible to answer:

```text
What was deployed?
When?
From which source revision?
To which environment?
Did it succeed?
```

---

# 105. Human Attribution

Where a deployment requires explicit human approval, that approval MAY become part of release history.

Exact workflow remains open.

---

# 106. Production Access

Routine Product operations SHOULD NOT require developers to maintain unrestricted interactive production access.

Operational tooling should reduce the need for direct intervention.

---

# 107. Database Production Access

Direct production database access SHOULD be restricted.

Application and administrative workflows should handle ordinary operations.

---

# 108. Emergency Access

🟡 **Open Operational Decision**

Emergency production access procedures may become necessary.

If introduced, they should be:

* controlled;
* auditable;
* limited;
* used exceptionally.

---

# 109. Deployment Failure Isolation

Failure to deploy an optional subsystem SHOULD NOT unnecessarily corrupt unrelated authoritative Product state.

---

# 110. External Provider Configuration

External providers should use environment-specific configuration where possible.

For example:

```text
Development email configuration
≠
Production email configuration
```

---

# 111. Provider Migration

Mosaic's architecture SHOULD permit external infrastructure providers to change without redefining Product semantics.

Provider migration may still require technical work.

---

# 112. Hosting Portability

Mosaic does not require perfect cloud portability.

Avoiding unnecessary provider coupling is useful, but rejecting valuable managed services merely to remain theoretically portable is not required.

---

# 113. Containerization

🟡 **Open Technical Decision**

Mosaic has not decided whether application deployment will use containers.

Containerization may provide:

* consistent runtime packaging;
* local/production parity;
* deployment portability.

It should be selected based on the final stack and hosting platform.

---

# 114. Docker

No specific container implementation is currently mandated.

If containers are adopted, Docker-compatible tooling is one possible implementation.

---

# 115. Serverless Deployment

🟡 **Open Technical Decision**

Serverless deployment remains possible if compatible with Mosaic's:

* runtime;
* sessions;
* workers;
* Media workflows;
* database connections;
* background processing.

It is not assumed.

---

# 116. Long-Running Runtime

A traditional long-running application runtime also remains possible.

The final hosting model should follow the selected technology stack and workload.

---

# 117. Edge Runtime

🔮 **Future Technical Option**

Selected read-oriented capabilities may eventually benefit from edge execution.

Core Product architecture will not initially depend on edge-specific runtime constraints.

---

# 118. Worker Hosting

Background workers may require different hosting characteristics from the web application.

The deployment platform should not force CPU-intensive or long-running jobs into an unsuitable request runtime.

---

# 119. Media Processing Hosting

Media processing may require:

* CPU;
* memory;
* temporary disk;
* longer execution duration.

The selected deployment architecture must account for these requirements.

---

# 120. Scaling During Deployment

Horizontal scaling should permit application instances to be replaced without requiring Product redesign.

Deployment should preserve session and authoritative-state behavior across instances.

---

# 121. Autoscaling

🟡 **Open Infrastructure Decision**

Application or worker autoscaling MAY be adopted when workload patterns justify it.

Initial deployment may use fixed capacity.

---

# 122. Worker Autoscaling

Worker scaling may eventually use signals such as:

```text
Queue depth
Queue age
Worker utilization
```

Exact policy remains open.

---

# 123. Deployment Regions

Mosaic does not initially require multi-region deployment.

The initial production environment may operate in one appropriate region.

---

# 124. Region Selection

🟡 **Open Infrastructure Decision**

The production region should eventually consider:

* User location;
* database location;
* object storage;
* Media delivery;
* provider availability;
* legal requirements;
* cost.

---

# 125. Multi-Region

🔮 **Future Scaling Option**

Multi-region architecture should only be introduced when justified by concrete availability, latency, or regulatory needs.

---

# 126. Domain and DNS

Production deployment will eventually require controlled domain and DNS configuration.

Exact domain-provider architecture remains open.

---

# 127. TLS

Production User traffic MUST use encrypted transport.

Certificate management SHOULD be automated where hosting infrastructure permits.

---

# 128. HTTP Security

Deployment infrastructure SHOULD preserve Security requirements such as:

* HTTPS;
* secure headers;
* cookie security;
* origin restrictions;
* upload protections.

Exact controls are defined with Security implementation.

---

# 129. Deployment Documentation

Once implementation begins, repository documentation SHOULD explain:

```text
How to run locally
How to configure environment
How to run tests
How to build
How migrations work
How deployment works
```

without exposing secrets.

---

# 130. Runbooks

🔮 **Future Operational Practice**

Operational runbooks may become useful for recurring procedures such as:

* failed deployment;
* worker backlog;
* database recovery;
* provider outage;
* Media-processing incident.

---

# 131. Infrastructure Documentation

Important infrastructure relationships SHOULD be documented sufficiently that operation does not depend on one person's memory.

---

# 132. Deployment and Observability

Every production release should be observable enough to answer:

```text
Did the deployment succeed?

Did errors increase?

Did latency change?

Are workers healthy?

Are queues growing?
```

---

# 133. Deployment and Testing

Only appropriately validated code should become eligible for normal production deployment.

The testing strategy is defined in `testing.md`.

---

# 134. Deployment and Security

Deployment pipelines are part of Mosaic's Security boundary.

Compromising deployment infrastructure may compromise the application itself.

---

# 135. Deployment and Scalability

Deployment infrastructure should allow capacity changes without redesigning Mosaic's Product domain.

---

# 136. Deployment and Data Integrity

Deployment convenience MUST NOT override:

* database integrity;
* Lineage integrity;
* authorship;
* privacy;
* auditability.

---

# 137. Deployment Decisions

## DEP-ADR-001 — Repeatable Deployment

**Status:** ✅ Decided

Mosaic deployments will use a repeatable process rather than undocumented manual production changes.

---

## DEP-ADR-002 — Environment Separation

**Status:** ✅ Decided

Production and non-production environments will use appropriately separated configuration, credentials, and authoritative data.

---

## DEP-ADR-003 — Externalized Configuration

**Status:** ✅ Decided

Environment-specific configuration will be supplied externally rather than requiring source-code modification for each deployment.

---

## DEP-ADR-004 — Secrets Outside Source Control

**Status:** ✅ Decided

Secrets and production credentials will not be committed to the Mosaic repository.

---

## DEP-ADR-005 — Controlled Database Migrations

**Status:** ✅ Decided

Production schema evolution will use explicit, reviewable database migrations.

---

## DEP-ADR-006 — Backward-Compatible Migration Direction

**Status:** ✅ Decided

Where practical, Mosaic will favor expand-and-contract style schema evolution compatible with safe application rollout.

---

## DEP-ADR-007 — Independent Web and Worker Capacity

**Status:** ✅ Decided

Web application and background-worker capacity may be deployed and scaled independently while remaining part of the Modular Monolith architecture.

---

## DEP-ADR-008 — Deployment Observability

**Status:** ✅ Decided

Production releases will be identifiable in operational telemetry sufficiently to correlate deployments with regressions.

---

## DEP-ADR-009 — Production Backup Requirement

**Status:** ✅ Decided

An appropriate automated backup strategy is required before Mosaic relies on production persistence for real User data.

---

## DEP-ADR-010 — Recovery Is Multi-Layered

**Status:** ✅ Decided

Application rollback, database recovery, job recovery, and external-side-effect recovery are distinct concerns and will not be treated as one universal rollback mechanism.

---

## DEP-ADR-011 — Public Repository Security

**Status:** ✅ Decided

Mosaic's public repository and untrusted contribution workflows will not receive unrestricted production secrets.

---

## DEP-ADR-012 — Single-Region Initial Direction

**Status:** ✅ Decided

Mosaic does not require multi-region deployment initially.

---

# 138. Open Deployment Decisions

| Decision                                     | Status                         |
| -------------------------------------------- | ------------------------------ |
| Hosting provider                             | 🟡 Open                        |
| Application runtime                          | 🟡 Open                        |
| Production region                            | 🟡 Open                        |
| CI provider                                  | 🟡 Open                        |
| CD provider                                  | 🟡 Open                        |
| Continuous Delivery vs Continuous Deployment | 🟡 Open                        |
| Git branching/release strategy               | 🟡 Open                        |
| Validation/Staging topology                  | 🟡 Open                        |
| Preview environments                         | 🔮 Future Delivery Option      |
| Containerization                             | 🟡 Open                        |
| Serverless vs long-running runtime           | 🟡 Open                        |
| Worker hosting                               | 🟡 Open                        |
| Media-processing hosting                     | 🟡 Open                        |
| Secret-management provider                   | 🟡 Open                        |
| Feature flags                                | 🟡 Open                        |
| Deployment strategy                          | 🟡 Open                        |
| Automatic rollback                           | 🟡 Open                        |
| Backup retention                             | 🟡 Open                        |
| RPO                                          | 🟡 Open                        |
| RTO                                          | 🟡 Open                        |
| Object-storage recovery strategy             | 🟡 Open                        |
| Emergency production access                  | 🟡 Open                        |
| Autoscaling                                  | 🟡 Open                        |
| Infrastructure as Code                       | 🔮 Future Technical Direction  |
| Artifact signing/provenance                  | 🔮 Future Security Capability  |
| Multi-region architecture                    | 🔮 Future Scaling Option       |
| Edge deployment                              | 🔮 Future Technical Option     |
| Operational runbooks                         | 🔮 Future Operational Practice |

These decisions should follow Mosaic's selected stack, MVP scope, hosting requirements, cost constraints, and real operational needs.

---

# 139. Deployment Architecture Summary

Initial conceptual flow:

```text
Developer Change
      ↓
Source Control
      ↓
Continuous Integration
      │
      ├── Validation
      ├── Tests
      └── Build
      ↓
Deployable Release
      ↓
Validation / Production Promotion
      ↓
┌─────────────────────────────┐
│                             │
▼                             ▼
Web / API                  Workers
│                             │
└──────────────┬──────────────┘
               │
      Shared Infrastructure
               │
   ┌───────────┼────────────┐
   │           │            │
Database   Object Storage   Jobs
```

Database evolution:

```text
Migration
   ↓
Schema compatible with rollout
   ↓
Application deployment
   ↓
Backfill / transition if needed
   ↓
Later cleanup
```

Production validation:

```text
Deploy
   ↓
Health Checks
   ↓
Smoke Validation
   ↓
Observe
   ↓
Healthy?
 ┌───────┴────────┐
 │                │
Yes              No
 │                │
 ▼                ▼
Continue     Stop / Diagnose
                  ↓
            Rollback or
            Forward Recovery
```

The deployment architecture prioritizes:

```text
Repeatability
      +
Automation
      +
Safe migrations
      +
Secret isolation
      +
Observability
      +
Recovery
      +
Independent worker capacity
```

rather than:

```text
Manual production edits
      +
Secrets in repository
      +
Fragile migrations
      +
Untraceable releases
      +
Provider-specific Product logic
```

The central principle is:

> **A Mosaic release should be a controlled transition between known application states, not an improvised production event.**

---

# Related Documentation

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
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)

## Delivery

* [MVP →](../04-delivery/mvp.md)
* [Roadmap](../04-delivery/roadmap.md)
* [Glossary](../04-delivery/glossary.md)

---

**Previous:** [← Testing](./testing.md) · [Documentation Home](../README.md) · **Next:** [MVP →](../04-delivery/mvp.md)
