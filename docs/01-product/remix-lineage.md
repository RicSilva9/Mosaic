# Remix & Lineage System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Remix & Lineage System** defines how Creations evolve from other Creations and how Mosaic preserves the history of that evolution.

A Creation may inspire another user to:

* customize its Prompt;
* modify its creative approach;
* adapt it to another model;
* improve a technique;
* explore another visual direction;
* continue experimenting with the idea.

When that result is published as a new Creation, Mosaic can preserve its relationship with the Creation that directly inspired it.

Over time, these relationships form a **Lineage**.

```text
Creation A
│
├── Creation B
│   ├── Creation D
│   └── Creation E
│
└── Creation C
```

Each Creation remains an independent piece of content.

Together, they reveal how an idea evolved through the community.

---

# Why This System Exists

Creative ideas rarely remain static.

A useful Prompt may be:

```text
discovered
    ↓
understood
    ↓
customized
    ↓
tested
    ↓
published differently
    ↓
modified again
```

Traditional social platforms usually lose this history.

A user may copy an idea, modify it, publish the result, and leave no structured connection to its source.

Mosaic is designed differently.

Its goal is not only to show:

> **What was created?**

but also:

> **Where did this Creation come from?**

> **What evolved from it?**

> **How did the idea change over time?**

---

# Core Concepts

The system distinguishes several related concepts.

```text
DERIVATION
Relationship between two Creations

LINEAGE
Historical chain formed by derivations

REMIX
A user-facing form of creative derivation

ORIGIN
Earliest known Creation in a lineage

PARENT
Direct source of a derived Creation

CHILD
Creation directly derived from another
```

These concepts should not be treated as interchangeable.

---

# Derivation

A **Derivation** exists when a new Creation is intentionally published as having been developed from another Mosaic Creation.

Example:

```text
Creation A
    ↓
Creation B
```

B is derived from A.

A is the **parent** of B.

B is a **child** of A.

---

# Direct Parent

✅ **Decided**

A derived Creation must preserve its **direct source**.

Consider:

```text
A
↓
B
↓
C
```

C was created from B.

Therefore:

```text
Parent of B = A
Parent of C = B
```

Mosaic should not flatten this into:

```text
A
├── B
└── C
```

because that would incorrectly describe how C was created.

---

# Origin

The **Origin** represents the earliest known Creation in a Lineage.

Example:

```text
A
↓
B
↓
C
↓
D
```

For D:

```text
Direct Parent = C
Origin = A
```

The direct parent explains **where the Creation immediately came from**.

The origin explains **where the known lineage began**.

---

# Lineage

A **Lineage** is the historical structure created by connected derivations.

Lineage may be simple:

```text
A
↓
B
↓
C
```

or branch:

```text
A
├── B
│   ├── D
│   └── E
│
└── C
    └── F
```

There is no requirement that creative evolution follow a single path.

Branching is expected.

---

# Remix

A **Remix** is a new Creation published from another Creation through Mosaic's derivation workflow.

Example:

```text
Creation A — @Ana
       ↓
Creation B — @Carlos
```

Carlos may have changed:

* characters;
* environment;
* camera;
* lighting;
* Prompt structure;
* generation model;
* parameters;
* creative direction;
* any combination of these.

Creation B belongs to Carlos while preserving its relationship to A.

---

# Remix Is a New Creation

✅ **Decided**

A Remix is not an edit of the original Creation.

It is a new independent Creation.

```text
Creation A
Author: Ana

Creation B
Author: Carlos
Derived from: Creation A
```

The existence of B does not modify A.

---

# Self-Derivation

A creator may continue developing their own previous Creation.

Example:

```text
Creation A — @Ana
       ↓
Creation B — @Ana
```

This is still a derivation relationship.

The creative history matters regardless of whether the author changed.

---

# Self-Republishing vs Remix

✅ **Decided — Concept**

The underlying Lineage System should not require different structural relationships based solely on whether the author changed.

Both:

```text
Ana → Ana
```

and:

```text
Ana → Carlos
```

can represent:

```text
Parent Creation
       ↓
Derived Creation
```

However, Mosaic may present them differently to users.

For example:

```text
Updated approach by @Ana

Remix by @Carlos
```

🟡 **Open Decision**

The final user-facing terminology for a creator publishing an evolved form of their own Creation still needs to be chosen.

The underlying lineage relationship remains the same.

---

# Customization vs Derivation

Customization alone does not create Lineage.

```text
Creation A
      ↓
Customize
      ↓
Experiment
```

At this stage, no public Creation exists.

Only after publication:

```text
Creation A
      ↓
Customize
      ↓
Generate externally
      ↓
Publish
      ↓
Creation B
```

does B become part of the Lineage.

