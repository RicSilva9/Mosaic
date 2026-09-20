# User & Identity System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **User & Identity System** defines how people exist and identify themselves within Mosaic.

It covers the lifecycle of a user from account creation to profile management, authentication, security, social identity, account states, blocking, deactivation, and deletion.

Mosaic separates three related concepts:

```text
USER
Internal identity
│
├── ACCOUNT
│   Authentication
│   Email
│   Password
│   Sessions
│   Security
│
└── PROFILE
    Username
    Display name
    Avatar
    Bio
    Social identity
```

To most people using Mosaic, these concepts appear as a single account.

Internally, separating them allows Mosaic to distinguish between:

* **who the person is inside the system;**
* **how the person authenticates;**
* **how the person presents themselves publicly.**

The exact technical representation of these concepts will be defined later in the Data Model.

---

# Why This System Exists

Mosaic is a community-driven platform.

Creations, Remixes, comments, follows, collections, moderation decisions, and other interactions need to belong to identifiable users.

The identity system therefore provides the foundation for nearly every social feature of the platform.

It should allow Mosaic to answer questions such as:

> Who created this?

> Who remixed this Creation?

> Who am I following?

> Who owns this Collection?

> Who wrote this comment?

> Who reported this content?

> What happens to someone's Creations if their account is deleted?

The system must provide identity without creating unnecessary barriers to participation.

---

# User Model

## One account, multiple behaviors

✅ **Decided**

Mosaic will not initially separate regular users and creators into different account types.

Every registered user may:

* explore content;
* save Creations;
* follow users;
* interact with the community;
* publish Creations;
* create Remixes;
* maintain a public Profile.

A user may join Mosaic only to explore content and later become an active creator without changing account type.

```text
Registered User
      │
      ├── Discover
      ├── Save
      ├── Follow
      ├── Interact
      ├── Publish
      └── Remix
```

Professional tools or advanced creator capabilities may exist in the future without changing this principle.

---

# Account Creation

Users must create an account to participate in Mosaic's persistent or social features.

Examples include:

* publishing;
* remixing;
* commenting;
* liking;
* following;
* saving Creations;
* creating Collections;
* receiving notifications;
* reporting content.

Browsing public content should not necessarily require an account.

---

## Registration Information

The initial registration process should require only the information necessary to create and secure an account.

The initial model should support:

* email address;
* password;
* username.

Additional profile information should be optional and configurable after registration.

Mosaic should avoid forcing users to complete an extensive profile before they can explore the platform.

---

## Email

✅ **Decided**

Each active account must be associated with an email address.

An email address should not be publicly visible by default.

It may be used for:

* authentication;
* account recovery;
* security notifications;
* account verification;
* important platform communication.

A single email address should not normally represent multiple active Mosaic accounts.

---

## Email Verification

✅ **Decided — Principle**

Mosaic should support email verification.

Certain sensitive or abuse-prone actions may require a verified email address.

The exact actions requiring verification will be defined during security and abuse-prevention planning.

---

## Username

A **username** is the unique public identifier of a Profile.

Example:

```text
@maria
@joao.ai
@visualdreams
```

### Username Rules

✅ **Decided — Principle**

Usernames must:

* be unique;
* be case-insensitive for uniqueness;
* have defined minimum and maximum lengths;
* use a controlled set of supported characters;
* reject reserved system names;
* reject invalid or abusive formats.

The exact length and character restrictions will be defined later.

We should not choose arbitrary limits before evaluating UX, database, URL, and internationalization requirements.

---

## Username Changes

🟡 **Open Decision**

Users will likely be allowed to change their username.

However, we still need to define:

* how frequently it may be changed;
* whether previous usernames are temporarily reserved;
* what happens to old profile links;
* how impersonation attempts are prevented;
* whether username history should be retained internally.

These decisions will be revisited when defining detailed business and security rules.

---

# Authentication

Mosaic needs a secure mechanism for users to prove ownership of their accounts.

## Initial Authentication

The baseline authentication method should support:

**Email + Password**

This provides a simple and provider-independent authentication foundation.

---

## Social Authentication

🔮 **Future Possibility**

Mosaic may eventually support authentication providers such as:

* Google;
* Apple;
* GitHub;
* other relevant identity providers.

The exact providers should be selected based on user needs rather than implemented simply because they are available.

---

## Password Security

✅ **Decided — Principle**

Mosaic must never store plaintext passwords.

Password storage, hashing, password policies, reset tokens, rate limiting, and related security mechanisms will be specified in:

[Security & Privacy](../03-technical/security.md)

---

## Password Recovery

Users must have a secure mechanism for recovering access when they forget their password.

The typical flow should be:

```text
Request password reset
        ↓
Verify account ownership
        ↓
Receive temporary recovery mechanism
        ↓
Set new password
        ↓
Invalidate recovery mechanism
```

Sensitive implementation details will be defined in the security specification.

---

# Profile

The **Profile** represents how a user presents themselves to the Mosaic community.

A Profile should support:

* username;
* display name;
* avatar;
* biography;
* optional external links;
* follower count;
* following count;
* published Creations.

Additional information may be introduced later when justified by actual product needs.

---

## Display Name

Unlike the username, a display name does not need to be unique.

Example:

```text
Username:
@lucasvisual

Display name:
Lucas Almeida
```

Users should be able to change their display name without changing their unique Mosaic identity.

---

## Avatar

Users should be able to upload an image representing their Profile.

The platform should:

* validate uploaded files;
* enforce appropriate size and format restrictions;
* provide a default representation when no avatar exists;
* apply moderation rules to profile images.

Exact technical limits will be defined later.

---

## Biography

Users should be able to provide a short biography describing themselves or their creative work.

Biography content must follow Mosaic's community and moderation rules.

Exact character limits should be defined after the interface requirements are better understood.

---

## External Links

🟡 **Open Decision**

Profiles may support links to external websites or social platforms.

Before confirming the feature, Mosaic should consider:

* spam;
* malicious links;
* phishing;
* moderation;
* link limits;
* supported protocols.

The feature is useful for creators but introduces trust and security concerns that should be addressed before implementation.

---

# Public Profile

A user's Profile acts as their public identity within Mosaic.

A public Profile may display:

```text
Avatar

Display Name
@username

Biography

Followers · Following

[Follow]

Creations
Remixes
Collections (when public)
```

The final layout is a design decision and is intentionally not specified here.

This document defines the information and behavior, not the final visual interface.

---

# Following

Users may follow other users whose work they want to discover more easily.

Following creates a directional relationship:

```text
Ana ───── follows ─────▶ Carlos
```

Carlos does not automatically follow Ana.

This means:

```text
Followers ≠ Following
```

Following behavior will integrate with:

* Profiles;
* notifications;
* discovery;
* feeds;
* creator relationships.

Detailed feed behavior will be defined in [Discovery & Search](./discovery.md).

---

# Account Privacy

Mosaic is designed around public creative discovery.

Because of this, the initial product model should prioritize **public Profiles and public Creations**.

### Public by default

✅ **Decided — Principle**

The core Mosaic experience is based on discovering and transforming community creations.

Public content should therefore be the default model.

---

## Private Accounts

🟡 **Open Decision**

Fully private Profiles would significantly affect:

* discovery;
* Remix permissions;
* lineage;
* followers;
* sharing;
* search;
* moderation.

For this reason, private accounts should not be assumed as a requirement until their impact on Mosaic's core philosophy is evaluated.

Individual privacy controls may eventually provide a better solution than completely private accounts.

---

# Blocking

Users must be able to block other users.

Blocking exists primarily as a personal safety and interaction control.

A blocked relationship should prevent or restrict direct interaction between the involved users.

Potential effects include:

* preventing follows;
* restricting comments or replies;
* hiding certain interactions;
* preventing direct notifications caused by the blocked user;
* limiting profile interaction.

However, Mosaic contains public Creations and lineage relationships.

Therefore, blocking must **not destroy historical attribution or creative lineage**.

For example:

```text
Ana publishes Creation A
        ↓
Carlos creates Remix B
        ↓
Ana blocks Carlos
```

Remix B should not lose its historical relationship with Creation A merely because the users later blocked each other.

The exact visibility behavior will be defined with the Social, Remix, and Moderation systems.

---

# Account States

Mosaic should distinguish between different account states instead of representing every unavailable account as simply "deleted."

A conceptual state model may include:

```text
ACTIVE
│
├── DEACTIVATED
├── SUSPENDED
├── BANNED
└── DELETED
```

The final technical state machine will be defined later.

---

## Active

The account operates normally according to its permissions.

---

## Deactivated

A user may temporarily deactivate their account without immediately requesting permanent deletion.

🟡 **Open Decision**

We still need to define:

* what becomes publicly visible;
* whether Creations remain visible;
* how reactivation works;
* how long deactivation may last.

---

## Suspended

A suspended account has temporarily lost some or all platform capabilities because of a moderation or security action.

Suspension may have a defined duration or require another condition to be resolved.

Detailed behavior belongs to [Moderation & Trust](./moderation.md).

---

## Banned

A banned account has been restricted from using Mosaic as the result of a serious or repeated platform violation.

Ban rules, appeals, enforcement, and evasion prevention will be specified in the moderation and security documentation.

---

## Deleted

