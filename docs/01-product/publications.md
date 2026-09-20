# Publication System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Publication System** defines how creative work is created, prepared, published, edited, displayed, and managed within Mosaic.

The central content unit of Mosaic is called a **Creation**.

A Creation combines a generated result with the information necessary to understand the creative process behind it.

At its simplest:

```text
Generated Media
      +
Prompt
      +
Creative Context
      =
Creation
```

A Creation may be a root Creation in Mosaic's Lineage or a derived Creation connected to another Creation through Mosaic's Remix system.

The Publication System is responsible for the Creation itself and its lifecycle.

Prompt structure, customization, lineage, social interactions, and moderation are defined in their respective systems.

---

# Why This System Exists

Mosaic is not designed around isolated media posts.

A video without its prompt loses much of the knowledge Mosaic is intended to preserve.

A prompt without its result makes it harder to understand what the instructions actually produced.

Mosaic therefore connects both sides:

```text
What was created
        ↕
How it was created
```

A Creation should provide enough context for another person to:

* discover the result;
* understand its origin;
* inspect the associated prompt;
* learn from the creative process;
* customize relevant elements;
* save it;
* discuss it;
* Remix it.

---

# Core Terminology

## Creation

A **Creation** is the primary content entity published by a user on Mosaic.

It represents a creative result and the information associated with its generation.

---

## Publication

**Publication** is the act of making a Creation available to the Mosaic community.

For example:

```text
User creates a draft
        ↓
User prepares the Creation
        ↓
User publishes it
        ↓
Creation becomes publicly available
```

For clarity, Mosaic documentation should prefer the word **Creation** when referring to the content itself.

---

## Original Creation

An **Original Creation** is a Creation published without being derived through Mosaic's Remix mechanism.

```text
Original Creation
        │
        ├── Remix
        ├── Remix
        └── Remix
```

"Original" in this context describes its position inside Mosaic's lineage system.

It does **not automatically represent a legal determination of intellectual property ownership or originality**.

---

## Remix

A **Remix** is a new Creation intentionally derived from another Creation through Mosaic.

A Remix is still a complete and independent Creation.

Its distinguishing characteristic is that it maintains a relationship with another Creation.

Detailed behavior is defined in:

[Remix & Lineage](./remix-lineage.md)

---

# Creation Structure

A Creation should be able to represent several categories of information.

Conceptually:

```text
CREATION
│
├── Identity
│   ├── ID
│   ├── Title
│   └── Author
│
├── Media
│   └── Generated result
│
├── Prompt
│   ├── Prompt content
│   └── Customizable elements
│
├── Generation Context
│   ├── AI model/tool
│   └── Relevant settings
│
├── Description
│
├── Discovery Metadata
│   ├── Categories
│   └── Tags
│
├── Lineage
│   ├── Parent Creation
│   └── Origin
│
└── Platform Metadata
    ├── Creation date
    ├── Publication date
    ├── Update date
    └── Status
```

This is a **conceptual structure**, not the final database schema.

The Data Model will later determine how these concepts are technically represented.

---

# Creation Content

## Generated Media

✅ **Decided**

A Creation should contain a visual result associated with the prompt.

Because Mosaic initially focuses on AI video generation, **video is the primary media format**.

However, supporting complementary visual media may be useful for:

* previews;
* thumbnails;
* cover images;
* comparison material;
* supporting context.

Exact supported formats, limits, compression, storage, and processing will be defined in:

[Media & Storage](../03-technical/media-storage.md)

---

## Prompt

✅ **Decided**

A published Creation must contain a prompt or equivalent generation instructions relevant to the Creation.

This is a fundamental distinction between Mosaic and a conventional visual social network.

Mosaic is intended to preserve the connection between:

```text
Result ↔ Instructions
```

The exact representation of prompts is defined separately in:

[Prompt System](./prompts.md)

---

## Title

A Creation should have a human-readable title.

The title helps:

* identify the Creation;
* provide context;
* improve navigation;
* support search;
* improve sharing and accessibility.

Exact length limits will be defined later.

---

## Description

A Creation may contain a description written by its creator.

The description can provide context that does not belong directly inside the prompt.

For example:

* creative intent;
* explanation of the scene;
* observations about the result;
* useful instructions;
* known limitations;
* experimentation notes.

A description should not be required simply to satisfy a form.

---

