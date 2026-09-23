# Security & Privacy

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Security, Operations & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the technical Security and Privacy architecture for Mosaic.

Security is a cross-cutting system property.

It applies to:

```text
Identity
Authentication
Sessions
Authorization
API
Creations
Media
Search
Social interactions
Collections
Notifications
Moderation
Administration
Infrastructure
Operational data
```

Mosaic follows the principle:

> **The client is untrusted. Authorization and critical invariants must be enforced at trusted application boundaries.**

Security mechanisms should protect Mosaic without unnecessarily complicating the Product or creating speculative infrastructure.

---

# 1. Security Model

Mosaic uses defense in depth.

Conceptually:

```text
User
 ↓
Browser Security
 ↓
Transport Security
 ↓
Authentication
 ↓
Authorization
 ↓
Input Validation
 ↓
Domain Rules
 ↓
Persistence Constraints
 ↓
Infrastructure Security
 ↓
Monitoring & Audit
```

No single layer is assumed to provide complete protection.

---

# 2. Trust Boundaries

Important Mosaic trust boundaries include:

```text
Browser
   │
   ▼
Application/API
   │
   ├── Database
   ├── Object Storage
   ├── Background Workers
   ├── Search Infrastructure
   └── External Providers
```

Data crossing a trust boundary MUST be treated according to the receiving system's security requirements.

---

# 3. Client Trust

The Mosaic client MUST be treated as untrusted.

A User can potentially:

* modify frontend JavaScript;
* construct requests manually;
* change identifiers;
* replay requests;
* bypass UI restrictions;
* manipulate hidden fields;
* submit malformed input.

Therefore:

```text
Hidden button ≠ Authorization
Disabled control ≠ Authorization
Frontend validation ≠ Trusted validation
```

---

# 4. Authentication Architecture

Mosaic's initial first-party web application will use:

> **Session-oriented authentication**

Successful authentication establishes trusted authenticated state associated with a User.

The exact authentication library or provider remains undecided.

---

# 5. Session Transport

For the first-party browser application, the preferred architecture is:

> **Secure cookie-based session transport**

where compatible with the selected framework and authentication implementation.

Authentication cookies SHOULD use appropriate protections such as:

```text
HttpOnly
Secure
SameSite
```

according to deployment and application requirements.

---

# 6. Why HttpOnly Sessions

Authentication secrets accessible to ordinary frontend JavaScript increase exposure to client-side compromise.

An `HttpOnly` session cookie prevents ordinary JavaScript from directly reading the cookie.

This does not eliminate browser security risks, but it reduces unnecessary credential exposure.

---

# 7. Secure Cookies

Production authentication cookies MUST use secure transport requirements appropriate to HTTPS deployment.

Sensitive authentication cookies MUST NOT be transmitted through ordinary unencrypted HTTP in production.

---

# 8. SameSite Policy

🟡 **Open Technical Decision**

The exact `SameSite` policy depends on Mosaic's final deployment topology and cross-origin requirements.

The strictest policy compatible with legitimate Product behavior SHOULD be preferred.

---

# 9. Session Identifier

If Mosaic uses server-managed session identifiers, identifiers MUST:

* have sufficient entropy;
* be unpredictable;
* avoid meaningful embedded private data;
* be protected in transport;
* be revocable.

---

# 10. Session Storage

🟡 **Open Technical Decision**

Session state may be managed through:

* relational persistence;
* framework-managed persistence;
* dedicated session infrastructure;
* another secure implementation.

The selected mechanism should follow actual scale and framework requirements.

---

# 11. Session Expiration

Sessions MUST expire according to an intentional policy.

🟡 **Open Security/Product Decision**

Exact:

* idle timeout;
* absolute lifetime;
* remember-me behavior;
* renewal behavior

remain undefined.

---

# 12. Session Rotation

Session identifiers SHOULD be rotated where security-sensitive authentication transitions justify it.

Examples may include:

* successful authentication;
* privilege changes;
* credential changes.

Exact behavior depends on the authentication implementation.

---

# 13. Session Revocation

Mosaic SHOULD support invalidating authenticated sessions when security requires it.

Potential triggers include:

* logout;
* password change;
* suspicious activity;
* Account suspension;
* Account ban;
* security-sensitive administrative action.

---

# 14. Logout

Logout MUST invalidate or otherwise render the relevant authenticated session unusable.

Deleting only frontend state is insufficient.

---

# 15. Multiple Sessions

🟡 **Open Product/Security Decision**

Mosaic has not yet decided whether Users can:

* maintain multiple concurrent sessions;
* view active sessions;
* revoke individual sessions;
* revoke all other sessions.

The architecture should not prevent future session management.

---

# 16. Password Storage

