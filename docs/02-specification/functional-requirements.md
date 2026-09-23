# Functional Requirements

> **Section:** Specification
> **Status:** Active Specification
> **Audience:** Product, Engineering & QA
> **Last updated:** September 2026

---

## Overview

This document defines the functional capabilities Mosaic must provide.

Functional Requirements describe **what the system must do**.

They do not define:

* framework choices;
* database technology;
* infrastructure provider;
* frontend architecture;
* API protocol;
* deployment topology;
* implementation details.

Those decisions belong to the Technical documentation.

---

# Requirement Format

Each requirement uses a stable identifier:

```text
FR-[DOMAIN]-[NUMBER]
```

Examples:

```text
FR-AUTH-001
FR-CRE-004
FR-LIN-007
```

Requirements may reference:

```text
Business Rule → BR-*
User Flow     → FLOW-*
```

This creates traceability between Product intent and implementation.

---

# Requirement Language

**MUST**
Required for the system to satisfy the specification.

**MUST NOT**
Behavior the system must prevent.

**SHOULD**
Expected behavior unless a justified implementation or product reason prevents it.

**MAY**
Permitted behavior that is not mandatory.

---

# 1. Authentication & Accounts

### FR-AUTH-001 — Account Registration

Mosaic MUST provide a registration mechanism that allows a Visitor to create an Account using:

* email;
* username;
* password.

**Traceability:** BR-USR-001, BR-USR-004, BR-USR-005 · FLOW-002

---

### FR-AUTH-002 — Email Validation

The system MUST validate that the submitted email is acceptable before completing normal registration.

**Traceability:** BR-USR-004 · FLOW-002

---

### FR-AUTH-003 — Email Uniqueness

The system MUST prevent the same email from normally identifying multiple active Accounts.

**Traceability:** BR-USR-004 · FLOW-002

---

### FR-AUTH-004 — Username Validation

The system MUST validate username availability before registration succeeds.

**Traceability:** BR-USR-005 · FLOW-002

---

### FR-AUTH-005 — Case-Insensitive Username Uniqueness

Username uniqueness MUST be enforced case-insensitively.

**Traceability:** BR-USR-005 · FLOW-002

---

### FR-AUTH-006 — Password Protection

The system MUST process passwords through secure authentication mechanisms and MUST NOT expose stored password credentials through normal product or administrative functionality.

Detailed password security requirements belong to Security & Privacy.

**Traceability:** FLOW-002, FLOW-003

---

### FR-AUTH-007 — Sign In

Registered Users MUST be able to authenticate using supported credentials.

**Traceability:** FLOW-003

---

### FR-AUTH-008 — Authentication Failure

Invalid credentials MUST NOT create an authenticated session.

**Traceability:** FLOW-003

---

### FR-AUTH-009 — Authenticated Session

Successful authentication MUST establish a valid authenticated session or equivalent authenticated state.

**Traceability:** BR-USR-002, BR-USR-008 · FLOW-003

---

### FR-AUTH-010 — Protected Actions

The system MUST require authentication before executing protected persistent actions.

**Traceability:** BR-USR-002

---

### FR-AUTH-011 — Account State Enforcement

The system MUST consider Account state before allowing protected actions.

**Traceability:** BR-USR-008 · FLOW-003

---

# 2. Profiles

### FR-PRO-001 — Profile Creation

A normal Account registration MUST result in an associated Profile.

**Traceability:** BR-PRO-001 · FLOW-002

---

### FR-PRO-002 — Public Profile

The system MUST provide a public Profile representation for Users whose Profile is publicly accessible under current visibility rules.

**Traceability:** BR-PRO-001, BR-PRO-002

---

### FR-PRO-003 — Profile Authorship Navigation

Users MUST be able to navigate from an accessible Creation to its identifiable author's Profile where that Profile remains available.

**Traceability:** BR-PRO-002 · FLOW-001, FLOW-006

---

### FR-PRO-004 — Own Profile Editing

Authenticated Users MUST be able to modify Profile fields they are authorized to control.

**Traceability:** BR-PRO-003

---

### FR-PRO-005 — Profile Ownership Enforcement

Ordinary Users MUST NOT be able to modify another User's Profile.

**Traceability:** BR-PRO-003

---

### FR-PRO-006 — Private Authentication Data

The public Profile MUST NOT expose the User's authentication email by default.

**Traceability:** BR-USR-003

---

### FR-PRO-007 — Deleted Identity Representation

Where preserved historical content requires an author representation after identity removal, the system SHOULD support a neutral deleted-user representation.

**Traceability:** BR-USR-009

---

# 3. Creations

### FR-CRE-001 — Start Creation

Authenticated Users with publication permission MUST be able to begin creating a Creation.

**Traceability:** FLOW-004

---

### FR-CRE-002 — Draft State

The system MUST support Creation content existing before public publication without treating it as a published Creation.

