# User Flows

> **Section:** Specification
> **Status:** Active Specification
> **Audience:** Product, Engineering, UX & QA
> **Last updated:** September 2026

---

## Overview

This document defines the primary user journeys inside Mosaic.

Unlike Product documentation, User Flows describe **how users move through the platform** while respecting established Business Rules.

Each flow receives a stable identifier:

```text
FLOW-001
FLOW-002
FLOW-003
```

These identifiers allow future Functional Requirements, technical specifications, and tests to reference specific journeys without duplicating their definitions.

---

# Flow Structure

Each flow may define:

* Objective;
* Actors;
* Preconditions;
* Main Flow;
* Alternative Flows;
* Result;
* Related Business Rules.

Not every flow requires every section.

The purpose is to describe meaningful user behavior without prematurely defining interface implementation details.

---

# FLOW-001 — First Visit

## Objective

Allow a visitor to discover and understand Mosaic without creating an Account.

## Actors

* Visitor

## Preconditions

* User is not authenticated.

## Main Flow

```text
Open Mosaic
      ↓
View Home / Discovery
      ↓
Browse public Creations
      ↓
Open Creation
      ↓
View generated result
      ↓
Read Prompt and creative context
      ↓
Explore creator Profile or related content
      ↓
Continue browsing
```

## Alternative Flows

At any point where an authenticated action is required, the Visitor may be invited to:

```text
Create Account
```

or:

```text
Sign In
```

The Visitor may continue using public functionality without registration where authentication is not required.

## Result

The Visitor can understand and explore Mosaic before deciding whether to register.

## Related Business Rules

* BR-DIS-001
* BR-DIS-006
* BR-USR-002

---

# FLOW-002 — User Registration

## Objective

Create a Mosaic Account and Profile.

## Actors

* Visitor

## Preconditions

* User is not authenticated.

## Main Flow

```text
Open Sign Up
      ↓
Enter Email
      ↓
Choose Username
      ↓
Create Password
      ↓
Submit Registration
      ↓
Validate Information
      ↓
Create Account
      ↓
Create Profile
      ↓
Registration Completed
```

## Alternative Flows

### Email Already in Use

```text
Submit Registration
      ↓
Email unavailable
      ↓
Registration rejected
      ↓
User may Sign In or recover access
```

### Username Already in Use

```text
Submit Registration
      ↓
Username unavailable
      ↓
Choose another Username
```

### Invalid Information

Validation errors should identify the relevant field without creating a partial normal Account.

## Result

The Visitor becomes a registered Mosaic User with an associated Profile.

Whether successful registration immediately creates an authenticated session or requires a separate authentication step remains an implementation/product decision to be defined with the authentication flow.

## Related Business Rules

* BR-USR-001
* BR-USR-004
* BR-USR-005
* BR-PRO-001

---

# FLOW-003 — Sign In

## Objective

Allow an existing User to authenticate.

## Actors

* Registered User

## Preconditions

* User has an Account capable of authentication.

## Main Flow

```text
Open Sign In
      ↓
Enter Credentials
      ↓
Submit
      ↓
Validate Credentials
      ↓
Authenticate
      ↓
Return to Mosaic
```

## Alternative Flows

Invalid credentials must not authenticate the User.

Account restrictions may affect successful access according to the Account State and Security rules.

## Result

The User receives an authenticated session when authentication succeeds.

## Related Business Rules

* BR-USR-002
* BR-USR-008

---

# FLOW-004 — Publish an Original Creation

## Objective

Publish a new Creation without a Mosaic Lineage parent.

## Actors

* Authenticated User

## Preconditions

* User is authenticated.
* User is allowed to publish.
* Required publication content is available.

## Main Flow

```text
Start Creation
      ↓
Add Generated Media
      ↓
Add Prompt
      ↓
Add Generation Context
      ↓
Add Description / Discovery Metadata
      ↓
Configure Customizable Elements
      ↓
Review Creation
      ↓
Publish
      ↓
Validate Publication
      ↓
Create Published Creation
```

