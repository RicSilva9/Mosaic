# Observability

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Operations & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines Mosaic's technical approach to observability.

Observability allows the engineering and operations systems to understand what Mosaic is doing from the signals it produces.

It should help answer questions such as:

```text
Is Mosaic healthy?

What is failing?

Where is it failing?

When did the problem begin?

Which requests are affected?

Which dependency is responsible?

Are background jobs keeping up?

Is Media processing failing?

Is Search becoming slow?

Did a deployment introduce a regression?
```

Mosaic follows the principle:

> **A system that cannot explain its failures is unnecessarily difficult to operate.**

Observability should provide useful operational visibility without becoming excessive, expensive, or invasive.

---

# 1. Observability Model

Mosaic's observability architecture may use several complementary signals:

```text
Logs
+
Metrics
+
Traces
+
Errors
+
Health Signals
+
Audit Records
```

These signals serve different purposes.

They should not be treated as interchangeable.

---

# 2. Observability Is Not Analytics

Observability focuses on system behavior.

Product Analytics focuses on User and Product behavior.

Example:

```text
"How many Users saved a Creation?"
        ↓
Product Analytics
```

while:

```text
"Why is the Save endpoint failing?"
        ↓
Observability
```

The two systems may share infrastructure in some implementations, but their responsibilities remain conceptually separate.

---

# 3. Observability Is Not Audit

Operational observability answers questions such as:

```text
What happened technically?
```

Auditability answers questions such as:

```text
Who performed this sensitive action?
On what resource?
Why?
With what result?
```

Audit records may require stronger integrity, access controls, and retention than ordinary logs.

---

# 4. Observability Goals

Mosaic observability SHOULD help engineers:

* detect failures;
* diagnose failures;
* understand performance;
* monitor dependencies;
* understand background processing;
* identify regressions;
* investigate incidents;
* validate scaling decisions;
* understand deployment health.

---

# 5. Observability Philosophy

Mosaic should prefer:

```text
Useful signals
      +
Structured context
      +
Correlation
      +
Actionable monitoring
```

rather than:

```text
Log everything
      +
Store forever
      +
Alert on everything
```

More telemetry does not automatically mean better observability.

---

# 6. Structured Logging

Application logs SHOULD use structured data where practical.

Conceptually:

```text
timestamp
level
event
component
request_id
correlation_id
context
```

rather than relying exclusively on unstructured text.

---

# 7. Log Levels

Mosaic SHOULD use intentional log severity levels.

Conceptually:

```text
DEBUG
INFO
WARN
ERROR
```

Exact logging-library semantics depend on implementation.

---

# 8. Debug Logs

Debug logs MAY contain detailed technical context useful during development or targeted investigation.

Production debug logging SHOULD NOT remain permanently excessive without justification.

---

# 9. Informational Logs

Informational logs may represent meaningful normal system events.

Examples include:

```text
Application started
Worker started
Media processing completed
Scheduled cleanup completed
```

Routine events should not generate unnecessary noise.

---

# 10. Warning Logs

Warnings represent unexpected or degraded conditions that do not necessarily mean an operation completely failed.

Examples may include:

```text
External provider retry
Queue delay increasing
Fallback behavior used
Recoverable processing failure
```

---

# 11. Error Logs

Errors represent failed operations or unexpected conditions requiring investigation or recovery.

Error logs SHOULD contain enough context for diagnosis without exposing unnecessary sensitive data.

---

# 12. Logging Context

Useful log context may include:

```text
Request ID
Correlation ID
Component
Operation
Resource type
Safe resource identifier
Duration
Result
Error classification
```

User-sensitive data should only be included when necessary and permitted.

---

# 13. Sensitive Logging

Logs MUST NOT unnecessarily contain:

* passwords;
* session secrets;
* authentication tokens;
* cookies;
* storage credentials;
* API keys;
* private cryptographic material.

---

# 14. Personal Data in Logs

Personal data SHOULD be minimized in operational logs.

For example, internal stable identifiers are often preferable to repeatedly logging:

```text
Email
Display Name
Complete Profile Data
```

when those values are not needed for diagnosis.

---

# 15. User-Generated Content in Logs