**Traceability:** BR-CRE-003 · FLOW-004

---

### FR-CRE-003 — Generated Media

The publication workflow MUST allow the User to associate generated media with a Creation.

**Traceability:** BR-CRE-002 · FLOW-004

---

### FR-CRE-004 — Prompt Association

The publication workflow MUST allow a Prompt or equivalent generation instructions to be associated with the Creation.

**Traceability:** BR-CRE-002, BR-PRM-001 · FLOW-004

---

### FR-CRE-005 — Generation Context

The publication workflow MUST allow supported Generation Context to be associated with the Creation.

This may include:

* provider;
* model;
* model version;
* generation parameters.

**Traceability:** BR-PRM-005 · FLOW-004

---

### FR-CRE-006 — Publication Validation

Before publication, the system MUST validate required Creation information.

**Traceability:** BR-CRE-002 · FLOW-004

---

### FR-CRE-007 — Stable Creation Identity

Every successfully published Creation MUST receive a stable platform identity.

**Traceability:** BR-CRE-009

---

### FR-CRE-008 — Original Creation

The system MUST support publishing a Creation without a Mosaic Lineage parent.

**Traceability:** BR-LIN-004 · FLOW-004

---

### FR-CRE-009 — Creation Viewing

Users with access MUST be able to view the relevant public representation of a Creation.

The representation SHOULD expose applicable information such as:

* generated result;
* author;
* Prompt;
* Generation Context;
* description;
* discovery metadata;
* Lineage information;
* social interactions.

**Traceability:** FLOW-001, FLOW-006

---

### FR-CRE-010 — Author Editing

Creation authors MUST be able to edit fields permitted by the current editing rules.

**Traceability:** BR-CRE-005 · FLOW-005

---

### FR-CRE-011 — Ownership Enforcement

Ordinary Users MUST NOT edit another User's Creation.

---

### FR-CRE-012 — Non-Material Update

Permitted non-material edits MUST preserve the existing Creation identity.

**Traceability:** BR-CRE-005, BR-CRE-009 · FLOW-005

---

### FR-CRE-013 — Material Evolution

The system MUST provide a path for meaningful creative evolution to become a new derived Creation instead of silently replacing the source Creation.

**Traceability:** BR-CRE-004, BR-CRE-006, BR-CRE-007 · FLOW-005, FLOW-011

---

### FR-CRE-014 — Independent Derived Publication

Publishing a derived Creation MUST create a new Creation identity.

**Traceability:** BR-CRE-007, BR-LIN-001

---

### FR-CRE-015 — Availability State

The system MUST support Creation availability changing without treating the change as creative evolution.

**Traceability:** BR-CRE-010 · FLOW-027, FLOW-030

---

### FR-CRE-016 — Restoration

Where authorized, the system MUST be capable of restoring an existing Creation rather than requiring creation of a duplicate.

**Traceability:** BR-MOD-007 · FLOW-030

---

# 4. Prompt System

### FR-PRM-001 — Plain-Text Prompt

The system MUST support plain text as a valid Prompt representation.

**Traceability:** BR-PRM-002

---

### FR-PRM-002 — Structured Prompt Information

The system MAY support optional structured Prompt information without requiring every Prompt to use the same structure.

**Traceability:** BR-PRM-003

---

### FR-PRM-003 — Prompt Display

Accessible Creation views MUST be capable of displaying the Prompt associated with the Creation according to visibility rules.

**Traceability:** FLOW-001, FLOW-006

---

### FR-PRM-004 — Prompt Historical Association

The system MUST preserve the association between a published Creation and the Prompt representing that creative state.

**Traceability:** BR-PRM-004

---

### FR-PRM-005 — Provider Representation

Generation Context MUST support providers without making one provider mandatory for every Creation.

**Traceability:** BR-PRM-006

---

### FR-PRM-006 — Model Representation

Generation Context MUST support model information where available.

**Traceability:** BR-PRM-005

---

### FR-PRM-007 — Model Version Representation

Model version MUST be representable independently from Creation identity or creative versioning.

**Traceability:** BR-PRM-005

---

### FR-PRM-008 — Flexible Generation Parameters

The system SHOULD allow Generation Context to represent model/provider-specific parameters without requiring one universal parameter schema for all providers.

---

### FR-PRM-009 — Unknown Generation Tool

The publication model SHOULD allow a creator to represent generation context even when Mosaic does not maintain structured knowledge of the tool used.

**Traceability:** BR-PRM-007

---

# 5. Prompt Customization

### FR-CUS-001 — Start Customization

Authenticated Users MUST be able to begin Prompt customization from an accessible Creation where customization is allowed.

**Traceability:** FLOW-008

---

### FR-CUS-002 — Source Preservation

Starting or changing a customization MUST NOT modify the source Creation.

**Traceability:** BR-CUS-002 · FLOW-008

