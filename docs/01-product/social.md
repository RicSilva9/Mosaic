# Social System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Social System** defines how people interact with creators, Creations, and each other inside Mosaic.

Mosaic is not only a repository of Prompts.

It is a community where people can:

* follow creators;
* like Creations;
* comment;
* reply to discussions;
* share Creations;
* explore Profiles;
* block unwanted interactions;
* move from social interaction into creative participation.

Social features should strengthen Mosaic's creative ecosystem without replacing its central purpose:

> **Discovering, understanding, adapting, and evolving creative work.**

---

# Social and Creative Relationships

Mosaic contains two important types of relationships.

```text
SOCIAL GRAPH

User ─────→ User
     follow


CREATIVE GRAPH

Creation ─────→ Creation
        derived from
```

These systems interact, but they represent different things.

A Follow means:

> "I want to keep up with this creator."

A Remix means:

> "This Creation was creatively derived from another Creation."

These relationships must not be treated as equivalent.

---

# Core Social Interactions

The initial social model revolves around:

```text
SOCIAL
│
├── Follow
├── Like
├── Comment
├── Reply
├── Share
├── Profile
└── Block
```

Saving content belongs primarily to the Collections & Saves system.

Remixing belongs to Remix & Lineage.

Reporting belongs to Moderation & Trust.

---

# Authentication

Public content may be viewed without an account.

Persistent social actions require an authenticated user.

Conceptually:

| Action               | Visitor      | Registered User |
| -------------------- | ------------ | --------------- |
| View public Creation | Yes          | Yes             |
| View public Profile  | Yes          | Yes             |
| Search               | Yes          | Yes             |
| Follow               | No           | Yes             |
| Like                 | No           | Yes             |
| Comment              | No           | Yes             |
| Reply                | No           | Yes             |
| Save                 | No           | Yes             |
| Remix / Publish      | No           | Yes             |
| Block                | No           | Yes             |
| Report               | 🟡 To define | Yes             |

Whether anonymous visitors may submit certain reports will be decided with Moderation & Trust.

---

# Following

Following is a directional relationship between users.

Example:

```text
Carlos follows Ana
```

means:

```text
Carlos ─────→ Ana
```

Ana does not automatically follow Carlos.

---

# Followers and Following

A Profile may expose:

```text
Followers
Following
```

Example:

```text
@ana

Followers: 1,240
Following: 183
```

These numbers describe social relationships.

They are not measures of creative quality.

---

# Follow and Discovery

Following should provide a meaningful way to discover new work from creators the user intentionally chose to follow.

```text
Follow @Ana
     ↓
Ana publishes Creation
     ↓
Creation becomes available
through Following discovery
```

The exact feed behavior is defined together with Discovery & Search.

---

# Follow Notifications

🟡 **Open Decision**

Mosaic still needs to decide whether creators receive notifications for every new follower.

At small scale:

```text
@Carlos started following you
```

may be useful.

At large scale, frequent follower notifications may become noise.

Notification grouping and preferences will be addressed in the Notifications System.

---

# Unfollowing

Users may unfollow another user at any time.

Unfollowing:

* does not delete previous interactions;
* does not remove likes;
* does not remove comments;
* does not affect Lineage;
* does not block the other user.

It only removes the active Follow relationship.

---

# Self-Following

✅ **Decided**

A user cannot follow themselves.

This relationship provides no meaningful social function and should be prevented.

---

# Likes

A Like represents a lightweight positive interaction with a Creation.

```text
User
 ↓
Like
 ↓
Creation
```

Likes belong to Creations rather than directly to Prompts.

This matters because a Creation represents the complete published artifact:

```text
Generated Media
+
Prompt
+
Creative Context
```

---

# One Active Like Per User

✅ **Decided**

A user may have at most one active Like on the same Creation.

Repeatedly pressing Like should not create additional Likes.

Conceptually:

```text
User A + Creation X
        ↓
0 or 1 active Like
```

---

# Removing a Like

A user may remove their Like.

This changes the current interaction state:

```text
Liked
 ↓
Unlike
 ↓
Not liked
```

The technical system may retain appropriate internal events for security or analytics where justified, but the public Like no longer exists.

---

# Self-Liking

🟡 **Open Decision**

Mosaic must decide whether creators may Like their own Creations.

Allowing it is simple and common in some platforms.