Complete:

* Prompts;
* Comments;
* Creation descriptions;
* private customization state

SHOULD NOT automatically be written into operational logs.

If content is required for a specific diagnostic workflow, access should be intentional and privacy-aware.

---

# 16. Request Logging

HTTP request logs MAY include:

```text
Method
Route pattern
Status
Duration
Request ID
```

They SHOULD avoid indiscriminately recording complete request bodies.

---

# 17. Route Patterns

Metrics and logs SHOULD prefer normalized route patterns such as:

```text
/creations/{id}
```

rather than creating separate metric dimensions for every concrete identifier.

This helps prevent high-cardinality telemetry.

---

# 18. High Cardinality

Observability systems SHOULD avoid uncontrolled high-cardinality dimensions.

Examples include using every:

```text
User ID
Creation ID
Search Query
Prompt
```

as metric labels.

Detailed identifiers may still appear in controlled logs or traces where justified.

---

# 19. Correlation IDs

Requests SHOULD be traceable across relevant application operations.

Conceptually:

```text
Client Request
      ↓
Application
      ↓
Database
      ↓
Background Work
```

may carry correlation context allowing related activity to be investigated.

---

# 20. Request IDs

Each incoming request MAY receive a unique request identifier.

The identifier can help connect:

* API response;
* application logs;
* error reports;
* traces.

---

# 21. Background Correlation

When an interactive request triggers asynchronous work, correlation context SHOULD be preserved where useful.

Example:

```text
Publish Creation
      ↓
Request ID / Correlation Context
      ↓
Notification Job
Search Index Job
Media Job
```

This allows consequences to be traced back to the initiating operation.

---

# 22. Error Tracking

Unexpected application errors SHOULD be captured through an error-monitoring mechanism appropriate to the selected stack.

The system should provide:

* stack/context internally;
* grouping of related errors;
* frequency;
* environment;
* release/deployment context.

---

# 23. User-Facing Errors

Users SHOULD receive safe error information.

Internal observability systems may retain additional technical context.

Conceptually:

```text
User:
"Something went wrong."

Operations:
Exception type
Component
Request ID
Stack
Deployment version
Relevant safe context
```

---

# 24. Error Grouping

Repeated instances of the same underlying problem SHOULD be grouped where tooling permits.

A thousand identical failures should not require investigating one thousand independent incidents.

---

# 25. Error Correlation

A User-visible error identifier MAY be mapped to internal diagnostic context.

Such identifiers MUST NOT reveal sensitive implementation details.

---

# 26. Metrics

Mosaic SHOULD collect metrics that describe system health and workload.

Potential categories include:

```text
Request Metrics
Database Metrics
Worker Metrics
Queue Metrics
Media Metrics
Search Metrics
Storage Metrics
Dependency Metrics
Infrastructure Metrics
```

---

# 27. Request Metrics

Useful HTTP/API metrics may include:

```text
Request count
Error rate
Latency
Status class
Route
```

Exact dimensions depend on the implementation.

---

# 28. Latency

Latency SHOULD be measured as a distribution rather than only as an average.

Averages can hide poor experience for slower requests.

Percentile-based analysis MAY be used where supported.

---

# 29. Exact Performance Targets

🟡 **Open Operational Decision**

Mosaic has not yet defined formal:

* p50;
* p95;
* p99;
* endpoint-specific latency targets.

Targets should be based on real Product expectations and measured workloads.

---

# 30. Database Observability

Mosaic SHOULD be capable of identifying database issues such as:

* slow queries;
* connection exhaustion;
* lock contention;
* high CPU;
* storage pressure;
* failed queries.

Exact capabilities depend on the selected database and hosting provider.

---

# 31. Query Visibility

Slow or frequently executed queries SHOULD be diagnosable.

Sensitive query parameters SHOULD NOT be exposed unnecessarily in telemetry.

---

# 32. Connection Metrics

Database connection usage SHOULD become observable if connection exhaustion can affect availability.

Potential signals include:

```text
Active connections
Available connections
Waiting requests
Connection errors
```

---

# 33. Background Job Observability

Background processing MUST NOT operate as an invisible system.