---

### FR-CUS-003 — Customizable Elements

The system MUST support Creations without structured customizable elements.

Where customizable elements exist, the system MUST be capable of presenting them to the User.

**Traceability:** BR-CUS-003

---

### FR-CUS-004 — Customization Values

Users MUST be able to provide values for supported customizable elements.

**Traceability:** FLOW-008

---

### FR-CUS-005 — Manual Prompt Modification

Where the customization interface supports manual editing, creator-defined variables MUST NOT unnecessarily prevent modification of other Prompt content.

**Traceability:** BR-CUS-004

---

### FR-CUS-006 — Suggested Values

The system MAY present creator-defined suggested values during customization.

**Traceability:** BR-CUS-005

---

### FR-CUS-007 — Customized Prompt Preview

The customization experience SHOULD provide a representation of the resulting customized Prompt before publication.

**Traceability:** FLOW-008

---

### FR-CUS-008 — Private Customization State

Customization MUST NOT automatically create a public Creation.

**Traceability:** BR-CUS-001, BR-CUS-006

---

### FR-CUS-009 — Source Context Retention

When customization begins from Creation A, the system MUST preserve sufficient source context to associate a later derived publication with A when the User follows the intended publication journey.

**Traceability:** BR-CUS-007 · FLOW-009

---

### FR-CUS-010 — External Generation Workflow

The system MUST support obtaining and using the customized Prompt outside Mosaic before returning to publish the generated result.

**Traceability:** BR-CUS-008 · FLOW-009

---

# 6. Remix & Lineage

### FR-LIN-001 — Start Remix

An authenticated User MUST be able to start a derived-publication workflow from an accessible public Creation under current Remix rules.

**Traceability:** BR-LIN-005 · FLOW-010

---

### FR-LIN-002 — New Derived Identity

Publishing a Remix MUST create a new independent Creation.

**Traceability:** BR-LIN-001 · FLOW-009, FLOW-010

---

### FR-LIN-003 — Direct Parent Preservation

A derived Creation MUST preserve its direct parent.

**Traceability:** BR-LIN-002 · FLOW-009, FLOW-010

---

### FR-LIN-004 — Multi-Generation Lineage

The system MUST preserve immediate parent relationships across multiple generations.

Given:

```text
A → B → C
```

C MUST identify B as its direct parent.

**Traceability:** BR-LIN-002

---

### FR-LIN-005 — Origin Resolution

The system SHOULD be capable of resolving the root Creation of a Lineage through ancestry.

**Traceability:** BR-LIN-003 · FLOW-012

---

### FR-LIN-006 — Self-Derivation

The system MUST allow a User to create a derived Creation from their own Creation.

**Traceability:** BR-CRE-008 · FLOW-011

---

### FR-LIN-007 — Parent Preservation

Publishing a child MUST NOT overwrite its parent.

**Traceability:** BR-CRE-007

---

### FR-LIN-008 — Descendant Independence

A parent author MUST NOT receive ordinary ownership controls over descendants authored by other Users.

**Traceability:** BR-LIN-006, BR-LIN-007 · FLOW-021

---

### FR-LIN-009 — Descendant Survival

Making one Creation unavailable MUST NOT automatically make all descendants unavailable.

**Traceability:** BR-LIN-008 · FLOW-027

---

### FR-LIN-010 — Tombstone Capability

The system MUST be capable of representing an unavailable Lineage node without falsely reconnecting surrounding nodes.

**Traceability:** BR-LIN-009 · FLOW-012, FLOW-027

---

### FR-LIN-011 — Cycle Prevention

The system MUST prevent Lineage operations that would cause a Creation to become its own ancestor.

**Traceability:** BR-LIN-011

---

### FR-LIN-012 — Parent Temporal Validity

A child publication MUST NOT reference a future nonexistent Creation as its direct parent.

**Traceability:** BR-LIN-012

---

### FR-LIN-013 — No Private-Lineage Creation

Copying or privately customizing a Prompt MUST NOT itself create a public Lineage node.

**Traceability:** BR-LIN-013 · FLOW-008

---

### FR-LIN-014 — Lineage Exploration

Users with access SHOULD be able to navigate relevant Lineage relationships, including:

* direct parent;
* origin;
* direct descendants;
* branches.

**Traceability:** FLOW-012

---

### FR-LIN-015 — Controlled Lineage Correction

Ordinary Creation editing MUST NOT permit unrestricted replacement of historical parent relationships.

Authorized correction MUST use a controlled process.

**Traceability:** BR-LIN-015 · FLOW-029

---

# 7. Discovery & Search

### FR-DIS-001 — Public Discovery

The system MUST provide at least one public surface through which accessible Creations can be discovered.

**Traceability:** BR-DIS-001 · FLOW-001, FLOW-006

---

### FR-DIS-002 — Public Search

