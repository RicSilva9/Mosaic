# Testing

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, QA, Architecture & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines Mosaic's technical testing strategy.

Testing exists to provide confidence that Mosaic:

* implements documented Product behavior;
* preserves Business Rules;
* satisfies Functional Requirements;
* protects critical Non-Functional Requirements;
* preserves domain integrity;
* remains safe to change.

Mosaic follows the principle:

> **Test behavior and invariants, not implementation accidents.**

The testing strategy should make the system easier to evolve rather than making internal refactoring unnecessarily difficult.

---

# 1. Testing Goals

Mosaic's testing strategy should provide confidence in:

```text
Domain Rules
Authentication
Authorization
Creation Publication
Prompt behavior
Customization
Lineage
Social relationships
Collections
Notifications
Moderation
Administration
Media workflows
Search
Background processing
Failure recovery
```

Testing depth should reflect risk.

---

# 2. Traceability

Mosaic already defines a specification chain:

```text
Product Documentation
        ↓
Business Rules
        ↓
User Flows
        ↓
Functional Requirements
        ↓
Technical Design
        ↓
Tests
```

Tests SHOULD preserve useful traceability to documented requirements where practical.

---

# 3. Requirement IDs

Specification identifiers such as:

```text
BR-LIN-002
FR-LIN-003
NFR-SEC-*
FLOW-009
```

MAY be referenced in:

* test names;
* test metadata;
* test documentation;
* test plans;
* acceptance scenarios.

The exact mechanism depends on the selected testing stack.

---

# 4. Traceability Does Not Mean Duplication

Tests do not need to reproduce complete documentation text.

A test should verify behavior while referencing the requirement that gives that behavior meaning.

Example:

```text
BR-LIN-002
        ↓
Direct parent must be preserved
        ↓
Test:
Publishing B from A creates B.parent = A
```

---

# 5. Testing Pyramid

Mosaic will favor a layered testing strategy.

Conceptually:

```text
              End-to-End
                 /\
                /  \
           Integration
              /    \
             /      \
        Unit / Domain
```

The lower layers should contain many fast, focused tests.

Higher layers validate system integration and critical User journeys.

---

# 6. Test Distribution

Mosaic will NOT require arbitrary percentages such as:

```text
70% Unit
20% Integration
10% E2E
```

The appropriate distribution depends on the behavior being tested.

The architecture should optimize for confidence, maintainability, and execution speed.

---

# 7. Unit Tests

Unit tests SHOULD verify focused behavior without unnecessary infrastructure.

Potential targets include:

* domain validation;
* value transformations;
* permission decisions;
* Lineage rules;
* Prompt assembly;
* state transitions;
* pure ranking logic;
* utility behavior.

---

# 8. Domain Tests

Domain invariants deserve focused tests even when database constraints also protect them.

Examples include:

```text
A Creation cannot derive from itself.

A User cannot follow themselves.

A material Creation evolution creates a new Creation.

A Remix does not transfer ownership.

A Block does not rewrite Lineage.
```

---

# 9. Integration Tests

Integration tests SHOULD verify interactions between real technical components where the integration itself creates risk.

Potential examples include:

```text
Application ↔ Database
Application ↔ Object Storage abstraction
Application ↔ Job system
API ↔ Authentication
Repository ↔ Constraints
```

---

# 10. Database Integration Tests

Database-dependent behavior SHOULD be tested against a database sufficiently representative of production behavior.

This is particularly important for:

* transactions;
* uniqueness;
* foreign keys;
* query semantics;
* migrations;
* concurrency-sensitive constraints.

---

# 11. Database Fidelity

If Mosaic relies on database-specific behavior, replacing the production database with a fundamentally different in-memory implementation during all tests may hide defects.

The testing strategy should preserve sufficient database fidelity for database-sensitive behavior.

---

# 12. API Tests

API tests SHOULD verify:

* request validation;
* authentication;
* authorization;
* resource access;
* error contracts;
* pagination;
* idempotent behavior where required;
* state transitions.

---

# 13. Contract Testing

Internal and external interfaces MAY use contract tests where they reduce integration risk.

Potential future candidates include:

* external email provider;
* object-storage adapter;
* AI provider integrations;
* dedicated Search infrastructure.

Contract testing should be introduced where actual boundaries justify it.

---

# 14. End-to-End Tests

End-to-End tests SHOULD cover a limited set of high-value User journeys through the deployed or production-like application stack.

They should not attempt to reproduce every low-level validation case already covered elsewhere.

---

# 15. Critical E2E Journeys

Likely high-value journeys include:

```text
Register / Authenticate
        ↓
Publish Creation
        ↓
View Creation
```

and:

```text
Discover Creation A
        ↓
Customize Prompt
        ↓
Generate Externally
        ↓
Publish Creation B
        ↓
Verify A → B Lineage
```

and:

```text
Creation
   ↓
Like / Comment / Save
   ↓
Independent relationships remain valid
```

---

# 16. E2E Scope

End-to-End tests are comparatively:

* slower;
* more infrastructure-dependent;
* more expensive to debug;
* more vulnerable to incidental UI changes.

They SHOULD therefore focus on Product-critical workflows.

---

# 17. Browser Testing

The web application SHOULD receive browser-level testing for critical behavior.

Exact browsers and device coverage remain an open Delivery decision.

---

# 18. Responsive Testing

Critical User journeys SHOULD be tested across representative responsive layouts.

Exact device matrices should follow Product and usage requirements rather than attempting to test every possible screen size.

---

# 19. Accessibility Testing

Accessibility SHOULD be part of the testing strategy.

Automated tooling MAY detect issues such as:

* missing accessible names;
* invalid semantics;
* contrast problems where supported;
* certain keyboard issues.

Automated accessibility testing is not sufficient by itself.

---

# 20. Manual Accessibility Testing

Critical flows SHOULD eventually receive manual checks for:

* keyboard navigation;
* focus behavior;
* screen-reader semantics;
* error communication;
* interaction usability.

Exact formal accessibility conformance remains open.

---

# 21. Authentication Tests

Authentication testing SHOULD cover behavior such as:

```text
Valid credentials succeed
Invalid credentials fail
Logged-out User cannot access protected operation
Logout invalidates authenticated state
Suspended Account behavior follows policy
```

Exact authentication implementation tests depend on the selected provider/library.

---

# 22. Authorization Tests

Every protected resource category SHOULD include negative authorization tests.

Testing only:

```text
Owner can edit
```

is insufficient.

The system should also verify:

```text
Different User cannot edit
Anonymous User cannot edit
Unauthorized role cannot edit
```

where applicable.

---

# 23. Object-Level Authorization Tests

Mosaic SHOULD explicitly test identifier manipulation.

Example:

```text
User A owns Draft X
User B owns Draft Y

User A requests Draft Y
        ↓
Access denied
```

This is especially important for:

* Drafts;
* private customization state;
* Collections;
* Notifications;
* moderation resources;
* administrative resources.

---

# 24. Role Tests

Role-based functionality SHOULD verify the distinction between:

```text
USER
MODERATOR
ADMINISTRATOR
```

Tests should ensure that elevated roles receive only the intended capabilities.

---

# 25. Privilege Escalation Tests

Mosaic SHOULD test that ordinary Users cannot:

* assign themselves privileged roles;
* invoke protected administrative operations;
* manipulate role fields through ordinary API payloads.

---

# 26. Creation Tests

Creation tests SHOULD cover:

* Draft creation;
* publication requirements;
* authorship;
* editing;
* availability;
* derived publication;
* Media association;
* Prompt association;
* Generation Context.

---

# 27. Historical Creation Rule

A critical invariant is:

```text
Published Creation
       +
Material creative change
       ↓
New Creation
```

not:

```text
Overwrite historical creative state
```

Tests SHOULD protect this rule.

---

# 28. Non-Material Edit Tests

Where Product rules permit editing an existing published Creation, tests SHOULD verify that the operation preserves the same Creation identity.

---

# 29. Material Change Boundary

🟡 **Open Product Decision**

The exact Edit vs New Creation boundary remains unresolved.

Tests MUST NOT permanently encode arbitrary behavior until the Product rule is finalized.

---

# 30. Prompt Tests

Prompt tests SHOULD verify:

* plain-text Prompt validity;
* structured Prompt behavior where supported;
* association with Creation;
* historical preservation;
* customizable elements;
* generation-context independence.

---

# 31. Prompt Flexibility Tests

The test suite SHOULD avoid assuming every Prompt has the same fixed structure.

Examples of optional components MUST NOT accidentally become mandatory schema through test fixtures.

---

# 32. Customization Tests

Customization tests SHOULD verify:

```text
Source Creation unchanged
        +
Private working state
        +
Variable values
        ↓
Customized Prompt
```

Customization alone MUST NOT create public Lineage.

---

# 33. Customization Publication

When a customization originating from Creation A becomes published as Creation B:

```text
B direct parent = A
```

must be verified.

---

# 34. Lineage Tests

Lineage is one of Mosaic's highest-risk domain areas.

It SHOULD receive strong automated coverage.

---

# 35. Direct Parent Preservation

Given:

```text
A → B → C
```

tests MUST verify:

```text
B.parent = A
C.parent = B
```

and MUST NOT permit flattening to:

```text
C.parent = A
```

unless a future explicit Product rule introduces another relationship type.

---

# 36. Origin Tests

Where origin is derived:

```text
A → B → C
```

the origin of C may resolve to A while the direct parent remains B.

Tests SHOULD distinguish these concepts.

---

# 37. Self-Derivation Tests