Mosaic SHOULD be capable of understanding:

```text
Jobs queued
Jobs processing
Jobs completed
Jobs failed
Retries
Queue delay
Processing duration
```

---

# 34. Queue Depth

Queue depth can indicate whether incoming work exceeds processing capacity.

Example:

```text
Queue depth rising continuously
        ↓
Workers may not be keeping up
```

This is an important scaling signal.

---

# 35. Queue Age

The age of the oldest waiting job may be more meaningful than queue length alone.

A queue of many fast jobs may be healthy.

A small queue containing work delayed for hours may not be.

---

# 36. Job Failure

Failed jobs SHOULD be observable.

The system should distinguish where possible between:

```text
Recoverable failure
Permanent invalid input
Provider failure
Application defect
```

---

# 37. Retry Observability

Repeated retries SHOULD be measurable.

A job that eventually succeeds after many retries may still indicate infrastructure degradation.

---

# 38. Dead / Failed Jobs

If the selected job infrastructure supports a failed-job or dead-letter concept, Mosaic SHOULD make such work operationally visible.

The exact mechanism remains implementation-specific.

---

# 39. Media Observability

Media is a major operational subsystem.

Mosaic SHOULD observe:

```text
Upload attempts
Upload failures
Processing jobs
Processing failures
Processing duration
Media ready rate
Derivative failures
Storage errors
Delivery failures
```

---

# 40. Media Processing Time

Processing duration may vary with:

* file size;
* duration;
* codec;
* resolution;
* worker capacity.

Observability should make abnormal processing behavior identifiable.

---

# 41. Media Storage Growth

Mosaic SHOULD eventually measure object-storage growth.

Potential signals include:

```text
Stored bytes
Object count
Derivative count
Upload volume
Deletion volume
```

This supports both capacity and cost analysis.

---

# 42. Media Delivery

Where infrastructure exposes appropriate data, Mosaic may monitor:

* delivery errors;
* bandwidth;
* cache behavior;
* origin load.

Exact visibility depends on CDN/storage architecture.

---

# 43. Search Observability

Search SHOULD eventually expose operational metrics such as:

```text
Search request volume
Latency
Error rate
No-result rate
Indexing delay
Indexing failures
```

where applicable.

---

# 44. Search Quality vs Search Health

These concepts differ.

```text
Search returns HTTP 200 quickly
```

means the system may be technically healthy.

It does not prove:

```text
Search results are relevant.
```

Search-quality analysis belongs partly to Product Analytics and relevance evaluation.

---

# 45. Search Indexing

If Mosaic later introduces asynchronous indexing, the system SHOULD observe:

* indexing backlog;
* indexing failures;
* freshness delay;
* reindex progress.

---

# 46. Notification Observability

Notification infrastructure SHOULD make it possible to identify:

* creation failures;
* delivery backlog;
* grouping errors;
* external delivery failures where applicable.

Notification failure remains separate from the authoritative source action.

---

# 47. Email Delivery

If Mosaic uses email, operational visibility may include:

```text
Send attempts
Provider failures
Bounces
Delivery rejection
```

where supported and privacy-appropriate.

Email Product analytics and operational delivery telemetry should remain distinguishable.

---

# 48. Moderation Observability

Moderation operations may require metrics such as:

* incoming Report volume;
* triage backlog;
* case processing time;
* automated-analysis failures;
* Appeal backlog.

These metrics support operations.

They MUST NOT be interpreted as automatic evidence that reported Users are guilty.

---

# 49. AI-Assisted Moderation Observability

If AI-assisted triage is introduced, Mosaic SHOULD observe:

* analysis failures;
* provider errors;
* latency;
* unavailable analysis;
* escalation rates;
* confidence distribution where useful.

Quality evaluation requires additional moderation analysis beyond infrastructure uptime.

---

# 50. Administration Observability

Sensitive administrative operations SHOULD produce appropriate audit records.

Operational metrics may additionally indicate:

* failed privileged actions;
* unusual error rates;
* administrative interface health.

---

# 51. Authentication Observability

Security-aware operational metrics may include:

```text
Authentication attempts
Authentication failures
Password-reset failures
Session errors
```