Visitors and authenticated Users MUST be able to search accessible public content.

**Traceability:** BR-DIS-006 · FLOW-007

---

### FR-DIS-003 — Search Query

Search MUST accept a User query and return matching accessible results.

**Traceability:** FLOW-007

---

### FR-DIS-004 — Creation Result Navigation

Users MUST be able to open an accessible Creation from Discovery or Search results.

**Traceability:** FLOW-006, FLOW-007

---

### FR-DIS-005 — Profile Discovery

Public creator Profiles SHOULD be discoverable through relevant product surfaces.

---

### FR-DIS-006 — Moderation Visibility

Content removed from normal public availability MUST NOT continue appearing as an ordinary public Discovery result.

**Traceability:** BR-DIS-004 · FLOW-027

---

### FR-DIS-007 — Discovery Signal Flexibility

The Discovery system MUST allow multiple relevance signals rather than requiring follower count or popularity to be the sole ranking mechanism.

**Traceability:** BR-DIS-002, BR-DIS-003, BR-DIS-005

---

### FR-DIS-008 — Lineage Discovery

Accessible Lineage relationships SHOULD provide navigation opportunities to related Creations.

**Traceability:** FLOW-012

---

### FR-DIS-009 — Discovery Extensibility

The Discovery model SHOULD allow future surfaces such as:

* Following;
* Categories;
* Tags;
* Trending;
* Recommendations;
* model pages;
* provider pages.

Their inclusion here does not make every surface an initial implementation requirement.

---

# 8. Following

### FR-FOL-001 — Follow User

An authenticated User MUST be able to follow another eligible User.

**Traceability:** BR-SOC-002 · FLOW-014

---

### FR-FOL-002 — Self-Follow Prevention

The system MUST prevent a User from following themselves.

**Traceability:** BR-USR-006

---

### FR-FOL-003 — Directional Relationship

Following MUST create a directional relationship.

**Traceability:** BR-SOC-002

---

### FR-FOL-004 — Unfollow

A User MUST be able to remove their own Follow relationship.

**Traceability:** FLOW-014

---

### FR-FOL-005 — Unfollow Independence

Unfollowing MUST NOT automatically remove unrelated Likes, Saves, Comments, or Lineage relationships.

**Traceability:** BR-SOC-009, BR-INT-001

---

# 9. Likes

### FR-LIK-001 — Like Creation

An authenticated User MUST be able to Like an eligible Creation.

**Traceability:** FLOW-013

---

### FR-LIK-002 — Like Uniqueness

The system MUST prevent more than one active Like relationship between the same User and Creation.

**Traceability:** BR-SOC-003

---

### FR-LIK-003 — Unlike Creation

A User MUST be able to remove their own Like.

**Traceability:** BR-SOC-004 · FLOW-013

---

### FR-LIK-004 — Like Independence

Like state MUST remain independent from Save, Follow, Comment, and Lineage state.

**Traceability:** BR-SOC-004, BR-COL-001, BR-INT-001

---

# 10. Comments & Replies

### FR-COM-001 — Create Comment

An authenticated User MUST be able to publish a Comment on an eligible Creation.

**Traceability:** BR-SOC-005 · FLOW-015

---

### FR-COM-002 — Creation Association

Every Comment MUST identify the Creation discussion to which it belongs.

**Traceability:** BR-SOC-005

---

### FR-COM-003 — Reply

The system MUST support replying to Comments.

**Traceability:** FLOW-015

---

### FR-COM-004 — Comment Ownership

Ordinary Users MUST NOT edit another User's Comment.

**Traceability:** BR-SOC-006

---

### FR-COM-005 — Own Comment Editing

Users SHOULD be able to edit their own eligible Comments.

The exact edit-history behavior remains an Open Decision.

---

### FR-COM-006 — Own Comment Deletion

Users SHOULD be able to remove their own eligible Comments.

---

### FR-COM-007 — Reply Preservation

Removing a parent Comment MUST NOT automatically delete legitimate replies authored by other Users.

**Traceability:** BR-SOC-007

---

### FR-COM-008 — Deleted Parent Representation

Where replies remain after parent deletion, the system SHOULD provide a limited representation preserving discussion structure.

**Traceability:** BR-SOC-007

---

# 11. Sharing

### FR-SHR-001 — Share Creation

The system MUST provide a mechanism for sharing a reference to an accessible Creation.

**Traceability:** FLOW-016

---

### FR-SHR-002 — Share Independence

Sharing MUST NOT create a new Creation.

**Traceability:** BR-SOC-008

---

### FR-SHR-003 — No Lineage From Share

Sharing MUST NOT create a Lineage relationship.

**Traceability:** BR-SOC-008

---

# 12. Saves

### FR-SAV-001 — Save Creation

An authenticated User MUST be able to Save an eligible Creation.

**Traceability:** FLOW-017

---