---

# Copying vs Derivation

Copying a Prompt also does not automatically create a new Lineage node.

```text
Copy Prompt
     ↓
No new Creation
```

Lineage represents published creative relationships, not every private action performed by users.

---

# Independent Creation

Not every similar Creation should automatically be considered derived.

Two users may independently produce similar ideas.

Therefore:

✅ **Decided — Principle**

Mosaic should not automatically establish Lineage solely because content appears similar.

Derivation represents an actual declared or otherwise reliably established creative relationship.

Similarity and Lineage are different concepts.

---

# Attribution

A derived Creation should clearly acknowledge its direct source.

Conceptually:

```text
Creation B
by @Carlos

Based on:
Creation A by @Ana
```

The exact interface is a design decision.

The attribution relationship itself is a product requirement.

---

# Attribution Cannot Be Removed Casually

✅ **Decided**

A creator should not be able to publish a Remix and then simply remove its Lineage attribution while keeping the same derived Creation.

Otherwise, Mosaic's history could be intentionally rewritten.

If the derivation relationship was created incorrectly, there should eventually be an appropriate correction or dispute process.

---

# Ownership

Each Creation belongs to its own author within Mosaic's applicable platform rules.

Example:

```text
Creation A — Ana controls A
       ↓
Creation B — Carlos controls B
       ↓
Creation C — Lucas controls C
```

Ana does not gain control over B or C merely because A is their ancestor.

Carlos does not gain control over C merely because B is its parent.

---

# Original Creator Control

✅ **Decided**

The creator of an ancestor Creation cannot directly:

* edit descendant Creations;
* delete descendant Creations;
* change their Prompts;
* change their media;
* remove their authorship.

If a descendant violates Mosaic's rules or applicable rights, the appropriate mechanism is reporting and moderation.

---

# Public Creation and Remixability

Mosaic is designed around open creative evolution.

Therefore:

✅ **Decided — Principle**

Public Creations should be remixable by default.

This supports the central Mosaic cycle:

```text
Discover
   ↓
Understand
   ↓
Customize
   ↓
Create
   ↓
Publish
   ↓
Evolve
```

---

# Remix Permission

The initial Mosaic philosophy does not treat Remix permission as something the original creator manually grants to individual users.

Publishing publicly means participating in Mosaic's creative ecosystem.

However, Remix freedom does not override:

* community rules;
* applicable rights;
* moderation;
* platform safety requirements.

Detailed legal terms will require separate policy work.

---

# No Creative Veto Over Descendants

✅ **Decided — Principle**

An author should not be able to remove another user's Remix merely because:

* they dislike it;
* they disagree with its creative direction;
* it changes their original idea significantly;
* they would have created it differently.

Creative disagreement alone is not a moderation violation.

This protects Mosaic's open creative model.

---

# Reporting a Remix

If a creator believes a Remix violates Mosaic's rules, they may report it.

Example:

```text
Creation A — Ana
       ↓
Creation B — Carlos
       ↓
Ana reports B
       ↓
Moderation process
```

Ana does not make the final moderation decision simply because she authored A.

The same moderation rules should apply consistently across the community.

---

# Descendants

A Creation may have zero, one, or many direct descendants.

Example:

```text
Creation A
│
├── B
├── C
├── D
└── E
```

Mosaic may surface this information as something like:

```text
Variations of this Creation
37
```

The exact wording and interface will be defined later.

---

# Multiple Generations

Lineage can continue indefinitely in principle.

```text
A
↓
B
↓
C
↓
D
↓
E
```

Mosaic should not assume that creative history stops after one Remix generation.

Technical safeguards may eventually be necessary for extremely large Lineages, but that belongs to architecture and scalability.

---

# Branching

Different users may take the same Creation in different directions.

```text
                 A
          ┌──────┼──────┐
          ↓      ↓      ↓
          B      C      D
         / \            │
        E   F           G
```

Branching is not an edge case.

It is a fundamental behavior of Mosaic.

---

# One Direct Parent

🟡 **Open Decision**

The current model naturally assumes:

```text
Derived Creation
       ↓
One direct parent
```

However, future creative workflows could combine multiple Creations:

```text
Creation A ──┐
             ├── Creation C
Creation B ──┘
```

This would represent a **multi-source derivation**.

Supporting this immediately would significantly affect:

* Lineage representation;
* UI;
* database relationships;
* attribution;
* navigation;
* deletion behavior.

Therefore, multi-parent Lineage should not be assumed as an initial requirement.

It should remain an explicit open architectural/product consideration.

---

# Removed Creation

A Creation may become unavailable because of:

* creator removal;
* moderation;
* account-related actions;
* legal requirements;
* other platform processes.