Exact telemetry must avoid leaking credentials or unnecessary identity information.

---

# 52. Authorization Failures

Authorization failures SHOULD be observable enough to identify:

* application defects;
* attacks;
* misconfigured permissions.

Not every ordinary denied request should generate a high-severity alert.

---

# 53. Security Telemetry

Security-relevant telemetry may include:

* unusual authentication failures;
* privilege changes;
* suspicious administrative activity;
* upload abuse;
* rate-limit activation.

Security monitoring should remain distinct from ordinary Product analytics.

---

# 54. Rate-Limit Metrics

Mosaic MAY observe:

```text
Rate-limited requests
Affected endpoint category
General abuse patterns
```

without unnecessarily retaining sensitive request content.

---

# 55. Dependency Observability

External dependencies SHOULD have observable:

* latency;
* failures;
* timeouts;
* retries

where practical.

Potential dependencies include:

```text
Database
Object Storage
Email
Media Processing
Search
Monitoring
Future AI Providers
```

---

# 56. Dependency Health

A provider being reachable does not necessarily mean it is operating normally.

Metrics should distinguish where possible between:

```text
Healthy
Slow
Partially failing
Unavailable
```

---

# 57. Timeouts

Timeout events SHOULD be observable.

Repeated timeouts can indicate dependency or capacity problems before complete outage occurs.

---

# 58. Health Checks

Mosaic SHOULD expose health information appropriate to its deployment infrastructure.

Potential categories include:

```text
Liveness
Readiness
Dependency health
```

Exact endpoint design depends on deployment.

---

# 59. Liveness

Liveness conceptually answers:

> **Is this process alive enough to continue running?**

A failed liveness check may cause infrastructure to restart the process.

It should not fail merely because every external dependency has a temporary problem.

---

# 60. Readiness

Readiness conceptually answers:

> **Can this process currently serve the intended traffic?**

A process may be alive but temporarily not ready.

---

# 61. Dependency Health Checks

Dependency checks MAY inspect critical infrastructure such as:

* database;
* job infrastructure;
* required storage.

Care must be taken not to turn one optional dependency failure into unnecessary global unavailability.

---

# 62. Health Endpoint Security

Health endpoints MUST NOT expose sensitive infrastructure information publicly without justification.

Detailed diagnostics may require restricted access.

---

# 63. Distributed Tracing

🟡 **Open Technical Decision**

Mosaic MAY adopt distributed/request tracing.

Tracing becomes increasingly useful when requests cross:

* application boundaries;
* background jobs;
* external providers;
* future independently deployed services.

A Modular Monolith can still benefit from tracing.

---

# 64. Trace Context

If tracing is adopted, context SHOULD propagate across relevant operations.

Conceptually:

```text
HTTP Request
   ↓
Application Operation
   ↓
Database
   ↓
Background Job
   ↓
External Provider
```

---

# 65. Trace Sampling

Tracing every operation may become expensive at scale.

🟡 **Open Operational Decision**

Sampling strategy will depend on:

* traffic;
* cost;
* incident requirements;
* selected tooling.

Errors and high-value operations may justify different sampling behavior.

---

# 66. OpenTelemetry

🟡 **Open Technical Decision**

Mosaic MAY use OpenTelemetry or another observability standard compatible with the selected stack.

No telemetry standard is currently mandated.

---

# 67. Observability Provider

🟡 **Open Technical Decision**

No vendor has been selected for:

* logs;
* metrics;
* traces;
* error tracking;
* uptime monitoring.

The architecture should avoid making Product logic dependent on a monitoring vendor.

---

# 68. Monitoring Vendor Independence

Application behavior SHOULD NOT depend on observability-provider availability.

Example:

```text
Error tracking provider unavailable
        ↓
Creation publication should still work
```

Telemetry loss is an operational problem.

It should not normally become a Product outage.

---

# 69. Instrumentation Boundary

Observability instrumentation SHOULD remain separated enough from domain behavior that changing telemetry tooling does not require rewriting Product rules.

---

# 70. Environment Identification

Telemetry MUST distinguish environments such as:

```text
Development
Test
Staging where used
Production
```

Production incidents must not be confused with local development errors.