### FR-SAV-002 — Save Uniqueness

The system MUST allow at most one active Save relationship between the same User and Creation.

**Traceability:** BR-COL-002

---

### FR-SAV-003 — Unsave

A User MUST be able to remove their own Save relationship, subject to the unresolved Save/Collection behavior.

---

### FR-SAV-004 — Saved Content

Authenticated Users MUST have a private area where their saved Creations can be revisited.

**Traceability:** FLOW-017

---

### FR-SAV-005 — Save Privacy

The system MUST NOT publicly expose the identity of individual Users who saved a Creation by default.

**Traceability:** BR-COL-003

---

### FR-SAV-006 — Save Timestamp

The system SHOULD preserve when the Save relationship was created.

**Traceability:** BR-COL-012

---

### FR-SAV-007 — Save Independence

Saving MUST NOT automatically Like the Creation.

**Traceability:** BR-COL-001

---

# 13. Collections

### FR-COL-001 — Create Collection

Authenticated Users MUST be able to create personal Collections.

**Traceability:** FLOW-018, FLOW-019

---

### FR-COL-002 — Collection Name

A Collection MUST have a human-readable name.

---

### FR-COL-003 — Collection Ownership

Every personal Collection MUST have an owner.

---

### FR-COL-004 — Add Creation

A Collection owner MUST be able to add an eligible Creation to their Collection.

**Traceability:** FLOW-018

---

### FR-COL-005 — Multiple Membership

The same Creation MUST be capable of belonging to multiple Collections owned by the same User.

**Traceability:** BR-COL-005

---

### FR-COL-006 — No Content Duplication

Adding a Creation to a Collection MUST create an organizational relationship rather than duplicate the Creation.

**Traceability:** BR-COL-004, BR-COL-013

---

### FR-COL-007 — Remove From Collection

A Collection owner MUST be able to remove a Creation from that Collection.

**Traceability:** FLOW-019

---

### FR-COL-008 — Independent Collection Membership

Removing a Creation from one Collection MUST NOT remove it from other Collections.

**Traceability:** BR-COL-006

---

### FR-COL-009 — Delete Collection

A Collection owner MUST be able to delete their Collection.

**Traceability:** FLOW-019

---

### FR-COL-010 — Preserve Referenced Creations

Deleting a Collection MUST NOT delete the Creations referenced by it.

**Traceability:** BR-COL-007

---

### FR-COL-011 — Private Default

New personal Collections MUST be private by default under the current product model.

**Traceability:** BR-COL-009

---

### FR-COL-012 — No Authorship Transfer

Adding a Creation to a Collection MUST NOT grant its Collection owner authorship over that Creation.

**Traceability:** BR-COL-008

---

### FR-COL-013 — Lineage Independence

Collection membership changes MUST NOT modify Lineage.

**Traceability:** BR-COL-010

---

# 14. Notifications

### FR-NOT-001 — Notification Creation

The system MUST be capable of creating notifications from relevant platform events.

**Traceability:** BR-NOT-001 · FLOW-020

---

### FR-NOT-002 — Recipient Association

Every personal notification MUST identify its recipient.

**Traceability:** BR-NOT-003

---

### FR-NOT-003 — Event Context

A notification SHOULD preserve sufficient event context to communicate what occurred.

**Traceability:** BR-NOT-004

---

### FR-NOT-004 — Notification Destination

Where the source remains accessible, a notification SHOULD provide navigation to relevant context.

**Traceability:** BR-NOT-004 · FLOW-020

---

### FR-NOT-005 — Read State

The system MUST support unread/read notification state.

**Traceability:** BR-NOT-008

---

### FR-NOT-006 — Source Independence

Notification delivery failure MUST NOT roll back or invalidate the successful source action.

**Traceability:** BR-NOT-002

---

### FR-NOT-007 — Self-Notification Prevention

The system SHOULD avoid redundant notifications to Users for intentional actions they performed themselves.

**Traceability:** BR-NOT-005

---

### FR-NOT-008 — Remix Notification

When applicable, publishing a derived Creation SHOULD generate a notification for the creator of the direct parent.

**Traceability:** BR-NOT-006 · FLOW-021

---

### FR-NOT-009 — Ancestor Notification Control

Publishing a descendant MUST NOT automatically create individual Remix notifications for every ancestor in the Lineage.

**Traceability:** BR-NOT-006

---

### FR-NOT-010 — Unlike Silence

Removing a Like MUST NOT create a negative Unlike notification.

**Traceability:** BR-NOT-007

---

### FR-NOT-011 — Notification Grouping

The system MAY group similar high-frequency notifications while preserving meaningful context.

**Traceability:** BR-NOT-009

---

# 15. Reporting

### FR-REP-001 — Report Action

Authenticated Users MUST be able to report eligible content or behavior.

**Traceability:** FLOW-022

---

### FR-REP-002 — Report Target