Optional information should not prevent publication unless specifically required by the publication model.

## Result

A new published Creation exists without a Mosaic Lineage parent.

Conceptually:

```text
Creation A
Parent: none
```

Within Mosaic, Creation A is an Original Creation.

This does not constitute a legal determination of universal intellectual originality.

## Related Business Rules

* BR-CRE-001
* BR-CRE-002
* BR-CRE-003
* BR-CRE-009
* BR-PRM-001
* BR-PRM-002
* BR-LIN-004

---

# FLOW-005 — Edit a Published Creation

## Objective

Correct non-material information without creating a new creative Lineage node.

## Actors

* Creation Author

## Preconditions

* User is authenticated.
* User owns the Creation.
* Requested changes qualify as permitted editing.

## Main Flow

```text
Open Own Creation
      ↓
Choose Edit
      ↓
Modify permitted information
      ↓
Submit Changes
      ↓
Validate
      ↓
Update Creation
```

## Material Change

If the intended change represents meaningful creative evolution:

```text
Edit Attempt
      ↓
Material Creative Change
      ↓
Publish New Derived Creation
```

The existing Creation should not be silently transformed into materially different creative work.

## Result

Non-material corrections preserve the same Creation identity.

Material evolution produces a new Creation through the appropriate derivation flow.

## Related Business Rules

* BR-CRE-004
* BR-CRE-005
* BR-CRE-006
* BR-CRE-009
* BR-PRM-004

---

# FLOW-006 — Discover a Creation

## Objective

Allow a User or Visitor to discover creative content.

## Actors

* Visitor
* Authenticated User

## Main Flow

Possible entry points include:

```text
Home Feed
Search
Following
Category
Tag
Trending
Profile
Lineage
Direct Link
```

The User then:

```text
Discovery Surface
      ↓
Select Creation
      ↓
Open Creation
      ↓
Explore Result
      ↓
Explore Prompt
      ↓
Explore Creative Context
```

## Result

The User reaches a Creation that may lead to further discovery, organization, social interaction, customization, or creative action.

## Related Business Rules

* BR-DIS-001
* BR-DIS-002
* BR-DIS-005
* BR-DIS-006

---

# FLOW-007 — Search for Creations

## Objective

Find relevant public Creations and creators through Search.

## Actors

* Visitor
* Authenticated User

## Main Flow

```text
Open Search
      ↓
Enter Query
      ↓
Search
      ↓
Receive Results
      ↓
Refine if necessary
      ↓
Open Result
```

Potential future refinements may include:

* categories;
* tags;
* models;
* providers;
* creators;
* media type;
* customizable elements.

The exact initial filters remain subject to MVP planning.

## Result

The User reaches relevant Mosaic content without popularity being treated as the sole definition of relevance.

## Related Business Rules

* BR-DIS-001
* BR-DIS-002
* BR-DIS-005
* BR-DIS-006

---

# FLOW-008 — Customize a Prompt

## Objective

Allow a User to adapt a Creation's Prompt without modifying the source Creation.

## Actors

* Authenticated User

## Preconditions

* Source Creation is accessible.
* User is allowed to interact with the source.

## Main Flow

```text
Open Creation
      ↓
Choose Customize
      ↓
Load Source Prompt
      ↓
Load Customizable Elements
      ↓
Change Suggested Variables
      ↓
Optionally modify Prompt manually
      ↓
Preview Customized Prompt
      ↓
Continue Editing / Copy / Use Externally
```

## Result

A private customized Prompt exists as working state.

The source Creation remains unchanged.

No public Creation or Lineage node is created merely by customizing.

## Related Business Rules

* BR-CUS-001
* BR-CUS-002
* BR-CUS-003
* BR-CUS-004
* BR-CUS-005
* BR-CUS-006
* BR-LIN-013

---

# FLOW-009 — Customize → Generate Externally → Publish Derived Creation

## Objective

Transform discovery into a new published creative contribution.

This represents one of Mosaic's primary creative loops.

## Actors

* Authenticated User

## Preconditions