Deletion represents a permanent account lifecycle action.

However, deleting a social account is more complicated than deleting a database row.

A user may have created:

```text
User
├── Creations
├── Remixes
├── Comments
├── Likes
├── Collections
├── Followers
└── Lineage relationships
```

Removing all of these blindly could damage conversations and the creative history of other users.

For example:

```text
Creation A — User A
     ↓
Creation B — User B
     ↓
Creation C — User C
```

If User B deletes their account, Mosaic should not automatically destroy the relationship between A and C.

---

# Account Deletion and Content

✅ **Decided — Principle**

Account deletion should not automatically destroy community history or the lineage of other users' Creations.

Mosaic must separate:

**deleting personal identity**

from

**destroying shared creative history.**

A deleted user's identity may eventually appear in historical contexts using a neutral representation such as:

```text
Deleted User
```

while necessary lineage information remains intact.

Exactly which user-generated content remains, becomes anonymized, or is removed must be determined later considering:

* privacy;
* applicable data protection requirements;
* community integrity;
* authorship;
* moderation;
* technical dependencies.

This requires dedicated analysis before implementation.

---

# Sessions

Users may access Mosaic from multiple devices.

The account system should eventually support secure session management.

Potential capabilities include:

* viewing active sessions;
* signing out from the current device;
* signing out from all devices;
* revoking suspicious sessions;
* session expiration;
* security notifications.

Exact implementation belongs to the security specification.

---

# Roles and Permissions

Not every Mosaic account should have the same administrative authority.

At minimum, the system conceptually distinguishes:

```text
USER
Regular platform participant

MODERATOR
Handles appropriate moderation responsibilities

ADMINISTRATOR
Handles platform administration
```

These are **permission roles**, not different social account types.

A moderator may still have a normal Mosaic Profile while possessing additional internal permissions.

The exact authorization model will be defined later.

---

# Verification

🟡 **Open Decision**

Mosaic may eventually introduce public verification for notable creators, organizations, official profiles, or identities at risk of impersonation.

However, verification should not automatically represent:

* quality;
* authority;
* popularity;
* endorsement by Mosaic.

Because verification systems strongly affect community perception, the feature should only be introduced with a clearly defined purpose.

---

# Impersonation

Mosaic should prohibit deceptive impersonation.

Users may have similar display names, but intentionally presenting an account as another person or organization should be subject to moderation.

Username uniqueness helps reduce ambiguity but does not solve impersonation by itself.

Detailed enforcement belongs to Moderation & Trust.

---

# User Safety

The identity system should provide users with mechanisms to control unwanted interactions.

This includes concepts such as:

* blocking;
* reporting;
* notification controls;
* account security;
* moderation;
* session management.

Future safety features should be introduced according to demonstrated user needs and platform risks.

---

# Important Product Decisions

The following decisions are currently established:

| Decision                                                               | Status    |
| ---------------------------------------------------------------------- | --------- |
| Every regular user may become a creator                                | ✅ Decided |
| No separate creator account is required                                | ✅ Decided |
| Public browsing should be possible without authentication              | ✅ Decided |
| Persistent/social actions require authentication                       | ✅ Decided |
| Accounts use unique usernames                                          | ✅ Decided |
| Email addresses are private by default                                 | ✅ Decided |
| Email verification is supported                                        | ✅ Decided |
| Profiles are public by default                                         | ✅ Decided |
| Users can follow other users                                           | ✅ Decided |
| Users can block other users                                            | ✅ Decided |
| Blocking does not destroy creative lineage                             | ✅ Decided |
| Account deletion must preserve necessary community relationships       | ✅ Decided |
| Moderator/Admin are permission roles rather than creator account types | ✅ Decided |
| Username change policy                                                 | 🟡 Open   |
| External profile links                                                 | 🟡 Open   |
| Private accounts                                                       | 🟡 Open   |
| Detailed deactivation behavior                                         | 🟡 Open   |
| Public profile verification                                            | 🟡 Open   |

---

# Future Possibilities

🔮 The following concepts may be evaluated later and are **not current requirements**:

* social login providers;
* creator verification;
* organization Profiles;
* professional creator tools;
* advanced account security;
* multi-factor authentication;
* creator analytics attached to Profiles;
* profile customization;
* additional privacy controls.

Each feature should be justified by an actual product or security need before entering the implementation scope.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [Publications](./publications.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Notifications](./notifications.md)
* [Moderation & Trust](./moderation.md)
* [Security & Privacy](../03-technical/security.md)
* [Data Model](../03-technical/data-model.md)

---

**Previous:** [← Product Vision](./product-vision.md) · [Documentation Home](../README.md) · **Next:** [Publications →](./publications.md)