Passwords MUST NOT be stored in recoverable plaintext.

Password authentication MUST use an appropriate modern password-hashing mechanism designed for password storage.

The exact algorithm and parameters will be selected during implementation according to current security guidance and platform support.

---

# 17. Password Policy

🟡 **Open Product/Security Decision**

Exact password requirements remain unresolved.

The policy should prioritize resistance to compromised credentials without encouraging predictable password patterns.

---

# 18. Password Reset

Password reset MUST use a secure temporary verification mechanism.

Reset capabilities SHOULD be:

* time-limited;
* difficult to guess;
* single-use where appropriate;
* protected from account enumeration.

---

# 19. Email Verification

Mosaic's Account model supports email verification.

🟡 **Open Product Decision**

Whether verification is mandatory before specific actions remains unresolved.

Security architecture must support verification without assuming every public interaction requires it.

---

# 20. Authentication Failure

Authentication error responses SHOULD avoid unnecessary disclosure of whether a specific email or Account exists.

The exact User-facing wording should balance usability and enumeration resistance.

---

# 21. Brute-Force Protection

Authentication endpoints MUST support abuse protection.

Potential controls include:

* rate limiting;
* progressive delays;
* suspicious-attempt detection;
* temporary challenge mechanisms.

Exact thresholds remain operational decisions.

---

# 22. Credential Stuffing

Mosaic SHOULD be capable of responding to repeated automated authentication attempts using compromised credentials.

Controls may evolve with observed abuse.

---

# 23. Multi-Factor Authentication

🔮 **Future Possibility**

Mosaic may later support MFA.

MFA may become especially relevant for:

* Moderators;
* Administrators;
* high-risk Accounts.

It is not assumed as an initial User requirement.

---

# 24. Privileged Account Authentication

Privileged roles SHOULD receive stronger safeguards than ordinary Account access where justified.

Potential future requirements include:

```text
MFA
Recent re-authentication
Security confirmation
Restricted session lifetime
```

The exact controls remain open.

---

# 25. Authorization

Authentication establishes identity.

Authorization determines whether that identity may perform an action.

Every protected Mosaic operation MUST evaluate authorization at a trusted boundary.

---

# 26. Object-Level Authorization

Authorization MUST apply to specific resources.

Example:

```text
Authenticated User
       │
       ▼
PATCH Creation A
```

requires verification that the User is authorized to modify:

```text
Creation A
```

Authentication alone is insufficient.

---

# 27. Ownership

Ownership-based permissions SHOULD be derived from authoritative relationships.

Examples include:

```text
Creation.author
Collection.owner
Comment.author
Profile.user
```

Client-supplied ownership claims MUST NOT be trusted.

---

# 28. Role-Based Authorization

Mosaic currently defines conceptual roles:

```text
USER
MODERATOR
ADMINISTRATOR
```

Role checks may grant access to privileged capabilities.

Roles do not replace resource-level authorization.

---

# 29. Least Privilege

Users and privileged operators SHOULD receive only the permissions required for their responsibilities.

Moderator access does not imply unrestricted administrative access.

Administrator access does not imply unrestricted use of private User data.

---

# 30. Privilege Assignment

Users MUST NOT be able to assign themselves privileged roles.

Role assignment requires authorized privileged action.

The exact Administrator bootstrap and assignment process remains open.

---

# 31. Privilege Changes

Privilege changes SHOULD:

* be authorized;
* be auditable;
* invalidate or refresh authorization state where necessary.

Cached authorization MUST NOT leave removed privileges active indefinitely.

---

# 32. Administrative Authorization

Administrative endpoints MUST use explicit server-side authorization.

They MUST NOT rely on:

```text
/admin route hidden from normal Users
```

as a security boundary.

---

# 33. Moderator Authorization

Moderation tools MUST be restricted to authorized roles and relevant capabilities.

Moderator interfaces SHOULD expose only information required for moderation work.

---

# 34. High-Risk Actions

Actions with severe consequences MAY require additional safeguards.

Examples include:

* permanent Account ban;
* privileged role assignment;
* Lineage correction;
* irreversible deletion;
* security-sensitive configuration changes.

🟡 **Open Security Decision**

Exact safeguards remain unresolved.

---

# 35. Re-Authentication

Sensitive operations MAY require recent authentication even when an existing session is valid.

Potential examples include:

* changing password;
* changing email;
* privileged role assignment;
* critical Account actions.

Exact requirements remain open.

---

# 36. API Authorization

Every protected API route MUST enforce authorization independently of frontend behavior.

API access rules SHOULD map clearly to Mosaic Business Rules and Functional Requirements.

---

# 37. Default Denial

Privileged capabilities SHOULD follow:

> **Deny unless explicitly authorized**