* Source Creation is accessible.
* User begins customization from a known source Creation.

## Main Flow

```text
Discover Creation A
        ↓
Open Creation A
        ↓
Customize Prompt
        ↓
Obtain Customized Prompt
        ↓
Generate using external AI tool
        ↓
Return to Mosaic
        ↓
Start Derived Publication
        ↓
Upload Generated Result
        ↓
Provide final Prompt
        ↓
Provide Generation Context
        ↓
Review
        ↓
Publish
        ↓
Creation B Created
        ↓
Lineage A → B
```

## Result

Creation B becomes an independent published Creation.

Its direct parent is Creation A.

```text
Creation A
     ↓
Creation B
```

## Important Constraint

Generation initially occurs outside Mosaic.

Mosaic must not depend on direct integration with a specific generation provider for this workflow to function.

## Related Business Rules

* BR-CUS-006
* BR-CUS-007
* BR-CUS-008
* BR-CRE-007
* BR-LIN-001
* BR-LIN-002
* BR-PRM-006

---

# FLOW-010 — Direct Remix Publication

## Objective

Publish a derived Creation without requiring the structured customization interface.

## Actors

* Authenticated User

## Preconditions

* Source Creation is accessible.
* User intentionally chooses to create from that source.

## Main Flow

```text
Open Creation A
      ↓
Choose Remix
      ↓
Start Derived Creation
      ↓
Add Generated Result
      ↓
Add Final Prompt
      ↓
Add Generation Context
      ↓
Add Metadata
      ↓
Publish
      ↓
Creation B Created
```

Lineage becomes:

```text
A
↓
B
```

## Result

The new Creation preserves the direct source relationship even if the User performed most creative work outside Mosaic.

## Related Business Rules

* BR-LIN-001
* BR-LIN-002
* BR-LIN-005
* BR-LIN-013

---

# FLOW-011 — Self-Derivation

## Objective

Allow a creator to publish a meaningful evolution of their own work without rewriting historical creative state.

## Actors

* Creation Author

## Main Flow

```text
Open Own Creation A
      ↓
Develop New Approach
      ↓
Start Derived Publication
      ↓
Add New Result / Prompt / Context
      ↓
Publish
      ↓
Creation B
```

Lineage:

```text
Creation A — @Ana
      ↓
Creation B — @Ana
```

## Result

Both creative states remain available as separate Creations.

## Related Business Rules

* BR-CRE-004
* BR-CRE-006
* BR-CRE-007
* BR-CRE-008
* BR-LIN-001
* BR-LIN-002

---

# FLOW-012 — Explore Creative Lineage

## Objective

Allow users to understand how a Creation evolved through Mosaic.

## Actors

* Visitor
* Authenticated User

## Main Flow

```text
Open Creation
      ↓
Open Lineage
      ↓
View Parent
      ↓
View Origin
      ↓
View Direct Descendants
      ↓
Explore Branch
```

Example:

```text
Creation A
├── Creation B
│   └── Creation D
└── Creation C
```

A User may navigate between related Creations without flattening the relationships.

## Unavailable Intermediate Creation

If:

```text
A → B → C
```

and B becomes unavailable:

```text
A
↓
[Creation unavailable]
↓
C
```

The interface must not falsely represent C as a direct child of A.

## Related Business Rules

* BR-LIN-002
* BR-LIN-003
* BR-LIN-008
* BR-LIN-009
* BR-LIN-010
* BR-INT-002

---

# FLOW-013 — Like a Creation

## Objective

Express appreciation for a Creation.

## Actors

* Authenticated User

## Main Flow

```text
Open Creation
      ↓
Like
      ↓
Like Relationship Created
```

If already liked:

```text
Unlike
      ↓
Like Relationship Removed
```

## Result

The Like state changes independently from Save, Follow, Comment, and Lineage.

## Related Business Rules

* BR-SOC-003
* BR-SOC-004
* BR-COL-001
* BR-INT-001

---

# FLOW-014 — Follow a Creator

## Objective