A User MAY publish a new Creation derived from their own previous Creation.

Tests SHOULD verify that self-derivation uses the same underlying Lineage model as community derivation.

---

# 38. Cross-User Remix Tests

A derived Creation created by another User MUST:

* preserve source attribution;
* have its own author;
* remain independently owned;
* not grant source author control over descendant content.

---

# 39. Lineage Removal Tests

Given:

```text
A → B → C
```

if B becomes unavailable:

```text
A → [Unavailable B] → C
```

must remain structurally representable.

Tests MUST prevent silent rewriting to:

```text
A → C
```

---

# 40. Descendant Independence

Removing or moderating a parent MUST NOT automatically remove descendants unless a future explicit rule requires a specific enforcement action.

Tests SHOULD protect this independence.

---

# 41. Lineage Cycle Tests

Mosaic MUST prevent cycles.

Tests SHOULD attempt invalid relationships such as:

```text
A → B → C
    ↑     │
    └─────┘
```

and verify rejection.

---

# 42. Self-Parent Tests

A Creation MUST NOT become its own parent.

This should be tested at all relevant enforcement layers.

---

# 43. Multiple Parent Decision

🟡 **Open Product Decision**

One versus multiple direct parents remains unresolved.

The test architecture MUST NOT accidentally make a permanent single-parent Product decision merely because initial fixtures use one parent.

---

# 44. Social Relationship Tests

Social relationships SHOULD be tested independently.

Examples:

```text
Like
Follow
Save
Comment
Block
```

One relationship should not silently create or destroy another unless an explicit Product rule says so.

---

# 45. Like Tests

Tests SHOULD verify:

* one active Like per User/Creation;
* unlike behavior;
* unrelated relationships remain unchanged.

Self-Like behavior remains open and MUST NOT be finalized accidentally.

---

# 46. Follow Tests

Tests SHOULD verify:

* directional relationship;
* no self-follow;
* duplicate active Follow prevention;
* unrelated Creation relationships remain unchanged.

---

# 47. Comment Tests

Comment tests SHOULD cover:

* creation;
* authorship;
* replies;
* editing by authorized User;
* unauthorized editing rejection;
* parent deletion behavior.

Reply-depth rules remain open.

---

# 48. Parent Comment Removal

If a parent Comment is removed while replies remain, tests SHOULD verify that valid replies are not automatically destroyed.

The interface may use an unavailable/deleted placeholder.

---

# 49. Save Tests

Tests SHOULD verify:

* one active Save per User/Creation;
* Save privacy;
* Save independence from Like;
* saved timestamp behavior.

---

# 50. Save and Collection Boundary

🟡 **Open Product Decision**

Whether Collection membership implies Save remains unresolved.

Tests MUST NOT silently establish this relationship until the Product decision is made.

---

# 51. Collection Tests

Tests SHOULD verify:

* ownership;
* privacy;
* membership;
* duplicate membership prevention;
* same Creation in multiple Collections;
* Collection deletion does not delete Creation.

---

# 52. Private Collection Authorization

User A MUST NOT gain access to User B's private Collection merely by knowing its identifier.

---

# 53. Notification Tests

Notification tests SHOULD verify:

* correct recipient;
* event context;
* no unnecessary self-notification;
* read-state behavior;
* source action independence.

---

# 54. Notification Failure Tests

Where Notification creation is asynchronous:

```text
Source operation succeeds
        ↓
Notification processing fails
```

the source operation MUST remain valid.

---

# 55. Remix Notification Tests

When B is directly derived from A:

```text
Author of A
     ↓
Primary Remix Notification Recipient
```

Ancestors further up the chain should not automatically receive every descendant notification unless Product policy changes.

---

# 56. Search Tests

Search tests SHOULD verify:

* basic matching;
* visibility;
* filtering;
* bounded retrieval;
* moderation removal;
* Draft exclusion;
* private-state exclusion.

---

# 57. Search Is Derived

Tests SHOULD ensure Search results do not become authoritative state.

Deleting or rebuilding a Search index must not destroy Creation data.

---

# 58. Search Visibility Tests

Content unavailable to a User MUST NOT become accessible merely through Search.

This includes applicable:

* moderation;
* privacy;
* blocking;
* visibility rules.

---

# 59. Search Relevance Tests

As Search ranking evolves, representative relevance cases MAY verify relative expectations rather than brittle exact scores.

Example:

```text
Query:
cinematic forest

Relevant cinematic forest Creation
        >
Unrelated cooking Creation
```

---

# 60. Media Upload Tests

Media tests SHOULD verify:

* upload authorization;
* invalid type rejection;
* size/constraint enforcement;
* ownership;
* finalization;
* processing state;
* failure handling.

---

# 61. Direct Upload Tests

If temporary upload authorization is used, tests SHOULD verify:

* expiration;
* scope;
* inability to upload to another User's resource;
* inability to convert arbitrary storage objects into trusted Mosaic Media.

---

# 62. Media Processing Tests

Processing tests SHOULD cover:

```text
Uploaded
   ↓
Processing
   ↓
Ready
```

and:

```text
Uploaded
   ↓
Processing
   ↓
Failed
```

where these states are implemented.

---

# 63. External Media Tooling

Tests SHOULD NOT require real external Media providers for every automated run.

Adapters and controlled test doubles may isolate external dependencies.

Representative integration tests may still verify real compatibility in appropriate environments.

---

# 64. Moderation Tests

Moderation tests SHOULD verify:

* Report creation;
* Report does not equal guilt;
* triage;
* case handling;
* enforcement;
* restoration;
* auditability;
* descendant independence.

---

# 65. Report Volume Tests

Multiple Reports MUST NOT automatically establish guilt merely because count increases.

Where duplicate-report grouping exists, tests should verify the intended behavior.

---

# 66. Reviewed Content Tests

A previously reviewed item MUST remain reportable when:

* new evidence exists;
* a different violation is alleged;
* content changed;
* relevant context changed.

Equivalent duplicate reports MAY be filtered according to policy.

---

# 67. Appeal Tests

Appeal tests SHOULD verify:

```text
Moderation Decision
       ↓
Appeal
       ↓
Human / authorized review
       ↓
Final outcome
```

where applicable.

---

# 68. Restoration Tests

When a successful Appeal restores a Creation:

```text
Existing Creation restored
```

not:

```text
New duplicate Creation created
```

unless a future rule explicitly requires otherwise.

---

# 69. Moderation and Lineage

Moderation tests MUST ensure that enforcement does not silently flatten or rewrite Lineage.

---

# 70. Administration Tests

Administrative capabilities require strong positive and negative tests.

Examples include:

* authorized Administrator succeeds;
* ordinary User fails;
* Moderator without capability fails;
* sensitive action is audited.

---

# 71. Administrative Authorship

Administrative modification of platform metadata MUST NOT accidentally make the Administrator the creative author of User content.

---

# 72. Lineage Correction Tests

If controlled Lineage correction is implemented, tests SHOULD verify:

* authorization;
* validation;
* acyclic result;
* audit record;
* historical integrity.

Exact correction workflow remains open.

---

# 73. Blocking Tests

Blocking tests SHOULD verify the final interaction matrix once Product behavior is defined.

Until then, tests should protect already-decided rules such as:

```text
Block
  ≠
Delete Lineage
```

---

# 74. Privacy Tests

Privacy-sensitive behavior SHOULD receive explicit tests.

Examples include:

```text
Email not exposed publicly
Save identities not public
Private Collection protected
Draft protected
Customization protected
Reporter identity protected
```

---

# 75. Serialization Tests

Public API representations SHOULD be tested to ensure private fields are not accidentally serialized.

This is particularly important for entities containing both public and private information.

---

# 76. Security Tests

Automated security-focused tests SHOULD cover application-level vulnerabilities relevant to Mosaic.

Priority areas include:

* authentication;
* authorization;
* object access;
* input validation;
* uploads;
* privileged actions.

---

# 77. Injection Tests

Where appropriate, tests SHOULD verify that malicious input does not become executable database or application behavior.

Selected framework/database protections may provide additional assurance.

---

# 78. XSS Tests

User-generated content rendering SHOULD be tested to ensure unsafe executable markup does not bypass intended escaping or sanitization.

---

# 79. CSRF Tests

If the selected authentication architecture requires explicit CSRF protection, state-changing request tests SHOULD verify that protection.

Exact tests depend on implementation.

---

# 80. Rate-Limit Tests

Once rate-limit rules are defined, tests SHOULD verify:

* threshold behavior;
* scope;
* recovery;
* protected endpoints;
* no accidental permanent lockout.

---

# 81. Concurrency Tests

Concurrency-sensitive domain behavior SHOULD receive targeted tests.

Examples include:

```text
Two simultaneous Likes
Two simultaneous Saves
Concurrent username registration
Concurrent publication attempt
```

---

# 82. Database Constraint Tests

Where the database protects invariants such as uniqueness, integration tests SHOULD verify those constraints.

Application validation alone is insufficient for race-sensitive uniqueness.

---

# 83. Transaction Tests

Operations requiring atomic authoritative state SHOULD be tested for rollback behavior.

Example:

```text
Create derived Creation
        +
Create required Lineage relationship
        ↓
Either both succeed
or authoritative operation fails safely
```

---

# 84. Partial Failure Tests

Mosaic SHOULD test important failure boundaries.

Example:

```text
Creation committed
Search indexing fails
```

Expected:

```text
Creation remains valid
Search repair/retry possible
```

---

# 85. Background Job Tests

Background jobs SHOULD be tested for:

* successful execution;
* retry behavior;
* idempotency;
* permanent failure;
* malformed payload;
* missing resource;
* duplicate delivery.

---

# 86. Idempotency Tests

Retry-sensitive operations SHOULD verify that repeated execution does not create unintended duplicate effects.

Examples may include:

* Notification creation;
* Media derivatives;
* Search indexing;
* external provider callbacks.

---

# 87. Retry Tests

Retries SHOULD distinguish recoverable failures from permanently invalid work where implementation supports such classification.

---

# 88. External Dependency Tests

Automated test suites SHOULD avoid depending on external provider availability for ordinary execution.

External systems may be represented through:

```text
Fake
Stub
Mock
Local emulator
Adapter test implementation
```

according to the type of test.

---

# 89. Mocking Philosophy

Mosaic SHOULD mock boundaries, not everything.

Excessive mocking of internal implementation details can create tests that pass while the real application fails.

---

# 90. Test Doubles

Test doubles are most useful for unstable or external boundaries such as:

* email;
* object storage;
* external AI providers;
* monitoring;
* external webhooks.

Core domain behavior should preferably be tested directly.

---

# 91. Provider Contract Tests

Where an external provider is operationally important, Mosaic MAY maintain a small set of tests against a real sandbox or controlled provider environment.

These should not necessarily run on every local test execution.

---

# 92. Migration Tests

Database migrations SHOULD be tested before production deployment.

Important checks include:

* migration applies successfully;
* expected schema exists;
* critical data is preserved;
* application remains compatible with intended deployment sequence.

---

# 93. Destructive Migration Tests

Potentially destructive migrations require additional care.

Tests and deployment planning should verify:

* backup/recovery assumptions;
* data transformation;
* rollback or forward-recovery strategy.

---

# 94. Migration Compatibility

Where zero-downtime or rolling deployment becomes required, migrations SHOULD preserve compatibility between temporarily coexisting application versions.

Exact deployment requirements remain open.

---

# 95. Search Migration Tests

If Search infrastructure changes, tests SHOULD verify that indexes can be rebuilt from authoritative state.

---

# 96. Media Migration Tests

Changes to Media metadata or storage strategy SHOULD preserve stable Media identity and availability according to Product rules.

---

# 97. Regression Tests

A confirmed defect SHOULD receive a regression test where practical.

Conceptually:

```text
Bug discovered
     ↓
Test reproduces bug
     ↓
Fix
     ↓
Test prevents recurrence
```

---

# 98. Bug Reproduction

A regression test should target the underlying behavior rather than merely duplicating incidental implementation details.

---

# 99. Test Data

Automated tests SHOULD use controlled data.

Production User data MUST NOT be required for ordinary testing.

---

# 100. Fixtures

Fixtures SHOULD remain understandable and focused.

Large universal fixtures that implicitly create the entire platform state can make tests difficult to reason about.

---

# 101. Factories / Builders

The selected testing stack MAY use factories or builders to create valid domain objects with minimal repetition.

Defaults must not hide important test assumptions.

---

# 102. Lineage Fixtures

Lineage test helpers SHOULD make relationships explicit.

Prefer:

```text
A → B → C
```

over hidden fixture behavior where parent relationships are difficult to identify.

---

# 103. Test Isolation

Tests SHOULD avoid unnecessary dependence on execution order.

A test should not require another unrelated test to run first.

---

# 104. Database Isolation

Database tests SHOULD cleanly isolate state through an appropriate strategy such as:

* transaction rollback;
* isolated database;
* schema reset;
* controlled cleanup.

Exact strategy depends on tooling.

---

# 105. Parallel Testing

The test architecture SHOULD permit parallel execution where practical.

Shared mutable test state should not create nondeterministic failures.

---

# 106. Determinism

Tests SHOULD avoid unnecessary dependence on:

* current wall-clock time;
* randomness;
* network availability;
* external services;
* execution order.

When such behavior is relevant, dependencies should be controlled.

---

# 107. Time Tests

Time-sensitive behavior such as:

* expiration;
* ordering;
* session lifetime;
* temporary upload authorization

SHOULD use controllable time abstractions where the selected stack supports them.

---

# 108. Randomness

Random identifiers or values used by the application should not make tests impossible to reproduce.

Tests may control randomness where necessary.

---

# 109. Flaky Tests

Flaky tests SHOULD be treated as defects in the testing system.

Repeatedly rerunning tests until they pass is not an acceptable long-term strategy.

---

# 110. Test Speed

Fast feedback is important.

Developers should be able to run focused tests without executing every expensive E2E scenario.

---

# 111. Test Suites

Mosaic MAY organize tests into suites such as:

```text
Unit
Integration
API
E2E
Security
Performance
```

Exact naming depends on the selected tooling.

---

# 112. Local Test Workflow

