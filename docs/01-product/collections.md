# Collections & Saves System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Collections & Saves System** defines how users preserve and organize Creations they want to revisit.

Discovery inside Mosaic may expose users to many useful Creations.

Some may be interesting because of:

* their Prompt;
* visual result;
* camera technique;
* model configuration;
* customization possibilities;
* Lineage;
* creative inspiration.

A user should not need to immediately Remix or interact publicly with a Creation simply to remember it.

Mosaic therefore provides two related concepts:

```text
SAVE
"I want to keep this."

COLLECTION
"I want to organize this."
```

They work together but represent different behaviors.

---

# Why This System Exists

Creative discovery often happens before creative action.

A typical experience may be:

```text
Discover Creation
        ↓
Interesting idea
        ↓
Save
        ↓
Return later
        ↓
Study / Customize / Remix
```

Without Saves, users would need to rely on:

* browser history;
* external bookmarks;
* copied links;
* memory.

Mosaic should provide a native way to preserve useful creative references.

---

# Save

A **Save** represents a relationship between a user and a Creation.

Conceptually:

```text
User
 ↓
Save
 ↓
Creation
```

It means:

> "I want to keep access to this Creation for later."

---

# Save Is Not a Like

✅ **Decided**

Like and Save represent different intentions.

```text
LIKE
"I appreciate this Creation."

SAVE
"I want to keep this Creation."
```

A user may:

```text
Like + Save
Like without Save
Save without Like
Neither
```

One action should not automatically create the other.

---

# Save Is Not a Collection

✅ **Decided**

Saving and organizing are separate concepts.

A user should be able to save something without first deciding where it belongs.

Conceptually:

```text
Creation
   ↓
Save
   ↓
Saved Content
```

Collections provide an additional organization layer:

```text
Saved Content
     ↓
Collections
```

This prevents Mosaic from forcing unnecessary organization during discovery.

---

# One Save Relationship Per User and Creation

✅ **Decided**

A user should not create duplicate Save relationships for the same Creation.

Conceptually:

```text
User A + Creation X
        ↓
0 or 1 active Save
```

Organization into multiple Collections is a separate concern.

---

# Removing a Save

Users may remove a Save.

```text
Saved
  ↓
Unsave
  ↓
Not Saved
```

This removes the Creation from the user's saved content.

However, its relationship with Collections requires careful handling.

If the Creation is still present in one or more Collections, Mosaic should avoid contradictory states.

Therefore:

🟡 **Open Decision**

We still need to define whether:

```text
Adding to Collection
automatically implies Save
```

and whether:

```text
Removing the global Save
also removes Collection membership
```

The final rule should produce a simple and understandable user experience.

---

# Saved Content

A user should have a place where saved Creations can be revisited.

Conceptually:

```text
Saved
│
├── Creation A
├── Creation B
├── Creation C
└── Creation D
```

The exact interface may later include:

* sorting;
* filtering;
* search;
* Collection navigation.

---

# Save Privacy

✅ **Decided — Principle**

Saving is primarily a personal organizational action.

A user's individual Saves should not automatically be publicly visible.

This means Mosaic should not assume:

```text
Carlos saved Creation A
```

is public social information.

---

# Save Counts

A Creation may internally accumulate information about how often it has been saved.

This could eventually help with:

* creator analytics;
* discovery;
* recommendation systems.

However:

🟡 **Open Decision**

Mosaic has not yet decided whether Save counts should be publicly visible.

The privacy of **who saved something** is separate from whether an aggregated Save count is public.

---

# Collections

A **Collection** is a user-created organizational grouping for Creations.

Example:

```text
Collection:
Cinematic Camera Ideas

├── Creation A
├── Creation D
├── Creation G
└── Creation K
```

Collections allow users to organize creative references according to their own needs.

---

# User-Defined Organization

Users may create Collections around concepts meaningful to them.

Examples:

```text
Camera References

Medieval Ideas

Prompts to Test

Character Animation

Veo Experiments

Favorites

Client Inspiration
```

Mosaic should not dictate what a Collection means.

---

# Collection Name

A Collection requires a human-readable name.

Example:

```text
"Camera Movements"
```

Exact naming limits will be defined later.

---

# Collection Description

🟡 **Open Decision**