Create a directional social relationship with another User.

## Actors

* Authenticated User

## Main Flow

```text
Open Profile / Creation
      ↓
Follow Creator
      ↓
Following Relationship Created
```

To remove:

```text
Following
      ↓
Unfollow
      ↓
Relationship Removed
```

## Result

The relationship affects social/discovery behavior without modifying creative Lineage.

## Related Business Rules

* BR-USR-006
* BR-SOC-001
* BR-SOC-002
* BR-SOC-009

---

# FLOW-015 — Comment on a Creation

## Objective

Participate in discussion around a Creation.

## Actors

* Authenticated User

## Main Flow

```text
Open Creation
      ↓
Open Discussion
      ↓
Write Comment
      ↓
Submit
      ↓
Comment Published
```

## Reply Flow

```text
Comment
   ↓
Reply
   ↓
Write Reply
   ↓
Submit
```

## Result

The discussion belongs to that specific Creation.

A Remix has its own discussion context.

## Related Business Rules

* BR-SOC-005
* BR-SOC-006
* BR-SOC-007

---

# FLOW-016 — Share a Creation

## Objective

Allow a User to share access to a Creation.

## Main Flow

```text
Open Creation
      ↓
Share
      ↓
Choose available sharing method
      ↓
Share Creation reference
```

## Result

The existing Creation is shared.

No new Creation or Lineage relationship is created.

## Related Business Rules

* BR-SOC-008

---

# FLOW-017 — Save a Creation

## Objective

Preserve a Creation for later use.

## Actors

* Authenticated User

## Main Flow

```text
Open Creation
      ↓
Save
      ↓
Save Relationship Created
      ↓
Creation available in Saved Content
```

## Result

The Creation becomes part of the User's private saved content.

Saving does not automatically Like the Creation.

## Related Business Rules

* BR-COL-001
* BR-COL-002
* BR-COL-003
* BR-COL-012

---

# FLOW-018 — Add Creation to Collection

## Objective

Organize a Creation inside a personal Collection.

## Actors

* Authenticated User

## Main Flow

```text
Open Creation / Saved Content
      ↓
Add to Collection
      ↓
Choose Existing Collection
      ↓
Membership Created
```

## Create Collection Alternative

```text
Add to Collection
      ↓
Create New Collection
      ↓
Enter Name
      ↓
Create
      ↓
Add Creation
```

## Result

The Collection references the Creation without duplicating or owning it.

## Open Dependency

The exact relationship between:

```text
Save
```

and:

```text
Collection Membership
```

remains an Open Decision.

Therefore, this flow must not yet assume that adding to a Collection automatically creates a global Save relationship.

## Related Business Rules

* BR-COL-004
* BR-COL-005
* BR-COL-006
* BR-COL-008
* BR-COL-013

---

# FLOW-019 — Manage Collections

## Objective

Allow Users to organize their personal creative references.

## Main Flow

```text
Open Saved Content
      ↓
Open Collections
      ↓
Select Collection
```

Possible actions:

```text
Rename Collection
Add Creation
Remove Creation
Delete Collection
```

Deleting a Collection:

```text
Delete Collection
      ↓
Collection Removed
      ↓
Referenced Creations Remain
```

## Result

Organization changes without modifying the referenced Creations.

## Related Business Rules

* BR-COL-004
* BR-COL-006
* BR-COL-007
* BR-COL-008
* BR-COL-009

---

# FLOW-020 — Receive and Open Notification

## Objective

Inform a User about relevant events.

## Actors

* Authenticated User

## Main Flow

```text
Relevant Event
      ↓
Notification Rules Evaluated
      ↓
Notification Created
      ↓
Recipient Opens Notifications
      ↓
Select Notification
      ↓
Navigate to Relevant Context
```

## Result

The User reaches the relevant source context where available.

Reading the notification does not alter the source event.

## Related Business Rules

* BR-NOT-001
* BR-NOT-002
* BR-NOT-003
* BR-NOT-004
* BR-NOT-008

---

# FLOW-021 — Creator Discovers a Remix

