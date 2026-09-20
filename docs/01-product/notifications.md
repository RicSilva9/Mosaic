# Notifications System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Notifications System** defines how Mosaic informs users about relevant activity involving their account, Creations, conversations, creative Lineage, and platform status.

Notifications exist to answer a simple question:

> **What happened in Mosaic that may require my attention?**

Examples include:

```text
Someone followed you.

Someone commented on your Creation.

Someone replied to your comment.

Someone created a Remix from your Creation.

Mosaic reviewed one of your reports.
```

Notifications should help users remain connected to the platform without turning every event into noise.

---

# Why This System Exists

Mosaic contains many independent systems:

```text
Users
Creations
Social
Lineage
Comments
Moderation
Collections
Discovery
```

Activity in one system may matter to another user.

Without notifications, users would need to manually revisit:

* every Creation;
* every comment;
* every Lineage;
* every report;
* every Profile.

Notifications provide a controlled communication layer between platform activity and users.

---

# Notification Principle

✅ **Decided**

Not every event deserves a notification.

Mosaic should distinguish:

```text
Something happened
```

from:

```text
Something happened that is relevant enough
to interrupt or inform this user.
```

This distinction is fundamental to avoiding notification fatigue.

---

# Events and Notifications

A platform event may generate zero, one, or multiple notifications.

Conceptually:

```text
Event
  ↓
Notification Rules
  ↓
Relevant Recipient?
  ↓
Notification
```

Example:

```text
Carlos publishes Creation B
derived from Ana's Creation A
          ↓
Mosaic identifies Ana
as the direct parent creator
          ↓
Ana receives a Remix notification
```

---

# Notifications Are Consequences

✅ **Decided — Principle**

Notifications should not be required for the underlying action to succeed.

Example:

```text
Carlos publishes Remix B
        ↓
Creation B exists
        ↓
Lineage exists
        ↓
Notification is generated
```

If notification delivery fails:

```text
Creation B still exists.
Lineage still exists.
```

The notification is a consequence of the event, not the event itself.

This principle will later influence Mosaic's technical architecture.

---

# Notification Recipient

Every notification must have a recipient.

Conceptually:

```text
Notification
│
├── Recipient
├── Type
├── Event Context
├── Created At
├── Read State
└── Destination
```

This is a conceptual product model rather than a final database structure.

---

# Notification Actor

Many notifications involve another user who caused the event.

Example:

```text
@Carlos liked your Creation.
```

Here:

```text
Actor = Carlos
Recipient = Ana
```

Not every notification requires a human actor.

Example:

```text
Your report has been reviewed.
```

may originate from Mosaic itself.

---

# Notification Context

A notification should retain enough context to explain what happened.

Examples:

```text
User
Creation
Comment
Lineage
Report
Moderation Decision
```

A notification should not become an isolated message with no meaningful destination.

---

# Notification Destination

Where appropriate, selecting a notification should take the user to the relevant context.

Example:

```text
"@Carlos commented on your Creation."
                ↓
Open relevant Creation/comment
```

or:

```text
"@Maria created a Remix of your Creation."
                ↓
Open derived Creation
```

---

# Initial Notification Categories

Mosaic notifications can conceptually be grouped into:

```text
NOTIFICATIONS
│
├── Social
├── Discussion
├── Creative
├── Moderation
├── Account & Security
└── Platform
```

These categories describe meaning rather than final interface tabs.

---

# Social Notifications

Social activity may include:

```text
New follower
Like
```

Possible examples:

```text
@Carlos started following you.

@Maria liked your Creation.
```

Whether every event generates an individual notification depends on grouping and user preferences.

---

# Follow Notifications

🟡 **Open Decision**

Mosaic has not yet finalized whether every Follow should generate a notification.

For a small account:

```text
@Carlos started following you.
```

may be useful.

For an account receiving thousands of followers, individual notifications may become excessive.

Possible future behavior:

```text
@Carlos and 24 others started following you.
```

Grouping may solve this without removing the underlying notification category.

---

# Like Notifications

Likes may generate notifications.

However, high-volume Creations may receive many Likes in a short period.

Instead of:

```text
@A liked your Creation.
@B liked your Creation.
@C liked your Creation.
@D liked your Creation.
@E liked your Creation.
```

Mosaic may eventually present:

```text
@A, @B and 18 others liked your Creation.
```

✅ **Decided — Principle**

High-frequency, low-urgency events should be eligible for grouping.

---

# Unlike

✅ **Decided — Principle**

Removing a Like should not generate a notification such as:

```text
@Carlos unliked your Creation.
```

This would create unnecessary negative or noisy social feedback.

An existing Like notification does not necessarily need to disappear simply because the user later removed the Like.

Exact historical notification behavior will be specified later.

---

# Save Notifications

As established in Collections & Saves:

🟡 **Open Decision**

Individual Saves are private by default.

Therefore, Mosaic should be cautious about notifications such as:

```text
@Carlos saved your Creation.
```

because that would expose private organizational behavior.

A more privacy-preserving model could provide creators with aggregated analytics rather than individual Save notifications.

The final decision will be coordinated with Collections, Privacy, and Analytics.

---

# Comment Notifications

When someone comments on a user's Creation, the creator may receive a notification.

Example:

```text
@Carlos commented on your Creation.
```

The notification should lead to the relevant discussion context.

---

# Reply Notifications

When someone replies to a user's comment:

```text
@Maria replied to your comment.
```

the original commenter may receive a notification.

This helps conversations continue without requiring users to repeatedly revisit the Creation.

---

# Comment Thread Notifications

🟡 **Open Decision**

Mosaic still needs to determine whether users can subscribe to an entire comment thread.

For example:

```text
Ana comments
Carlos replies
Maria replies to Carlos
Lucas adds another reply
```

Should Ana receive every future message?

Possible approaches include:

* only direct replies;
* thread subscriptions;
* automatic participation subscriptions;
* configurable behavior.

This should be designed to prevent excessive notifications.

---

# Deleted Comments

If a comment is deleted before the recipient opens its notification, Mosaic should avoid sending the user to broken or misleading content.

Possible behavior:

```text
Notification remains
→ destination indicates content unavailable
```

or:

```text
Notification becomes unavailable/removed
```

🟡 **Open Decision**

The exact lifecycle should be defined together with comment deletion behavior.

---

# Remix Notifications

Remix notifications are especially important to Mosaic because they represent creative evolution.

Example:

```text
Creation A — @Ana
       ↓
Creation B — @Carlos
```

Ana may receive:

```text
@Carlos created a variation of your Creation.
```

---

# Direct Parent Notification

✅ **Decided**

When a new derived Creation is published, the creator of the **direct parent Creation** should be the primary notification recipient.

Example:

```text
A — Ana
↓
B — Carlos
↓
C — Maria
```

When C is published:

```text
Carlos → notified
Ana    → not individually notified by default
```

because C was directly derived from B.

This prevents deep Lineages from generating notification cascades.

---

# Ancestor Notifications

🔮 **Future Possibility**

Mosaic may eventually provide:

```text
"Your Creation's Lineage reached 100 variations."

"A new branch is gaining activity."

"Your original idea has generated 500 descendants."
```

These would be milestone or summary notifications rather than individual notifications for every descendant.

---

# Self-Derivation

If Ana publishes a new Creation derived from her own previous Creation:

```text
A — Ana
↓
B — Ana
```

Mosaic should not notify Ana that she created a variation of her own Creation.

✅ **Decided — Principle**

Users should not receive redundant notifications for actions they intentionally performed themselves unless the notification provides additional value.

---

# Self-Interactions

The same principle applies broadly.

Examples:

```text
Like own Creation
Comment on own Creation
Publish own derived Creation
```

Mosaic should avoid notifications equivalent to:

```text
"You performed an action you just performed."
```

unless another user interaction or system consequence makes the notification useful.

---

# Lineage Activity

Beyond direct Remix creation, future notifications may summarize Lineage activity.

Examples:

```text
Your Creation received 10 new variations this week.

A branch from your Creation is trending.
```

🔮 These are future possibilities rather than initial requirements.

---

# Moderation Notifications

Moderation can produce important notifications.