rather than assuming access unless explicitly blocked.

---

# 38. Input Validation

All untrusted input MUST be validated appropriately.

Sources include:

```text
Forms
API requests
Query parameters
Uploads
Prompt content
Comments
Profile fields
URLs
Administrative inputs
External provider responses
```

---

# 39. Validation Responsibility

Client-side validation improves User experience.

Trusted server-side validation protects the system.

Critical rules MUST NOT depend exclusively on client validation.

---

# 40. Output Safety

User-generated content MUST be rendered safely.

Mosaic should avoid interpreting ordinary User content as executable application markup or script.

---

# 41. Cross-Site Scripting

Mosaic MUST protect against XSS risks arising from User-generated content.

Potential sources include:

* Profiles;
* Creation descriptions;
* Prompts;
* Comments;
* Tags;
* external links;
* administrative text.

Framework escaping SHOULD be preserved unless content is intentionally sanitized through a trusted process.

---

# 42. Rich Text

🟡 **Open Product/Technical Decision**

If Mosaic later supports rich text or Markdown, rendering MUST use a security-aware sanitization strategy.

Raw arbitrary HTML SHOULD NOT automatically become trusted content.

---

# 43. SQL Injection

Database queries MUST use safe parameterization or equivalent protections provided by the selected data-access technology.

Untrusted values MUST NOT be concatenated into executable SQL.

---

# 44. Query Construction

Dynamic filtering and sorting SHOULD use explicitly supported fields rather than raw User-provided database expressions.

---

# 45. CSRF

If authenticated state is automatically sent through browser cookies, state-changing operations MUST receive appropriate Cross-Site Request Forgery protection.

Potential controls include:

* SameSite cookies;
* CSRF tokens;
* origin validation;
* framework protections.

The exact combination depends on the final architecture.

---

# 46. CORS

Production CORS policy SHOULD expose only origins and methods required by Mosaic.

A wildcard policy MUST NOT be used for credentialed application requests without explicit security justification.

---

# 47. Transport Security

Production Mosaic application traffic MUST use HTTPS.

Sensitive authentication or private application traffic MUST NOT intentionally downgrade to insecure transport.

---

# 48. Security Headers

The deployed application SHOULD use appropriate browser security headers.

Potential controls include:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

Exact policy will depend on frontend and deployment requirements.

---

# 49. Content Security Policy

Mosaic SHOULD adopt a Content Security Policy compatible with its actual application dependencies.

CSP should reduce unnecessary script and resource execution sources without becoming an unmaintained permissive placeholder.

---

# 50. Clickjacking

Mosaic SHOULD control whether application pages may be embedded by third-party sites.

Sensitive application surfaces SHOULD be protected from unauthorized framing.

---

# 51. External Links

User-provided external links MUST be treated as untrusted.

Mosaic MAY apply:

* URL validation;
* safe rendering;
* redirect warnings;
* `rel` protections;
* moderation.

Exact Product behavior remains open.

---

# 52. Server-Side URL Fetching

If Mosaic later fetches User-provided URLs from its servers, the implementation MUST protect against Server-Side Request Forgery.

Potential protections include:

* protocol restrictions;
* destination validation;
* network restrictions;
* redirect controls.

---

# 53. Media Upload Security

Media uploads MUST be treated as untrusted.

Security controls may include:

```text
Authentication
Authorization
File-size constraints
Type validation
File-signature inspection
Processing isolation
Temporary upload capability
Storage isolation
```

---

# 54. Direct Upload Security

Temporary direct-upload authorization MUST be:

* limited;
* scoped;
* time-bound;
* non-reusable where appropriate.

It MUST NOT expose permanent object-storage credentials.

---

# 55. Media Validation

Client-provided:

```text
filename
extension
MIME type
```

MUST NOT independently determine whether Media is safe or supported.

Trusted inspection SHOULD be used where required.

---

# 56. Media Processing Isolation

Tools processing untrusted Media SHOULD operate with limited privileges.

A malformed Media file MUST NOT provide access to unrelated application resources.

---

# 57. Media Resource Limits

Processing SHOULD enforce appropriate resource limits to reduce abuse involving:

* extremely large files;
* excessive processing time;
* malformed media;
* resource exhaustion.

Exact limits remain open.

---

# 58. Malware Scanning

🟡 **Open Security Decision**

Dedicated malware scanning may be introduced depending on:

* accepted formats;
* processing model;
* download behavior;
* threat analysis.

The architecture must remain capable of adding it.

---

# 59. Object Storage Access

Object storage MUST NOT permit unrestricted anonymous write access.

Read access depends on Mosaic's final Media delivery strategy.

---

# 60. Storage Credentials

Storage credentials MUST remain outside ordinary client code.

