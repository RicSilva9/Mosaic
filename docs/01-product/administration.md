# Administration System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Administration System** defines the privileged capabilities required to operate, govern, support, and maintain Mosaic.

Normal users interact with Mosaic through the product:

```text
Discover
Create
Publish
Remix
Comment
Save
Follow
```

Administrators operate the platform itself.

Their responsibilities may include:

```text
Platform Configuration
User Administration
Moderation Oversight
Content Administration
Taxonomy Management
Operational Support
Security Response
Audit Review
```

Administration exists to operate Mosaic safely and consistently.

It should not become unrestricted invisible control over the platform.

---

# Administration Is a Privileged Function

Administrative capabilities provide access to operations unavailable to ordinary users.

Examples may include:

```text
Restrict an account
Restore moderated content
Manage platform categories
Review audit information
Manage privileged roles
Investigate operational problems
```

Because these actions may have significant consequences:

> **Administrative power should be explicit, restricted, authenticated, and auditable.**

---

# Administration and Moderation

Administration and Moderation are related but distinct.

```text
MODERATION

Applies community rules
to content and behavior


ADMINISTRATION

Operates and governs
the platform
```

A Moderator may investigate reports and apply permitted enforcement.

An Administrator may manage broader platform operations.

---

# Role Model

As established in User & Identity, Mosaic conceptually recognizes:

```text
USER
MODERATOR
ADMINISTRATOR
```

These represent permission roles.

They are not separate public account types.

A Moderator or Administrator may still have an ordinary public Profile where appropriate.

---

# Creator Is Not an Administrative Role

✅ **Decided**

Being a popular or active creator does not grant administrative privileges.

```text
Creator
≠
Moderator
≠
Administrator
```

Creator describes user behavior.

Moderator and Administrator describe privileged platform responsibilities.

---

# Administrative Access

Administrative functionality should only be available to authorized accounts.

A normal user should not gain administrative capability merely by discovering an internal URL or interface.

Conceptually:

```text
Request Administrative Action
          ↓
Authentication
          ↓
Authorization
          ↓
Permission Check
          ↓
Action
```

Interface hiding alone is not authorization.

---

# Least Privilege

✅ **Decided**

Administrative permissions should follow the principle of least privilege.

A person should receive only the access necessary for their responsibilities.

For example:

```text
Moderator
→ moderation tools

Taxonomy manager
→ category management

Security administrator
→ security-sensitive operations
```

Mosaic should avoid assuming:

```text
Needs one privileged action
        ↓
Give access to everything
```

---

# Permission-Based Administration

The initial conceptual roles are useful for understanding the product.

However, the underlying permission model should remain capable of becoming more granular.

Conceptually:

```text
Role
 ↓
Permissions
 ↓
Allowed Actions
```

Examples:

```text
Review Reports
Suspend User
Manage Categories
Restore Content
Manage Roles
View Audit Logs
```

The exact technical authorization model will be defined later.

---

# Administrative Surface

Mosaic should have a dedicated administrative environment rather than mixing privileged controls casually into the normal user interface.

Conceptually:

```text
Mosaic
│
├── Public Product
│
└── Administration
    │
    ├── Users
    ├── Content
    ├── Moderation
    ├── Taxonomy
    ├── Operations
    └── Audit
```

The exact interface is not part of the current product design.

---

# User Administration

Authorized administrators may need tools to inspect and manage user accounts.

Possible operations include:

```text
View account status
Review restrictions
Suspend account
Restore account access
Review enforcement history
Assist with exceptional account issues
```

Access to personal information should be limited to what is necessary for the task.

---

# Account States

As established in User & Identity, conceptual account states may include:

```text
ACTIVE
DEACTIVATED
SUSPENDED
BANNED
DELETED
```

Administrative tools may participate in transitions between certain states.

However, not every transition should necessarily be available to every administrator.

---

# Suspension

Suspension represents restricted account access or functionality.

The exact behavior remains to be defined.

Potential effects may include:

```text
Cannot publish
Cannot comment
Cannot interact
Cannot authenticate
```

depending on the type of restriction.

🟡 **Open Decision**

Mosaic still needs to define whether suspensions are:

* always account-wide;
* capability-specific;
* temporary;
* indefinite;
* some combination of these.

This will be formalized in Business Rules and Security.

---

# Permanent Ban

A permanent Ban is a high-impact enforcement action.

As established in Moderation & Trust:

✅ **Decided — Principle**

Severe account enforcement should receive stronger safeguards than routine moderation actions.

Permanent bans should be:

* authorized;
* justified;
* auditable;
* appealable where policy allows;
* protected against casual use.

---

# Administrator Does Not Own User Content

Administrative access does not transfer authorship.

If an Administrator manages:

```text
Creation A — @Ana
```

Ana remains its author.

Administrative actions may affect availability or metadata where authorized, but they do not make Mosaic staff the creator.

---

# Content Administration

Administrators may need to inspect content for:

* moderation;
* support;
* operational issues;
* security;
* legal obligations;
* integrity corrections.

Possible actions may include:

```text
Restrict visibility
Restore content
Correct platform-controlled metadata
Review status
Investigate relationships
```

These actions should have clear reasons and permission boundaries.

---

# Editing User Content

Administrators should not casually rewrite user-generated creative content.

Example:

```text
User Prompt
User Description
User Comment
```

should not silently become administrator-authored content.

✅ **Decided — Principle**

When possible, administration should prefer:

```text
Restrict
Restore
Correct platform metadata
Request user correction
```

over silently rewriting the user's expression.

Exceptional legal, security, or integrity cases may require specialized procedures.

---

# Administrative Corrections

Some information may require platform correction.

Examples could include:

```text
Incorrect Lineage relationship
Broken system metadata
Invalid category assignment
Moderation-state inconsistency
```

Such corrections should be distinguishable from ordinary user edits.

---

# Lineage Administration

Creative Lineage is historically important to Mosaic.

Administrators may eventually need to correct:

* incorrectly assigned parent relationships;
* fraudulent attribution;
* platform errors;
* moderation-induced inconsistencies.

Because Lineage represents creative history:

✅ **Decided**

Administrative Lineage corrections must be controlled and auditable.

---

# Lineage Cannot Be Arbitrarily Rewritten

An Administrator should not be able to casually change:

```text
A → B → C
```

into:

```text
A → C
```

without an authorized reason.

Lineage corrections should preserve:

* reason;
* previous state where appropriate;
* actor;
* timestamp;
* resulting relationship.

Exact technical history representation comes later.

---

# Platform Taxonomy

Mosaic may use platform-managed structures such as:

```text
Categories
Supported Providers
Known AI Models
Model Metadata
Report Reasons
Platform Labels
```

Some of these require administrative management.

---

# Categories

Administrators may manage platform categories used in Discovery.

Potential actions include:

```text
Create Category
Rename Category
Merge Category
Disable Category
Reorder Category
```

Category changes should not unnecessarily destroy Creation metadata.

---

# Category Changes

Example:

```text
Old:
Cinematic

New:
Cinematography
```

Mosaic should prefer migration or reassignment over breaking existing content references.

The technical mechanism belongs to Data Model and migrations.

---

# Tags and Categories Are Different

If Mosaic supports user-generated Tags:

```text
Tags
→ primarily user/content metadata
```

while:

```text
Categories
→ may be platform-managed discovery structure
```

Administration should not necessarily manually control every Tag.

Spam or abusive Tags remain a moderation concern.

---

# AI Provider and Model Registry

Mosaic may maintain known information about generation providers and models.

Example:

```text
Provider
└── Model
    └── Model Version
```

Administrators may eventually manage known platform metadata for these entities.

However:

✅ **Decided — Principle**

Mosaic should remain capable of representing unknown or creator-provided tools.

Administration of a known-model registry must not make the domain dependent on a fixed list of AI companies.

---

# Model Deprecation

A generation model may disappear or become outdated.

Mosaic should not erase historical Generation Context because the model is no longer active.

Example:

```text
Creation published in 2026
using Model X
```

should remain historically understandable even if Model X disappears later.

An administrator may mark the model:

```text
Deprecated
Unavailable
Historical
```

without rewriting old Creations.

---

# Moderation Administration

Administrators may oversee moderation operations.

Possible responsibilities include:

* escalation handling;
* permanent enforcement;
* appeal escalation;
* moderator management;
* policy configuration;
* investigation of moderator actions.

This does not mean every Administrator should personally review ordinary reports.

---

# Moderator Management

Authorized administrators may need to:

```text
Grant moderator access
Revoke moderator access
Change moderation permissions
Review moderator actions
```

Because these actions increase platform authority, they should themselves be audited.

---

# Role Assignment

✅ **Decided — Principle**

Privileged roles must not be self-assigned.

A user cannot promote themselves to:

```text
MODERATOR
```

or:

```text
ADMINISTRATOR
```

through ordinary product functionality.

---

# Administrator Role Assignment

🟡 **Open Decision**

Mosaic must eventually define who can grant or revoke Administrator privileges.