A Report MUST identify its target.

---

### FR-REP-003 — Report Reason

A Report MUST contain a supported reason or classification.

The final taxonomy remains an Open Decision.

---

### FR-REP-004 — Additional Context

The reporting flow SHOULD allow the reporter to provide additional context where appropriate.

**Traceability:** FLOW-022

---

### FR-REP-005 — Report Submission

Submitting a Report MUST create a moderation signal rather than directly declaring the target guilty.

**Traceability:** BR-MOD-001

---

### FR-REP-006 — Reporter Privacy

The system MUST NOT automatically disclose reporter identity to the reported User.

**Traceability:** BR-MOD-012

---

### FR-REP-007 — Report Abuse Controls

The reporting system MUST support mechanisms for detecting or restricting abusive reporting behavior.

**Traceability:** BR-MOD-013

---

### FR-REP-008 — Duplicate Report Handling

The moderation system SHOULD be capable of identifying materially equivalent duplicate reports.

**Traceability:** BR-MOD-010 · FLOW-023

---

# 16. Moderation

### FR-MOD-001 — Moderation Case Processing

The system MUST provide an authorized process for evaluating moderation signals.

**Traceability:** FLOW-023, FLOW-024

---

### FR-MOD-002 — Automated Triage

The moderation system MAY use automated or AI-assisted analysis for triage and prioritization.

**Traceability:** BR-MOD-003 · FLOW-023

---

### FR-MOD-003 — Human Review

The system MUST support human review for cases requiring authorized human judgment.

**Traceability:** BR-MOD-003 · FLOW-024

---

### FR-MOD-004 — Content State Review

Moderation review SHOULD preserve or identify the relevant content state being evaluated.

**Traceability:** BR-MOD-008

---

### FR-MOD-005 — Moderation Decision

Authorized reviewers MUST be able to record a moderation decision.

**Traceability:** FLOW-024

---

### FR-MOD-006 — Enforcement Action

Authorized reviewers MUST be able to apply enforcement actions allowed by their permissions.

The final enforcement ladder remains an Open Decision.

---

### FR-MOD-007 — Content and Account Separation

The system MUST allow content enforcement and Account enforcement to be treated as separate decisions.

**Traceability:** BR-MOD-004

---

### FR-MOD-008 — Moderation Audit

Meaningful moderation decisions MUST generate sufficient audit information.

**Traceability:** BR-MOD-011

---

### FR-MOD-009 — Report Count Independence

The system MUST NOT automatically determine guilt solely from Report volume.

**Traceability:** BR-MOD-002

---

### FR-MOD-010 — Lineage Preservation

Moderating a Creation MUST NOT falsely rewrite its historical Lineage.

**Traceability:** BR-MOD-014

---

# 17. Appeals

### FR-APL-001 — Appeal Availability

Eligible meaningful moderation actions MUST support an appeal path.

**Traceability:** BR-MOD-006 · FLOW-025

---

### FR-APL-002 — Appeal Submission

An eligible affected User MUST be able to submit an Appeal.

**Traceability:** FLOW-025

---

### FR-APL-003 — Appeal Review

Authorized reviewers MUST be able to review submitted Appeals.

---

### FR-APL-004 — Appeal Decision

An Appeal MUST be capable of producing a recorded outcome.

---

### FR-APL-005 — Restoration

When an Appeal results in restoration, the system SHOULD restore the existing entity rather than create a replacement duplicate.

**Traceability:** BR-MOD-007 · FLOW-025, FLOW-030

---

### FR-APL-006 — Appeal Auditability

Appeal actions and outcomes SHOULD be connected to the relevant moderation history.

**Traceability:** BR-MOD-011

---

# 18. Blocking

### FR-BLK-001 — Block User

Authenticated Users MUST be able to create a Block relationship against another eligible User.

**Traceability:** FLOW-026

---

### FR-BLK-002 — Blocking Is Personal

Creating a Block MUST NOT itself create a moderation violation against the blocked User.

**Traceability:** BR-BLK-001

---

### FR-BLK-003 — Preserve Historical Lineage

Blocking MUST NOT destroy existing Lineage relationships.

**Traceability:** BR-BLK-002

---

### FR-BLK-004 — Interaction Enforcement

The system MUST be capable of enforcing the final blocking interaction policy once that policy is defined.

**Traceability:** BR-BLK-003

---

### FR-BLK-005 — Blocking Visibility Matrix

The exact visibility and interaction consequences of blocking MUST remain configurable by specification until the Open Decision is resolved.

Implementation MUST NOT invent the final policy implicitly.

---

# 19. Administration

### FR-ADM-001 — Administrative Surface

The system MUST provide a privileged administrative surface or equivalent controlled administrative capability.

**Traceability:** BR-ADM-001 · FLOW-028

---

### FR-ADM-002 — Administrative Authentication