Examples include:

```text
Your report was reviewed.

Your Creation was removed.

Your comment was removed.

Your appeal was accepted.

Your Creation was restored.

Your account received a restriction.
```

These notifications may require more detail than ordinary social notifications.

---

# Moderation Notifications Are High Importance

✅ **Decided — Principle**

Notifications affecting:

* content removal;
* account restrictions;
* appeals;
* enforcement decisions;

should not be treated the same way as casual Likes.

Users should have clear access to:

* what happened;
* what content was affected;
* relevant rule or reason where appropriate;
* available next steps;
* appeal options where applicable.

Detailed behavior belongs to Moderation & Trust.

---

# Report Status Notifications

A user who submits a report may need to know when meaningful action occurs.

Possible states include:

```text
Report received
Report reviewed
Action taken
No violation found
Appeal/review completed
```

🟡 **Open Decision**

Mosaic should determine which stages deserve user-facing notifications.

Too many status updates could create noise, while too little information may make reporting feel ineffective.

---

# Reported User Notifications

The user whose content is reported should not necessarily be notified merely because someone submitted a report.

Example:

```text
"Someone reported your Creation."
```

could encourage retaliation or unnecessary conflict.

✅ **Decided — Principle**

A report itself should not automatically notify the reported user.

Notification should normally occur when Mosaic takes an action or requires the user's attention.

---

# Appeal Notifications

If a user appeals a moderation decision, important changes should generate notifications.

Example:

```text
Your appeal was reviewed.

Your Creation has been restored.
```

or:

```text
Your appeal was reviewed.

The moderation decision remains in effect.
```

Exact wording and information requirements belong to Moderation & Trust.

---

# Account & Security Notifications

Some notifications exist for security rather than community activity.

Potential examples include:

```text
Password changed

Email changed

New login

Account recovery activity

Security-sensitive setting changed
```

Some of these may need delivery outside Mosaic itself, such as email.

Detailed security requirements will be defined in Security & Privacy.

---

# Security Notifications Cannot Be Silenced Casually

✅ **Decided — Principle**

Users may eventually disable many social notification categories.

Security-critical communication should not necessarily follow those preferences.

For example:

```text
Social Likes
→ user may disable

Critical account security event
→ may still require notification
```

The exact mandatory communication set will be defined with Security.

---

# Platform Notifications

Mosaic may occasionally need to communicate platform-level information.

Examples might include:

* important policy changes;
* major feature changes;
* service-related information.

However:

✅ **Decided — Principle**

Platform notifications should not become an advertising channel disguised as important communication.

Different communication purposes should remain clearly distinguished.

---

# In-App Notifications

Mosaic should support an internal notification experience.

Conceptually:

```text
Notifications
│
├── New
├── Read
└── Older activity
```

This provides a persistent place where users can review relevant activity.

---

# Read State

A notification should conceptually have a read state:

```text
UNREAD
READ
```

This allows Mosaic to indicate new activity.

---

# Unread Count

The interface may display an unread notification count.

Example:

```text
Notifications (7)
```

The exact visual representation is a UX decision.

---

# Mark as Read

Users should be able to mark notifications as read through normal interaction.

Potential behaviors include:

```text
Open notification
→ mark read
```

and possibly:

```text
Mark all as read
```

✅ **Decided — Principle**

Read state changes notification attention status.

It does not delete the underlying platform event.

---

# Notification History

🟡 **Open Decision**

Mosaic needs to determine how long in-app notifications remain available.

Possible strategies include:

* fixed retention period;
* larger historical archive;
* pagination until system retention expires.

The decision should consider:

* user usefulness;
* storage;
* privacy;
* security;
* moderation requirements.

---

# Notification Deletion

🟡 **Open Decision**

Users may eventually be allowed to dismiss or delete notifications from their personal notification interface.

Doing so should not delete:

* Comments;
* Likes;
* Follows;
* Creations;
* Lineage;
* moderation records.

A notification is a representation of an event, not ownership of the event itself.

---

# Notification Grouping

Grouping reduces noise when many similar events occur.

Example:

```text
Before:

@Ana liked your Creation.
@Carlos liked your Creation.
@Maria liked your Creation.

After:

@Ana, @Carlos and 12 others liked your Creation.
```

Grouping may consider:

```text
Notification type
Target Creation
Time window
Recipient
```

Exact grouping rules belong to later specification and implementation.

---

# Grouping Must Preserve Meaning

✅ **Decided — Principle**

Notifications should only be grouped when doing so does not hide materially different events.

For example:

```text
20 Likes on Creation A
```

may reasonably be grouped.

But:

```text
Creation removed by moderation
+
Account security alert
```

must not be grouped simply because they occurred near each other.

---

# Notification Priority

Different notifications have different importance.

Conceptually:

```text
LOW
Social engagement

NORMAL
Discussion / Remix

HIGH
Moderation / account action

CRITICAL
Security-sensitive events
```

🟡 **Open Decision**

The exact priority model is not finalized.

Priority may later affect:

* grouping;
* delivery channel;
* presentation;
* persistence.

---

# Notification Preferences

Users should eventually be able to control non-critical notification categories.

Possible preferences include:

```text
Likes
Followers
Comments
Replies
Remixes
Lineage summaries
Platform updates
```

The exact preference model will be defined after the initial notification set is finalized.

---

# In-App vs External Delivery

A notification event may potentially be delivered through different channels.

Conceptually:

```text
Notification Event
│
├── In-App
├── Email
├── Push
└── Other future channels
```

Not every notification should use every channel.

---

# Email Notifications

🟡 **Open Decision**

Mosaic will need email for certain account and security flows.

Whether ordinary social notifications should also be delivered by email remains undecided.

Potential approaches include:

```text
Immediate email

Daily digest

Weekly digest

Disabled by default

User configurable
```

This should be decided based on actual engagement needs.

---

# Push Notifications

🔮 **Future Possibility**

Push notifications may become useful if Mosaic later has:

* installable web experiences;
* mobile applications;
* supported browser notifications.

They are not necessary for defining the initial notification domain.

---

# Notification Digests

🔮 **Future Possibility**

Instead of sending many individual notifications, Mosaic may summarize activity.

Example:

```text
This week:

24 new followers
183 Likes
7 comments
5 new Remixes
```

Digests may be especially useful for active creators.

---

# Notification Preferences and Privacy

Notification settings may reveal behavioral preferences.

They should be treated as private account settings.

A user disabling Remix notifications, for example, should not publicly signal that preference to other users.

---

# Blocking and Notifications

Blocking should prevent inappropriate future social notifications between blocked users where applicable.

Example:

```text
Ana blocks Carlos
```

Mosaic should not continue generating ordinary interaction notifications from Carlos to Ana if the underlying interaction is no longer permitted.

However, blocking does not rewrite historical notifications or Lineage.

---

# Existing Notifications After Blocking

🟡 **Open Decision**

Mosaic needs to determine whether historical notifications involving a newly blocked user:

* remain unchanged;
* become partially anonymized;
* become inaccessible;
* follow the same visibility rules as the underlying content.

This should be coordinated with the final blocking model.

---

# Deleted Accounts

If an account involved in a notification is later deleted, Mosaic should not unnecessarily retain identity information that should have been removed.

A historical notification might become:

```text
Deleted User commented on your Creation.
```

if retaining the event is appropriate.

Exact behavior depends on privacy and deletion rules.

---

# Deleted or Unavailable Content

A notification may point to content that later becomes unavailable.

Example:

```text
@Carlos commented on your Creation.
```

but the comment is later deleted.

Mosaic should handle this gracefully rather than producing an unexplained broken destination.

---

# Notification Spam

Notifications themselves can become an abuse vector.

Examples include:

* repeated Follow/unfollow behavior;
* spam comments;
* repeated mentions;
* interaction farming;
* automated Likes;
* coordinated harassment.

Mosaic should not assume every technically valid event deserves unlimited notification delivery.

Anti-abuse controls may suppress or group suspicious activity.

---

# Rate Limiting

Some notification-generating actions may already be protected by rate limits in their own systems.

Additionally, Mosaic may need notification-specific safeguards.

