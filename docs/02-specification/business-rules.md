# Business Rules

> **Section:** Specification
> **Status:** Active Specification
> **Audience:** Product, Engineering & QA
> **Last updated:** September 2026

---

## Overview

This document consolidates the **business rules that govern Mosaic's behavior**.

The Product documentation explains concepts and expected behavior.

Business Rules transform those concepts into explicit statements that can later guide:

* user flows;
* functional requirements;
* data modeling;
* API behavior;
* authorization;
* validation;
* testing.

A business rule answers questions such as:

> What must always be true?

> What is allowed?

> What is forbidden?

> What happens when a specific condition occurs?

---

# Rule Format

Rules use stable identifiers.

```text
BR-[DOMAIN]-[NUMBER]
```

Example:

```text
BR-USR-001
BR-CRE-003
BR-LIN-007
```

These identifiers allow future documents to reference rules without copying their full definition.

Example:

```text
FR-CRE-012
implements
BR-CRE-004
```

Rule identifiers should remain stable once referenced by other specifications.

---

# Rule Language

The following words have specific meaning:

**MUST**
Required behavior.

**MUST NOT**
Prohibited behavior.

**SHOULD**
Expected behavior unless a justified exception exists.

**MAY**
Permitted but not required behavior.

---

# 1. User & Identity

### BR-USR-001 — Single User Model

Mosaic MUST use a single general user model.

A separate Creator account type MUST NOT be required.

A User becomes a creator by publishing a Creation.

---

### BR-USR-002 — Authentication for Persistent Actions

Persistent user actions MUST require authentication.

This includes actions such as:

* publishing;
* liking;
* following;
* commenting;
* replying;
* saving;
* creating Collections;
* blocking;
* authenticated reporting.

Public browsing MAY remain available without authentication.

---

### BR-USR-003 — Email Privacy

A User's authentication email MUST NOT be publicly exposed through their Profile by default.

---

### BR-USR-004 — Email Identity

An email address MUST NOT normally identify more than one active Mosaic Account at the same time.

Exceptional recovery or migration cases MAY require controlled administrative handling.

---

### BR-USR-005 — Username Uniqueness

Each active public username MUST uniquely identify one Profile.

Username uniqueness MUST be evaluated case-insensitively.

Therefore:

```text
@Ana
@ana
@ANA
```

MUST NOT represent three different usernames.

---

### BR-USR-006 — Self-Following

A User MUST NOT follow themselves.

---

### BR-USR-007 — Creator Is Behavioral

Creator status MUST NOT grant additional platform permissions merely because the User has published content.

---

### BR-USR-008 — Account State

Account state MUST be considered when determining whether a User may perform protected actions.

Suspended, banned, or deleted accounts MUST NOT behave as unrestricted active accounts.

Exact capability restrictions depend on the account-state specification.

---

### BR-USR-009 — Deleted Identity

When historical content is legitimately preserved after account deletion, Mosaic SHOULD avoid exposing personal identity that should have been removed.

A neutral representation such as:

```text
Deleted User
```

MAY be used where necessary.

---

# 2. Profiles

### BR-PRO-001 — Profile Relationship

Every normal Mosaic Account MUST have an associated Profile representation.

Authentication information and public Profile information MUST remain conceptually separate.

---

### BR-PRO-002 — Public Authorship

When a public Creation has an identifiable active author, Mosaic MUST provide a path from the Creation to that author's public Profile.

---

### BR-PRO-003 — Profile Ownership

A User MUST NOT modify another User's Profile through ordinary product functionality.

Authorized moderation or administrative procedures are separate from ordinary Profile ownership.

---

# 3. Creations & Publication

### BR-CRE-001 — Creation Ownership

Every normally published Creation MUST have an author or a valid historical author representation.

---

### BR-CRE-002 — Minimum Publication Content

A Creation MUST contain the minimum information required to function as a meaningful Mosaic artifact before publication.

At minimum, the current product model requires:

* Author;
* Generated Result;
* Prompt or equivalent generation instructions;
* Basic identification.

Exact field-level validation will be defined in Functional Requirements.

---

### BR-CRE-003 — Drafts Are Not Published Creations