# Generation Context

A prompt alone may not always be enough to reproduce or understand a result.

Different AI models may interpret the same instructions differently.

Therefore, Mosaic should allow creators to document relevant generation context.

Potential information includes:

* AI generation platform;
* model;
* model version;
* generation parameters;
* aspect ratio;
* duration;
* seed when applicable;
* other model-specific configuration.

---

## Required vs Optional Generation Information

🟡 **Open Decision**

We should not assume every generation tool exposes the same information.

Mosaic therefore needs to determine later:

* which generation fields are universal;
* which are optional;
* which are model-specific;
* whether creators may add custom parameters.

This will be defined together with the Prompt System and Data Model.

---

# AI Tool Attribution

Creators should be able to indicate which AI generation tool or model was used.

This information benefits:

* reproducibility;
* search;
* education;
* comparison;
* discovery.

However, Mosaic should avoid assuming that every tool uses the same terminology or configuration model.

The system should be extensible enough to accommodate new generation tools without requiring major product changes.

---

# Drafts

✅ **Decided**

Users should be able to prepare a Creation without immediately publishing it.

A draft may allow creators to:

* upload or select media;
* write the title;
* write the description;
* add the prompt;
* configure customizable elements;
* document generation information;
* review the Creation before publication.

Conceptually:

```text
DRAFT
  ↓
PUBLISHED
```

Drafts are private working content and should not appear in public discovery.

---

# Saving Drafts

A user should be able to return to an unfinished draft later.

The exact autosave/manual-save behavior is a UX and technical decision to be defined during implementation planning.

---

# Publication

When a user publishes a Creation, Mosaic should validate that the required information is present and that the content satisfies applicable platform rules.

Conceptually:

```text
Draft
  ↓
Validation
  ↓
Publication
  ↓
Public Creation
```

Validation may eventually include:

* required field validation;
* media validation;
* prompt validation;
* security checks;
* automated moderation checks.

Not all validation needs to happen through the same mechanism.

---

# Publication Requirements

✅ **Decided — Principle**

A Creation should not be publishable unless it contains the minimum information necessary to remain useful within Mosaic.

At a conceptual level, that means:

```text
Author
+
Generated Result
+
Prompt
+
Basic Identification
=
Publishable Creation
```

The exact mandatory fields will be formalized later in Functional Requirements and Business Rules.

---

# Publication Lifecycle

A Creation should have a lifecycle rather than being represented only as "exists" or "does not exist."

Conceptually:

```text
              ┌─────────────┐
              │    DRAFT    │
              └──────┬──────┘
                     │ Publish
                     ▼
              ┌─────────────┐
              │  PUBLISHED  │
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
       EDITED               REMOVED
```

Additional states may eventually be required for:

* moderation;
* processing;
* upload failures;
* scheduled publication;
* archiving.

The final state machine should only be defined after these systems are specified.

---

# Editing a Published Creation

✅ **Decided**

Creators should be able to correct or improve information associated with their published Creations.

However, Mosaic has a special challenge:

**other Creations may depend on the published content.**

Example:

```text
Creation A
    ↓
Remix B
    ↓
Remix C
```

If the creator of A completely changes its prompt after B and C already exist, the historical meaning of the lineage may become inaccurate.

Therefore, not every edit should necessarily behave like a silent replacement.

---

# Published Creation as a Historical Record

✅ **Decided — Principle**

A published Creation represents a creative state at the moment it was published.

Mosaic should not treat a published Creation as a container that continuously evolves through internal creative versions.

If the creator later discovers a meaningfully different or improved approach, that evolution should be published as a **new derived Creation**.

Example:

```text
Creation A — original published state
    ↓
Creation B — updated approach by the same creator
```

Creation A remains intact as part of the creative history.

Creation B becomes another node in the Lineage.

This same derivation model applies whether the new Creation is published by the original author or by another user.

Detailed behavior is defined in:

[Remix & Lineage](./remix-lineage.md)

---

# Edit vs New Derived Creation

✅ **Decided — Principle**

Mosaic distinguishes corrections to an existing Creation from meaningful creative evolution.

### Edit Existing Creation

Appropriate examples include:

* correcting spelling;
* fixing formatting;
* correcting descriptive metadata;
* adjusting tags;
* other changes that do not materially change what was created or how it was created.

### Publish a New Derived Creation