Possible approaches include:

* higher-level administrators;
* owner-level accounts;
* infrastructure-controlled configuration;
* multi-person approval for critical roles.

This should be designed with security rather than convenience as the primary concern.

---

# Privilege Escalation Protection

Administrative systems must assume attackers may attempt to obtain elevated access.

Security requirements should address:

* authorization bypass;
* stolen sessions;
* compromised credentials;
* role manipulation;
* insecure administrative endpoints.

Detailed controls belong to Security & Privacy.

---

# Strong Authentication

🔮 **Technical Requirement to Define**

Privileged accounts should receive stronger security controls than ordinary low-risk actions.

Possible future requirements include:

```text
Multi-factor authentication
Reauthentication
Security keys
Session restrictions
Privileged action confirmation
```

Exact mechanisms should be selected during security design.

---

# Sensitive Administrative Actions

Not every administrative action has equal risk.

Example:

```text
Rename Category
```

and:

```text
Permanently ban user
```

should not necessarily require identical safeguards.

Mosaic may classify privileged actions according to risk.

---

# High-Risk Actions

Potential high-risk actions include:

```text
Permanent Ban
Administrator Role Assignment
Security Configuration Change
Large-Scale Content Action
Audit Data Access
Legal Enforcement
```

🟡 **Open Decision**

Some of these actions may eventually require:

* reauthentication;
* explicit confirmation;
* reason entry;
* second-person approval.

Exact requirements will be determined during Security design.

---

# Administrative Reasons

Important privileged actions should record why they occurred.

Example:

```text
Action:
Suspend Account

Reason:
Repeated severe spam violations

Actor:
Authorized Administrator

Timestamp:
...
```

✅ **Decided — Principle**

High-impact administrative actions should not exist as unexplained state changes.

---

# Audit Trail

Administrative activity should be auditable.

Conceptually:

```text
Administrator
      ↓
Privileged Action
      ↓
Target
      ↓
Reason
      ↓
Result
      ↓
Audit Record
```

Audit records support:

* accountability;
* security investigations;
* appeals;
* operational debugging;
* moderator oversight.

---

# Audit Log Integrity

✅ **Decided — Principle**

Users performing administrative actions should not be able to casually erase evidence of those actions.

Audit history requires stronger integrity guarantees than ordinary editable content.

Exact technical protections will be defined later.

---

# Audit Access

Audit logs themselves may contain sensitive information.

Therefore:

```text
Administrator
≠
Automatically allowed to inspect every audit record
```

Access should follow role and necessity.

---

# Administrative Actions and Notifications

Some administrative actions should generate user-facing notifications.

Examples:

```text
Account suspended
Creation restored
Appeal resolved
Security-sensitive account change
```

Other purely internal administrative actions may not require user notification.

The Notifications System defines delivery behavior.

---

# Administrative Actions and Events

Like other Mosaic systems, administration may produce meaningful platform events.

Example:

```text
Administrator restores Creation
            ↓
Creation State Changes
            ↓
Search / Discovery updated
            ↓
Notification generated
            ↓
Audit record preserved
```

The administrative action should remain the source event.

Dependent systems react to it.

---

# Search and Discovery Administration

Administrators may need operational controls affecting Discovery.

Examples might include:

```text
Manage categories
Remove prohibited content from discovery
Investigate manipulation
Manage platform-controlled discovery metadata
```

However:

> Administrative tools should not become an invisible mechanism for arbitrarily manufacturing popularity.

---

# Editorial Promotion

🟡 **Open Decision**

Mosaic has not yet decided whether it will support editorially curated or promoted Creations.

If introduced, Mosaic should distinguish:

```text
Algorithmically discovered

Community engagement

Editorially selected

Commercially promoted
```

rather than presenting all of them as if they were the same signal.

---

# Commercial Promotion

🔮 **Future Possibility**

If Mosaic eventually supports sponsored or paid promotion, commercial placement should be clearly distinguishable from organic Discovery.

The business model has not yet been defined.

---

# Trending Manipulation

Administrators may need tools to investigate:

* bot activity;
* coordinated Likes;
* fake follows;
* spam;
* artificial engagement.

Administrative intervention may remove invalid signals or restrict abusive accounts where platform rules allow.

The detailed detection model belongs to Trust, Discovery, and Security.

---

# Platform Configuration

Some product behavior may eventually be configurable without deploying new application code.

Examples might include:

```text
Feature availability
Moderation configuration
Supported categories
Operational limits
Rollout controls
```

Not every business rule should necessarily become an administrator-editable setting.