Its disappearance should not automatically rewrite the history of its descendants.

Consider:

```text
A
↓
B
↓
C
```

If B becomes unavailable:

```text
A
↓
[Creation unavailable]
↓
C
```

C remains a valid Creation.

---

# Tombstone

A historical placeholder for unavailable content may be referred to conceptually as a **Tombstone**.

Example:

```text
[Creation unavailable]
```

A Tombstone does not necessarily expose:

* deleted media;
* deleted Prompt content;
* private information;
* the reason for removal.

Its purpose is to preserve the existence of the historical relationship.

---

# Tombstones Preserve Structure

✅ **Decided — Principle**

If a Creation disappears while descendants remain, Mosaic should preserve enough structural information to avoid falsifying the Lineage.

This means:

```text
A
↓
B
↓
C
```

must not silently become:

```text
A
↓
C
```

when B is removed.

C was derived from B, not directly from A.

---

# Tombstone Visibility

🟡 **Open Decision**

The information displayed for an unavailable Creation may depend on why it became unavailable.

For example, Mosaic may need different behavior for:

* user deletion;
* moderation removal;
* legal removal;
* deleted account;
* temporary restriction.

The final rules will be defined together with Moderation, Privacy, and Business Rules.

---

# Deleted Accounts

If an author's account is deleted, Lineage should remain structurally valid.

Example:

```text
Creation A — @Ana
       ↓
Creation B — Deleted User
       ↓
Creation C — @Lucas
```

The exact amount of retained identity information must comply with Mosaic's privacy and deletion policies.

The system should preserve creative history without unnecessarily preserving personal information.

---

# Suspended or Banned Accounts

Suspension or banning does not automatically mean every historical relationship created by that account should cease to exist.

Moderation may independently determine the availability of individual Creations.

Account enforcement and Creation enforcement should therefore not be treated as exactly the same operation.

---

# Blocking

Blocking affects interaction between users.

It does not rewrite history.

Example:

```text
Ana creates A
       ↓
Carlos creates B
       ↓
Ana blocks Carlos
```

The relationship:

```text
A → B
```

still historically exists.

Blocking may affect what each user sees or how they interact, but it does not erase authorship or derivation.

---

# Lineage Integrity

✅ **Decided**

Mosaic should treat Lineage as historical information.

Once a legitimate derivation relationship becomes part of the published creative history, ordinary social actions should not casually rewrite it.

Examples of actions that should not alter historical Lineage include:

* unfollowing;
* blocking;
* changing username;
* changing display name;
* Profile changes.

---

# Preventing Cycles

Lineage represents creative history.

Therefore:

✅ **Decided**

A Creation must never become its own ancestor.

Invalid:

```text
A
↓
B
↓
C
↓
A
```

Lineage must remain acyclic.

This will later become an important Business Rule and data-integrity requirement.

---

# Parent Must Precede Child

✅ **Decided — Principle**

A derived Creation cannot historically originate from a Creation that did not yet exist.

Therefore, the parent relationship must represent a valid direction of creative history:

```text
Earlier source
     ↓
Later derived Creation
```

Technical timestamps alone may not always be sufficient to establish creative truth, but Mosaic must prevent structurally impossible Lineage relationships.

---

# Changing Parent After Publication

🟡 **Open Decision**

Changing the parent of an already published Creation is potentially dangerous because it rewrites creative history.

Possible legitimate cases include:

* accidental wrong source selection;
* creator correction;
* moderation correction.

This should not behave like ordinary metadata editing.

Mosaic will need a controlled correction process rather than unrestricted parent editing.

---

# Removing a Lineage Relationship

🟡 **Open Decision**

There may be exceptional cases where a derivation relationship itself is incorrect.

Examples:

* the user selected the wrong source;
* fraudulent attribution;
* moderation correction;
* system error.

Mosaic should eventually provide a controlled mechanism to correct these situations while maintaining an appropriate audit trail.

---

# Lineage Navigation

Users should be able to explore the evolution of a Creation.

Possible navigation includes:

```text
View Parent

View Origin

View Direct Variations

Explore Lineage
```

A user viewing a deep descendant should be able to understand that it belongs to a larger creative history.

---

# Lineage Tree

A visual Lineage representation may eventually show:

```text
Original — @Ana
│
├── @Carlos
│   ├── @Lucas
│   └── @Marina
│
├── @João
│
└── @Ana
    └── @Pedro
```

🔮 The exact visualization is a design decision.

The product requirement is that the relationships exist and can be explored.

---

# Large Lineages

Some Creations may eventually produce hundreds or thousands of descendants.

The product should not assume that the entire tree can always be rendered simultaneously.

Future interfaces may use:

* pagination;
* lazy loading;
* branch expansion;
* search within Lineage;
* filters;
* highlighted branches;
* popularity or relevance signals.

These are scalability and UX concerns rather than changes to the Lineage concept itself.

---

# Lineage and Discovery

Lineage creates additional discovery opportunities.

A user may discover:

```text
Most remixed Creations

Interesting variations

Recent branches

Creations derived from a specific idea

Different approaches to the same Prompt
```

Detailed ranking and recommendation behavior belongs to:

[Discovery & Search](./discovery.md)

---

# Lineage and Notifications

When a new direct descendant is published, the parent Creation's author may receive a notification.

Example:

```text
Carlos publishes B
derived from Ana's A

        ↓

Ana receives:
"@Carlos created a variation of your Creation."
```

✅ **Decided — Principle**

The **direct parent creator** should be the primary notification target.

Notifying every ancestor could create excessive notifications in large Lineages.

Ancestor notifications, summaries, or milestones may be considered later.

---

# Lineage and Metrics

Mosaic may track information such as:

```text
Direct descendants
Total descendants
Lineage depth
```

Some of these may become useful for:

* discovery;
* creator analytics;
* Lineage navigation;
* community insights.

They should not automatically be interpreted as measures of creative quality.

---

# Lineage and Moderation

Moderation actions against one Creation should not automatically punish its entire Lineage.

Example:

```text
A
↓
B ← violates a rule
↓
C
```

Removing B does not necessarily imply that A or C violates the same rule.

Each Creation should be evaluated according to the relevant moderation context.

---

# Lineage Auditability

✅ **Decided — Principle**

Important changes affecting Lineage should be traceable internally.

Examples include:

* creation of a derivation relationship;
* correction of a source;
* moderation intervention;
* removal;
* restoration.

The exact audit model will be specified in Moderation, Business Rules, and Technical Design.

---

# Relationship to Mosaic's Philosophy

Lineage is not merely a technical relationship between records.

It represents one of Mosaic's central ideas:

> **Creative work evolves through people.**

A Creation is a piece.

A derived Creation becomes another piece.

Together, these pieces reveal the history of an idea.

```text
One Creation
      ↓
Many interpretations
      ↓
Many branches
      ↓
A creative Mosaic
```

---

# Important Product Decisions

| Decision                                                      | Status    |
| ------------------------------------------------------------- | --------- |
| Derived Creations preserve their direct parent                | ✅ Decided |
| Lineage is not flattened to the original Creation             | ✅ Decided |
| Origin and direct parent are distinct concepts                | ✅ Decided |
| A Remix is an independent Creation                            | ✅ Decided |
| Creators may derive new Creations from their own work         | ✅ Decided |
| Self-derivation uses the same underlying Lineage concept      | ✅ Decided |
| Customization alone does not create Lineage                   | ✅ Decided |
| Copying a Prompt alone does not create Lineage                | ✅ Decided |
| Similarity alone does not establish Lineage                   | ✅ Decided |
| Derived Creations preserve attribution                        | ✅ Decided |
| Attribution cannot be casually removed                        | ✅ Decided |
| Authors control their own Creations, not descendants          | ✅ Decided |
| Public Creations are remixable by default                     | ✅ Decided |
| Creative disagreement does not grant deletion authority       | ✅ Decided |
| Lineage supports multiple generations                         | ✅ Decided |
| Branching is a fundamental behavior                           | ✅ Decided |
| Removed intermediate Creations do not flatten history         | ✅ Decided |
| Tombstones may preserve missing historical nodes              | ✅ Decided |
| Blocking does not rewrite Lineage                             | ✅ Decided |
| Lineage must remain acyclic                                   | ✅ Decided |
| Direct parent author is the primary Remix notification target | ✅ Decided |
| Exact self-republication terminology                          | 🟡 Open   |
| Multiple direct parents                                       | 🟡 Open   |
| Tombstone display rules                                       | 🟡 Open   |
| Parent correction process                                     | 🟡 Open   |
| Lineage relationship dispute/removal process                  | 🟡 Open   |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* multi-source Creations;
* advanced interactive Lineage trees;
* Lineage search;
* branch comparison;
* evolution timelines;
* Prompt difference visualization;
* lineage-based recommendations;
* creator collaboration;
* lineage milestones;
* lineage analytics;
* AI-assisted evolution summaries.

These possibilities are not current implementation requirements.

The underlying Lineage model should remain extensible enough to evaluate them later without attempting to implement them prematurely.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Prompt System](./prompts.md)
* [Prompt Customization](./customization.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Data Model](../03-technical/data-model.md)

---

**Previous:** [← Prompt Customization](./customization.md) · [Documentation Home](../README.md) · **Next:** [Discovery & Search →](./discovery.md)
