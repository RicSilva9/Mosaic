# Discovery & Search System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Discovery & Search System** defines how people find Creations, creators, Prompts, variations, and creative ideas within Mosaic.

Publishing valuable content is not enough.

Mosaic must also help that content reach people who may want to:

* watch it;
* understand it;
* save it;
* customize it;
* Remix it;
* follow its creator;
* explore its Lineage.

Discovery therefore connects Mosaic's content ecosystem.

```text
Creation
    ↓
Discovery
    ↓
User
    ↓
Understand
    ↓
Customize
    ↓
Create
    ↓
Publish
```

The system should help users intentionally search for something while also allowing them to discover things they did not know to search for.

---

# Why This System Exists

As Mosaic grows, thousands or eventually millions of Creations may exist.

Without discovery mechanisms, useful content becomes difficult to find.

A user may want to search for something specific:

```text
"cinematic medieval battle"
```

Another may want to browse:

```text
Cinematic
Fashion
Architecture
Animation
```

Another may simply open Mosaic and ask implicitly:

> What is worth exploring today?

These are different discovery problems.

Mosaic should support all of them without requiring one mechanism to solve everything.

---

# Discovery Models

Mosaic conceptually supports several forms of discovery:

```text
DISCOVERY
│
├── Search
├── Home Feed
├── Following
├── Categories
├── Tags
├── Trending
├── Recommendations
├── Creator Profiles
└── Lineage Exploration
```

Not every mechanism needs to exist in the first release.

The system should grow according to actual product needs.

---

# Search

Search allows users to intentionally look for content.

A search query may eventually match information such as:

* Creation titles;
* descriptions;
* Prompt content;
* creators;
* usernames;
* tags;
* categories;
* AI models;
* generation providers;
* customizable elements.

Example:

```text
User searches:

"medieval castle rain cinematic"

            ↓

Mosaic searches relevant indexed information

            ↓

Relevant Creations
```

---

# Searchable Entities

Mosaic search should eventually be capable of finding more than Creations.

Conceptually:

```text
Search
│
├── Creations
├── Creators
├── Prompts
├── Tags
├── Categories
└── Models
```

The exact entities supported in the first implementation will be defined during MVP planning.

---

# Search Results

Search results should prioritize relevance to the user's query.

Potential signals may include:

* textual relevance;
* Prompt relevance;
* tags;
* categories;
* model information;
* recency;
* engagement;
* creator relationships;
* content quality signals.

However:

✅ **Decided — Principle**

Mosaic should not define popularity as the same thing as relevance.

A highly popular Creation should not automatically outrank a much more relevant Creation for a specific search.

---

# Search Filters

Users may eventually refine searches through filters.

Possible examples include:

```text
Model
Provider
Category
Creation date
Media characteristics
Creator
Prompt characteristics
```

Future Prompt structures may introduce additional useful filters.

🟡 **Open Decision**

The initial filter set should be chosen only after Mosaic's Creation and generation metadata models are finalized.

---

# Search Sorting

Possible sorting options may eventually include:

```text
Relevance
Recent
Popular
Most Remixed
Most Saved
```

These options should not be assumed to represent the same concept.

For example:

```text
Most Liked ≠ Most Relevant
Most Viewed ≠ Highest Quality
Most Remixed ≠ Best
```

Metrics describe user behavior.

They should not automatically become judgments of creative quality.

---

# Home Feed

The Home Feed provides a discovery experience without requiring an explicit search.

Conceptually:

```text
Open Mosaic
      ↓
Home Feed
      ↓
Discover Creations
```

The feed may eventually combine different signals such as:

* recent Creations;
* content from followed creators;
* relevant categories;
* user interests;
* community activity;
* emerging Creations;
* Lineage activity.

---

# Initial Feed Strategy

🟡 **Open Decision**

Mosaic should avoid building a highly complex recommendation algorithm before enough real user behavior exists to justify it.

An early feed could rely on simpler understandable signals such as:

```text
Recent
+
Following
+
Community activity
+
Basic relevance
```

More sophisticated personalization can evolve later.

This follows Mosaic's broader principle:

> **Build for evolution, not speculation.**

---

# Following Feed

Users should be able to discover new Creations from creators they follow.

Conceptually:

```text
Following
│
├── @Ana publishes A
├── @Carlos publishes B
└── @Maria publishes C
```

The exact interface may be:

* a dedicated Following feed;
* a Home Feed filter;
* a section within Home;
* another appropriate design.

The product requirement is that following creators provides a meaningful discovery mechanism.

---

# Following Does Not Guarantee Visibility

🟡 **Open Decision**

Mosaic will need to decide whether the Following experience is:

```text
Strictly chronological
```

or:

```text
Ranked
```

or offers both.

This should not be decided before feed requirements and expected scale are better understood.

---

# Categories

Categories provide broad organization for Creations.

Possible examples include:

```text
Cinematic
Animation
Advertising
Fashion
Architecture
Nature
Experimental
```

These are examples only.

Categories can help users browse even when they do not know what exact words to search for.

---

# Category Management

🟡 **Open Decision**

We still need to determine:

* who creates categories;
* whether categories are predefined by Mosaic;
* whether they can change over time;
* whether Creations may belong to multiple categories;
* whether categories can contain subcategories.

A controlled category system may reduce fragmentation, while an overly rigid system may age poorly.

This decision should balance consistency and extensibility.

---

# Tags

Tags provide more specific descriptions than categories.

Example:

```text
#cyberpunk
#rain
#night
#tracking-shot
#photorealistic
```

Unlike categories, tags may represent highly specific or emerging concepts.

---

# Tag Flexibility

Tags could allow Mosaic's vocabulary to evolve naturally as new creative techniques and trends appear.

However, unrestricted tags introduce problems such as:

```text
#cinematic
#cinematics
#cinematicvideo
#cinematic-video
```

They can also introduce:

* spam;
* misleading tags;
* abuse;
* excessive tagging;
* duplicate concepts.

🟡 **Open Decision**

The final tag model may combine user-created tags with normalization, suggestions, moderation, or canonical concepts.

---

# Trending

Trending discovery highlights Creations or topics receiving unusual attention within a relevant period.

Trending should represent **current activity**, not permanent popularity.

Conceptually:

```text
High recent activity
        +
Time window
        +
Relevant signals
        =
Trending candidate
```

---

# Trending Is Not "Most Popular Ever"

✅ **Decided — Principle**

Trending should account for time.

Otherwise old highly popular Creations could permanently dominate the section.

The exact calculation should be defined only when Mosaic has enough real usage data to evaluate meaningful signals.

---

# Trending Manipulation

Any popularity-based system may attract manipulation.

Potential behavior includes:

* artificial likes;
* fake accounts;
* coordinated engagement;
* spam;
* repeated self-interaction.

Therefore:

✅ **Decided — Principle**

Engagement metrics used for discovery must be treated as potentially manipulable signals.

Anti-abuse mechanisms will be defined in Security, Moderation, and Technical Design.

---

# Recommendations

Recommendations may eventually help users find Creations relevant to their interests.

Possible signals include:

```text
Creations viewed
Creations saved
Creators followed
Prompts customized
Categories explored
Lineages explored
Explicit preferences
```

🔮 **Future Possibility**

Advanced personalized recommendation is not required for Mosaic's initial implementation.

Mosaic should first establish useful content, interactions, and trustworthy behavioral data.

---

# Recommendation Transparency

If Mosaic later introduces significant personalized ranking:

✅ **Decided — Principle**

The platform should avoid unnecessarily opaque user experiences.

Where practical, Mosaic may provide context such as:

```text
Because you follow @creator

Similar to a Creation you saved

Popular in Cinematic

From a Lineage you explored
```

Exact explanations depend on the future recommendation system.

---

# Discovery Through Creators

Profiles are themselves discovery surfaces.

A user may find one Creation and then explore its author:

```text
Creation
    ↓
Creator Profile
    ↓
Other Creations
    ↓
Other Lineages
```

Creator Profiles should therefore provide meaningful access to their public creative work.

---

# Discovery Through Lineage

Lineage is a unique Mosaic discovery mechanism.

A user may discover Creation C and then explore:

```text
Where did C come from?
        ↓
Creation B
        ↓
Creation A
```

or:

```text
What evolved from C?
        ↓
D
E
F
```

This turns creative history itself into a navigation system.

---

# Variations

A Creation may expose its direct variations.

Example:

```text
Creation A

Variations
├── B
├── C
├── D
└── E
```

Users should be able to explore how different creators interpreted the same source.

This can provide a form of discovery that traditional social feeds do not naturally offer.