Secrets should be available only to trusted infrastructure that requires them.

---

# 61. Search Security

Search MUST respect Mosaic visibility and authorization rules.

Search infrastructure MUST NOT provide a bypass around:

* moderation;
* private content;
* blocking policy;
* restricted resources.

---

# 62. Search Enumeration

Search and public Profile lookup may enable resource enumeration.

Rate limits and response design SHOULD consider automated harvesting and abuse.

---

# 63. Search Index Privacy

Search indexes MUST NOT contain unrelated sensitive Account information merely for convenience.

Private information should only enter a Search representation when a legitimate Search capability requires it.

---

# 64. Prompt Privacy

Published Prompt content is public according to Creation visibility.

Private customization state and unpublished Prompt work MUST NOT automatically become publicly searchable or discoverable.

---

# 65. Draft Privacy

Draft content is private application state.

Draft APIs and storage MUST enforce owner access.

Possession of a Draft identifier MUST NOT grant access.

---

# 66. Collection Privacy

Private Collections MUST only be accessible according to their authorization policy.

Collection membership MUST NOT accidentally expose otherwise unavailable Creation information beyond Product rules.

---

# 67. Save Privacy

Individual Save relationships are private by default.

APIs MUST NOT expose saver identities through public Creation representations unless Product policy explicitly changes.

---

# 68. Notification Privacy

Notifications may contain private context.

Users MUST only access Notifications intended for them unless privileged operational access is explicitly authorized.

---

# 69. Report Privacy

Reporter identity MUST NOT automatically be exposed to the reported User.

Moderation access to Reporter information should follow least privilege.

---

# 70. Moderation Data

Moderation cases may contain sensitive information.

Access should be restricted to authorized operational roles.

Moderation data MUST NOT automatically become public because the underlying Creation is public.

---

# 71. Administrative Data

Administrative interfaces may expose sensitive operational information.

Access MUST be explicitly authorized and SHOULD be limited according to operational need.

---

# 72. Audit Data

Audit records may reveal:

* privileged actors;
* internal decisions;
* resource history;
* security events.

Audit access MUST therefore be permissioned.

---

# 73. Audit Integrity

Privileged actors MUST NOT be able to casually erase evidence of their own sensitive actions.

Audit storage should resist unauthorized modification.

---

# 74. Audit Event

A high-impact audit event may conceptually contain:

```text
Actor
Action
Target
Reason
Timestamp
Relevant Previous State
Relevant Resulting State
Request / Correlation Context
```

Exact schema belongs to implementation.

---

# 75. Secrets

Secrets MUST NOT be committed to source control.

Examples include:

```text
Database credentials
Session secrets
Storage credentials
Email-provider credentials
External API keys
Encryption keys
```

---

# 76. Secret Injection

Runtime secrets SHOULD be provided through secure deployment configuration or a secret-management mechanism.

Exact infrastructure remains undecided.

---

# 77. Secret Rotation

The architecture SHOULD allow security-sensitive credentials to be rotated without requiring domain-data redesign.

---

# 78. Environment Separation

Development, testing, staging where used, and production SHOULD use appropriately separated credentials and resources.

Production secrets MUST NOT be required for ordinary local development.

---

# 79. Configuration

Security-sensitive configuration MUST have safe production defaults.

The application SHOULD fail safely when required security configuration is missing rather than silently enabling insecure behavior.

---

# 80. Logging Privacy

Logs MUST NOT unnecessarily contain:

* plaintext passwords;
* session secrets;
* authentication tokens;
* storage credentials;
* complete sensitive private data.

---

# 81. Request Logging

Request logs SHOULD avoid indiscriminately recording sensitive:

* request bodies;
* authorization headers;
* cookies;
* private query parameters.

Logging should be purpose-driven.

---

# 82. Error Handling

Unexpected errors MUST NOT expose:

* stack traces;
* database queries;
* secrets;
* filesystem paths;
* internal infrastructure details

to ordinary production clients.

---

# 83. Error Correlation

Internal errors MAY use safe correlation identifiers to connect User-visible failures with operational logs.

---

# 84. Personal Data

Mosaic SHOULD collect only personal data necessary for legitimate Product and operational purposes.

Initial private identity data includes at least:

```text
Email
Authentication data
Security/session metadata
```

Exact data inventory will evolve with implementation.

---

# 85. Public vs Private Identity

Mosaic must preserve the separation between:

```text
Public Profile
```

and:

```text
Private Account
```

Public Profile APIs MUST NOT expose private Account fields.

---

# 86. Data Classification

Mosaic SHOULD conceptually distinguish data classes such as:

```text
Public
Private
Sensitive Operational
Privileged / Administrative
Security Secret
```

Exact classification policy may be formalized as implementation grows.