Collections may optionally support descriptions.

Example:

```text
Camera Movements

"Interesting tracking, orbit and handheld
techniques I want to experiment with."
```

Descriptions could become particularly useful if Collections eventually become shareable or public.

They may not be necessary for the initial implementation.

---

# Collection Cover

🔮 **Future Possibility**

Collections may eventually support:

* automatically selected covers;
* creator-selected covers;
* preview grids;
* generated visual representations.

This is a presentation concern rather than a core organizational requirement.

---

# Multiple Collections

✅ **Decided**

The same Creation may belong to multiple Collections owned by the same user.

Example:

```text
Creation A
│
├── Camera References
├── Medieval Ideas
└── Prompts to Test
```

Mosaic should not require users to choose exactly one organizational category.

---

# Collection Membership Does Not Duplicate Content

✅ **Decided**

Adding a Creation to several Collections does not create several copies of that Creation.

Conceptually:

```text
Collection A ──┐
               ├──→ Creation X
Collection B ──┤
               │
Collection C ──┘
```

The Collections reference the same Creation.

---

# Removing From a Collection

Removing a Creation from one Collection should not remove it from other Collections.

Example:

```text
Creation A

Camera References  ← removed
Medieval Ideas     ← remains
Prompts to Test    ← remains
```

Each Collection membership is independent.

---

# Deleting a Collection

✅ **Decided**

Deleting a Collection should not delete the Creations inside it.

A Collection organizes content.

It does not own that content.

Conceptually:

```text
Delete Collection
       ↓
Collection disappears

Creations remain unchanged
```

This applies whether the Creations belong to the Collection owner or other creators.

---

# Collection Ownership

A Collection belongs to the user who created it.

That user controls its organization.

This does not grant ownership over the Creations inside it.

Example:

```text
Collection by Carlos
│
├── Creation by Ana
├── Creation by Maria
└── Creation by Lucas
```

Carlos owns the Collection structure.

Ana, Maria, and Lucas remain the authors of their respective Creations.

---

# Ordering Inside Collections

🟡 **Open Decision**

Possible Collection ordering models include:

```text
Manual order

Recently added

Creation date

Alphabetical

Custom sorting
```

Manual ordering may be useful for curated Collections but requires additional interaction and persistence logic.

The initial behavior will be determined during MVP planning.

---

# Default Saved Collection

One possible design is to treat all saved content as an automatic system Collection:

```text
Saved
├── A
├── B
└── C
```

with user-created Collections existing alongside it.

Another model is:

```text
Save relationship
        +
Independent Collections
```

🟡 **Open Decision**

The underlying product behavior should remain simple regardless of which representation is eventually chosen.

---

# Adding to a Collection

A possible interaction may be:

```text
Creation
   ↓
Save
   ↓
Choose Collection
```

or:

```text
Creation
   ↓
Add to Collection
   ↓
Automatically Saved
```

The exact UX remains open until the Save/Collection relationship is finalized.

---

# Creating a Collection During Save

Users may reasonably want to create a new Collection without leaving the current Creation.

Example:

```text
Save
 ↓
Choose Collection
 ↓
+ New Collection
```

✅ **Decided — Principle**

Collection organization should not unnecessarily interrupt discovery.

The exact interface remains a UX decision.

---

# Private Collections

Collections are initially best understood as personal organization.

✅ **Decided — Principle**

Mosaic should support private Collections.

A private Collection is visible only to its owner and authorized platform processes where necessary.

---

# Public Collections

Public Collections could turn organization into another form of discovery.

Example:

```text
"Best Cinematic Camera Prompts"
by @Ana
```

Other users could browse the Collection and discover its Creations.

🔮 **Future Possibility**

Public Collections are valuable but introduce additional requirements:

* Profile integration;
* moderation;
* sharing;
* search;
* privacy controls;
* attribution;
* deleted content handling;
* follower interactions.

They should not be assumed as an initial requirement.

---

# Unlisted Collections

🔮 **Future Possibility**

Mosaic may eventually support an intermediate visibility state:

```text
PRIVATE
Only owner

UNLISTED
Anyone with link

PUBLIC
Discoverable
```

This should only be introduced if real use cases justify the added complexity.

---

# Collaborative Collections

