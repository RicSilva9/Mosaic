# Media Storage

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Security & Infrastructure
> **Last updated:** September 2026

---

## Overview

This document defines Mosaic's technical strategy for storing, processing, and delivering generated media.

Media is one of the most infrastructure-intensive parts of Mosaic.

Unlike ordinary structured application data, video and other generated-media files introduce concerns such as:

* large uploads;
* storage growth;
* bandwidth;
* processing;
* validation;
* delivery performance;
* previews;
* thumbnails;
* security;
* lifecycle management;
* failure recovery.

Mosaic therefore separates:

```text
Structured Media Metadata
          ↓
Relational Database

Large Media Objects
          ↓
Object Storage
```

The database remains authoritative for Mosaic's Media records.

Object storage contains the binary objects referenced by those records.

---

# 1. Media Architectural Decision

Mosaic will use:

> **Dedicated object storage for large media objects**

rather than storing generated video binaries as ordinary relational database values.

The specific storage provider remains undecided.

---

# 2. Why Object Storage

Generated media differs significantly from ordinary relational data.

Videos may be:

* large;
* streamed or downloaded differently;
* processed asynchronously;
* replicated or cached;
* transformed into additional representations;
* delivered through specialized infrastructure.

Object storage is better suited to these characteristics than ordinary relational rows.

---

# 3. Database Responsibility

The relational database stores authoritative Media metadata.

Conceptually:

```text
Media
├── Stable ID
├── Creation
├── Purpose / Role
├── Media Type
├── Storage Reference
├── Processing State
├── Availability State
├── Metadata
├── Created At
└── Updated At
```

The exact schema will be refined during implementation.

---

# 4. Object Storage Responsibility

Object storage contains binary objects such as:

```text
Original uploaded video
Processed video
Thumbnail
Preview
Future media derivatives
```

An object-storage object is not itself a Mosaic domain entity.

The Mosaic `Media` record provides the domain relationship.

---

# 5. Media Identity

Media identity MUST NOT depend on:

* local filesystem path;
* temporary signed URL;
* CDN URL;
* original User filename.

A stable Mosaic Media identifier should represent the resource internally.

---

# 6. Storage References

The Media record SHOULD store a stable storage reference.

Conceptually:

```text
Media
  │
  └── Storage Key
          ↓
      Object Storage
```

Example conceptual storage key:

```text
media/<internal-id>/original
```

This is illustrative only.

The final key structure will depend on the selected storage provider and implementation.

---

# 7. URLs Are Not Identity

Temporary or delivery URLs MUST NOT be treated as stable Media identity.

For example:

```text
https://cdn.example/...signed...
```

may expire or change.

Mosaic should be capable of generating or resolving delivery locations from stable internal Media state.

---

# 8. Creation and Media

A Creation may reference one or more Media records.

Conceptually:

```text
Creation
   │
   ├── Media A
   ├── Media B
   └── Media C
```

The initial Product experience may primarily use one generated video.

The technical model should not permanently enforce:

```text
Creation = exactly one video
```

---

# 9. Media Roles

Different Media records may serve different purposes.

Potential roles include:

```text
Original
Primary
Thumbnail
Preview
Processed Variant
```

🟡 **Open Technical Decision**

The exact role model has not yet been finalized.

Potential approaches include:

* role field;
* explicit relationships;
* derivative relationships;
* separate asset classes.

---

# 10. Primary Media

A Creation may need one Media asset designated as its primary presentation.

Conceptually:

```text
Creation
   │
   └── Primary Media
```

The exact persistence strategy remains open.

---

# 11. Original Media Preservation

Where operationally reasonable, Mosaic SHOULD distinguish the originally accepted upload from generated delivery derivatives.

Conceptually:

```text
Original Upload
      ↓
Processing
      ↓
Delivery Variant
```

This allows delivery optimization without pretending the transformed file is the original upload.

---

# 12. Media Derivatives

Media processing may create derived technical assets.

Examples include:

* thumbnail;
* poster frame;
* preview clip;
* optimized playback version;
* alternate resolution;
* alternate encoding.

These are:

> **technical media derivatives**

They are not:

> **creative Creation derivatives**

Therefore:

```text
Media transformation
```

MUST NOT create Mosaic Lineage.

---

# 13. Media Derivative Relationship

Technical derivatives SHOULD remain traceable to their source Media asset where useful.

Conceptually:

```text
Original Media
     │
     ├── Thumbnail
     ├── Preview
     └── Playback Variant
```

Exact persistence may be relational or metadata-based.

---

# 14. Upload Architecture

Large media uploads SHOULD avoid unnecessarily passing the complete binary payload through ordinary application processing when direct object-storage upload is appropriate.

Preferred conceptual flow:

```text
Client
  ↓
Request Upload Authorization
  ↓
Mosaic validates request
  ↓
Temporary Upload Capability
  ↓
Client
  ↓
Object Storage
  ↓
Upload Completed
  ↓
Mosaic verifies / confirms object
  ↓
Processing
```

This reduces unnecessary application-server bandwidth and memory pressure.

---

# 15. Upload Authorization

Direct upload does not mean public write access.

Mosaic MUST authorize upload creation.

Upload authorization SHOULD be:

* limited to the requesting User;
* limited in scope;
* temporary;
* associated with expected Media;
* constrained where supported.

---

# 16. Upload Intent

Before accepting a Media upload, Mosaic SHOULD know enough context to determine whether the User is allowed to perform it.

Potential context includes:

```text
Authenticated User
Creation / Draft
Expected Media Type
Upload Purpose
```

The exact workflow depends on Creation publication design.

---

# 17. Temporary Upload Capability

The client MAY receive a temporary provider-specific upload capability.

Examples could include:

* signed upload URL;
* temporary upload token;
* provider upload session.

The Product domain SHOULD remain independent from which mechanism the selected provider uses.

---

# 18. Upload Confirmation

Client-reported upload success MUST NOT automatically be trusted as proof that a valid Media object exists.

Mosaic SHOULD verify required storage and Media state before treating the asset as ready.

---

# 19. Upload State

Media upload may require states conceptually equivalent to:

```text
PENDING
UPLOADING
UPLOADED
PROCESSING
READY
FAILED
```

These names are illustrative.

The final state machine will be determined during implementation.

---

# 20. Creation Publication and Media State

Mosaic must define what Media state is required before a Creation can become publicly available.

Potential models include:

```text
Upload → Process → Ready → Publish
```

or:

```text
Upload → Publish as Processing → Ready later
```

🟡 **Open Technical/Product Decision**

The initial publication behavior should be chosen after the media-processing requirements are known.

The system MUST NOT expose a broken public Creation merely because an upload record exists.

---

# 21. File Validation

Uploaded files MUST be treated as untrusted input.

Validation may include:

* declared media type;
* actual file signature;
* supported container;
* supported codec;
* file size;
* duration;
* dimensions;
* processing validity.

The final validation rules depend on the initial supported media specification.

---

# 22. MIME Type

Client-provided MIME type MUST NOT be treated as sufficient proof of file content.

Where security or processing requires it, Mosaic SHOULD inspect or validate actual file characteristics.

---

# 23. Filename

Original filenames MAY be retained as non-authoritative metadata if useful.

They MUST NOT be trusted for:

* authorization;
* Media identity;
* storage isolation;
* file-type validation.

---

# 24. Supported Media

Video is Mosaic's initial primary media type.

However, the technical Media model SHOULD remain capable of supporting additional generated-media types in the future.

🔮 **Future Possibility**

Examples might include:

```text
Image
Audio
Other generated media
```

Support for these types is not part of the initial Product commitment.

---

# 25. Initial Video Formats

🟡 **Open Technical Decision**

The exact accepted:

* containers;
* codecs;
* resolutions;
* frame rates;
* audio formats

have not yet been selected.

These should be chosen based on browser compatibility, processing strategy, infrastructure, and User experience.

---

# 26. File Size Limit

🟡 **Open Decision**

The maximum upload size has not yet been defined.

It should be determined using:

* expected AI-generated video duration;
* resolution;
* bandwidth;
* storage cost;
* processing cost;
* upload reliability;
* target User experience.

The project MUST NOT invent an arbitrary limit before this analysis.

---

# 27. Duration Limit

🟡 **Open Decision**

Maximum video duration remains undefined.

This is both a Product and infrastructure decision.

---

# 28. Resolution Limit

🟡 **Open Decision**

Maximum accepted resolution remains undefined.

Mosaic may later choose to:

* reject unsupported resolutions;
* accept and downscale;
* preserve original and generate optimized variants.

---

# 29. Processing Architecture

Media processing SHOULD be asynchronous when processing time is unsuitable for an ordinary interactive request.