---

# 71. Release Identification

Telemetry SHOULD identify the deployed application version or release where practical.

This helps answer:

```text
Did this error begin after deployment X?
```

---

# 72. Deployment Correlation

Deployments SHOULD become visible in operational tooling where practical.

This allows engineers to correlate:

```text
Deployment
   ↓
Error increase
Latency increase
Queue backlog
```

---

# 73. Build Identification

A deployment MAY include a build or commit identifier for diagnostic purposes.

The exact mechanism depends on CI/CD and deployment architecture.

---

# 74. Dashboards

Operational dashboards MAY summarize important system health.

Potential areas include:

```text
Application
Database
Media
Workers
Search
Authentication
External dependencies
```

Dashboards should answer operational questions rather than display metrics merely because they exist.

---

# 75. Initial Dashboard

The initial Mosaic deployment does not require an enterprise-scale observability portal.

A small number of useful operational views is preferable to dozens of unused dashboards.

---

# 76. Alerts

Alerts SHOULD represent conditions requiring human attention or operational action.

Not every error deserves an alert.

---

# 77. Alert Quality

A useful alert should ideally communicate:

```text
What is wrong?
How severe is it?
What is affected?
Where should investigation begin?
```

---

# 78. Alert Fatigue

Excessive alerts reduce trust in monitoring.

Mosaic SHOULD avoid alerting on normal transient behavior unless thresholds indicate meaningful degradation.

---

# 79. Alert Thresholds

🟡 **Open Operational Decision**

Exact thresholds remain undefined.

Examples that may eventually trigger alerts include:

```text
Sustained error-rate increase
Database unavailable
Queue age exceeds acceptable limit
Media processing failures spike
Storage approaching capacity constraint
```

Thresholds should follow observed baseline behavior.

---

# 80. Severity

Mosaic MAY classify operational incidents by severity.

Exact severity levels and response expectations remain an operational decision.

---

# 81. SLOs

🟡 **Open Operational Decision**

Mosaic has not yet established formal Service Level Objectives.

Potential future SLOs may cover:

* application availability;
* request latency;
* Media processing;
* Search;
* background processing.

Formal SLOs should correspond to actual Product expectations.

---

# 82. SLIs

Potential Service Level Indicators may include:

```text
Successful request ratio
Latency distribution
Media processing success
Queue delay
Search availability
```

SLIs should measure User-relevant system behavior.

---

# 83. Error Budgets

🔮 **Future Operational Possibility**

Error budgets may become useful when Mosaic operates with formal SLOs.

They are not required during initial development.

---

# 84. Uptime Monitoring

External uptime monitoring MAY verify that public Mosaic entry points are reachable.

This complements internal health checks.

---

# 85. Synthetic Monitoring

🔮 **Future Possibility**

Synthetic workflows may eventually test critical journeys such as:

```text
Open Mosaic
Authenticate
Open Creation
Search
```

Such tests should avoid creating uncontrolled production data.

---

# 86. Real User Monitoring

🔮 **Future Possibility**

Frontend performance monitoring may help understand actual User experience across:

* devices;
* browsers;
* networks;
* geographic locations.

The exact privacy and telemetry strategy must be defined before adoption.

---

# 87. Frontend Errors

Client-side application errors SHOULD be observable in production where tooling permits.

A healthy backend does not imply the frontend is functioning correctly.

---

# 88. Frontend Performance

Potential frontend signals include:

* page load behavior;
* route transitions;
* Media startup;
* JavaScript errors;
* failed API calls.

Exact metrics remain open.

---

# 89. Browser Context

Frontend telemetry MAY include safe browser/environment information useful for compatibility diagnosis.

It SHOULD avoid unnecessary fingerprinting or private data collection.

---

# 90. Privacy-Aware Observability

Observability MUST follow Mosaic's Privacy requirements.

Telemetry should answer:

```text
What does engineering need to operate Mosaic?
```

not:

```text
What User information can we collect because tooling allows it?
```

---

# 91. Telemetry Access

Operational telemetry SHOULD have controlled access.

Not every contributor requires unrestricted access to:

* production logs;
* security telemetry;
* moderation context;
* infrastructure diagnostics.