## Objective

Allow the direct parent creator to discover a new derived Creation.

## Main Flow

```text
Creation B published from Creation A
              ↓
Notification created for A's creator
              ↓
Creator opens Notification
              ↓
Open Creation B
              ↓
View Lineage
              ↓
Explore new branch
```

## Result

The creator becomes aware of the new branch without gaining control over the descendant.

## Related Business Rules

* BR-NOT-006
* BR-LIN-006
* BR-LIN-007

---

# FLOW-022 — Report Content

## Objective

Allow an authenticated User to report a potential rule violation.

## Actors

* Authenticated User

## Main Flow

```text
Open Reportable Content
      ↓
Choose Report
      ↓
Choose Reason
      ↓
Provide Additional Context
      ↓
Submit
      ↓
Report Created
```

## Result

A moderation signal enters the moderation system.

Submitting the Report does not itself establish that a violation occurred.

## Related Business Rules

* BR-MOD-001
* BR-MOD-002
* BR-MOD-012
* BR-MOD-013
* BR-NOT-010

---

# FLOW-023 — Moderation Triage

## Objective

Process a newly submitted moderation signal.

## Actors

* Moderation System
* AI / Automated Systems
* Moderator where required

## Main Flow

```text
Report Created
      ↓
Triage
      ↓
Classify Potential Violation
      ↓
Assess Risk / Priority
      ↓
Detect Duplicate / Abuse Signals
      ↓
Determine Review Path
```

Possible paths:

```text
Automated Processing
Human Review
Escalated Review
```

AI-assisted analysis may support the decision process.

It is not automatically the final authority for ambiguous or high-impact cases.

## Related Business Rules

* BR-MOD-001
* BR-MOD-002
* BR-MOD-003
* BR-MOD-010
* BR-MOD-013

---

# FLOW-024 — Human Moderation Review

## Objective

Allow an authorized Moderator to evaluate a moderation case.

## Actors

* Moderator

## Main Flow

```text
Open Moderation Queue
      ↓
Open Case
      ↓
Review Report
      ↓
Review Content State
      ↓
Review Available Evidence
      ↓
Review AI / Automated Analysis
      ↓
Apply Policy
      ↓
Record Decision
      ↓
Apply Authorized Action
      ↓
Create Audit Record
```

Possible outcomes may include:

```text
No Action
Warning
Content Restriction
Removal
Interaction Restriction
Temporary Suspension
Escalation
```

The final enforcement ladder remains subject to later specification.

## Result

The case receives a traceable moderation decision.

## Related Business Rules

* BR-MOD-003
* BR-MOD-004
* BR-MOD-005
* BR-MOD-011
* BR-MOD-014

---

# FLOW-025 — Appeal Moderation Decision

## Objective

Allow an eligible User to request review of a meaningful moderation action.

## Actors

* Affected User
* Moderator / Authorized Reviewer

## Main Flow

```text
Moderation Action
      ↓
User Receives Decision
      ↓
Appeal Available
      ↓
Submit Appeal
      ↓
Review
      ↓
Final Decision
```

Possible outcomes:

```text
Decision Maintained
```

or:

```text
Decision Reversed
      ↓
Existing Content Restored
```

## Result

The appeal becomes part of the moderation history.

Successful restoration should restore the existing entity rather than create a new Creation.

## Related Business Rules

* BR-MOD-006
* BR-MOD-007
* BR-MOD-011

---

# FLOW-026 — Block User

## Objective

Allow a User to restrict interaction with another User.

## Actors

* Authenticated User

## Main Flow

```text
Open User / Relevant Interface
      ↓
Block
      ↓
Confirm
      ↓
Block Relationship Created
```

## Result

Future interactions are restricted according to Mosaic's final Blocking policy.

Historical creative Lineage remains unchanged.

## Open Dependency

The exact visibility and interaction matrix after blocking remains an Open Decision.

This flow therefore defines the existence of the action without prematurely defining every consequence.

## Related Business Rules