Developers SHOULD be able to run core tests locally without requiring production infrastructure.

---

# 113. CI Testing

Continuous Integration SHOULD execute an appropriate automated test set before changes become deployable.

Exact CI provider remains open.

---

# 114. Pull Request Validation

If Mosaic uses pull-request development, automated checks SHOULD verify relevant:

* tests;
* static analysis;
* type checking where applicable;
* formatting/linting where selected;
* build integrity.

Exact repository workflow will be defined later.

---

# 115. Main Branch

The primary branch SHOULD remain in a state suitable for continued development and deployment according to the selected workflow.

---

# 116. Test Failure

Required automated checks MUST NOT be ignored merely to merge changes faster.

Exceptional overrides, if ever supported, should be explicit and appropriately controlled.

---

# 117. Code Coverage

Code coverage MAY be measured.

Coverage is a diagnostic metric, not the objective of testing.

---

# 118. Coverage Targets

🟡 **Open Engineering Decision**

Mosaic has not defined a global minimum code-coverage percentage.

A high percentage does not prove that important Product behavior is correctly tested.

---

# 119. Critical Coverage

High-risk domain behavior should receive strong tests regardless of global coverage percentage.

Priority areas include:

```text
Lineage
Authorization
Authentication
Privacy
Publication
Moderation
Administration
Transactions
```

---

# 120. Mutation Testing

🔮 **Future Quality Option**

Mutation testing may later help evaluate whether critical tests actually detect behavioral changes.

It is not required initially.

---

# 121. Property-Based Testing

🔮 **Future Quality Option**

Property-based testing may be useful for invariant-heavy behavior such as:

* Lineage;
* identifier handling;
* Prompt transformations;
* permission combinations.

It should be introduced where it provides practical value.

---

# 122. Performance Tests

Performance testing SHOULD validate real performance questions rather than arbitrary request counts.

Potential targets include:

* Creation retrieval;
* Search;
* Lineage traversal;
* Feed retrieval;
* Media workflows;
* high-volume relationship queries.

---

# 123. Load Testing

Load testing should use representative workflows and realistic data shapes.

Example:

```text
10,000 trivial health-check requests
```

does not prove:

```text
Discovery performs well with realistic Creations,
relationships, and Media metadata.
```

---

# 124. Performance Baselines

🟡 **Open Operational Decision**

Formal performance baselines will be established once implementation and realistic workloads exist.

---

# 125. Scalability Tests

When a scaling bottleneck is suspected, targeted tests SHOULD reproduce the relevant workload before architecture is changed.

This supports Mosaic's:

> **Measure before scaling**

principle.

---

# 126. Media Performance Tests

Media upload and processing tests MAY evaluate:

* upload throughput;
* processing duration;
* worker concurrency;
* queue behavior.

Exact targets depend on supported Media constraints.

---

# 127. Search Performance Tests

Search performance SHOULD eventually be tested against realistic indexed data volume and query patterns.

---

# 128. Lineage Performance Tests

Large Lineage structures SHOULD eventually be tested to ensure bounded traversal remains practical.

Tests should not assume all descendants fit in one response.

---

# 129. Recovery Tests

Mosaic SHOULD test recovery behavior for critical infrastructure where practical.

Potential scenarios include:

```text
Worker restarts during job
Database transaction fails
External provider times out
Search index unavailable
Media processing crashes
```

---

# 130. Backup Restoration

Before production maturity, backup strategy SHOULD eventually be validated through restoration testing.

A backup that has never been tested for restoration provides limited confidence.

---

# 131. Disaster Recovery Testing

🔮 **Future Operational Requirement**

Formal disaster-recovery exercises may become appropriate as Mosaic's operational importance grows.

---

# 132. Failure Injection

🔮 **Future Quality Option**

Controlled failure injection may eventually help verify resilience.

Examples include:

* provider timeout;
* worker termination;
* database unavailability.

This does not require a complex chaos-engineering platform initially.

---

# 133. Chaos Engineering

Mosaic does NOT initially require formal Chaos Engineering infrastructure.

Resilience can first be tested through focused failure scenarios.

---

# 134. Visual Regression Testing

🟡 **Open Engineering Decision**

Visual regression testing MAY be introduced once Mosaic's interface becomes sufficiently stable and visual consistency justifies the maintenance cost.

---

# 135. Snapshot Testing

Snapshot tests MAY be used selectively.

Large snapshots SHOULD NOT replace meaningful behavioral assertions.

---

# 136. Component Testing

Frontend components MAY receive isolated tests where they contain meaningful interaction or presentation logic.

Purely trivial rendering does not require testing for its own sake.

---

# 137. UI Behavior Tests

High-value UI tests may verify:

* validation feedback;
* loading states;
* error states;
* publication confirmation;
* destructive action confirmation;
* accessible interaction.

---

# 138. Implementation Detail