---

# Origin Exploration

A user viewing a descendant may navigate toward its Origin.

Example:

```text
D
↑
C
↑
B
↑
A
```

This allows users to understand the historical context behind a Creation.

---

# Branch Exploration

Users may eventually explore individual branches:

```text
A
├── B
│   └── D
│       └── F
│
└── C
    └── E
```

A user interested in B's direction can follow that branch without losing awareness of the larger Lineage.

---

# Remix Count

A Creation may display information about how much direct or total creative activity originated from it.

However:

🟡 **Open Decision**

Mosaic must distinguish between:

```text
Direct descendants
```

and:

```text
All descendants
```

before presenting a generic "Remix count."

Example:

```text
A
├── B
│   └── D
└── C
```

A has:

```text
2 direct descendants
3 total descendants
```

The interface should avoid ambiguous metrics.

---

# Discovery Through Models

Users may want to discover what creators are producing with a specific AI model.

Example:

```text
Model X
   ↓
Creations made with Model X
```

This can help users:

* understand model capabilities;
* find useful Prompts;
* compare techniques;
* learn model-specific prompting approaches.

---

# Model Pages

🔮 **Future Possibility**

Mosaic may eventually provide dedicated pages for AI models or providers containing:

* Creations;
* popular Prompts;
* recent experiments;
* relevant categories;
* model information.

This is not required for the initial product.

---

# Prompt-Based Discovery

Because Mosaic preserves Prompt information, discovery may eventually operate on creative instructions rather than only titles and tags.

For example, a user could search:

```text
"slow camera orbit around character"
```

and find Creations whose Prompts contain or semantically represent that technique.

🔮 Semantic Prompt Search is a future capability.

Basic search should not depend on advanced AI infrastructure to function.

---

# Discovery and Customization

Discovery should lead naturally into creative action.

```text
Find Creation
      ↓
Open Creation
      ↓
Understand Prompt
      ↓
Customize
```

This is one of the main differences between Mosaic and a passive media feed.

Discovery is not only intended to maximize viewing.

It should help users **create**.

---

# Discovery and Remixing

Similarly:

```text
Discover
   ↓
Customize
   ↓
Generate
   ↓
Publish
   ↓
New branch appears
```

The discovery system therefore feeds Mosaic's creative ecosystem.

---

# Saved Content and Discovery

Saving a Creation allows users to intentionally preserve something they want to revisit.

Saved content may eventually provide useful recommendation signals.

However:

✅ **Decided — Principle**

A user's private organizational behavior should not automatically become publicly visible merely because it is useful to recommendation systems.

Detailed privacy behavior belongs to Collections & Saves.

---

# Discovery Diversity

A discovery system based entirely on popularity can create a feedback loop:

```text
Popular content
      ↓
More visibility
      ↓
More engagement
      ↓
More popularity
      ↓
Even more visibility
```

This can make it difficult for new creators or unusual ideas to surface.

Therefore:

✅ **Decided — Principle**

Mosaic's discovery systems should leave room for:

* new Creations;
* emerging creators;
* niche interests;
* different creative approaches.

The exact ranking mechanisms should be evaluated using real platform behavior.

---

# New Creator Discovery

Mosaic should not require an existing large follower base for a Creation to have any possibility of being discovered.

This does not mean every Creation receives equal distribution.

It means follower count should not become the only meaningful path to visibility.

---

# Content Quality

Mosaic may eventually develop signals for spam, low-effort duplication, misleading metadata, or other behavior that harms discovery.

However:

✅ **Decided — Principle**

Mosaic should avoid treating a single engagement metric as a universal measurement of creative quality.

Quality is contextual and difficult to reduce to one number.

---

# Search and Moderation

Content removed or restricted by moderation should respect its current visibility state in search and discovery.

For example:

```text
Public Creation
→ searchable

Removed Creation
→ not normally discoverable

Tombstone
→ may remain visible only where necessary for Lineage
```

The exact behavior will be coordinated with Moderation & Trust.

---

# Blocked Users and Discovery

Blocking may affect discovery results between the involved users.

For example, Mosaic may avoid recommending content from a blocked account.

However, Lineage may still require limited historical representation.

Detailed visibility rules will be defined with Social and Moderation.

---

# Deleted Content

Deleted or unavailable Creations should not normally continue appearing as ordinary discovery results.