---

# Configuration Safety

✅ **Decided — Principle**

Administrative configurability should not replace proper product and engineering decisions.

Turning every rule into a runtime setting can make the system unpredictable and difficult to reason about.

Only values that genuinely require operational control should become administrative configuration.

---

# Feature Flags

🔮 **Future Possibility**

Mosaic may eventually use controlled feature rollouts.

Conceptually:

```text
Feature
 ↓
Disabled
Internal Testing
Limited Rollout
Public
```

This can support safer evolution of the platform.

The technical mechanism will be decided later.

---

# Support Operations

Some user problems may require administrative support.

Examples include:

* unusual account problems;
* incorrect platform state;
* content restoration issues;
* account-access problems;
* unresolved moderation states.

Support actions should use dedicated capabilities rather than uncontrolled database manipulation wherever possible.

---

# Impersonation of Users

Administrative support must not require administrators to casually act as another user.

🟡 **Open Decision**

If Mosaic ever introduces support impersonation or "view as user" functionality, it would require strong safeguards:

* explicit authorization;
* clear visual indication;
* audit logging;
* restricted actions;
* privacy controls.

It should not be assumed as an initial capability.

---

# Direct Database Changes

Operational emergencies may sometimes require engineering intervention.

However:

✅ **Decided — Principle**

Normal administrative workflows should not depend on manually editing production data.

Repeated operational needs should become controlled product or administrative capabilities.

---

# System Health

Administrators may need visibility into high-level platform health.

Examples include:

```text
Media processing failures
Search indexing problems
Notification failures
Moderation queue health
Storage problems
Service incidents
```

Detailed engineering monitoring belongs to Observability.

Administration may expose relevant operational summaries.

---

# Operational Metrics

Potential administrative metrics include:

```text
Active users
Published Creations
Report volume
Moderation backlog
Failed processing jobs
Search health
Storage usage
```

Exact analytics requirements will be defined later.

---

# User Analytics vs Administration Analytics

Creator analytics and platform administration analytics are different.

Example:

```text
Creator:
"How are my Creations performing?"

Administrator:
"How is Mosaic operating?"
```

These should not be conflated.

---

# Privacy

Administrative access may expose sensitive information.

Therefore:

✅ **Decided — Principle**

Having administrative privileges does not grant a legitimate reason to inspect unrelated private user data.

Access should be:

```text
Authorized
Necessary
Proportionate
Auditable
```

Detailed privacy requirements will be defined later.

---

# Deleted Accounts

Administrative tools must respect account deletion rules.

A deleted account should not simply remain fully accessible forever through an admin interface because administration exists.

Some information may require lawful retention for:

* security;
* fraud prevention;
* moderation;
* legal obligations;
* auditability.

Exact retention rules remain a later legal and technical decision.

---

# Data Export and Privacy Requests

🔮 **Future / Legal Requirement to Define**

Mosaic may require administrative workflows for:

* user data export;
* account deletion requests;
* privacy requests;
* legal requests.

Exact requirements depend on applicable laws and deployment jurisdictions.

These should be designed deliberately during Security, Privacy, and legal planning.

---

# Legal Requests

Certain external legal processes may require authorized administrative handling.

Mosaic should not expose such capabilities broadly to ordinary moderators.

Potential operations may include:

```text
Legal content restriction
Evidence preservation
Account information handling
Data requests
```

Specific procedures require legal guidance and are outside the current product specification.

---

# Emergency Actions

Mosaic may eventually require emergency administrative controls for severe incidents.

Examples:

```text
Security breach
Large-scale spam attack
Critical unsafe content propagation
Broken publication system
Abusive automated activity
```

Emergency controls should be powerful enough to protect the platform but sufficiently audited to prevent misuse.

---

# Bulk Actions

🟡 **Open Decision**

Administrative tools may eventually need bulk operations.

Examples:

```text
Restrict multiple spam accounts
Reclassify many Creations
Migrate a category
Restore affected content
```

Bulk actions increase operational efficiency but also increase the impact of mistakes.

They require stronger previews, validation, confirmation, and auditability.

---

# Reversibility

Where technically and legally appropriate:

✅ **Decided — Principle**

Administrative actions should prefer reversible operations over irreversible destruction.

Examples:

```text
Restrict → Review → Restore
```

is often safer than:

```text
Immediately destroy permanently
```

Some security, privacy, or legal operations may still require irreversible deletion.

---

# Administrative Mistakes

Administrators and moderators can make mistakes.

The system should make important mistakes detectable and, where possible, recoverable.

Useful mechanisms include:

```text
Audit history
Previous state
Reason records
Restoration
Escalation
```

This supports operational resilience.

---

# Administrator Misconduct

Privileged access itself can be abused.

Mosaic should be designed so that administrator misconduct can be investigated.

Important safeguards include:

* audit logs;
* role separation;
* least privilege;
* access controls;
* high-risk action protection;
* internal accountability.

---

# Separation of Duties

🔮 **Future Possibility**

As Mosaic grows, certain sensitive operations may require different people or roles.

Example:

```text
Moderator recommends permanent ban
            ↓
Authorized Administrator approves
```

or:

```text
Administrator role change
        ↓
Second authorized person approves
```

This may be unnecessary at very small scale but the architecture should not assume one permanent all-powerful operator.

---

# Bootstrap Administration

Every system needs an initial way to establish its first privileged operator.

🟡 **Open Decision**

The bootstrap mechanism will be defined during Security and Deployment design.

It should not rely on an insecure public registration path.

---

# Administration and Scalability

Administrative workflows should be designed to evolve with Mosaic.

At small scale:

```text
Few users
Few reports
Few administrators
```

At larger scale:

```text
Specialized moderators
Support staff
Security roles
Policy teams
Operational tooling
```

The initial implementation does not need all of these structures.

But the domain should avoid assuming:

```text
One administrator will manually control everything forever.
```

---

# Build for Evolution, Not Speculation

Administration follows Mosaic's broader engineering philosophy:

> **Build for evolution, not speculation.**

This means:

* establish clear permission boundaries;
* preserve auditability;
* separate responsibilities;
* avoid hardcoding one all-powerful role;
* support future specialization;

without prematurely building an enterprise administration suite.

---

# Important Product Decisions

| Decision                                                                            | Status    |
| ----------------------------------------------------------------------------------- | --------- |
| Administration and Moderation are distinct responsibilities                         | ✅ Decided |
| Creator is not a privileged platform role                                           | ✅ Decided |
| Administrative actions require authorization                                        | ✅ Decided |
| Interface hiding is not authorization                                               | ✅ Decided |
| Administrative permissions follow least privilege                                   | ✅ Decided |
| The permission model should be capable of future granularity                        | ✅ Decided |
| Administration should have a dedicated privileged surface                           | ✅ Decided |
| Administrators do not gain authorship over user content                             | ✅ Decided |
| Administrators should not casually rewrite user creative content                    | ✅ Decided |
| Lineage corrections are controlled and auditable                                    | ✅ Decided |
| Known AI model administration must not lock Mosaic to fixed providers               | ✅ Decided |
| Historical model information survives model deprecation                             | ✅ Decided |
| Privileged roles cannot be self-assigned                                            | ✅ Decided |
| High-impact administrative actions require recorded reasons                         | ✅ Decided |
| Administrative actions require auditability                                         | ✅ Decided |
| Administrative users cannot casually erase their own audit history                  | ✅ Decided |
| Administrative configurability should be intentional                                | ✅ Decided |
| Normal administration should not depend on manual database edits                    | ✅ Decided |
| Private user information requires necessity even for administrators                 | ✅ Decided |
| Reversible administrative operations are preferred where appropriate                | ✅ Decided |
| Administration should support future specialization without building it prematurely | ✅ Decided |
| Suspension model                                                                    | 🟡 Open   |
| Who can grant Administrator privileges                                              | 🟡 Open   |
| Extra safeguards for high-risk actions                                              | 🟡 Open   |
| Editorial promotion                                                                 | 🟡 Open   |
| Support impersonation                                                               | 🟡 Open   |
| Bulk administrative actions                                                         | 🟡 Open   |
| Bootstrap administrator mechanism                                                   | 🟡 Open   |
| Feature flags                                                                       | 🔮 Future |
| Commercial promotion                                                                | 🔮 Future |
| Separation of duties                                                                | 🔮 Future |
| Advanced operational dashboards                                                     | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* specialized administrative roles;
* feature flags;
* staged rollouts;
* advanced operational dashboards;
* multi-person approval;
* editorial curation;
* sponsored content administration;
* support tooling;
* privacy-request workflows;
* advanced fraud investigation;
* incident management;
* bulk administration;
* automated operational alerts;
* administrative API tooling.

These capabilities should be introduced according to real operational needs.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Security & Privacy](../03-technical/security.md)
* [Observability](../03-technical/observability.md)
* [Deployment](../03-technical/deployment.md)

---

**Previous:** [← Moderation & Trust](./moderation.md) · [Documentation Home](../README.md)