Tests SHOULD avoid unnecessarily depending on:

* private method names;
* internal component structure;
* exact SQL generated by ORM;
* incidental HTML nesting

unless those details are themselves part of the required contract.

---

# 139. Refactoring Safety

A good test suite should allow internal refactoring while failing when externally meaningful behavior changes incorrectly.

---

# 140. Test Documentation

Complex testing conventions SHOULD be documented near the implementation.

Examples may include:

* how to run suites;
* how test databases work;
* how external providers are faked;
* how E2E environments are initialized.

---

# 141. Requirement Traceability Matrix

Mosaic MAY later generate or maintain a traceability view such as:

| Requirement | Flow     | Technical Area   | Test                                |
| ----------- | -------- | ---------------- | ----------------------------------- |
| BR-LIN-002  | FLOW-009 | Lineage          | `derived_creation_preserves_parent` |
| FR-LIN-003  | FLOW-009 | API / Data Model | `publish_derived_creation`          |
| NFR-SEC-*   | Multiple | Security         | Authorization suite                 |

This should help identify specification areas without verification.

---

# 142. Traceability Automation

🔮 **Future Quality Option**

If requirement references are included consistently in test metadata, Mosaic may later automate parts of traceability reporting.

This is not required initially.

---

# 143. Open Decisions in Tests

A critical rule is:

> **Tests MUST NOT silently finalize unresolved Product decisions.**

For example, while self-Like remains open, a test must not permanently establish:

```text
User can Like own Creation
```

or:

```text
User cannot Like own Creation
```

as Product truth without the corresponding decision being made.

---

# 144. Neutral Foundations

Where implementation must proceed before an open Product decision is finalized, tests should focus on the neutral technical foundation.

Example:

```text
Like relationship supports User ↔ Creation uniqueness
```

without yet deciding self-Like policy.

---

# 145. Documentation Changes

When a documented Product rule changes:

```text
Documentation
      ↓
Business Rules / Requirements
      ↓
Tests
      ↓
Implementation
```

should be reviewed together.

Tests are not a substitute for keeping documentation current.

---

# 146. Test Ownership

Testing quality is an engineering responsibility.

It should not depend on a separate QA role discovering every defect after implementation.

---

# 147. Manual Testing

Manual testing remains useful for:

* exploratory behavior;
* usability;
* accessibility;
* unusual workflows;
* visual quality;
* release confidence.

It complements automation.

---

# 148. Exploratory Testing

Exploratory testing can reveal behavior not anticipated by predefined test cases.

This is particularly valuable for:

* customization;
* Lineage navigation;
* moderation;
* complex social interactions.

---

# 149. Release Testing

Release validation SHOULD focus on the risk introduced by the release.

Not every deployment requires manually retesting every Mosaic capability.

---

# 150. Smoke Tests

A deployed environment SHOULD support a small set of smoke checks confirming basic application viability.

Potential checks include:

```text
Application reachable
Database reachable
Public Creation retrieval works
Authentication entry point works
Critical worker infrastructure healthy
```

Exact checks depend on deployment.

---

# 151. Production Tests

Automated production checks MUST avoid:

* destructive behavior;
* uncontrolled test Accounts;
* spam;
* fake social activity;
* contamination of real Product data.

---

# 152. Test Environment

Mosaic SHOULD have an environment suitable for integration and release validation before meaningful production operation.

Whether this is called:

```text
Staging
Preview
Test Environment
```

depends on deployment strategy.

---

# 153. Preview Environments

🔮 **Future Delivery Option**

Per-branch or per-pull-request preview environments may become useful for frontend and Product review.

They are not required initially.

---

# 154. Test Secrets

Automated tests MUST NOT require real production secrets.

Provider test credentials, where needed, should be isolated from production.

---

# 155. Security of Test Infrastructure

Test environments SHOULD NOT become an easy path into production systems.

Credentials, databases, and storage should remain appropriately separated.

---

# 156. Test Data Privacy

Production personal data SHOULD NOT be copied into test environments without a legitimate and controlled reason.

Synthetic data is preferred.

---

# 157. Testing Decisions

## TEST-ADR-001 — Layered Testing Strategy

**Status:** ✅ Decided

Mosaic will use a layered strategy combining focused tests, integration tests, and selected End-to-End tests.

---

## TEST-ADR-002 — Behavior Over Implementation

**Status:** ✅ Decided

Tests will prioritize Product behavior and domain invariants over incidental implementation details.

---

## TEST-ADR-003 — Specification Traceability

**Status:** ✅ Decided

The testing strategy will preserve useful traceability from Mosaic's Business Rules, User Flows, Functional Requirements, and Non-Functional Requirements.

---

## TEST-ADR-004 — Lineage Receives High-Priority Coverage

**Status:** ✅ Decided

Creative Lineage invariants will receive strong automated coverage because corruption would damage Mosaic's historical creative model.