A Draft MUST NOT be treated as publicly published content.

Draft visibility MUST remain restricted according to the future Draft specification.

---

### BR-CRE-004 — Publication Creates a Historical Creative State

Once published, a Creation represents a specific creative state.

Its creative meaning MUST NOT be silently transformed into materially different work through ordinary editing.

---

### BR-CRE-005 — Non-Material Corrections

A creator MAY edit non-material information on their Creation.

Examples include:

* typographical correction;
* formatting correction;
* metadata correction;
* tag adjustment.

Such corrections MUST NOT create a new creative Lineage node solely because they occurred.

---

### BR-CRE-006 — Material Creative Change

A meaningful creative evolution MUST be published as a new Creation rather than replacing the historical meaning of the previous Creation.

Examples may include:

* substantially changed Prompt;
* different generation technique;
* materially different generated result;
* adaptation to another AI model;
* important generation-parameter changes;
* meaningfully different creative approach.

---

### BR-CRE-007 — Previous Creation Preservation

Publishing a new derived Creation MUST NOT overwrite its source Creation.

Example:

```text
Creation A
     ↓
Creation B
```

A and B remain separate Creations.

---

### BR-CRE-008 — Self-Derivation

A creator MAY publish a new Creation derived from their own previous Creation.

This relationship MUST participate in the same underlying Lineage model used for other derived Creations.

---

### BR-CRE-009 — Publication Identity

Every published Creation MUST have a stable platform identity.

Editing permitted metadata MUST NOT create a different Creation identity.

---

### BR-CRE-010 — Removal Is Not Creative Evolution

Removing, restricting, restoring, or moderating a Creation MUST NOT create a new creative version.

These are lifecycle or moderation-state changes.

---

# 4. Prompt System

### BR-PRM-001 — Prompt Requirement

Every published Creation MUST contain a Prompt or equivalent generation instructions sufficient to represent the creative generation process according to the supported publication model.

---

### BR-PRM-002 — Plain Text Validity

A plain-text Prompt MUST be a valid Prompt representation.

Structured customization MUST NOT be mandatory for every Creation.

---

### BR-PRM-003 — Optional Structure

Creators MAY add structured information to a Prompt.

Mosaic MUST NOT require all Prompts to follow one universal creative structure.

---

### BR-PRM-004 — Prompt Preservation

The Prompt associated with a published Creation MUST remain historically attributable to that Creation.

Material Prompt evolution MUST follow BR-CRE-006.

---

### BR-PRM-005 — Generation Context Separation

AI provider, model, model version, and generation parameters MUST be treated as Generation Context rather than internal Creation versions.

---

### BR-PRM-006 — Provider Independence

Mosaic MUST NOT require every Creation to use one fixed AI provider or model.

---

### BR-PRM-007 — Unknown Tools

A Creation SHOULD remain representable even when Mosaic does not have structured knowledge of the generation tool or model used.

---

# 5. Prompt Customization

### BR-CUS-001 — Customization Does Not Publish

Customizing a Prompt MUST NOT automatically create a public Creation.

---

### BR-CUS-002 — Customization Does Not Modify Source

Customizing a Prompt MUST NOT modify the source Creation.

---

### BR-CUS-003 — Variables Are Optional

A creator MAY define customizable elements.

A Creation MUST NOT require customizable variables in order to be valid.

---

### BR-CUS-004 — Creator Variables Are Guidance

Creator-defined customizable elements MUST NOT prevent users from manually modifying other portions of the Prompt where product functionality allows manual customization.

---

### BR-CUS-005 — Suggested Values

Suggested customization values SHOULD guide the user rather than restrict them unless a future field type explicitly requires constrained values.

---

### BR-CUS-006 — Customized Prompt Is Private Working State

A customized Prompt MUST remain a private working state until the User intentionally performs a publication action.

---

### BR-CUS-007 — Publication After Customization

When a User starts from Creation A, customizes its Prompt, generates a result, and intentionally publishes that work through the derived-publication flow, the resulting Creation MUST preserve A as its direct parent.

---

### BR-CUS-008 — External Generation

Mosaic MUST allow the initial product model to function when generation occurs outside Mosaic.

