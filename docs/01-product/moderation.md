# Moderation & Trust System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Moderation & Trust System** defines how Mosaic identifies, evaluates, and responds to content or behavior that may violate platform rules.

Mosaic is designed around open creative participation:

```text
Discover
   ↓
Customize
   ↓
Create
   ↓
Publish
   ↓
Remix
   ↓
Discuss
```

That freedom also creates opportunities for:

* spam;
* harassment;
* impersonation;
* abusive behavior;
* prohibited content;
* manipulation;
* misleading attribution;
* harmful use of social features;
* violations involving Creations, comments, Profiles, or other user-generated content.

Moderation exists to preserve an environment where creative freedom and community safety can coexist.

---

# Core Moderation Philosophy

Mosaic's trust model is built around three principles:

> **Open Creation → Traceable Lineage → Scalable Moderation**

Users should have significant freedom to create and transform public work.

Creative history should remain traceable.

Abuse should be handled through platform rules and moderation rather than giving individual creators control over other users' Creations.

---

# Moderation Is Not Creative Control

✅ **Decided**

Moderation should not be used merely because one creator dislikes another creator's interpretation.

Example:

```text
Creation A — Ana
       ↓
Creation B — Carlos
```

Ana may dislike B.

That alone does not give Ana authority to delete B.

If Ana believes B violates Mosaic's rules:

```text
Report
  ↓
Moderation Process
```

The platform evaluates the case according to applicable rules.

---

# What Can Be Moderated

Moderation may apply to different Mosaic entities.

Conceptually:

```text
MODERATABLE CONTENT
│
├── Creations
├── Generated Media
├── Prompts
├── Titles
├── Descriptions
├── Comments
├── Profiles
├── Usernames
├── External Links
└── Other future user-generated content
```

Behavior itself may also be subject to moderation.

Examples include:

* spam;
* harassment;
* coordinated manipulation;
* abusive reporting;
* impersonation;
* repeated violations.

---

# Community Rules

Moderation requires explicit rules.

Mosaic should not operate under an undefined principle of:

> "Remove whatever seems bad."

Rules should eventually describe prohibited or restricted behavior clearly enough for:

* users;
* moderators;
* automated systems;
* appeals;
* administrators.

The final Community Guidelines will be a separate policy artifact.

---

# Reporting

Authenticated users should be able to report content or behavior they believe violates Mosaic's rules.

Conceptually:

```text
User
 ↓
Report
 ↓
Target
 ↓
Reason
 ↓
Moderation System
```

A report does not itself establish that a violation occurred.

It creates a moderation signal requiring evaluation.

---

# Report Target

A report should identify what is being reported.

Examples:

```text
Creation
Comment
Profile
User behavior
```

Future systems may introduce additional reportable entities.

---

# Report Reason

Reports should include a reason or category.

Possible conceptual categories may include:

```text
Spam
Harassment
Impersonation
Prohibited Content
Misleading Attribution
Intellectual Property Concern
Other
```

These are examples, not the final Community Guidelines taxonomy.

The final categories should correspond to actual platform rules.

---

# Report Context

A report may require additional context from the reporter.

Example:

```text
Reason:
Impersonation

Additional context:
"This account is pretending to be..."
```

🟡 **Open Decision**

Which report categories require additional explanation will be defined later.

---

# Anonymous Reporting

🟡 **Open Decision**

Mosaic has not yet decided whether logged-out visitors may submit reports.

Allowing anonymous reporting could make serious problems easier to flag.

However, it also introduces:

* spam;
* abuse;
* duplicate reports;
* reduced accountability;
* rate-limiting complexity.

Authenticated reporting is the baseline.

---

# A Report Is a Signal, Not a Verdict

✅ **Decided**

A high number of reports does not automatically prove that content violates Mosaic's rules.

Conceptually:

```text
Reports
   ↓
Evidence / Signals
   ↓
Evaluation
   ↓
Decision
```

not:

```text
Many Reports
   ↓
Automatic Guilt
```

This is important because coordinated reporting can itself be abused.

---

# Scalable Moderation

A growing social platform cannot reasonably require humans to manually inspect every action and every report from the beginning.