Conceptually:

```text
Upload Accepted
      ↓
Processing Job
      ↓
Validate
      ↓
Inspect Metadata
      ↓
Generate Required Derivatives
      ↓
Media Ready
```

---

# 30. Background Processing

Media processing is a strong candidate for Mosaic's background-work infrastructure.

Potential tasks include:

* metadata extraction;
* technical validation;
* thumbnail generation;
* preview generation;
* transcoding;
* safety scanning;
* cleanup.

Not all tasks are mandatory for the initial implementation.

---

# 31. Processing Isolation

Media-processing workloads SHOULD be isolated sufficiently that expensive processing does not unnecessarily degrade ordinary application requests.

This does not require a separate microservice.

For example, a Modular Monolith may still operate:

```text
Application Process
       +
Background Worker Process
```

from the same codebase.

---

# 32. Processing Idempotency

Retrying a Media processing job SHOULD avoid creating uncontrolled duplicate derivatives.

Processing operations should be idempotent where practical.

---

# 33. Processing Failure

Processing failure MUST produce an observable Media state.

The User-facing application should be capable of communicating that processing failed rather than leaving the Media permanently appearing to load.

---

# 34. Processing Retry

Recoverable processing failures MAY be retried automatically.

Retry policy should consider:

* failure type;
* processing cost;
* attempt count;
* infrastructure health.

Permanent invalid-media failures SHOULD NOT retry indefinitely.

---

# 35. Failed Work

Background infrastructure SHOULD provide a way to identify processing jobs that could not complete successfully.

The exact failed-job strategy will depend on the selected job infrastructure.

---

# 36. Media Metadata

Useful Media metadata may include:

```text
Media Type
Container
Codec
Width
Height
Duration
Frame Rate
File Size
Audio Presence
Processing State
```

Exact metadata fields will be determined from actual Product and processing needs.

---

# 37. Metadata Authority

Technical metadata extracted by trusted Media processing SHOULD generally be preferred over untrusted client claims.

Example:

```text
Client says duration = 8 seconds
```

does not necessarily make that value authoritative.

---

# 38. Thumbnail

Mosaic SHOULD support lightweight visual representations for video discovery surfaces.

A thumbnail may be generated from the video or supplied through another controlled workflow.

The exact thumbnail strategy remains open.

---

# 39. Poster Frame

A video presentation MAY use a poster frame before playback.

The implementation may reuse:

* thumbnail;
* dedicated poster image;
* generated frame.

This is a delivery decision rather than a core domain requirement.

---

# 40. Preview Media

Mosaic MAY generate lightweight previews for discovery-heavy interfaces.

Potential benefits include:

* reduced bandwidth;
* faster browsing;
* lower playback startup cost.

Whether previews are necessary for the initial version should be determined through implementation and performance testing.

---

# 41. Transcoding

🟡 **Open Technical Decision**

Mosaic has not yet decided whether all uploaded videos will be transcoded.

Potential strategies include:

```text
Accept only directly playable formats
```

or:

```text
Accept broader formats
        ↓
Transcode to standardized delivery format
```

or a hybrid approach.

The decision has significant infrastructure and cost implications.

---

# 42. Adaptive Streaming

🔮 **Future Possibility**

Adaptive bitrate streaming may become useful if:

* videos become longer;
* traffic becomes significant;
* device/network diversity requires it.

It is not assumed to be necessary for the initial implementation.

---

# 43. Media Delivery

Public Media should be delivered using infrastructure appropriate for large static objects.

Conceptually:

```text
User
 ↓
Delivery Layer
 ↓
Object Storage
```

rather than forcing every playback byte through Mosaic's ordinary application logic.

---

# 44. CDN

A Content Delivery Network MAY be introduced for Media delivery.

Potential benefits include:

* geographic caching;
* lower origin load;
* reduced latency;
* improved scalability.

🟡 **Open Technical Decision**

The initial CDN strategy depends on the selected object-storage and hosting providers.

---

# 45. Public Media Access

Mosaic must decide how publicly visible Creation Media is delivered.

Potential approaches include:

```text
Public object
```

or:

```text
Controlled / signed delivery
```

or:

```text
CDN-controlled access
```

🟡 **Open Security/Infrastructure Decision**

The choice must consider:

* public content behavior;
* moderation;
* removal;
* hotlinking;
* cost;
* privacy;
* caching.

---

# 46. Private Media