Administrative operations MUST require an authenticated privileged actor.

**Traceability:** BR-ADM-001

---

### FR-ADM-003 — Permission Enforcement

Every privileged operation MUST validate whether the actor has permission to perform that action.

**Traceability:** BR-ADM-001, BR-ADM-002

---

### FR-ADM-004 — Account Lookup

Authorized administrators SHOULD be able to locate Accounts required for legitimate administrative operations.

**Traceability:** FLOW-028

---

### FR-ADM-005 — Account State Action

Authorized administrators MUST be able to apply Account-state actions permitted by their role.

**Traceability:** FLOW-028

---

### FR-ADM-006 — Administrative Reason

High-impact administrative actions MUST require or preserve a meaningful reason.

**Traceability:** BR-ADM-007

---

### FR-ADM-007 — Administrative Audit

High-impact privileged actions MUST create audit records.

**Traceability:** BR-ADM-008

---

### FR-ADM-008 — Audit Protection

Ordinary administrative workflows MUST NOT allow privileged actors to casually erase the audit evidence of their own actions.

**Traceability:** BR-ADM-009

---

### FR-ADM-009 — Role Assignment Protection

Ordinary Users MUST NOT be able to grant themselves Moderator or Administrator permissions.

**Traceability:** BR-ADM-003

---

### FR-ADM-010 — Content Authorship Preservation

Administrative actions MUST NOT transfer authorship of user content to the Administrator.

**Traceability:** BR-ADM-004

---

### FR-ADM-011 — Lineage Correction

Authorized actors MUST have a controlled mechanism for correcting invalid Lineage relationships where policy permits.

**Traceability:** BR-ADM-006 · FLOW-029

---

### FR-ADM-012 — Lineage Correction Audit

A privileged Lineage correction MUST preserve appropriate audit information.

**Traceability:** BR-ADM-006, BR-ADM-008 · FLOW-029

---

# 20. Availability & Historical Integrity

### FR-AVL-001 — Make Creation Unavailable

Authorized platform processes MUST be able to change an eligible Creation from available to unavailable.

**Traceability:** FLOW-027

---

### FR-AVL-002 — Discovery Removal

A Creation unavailable for normal public access MUST be removable from normal public Discovery and Search results.

**Traceability:** BR-DIS-004 · FLOW-027

---

### FR-AVL-003 — Dependent Representation Update

Availability changes MUST be capable of propagating to dependent representations such as:

* Search;
* Discovery;
* Lineage;
* Notifications;
* Collections;
* Profile content lists.

Exact propagation mechanisms belong to Technical design.

**Traceability:** FLOW-027, FLOW-030

---

### FR-AVL-004 — Historical Lineage Integrity

Availability changes MUST NOT falsely reconnect Lineage relationships.

**Traceability:** BR-LIN-009, BR-INT-002

---

### FR-AVL-005 — Restricted Content Protection

Unavailable content MUST NOT become accessible merely because another User previously:

* saved it;
* added it to a Collection;
* received a notification about it;
* interacted with it.

---

### FR-AVL-006 — Restoration Propagation

Restoring a Creation MUST allow relevant dependent systems to reflect its restored state.

**Traceability:** FLOW-030

---

# 21. Cross-System Requirements

### FR-INT-001 — Relationship Independence

The system MUST model logically independent relationships so that changing one does not implicitly change unrelated relationships without an explicit Business Rule.

**Traceability:** BR-INT-001

---

### FR-INT-002 — Source Entity Authority

Derived representations such as Search indexes, Notifications, and Collection memberships MUST NOT become the authoritative replacement for their source entities.

**Traceability:** BR-INT-003

---

### FR-INT-003 — Privacy Separation

Using private behavioral information internally MUST NOT automatically expose that information publicly.

**Traceability:** BR-INT-004

---

### FR-INT-004 — Provider Independence

Core Mosaic functionality MUST NOT depend on one specific AI generation provider.

**Traceability:** BR-INT-005

---

### FR-INT-005 — Model Independence

The Creation domain MUST NOT assume one permanent AI model schema.

**Traceability:** BR-INT-005

---

### FR-INT-006 — Media Evolution

The core Creation model SHOULD allow future media evolution without redefining the fundamental meaning of a Creation.

**Traceability:** BR-INT-005

---

### FR-INT-007 — Intentional Publication

Actions that are not publication actions MUST NOT accidentally create public Creations.

Examples include:

* Like;
* Save;
* Share;
* Follow;
* Prompt customization;
* copying a Prompt.

**Traceability:** BR-CUS-001, BR-LIN-013

---

### FR-INT-008 — Source Context Through Creative Journey

Where a derived-publication journey begins from a known source Creation, the system SHOULD preserve that context through the intended journey until publication or explicit abandonment.

**Traceability:** BR-CUS-007 · FLOW-009

---

# Open Functional Dependencies