Preventing it may make engagement metrics slightly cleaner.

This is not important enough to decide before broader engagement rules are defined.

---

# Like Count

A Creation may display its current Like count.

Example:

```text
♥ 1,284
```

However:

✅ **Decided — Principle**

Like count is an engagement signal, not a platform judgment of quality.

Discovery systems should not automatically treat:

```text
more Likes = better Creation
```

as universally true.

---

# Comments

Comments allow discussion around a Creation.

Possible uses include:

* asking how the Prompt works;
* discussing generation behavior;
* giving feedback;
* asking about a model;
* suggesting an experiment;
* discussing the result.

Example:

```text
Creation

@Carlos
"Did you use the same camera settings
for the entire sequence?"
```

---

# Comments Belong to Creations

✅ **Decided**

Comments are associated with a specific Creation.

They should not be attached globally to the underlying Prompt concept.

If a derived Creation changes the Prompt or result, it receives its own discussion.

Example:

```text
Creation A
└── Comments about A

Creation B
└── Comments about B
```

---

# Replies

Users may reply to comments.

Conceptually:

```text
Comment
│
├── Reply
├── Reply
└── Reply
```

This allows conversations to form around creative work.

---

# Reply Depth

🟡 **Open Decision**

Mosaic needs to decide how deeply replies may be nested.

Unlimited visual nesting can become difficult to read:

```text
Comment
 └── Reply
      └── Reply
           └── Reply
                └── Reply
                     └── ...
```

Possible approaches include:

* one reply level;
* limited nesting;
* unlimited logical nesting with flattened visual presentation.

This should be decided during interaction and UX design.

---

# Comment Editing

Users should be able to correct their own comments.

✅ **Decided — Principle**

Comment editing should not allow one user to edit another user's content.

Mosaic may indicate that a comment has been edited.

Example:

```text
Interesting technique.

Edited
```

Exact edit-history behavior remains open.

---

# Comment Deletion

Users should be able to remove their own comments.

However, deletion becomes more complex when replies exist.

Example:

```text
Comment by Ana
│
├── Reply by Carlos
└── Reply by Maria
```

If Ana deletes the original comment, deleting the entire discussion would also remove other users' contributions.

Therefore:

✅ **Decided — Principle**

Deleting a parent comment should not automatically delete legitimate replies written by other users.

A placeholder may preserve the conversation structure:

```text
[Comment deleted]
│
├── Reply by Carlos
└── Reply by Maria
```

---

# Comment Moderation

Comments are user-generated content and fall under Mosaic's moderation rules.

A comment may be:

* reported;
* hidden;
* removed;
* restored after review.

Detailed rules belong to Moderation & Trust.

---

# Creator Control Over Comments

🟡 **Open Decision**

Mosaic must determine how much moderation control a Creation author has over comments on their own Creation.

Possible models include:

```text
A) Creator may freely delete comments

B) Creator may hide comments from their Creation

C) Creator can only report comments

D) Combination with clear distinction between
   creator moderation and platform moderation
```

This affects:

* freedom of discussion;
* creator safety;
* transparency;
* abuse prevention.

It should be decided deliberately rather than copied from another social platform.

---

# Comment Reactions

🔮 **Future Possibility**

Comments may eventually support Likes or other reactions.

They are not required for the core Social System.

---

# Mentions

🔮 **Future Possibility**

Users may eventually mention another user:

```text
@ana
```

Mentions could create notifications and help conversations.

Before implementation, Mosaic would need rules for:

* notification spam;
* blocked users;
* username changes;
* abuse;
* mention limits.

---

# Sharing

Users should be able to share public Creations.

At minimum, this means obtaining a stable link to the Creation.

Example:

```text
Creation
   ↓
Share
   ↓
Copy Link
```

---

# External Sharing

Public Mosaic links may be shared outside the platform.

Examples include:

* messaging applications;
* social networks;
* websites;
* communities.

The shared link should lead back to the relevant Creation when it remains available.

---

# Internal Reposting

🟡 **Open Decision**

Mosaic has not yet decided whether it needs a social repost feature similar to:

```text
User shares Creation A
to their followers
```

without creating a new Creation.

This must not be confused with Remix.

If implemented:

```text
REPOST
Social redistribution

REMIX
Creative derivation
```

They would remain separate concepts.

---

# Share Does Not Create Lineage

✅ **Decided**