Mosaic should therefore support a hybrid moderation model:

```text
Automation / AI
       +
Human Judgment
```

The purpose of automation is scalability.

The purpose of human review is judgment, accountability, and handling ambiguity.

---

# AI-Assisted Moderation

✅ **Decided — Principle**

AI may assist Mosaic's moderation process.

Potential responsibilities include:

* initial report analysis;
* content classification;
* identifying relevant rules;
* risk estimation;
* detecting obvious spam;
* prioritizing cases;
* identifying duplicate reports;
* summarizing evidence;
* recommending a moderation action.

AI assistance does not mean every moderation decision must be made entirely by AI.

---

# AI Triage

A conceptual report flow may look like:

```text
Report
  ↓
Initial Automated / AI Analysis
  ↓
Classification
  ↓
Risk + Confidence
  ↓
Recommended Path
```

Possible paths:

```text
LOW RISK
→ routine handling

UNCERTAIN
→ additional review

HIGH RISK
→ priority review
```

The exact classification system will be defined during moderation implementation.

---

# AI Moderation Output

A moderation analysis may conceptually produce information such as:

```text
Potential violation
Relevant rule
Confidence
Evidence
Risk level
Recommended action
Priority
```

This information assists the moderation process.

It should not be confused with the final moderation decision.

---

# Human Review

Human moderation is especially important when cases involve:

* ambiguity;
* low AI confidence;
* appeals;
* complex attribution disputes;
* intellectual property concerns;
* severe account penalties;
* permanent bans;
* unusual edge cases;
* conflicting evidence.

✅ **Decided — Principle**

Mosaic should preserve meaningful human judgment for decisions where context and consequences justify it.

---

# Permanent Enforcement

Actions with severe or lasting consequences should receive stronger safeguards than routine low-risk moderation.

Examples include:

```text
Permanent account ban
Major account restriction
Complex ownership dispute
Appeal of significant enforcement
```

Mosaic should not treat these exactly like obvious spam removal.

---

# Moderation Actions

Depending on the violation, possible actions may eventually include:

```text
No Action
Warning
Content Restriction
Content Removal
Interaction Restriction
Temporary Suspension
Account Suspension
Permanent Ban
```

The final enforcement ladder has not yet been defined.

🟡 **Open Decision**

Exact penalties and escalation rules belong to the future Community Guidelines and moderation specification.

---

# Proportionality

✅ **Decided — Principle**

Moderation actions should consider the nature and severity of the violation.

Not every violation should automatically result in the strongest possible penalty.

Relevant factors may eventually include:

* severity;
* repetition;
* intent where reasonably established;
* user history;
* risk;
* previous enforcement.

The final enforcement framework will define how these factors are used.

---

# Content Enforcement vs Account Enforcement

These are different concepts.

Example:

```text
Creation violates a rule
        ↓
Creation removed
```

does not necessarily mean:

```text
Account permanently banned
```

Likewise, severe or repeated behavior may justify account-level action.

✅ **Decided**

Content enforcement and account enforcement should be modeled separately.

---

# Moderation and Lineage

Lineage creates important moderation edge cases.

Consider:

```text
A
↓
B
↓
C
```

If B violates a rule and is removed:

```text
A
↓
[Creation unavailable]
↓
C
```

The historical relationship should remain structurally understandable.

---

# No Automatic Descendant Deletion

✅ **Decided — Principle**

Removing one Creation should not automatically remove every descendant.

Example:

```text
A
↓
B ← removed
↓
C
```

C may contain different media, Prompt content, and creative decisions.

It should be evaluated according to its own content and context.

---

# No Automatic Ancestor Punishment

Similarly, moderation of a descendant should not automatically punish its ancestors.

```text
A
↓
B
↓
C ← violation
```

does not mean A or B necessarily violated the same rule.

---

# Serious Lineage-Wide Problems

Some cases may reveal a broader problem across multiple related Creations.

For example, several descendants may independently contain prohibited material inherited from a source.

In such cases:

```text
Lineage relationship
→ useful moderation context
```

but each relevant Creation still requires appropriate evaluation.

Mosaic should not assume either:

```text
One violation = entire Lineage guilty
```

or:

```text
Each node must always be treated with zero context
```

---

# Tombstones After Moderation

If a Creation is removed but descendants remain, Mosaic may preserve a limited Lineage placeholder:

```text
[Creation unavailable]
```

The placeholder exists to preserve historical structure.

It must not expose prohibited content merely to preserve Lineage.

---

# Moderation Does Not Rewrite Creative History

✅ **Decided**

Removing content should not falsely change:

```text
A → B → C
```

into:

```text
A → C
```

if C was actually derived from B.

Historical integrity and content availability are separate concerns.

---

# Reporting a Remix

The original creator may report a Remix.

However:

```text
Original creator
≠
Moderator
```

Their report enters the same trust process as other reports.

Authorship of the parent Creation may provide relevant context but does not automatically determine the outcome.

---

# Low-Effort or Duplicate Remixes

Mosaic may eventually encounter users publishing:

* exact copies;
* nearly unchanged Creations;
* mass-generated low-effort derivatives;
* repetitive spam branches.

This may harm:

* Discovery;
* Lineage quality;
* creator experience.

🟡 **Open Decision**

The exact boundary between legitimate minimal creative variation and abusive low-effort duplication should be defined carefully.

It should not be reduced to an arbitrary similarity percentage.

---

# Attribution Disputes

A user may publish content derived from another Creation without preserving the appropriate Mosaic relationship.

Example:

```text
Creation A
      ↓
User copies/adapts externally
      ↓
Publishes B as unrelated
```

Mosaic may not always be able to automatically determine that B is derived from A.

Users may report suspected attribution problems.

---

# Similarity Is Not Proof

✅ **Decided — Principle**

Similarity alone does not automatically establish derivation.

Two users may independently create similar content.

Automated similarity detection may provide a signal, but attribution disputes may require context and human review.

---

# Correcting Lineage

Moderation may eventually need authority to correct an incorrectly established or omitted Lineage relationship.

Because this changes historical attribution:

✅ **Decided — Principle**

Lineage corrections should be controlled and auditable rather than ordinary user-editable metadata.

Exact correction workflows remain open.

---

# Appeals

Users affected by moderation decisions should have a meaningful way to challenge eligible decisions.

Conceptually:

```text
Moderation Decision
        ↓
Affected User
        ↓
Appeal
        ↓
Review
        ↓
Final / Updated Decision
```

---

# Why Appeals Exist

Automated systems can make mistakes.

Humans can make mistakes.

Context may be missing.

Rules may be incorrectly applied.

Therefore:

✅ **Decided**

Mosaic should support appeals for meaningful moderation actions.

---

# Appeal Review

Appeals should receive appropriate review.

Human involvement is particularly important when:

* the original action was automated;
* the case is ambiguous;
* significant account consequences exist;
* contextual evidence matters.

The exact staffing and workflow will depend on Mosaic's scale.

---

# Successful Appeal

If an appeal determines that content should not have been removed:

```text
Removed Content
      ↓
Appeal Accepted
      ↓
Content Restored
```

where restoration is technically and legally appropriate.

Associated visibility and Lineage relationships should recover consistently.

---

# Rejected Appeal

If review confirms the moderation action:

```text
Appeal
  ↓
Decision Reviewed
  ↓
Original Action Maintained
```

The affected user should receive a clear outcome.

---

# Moderation Notifications

Important moderation decisions should notify affected users.

Examples:

```text
Your Creation was removed.

Your appeal was reviewed.

Your Creation has been restored.

Your account has been restricted.
```

Notifications should link to appropriate context and available next steps.

---

# Report Notifications

Reporters may receive updates about meaningful report outcomes.

However, privacy and safety may prevent Mosaic from revealing every internal enforcement detail.

Example:

```text
"We reviewed your report and took appropriate action."
```

may sometimes be preferable to exposing private account enforcement information.

---

# Reviewed Content

A particularly important case occurs when:

```text
Content is reported
        ↓
Reviewed
        ↓
No violation found
```

Mosaic should remember that meaningful review occurred.

Otherwise the same content could repeatedly consume moderation resources.

---

# Moderation Review State

Conceptually, Mosaic may record something like:

```text
Creation #5821

Moderation Status:
REVIEWED

Decision:
NO_VIOLATION

Reason Reviewed:
LOW_EFFORT_REMIX

Decision Source:
HUMAN_REVIEW

Reviewed Content State:
Snapshot X

Reviewed At:
...
```

This is conceptual.

The exact technical representation will be defined later.

---

# Review Applies to a Content State

✅ **Decided**

A moderation review should apply to the content state that was actually reviewed.

If content materially changes later, Mosaic should not blindly assume the old review covers the new material.

Conceptually:

```text
Content State A
↓
Reviewed
↓
No Violation

Content changes meaningfully

Content State B
↓
Previous review does not automatically
guarantee State B
```

This is important even though meaningful creative evolution normally produces a new Creation.

Editable metadata and other mutable content may still change.

---

# Duplicate Reports After Review

Suppose a Creation was reported for a specific reason and human review found no violation.

A later equivalent report against the same reviewed content state should not necessarily restart the entire process.

Conceptually:

```text
Same Content State
+
Same Reason
+
Already Reviewed
        ↓
Duplicate / Reduced-Priority Report
```

---

# Reviewed Does Not Mean Unreportable

✅ **Decided**

A successful appeal or no-violation review must not make content permanently immune from reporting.

A different report may involve:

```text
Different violation
Different evidence
Changed content
New context
```

Therefore:

```text
Reviewed
≠
Untouchable
```

---

# Review Protection

The intended behavior is:

```text
Equivalent duplicate report
against same reviewed state
        ↓
May be filtered or deprioritized
```

while:

```text
Different credible issue
        ↓
Can still be evaluated
```

This protects both users and moderation resources.

---

# Content Snapshot

Moderation needs to know what content was actually evaluated.

Conceptually:

```text
Report
  ↓
Relevant Content State
  ↓
Moderation Decision
```

If the content later changes, the platform should still be able to understand what the earlier decision referred to where retention is lawful and appropriate.

The technical snapshot/audit strategy will be defined later.

---

# Audit Trail

✅ **Decided**

Meaningful moderation activity should be auditable.

Conceptually:

```text
Report
  ↓
AI Analysis
  ↓
Decision
  ↓
Action
  ↓
Appeal
  ↓
Review
  ↓
Final Outcome
```

The platform should be able to determine:

* what happened;
* when it happened;
* what content state was involved;
* which rule was considered;
* whether automation or a person made the decision;
* what action resulted.

---

# Human and Automated Decision Sources

Moderation records should distinguish meaningful decision sources.

Conceptually:

```text
AUTOMATED
AI_ASSISTED
HUMAN_REVIEW
ADMINISTRATIVE
```

Exact terminology remains technical.

The important product principle is traceability.

---

# Moderator Accountability

Moderators should not have invisible unlimited power.

Important moderation actions should be attributable internally to:

* an authorized moderator;
* an automated process;
* an administrative action.

This supports investigation, appeals, security, and quality control.

---

# Abuse of Reporting

Reporting itself can be abused.

Examples include:

* mass reporting;
* coordinated reporting;
* repeated false reports;
* harassment through reporting;
* attempts to remove competitors.

Mosaic should treat reporting behavior as part of the Trust System.

---

# Repeated Invalid Reports

A user who repeatedly submits clearly abusive or bad-faith reports may eventually face:

* reduced report priority;
* temporary report restrictions;
* warnings;
* moderation investigation;
* other appropriate controls.

🟡 **Open Decision**

Exact thresholds and consequences should be based on actual abuse patterns rather than arbitrary initial numbers.

---

# Reporter Reputation

🔮 **Future Possibility**

Moderation triage may eventually consider a reporter's historical signal quality.

For example:

```text
Repeated accurate reports
→ stronger triage signal

Repeated abusive reports
→ weaker triage signal
```

This must be designed carefully.

Reporter reputation should not become:

```text
Trusted user says it
→ automatically guilty
```

It should remain one signal among others.

---

# Mass Reporting Protection

✅ **Decided — Principle**

A coordinated increase in report volume should not automatically determine the moderation outcome.

Report volume may affect:

```text
Priority
```

without automatically determining:

```text
Guilt
```

---

# Preventive Moderation

Mosaic moderation does not need to rely only on reports.

🔮 **Future Possibility**

Automated systems may eventually analyze content:

```text
Before publication
or
Immediately after publication
```

for obvious risks such as:

* prohibited content;
* spam;
* manipulation;
* malicious links;
* known abusive patterns.

---

# Preventive Moderation and False Positives

Preventive systems may make mistakes.

Therefore, blocked or restricted publication flows may require:

* clear explanation;
* retry/correction;
* appeal or review mechanisms where appropriate.

Automation should not create unexplained dead ends for legitimate creators.

---

# Moderation and Discovery

Moderation state affects whether content should appear in:

* search;
* feeds;
* recommendations;
* trending;
* Profiles.

Example:

```text
PUBLIC
→ discoverable

UNDER REVIEW
→ behavior depends on risk/policy

REMOVED
→ not normally discoverable

TOMBSTONE
→ limited Lineage representation only
```

Exact visibility states will be specified later.

---

# Content Under Review

🟡 **Open Decision**

Mosaic must define whether reported content remains fully visible while under review.

Different cases may require different behavior.

For example:

```text
Low-risk report
→ content may remain visible

Credible severe risk
→ temporary restriction may be appropriate
```

This should depend on risk rather than one universal rule.

---

# Moderation and Blocking

Blocking is a user-controlled safety mechanism.

Moderation is platform enforcement.

They are not the same.

```text
BLOCK
Personal interaction boundary

MODERATION
Platform rule enforcement
```

A user may block another user even if no platform violation occurred.

A moderation violation may occur even when nobody involved has blocked anyone.

---

# Moderation and Privacy

Moderation may require access to information that is not publicly visible.

Examples could include:

* private account metadata;
* report context;
* internal abuse signals;
* relevant audit records.

Access should follow role and necessity.

Moderation access does not mean this information becomes public.

---

# Evidence Retention

🟡 **Open Decision**

Mosaic may need to retain certain evidence after public content is removed for:

* appeals;
* abuse investigation;
* legal obligations;
* auditability.

Retention must be balanced with:

* privacy;
* account deletion;
* security;
* applicable law;
* storage requirements.

Exact retention periods belong to later legal and technical work.

---

# Moderator Roles

As established in User & Identity, Mosaic conceptually includes:

```text
USER
MODERATOR
ADMINISTRATOR
```

A Moderator receives additional permissions necessary for trust and safety work.

This is a permission role, not a separate public identity type.

---

# Moderator Access

Moderators should receive only the permissions necessary for their responsibilities.

✅ **Decided — Principle**

Moderation privileges should follow least-privilege principles.

Not every Moderator necessarily needs every administrative capability.

---

# Moderator Actions

Potential moderator capabilities include:

```text
Review reports
Review flagged content
Apply allowed enforcement
Restore content
Review certain appeals
Add internal moderation notes
Escalate cases
```

Exact permissions will be defined with Administration and Security.

---

# Administrative Escalation

Some cases may require higher authority.

Examples:

* permanent bans;
* serious security incidents;
* legal requests;
* moderator misconduct;
* unusual account recovery issues;
* high-impact policy disputes.

These may be escalated to authorized administrators.

---

# Moderator Misconduct

Moderation power itself can be abused.

Mosaic should maintain mechanisms to investigate inappropriate moderator actions.

Auditability and role separation help protect against this.

---

# Moderation Transparency

Users affected by enforcement should receive meaningful information where appropriate.

This does not necessarily mean exposing:

* internal detection methods;
* private reporter identities;
* security-sensitive signals;
* confidential moderation information.

Transparency must coexist with privacy and abuse prevention.

---

# Reporter Privacy

✅ **Decided — Principle**

The identity of an ordinary reporter should not automatically be disclosed to the reported user.

This helps reduce retaliation and harassment risks.

---

# Restored Content

When content is restored after a successful appeal or corrected decision, dependent systems should respond consistently.

Potentially affected systems include:

```text
Profile
Search
Discovery
Lineage
Comments
Notifications
Metrics
Collections
```

Restoration should not create a second Creation.