Direct AI generation integration MUST NOT be required for the core Creation workflow.

---

# 6. Remix & Lineage

### BR-LIN-001 — Derived Creation Independence

A Remix or other derived publication MUST be an independent Creation.

---

### BR-LIN-002 — Direct Parent

A derived Creation MUST preserve its direct parent relationship.

Example:

```text
A → B → C
```

C's direct parent is B.

Mosaic MUST NOT flatten this relationship into:

```text
A → C
```

---

### BR-LIN-003 — Origin

Mosaic MAY determine the root/origin of a Lineage by following ancestry.

Origin MUST NOT replace the direct-parent relationship.

---

### BR-LIN-004 — Original Meaning

Within Mosaic, an Original Creation means a Creation with no Mosaic Lineage parent.

The term MUST NOT be presented as a legal determination that the content is universally original intellectual property.

---

### BR-LIN-005 — Public Remixability

Public Creations MUST be remixable by default under Mosaic's current product model.

---

### BR-LIN-006 — Descendant Ownership

The author of a parent Creation MUST NOT gain ownership of a descendant Creation merely because the descendant was derived from their work.

---

### BR-LIN-007 — No Creative Veto

A creator MUST NOT directly delete another User's derived Creation merely because they disagree with it.

Potential rule violations MUST be handled through reporting and moderation.

---

### BR-LIN-008 — No Cascading Removal

Removing a Creation MUST NOT automatically remove all descendants.

Each descendant remains independently subject to Mosaic's availability and moderation rules.

---

### BR-LIN-009 — Tombstone Preservation

When an unavailable intermediate Creation is necessary to preserve Lineage structure, Mosaic SHOULD preserve a limited unavailable node rather than falsely reconnecting its parent and child.

Example:

```text
A
↓
[Creation unavailable]
↓
C
```

---

### BR-LIN-010 — Blocking Does Not Rewrite Lineage

Blocking another User MUST NOT remove or rewrite historical Lineage relationships.

---

### BR-LIN-011 — Acyclic Lineage

A Creation MUST NOT become its own ancestor.

Mosaic MUST prevent Lineage cycles.

---

### BR-LIN-012 — Parent Precedence

A direct parent MUST logically exist before the child Creation is published.

---

### BR-LIN-013 — Copying Is Not Publication

Copying a Prompt or customizing it privately MUST NOT create a Lineage node.

Lineage is created when the resulting derived work is intentionally published with the relationship preserved.

---

### BR-LIN-014 — Similarity Is Not Lineage Proof

Content similarity alone MUST NOT automatically establish a Lineage relationship.

---

### BR-LIN-015 — Controlled Lineage Correction

Historical Lineage corrections MUST NOT be available as unrestricted ordinary editing.

Authorized correction procedures MUST be controlled and auditable.

---

# 7. Discovery & Search

### BR-DIS-001 — Public Discovery

Public Creations SHOULD be discoverable without requiring authentication unless visibility, moderation, or safety rules prevent access.

---

### BR-DIS-002 — Relevance Is Not Popularity

Discovery MUST NOT treat popularity as universally equivalent to relevance or quality.

---

### BR-DIS-003 — Engagement as Signal

Likes, comments, Saves, follows, shares, and other engagement MAY contribute to Discovery signals.

They MUST NOT individually function as automatic proof of quality.

---

### BR-DIS-004 — Moderated Content

Content removed by moderation MUST NOT normally appear in public Discovery surfaces.

Limited tombstones required for Lineage are not public Discovery results.

---

### BR-DIS-005 — Discovery Diversity

Discovery SHOULD provide reasonable opportunities for:

* new Creations;
* emerging creators;
* niche interests;
* different creative approaches.

Follower count MUST NOT be the sole route to visibility.

---

### BR-DIS-006 — Anonymous Use

Anonymous visitors MAY:

* browse public Creations;
* view public Profiles;
* use public Search.

Persistent personalized actions require authentication according to BR-USR-002.

---

# 8. Social

### BR-SOC-001 — Social and Creative Graph Independence

Social relationships and creative Lineage relationships MUST remain conceptually independent.

Following another User MUST NOT be required to Remix their public Creation.