---

# 92. Telemetry Retention

🟡 **Open Operational/Privacy Decision**

Retention periods for:

* logs;
* traces;
* metrics;
* error reports

remain undefined.

Retention should balance:

* diagnostic usefulness;
* privacy;
* security;
* cost;
* legal requirements.

---

# 93. Telemetry Deletion

If telemetry contains personal data subject to deletion requirements, Mosaic must consider how applicable privacy workflows affect retained telemetry.

Exact behavior depends on data classification and legal obligations.

---

# 94. Observability Cost

Telemetry itself can become a significant infrastructure cost.

Mosaic SHOULD monitor or control:

```text
Log volume
Trace volume
Metric cardinality
Retention
Error-event volume
```

---

# 95. Sampling

High-volume telemetry MAY be sampled where complete retention provides little operational value.

Security and audit requirements may require different treatment.

---

# 96. Audit Sampling

Sensitive audit records MUST NOT be randomly sampled merely to reduce observability cost when the Product requires complete auditability.

Audit and ordinary telemetry have different integrity requirements.

---

# 97. Development Observability

Local development SHOULD provide enough diagnostics to understand failures without requiring production observability infrastructure.

Potential tools include:

* console logs;
* local structured logging;
* development error overlays;
* local database diagnostics.

---

# 98. Test Observability

Automated tests SHOULD surface enough diagnostic information to understand failures.

Tests do not need to emit full production telemetry unless specifically testing observability behavior.

---

# 99. Production Observability

Production requires stronger visibility because direct debugging access is limited and production data is sensitive.

Observability should reduce the need for ad-hoc production inspection.

---

# 100. Production Debugging

Routine production debugging SHOULD NOT depend on manually editing the database or adding temporary unrestricted data access.

Telemetry and controlled operational tools should provide safer investigation paths.

---

# 101. Incident Investigation

A typical investigation may follow:

```text
Alert
  ↓
Dashboard / Metric
  ↓
Affected Component
  ↓
Trace / Request ID
  ↓
Relevant Logs
  ↓
Dependency / Database / Job
  ↓
Root Cause
```

Not every incident requires every signal.

---

# 102. Incident Timeline

Meaningful incidents MAY require a timeline containing:

```text
First detected
User impact
Deployment context
Investigation
Mitigation
Recovery
```

This becomes especially useful as operational complexity grows.

---

# 103. Post-Incident Review

🔮 **Future Operational Practice**

Significant production incidents may receive a structured review focused on:

* root cause;
* contributing factors;
* detection;
* response;
* prevention.

The goal should be system improvement rather than blame.

---

# 104. Data Integrity Monitoring

Mosaic MAY introduce checks for important invariants that should never be violated.

Potential examples include:

```text
Invalid Lineage cycle
Missing required author relationship
Duplicate active relationship
Orphaned authoritative reference
```

Database constraints remain the first defense where applicable.

Monitoring helps detect unexpected violations.

---

# 105. Lineage Observability

Lineage-related failures SHOULD be diagnosable.

Examples include:

* failed derivation publication;
* cycle-prevention rejection;
* correction failure;
* tombstone inconsistency.

Observability MUST NOT redefine Lineage itself.

---

# 106. Relationship Observability

High-volume relationships such as:

```text
Like
Save
Follow
Collection Membership
```

should be observable at aggregate system level without logging every User's private behavior unnecessarily.

---

# 107. Privacy Incident Signals

Mosaic SHOULD make severe authorization or privacy failures detectable where practical.

For example, unusual authorization failures may indicate either:

```text
Attack attempt
```

or:

```text
Application authorization defect
```

Both deserve diagnostic capability.

---

# 108. Availability Monitoring

Mosaic SHOULD distinguish:

```text
Application unavailable
```

from:

```text
Optional subsystem degraded
```

This supports graceful-degradation architecture.

---

# 109. Dependency Failure Isolation

Observability should help confirm whether failure isolation is working.

Example:

```text
Notification provider unavailable
        ↓
Notification errors rise
        ↓
Comment success remains normal
```

This demonstrates that the secondary failure is contained.

---

# 110. Capacity Signals