If Mosaic later supports private Creations or other private Media, those assets MUST NOT become accessible merely because someone knows a storage URL.

Access control must extend to the delivery mechanism.

---

# 47. Signed Delivery URLs

Signed URLs MAY be used where controlled access is required.

If used, they should:

* expire;
* be scoped appropriately;
* avoid becoming persistent Media identity.

---

# 48. Media Removal

When a Creation becomes unavailable, Mosaic must update Media delivery behavior according to the relevant Product and moderation rules.

This may require:

* preventing new delivery authorization;
* invalidating cached access where practical;
* restricting source Media;
* retaining evidence where legitimately required.

---

# 49. Removal Is Not Always Immediate Physical Deletion

A Creation becoming unavailable does not necessarily mean its Media object must be physically destroyed immediately.

Reasons may include:

* moderation Appeals;
* audit requirements;
* recovery;
* retention policy;
* legal obligations.

Availability and physical retention are separate concepts.

---

# 50. Media Lifecycle

Conceptually:

```text
Upload
  ↓
Validate
  ↓
Process
  ↓
Ready
  ↓
Available
  ↓
Restricted / Removed / Retained
  ↓
Eventually Deleted where appropriate
```

Exact lifecycle policies remain to be defined.

---

# 51. Orphaned Uploads

Uploads may occur without successful Creation publication.

Example:

```text
Upload completed
      ↓
User abandons Draft
```

This can produce orphaned storage objects.

Mosaic SHOULD have a strategy for identifying and eventually removing abandoned Media where appropriate.

---

# 52. Orphan Cleanup

Orphan cleanup SHOULD use conservative rules that avoid deleting Media still associated with valid User work.

Potential factors include:

* Media state;
* Draft relationship;
* age;
* active processing;
* publication relationship.

Exact retention windows remain open.

---

# 53. Failed Upload Cleanup

Incomplete or failed multipart/provider upload sessions SHOULD eventually be cleaned up where the selected storage infrastructure requires it.

---

# 54. Storage Consistency

Mosaic must handle temporary inconsistency between:

```text
Database Media record
```

and:

```text
Object-storage object
```

Examples include:

```text
Database record exists
but upload failed
```

or:

```text
Object exists
but final database confirmation failed
```

Recovery and cleanup processes should address these states.

---

# 55. Storage Is Not the Source of Domain Truth

Listing objects in a storage bucket MUST NOT define which Media belongs to Mosaic.

The relational domain remains authoritative.

Conceptually:

```text
Database Media Record
        ↓
defines Mosaic relationship

Object Storage
        ↓
stores bytes
```

---

# 56. Upload Security

Upload infrastructure MUST consider threats such as:

* malicious files;
* oversized files;
* decompression/resource attacks where applicable;
* misleading extensions;
* forged MIME types;
* storage abuse;
* unauthorized uploads.

---

# 57. Processing Security

Media processing tools handle untrusted content.

They SHOULD run with appropriately limited privileges and resource controls.

A processing failure MUST NOT provide arbitrary access to unrelated Mosaic data.

---

# 58. Storage Credentials

Object-storage credentials MUST NOT be exposed to ordinary clients.

Clients may receive limited temporary upload or delivery capabilities when required.

---

# 59. Storage Isolation

Storage key design SHOULD reduce accidental collisions and cross-User overwrite risks.

User-provided filenames MUST NOT directly determine trusted storage paths.

---

# 60. Malware Scanning

🟡 **Open Security Decision**

Whether uploaded generated video requires dedicated malware scanning in addition to Media validation will be evaluated in Security.

The architecture should not make future scanning impossible.

---

# 61. Content Safety Analysis

🔮 **Future Possibility**

Media may eventually participate in automated moderation analysis.

Conceptually:

```text
Media Ready
    ↓
Safety Analysis
    ↓
Moderation Signals
```

This should integrate with Mosaic's Moderation domain rather than making Media processing itself the final policy authority.

---

# 62. Moderation Evidence

Media associated with moderation cases may require controlled retention beyond ordinary public availability.

Any such retention must follow:

* privacy;
* security;
* policy;
* legal requirements.

Exact retention periods remain open.

---

# 63. Appeals

If content is removed but eligible for Appeal, immediate irreversible deletion of the only Media copy could prevent meaningful restoration.

Media lifecycle policy SHOULD therefore account for valid Appeal windows where appropriate.

---

# 64. Restoration