Remixing another User's Creation MUST NOT automatically Follow them.

---

### BR-SOC-002 — Directional Follow

Following MUST be directional.

```text
A follows B
```

MUST NOT automatically mean:

```text
B follows A
```

---

### BR-SOC-003 — One Active Like

A User MUST have at most one active Like on the same Creation.

---

### BR-SOC-004 — Unlike

A User MAY remove their own active Like.

Removing a Like MUST NOT remove unrelated relationships such as:

* Save;
* Follow;
* Comment;
* Lineage.

---

### BR-SOC-005 — Comments Belong to Creations

Comments MUST belong to specific Creations.

A derived Creation MUST have its own discussion context.

---

### BR-SOC-006 — Comment Ownership

A normal User MUST NOT edit another User's comment.

Authorized moderation actions are separate.

---

### BR-SOC-007 — Comment Deletion and Replies

Deleting a parent comment MUST NOT automatically delete legitimate replies authored by other Users.

Mosaic SHOULD preserve discussion structure through an appropriate deleted-content representation.

---

### BR-SOC-008 — Share Does Not Create Lineage

Sharing a Creation MUST NOT create another Creation or Lineage relationship.

---

### BR-SOC-009 — Social Independence

Removing one social relationship MUST NOT automatically remove unrelated relationships.

For example:

```text
Unfollow
```

MUST NOT automatically:

```text
Unlike
Delete Comments
Remove Saves
Destroy Lineage
```

---

# 9. Saves & Collections

### BR-COL-001 — Save and Like Independence

Save and Like MUST remain independent actions.

---

### BR-COL-002 — One Active Save

A User MUST have at most one active Save relationship with the same Creation.

---

### BR-COL-003 — Save Privacy

The identity of individual Users who Save a Creation MUST remain private by default.

---

### BR-COL-004 — Collections Are Organizational

A Collection organizes references to Creations.

It MUST NOT own or duplicate those Creations.

---

### BR-COL-005 — Multiple Collections

The same Creation MAY belong to multiple Collections owned by the same User.

---

### BR-COL-006 — Independent Membership

Removing a Creation from one Collection MUST NOT remove it from other Collections.

---

### BR-COL-007 — Collection Deletion

Deleting a Collection MUST NOT delete its referenced Creations.

---

### BR-COL-008 — Collection Ownership

Owning a Collection MUST NOT grant authorship or ownership over the Creations contained within it.

---

### BR-COL-009 — Private by Default

Personal Collections MUST be private by default under the current product model.

---

### BR-COL-010 — Collections Do Not Affect Lineage

Adding or removing a Creation from a Collection MUST NOT alter creative Lineage.

---

### BR-COL-011 — Private Personalization

Private Save or Collection behavior MAY inform internal personalization.

Using it internally MUST NOT automatically make that behavior publicly visible.

---

### BR-COL-012 — Save Timestamp

Mosaic SHOULD preserve when a Save relationship was created.

---

### BR-COL-013 — Collection Membership

Collection membership MUST be treated as an independent relationship rather than duplication of Creation content.

---

# 10. Notifications

### BR-NOT-001 — Event Relevance

Not every platform event MUST generate a notification.

Notification rules determine whether an event is relevant to a recipient.

---

### BR-NOT-002 — Notification Independence

Failure to create or deliver a notification MUST NOT invalidate the source action.

Example:

```text
Remix published successfully
+
Notification fails
```

The Remix remains valid.

---

### BR-NOT-003 — Recipient

Every personal notification MUST have an intended recipient.

---

### BR-NOT-004 — Notification Context

A notification SHOULD preserve enough context to explain the relevant event and navigate to it when available.

---

### BR-NOT-005 — Self-Notification

Mosaic SHOULD NOT generate redundant notifications informing a User about an intentional action they just performed themselves.

---

### BR-NOT-006 — Remix Recipient

When a derived Creation is published, the creator of the direct parent SHOULD be the primary Remix notification recipient.

Ancestors MUST NOT automatically receive an individual notification for every descendant.

---

### BR-NOT-007 — Unlike Notification

Removing a Like MUST NOT generate a negative social notification to the Creation author.

---

### BR-NOT-008 — Read State