Scaling decisions SHOULD use observable capacity signals.

Potential examples include:

```text
CPU
Memory
Database load
Connection usage
Queue age
Storage growth
Bandwidth
Worker utilization
Search latency
```

---

# 111. Cost Signals

Where provider data allows it, Mosaic SHOULD eventually understand major operational cost drivers.

Likely categories include:

```text
Media Storage
Media Delivery
Database
Processing
Search
Telemetry
```

Cost observability supports scalability decisions.

---

# 112. Business Metrics Are Separate

Revenue, retention, creator growth, engagement, and conversion are not operational observability metrics merely because they appear on dashboards.

They belong to Product or Business Analytics.

---

# 113. Moderation Metrics Are Contextual

Metrics such as:

```text
Reports per day
Appeals
Enforcement actions
```

may support operations and Product safety analysis.

They must not be interpreted without context as direct measures of platform quality or User guilt.

---

# 114. Observability Failure

Failure of observability infrastructure SHOULD NOT normally prevent Mosaic's authoritative Product operations.

Example:

```text
Metrics provider unavailable
        ↓
Creation publication continues
```

where the application itself remains healthy.

---

# 115. Audit Exception

Certain security-sensitive operations may require successful durable audit recording before completion if the final Security model determines that auditability is a critical invariant.

🟡 **Open Security/Technical Decision**

The exact operations requiring synchronous audit durability remain unresolved.

---

# 116. Instrumentation Failure

Instrumentation code SHOULD fail safely.

A telemetry serialization or provider error MUST NOT ordinarily crash a valid User operation.

---

# 117. Observability Abstraction

Mosaic SHOULD avoid embedding provider-specific telemetry logic throughout core domain code.

Conceptually:

```text
Domain / Application
        ↓
Observability Capability
        ↓
Selected Tooling
```

where practical.

---

# 118. Domain Events and Telemetry

Domain events may generate telemetry.

However:

```text
Telemetry
```

must not become:

```text
Authoritative domain event storage
```

unless a future architecture explicitly decides otherwise.

---

# 119. Event Naming

Operational event names SHOULD be:

* stable;
* understandable;
* domain-aware;
* reasonably consistent.

Examples:

```text
creation.publish.failed
media.processing.completed
search.query.failed
auth.login.failed
```

Exact naming conventions remain implementation-specific.

---

# 120. Metric Naming

Metric names SHOULD use consistent conventions compatible with the selected monitoring stack.

Naming should communicate:

* subsystem;
* measured behavior;
* unit where appropriate.

---

# 121. Units

Metrics SHOULD use explicit units where ambiguity is possible.

Examples:

```text
seconds
milliseconds
bytes
count
ratio
```

---

# 122. Time

Telemetry timestamps SHOULD use consistent machine-readable time representation.

Distributed infrastructure should maintain sufficiently synchronized clocks for useful correlation.

---

# 123. Observability and Deployment

Deployment events SHOULD be visible enough to correlate operational changes with releases.

Deployment strategy is defined separately in `deployment.md`.

---

# 124. Observability and Testing

Testing SHOULD verify critical instrumentation behavior where failure would materially reduce operational visibility.

Not every log statement requires a test.

---

# 125. Observability and Scalability

Observability provides the evidence required by Mosaic's scaling philosophy:

```text
Measure
   ↓
Find Bottleneck
   ↓
Scale
   ↓
Validate
```

Without measurement, scalability decisions become speculation.

---

# 126. Observability and Security

Observability must support security investigation while respecting privacy.

Sensitive telemetry requires:

* access control;
* retention policy;
* safe content;
* audit where appropriate.

---

# 127. Observability Decisions

## OBS-ADR-001 — Structured Operational Logging

**Status:** ✅ Decided

Mosaic will favor structured operational logging over exclusively free-form production logs.

---

## OBS-ADR-002 — Request Correlation

**Status:** ✅ Decided

Application requests and relevant asynchronous consequences will support correlation where practical.

---

## OBS-ADR-003 — Background Work Is Observable

**Status:** ✅ Decided

Background jobs and queues will expose sufficient operational state to identify failures and backlog.

---