It restores the existing Creation where possible.

---

# Moderation State Is Not Creation Versioning

A Creation being:

```text
Published
Removed
Restored
```

does not create creative versions of that Creation.

These are moderation/lifecycle states.

Meaningful creative evolution still occurs through a new derived Creation.

---

# Moderation Metrics

Mosaic may eventually monitor internal trust metrics such as:

* report volume;
* review time;
* appeal rate;
* overturned decisions;
* repeated offenders;
* AI confidence distribution;
* false-positive patterns.

These metrics can help improve moderation quality.

They should not automatically become public user rankings.

---

# Moderation Quality

A scalable moderation system should optimize for more than speed.

Relevant goals include:

```text
Consistency
Accuracy
Fairness
Traceability
Response Time
Appeal Quality
Abuse Resistance
```

Fast incorrect moderation is not a successful trust system.

---

# Important Product Decisions

| Decision                                                        | Status    |
| --------------------------------------------------------------- | --------- |
| Moderation is separate from creator control over descendants    | ✅ Decided |
| Reports are signals, not verdicts                               | ✅ Decided |
| Authenticated reporting is supported                            | ✅ Decided |
| Mosaic uses a hybrid automated/AI + human moderation model      | ✅ Decided |
| AI may perform triage, classification and recommendations       | ✅ Decided |
| Human review remains important for ambiguous/high-impact cases  | ✅ Decided |
| Content and account enforcement are separate concepts           | ✅ Decided |
| Enforcement should be proportional to the violation             | ✅ Decided |
| Removing one Creation does not automatically remove descendants | ✅ Decided |
| Moderation does not flatten Lineage                             | ✅ Decided |
| Similarity alone does not prove derivation                      | ✅ Decided |
| Lineage corrections should be controlled and auditable          | ✅ Decided |
| Meaningful moderation actions can be appealed                   | ✅ Decided |
| Successful appeals may restore existing content                 | ✅ Decided |
| Moderation review applies to a specific content state           | ✅ Decided |
| Reviewed content does not become permanently unreportable       | ✅ Decided |
| Equivalent duplicate reports may be filtered/deprioritized      | ✅ Decided |
| Meaningful moderation actions require an audit trail            | ✅ Decided |
| Report volume does not determine guilt                          | ✅ Decided |
| Reporting behavior itself may be moderated                      | ✅ Decided |
| Blocking and moderation are separate mechanisms                 | ✅ Decided |
| Moderator permissions follow least privilege                    | ✅ Decided |
| Reporter identity is not automatically disclosed                | ✅ Decided |
| Restoration does not create a new Creation                      | ✅ Decided |
| Moderation states are not creative versions                     | ✅ Decided |
| Anonymous reporting                                             | 🟡 Open   |
| Final report categories                                         | 🟡 Open   |
| Enforcement ladder                                              | 🟡 Open   |
| Low-effort Remix boundaries                                     | 🟡 Open   |
| Exact Lineage correction workflow                               | 🟡 Open   |
| Report outcome notification detail                              | 🟡 Open   |
| Abusive reporter thresholds                                     | 🟡 Open   |
| Visibility while under review                                   | 🟡 Open   |
| Evidence retention                                              | 🟡 Open   |
| Preventive AI moderation                                        | 🔮 Future |
| Reporter reputation signals                                     | 🔮 Future |
| Advanced moderation analytics                                   | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* preventive content analysis;
* advanced spam detection;
* similarity-assisted attribution review;
* reporter reputation signals;
* automated abuse clustering;
* coordinated manipulation detection;
* moderator quality analytics;
* policy-specific AI models;
* risk-based moderation queues;
* automated duplicate-report clustering;
* moderation transparency reports;
* creator trust tools.

These possibilities should evolve according to real platform risks.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [User & Identity](./user-identity.md)
* [Publications](./publications.md)
* [Prompt System](./prompts.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Notifications](./notifications.md)
* [Administration](./administration.md)
* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Security & Privacy](../03-technical/security.md)
* [Observability](../03-technical/observability.md)

---

**Previous:** [← Notifications](./notifications.md) · [Documentation Home](../README.md) · **Next:** [Administration →](./administration.md)