Reading a notification MUST NOT alter the source event or relationship.

---

### BR-NOT-009 — Notification Grouping

Similar high-frequency, low-urgency notifications MAY be grouped.

Materially different high-impact events MUST NOT be grouped in a way that obscures their meaning.

---

### BR-NOT-010 — Report Confidentiality

Submitting a report MUST NOT automatically notify the reported User that a specific person reported them.

---

### BR-NOT-011 — Security Communication

Critical account or security communication MAY bypass ordinary social notification preferences where necessary.

---

# 11. Moderation & Trust

### BR-MOD-001 — Report Is Not Verdict

A report MUST be treated as a moderation signal rather than proof that a violation occurred.

---

### BR-MOD-002 — Report Volume Is Not Guilt

The number of reports MAY influence prioritization.

Report volume MUST NOT automatically determine that content violated Mosaic's rules.

---

### BR-MOD-003 — Hybrid Moderation

Mosaic MAY use automated and AI-assisted moderation for:

* triage;
* classification;
* prioritization;
* evidence organization;
* recommendations.

Human review MUST remain available for appropriate ambiguous or high-impact cases.

---

### BR-MOD-004 — Enforcement Separation

Content enforcement and account enforcement MUST remain separate decisions.

Removing one Creation MUST NOT automatically permanently ban its author.

---

### BR-MOD-005 — Proportionality

Moderation actions SHOULD be proportional to the nature and severity of the violation.

---

### BR-MOD-006 — Appeals

Meaningful eligible moderation actions MUST support an appeal mechanism.

---

### BR-MOD-007 — Restoration

When an appeal or review determines that existing content should be restored, Mosaic SHOULD restore the existing entity rather than create a duplicate replacement.

---

### BR-MOD-008 — Review State

A moderation review MUST apply to the content state actually reviewed.

Materially changed content MUST NOT automatically inherit a previous no-violation determination.

---

### BR-MOD-009 — Reviewed Is Not Immune

Previously reviewed content MUST remain reportable for:

* different violations;
* new evidence;
* changed content;
* materially new context.

---

### BR-MOD-010 — Duplicate Report Handling

Equivalent reports against the same reviewed content state for the same reason MAY be filtered or deprioritized.

---

### BR-MOD-011 — Auditability

Meaningful moderation actions MUST be auditable.

The platform SHOULD preserve sufficient information to determine:

* what occurred;
* when;
* what content state was evaluated;
* applicable rule;
* decision source;
* resulting action.

---

### BR-MOD-012 — Reporter Privacy

Reporter identity MUST NOT automatically be disclosed to the reported User.

---

### BR-MOD-013 — Reporting Abuse

The reporting system itself MUST remain subject to abuse prevention and moderation.

---

### BR-MOD-014 — Moderation Does Not Rewrite Lineage

Moderation MUST NOT falsely flatten historical Lineage.

---

# 12. Blocking

The complete blocking visibility matrix remains an open product decision.

The following rules are already established.

### BR-BLK-001 — Blocking Is Not Moderation

Blocking MUST remain a personal interaction-control mechanism.

It MUST NOT be treated as proof that the blocked User violated platform rules.

---

### BR-BLK-002 — Historical Lineage

Blocking MUST NOT destroy existing historical Lineage relationships.

---

### BR-BLK-003 — Future Interaction

Blocking SHOULD prevent future direct interaction where the final blocking policy determines that interaction is prohibited.

---

# 13. Administration

### BR-ADM-001 — Authorization

Administrative actions MUST require explicit authorization.

Discovering an administrative interface or endpoint MUST NOT itself grant administrative capability.

---

### BR-ADM-002 — Least Privilege

Privileged accounts SHOULD receive only the permissions necessary for their responsibilities.

---

### BR-ADM-003 — Privileged Role Assignment

Users MUST NOT self-assign Moderator or Administrator privileges through ordinary product functionality.

---

### BR-ADM-004 — Authorship Preservation

Administrative management of content MUST NOT transfer authorship to the Administrator.

---

### BR-ADM-005 — User Content Integrity

Administrators SHOULD NOT silently rewrite user creative expression through ordinary administrative workflows.