---

## TEST-ADR-005 — Authorization Requires Negative Testing

**Status:** ✅ Decided

Protected capabilities will be tested for both permitted and unauthorized actors.

---

## TEST-ADR-006 — Database-Sensitive Behavior Uses Representative Integration Tests

**Status:** ✅ Decided

Transactions, constraints, migrations, and other database-sensitive behavior will be tested against sufficiently representative database infrastructure.

---

## TEST-ADR-007 — External Providers Are Isolated

**Status:** ✅ Decided

Ordinary automated test execution will not depend on live external providers.

---

## TEST-ADR-008 — Open Decisions Remain Open

**Status:** ✅ Decided

Tests will not silently establish unresolved Product decisions as permanent behavior.

---

## TEST-ADR-009 — CI Protects Deployable Code

**Status:** ✅ Decided

Automated validation will protect the deployable codebase before changes progress through the Delivery workflow.

---

## TEST-ADR-010 — Coverage Is Evidence, Not the Goal

**Status:** ✅ Decided

Code-coverage metrics may support quality analysis but will not replace behavior-oriented testing.

---

# 158. Open Testing Decisions

| Decision                         | Status                            |
| -------------------------------- | --------------------------------- |
| Unit testing framework           | 🟡 Open                           |
| Integration testing framework    | 🟡 Open                           |
| E2E framework                    | 🟡 Open                           |
| Browser test matrix              | 🟡 Open                           |
| Device/responsive matrix         | 🟡 Open                           |
| Accessibility tooling            | 🟡 Open                           |
| Test database strategy           | 🟡 Open                           |
| Database isolation strategy      | 🟡 Open                           |
| External-service emulators       | 🟡 Open                           |
| CI provider                      | 🟡 Open                           |
| Pull-request checks              | 🟡 Open                           |
| Coverage reporting               | 🟡 Open                           |
| Minimum coverage thresholds      | 🟡 Open Engineering Decision      |
| Performance baselines            | 🟡 Open                           |
| Load-testing tooling             | 🟡 Open                           |
| Visual regression testing        | 🟡 Open                           |
| Preview environments             | 🔮 Future Delivery Option         |
| Property-based testing           | 🔮 Future Quality Option          |
| Mutation testing                 | 🔮 Future Quality Option          |
| Formal disaster-recovery testing | 🔮 Future Operational Requirement |
| Failure-injection tooling        | 🔮 Future Quality Option          |
| Automated traceability reporting | 🔮 Future Quality Option          |

These decisions should follow the selected technology stack, Delivery workflow, Product risk, and operational maturity.

---

# 159. Testing Architecture Summary

The primary verification chain is:

```text
PRODUCT
   │
   ▼
BUSINESS RULES
   │
   ▼
USER FLOWS
   │
   ▼
FUNCTIONAL / NON-FUNCTIONAL REQUIREMENTS
   │
   ▼
TECHNICAL IMPLEMENTATION
   │
   ▼
TESTS
```

The test layers are:

```text
                     ┌───────────────┐
                     │      E2E      │
                     │ Critical User │
                     │   Journeys    │
                     └───────┬───────┘
                             │
                     ┌───────▼───────┐
                     │  Integration  │
                     │ DB / API /    │
                     │ Infrastructure│
                     └───────┬───────┘
                             │
                     ┌───────▼───────┐
                     │ Unit / Domain │
                     │ Rules &       │
                     │ Invariants    │
                     └───────────────┘
```

Critical Mosaic confidence areas include:

```text
Lineage
     +
Authorization
     +
Privacy
     +
Publication
     +
Independent Relationships
     +
Moderation
     +
Administration
     +
Transactional Integrity
```

The strategy prioritizes:

```text
Behavior
   +
Traceability
   +
Risk-based coverage
   +
Fast feedback
   +
Representative integration
   +
Critical E2E journeys
   +
Regression protection
```

rather than:

```text
Arbitrary coverage percentage
   +
Mocking everything
   +
Testing implementation details
   +
Huge fragile E2E suite
   +
Tests that silently decide Product policy
```

The central principle is:

> **Mosaic's test suite should prove that important Product rules remain true while giving engineers the freedom to improve how those rules are implemented.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
* [User Identity](../01-product/user-identity.md)
* [Publications](../01-product/publications.md)
* [Prompt System](../01-product/prompts.md)
* [Customization](../01-product/customization.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Social System](../01-product/social.md)
* [Collections](../01-product/collections.md)
* [Notifications](../01-product/notifications.md)
* [Moderation & Trust](../01-product/moderation.md)
* [Administration](../01-product/administration.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [User Flows](../02-specification/user-flows.md)
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
* [Deployment →](./deployment.md)

---

**Previous:** [← Observability](./observability.md) · [Documentation Home](../README.md) · **Next:** [Deployment →](./deployment.md)