## OBS-ADR-004 — Privacy-Aware Telemetry

**Status:** ✅ Decided

Operational telemetry will minimize unnecessary sensitive and personal data.

---

## OBS-ADR-005 — Observability Is Not Source of Truth

**Status:** ✅ Decided

Logs, metrics, traces, and monitoring systems do not define authoritative Product state.

---

## OBS-ADR-006 — Observability Failure Is Isolated

**Status:** ✅ Decided

Failure of optional observability infrastructure will not ordinarily invalidate successful Mosaic domain operations.

---

## OBS-ADR-007 — Deployment Correlation

**Status:** ✅ Decided

Production telemetry should identify application releases sufficiently to correlate regressions with deployments.

---

## OBS-ADR-008 — Measure Before Scaling

**Status:** ✅ Decided

Observability will provide evidence for performance and scalability decisions rather than relying on speculative infrastructure assumptions.

---

# 128. Open Observability Decisions

| Decision                       | Status                              |
| ------------------------------ | ----------------------------------- |
| Logging library                | 🟡 Open                             |
| Log aggregation provider       | 🟡 Open                             |
| Error-tracking provider        | 🟡 Open                             |
| Metrics provider               | 🟡 Open                             |
| Tracing adoption               | 🟡 Open                             |
| OpenTelemetry adoption         | 🟡 Open                             |
| Trace sampling                 | 🟡 Open                             |
| Uptime-monitoring provider     | 🟡 Open                             |
| Initial dashboards             | 🟡 Open                             |
| Alert thresholds               | 🟡 Open                             |
| Incident severity model        | 🟡 Open                             |
| Formal SLIs                    | 🟡 Open                             |
| Formal SLOs                    | 🟡 Open                             |
| Telemetry retention            | 🟡 Open                             |
| Frontend monitoring            | 🟡 Open                             |
| Real User Monitoring           | 🔮 Future Possibility               |
| Synthetic monitoring           | 🔮 Future Possibility               |
| Error budgets                  | 🔮 Future Operational Possibility   |
| Audit storage technology       | 🟡 Open                             |
| Synchronous audit requirements | 🟡 Open Security/Technical Decision |
| Cost-monitoring implementation | 🟡 Open                             |

These decisions should follow the selected runtime, hosting architecture, Product stage, operational needs, and cost constraints.

---

# 129. Observability Architecture Summary

Conceptually:

```text
                        MOSAIC
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
   Web/API             Workers          Infrastructure
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                          ▼
                  TELEMETRY SIGNALS
                          │
           ┌──────────────┼──────────────┐
           │              │              │
          Logs          Metrics        Traces
           │              │              │
           └──────────────┼──────────────┘
                          │
                    Error Tracking
                          │
                          ▼
                  Operational Views
                          │
              ┌───────────┼───────────┐
              │           │           │
          Dashboards    Alerts    Investigation
```

Correlation may follow:

```text
User Request
     │
 Request ID
     │
     ▼
Application Operation
     │
 Correlation Context
     │
     ├── Database
     ├── Media
     ├── Background Job
     └── External Provider
```

while sensitive actions additionally follow:

```text
Privileged Action
       ↓
Authoritative Operation
       ↓
Audit Record
```

The architecture prioritizes:

```text
Structured signals
       +
Correlation
       +
Privacy
       +
Actionable metrics
       +
Background visibility
       +
Deployment context
       +
Failure isolation
```

rather than:

```text
Logging everything
       +
Collecting private data unnecessarily
       +
Unbounded telemetry
       +
Alerts for every error
       +
Vendor-dependent Product logic
```

The central principle is:

> **Mosaic should produce enough trustworthy operational evidence to understand its behavior without turning observation itself into unnecessary complexity, cost, or privacy risk.**

---

# Related Documentation

## Product

* [Notifications](../01-product/notifications.md)
* [Moderation & Trust](../01-product/moderation.md)
* [Administration](../01-product/administration.md)

## Specification

* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Search](./search.md)
* [Security & Privacy](./security.md)
* [Scalability](./scalability.md)
* [Testing →](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Scalability](./scalability.md) · [Documentation Home](../README.md) · **Next:** [Testing →](./testing.md)