Exact limits should not be defined arbitrarily during product planning.

---

# Notification Reliability

Important notifications should be designed with reliable delivery in mind.

However:

```text
Platform action
≠
Notification delivery
```

A failed notification should not corrupt the action that produced it.

The technical architecture will later define mechanisms for reliable event processing and retries where appropriate.

---

# Ordering

Notifications should normally appear in meaningful chronological order.

However, grouping and priority may influence presentation.

🟡 **Open Decision**

The exact ordering strategy will be defined during UX and technical design.

---

# Duplicate Notifications

The system should avoid unintentionally producing duplicate notifications for the same event.

Example:

```text
Carlos publishes one Remix

Incorrect:
3 identical Remix notifications

Expected:
1 logical notification
```

✅ **Decided — Principle**

Notification processing should support logical idempotency where necessary.

The technical mechanism will be defined later.

---

# Notification State Is Not Source State

A notification may say:

```text
@Carlos liked your Creation.
```

but Carlos may later remove that Like.

The notification represents something that occurred.

The current Like state represents what is true now.

These concepts should not automatically be treated as identical.

This distinction will become important in the Data Model.

---

# Important Product Decisions

| Decision                                                                         | Status    |
| -------------------------------------------------------------------------------- | --------- |
| Not every platform event generates a notification                                | ✅ Decided |
| Notifications are consequences, not prerequisites for actions                    | ✅ Decided |
| Notifications have a recipient and relevant context                              | ✅ Decided |
| Relevant notifications should lead to their context                              | ✅ Decided |
| High-frequency low-urgency notifications may be grouped                          | ✅ Decided |
| Unlike does not generate a negative notification                                 | ✅ Decided |
| Direct parent creator is the primary Remix notification recipient                | ✅ Decided |
| Ancestors are not individually notified for every descendant                     | ✅ Decided |
| Users should not receive redundant notifications for their own actions           | ✅ Decided |
| Moderation actions receive higher communication importance                       | ✅ Decided |
| A report alone does not notify the reported user                                 | ✅ Decided |
| Security-critical notifications may override ordinary preferences                | ✅ Decided |
| Platform notifications should not disguise advertising as critical communication | ✅ Decided |
| In-app notifications are supported                                               | ✅ Decided |
| Notifications have read/unread state                                             | ✅ Decided |
| Reading a notification does not alter the source event                           | ✅ Decided |
| Grouping must preserve materially different meanings                             | ✅ Decided |
| Notification settings are private                                                | ✅ Decided |
| Notification failure does not invalidate the source action                       | ✅ Decided |
| Duplicate logical notifications should be prevented                              | ✅ Decided |
| Notification state and current source state are distinct concepts                | ✅ Decided |
| Follow notifications                                                             | 🟡 Open   |
| Individual Save notifications                                                    | 🟡 Open   |
| Comment thread subscriptions                                                     | 🟡 Open   |
| Deleted comment notification behavior                                            | 🟡 Open   |
| Report status notification stages                                                | 🟡 Open   |
| Notification retention                                                           | 🟡 Open   |
| User deletion/dismissal of notifications                                         | 🟡 Open   |
| Exact notification priority model                                                | 🟡 Open   |
| Social email notifications                                                       | 🟡 Open   |
| Historical notifications after blocking                                          | 🟡 Open   |
| Exact notification ordering                                                      | 🟡 Open   |
| Push notifications                                                               | 🔮 Future |
| Notification digests                                                             | 🔮 Future |
| Lineage milestone notifications                                                  | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* push notifications;
* email digests;
* weekly creator summaries;
* Lineage milestones;
* trending Lineage alerts;
* advanced notification grouping;
* customizable delivery channels;
* quiet hours;
* notification search;
* creator activity summaries;
* smart notification prioritization.

These should be introduced based on real communication needs rather than simply maximizing user attention.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Collections & Saves](./collections.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Security & Privacy](../03-technical/security.md)
* [Architecture](../03-technical/architecture.md)

---

**Previous:** [← Collections & Saves](./collections.md) · [Documentation Home](../README.md) · **Next:** [Moderation & Trust →](./moderation.md)