Successful restoration should be capable of making the existing Media relationship available again where the retained Media remains valid.

Restoration MUST NOT create a new Creation solely to restore Media.

---

# 65. Storage Cost

Media storage is expected to be a major variable infrastructure cost.

Architecture SHOULD allow measurement of:

* stored bytes;
* bandwidth;
* processing volume;
* derivative count;
* upload volume.

Exact billing controls depend on the selected provider.

---

# 66. Bandwidth Cost

Discovery-heavy video platforms can consume significant delivery bandwidth.

Mosaic SHOULD consider:

* preview optimization;
* lazy loading;
* delivery caching;
* reasonable autoplay behavior;
* derivative sizing.

These choices will be refined during frontend and infrastructure implementation.

---

# 67. Autoplay

🟡 **Open Product/UX Decision**

This technical document does not decide whether videos automatically play in feeds.

That decision affects:

* bandwidth;
* performance;
* accessibility;
* User experience.

---

# 68. Lazy Loading

Media-heavy discovery surfaces SHOULD avoid eagerly loading every full Media asset outside the useful viewing context.

Exact frontend behavior belongs to implementation.

---

# 69. Media Prefetching

Prefetching MAY improve perceived performance but can waste bandwidth.

It should be introduced only where measurements show benefit.

---

# 70. Storage Quotas

🟡 **Open Product/Operational Decision**

Mosaic has not yet defined:

* per-User storage quotas;
* upload count limits;
* Draft storage limits;
* total account Media limits.

These should be defined when operating cost and abuse models are better understood.

---

# 71. Duplicate Media

Mosaic does not initially require global binary deduplication.

Two Users may legitimately upload identical binary content while maintaining independent Creation relationships.

Storage deduplication MAY later be introduced as an infrastructure optimization without changing Product ownership or authorship semantics.

---

# 72. Checksums

Media objects MAY use checksums or content hashes for:

* upload verification;
* corruption detection;
* processing idempotency;
* optional deduplication.

A checksum MUST NOT be interpreted as proof of creative authorship.

---

# 73. Backup Strategy

Object-storage durability does not automatically replace a deliberate backup and recovery strategy.

The required backup strategy depends on:

* provider guarantees;
* versioning;
* deletion protection;
* retention requirements;
* cost.

Exact policy will be defined in Deployment and recovery planning.

---

# 74. Storage Versioning

🟡 **Open Infrastructure Decision**

Provider-level object versioning MAY be used for operational recovery.

If enabled, storage versions are technical infrastructure versions.

They MUST NOT be confused with Creation evolution.

---

# 75. Geographic Storage

🟡 **Open Infrastructure/Privacy Decision**

The geographic region or regions where Media is stored remain undecided.

This choice may depend on:

* hosting provider;
* User geography;
* latency;
* cost;
* legal requirements;
* data residency.

---

# 76. Encryption in Transit

Media upload and delivery MUST use encrypted transport in production.

---

# 77. Encryption at Rest

Stored Media SHOULD use appropriate encryption-at-rest capabilities provided by the selected storage architecture.

Exact key-management strategy remains to be defined.

---

# 78. Access Logging

Storage and delivery infrastructure SHOULD provide enough visibility to investigate operational and security issues where practical.

Logging MUST remain privacy-aware.

---

# 79. Hotlinking

🟡 **Open Infrastructure Decision**

Mosaic may need controls against uncontrolled third-party embedding or bandwidth abuse.

The appropriate solution depends on the final public Media delivery strategy.

---

# 80. Content-Disposition

Download behavior, inline playback behavior, and filename presentation SHOULD be explicitly configured rather than relying on unsafe User-controlled metadata.

---

# 81. Cache Invalidation

If Media becomes restricted or removed, cached delivery may need invalidation.

The exact guarantees depend on:

* CDN provider;
* cache policy;
* delivery URL design;
* moderation requirements.

This should be considered when selecting infrastructure.

---

# 82. Thumbnail Privacy

A restricted Media asset MUST NOT remain meaningfully exposed through an unrestricted thumbnail or preview if Product policy requires the content to become unavailable.

Availability rules apply to derivatives as well as originals.

---

# 83. Derivative Cleanup

When a Media asset is permanently deleted according to policy, associated technical derivatives SHOULD also be cleaned up unless retention requirements apply.

---

# 84. Media Observability

Mosaic SHOULD be able to observe:

* upload failures;
* processing failures;
* processing duration;
* queue backlog;
* storage errors;
* delivery errors;
* derivative failures.

Exact metrics will be defined in Observability.

---

# 85. Media Auditability

Security- or moderation-sensitive Media lifecycle actions SHOULD be traceable where required.

Examples may include:

* moderation restriction;
* administrative removal;
* restoration;
* permanent deletion.

---

# 86. Media Performance

Media delivery SHOULD avoid unnecessarily competing with ordinary API traffic.

Object-storage and delivery infrastructure should handle large binary transfer separately where practical.

---

# 87. Client Compatibility

Delivery formats SHOULD be selected based on supported Mosaic clients.

For the initial web application, browser playback compatibility is an important constraint.

The final supported browser matrix remains open.

---

# 88. Mobile Networks

Media delivery SHOULD account for Users on slower or metered networks.

Potential strategies include:

* previews;
* deferred loading;
* lower-resolution derivatives;
* User playback control.

Not all strategies must exist initially.

---

# 89. Accessibility

Media presentation must consider accessibility requirements.

Potential capabilities may eventually include:

* captions;
* textual descriptions;
* playback controls;
* reduced-motion behavior.

Exact Product requirements remain to be refined.

---

# 90. Processing Tooling

🟡 **Open Technical Decision**

Mosaic has not selected Media processing technology.

Possible implementation categories include:

* FFmpeg-based processing;
* managed Media services;
* provider-specific transformation systems;
* hybrid processing.

The choice should follow actual requirements.

---

# 91. Managed vs Self-Managed Processing

The project will later evaluate:

```text
Managed Media Platform
```

versus:

```text
Mosaic-controlled Processing Workers
```

based on:

* cost;
* complexity;
* flexibility;
* scale;
* operational burden;
* vendor dependence.

No provider is selected here.

---

# 92. Storage Provider Independence

Core Mosaic Media logic SHOULD avoid unnecessary dependence on provider-specific object-storage concepts.

Conceptually:

```text
Media Domain
     ↓
Storage Capability
     ↓
Selected Provider
```

Provider-specific details belong in infrastructure adapters where practical.

---

# 93. Processing Provider Independence

If Mosaic uses managed Media processing, provider-specific behavior SHOULD remain sufficiently isolated that the core Creation and Media domain does not become defined by one vendor.

---

# 94. Media API Relationship

The API layer coordinates Media operations.

Potential capabilities include:

```text
Request upload
Confirm upload
Read Media state
Retry permitted processing
Retrieve delivery information
```

Exact endpoints belong to implementation.

---

# 95. Direct Upload Flow

A likely technical flow is:

```text
1. User starts Creation / Draft

2. Client requests Media upload

3. Mosaic validates:
   - authentication
   - ownership
   - expected Media constraints

4. Mosaic creates pending Media state

5. Mosaic issues temporary upload capability

6. Client uploads directly to object storage

7. Upload completion is confirmed

8. Mosaic verifies storage object

9. Processing job begins

10. Metadata and derivatives are generated

11. Media becomes READY

12. Creation may become publishable according to publication rules
```

This flow is a technical direction, not yet a provider-specific implementation.

---

# 96. Upload Failure Flow

Conceptually:

```text
Upload Started
     ↓
Upload Fails
     ↓
Media = FAILED / INCOMPLETE
     ↓
User may retry where permitted
     ↓
Abandoned data eventually cleaned
```

Failure MUST NOT create a publicly broken Creation.

---

# 97. Processing Failure Flow

Conceptually:

```text
Upload Completed
      ↓
Processing
      ↓
Failure
      ↓
Media Failure State
      ↓
Retry / User Feedback / Cleanup
```

The exact retry UX remains open.

---

# 98. Removal Flow

Conceptually:

```text
Creation becomes unavailable
        ↓
Media access policy updated
        ↓
Derivatives restricted
        ↓
Retention policy evaluated
        ↓
Possible later physical deletion
```

Availability changes should propagate to Media delivery.

---

# 99. Restoration Flow

Conceptually:

```text
Appeal succeeds
      ↓
Existing Creation restored
      ↓
Retained Media validated
      ↓
Media delivery restored
      ↓
Derived systems updated
```

No new Creation is created.

---

# 100. Media Storage Decisions

## MEDIA-ADR-001 — Use Object Storage

**Status:** ✅ Decided

Large generated-media objects will use dedicated object storage.

---