---

# 87. Data Minimization

Persistence, APIs, logs, Search indexes, analytics, and monitoring SHOULD avoid copying sensitive information without a defined need.

---

# 88. Behavioral Data

Behavioral signals such as:

* Saves;
* Search activity;
* views;
* customization behavior;
* recommendation interactions

may reveal User interests.

They SHOULD be treated as private unless Product policy explicitly makes a signal public.

---

# 89. Analytics

Analytics MUST NOT silently redefine private Product actions as public information.

Analytics collection should follow:

* minimization;
* purpose limitation;
* retention policy;
* access control.

---

# 90. Data Retention

🟡 **Open Privacy/Operational Decision**

Exact retention periods remain undefined for:

* deleted Accounts;
* sessions;
* logs;
* Search queries;
* moderation evidence;
* audit records;
* orphaned Media;
* analytics.

Retention should follow Product, operational, privacy, security, and legal requirements.

---

# 91. Account Deletion

Account deletion must distinguish between:

```text
Identity removal
```

and:

```text
Historical creative integrity
```

where Mosaic legitimately preserves public creative history through a safe historical identity placeholder.

Private identity data SHOULD NOT remain exposed merely to preserve Lineage.

---

# 92. Deleted User Representation

Where Product rules preserve historical content after Account deletion, public references may use a neutral representation such as:

```text
Deleted User
```

without exposing deleted private Account data.

---

# 93. Content Deletion

Content deletion, moderation removal, and physical data destruction are separate technical concepts.

Security and privacy workflows must preserve this distinction.

---

# 94. Data Export

🔮 **Future / Legal Requirement**

Mosaic may require User data export capabilities.

The exact workflow depends on Product and applicable legal requirements.

---

# 95. Privacy Requests

🔮 **Future / Legal Requirement**

Mosaic may require workflows for:

* data access;
* correction;
* deletion;
* portability;
* other privacy rights.

These should be designed against applicable legal obligations before production operation.

---

# 96. Encryption in Transit

Sensitive Mosaic network communication MUST use encrypted transport in production.

This includes:

* browser ↔ application;
* application ↔ managed infrastructure where applicable;
* Media upload/delivery where applicable.

---

# 97. Encryption at Rest

Mosaic SHOULD use appropriate encryption-at-rest capabilities for:

* database storage;
* object storage;
* backups;
* other sensitive persistent systems.

Exact key-management strategy remains open.

---

# 98. Application-Level Encryption

🟡 **Open Security Decision**

Not every database field requires application-level encryption.

Field-level encryption may be introduced for data whose threat model justifies additional protection beyond infrastructure encryption.

---

# 99. Backups

Backups may contain sensitive data.

Backup access MUST be restricted and retention controlled.

Deleting production data without considering retained backups may not constitute immediate physical erasure from all recovery systems.

---

# 100. Dependency Security

Third-party dependencies introduce supply-chain risk.

Mosaic SHOULD:

* keep dependencies intentional;
* review security advisories;
* update vulnerable dependencies;
* avoid unnecessary packages;
* use lockfiles where supported.

---

# 101. Dependency Automation

Automated dependency alerts and update tooling MAY be used.

Automatic merging of security-sensitive dependency changes should still respect testing and review requirements.

---

# 102. Framework Security

Mosaic SHOULD follow security guidance for the selected framework rather than bypassing built-in protections without justification.

---

# 103. External Providers

External services MUST be treated as separate trust boundaries.

Potential providers include:

```text
Email
Object Storage
Media Processing
Hosting
Monitoring
Future AI integrations
```

Only required data should be shared with each provider.

---

# 104. Provider Credentials

External-provider credentials MUST remain protected and scoped according to operational need.

---

# 105. Webhooks

If external providers send webhooks, Mosaic MUST authenticate or otherwise verify them according to provider capabilities.

Webhook payloads MUST NOT be trusted solely because they reach a known endpoint.

---

# 106. Webhook Replay

Security-sensitive webhooks SHOULD consider replay protection where supported or required.

---

# 107. Background Jobs

Background workers operate inside Mosaic's trusted infrastructure but still require controlled permissions.

A worker should not receive broader access than its responsibilities require where practical.

---

# 108. Job Payload Privacy

Background-job payloads SHOULD avoid copying sensitive data unnecessarily.

Where possible, jobs may reference stable identifiers and retrieve authorized state at execution time.

---

# 109. Queue Security

If a dedicated queue is introduced, it MUST NOT be publicly writable or readable by unauthorized clients.

---

# 110. Rate Limiting

Mosaic SHOULD apply rate and abuse controls based on endpoint risk.

Sensitive categories include:

```text
Authentication
Registration
Password Reset
Search
Comments
Likes
Follows
Saves
Reports
Media Upload
Administrative Operations
```

---

# 111. Rate-Limit Identity

Rate limiting may consider:

* Account;
* session;
* IP/network signals;
* resource;
* endpoint category.

No single identifier is sufficient for every abuse scenario.

---

# 112. Exact Limits

🟡 **Open Operational Decision**

Rate-limit values remain undefined.

They should be informed by:

* expected legitimate usage;
* infrastructure cost;
* observed abuse;
* User experience.

---

# 113. Abuse Prevention

Security controls SHOULD address behavior such as:

* spam;
* mass following;
* mass commenting;
* automated scraping;
* report abuse;
* credential attacks;
* upload abuse.

Moderation and Security cooperate but remain distinct responsibilities.

---

# 114. Security vs Moderation

Security protects systems, identities, permissions, and infrastructure.

Moderation governs community content and behavior.

Example:

```text
SQL injection
    ↓
Security
```

while:

```text
Harassing Comment
    ↓
Moderation
```

Some abuse scenarios may involve both.

---

# 115. Blocking

Blocking is a User-level Product control.

It MUST NOT be treated as a replacement for authorization or Moderation.

Exact interaction restrictions remain an open Product decision.

---

# 116. Security Events

Potential security-relevant events include:

```text
Repeated failed authentication
Password changed
Email changed
Privilege changed
Suspicious session activity
Administrative security action
```

Mosaic MAY record and notify Users about relevant events according to Product policy.

---

# 117. Security Notifications

Critical Account-security notifications should not be treated as ordinary optional social notifications.

Exact notification rules remain open.

---

# 118. Incident Detection

Operational monitoring SHOULD make meaningful security failures detectable.

Potential examples include:

* unusual authentication failures;
* privilege-assignment anomalies;
* excessive upload failures;
* authorization errors;
* suspicious administrative actions.

---

# 119. Incident Response

🔮 **Future Operational Requirement**

Before production operation at meaningful scale, Mosaic should establish an incident-response process covering:

```text
Detection
Containment
Investigation
Recovery
Communication
Follow-up
```

This does not require enterprise security infrastructure during initial development.

---

# 120. Vulnerability Reporting

🔮 **Future Possibility**

Mosaic may later publish a security contact or vulnerability-disclosure process.

---

# 121. Security Testing

Security-sensitive functionality SHOULD receive automated testing where practical.

Priority areas include:

```text
Authentication
Authorization
Ownership
Role permissions
Private resources
Upload authorization
Moderation
Administration
```

---

# 122. Authorization Tests

Tests SHOULD verify both:

```text
Allowed actor succeeds
```

and:

```text
Unauthorized actor fails
```

Testing only successful paths is insufficient for authorization logic.

---

# 123. Object Access Tests

Mosaic SHOULD specifically test attempts to access another User's resources by changing identifiers.

Examples include:

```text
Draft
Collection
Notification
Private customization
Administrative case
```

---

# 124. Security Review

High-risk features SHOULD receive focused security review before production release.

Potential examples include:

* authentication;
* password reset;
* Media uploads;
* role assignment;
* administrative tools;
* external webhooks.

---

# 125. Automated Security Tooling

Mosaic MAY use:

* dependency scanning;
* static analysis;
* secret scanning;
* container scanning;
* dynamic testing.

Tooling should support engineering judgment rather than replace it.

---

# 126. Secret Scanning

Repository secret scanning SHOULD be enabled where practical.

If a secret is committed, removing the line from Git history does not automatically make the credential safe.

The credential should be considered for rotation.

---

# 127. Development Security

Local development SHOULD avoid requiring real production credentials or production User data.

Development fixtures should use synthetic or appropriately sanitized data.

---

# 128. Production Data Access

Direct production-data access SHOULD be limited to legitimate operational needs.

Administrative Product access should use controlled application interfaces rather than routine raw database editing.

---

# 129. Database Access

Production database credentials SHOULD follow least privilege.

Application runtime, migrations, operational tooling, and human access MAY use separate permissions where justified.

---

# 130. Migration Security

Database migrations must not accidentally expose or destroy protected data.

Sensitive migrations SHOULD be reviewed and recoverable according to deployment strategy.

---

# 131. Object Storage Isolation

Storage paths or keys SHOULD be generated by trusted application logic.

User filenames MUST NOT provide arbitrary storage-path control.

---

# 132. Search Infrastructure Access

If Mosaic later introduces dedicated Search infrastructure, ordinary clients SHOULD access it through Mosaic's trusted Search interface unless direct client Search access is explicitly designed to preserve authorization.

---

# 133. Cache Security

Caches MUST NOT leak personalized or private responses between Users.

Cache keys and policies must account for:

* authentication;
* authorization;
* visibility;
* viewer-specific state.

---

# 134. CDN Security

Media/CDN caching must respect Media availability and privacy.

Private Media MUST NOT become permanently public through an incorrectly configured cache.

---

# 135. Cache Invalidation

Security-sensitive visibility changes SHOULD propagate to caches within an appropriate operational timeframe.

Exact guarantees depend on infrastructure.

---

# 136. Error-Based Information Leakage

Errors SHOULD avoid revealing whether inaccessible private resources exist when such disclosure creates security or privacy risk.

The application may intentionally use indistinguishable responses in selected cases.

---

# 137. Enumeration Protection

Potentially enumerable resources include:

```text
Accounts
Emails
Usernames
Password reset targets
Private object identifiers
```

Not all enumeration is equally sensitive.

Protection should reflect actual risk.

---

# 138. Resource Identifiers

Public resource identifiers SHOULD avoid encoding sensitive information.

Identifier unpredictability MAY reduce casual enumeration but MUST NOT replace authorization.

---

# 139. UUID / Identifier Strategy

The exact identifier format remains defined by the Data Model architecture.

Regardless of format:

> **Knowing an identifier does not grant access.**

---

# 140. Security Logging

Security-relevant events SHOULD be distinguishable from ordinary application logs where useful.

Logs should support investigation without becoming a repository of unnecessary private data.

---

# 141. Audit vs Operational Logs

Operational logs answer:

```text
What is the system doing?
```

Audit records answer:

```text
Who performed a sensitive action,
on what,
and with what result?
```

They may use different retention and access policies.

---

# 142. Clock Consistency

Security and audit events rely on meaningful timestamps.

Infrastructure SHOULD maintain sufficiently consistent system time for:

* session expiration;
* token expiration;
* audit ordering;
* log correlation.

---

# 143. Fail Securely

When security-critical authorization or policy state cannot be reliably determined, the application SHOULD prefer denying the sensitive action rather than granting access by assumption.

---

# 144. Graceful Failure

Failing securely does not require the entire application to fail.

Example:

```text
Administrative authorization dependency fails
        ↓
Administrative action denied
        ↓
Public Creation browsing may remain available
```

---

# 145. Security and Availability

Security controls SHOULD avoid creating unnecessary global single points of failure.

The architecture should balance:

```text
Confidentiality
Integrity
Availability
```

according to resource sensitivity.

---

# 146. Security and Historical Integrity

Security operations MUST NOT silently rewrite creative history.

Examples:

```text
Account blocked
        ≠
Lineage deleted
```

```text
Creation moderated
        ≠
Parent relationship rewritten
```

Historical preservation remains subject to legitimate privacy, legal, and security requirements.

---

# 147. Security and Derived Systems

Search, caches, Notifications, analytics, and indexes are derived systems.

Security-sensitive authoritative changes must propagate appropriately to them.

Example:

```text
Creation becomes unavailable
        ↓
Search removes visibility
        ↓
Cache invalidates
        ↓
Media delivery restricts
```

---

# 148. Privacy by Design

Private state SHOULD remain private unless Product behavior explicitly makes it public.

Examples:

```text
Save
Draft
Private customization
Email
Session
Search behavior
Administrative notes
```

Public exposure must be intentional.

---

# 149. Security by Design

Security should be part of domain and architecture decisions rather than applied only after implementation.

Examples include:

```text
Ownership in Data Model
Authorization in Application Layer
Upload isolation in Media architecture
Auditability in Administration
Visibility in Search
```

---

# 150. Security Decisions

## SEC-ADR-001 — Session-Oriented Authentication

**Status:** ✅ Decided

Mosaic's initial first-party web application will use a session-oriented authentication model.

---

## SEC-ADR-002 — Secure Cookie Transport Direction

**Status:** ✅ Decided

Browser session authentication will prefer secure `HttpOnly` cookie transport unless a later architectural requirement demonstrates a better mechanism.

---

## SEC-ADR-003 — Server-Side Authorization

**Status:** ✅ Decided

Protected actions and resource access will be authorized at trusted application boundaries.

---

## SEC-ADR-004 — Object-Level Authorization

**Status:** ✅ Decided

Authentication alone does not grant access to arbitrary resources.

Authorization will consider the target resource and actor relationship.

---

## SEC-ADR-005 — Least Privilege

**Status:** ✅ Decided

User, Moderator, Administrator, infrastructure, and provider permissions should follow least privilege.

---

## SEC-ADR-006 — Untrusted Input

**Status:** ✅ Decided

Client input, User content, uploads, external URLs, and external provider data are treated as untrusted until appropriately validated.

---

## SEC-ADR-007 — Secrets Outside Source Control