Historical placeholders may remain accessible through Lineage when necessary.

This preserves:

```text
Discovery relevance
+
Historical integrity
```

without treating unavailable content as active content.

---

# Search Index Evolution

As Mosaic evolves, new searchable information may appear.

For example:

```text
Today
Title
Prompt
Tags
Model

Future
Prompt components
Generation techniques
Reference assets
New media types
New metadata
```

✅ **Decided — Principle**

Search architecture should be capable of evolving as Mosaic's content model evolves.

The technical implementation will be defined later in:

[Search](../03-technical/search.md)

---

# Public Browsing

As established in User & Identity:

✅ **Decided**

Public Creations should be discoverable without requiring users to authenticate.

Certain personalized features may require an account.

Example:

```text
Anonymous Visitor
├── Browse
├── Search
└── View public Creation

Authenticated User
├── Everything above
├── Follow
├── Save
├── Like
├── Comment
├── Customize
└── Publish
```

Exact interaction requirements will be formalized later.

---

# Discovery Without Personalization

Mosaic should remain useful even when little or no personal behavioral data exists.

This is important for:

* new users;
* logged-out visitors;
* privacy;
* early platform growth.

Useful non-personalized discovery may rely on:

```text
Recent content
Categories
Search
Trending
Community activity
Editorial/platform selections
```

The exact combination will be determined later.

---

# Discovery Should Age Gracefully

Generative AI terminology, models, creative techniques, and media formats will change.

Discovery should therefore not depend entirely on a fixed vocabulary defined during Mosaic's initial development.

The system should support both:

```text
Controlled organization
        +
Emerging community vocabulary
```

Categories may provide stability.

Tags and Prompt content may provide flexibility.

Future semantic systems may provide deeper understanding.

---

# Important Product Decisions

| Decision                                                          | Status    |
| ----------------------------------------------------------------- | --------- |
| Discovery supports both intentional search and browsing           | ✅ Decided |
| Search should eventually cover multiple Mosaic entities           | ✅ Decided |
| Search relevance is not equivalent to popularity                  | ✅ Decided |
| Following provides a discovery mechanism                          | ✅ Decided |
| Trending represents time-sensitive activity                       | ✅ Decided |
| Engagement signals are considered potentially manipulable         | ✅ Decided |
| Creator Profiles are discovery surfaces                           | ✅ Decided |
| Lineage is a discovery mechanism                                  | ✅ Decided |
| Users can explore variations of a Creation                        | ✅ Decided |
| Users can navigate toward a Creation's Origin                     | ✅ Decided |
| Discovery should lead naturally toward customization and creation | ✅ Decided |
| Private organizational behavior is not automatically public       | ✅ Decided |
| Discovery should allow new and niche content to surface           | ✅ Decided |
| Follower count should not be the only path to visibility          | ✅ Decided |
| Public content can be discovered without authentication           | ✅ Decided |
| Discovery must work without advanced personalization              | ✅ Decided |
| Search should evolve with Mosaic's content model                  | ✅ Decided |
| Initial Home Feed ranking                                         | 🟡 Open   |
| Following feed ordering                                           | 🟡 Open   |
| Initial search filters                                            | 🟡 Open   |
| Category structure                                                | 🟡 Open   |
| Tag governance                                                    | 🟡 Open   |
| Direct vs total descendant metrics                                | 🟡 Open   |
| Advanced recommendations                                          | 🔮 Future |
| Semantic Prompt Search                                            | 🔮 Future |
| Dedicated model/provider pages                                    | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* personalized recommendations;
* semantic Prompt search;
* natural-language discovery;
* model pages;
* provider pages;
* Lineage recommendations;
* branch discovery;
* visual similarity discovery;
* emerging-topic detection;
* advanced filtering;
* creator recommendations;
* collaborative discovery;
* discovery explanations;
* advanced anti-manipulation ranking;
* exploration of creative trends over time.

These possibilities are not current implementation requirements.

They should be introduced according to actual user behavior and product needs.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Prompt System](./prompts.md)
* [Prompt Customization](./customization.md)
* [Remix & Lineage](./remix-lineage.md)
* [Social System](./social.md)
* [Collections & Saves](./collections.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Search](../03-technical/search.md)

---

**Previous:** [← Remix & Lineage](./remix-lineage.md) · [Documentation Home](../README.md) · **Next:** [Social System →](./social.md)