🔮 **Future Possibility**

Multiple users may eventually collaborate on a Collection.

Example:

```text
Project References

Editors:
@Ana
@Carlos
@Maria
```

This would introduce:

* roles;
* invitations;
* permissions;
* ownership transfer;
* concurrent changes;
* moderation.

It is not required for the initial system.

---

# Saving Own Creations

🟡 **Open Decision**

Mosaic must decide whether users may Save their own Creations.

There is little technical reason to forbid it, but the usefulness depends on how Saved Content and Collections are presented.

A creator may reasonably want to place their own Creation inside a personal reference Collection.

Therefore, this should be decided together with the final Collection experience rather than restricted prematurely.

---

# Collections and Lineage

Collections do not affect creative Lineage.

Example:

```text
Save Creation B
        ↓
Add B to Collection
```

does not change:

```text
A
↓
B
```

Collections describe user organization.

Lineage describes creative history.

---

# Collections and Remix

A Collection may become a useful starting point for future creative work:

```text
Collection
    ↓
Open Creation
    ↓
Customize
    ↓
Generate
    ↓
Publish Remix
```

The Remix relationship comes from the source Creation, not from the Collection containing it.

---

# Collections and Discovery

Collections can help users return to previously discovered content.

In the future, public Collections could themselves become discovery surfaces.

For the initial system:

```text
Discovery
   ↓
Save
   ↓
Personal Organization
   ↓
Rediscovery
```

is the primary role.

---

# Collections and Recommendations

Saved content may provide useful signals about a user's interests.

For example:

```text
User repeatedly saves:
Cinematic camera Creations

        ↓

Possible interest:
Cinematic camera techniques
```

However:

✅ **Decided — Principle**

Using private organizational behavior as a recommendation signal does not make that behavior public.

Internal personalization and public visibility are separate concerns.

---

# Save Does Not Notify the Creator by Default

🟡 **Open Decision**

Mosaic must decide whether creators should receive notifications when someone saves their Creation.

There is a meaningful difference between:

```text
Someone liked your Creation
```

and:

```text
Someone privately saved your Creation
```

Because Saves are primarily organizational and potentially private, exposing individual Save activity through notifications could undermine that expectation.

A likely model is:

```text
Individual Save
→ private

Aggregated Save analytics
→ potentially available to creator
```

but this remains to be finalized with Notifications and Privacy.

---

# Unavailable Creations

A saved Creation may later become unavailable.

Possible reasons include:

* creator deletion;
* moderation;
* legal removal;
* account-related changes.

Mosaic should not expose removed content simply because another user previously saved it.

Conceptually:

```text
Saved Creation
      ↓
Becomes unavailable
      ↓
Content no longer accessible
```

---

# Unavailable Content in Collections

🟡 **Open Decision**

Mosaic must decide whether unavailable Creations:

```text
A) disappear from Collections
```

or:

```text
B) leave a limited placeholder
```

Example:

```text
Camera References

├── Creation A
├── [Creation unavailable]
└── Creation C
```

A placeholder may help preserve a user's organizational context.

However, it must not expose information that should no longer be available.

---

# Deleted Users

If the author of a saved Creation deletes their account but the Creation remains under Mosaic's deletion rules, the Collection should follow the resulting Creation visibility.

Collections should not independently preserve personal identity that the platform has removed elsewhere.

---

# Blocking

Blocking may affect whether saved Creations from another user remain visible.

🟡 **Open Decision**

The exact behavior depends on Mosaic's future blocking visibility matrix.

Potential considerations include:

* safety;
* historical organization;
* Lineage;
* direct Profile access;
* recommendations.

This will be coordinated with Social and Moderation.

---

# Collection Limits

Mosaic should not arbitrarily define limits such as:

```text
Maximum 10 Collections

Maximum 100 Creations per Collection
```

without a product or technical reason.

🔮 Practical abuse or scalability limits may eventually be necessary.

Exact values belong to implementation planning and should be based on actual requirements.

---

# Duplicate Collection Names

🟡 **Open Decision**

Mosaic needs to determine whether one user may create:

```text
Ideas
Ideas
Ideas
```

as separate Collections.

Allowing duplicate names simplifies naming rules but may create confusing UX.