---

### BR-ADM-006 — Lineage Correction

Administrative Lineage corrections MUST be controlled and auditable.

---

### BR-ADM-007 — Administrative Reasons

High-impact administrative actions MUST record a meaningful reason.

---

### BR-ADM-008 — Administrative Audit

High-impact privileged actions MUST produce appropriate audit records.

---

### BR-ADM-009 — Audit Integrity

A privileged User MUST NOT be able to casually erase the audit evidence of their own privileged actions.

---

### BR-ADM-010 — Private Data Access

Administrative privileges MUST NOT be interpreted as unrestricted justification to inspect unrelated private User information.

---

### BR-ADM-011 — Reversibility

Where technically, legally, and operationally appropriate, administrative actions SHOULD prefer reversible restriction over immediate irreversible destruction.

---

# 14. Cross-System Integrity

Some rules apply across Mosaic rather than to a single subsystem.

### BR-INT-001 — Relationship Independence

Independent Mosaic relationships MUST NOT be unnecessarily coupled.

Examples:

```text
Follow
Like
Save
Comment
Collection Membership
Lineage
Block
```

Changing one relationship MUST NOT implicitly change another unless an explicit Business Rule defines that dependency.

---

### BR-INT-002 — Historical Integrity

Actions that change current visibility or availability MUST NOT falsely rewrite historical creative relationships.

---

### BR-INT-003 — Source of Truth

Derived representations MUST NOT replace the underlying source state.

Examples:

```text
Notification
≠
Source Event

Search Index
≠
Creation

Collection Membership
≠
Creation

Lineage Tombstone
≠
Available Creation
```

---

### BR-INT-004 — Public vs Private Behavior

Internal use of private behavioral information MUST NOT automatically make that behavior publicly visible.

---

### BR-INT-005 — Build for Evolution

Mosaic's core domain MUST avoid unnecessary dependency on:

* one AI provider;
* one AI model;
* one Prompt structure;
* one media implementation;
* one discovery algorithm.

Future evolution SHOULD be possible without redefining the meaning of Mosaic's stable core concepts.

---

# Open Business Decisions

Not every Product-level open decision should be converted into a Business Rule prematurely.

The following areas still require decisions before their final rules can be specified:

```text
Username changes
Private accounts

Exact Edit vs New Creation boundary

One vs multiple direct Lineage parents
Self-republication terminology
Lineage parent correction workflow
Tombstone visibility

Initial feed ranking
Following feed ordering
Category governance
Tag governance

Self-Likes
Comment reply depth
Creator comment controls
Internal reposting
View definition
Metric visibility

Save ↔ Collection relationship
Collection ordering
Save counts
Saving own Creations
Unavailable saved-content behavior

Follow notifications
Save notifications
Notification retention
Email notification behavior

Anonymous reporting
Final moderation categories
Enforcement ladder
Low-effort Remix boundaries
Content visibility during moderation review

Blocking visibility matrix

Suspension model
High-risk administrative safeguards
Administrator assignment
Bootstrap administration
```

These decisions should remain visible rather than being silently resolved during implementation.

---

# Traceability

Business Rules form the bridge between Product documentation and implementation specifications.

Conceptually:

```text
PRODUCT
"What should Mosaic mean and do?"
        ↓
BUSINESS RULES
"What must be true?"
        ↓
USER FLOWS
"How does the user move through it?"
        ↓
FUNCTIONAL REQUIREMENTS
"What must the system provide?"
        ↓
TECHNICAL DESIGN
"How will we build it?"
        ↓
TESTS
"How do we prove it works?"
```

Future specifications SHOULD reference Business Rule identifiers whenever the relationship is useful.

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
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

* [User Flows](./user-flows.md)
* [Functional Requirements](./functional-requirements.md)
* [Non-Functional Requirements](./non-functional-requirements.md)

## Technical

* [Architecture](../03-technical/architecture.md)
* [Data Model](../03-technical/data-model.md)
* [API](../03-technical/api.md)
* [Security & Privacy](../03-technical/security.md)
* [Testing](../03-technical/testing.md)

---

[Documentation Home](../README.md) · **Next:** [User Flows →](./user-flows.md)