Sharing a Creation does not create a new Creation and does not create a Lineage relationship.

```text
Share A
≠
Derive B from A
```

This distinction should remain clear throughout Mosaic.

---

# Profiles

Profiles are central social surfaces.

A public Profile may expose information such as:

```text
Avatar
Display Name
Username
Bio
External Links

Followers
Following

Published Creations
```

Additional sections may eventually include:

* Remixes;
* Lineages;
* Collections;
* activity;
* creator statistics.

Their visibility depends on future product and privacy decisions.

---

# Profile Creations

A user's Profile should provide access to their public Creations.

This creates a discovery path:

```text
Creation
   ↓
Author
   ↓
Profile
   ↓
More Creations
```

---

# Creator and User Are the Same Account Type

As established in User & Identity:

✅ **Decided**

Mosaic does not require a separate Creator account.

A user becomes a creator simply by publishing.

```text
User
 ↓
Publishes
 ↓
Creator
```

"Creator" describes behavior, not a different account class.

---

# Social Metrics

Possible public Profile metrics include:

```text
Followers
Following
Published Creations
```

Creation metrics may include:

```text
Likes
Comments
Remixes
Saves
Views
```

Not every metric necessarily needs to be public.

---

# Metric Visibility

🟡 **Open Decision**

Mosaic should later determine which engagement metrics are publicly visible.

Questions include:

* Should View counts be public?
* Should Save counts be public?
* Should total descendant counts be shown?
* Should creators have private analytics unavailable publicly?

These decisions affect user behavior and discovery incentives.

---

# Views

🟡 **Open Decision**

Mosaic has not yet defined what constitutes a View.

Possible definitions include:

```text
Appeared on screen

Visible for minimum duration

Creation opened

Media played

Media watched for a threshold
```

The definition matters because View metrics may later affect:

* analytics;
* recommendations;
* trending;
* creator statistics.

Therefore, Mosaic should not implement a vague `views++` counter without first defining what a View means.

---

# Blocking

Blocking is a safety and interaction-control mechanism between users.

Conceptually:

```text
Ana blocks Carlos
```

The block should prevent unwanted direct social interaction where appropriate.

---

# Blocking Does Not Rewrite History

As established in Remix & Lineage:

✅ **Decided**

Blocking does not remove historical creative relationships.

Example:

```text
Creation A — Ana
      ↓
Creation B — Carlos
```

If Ana blocks Carlos:

```text
A → B
```

remains historically true.

The Lineage cannot be rewritten by a social action.

---

# Blocking and Interaction

A block may affect:

* Following;
* future comments;
* replies;
* mentions;
* recommendations;
* Profile visibility;
* direct interaction.

🟡 **Open Decision**

The exact blocking visibility matrix will be defined later.

This requires coordination between:

* Social;
* Discovery;
* Lineage;
* Notifications;
* Moderation.

---

# Existing Follow After Block

🟡 **Open Decision**

If Ana blocks Carlos while Carlos follows Ana, Mosaic must define whether that Follow relationship is automatically removed.

The likely behavior is removal, but this should be formally decided when the complete blocking model is specified.

---

# Blocking and Existing Comments

Blocking should not necessarily erase historical discussion.

Example:

```text
Carlos commented on Ana's Creation
        ↓
Ana later blocks Carlos
```

Automatically deleting historical comments could unexpectedly alter public conversations.

The final visibility behavior remains part of the blocking rules.

---

# Social Actions and Notifications

Social interactions may generate notifications.

Examples:

```text
@Carlos liked your Creation.

@Maria commented on your Creation.

@Lucas replied to your comment.

@Ana started following you.
```

Notification generation, grouping, preferences, and delivery belong to the Notifications System.

---

# Social Actions and Discovery

Social activity may contribute signals to Discovery.

Examples:

```text
Likes
Comments
Follows
Shares
Saves
```

However:

✅ **Decided — Principle**

Social engagement should be treated as input signals, not automatic proof of quality or relevance.

---

# Social Spam

Social systems create opportunities for abuse.

Examples include:

* Like farming;
* Follow spam;
* repetitive comments;
* promotional spam;
* mass following/unfollowing;
* automated interaction;
* coordinated manipulation.

Mosaic should assume these behaviors will eventually occur.

Detailed detection and enforcement belong to Moderation and Security.

---

# Rate Limits

🔮 **Technical Requirement to Define Later**