Some Functional Requirements cannot be finalized until Product-level Open Decisions are resolved.

These are not implementation gaps.

They are intentionally unresolved product behavior.

| Area           | Open Decision                                                       |
| -------------- | ------------------------------------------------------------------- |
| Identity       | Username change behavior                                            |
| Identity       | Private Accounts                                                    |
| Creation       | Exact boundary between permitted edit and required derived Creation |
| Lineage        | One direct parent vs multiple parents                               |
| Lineage        | Self-derivation user-facing terminology                             |
| Lineage        | Detailed Lineage correction workflow                                |
| Lineage        | Tombstone visibility                                                |
| Discovery      | Initial feed ranking                                                |
| Discovery      | Following-feed ordering                                             |
| Discovery      | Category governance                                                 |
| Discovery      | Tag governance                                                      |
| Social         | Self-Likes                                                          |
| Social         | Comment reply depth                                                 |
| Social         | Creator controls over comments                                      |
| Social         | Internal reposting                                                  |
| Social         | View definition                                                     |
| Social         | Public metric visibility                                            |
| Saves          | Save ↔ Collection membership relationship                           |
| Saves          | Global Unsave behavior for collected content                        |
| Saves          | Public Save counts                                                  |
| Collections    | Description support                                                 |
| Collections    | Ordering                                                            |
| Collections    | Saving own Creations                                                |
| Collections    | Unavailable content placeholders                                    |
| Notifications  | Follow notifications                                                |
| Notifications  | Save notifications                                                  |
| Notifications  | Retention and dismissal                                             |
| Notifications  | Email delivery                                                      |
| Moderation     | Anonymous reporting                                                 |
| Moderation     | Final Report taxonomy                                               |
| Moderation     | Final enforcement ladder                                            |
| Moderation     | Low-effort Remix policy                                             |
| Moderation     | Visibility during review                                            |
| Blocking       | Complete visibility and interaction matrix                          |
| Administration | Suspension behavior                                                 |
| Administration | Administrator assignment authority                                  |
| Administration | High-risk action safeguards                                         |
| Administration | Bootstrap Administrator mechanism                                   |

---

# Implementation Constraint

Open Decisions MUST NOT be silently converted into permanent product behavior during implementation.

When implementation reaches an unresolved decision, one of the following should occur:

```text
Open Decision
      ↓
Product Decision
      ↓
Documentation Updated
      ↓
Requirement Finalized
      ↓
Implementation
```

or, where implementation can safely proceed independently:

```text
Open Decision
      ↓
Implement neutral/extensible foundation
      ↓
Do not expose undecided behavior
```

This protects Mosaic from accidental product decisions hidden inside code.

---

# Requirement Traceability

The intended documentation chain is:

```text
Product Documentation
        ↓
Business Rules
        ↓
User Flows
        ↓
Functional Requirements
        ↓
Technical Architecture
        ↓
Implementation
        ↓
Tests
```

Example:

```text
Product:
A Remix preserves its direct parent.

        ↓

BR-LIN-002:
A derived Creation MUST preserve
its direct parent relationship.

        ↓

FLOW-009:
Customize → Generate → Publish

        ↓

FR-LIN-003:
A derived Creation MUST preserve
its direct parent.

        ↓

Technical:
Data Model + API + Transaction Rules

        ↓

Test:
Publishing B from A results in
B.parent = A.
```

This traceability is intentional.

It allows future contributors and AI-assisted development tools to understand not only **what** must be implemented, but **why**.

---

# Requirement Summary

The current specification defines functional requirements across:

```text
Authentication & Accounts
Profiles
Creations
Prompts
Customization
Remix & Lineage
Discovery & Search
Following
Likes
Comments & Replies
Sharing
Saves
Collections
Notifications
Reporting
Moderation
Appeals
Blocking
Administration
Availability
Cross-System Integrity
```

These requirements represent the current functional contract of Mosaic.

They do not imply that every requirement belongs to the initial MVP.

MVP scope will be defined separately in:

```text
docs/04-delivery/mvp.md
```

Therefore:

> **Required by the product specification does not automatically mean required in the first release.**

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

* [Business Rules](./business-rules.md)
* [User Flows](./user-flows.md)
* [Non-Functional Requirements](./non-functional-requirements.md)

## Technical

* [Architecture](../03-technical/architecture.md)
* [Data Model](../03-technical/data-model.md)
* [API](../03-technical/api.md)
* [Media Storage](../03-technical/media-storage.md)
* [Search](../03-technical/search.md)
* [Security & Privacy](../03-technical/security.md)
* [Testing](../03-technical/testing.md)

## Delivery

* [MVP](../04-delivery/mvp.md)

---

**Previous:** [← User Flows](./user-flows.md) · [Documentation Home](../README.md) · **Next:** [Non-Functional Requirements →](./non-functional-requirements.md)