Appropriate examples include:

* substantially improving or replacing the Prompt;
* publishing a different generated result;
* introducing a new generation technique;
* adapting the approach to another model;
* substantially changing customizable elements;
* changing important generation configuration;
* otherwise changing the creative meaning of the published work.

The guiding rule is:

> **Corrections may edit the existing Creation. Creative evolution produces another Creation.**

The exact boundary for unusual edge cases remains an open decision and will be refined in Business Rules.

---

# Published Media Replacement

✅ **Decided — Principle**

The generated result is part of what a published Creation represents.

Replacing it with a materially different generated result would change the historical meaning of that Creation.

Therefore, a different creative result should normally be published as a **new derived Creation**, rather than silently replacing the existing result.

Technical corrections that do not change the represented creative result — for example, repairing a broken upload or replacing a corrupted file with an equivalent asset — may be handled as maintenance of the existing Creation.

The exact operational safeguards for equivalent media replacement will be defined later.

---

# Creation Removal

Users should have meaningful control over content they publish.

A creator should generally be able to request removal of their own Creation.

However, removing a Creation becomes more complex when other Creations depend on it.

Example:

```text
Creation A
   ↓
Creation B
   ↓
Creation C
```

If Creation B becomes unavailable, Mosaic should avoid pretending that C originated directly from A.

Instead, the lineage may conceptually remain:

```text
Creation A
   ↓
[Creation unavailable]
   ↓
Creation C
```

This preserves historical truth without necessarily preserving the removed content itself.

---

# Removal vs Deletion

✅ **Decided — Principle**

Mosaic should distinguish between:

**content becoming unavailable**

and

**historical relationships being erased.**

Removing a Creation should not automatically rewrite the history of other Creations.

The exact deletion, retention, anonymization, and legal handling rules will be specified later.

---

# Author Ownership and Control

A creator controls their own Creation within the limits of Mosaic's platform rules.

They may manage actions such as:

* editing appropriate information;
* managing the Creation;
* requesting its removal;
* interacting with comments;
* reviewing its performance when analytics are available.

However, publishing something publicly also creates relationships with the community.

---

# Control Over Remixes

✅ **Decided**

The author of an original Creation does **not** own or directly control independent Remixes created by other users.

Example:

```text
Ana
Creation A
   │
   └── Carlos
       Remix B
```

Ana controls Creation A.

Carlos controls Remix B.

Ana cannot delete Remix B simply because it was based on A.

If Ana believes Remix B violates Mosaic's rules or applicable rights, she may report it through the appropriate moderation process.

This preserves creative freedom while providing mechanisms for disputes and abuse.

---

# Attribution

Every published Creation must have an identifiable author or an appropriate historical identity representation.

When a Creation is a Remix, attribution should include its relationship to the source Creation.

Attribution should remain part of the Creation's history even when social relationships between users change.

Blocking, unfollowing, or other interpersonal actions should not rewrite authorship.

---

# Visibility

Mosaic is fundamentally designed around public discovery.

Therefore:

✅ **Decided — Principle**

Published Creations are public by default.

They may be discoverable through:

* creator Profiles;
* feeds;
* search;
* categories;
* tags;
* lineage;
* direct links;
* other discovery mechanisms.

---

## Private Creations

🟡 **Open Decision**

Mosaic may eventually support non-public Creations.

Possible use cases include:

* personal prompt libraries;
* work in progress;
* private references;
* collaboration.

However, private Creations introduce questions about:

* Remix permissions;
* sharing;
* lineage;
* search;
* collaboration;
* access control.

Drafts already provide a private state for unfinished work.

A separate private-publication model should only be introduced if there is a clear user need.

---

# Categories

Categories can help organize broad types of Creations.

For example, future categories might represent concepts such as:

```text
Cinematic
Animation
Advertising
Nature
Fashion
Architecture
Experimental
```

These are examples, not finalized categories.

🟡 **Open Decision**

We still need to determine whether categories are:

* predefined by Mosaic;
* hierarchical;
* selectable in multiples;
* moderated;
* dynamically managed.

This will be addressed in Discovery & Search.

---

# Tags

Tags may allow creators to describe more specific characteristics of a Creation.

Example:

```text
#cyberpunk
#night
#cinematic
#rain
```

Tags could improve search and discovery but also introduce:

* spam;
* duplicates;
* spelling variations;
* abuse;
* irrelevant tagging.