**Status:** ✅ Decided

Security secrets will not be intentionally committed to the repository.

---

## SEC-ADR-008 — Private by Default for Private State

**Status:** ✅ Decided

Private Product state will not become publicly exposed merely because the system stores or processes it.

---

## SEC-ADR-009 — Security-Sensitive Actions Are Auditable

**Status:** ✅ Decided

High-impact privileged and security-sensitive operations will support meaningful auditability.

---

## SEC-ADR-010 — Derived Systems Do Not Override Authorization

**Status:** ✅ Decided

Search indexes, caches, analytics, Notifications, and other derived systems cannot redefine authoritative access rules.

---

# 151. Open Security Decisions

| Decision                            | Status                             |
| ----------------------------------- | ---------------------------------- |
| Authentication library/provider     | 🟡 Open                            |
| Session persistence mechanism       | 🟡 Open                            |
| Session idle timeout                | 🟡 Open                            |
| Session absolute lifetime           | 🟡 Open                            |
| Multiple-session behavior           | 🟡 Open                            |
| Session-management UI               | 🟡 Open                            |
| Exact SameSite policy               | 🟡 Open                            |
| Exact CSRF mechanism                | 🟡 Open                            |
| Password hashing implementation     | 🟡 Open Implementation Decision    |
| Password policy                     | 🟡 Open Product/Security Decision  |
| Email-verification requirements     | 🟡 Open Product Decision           |
| MFA                                 | 🔮 Future Possibility              |
| Privileged-role MFA                 | 🟡 Open Security Decision          |
| Re-authentication requirements      | 🟡 Open                            |
| High-risk action safeguards         | 🟡 Open                            |
| Rich-text sanitization strategy     | 🟡 Open if Rich Text is introduced |
| Malware scanning                    | 🟡 Open                            |
| Media resource limits               | 🟡 Open                            |
| Rate-limit values                   | 🟡 Open                            |
| External-link policy                | 🟡 Open                            |
| Data-retention periods              | 🟡 Open                            |
| Application-level encryption        | 🟡 Open                            |
| Key-management strategy             | 🟡 Open                            |
| Privacy request workflows           | 🟡 Open / Legal                    |
| Security-event notifications        | 🟡 Open                            |
| Incident-response process           | 🔮 Future Operational Requirement  |
| Vulnerability-disclosure process    | 🔮 Future Possibility              |
| Blocking visibility matrix          | 🟡 Open Product Decision           |
| Private Accounts / Creations        | 🟡 Open Product Decision           |
| Administrator bootstrap             | 🟡 Open                            |
| Administrator assignment safeguards | 🟡 Open                            |

These decisions MUST NOT be silently finalized through implementation convenience.

---

# 152. Security Architecture Summary

Mosaic's trusted request path follows:

```text
                    UNTRUSTED CLIENT
                           │
                           ▼
                         HTTPS
                           │
                           ▼
                     APPLICATION
                           │
                  ┌────────┴────────┐
                  │                 │
            Authentication      Validation
                  │                 │
                  └────────┬────────┘
                           │
                     Authorization
                           │
                           ▼
                    Domain Operation
                           │
                ┌──────────┼──────────┐
                │          │          │
             Database    Storage   Background
                │          │          │
                └──────────┼──────────┘
                           │
                           ▼
                 Audit / Observability
```

Privacy follows:

```text
Private Account Data
        │
        ├── Trusted Application
        │
        └── Authorized Operations

Public Profile Data
        │
        └── Public Product Surfaces
```

Privileged access follows:

```text
Authenticated User
        ↓
Role
        ↓
Capability
        ↓
Resource Authorization
        ↓
Sensitive Action
        ↓
Audit Record
```

The architecture prioritizes:

```text
Server-side authorization
          +
Least privilege
          +
Secure sessions
          +
Input validation
          +
Private-state protection
          +
Upload isolation
          +
Secret protection
          +
Auditability
          +
Defense in depth
```

rather than:

```text
Frontend-only restrictions
          +
Permanent browser tokens
          +
Implicit privilege
          +
Public storage credentials
          +
Unvalidated uploads
          +
Secrets in source code
```

The central principle is:

> **Every request is untrusted until Mosaic establishes who is acting, what they may do, and whether the requested state transition is valid.**

---

# Related Documentation

## Product

* [User Identity](../01-product/user-identity.md)
* [Publications](../01-product/publications.md)
* [Collections](../01-product/collections.md)
* [Notifications](../01-product/notifications.md)
* [Moderation & Trust](../01-product/moderation.md)
* [Administration](../01-product/administration.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Search](./search.md)
* [Scalability →](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Search](./search.md) · [Documentation Home](../README.md) · **Next:** [Scalability →](./scalability.md)