## MEDIA-ADR-002 — Keep Media Metadata Relational

**Status:** ✅ Decided

Authoritative Media metadata and relationships will remain in Mosaic's relational domain.

---

## MEDIA-ADR-003 — Direct Upload Capability

**Status:** ✅ Decided

The architecture will support direct client-to-object-storage uploads through temporary authorized capabilities where appropriate.

---

## MEDIA-ADR-004 — Asynchronous Media Processing

**Status:** ✅ Decided

Media processing may execute asynchronously through background work.

---

## MEDIA-ADR-005 — Stable Internal Media Identity

**Status:** ✅ Decided

Media identity will not depend on temporary URLs or User-provided filenames.

---

## MEDIA-ADR-006 — Technical Derivatives Do Not Create Lineage

**Status:** ✅ Decided

Thumbnails, previews, transcodes, and other technical Media transformations do not create new Creations or creative Lineage.

---

## MEDIA-ADR-007 — Media Availability Separate from Physical Retention

**Status:** ✅ Decided

Making Media unavailable does not necessarily require immediate irreversible physical deletion.

Retention follows moderation, recovery, privacy, and legal requirements.

---

# 101. Open Media Decisions

| Decision                              | Status                      |
| ------------------------------------- | --------------------------- |
| Object-storage provider               | 🟡 Open                     |
| Initial accepted video containers     | 🟡 Open                     |
| Initial accepted codecs               | 🟡 Open                     |
| Maximum file size                     | 🟡 Open                     |
| Maximum duration                      | 🟡 Open                     |
| Maximum resolution                    | 🟡 Open                     |
| Transcoding strategy                  | 🟡 Open                     |
| Thumbnail generation strategy         | 🟡 Open                     |
| Preview generation                    | 🟡 Open                     |
| Primary Media representation          | 🟡 Open                     |
| Media-role model                      | 🟡 Open                     |
| Creation publication while processing | 🟡 Open                     |
| CDN strategy                          | 🟡 Open                     |
| Public vs signed Media delivery       | 🟡 Open                     |
| Media processing technology           | 🟡 Open                     |
| Managed vs self-managed processing    | 🟡 Open                     |
| Malware scanning                      | 🟡 Open                     |
| Orphan retention window               | 🟡 Open                     |
| Moderation evidence retention         | 🟡 Open                     |
| Storage quotas                        | 🟡 Open                     |
| Object-storage versioning             | 🟡 Open                     |
| Geographic storage region             | 🟡 Open                     |
| Hotlink protection                    | 🟡 Open                     |
| Backup / recovery policy              | 🟡 Open                     |
| Autoplay behavior                     | 🟡 Open Product/UX Decision |

---

# 102. Media Architecture Summary

Mosaic's Media architecture follows:

```text
                     MOSAIC CLIENT
                           │
                 Request Upload Access
                           │
                           ▼
                   Mosaic Application
                           │
                    Authorization
                           │
              Temporary Upload Capability
                           │
                           ▼
                      CLIENT
                           │
                     Large Upload
                           │
                           ▼
                    OBJECT STORAGE
                           │
                    Upload Confirmed
                           │
                           ▼
                  BACKGROUND PROCESSING
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Validate      Metadata     Derivatives
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                     MEDIA READY
                           │
                Relational Metadata
                           │
                           ▼
                       CREATION
```

Delivery follows:

```text
Creation
   ↓
Media Record
   ↓
Delivery Authorization / Location
   ↓
CDN / Object Storage
   ↓
User
```

The architecture prioritizes:

```text
Stable identity
      +
Secure uploads
      +
Separate binary storage
      +
Asynchronous processing
      +
Efficient delivery
      +
Recoverable failures
      +
Lifecycle control
```

while avoiding:

```text
Database video blobs
      +
Permanent temporary URLs
      +
Unrestricted storage access
      +
Synchronous heavy processing
      +
Provider lock-in
```

The central rule is:

> **Mosaic owns the Media relationship. Object storage owns the bytes.**

---

# Related Documentation

## Product

* [Publications](../01-product/publications.md)
* [Prompt System](../01-product/prompts.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery & Search](../01-product/discovery.md)
* [Moderation & Trust](../01-product/moderation.md)

## Specification

* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [API](./api.md)
* [Search →](./search.md)
* [Security & Privacy](./security.md)
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← API](./api.md) · [Documentation Home](../README.md) · **Next:** [Search →](./search.md)