Their exact behavior will be defined in Discovery & Search.

---

# Social Interactions

Published Creations may participate in Mosaic's social systems.

Potential interactions include:

* likes;
* comments;
* replies;
* saves;
* shares;
* Remixes.

The Publication System provides the content these interactions reference.

Their detailed behavior belongs to:

[Social System](./social.md)

and

[Collections & Saves](./collections.md)

---

# Creation Metrics

Mosaic may track information about how Creations are used.

Potential metrics include:

* views;
* likes;
* comments;
* saves;
* shares;
* Remixes.

Some metrics may be visible publicly while others may eventually be available only to the creator.

🔮 Advanced creator analytics are a future possibility and should not be confused with basic platform metrics.

---

# Reporting a Creation

Users should be able to report published Creations that they believe violate Mosaic's rules.

A report should not automatically determine that a violation occurred.

Reports become inputs to the Moderation & Trust system.

Detailed behavior is defined in:

[Moderation & Trust](./moderation.md)

---

# Moderation State

A Creation may remain stored while having its public availability restricted by moderation.

Conceptually:

```text
Creation exists
      │
      ├── Publicly available
      │
      └── Restricted by moderation
```

This distinction is important because moderation actions may:

* be temporary;
* be appealed;
* be reversed;
* require audit history.

The Publication System must therefore not assume that "not publicly visible" means "deleted."

---

# Creation Identity

✅ **Decided — Principle**

Every Creation should have a stable internal identity independent of:

* its title;
* its author's username;
* its position in a feed;
* its current metadata.

This allows relationships such as:

```text
Creation
├── Comments
├── Likes
├── Saves
├── Reports
├── Remixes
└── Lineage
```

to remain stable even when editable information changes.

The technical identifier format will be decided in the Data Model.

---

# URLs and Sharing

A published Creation should have a stable shareable destination.

Changing the title or username should not unnecessarily break access to the Creation.

The final URL strategy will be defined during technical design.

---

# Accessibility

Creation publishing should support accessibility wherever reasonably possible.

This may eventually include:

* meaningful titles;
* accessible controls;
* captions or textual context;
* keyboard navigation;
* appropriate media presentation.

Detailed accessibility requirements belong to Non-Functional Requirements and interface design.

---

# Important Product Decisions

| Decision                                                     | Status    |
| ------------------------------------------------------------ | --------- |
| Creation is Mosaic's primary content unit                    | ✅ Decided |
| Publication represents making a Creation available           | ✅ Decided |
| Video is the initial primary media format                    | ✅ Decided |
| A published Creation includes its prompt                     | ✅ Decided |
| Creations support drafts                                     | ✅ Decided |
| Drafts are not publicly discoverable                         | ✅ Decided |
| Published Creations are public by default                    | ✅ Decided |
| Creators can edit their own Creations                        | ✅ Decided |
| Published Creations preserve their historical creative meaning | ✅ Decided |
| Creation removal does not automatically erase lineage        | ✅ Decided |
| Remix authors control their own independent Creations        | ✅ Decided |
| Original authors cannot directly delete another user's Remix | ✅ Decided |
| Creations have stable internal identities                    | ✅ Decided |
| Generation metadata structure                                | 🟡 Open   |
| Exact Edit vs New Creation boundary for edge cases            | 🟡 Open   |
| Equivalent-media maintenance safeguards                       | 🟡 Open   |
| Private Creations                                            | 🟡 Open   |
| Category model                                               | 🟡 Open   |
| Tag behavior                                                 | 🟡 Open   |

---

# Future Possibilities

🔮 The following are possibilities rather than current requirements:

* scheduled publication;
* collaborative Creations;
* private Creations;
* organization-owned Creations;
* advanced creator analytics;
* richer generation metadata;
* multiple media results per Creation;
* publication templates;
* comparison between generated results;
* advanced Lineage exploration and creative-history tools.

These features should only enter implementation scope when justified by actual product requirements.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Prompt System](./prompts.md)
* [Prompt Customization](./customization.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Collections & Saves](./collections.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Data Model](../03-technical/data-model.md)
* [Media & Storage](../03-technical/media-storage.md)

---

**Previous:** [← User & Identity](./user-identity.md) · [Documentation Home](../README.md) · **Next:** [Prompt System →](./prompts.md)