Preventing them introduces uniqueness requirements.

This can be decided during UX specification.

---

# Search Within Saved Content

🔮 **Future Possibility**

As personal libraries grow, users may need to search within:

* Saves;
* Collections;
* Collection names;
* saved Creation metadata.

This could become especially valuable for highly active creators.

---

# Collection Filters

🔮 **Future Possibility**

Users may eventually filter saved content by:

* model;
* category;
* creator;
* tag;
* date saved;
* media type;
* Lineage;
* generation provider.

These should evolve according to actual organizational needs.

---

# Save Timestamp

✅ **Decided — Principle**

Mosaic should conceptually know when a Save occurred.

This supports behaviors such as:

```text
Recently Saved
```

and future organization or analytics.

The exact technical representation belongs to the Data Model.

---

# Collection Membership Timestamp

A Collection membership may also benefit from knowing when a Creation was added.

This is useful for ordering and audit behavior.

✅ **Decided — Principle**

The relationship between a Collection and a Creation should be treated as meaningful data rather than only an anonymous list.

---

# Organizational Independence

Different organizational actions should remain independent from social and creative actions.

For example:

```text
Remove from Collection
```

should not automatically:

```text
Unlike Creation
Unfollow Creator
Delete Comment
Remove Remix
```

Similarly:

```text
Unlike Creation
```

should not automatically remove it from a Collection.

Each relationship has its own purpose.

---

# Privacy by Default

Because Collections can reveal detailed interests, research, client work, or creative plans:

✅ **Decided — Principle**

Mosaic should not assume that personal Collections are public.

Any future public Collection functionality should require an intentional visibility choice.

---

# Important Product Decisions

| Decision                                                                | Status    |
| ----------------------------------------------------------------------- | --------- |
| Save and Like represent different actions                               | ✅ Decided |
| Save and Collection are separate concepts                               | ✅ Decided |
| One user has at most one active Save per Creation                       | ✅ Decided |
| Individual Saves are private by default                                 | ✅ Decided |
| Users may create organizational Collections                             | ✅ Decided |
| A Creation may belong to multiple Collections                           | ✅ Decided |
| Collection membership does not duplicate a Creation                     | ✅ Decided |
| Removing from one Collection does not affect other Collections          | ✅ Decided |
| Deleting a Collection does not delete its Creations                     | ✅ Decided |
| Collection ownership does not grant Creation ownership                  | ✅ Decided |
| Private Collections are supported                                       | ✅ Decided |
| Collections do not affect Lineage                                       | ✅ Decided |
| Private organization may inform personalization without becoming public | ✅ Decided |
| Save relationships should preserve their creation time                  | ✅ Decided |
| Collection membership is its own meaningful relationship                | ✅ Decided |
| Collections are private by default                                      | ✅ Decided |
| Whether Collection membership automatically implies Save                | 🟡 Open   |
| Behavior when globally unsaving a collected Creation                    | 🟡 Open   |
| Public Save counts                                                      | 🟡 Open   |
| Collection descriptions                                                 | 🟡 Open   |
| Collection ordering                                                     | 🟡 Open   |
| Default Saved Collection representation                                 | 🟡 Open   |
| Saving own Creations                                                    | 🟡 Open   |
| Save notifications                                                      | 🟡 Open   |
| Unavailable Creation placeholders                                       | 🟡 Open   |
| Collections and blocked users                                           | 🟡 Open   |
| Duplicate Collection names                                              | 🟡 Open   |
| Public Collections                                                      | 🔮 Future |
| Unlisted Collections                                                    | 🔮 Future |
| Collaborative Collections                                               | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* public Collections;
* unlisted Collections;
* collaborative Collections;
* Collection covers;
* Collection descriptions;
* Collection search;
* advanced sorting;
* saved-content filtering;
* Collection sharing;
* Profile Collections;
* Collection recommendations;
* AI-assisted organization;
* automatic Collection suggestions;
* exportable creative libraries.

These possibilities should be introduced according to actual user needs rather than assumed during the initial implementation.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Prompt Customization](./customization.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Data Model](../03-technical/data-model.md)

---

**Previous:** [← Social System](./social.md) · [Documentation Home](../README.md) · **Next:** [Notifications →](./notifications.md)