* BR-BLK-001
* BR-BLK-002
* BR-BLK-003

---

# FLOW-027 — Creation Becomes Unavailable

## Objective

Preserve system integrity when a Creation can no longer be accessed normally.

Possible causes include:

* creator deletion;
* moderation;
* legal restriction;
* other authorized removal.

## Main Flow

```text
Creation Available
      ↓
Availability State Changes
      ↓
Remove from normal public access
      ↓
Update Discovery
      ↓
Update dependent representations
```

If Lineage requires historical continuity:

```text
Parent
  ↓
[Creation unavailable]
  ↓
Child
```

## Result

Unavailable content is not exposed through ordinary access while historical relationships remain structurally truthful where required.

## Related Business Rules

* BR-CRE-010
* BR-LIN-008
* BR-LIN-009
* BR-DIS-004
* BR-INT-002
* BR-INT-003

---

# FLOW-028 — Administrative Account Action

## Objective

Allow an authorized Administrator to perform a privileged Account operation.

## Actors

* Administrator

## Preconditions

* Administrator is authenticated.
* Administrator has the required permission.

## Main Flow

```text
Open Administration
      ↓
Find Account
      ↓
Review Relevant Context
      ↓
Choose Authorized Action
      ↓
Provide Reason
      ↓
Confirm
      ↓
Authorization Revalidated
      ↓
Action Applied
      ↓
Audit Record Created
      ↓
Affected Systems Updated
```

## Result

The Account state changes through a controlled and auditable process.

## Related Business Rules

* BR-ADM-001
* BR-ADM-002
* BR-ADM-007
* BR-ADM-008
* BR-ADM-011

---

# FLOW-029 — Administrative Lineage Correction

## Objective

Correct an invalid historical Lineage relationship through an authorized process.

## Actors

* Authorized Moderator or Administrator

## Preconditions

* A legitimate reason for correction exists.
* Actor has the required permission.

## Main Flow

```text
Open Lineage Case
      ↓
Review Current Relationship
      ↓
Review Evidence
      ↓
Determine Correct Relationship
      ↓
Provide Reason
      ↓
Apply Correction
      ↓
Preserve Audit Information
      ↓
Update Lineage Representation
```

## Result

Lineage becomes correct without silently rewriting historical information.

## Related Business Rules

* BR-LIN-015
* BR-ADM-006
* BR-ADM-007
* BR-ADM-008
* BR-INT-002

---

# FLOW-030 — Restore Moderated Creation

## Objective

Restore an existing Creation after a successful appeal or authorized review.

## Actors

* Authorized Moderator
* Administrator

## Main Flow

```text
Review Determines Restoration
      ↓
Restore Existing Creation
      ↓
Update Availability
      ↓
Update Search / Discovery
      ↓
Update Dependent Systems
      ↓
Notify Affected User
      ↓
Record Audit Event
```

## Result

The original Creation returns to the appropriate available state.

A new duplicate Creation is not created.

## Related Business Rules

* BR-MOD-007
* BR-MOD-011
* BR-CRE-010
* BR-INT-003

---

# Primary Mosaic Journey

The core Mosaic experience can be summarized as:

```text
Discover
   ↓
Understand
   ↓
Customize
   ↓
Generate
   ↓
Publish
   ↓
Derive
   ↓
Discover Again
```

At community scale:

```text
Creation A
    ↓
Discovery
    ↓
User B
    ↓
Customization
    ↓
Generation
    ↓
Creation B
    ↓
New Discovery
    ↓
User C
    ↓
Creation C
```

This creates the larger Mosaic:

```text
Ideas
 ↓
Creations
 ↓
Lineage
 ↓
Discovery
 ↓
New Ideas
```

---

# Journey Families

The flows can be grouped into several product journeys.

## Access

```text
FLOW-001 First Visit
FLOW-002 Registration
FLOW-003 Sign In
```

## Creation

```text
FLOW-004 Original Publication
FLOW-005 Edit Creation
FLOW-008 Customize Prompt
FLOW-009 Customize → Generate → Publish
FLOW-010 Direct Remix
FLOW-011 Self-Derivation
```