Certain social actions may require rate limits.

Examples:

```text
Follow
Like
Comment
Reply
Report
```

Exact limits should not be selected arbitrarily during product documentation.

They will depend on real usage patterns and security requirements.

---

# Account State Effects

Account state may affect social interactions.

For example:

```text
ACTIVE
→ normal interaction

SUSPENDED
→ restricted interaction

BANNED
→ no normal interaction

DELETED
→ historical content handled according to deletion rules
```

Exact behavior will be formalized in Business Rules.

---

# Deleted Users

If a user is deleted while their historical comments or Creations remain where permitted, Mosaic may display a neutral identity placeholder.

Example:

```text
Deleted User
```

The system should avoid unnecessarily exposing personal information after account deletion.

---

# Social Actions Are Independent

Different social interactions should not be unnecessarily coupled.

For example:

```text
Unfollow
```

should not automatically mean:

```text
Unlike everything
Delete comments
Remove saves
Destroy Lineage
```

Each relationship has its own meaning and lifecycle.

---

# Social Graph Independence

The Social Graph should remain conceptually separate from the Creative Lineage Graph.

Example:

```text
SOCIAL

Ana ─────→ Carlos
     follows


CREATIVE

Creation X ─────→ Creation Y
           parent
```

Ana may Remix Carlos without following him.

Carlos may follow Ana without ever Remixing her work.

Neither relationship requires the other.

---

# Privacy

Social relationships can reveal information about user behavior.

Mosaic should avoid assuming that every behavioral signal needs to become public.

Examples requiring later privacy decisions include:

* saved content;
* browsing history;
* search history;
* viewed Creations;
* recommendation profile.

Public social features and private behavioral data should remain conceptually distinct.

---

# Accessibility

Social interactions should remain understandable without relying exclusively on visual symbols.

For example, Like, Follow, Share, and Comment controls should have accessible names and states.

Detailed accessibility requirements will be formalized in Non-Functional Requirements.

---

# Important Product Decisions

| Decision                                                                       | Status    |
| ------------------------------------------------------------------------------ | --------- |
| Social Graph and Creative Lineage are separate systems                         | ✅ Decided |
| Persistent social actions require authentication                               | ✅ Decided |
| Following is directional                                                       | ✅ Decided |
| Users cannot follow themselves                                                 | ✅ Decided |
| Likes belong to Creations                                                      | ✅ Decided |
| One user may have at most one active Like per Creation                         | ✅ Decided |
| Comments belong to specific Creations                                          | ✅ Decided |
| Users may reply to comments                                                    | ✅ Decided |
| Users may edit their own comments                                              | ✅ Decided |
| Deleting a parent comment should not automatically delete other users' replies | ✅ Decided |
| Public Creations can be externally shared                                      | ✅ Decided |
| Sharing does not create Lineage                                                | ✅ Decided |
| Creator is a behavior, not a separate account type                             | ✅ Decided |
| Blocking does not rewrite historical Lineage                                   | ✅ Decided |
| Social engagement is not automatic proof of quality                            | ✅ Decided |
| Social interactions should remain independently modeled                        | ✅ Decided |
| Self-Likes                                                                     | 🟡 Open   |
| Comment reply depth                                                            | 🟡 Open   |
| Creator control over comments                                                  | 🟡 Open   |
| Internal reposting                                                             | 🟡 Open   |
| Public metric visibility                                                       | 🟡 Open   |
| Definition of a View                                                           | 🟡 Open   |
| Exact blocking behavior                                                        | 🟡 Open   |
| Follow removal after blocking                                                  | 🟡 Open   |
| Anonymous reporting                                                            | 🟡 Open   |
| Comment reactions                                                              | 🔮 Future |
| Mentions                                                                       | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* comment reactions;
* mentions;
* internal reposting;
* creator analytics;
* collaborative discussions;
* richer Profile activity;
* social recommendations;
* creator discovery;
* grouped interactions;
* advanced anti-spam systems;
* optional public collections;
* additional community interaction tools.

These possibilities should be introduced when they meaningfully improve the creative community rather than simply copying features from existing social networks.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Collections & Saves](./collections.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Security & Privacy](../03-technical/security.md)

---

**Previous:** [← Discovery & Search](./discovery.md) · [Documentation Home](../README.md) · **Next:** [Collections & Saves →](./collections.md)