## Discovery

```text
FLOW-006 Discover Creation
FLOW-007 Search
FLOW-012 Explore Lineage
```

## Social

```text
FLOW-013 Like
FLOW-014 Follow
FLOW-015 Comment
FLOW-016 Share
```

## Organization

```text
FLOW-017 Save
FLOW-018 Add to Collection
FLOW-019 Manage Collections
```

## Notifications

```text
FLOW-020 Open Notification
FLOW-021 Discover Remix
```

## Trust & Safety

```text
FLOW-022 Report
FLOW-023 Moderation Triage
FLOW-024 Human Review
FLOW-025 Appeal
FLOW-026 Block
FLOW-027 Unavailable Creation
FLOW-030 Restore Creation
```

## Administration

```text
FLOW-028 Account Action
FLOW-029 Lineage Correction
FLOW-030 Creation Restoration
```

---

# Open Flow Dependencies

Some journeys cannot yet receive complete behavior because they depend on unresolved Product decisions.

These include:

| Area           | Open Dependency                                   |
| -------------- | ------------------------------------------------- |
| Collections    | Whether Collection membership implies Save        |
| Collections    | Behavior when globally unsaving collected content |
| Social         | Self-Likes                                        |
| Social         | Comment reply depth                               |
| Social         | Creator comment controls                          |
| Social         | Internal reposting                                |
| Notifications  | Follow notifications                              |
| Notifications  | Save notifications                                |
| Notifications  | Retention and dismissal                           |
| Blocking       | Visibility and interaction matrix                 |
| Lineage        | One vs multiple direct parents                    |
| Lineage        | User-facing self-derivation terminology           |
| Moderation     | Final report taxonomy                             |
| Moderation     | Final enforcement ladder                          |
| Moderation     | Visibility while under review                     |
| Administration | Suspension behavior                               |
| Administration | High-risk approval requirements                   |
| Identity       | Username changes                                  |
| Identity       | Private Accounts                                  |

These gaps are intentional.

Implementation MUST NOT silently resolve them without an explicit Product decision.

---

# Flow Design Principles

User Flows should follow several Mosaic-wide principles.

## Preserve Context

A User moving between:

```text
Discovery
→ Customization
→ Publication
```

should not unnecessarily lose the source Creation relationship.

---

## Avoid Accidental Publication

Actions such as:

```text
Copy Prompt
Customize Prompt
Generate Externally
Save
Like
Share
```

must not accidentally publish a Creation.

Publication is intentional.

---

## Preserve Lineage

When a derived-publication journey begins from a known Creation, the relationship should survive the journey until publication.

---

## Keep Relationships Independent

A User should not unexpectedly trigger unrelated actions.

Example:

```text
Save
```

should not silently mean:

```text
Like + Follow + Remix
```

unless an explicit future rule defines otherwise.

---

## Support Recovery

Recoverable failures should preserve useful working state where practical.

Examples include:

```text
Upload failure
Temporary network failure
Validation failure
```

Exact Draft persistence and technical recovery behavior will be defined later.

---

## Do Not Depend on One AI Provider

The core creative journey must continue to function even if generation happens outside Mosaic.

---

# Traceability

User Flows connect Business Rules to Functional Requirements.

Conceptually:

```text
Product Definition
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

A future Functional Requirement may reference both:

```text
FLOW-009
BR-CUS-007
BR-LIN-002
```

This makes the reason for the requirement traceable.

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
* [Functional Requirements](./functional-requirements.md)
* [Non-Functional Requirements](./non-functional-requirements.md)

## Technical

* [Architecture](../03-technical/architecture.md)
* [Data Model](../03-technical/data-model.md)
* [API](../03-technical/api.md)
* [Security & Privacy](../03-technical/security.md)
* [Testing](../03-technical/testing.md)

---

**Previous:** [← Business Rules](./business-rules.md) · [Documentation Home](../README.md) · **Next:** [Functional Requirements →](./functional-requirements.md)
