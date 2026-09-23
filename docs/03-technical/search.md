# Search

> **Section:** Technical
> **Status:** Active Technical Specification
> **Audience:** Engineering, Architecture, Product & Technical Contributors
> **Last updated:** September 2026

---

## Overview

This document defines the technical architecture for Search in Mosaic.

Search allows Users to intentionally retrieve relevant public Mosaic content using queries, filters, and supported sorting mechanisms.

Search is related to Discovery, but the concepts are not identical.

Conceptually:

```text
Search
   =
User expresses retrieval intent
```

while:

```text
Discovery
   =
Mosaic presents potentially relevant content
```

and:

```text
Recommendations
   =
Mosaic predicts potentially relevant content
for a particular User or context
```

These systems may share data and signals while remaining separate responsibilities.

---

# 1. Search Architectural Direction

Mosaic will initially favor:

> **Database-backed Search using the selected relational database's appropriate search capabilities**

before introducing a dedicated external Search engine.

This is an architectural direction rather than a permanent limitation.

---

# 2. Why Start with Relational Search

Mosaic's initial Search requirements do not yet justify the operational complexity of a dedicated Search platform.

Beginning with database-backed Search provides:

* fewer infrastructure components;
* simpler deployment;
* simpler local development;
* simpler consistency;
* lower operational cost;
* easier debugging;
* faster initial implementation.

A dedicated Search system should be introduced when concrete requirements justify it.

---

# 3. Dedicated Search Engine

Mosaic MAY later introduce dedicated Search infrastructure.

Potential reasons include:

* search volume exceeding relational capabilities;
* advanced full-text ranking;
* typo tolerance;
* sophisticated faceting;
* language-aware analysis;
* complex filtering;
* large-scale indexing;
* geographic distribution;
* semantic Search;
* operational isolation.

The trigger should be a demonstrated requirement.

---

# 4. Search Is a Domain Capability

Search SHOULD have an explicit application boundary even when the initial implementation queries the relational database directly.

Conceptually:

```text
Search Interface
      ↓
Search Application Logic
      ↓
Search Implementation
      ↓
Relational Database
```

Future evolution may become:

```text
Search Interface
      ↓
Search Application Logic
      ↓
Dedicated Search Index
```

without requiring Product Search behavior to be completely redesigned.

---

# 5. Search Is Not the Source of Truth

Search results are derived representations of authoritative Mosaic data.

Conceptually:

```text
Authoritative Domain
        ↓
Searchable Representation
        ↓
Search Results
```

Search infrastructure MUST NOT become the authoritative source for:

* Creation existence;
* authorship;
* Lineage;
* visibility;
* moderation state;
* ownership;
* Profile identity.

---

# 6. Initial Search Target

The primary initial Search target is:

> **Public Creations**

Additional searchable resource types may be introduced later.

Potential future targets include:

```text
Profiles
Collections
Categories
Tags
Providers
Models
```

The initial Product scope will be finalized in Delivery documentation.

---

# 7. Searchable Creation Information

Creation Search may eventually consider information such as:

* title;
* description;
* Prompt;
* author;
* username;
* tags;
* categories;
* Provider;
* Model;
* customizable elements;
* publication metadata.

Not every field must participate in initial ranking.

---

# 8. Prompt Search

Prompt content is an important part of Mosaic's creative value.

Therefore the Search architecture SHOULD support future retrieval based on Prompt content.

Example queries might conceptually include:

```text
cinematic aerial shot
```

or:

```text
neon city camera orbit
```

The exact Prompt indexing strategy depends on Search implementation and privacy rules.

---

# 9. Structured Prompt Search

If Prompts contain structured elements, Search MAY eventually use them as additional retrieval signals.

Examples:

```text
Camera
Lighting
Environment
Character
Style
```

The Search architecture MUST NOT require every Prompt to have this structure.

Plain-text Prompts remain valid.

---

# 10. Search Query

A Search request conceptually contains:

```text
Query
+
Optional Filters
+
Optional Sort
+
Pagination State
```

The exact API representation belongs to implementation.

---

# 11. Query Normalization

Search queries MAY require normalization such as:

* whitespace normalization;
* case normalization;
* language-aware processing;
* punctuation handling.

Normalization MUST NOT change Product meaning unexpectedly.

---

# 12. Empty Search Query

🟡 **Open Product Decision**

Mosaic must eventually define whether an empty Search query:

* returns no results;
* becomes a Discovery surface;
* returns recent content;
* returns trending content;
* requires at least one filter.

Search architecture should support the selected behavior without treating it as a database accident.

---

# 13. Relevance

Search SHOULD prioritize relevance to the User's query.

Popularity may contribute to ranking but MUST NOT define relevance by itself.

Conceptually:

```text
Search Relevance
       ≠
Popularity Ranking
```

---

# 14. Relevance Signals

Potential relevance signals may include:

```text
Text Match
Title Match
Prompt Match
Tag Match
Category Match
Creator Match
Provider Match
Model Match
Recency
Engagement
```

The exact weighting is not yet defined.

---

# 15. Search Ranking

🟡 **Open Technical/Product Decision**

The initial ranking formula remains unresolved.

A simple initial model may combine:

```text
Text relevance
      +
Small secondary signals
```

without requiring machine-learning ranking.

Exact weights MUST be based on observed Search quality rather than invented precision.

---

# 16. Popularity

Popularity signals may include:

* Likes;
* Comments;
* Saves;
* Remix activity;
* Views if eventually defined.

Popularity is a signal.

It is not proof of quality or relevance.

---

# 17. Engagement Manipulation

Search SHOULD avoid making ranking trivially manipulable through raw engagement counts.

Future protections may consider:

* spam;
* coordinated engagement;
* duplicate activity;
* suspicious account behavior.

Detailed abuse prevention belongs to Security and Moderation.

---

# 18. Recency

Publication time MAY influence ranking where appropriate.

However:

```text
Newest
```

and:

```text
Most relevant
```

are different ordering concepts.

The API and interface should distinguish them when both exist.

---

# 19. Search Sorting

Potential explicit sorting modes include:

```text
Relevant
Recent
Popular
```

🟡 **Open Product Decision**

The initial available sorting modes remain unresolved.

---

# 20. Filtering

Search MAY support filters such as:

```text
Category
Tag
Provider
Model
Creator
Publication Date
Customizable Prompt Availability
```

Initial filters will be determined by MVP scope.

---

# 21. Filters vs Search Terms

Filters represent structured constraints.

Example:

```text
query = cinematic car
provider = Provider X
```

The system SHOULD distinguish structured filters from ordinary query text where practical.

---

# 22. Unknown Providers and Models

Because Mosaic permits unknown or custom generation tools, Search MUST NOT assume every Creation references a platform-managed Provider or Model registry entry.

Searchable Generation Context must remain capable of representing free-form or unknown values where Product rules permit them.

---

# 23. Categories

Categories may provide broad structured filtering.

Category governance remains an open Product decision.

Search architecture SHOULD support category relationships without defining their governance model.

---

# 24. Tags

Tags may provide flexible Search and Discovery metadata.

Potential behavior includes:

```text
Creation
   ↓
Tags
   ↓
Search / Discovery
```

Tag normalization and governance remain open.

---

# 25. Tag Normalization

🟡 **Open Technical/Product Decision**

Mosaic has not yet decided how equivalent Tags are normalized.

Examples include:

```text
Sci-Fi
sci-fi
sci fi
scifi
```

Whether these represent one canonical Tag requires a later decision.

---

# 26. Creator Search

Mosaic may support searching for creators through:

* username;
* display name.

Creator Search SHOULD remain distinguishable from Creation Search even if presented through a unified Search interface.

---

# 27. Unified Search

🔮 **Future Possibility**

Mosaic may eventually provide unified Search results such as:

```text
Creations
Creators
Collections
Tags
Models
```

A unified interface does not require all resource types to share one physical index.

---

# 28. Search Visibility

Search MUST respect content visibility.

A Search result MUST NOT expose a Creation that the requesting User is not allowed to discover.

This includes restrictions caused by:

* moderation;
* deletion;
* visibility settings;
* future privacy rules;
* other access policies.

---

# 29. Moderated Content

Content removed from ordinary public availability MUST NOT remain normally discoverable through Search.

Search-index delay MUST NOT become a security or policy bypass.

---

# 30. Tombstones

Lineage tombstones exist to preserve historical structure.

They SHOULD NOT automatically become ordinary Search results.

A tombstone may remain accessible only where required to preserve Lineage context.

---

# 31. Drafts

Draft Creations MUST NOT appear in public Search.

Owner-specific Draft retrieval is not public Search and should use an appropriate private application interface.

---

# 32. Private Content

If Mosaic later supports private Accounts or Creations, Search MUST enforce the relevant visibility model.

Private content MUST NOT become discoverable simply because its text exists in a Search index.

---

# 33. Blocking

🟡 **Open Product Decision**

The exact effect of blocking on Search visibility remains unresolved.

Search architecture must support applying the final blocking policy without rewriting authoritative Search data unnecessarily.

---

# 34. Search Authorization

Public Search may be available anonymously.

Personalized or restricted Search behavior may require authenticated context.

Search implementation MUST NOT rely solely on the client to remove unauthorized results.

---

# 35. Search Result Representation

A Search result should provide enough information for the User to evaluate the Creation without requiring the complete Creation resource.

Conceptually:

```text
Creation Search Result
├── Creation ID
├── Primary Media Preview
├── Title
├── Author Summary
├── Relevant Metadata
├── Publication Context
└── Optional Engagement Summary
```

Exact fields remain an API implementation decision.

---

# 36. Search Result Payload Size

Search responses SHOULD avoid embedding unnecessarily large:

* full Prompts;
* complete Lineage trees;
* full comment threads;
* full Profile records;
* original Media objects.

Detailed content can be retrieved through dedicated resource endpoints.

---

# 37. Search Pagination

Search results MUST use bounded retrieval.

Cursor-based pagination is likely preferable if Search results are dynamic and ordered by unstable ranking signals.

However:

🟡 **Open Technical Decision**

The final pagination strategy remains unresolved.

---

# 38. Pagination and Ranking

Search pagination must account for ranking stability.

Changing data between requests may affect result order.

The implementation SHOULD minimize unnecessary duplicates and missing results.

---

# 39. Search Index Concept

Even while Search is database-backed, Mosaic may conceptually define a Search projection.

Example:

```text
Creation
   │
   ├── Title
   ├── Description
   ├── Prompt
   ├── Tags
   ├── Categories
   ├── Author
   └── Generation Context
        ↓
Searchable Projection
```

This helps preserve a clear boundary between domain state and Search representation.

---

# 40. Database-Backed Search

Initial Search MAY query normalized relational data directly or use database-supported Search projections.

Potential capabilities depend on the selected database.

No database-specific mechanism is selected by this document.

---

# 41. Search Index Evolution

A future dedicated Search architecture may look like:

```text
Relational Database
       │
       │ authoritative changes
       ▼
Indexing Process
       │
       ▼
Dedicated Search Engine
       │
       ▼
Search API
```

The relational database remains authoritative.

---

# 42. Indexing Events

If dedicated indexing is introduced, events such as:

```text
CreationPublished
CreationUpdated
CreationUnavailable
ProfileUpdated
TagsUpdated
```

may trigger Search projection updates.

The exact event mechanism remains an implementation decision.

---

# 43. Indexing Failure

Search indexing failure MUST NOT invalidate an already successful authoritative Creation publication.

Conceptually:

```text
Creation Published
       ↓
Search Index Update Fails
       ↓
Creation remains valid
       ↓
Index update retried / repaired
```

---

# 44. Search Consistency

Search may use eventual consistency.

This means a newly published or edited Creation may take a short period to appear in Search when dedicated asynchronous indexing exists.

Exact consistency expectations remain to be defined.

---

# 45. Removal Priority

Removal or access-restriction propagation may require stronger urgency than ordinary indexing.

Example:

```text
Creation removed by Moderation
       ↓
Search visibility must be removed promptly
```

Search architecture SHOULD provide a reliable path for such updates.

---

# 46. Reindexing

If Mosaic introduces a dedicated Search index, the system SHOULD support rebuilding Search representations from authoritative data.

Conceptually:

```text
Relational Domain
       ↓
Rebuild
       ↓
Search Index
```

This reinforces that Search is derived.

---

# 47. Search Schema Evolution

Search representation may evolve independently from relational schema.

Examples include adding:

* new searchable fields;
* new analyzers;
* new ranking signals;
* embeddings;
* additional filters.

Such changes MUST NOT redefine authoritative Product data.

---

# 48. Search Performance

Search SHOULD provide responsive interaction appropriate for an interactive web application.

No arbitrary latency target is defined yet.

Performance should be measured under realistic workloads before formal targets are established.

---

# 49. Query Limits

Search requests SHOULD have bounded complexity.

Potential controls include:

* maximum query length;
* maximum filters;
* bounded page size;
* rate limits.

Exact values remain open.

---

# 50. Search Abuse

Search can be abused for:

* scraping;
* resource exhaustion;
* enumeration;
* automated data harvesting.

The API SHOULD support appropriate rate and abuse controls.

Detailed controls belong to Security.

---

# 51. Search Analytics

Mosaic MAY collect privacy-aware Search analytics.

Potential signals include:

```text
Query submitted
Result selected
No-result query
Filter usage
```

These signals could help improve Search quality.

---

# 52. Search Analytics Privacy

Search queries may reveal User interests.

Search analytics SHOULD therefore follow data-minimization and privacy requirements.

Raw query retention MUST NOT be unlimited by default without a justified purpose.

Exact retention remains open.

---

# 53. No-Result Queries

No-result queries may be useful for understanding:

* missing content;
* vocabulary mismatches;
* Search quality;
* Tag normalization problems.

They MAY be analyzed in privacy-aware aggregate form.

---

# 54. Query Suggestions

🔮 **Future Possibility**

Mosaic may eventually provide:

* autocomplete;
* query suggestions;
* popular searches;
* creator suggestions;
* Tag suggestions.

These features are not required for initial Search.

---

# 55. Autocomplete

Autocomplete may use a separate optimized data path from full Search.

The architecture SHOULD NOT assume every keystroke must execute a full expensive Search request.

---

# 56. Typo Tolerance

🔮 **Future Possibility**

Dedicated Search infrastructure may later provide typo tolerance.

Example:

```text
cinamatic
     ↓
cinematic
```

Initial Search does not require advanced typo correction.

---

# 57. Synonyms

🔮 **Future Possibility**

Search may later support synonym relationships.

Example:

```text
film
movie
cinematic video
```

Synonym management should only be introduced if it improves observed Search behavior.

---

# 58. Language Support

Mosaic may contain Prompts and metadata in multiple languages.

The Search architecture SHOULD avoid assumptions that permanently restrict content to one language.

---

# 59. Language Detection

🔮 **Future Possibility**

Search may eventually use language detection for:

* tokenization;
* stemming;
* ranking;
* multilingual retrieval.

It is not required initially.

---

# 60. Accent Handling

Search MAY normalize accents or diacritics where appropriate.

Behavior should avoid damaging languages where those distinctions materially affect meaning.

The final approach depends on database and Search technology.

---

# 61. Semantic Search

🔮 **Future Possibility**

Mosaic may eventually support semantic Search.

Conceptually:

```text
User Query
    ↓
Semantic Representation
    ↓
Similarity Retrieval
    ↓
Relevant Creations
```

This may help Users find content whose meaning matches a query even when exact words differ.

---

# 62. Embeddings

Semantic Search may use embeddings.

If introduced:

```text
Creation / Prompt
      ↓
Embedding
      ↓
Vector Search
```

Embeddings are derived data.

They are not authoritative Prompt representations.

---

# 63. Embedding Regeneration

If embedding models change, Mosaic SHOULD be capable of regenerating embeddings from authoritative content.

This avoids making one embedding model part of permanent Product truth.

---

# 64. AI Search Dependency

Core Search MUST NOT initially depend on an external AI service.

Basic Search should remain functional without semantic or generative AI capabilities.

---

# 65. Hybrid Search

🔮 **Future Possibility**

A future Search system may combine:

```text
Keyword Match
      +
Structured Filters
      +
Semantic Similarity
      +
Ranking Signals
```

This is not an initial requirement.

---

# 66. Generative Search

🔮 **Future Possibility**

Mosaic could eventually offer natural-language Search assistance.

Example:

```text
"Show me prompts for slow cinematic
camera movements in dark forests"
```

Such a system would assist retrieval.

It would not replace authoritative Search permissions or visibility rules.

---

# 67. Discovery Feed

Search and the Home Feed MUST remain conceptually separate.

Search begins with explicit User intent.

The Home Feed may use:

* recent content;
* Following activity;
* relevance;
* engagement;
* recommendations.

Search architecture MAY provide retrieval capabilities to Discovery without owning Feed policy.

---

# 68. Following Feed

Following Feed is not Search.

Conceptually:

```text
Following relationships
       ↓
Eligible Creations
       ↓
Feed ordering
```

Its ordering policy remains a Product decision.

---

# 69. Trending

Trending is also distinct from Search relevance.

Conceptually:

```text
Recent unusual attention
       ↓
Trending
```

A Creation can be:

```text
Highly relevant to query
but not trending
```

or:

```text
Trending
but irrelevant to query
```

---

# 70. Recommendations

Recommendation systems personalize or contextualize Discovery.

They SHOULD remain separate from core Search ranking unless Product behavior explicitly combines them.

---

# 71. Recommendation Signals

Potential future recommendation signals include:

* Saves;
* Likes;
* follows;
* viewed Creations;
* customization behavior;
* Remix behavior;
* Search interactions.

Private behavioral signals MUST remain subject to Privacy requirements.

---

# 72. Personalization

Search MAY eventually include personalized ranking.

🟡 **Open Future Product Decision**

If introduced, personalization should not make Search results impossible to understand or systematically eliminate content diversity.

---

# 73. Search Diversity

Where several similarly ranked Creations exist, Search MAY consider diversity to avoid unnecessarily repetitive results.

Potential dimensions include:

* creator;
* style;
* category;
* Provider;
* Model.

The exact strategy remains open.

---

# 74. Duplicate Results

Search SHOULD avoid returning accidental duplicate representations of the same Creation.

Distinct derived Creations are not duplicates merely because they share ancestry or similar Prompts.

---

# 75. Lineage and Search

Every derived Creation is an independent Creation and may independently appear in Search if eligible.

Example:

```text
Creation A
├── Creation B
└── Creation C
```

A, B, and C may all be Search results.

Search MUST NOT collapse them merely because they belong to the same Lineage.

---

# 76. Lineage Signals

Lineage information MAY contribute to Search or Discovery signals in the future.

Examples include:

* number of direct Remixes;
* total descendants;
* lineage activity.

However, descendant metrics remain a Product decision and are not automatically ranking signals.

---

# 77. Original vs Remix Ranking

Mosaic SHOULD NOT assume that an original Creation must always rank above a derived Creation.

Search ranking should follow relevance and established Product rules.

Lineage remains visible through attribution rather than arbitrary ranking privilege.

---

# 78. Creator Equality

Search SHOULD avoid hardcoding permanent preferential treatment for specific creators unless Mosaic explicitly introduces an editorial or promotional system.

Administrative privilege MUST NOT automatically improve Search ranking.

---

# 79. Editorial Promotion

🟡 **Open Product Decision**

If Mosaic later introduces editorially promoted content, that mechanism should be explicitly distinguishable from organic Search relevance where appropriate.

---

# 80. Sponsored Search

🔮 **Future Possibility**

Commercially promoted Search results may exist in a future monetization model.

If introduced, sponsored content SHOULD be distinguishable from organic Search results.

No sponsored Search system is currently specified.

---

# 81. Moderation Signals

Moderation state may affect Search eligibility.

Search SHOULD consume authoritative moderation outcomes rather than independently deciding policy violations.

---

# 82. Search Safety Filters

Future Search may apply safety filters or policy constraints.

These filters should follow Mosaic's Moderation and visibility rules.

Search itself should not silently invent independent moderation policy.

---

# 83. Search and Deleted Users

If a User is deleted but historical Creations remain available according to Product rules, Search may still surface eligible Creations using the safe historical author representation.

Private deleted identity data MUST NOT be restored through Search indexing.

---

# 84. Search and Username Changes

If username changes are introduced later, Search indexing must follow the final username-history and redirect rules.

Search MUST NOT accidentally expose private or retired identity information beyond Product policy.

---

# 85. Search Index Privacy

A dedicated Search index MUST contain only information appropriate for its retrieval responsibilities.

It MUST NOT become a convenient duplicate store for unrelated sensitive data.

---

# 86. Search Infrastructure Security

If external Search infrastructure is introduced, access should be restricted so ordinary clients cannot bypass Mosaic authorization and query the internal index directly unless explicitly designed as safe public Search infrastructure.

---

# 87. Search Credentials

Search infrastructure credentials MUST remain server-side or otherwise appropriately protected.

Administrative Search capabilities MUST NOT be exposed to ordinary clients.

---

# 88. Search Observability

Mosaic SHOULD eventually observe:

* Search latency;
* Search errors;
* no-result rate;
* indexing delay;
* indexing failures;
* query volume;
* result-selection behavior where privacy permits.

Exact metrics belong to Observability.

---

# 89. Search Quality Monitoring

Technical uptime alone does not mean Search works well.

Mosaic may eventually evaluate Search quality through:

* result selection;
* reformulated queries;
* no-result queries;
* successful Creation discovery;
* controlled relevance evaluation.

---

# 90. Search Testing

Search tests SHOULD cover:

* visibility;
* basic matching;
* filtering;
* ordering where deterministic;
* pagination;
* moderation removal;
* authorization;
* indexing consistency where applicable.

---

# 91. Search Relevance Testing

As ranking becomes more sophisticated, Mosaic MAY maintain representative Search cases.

Example:

```text
Query:
"cinematic forest"

Expected:
forest / cinematic-related Creations
should generally outrank unrelated Creations.
```

This is more useful than testing exact scores that may evolve.

---

# 92. Search Fallback

If a future dedicated Search service becomes unavailable, Mosaic MAY provide degraded behavior.

Potential options include:

* temporary basic database Search;
* unavailable Search with other platform functionality preserved;
* cached limited results.

The appropriate strategy depends on future scale and infrastructure.

---

# 93. Search Failure Isolation

Failure of Search SHOULD NOT inherently make unrelated Mosaic capabilities unavailable.

Example:

```text
Search unavailable
      ↓
Direct Creation access remains available
```

where other dependencies are healthy.

---

# 94. Migration to Dedicated Search

A future migration should conceptually follow:

```text
Existing Relational Search
        ↓
Define Search Projection
        ↓
Backfill Dedicated Index
        ↓
Validate Results
        ↓
Route Search Queries
        ↓
Continue Authoritative Database
```

The migration should not require changing Creation identity or Product semantics.

---

# 95. Search Technology Selection

🟡 **Open Technical Decision**

No dedicated Search technology has been selected.

Potential categories may later include:

* relational full-text Search;
* dedicated Search engine;
* hosted Search service;
* vector-capable Search infrastructure;
* hybrid architecture.

Technology will be selected from actual requirements.

---

# 96. Search Scaling Trigger

Mosaic SHOULD consider dedicated Search infrastructure when one or more concrete constraints appear.

Examples include:

```text
Relational Search latency becomes unacceptable
Search workload harms transactional workload
Ranking requirements exceed database capabilities
Advanced typo tolerance becomes important
Faceting becomes complex
Semantic retrieval becomes Product-critical
Search volume requires independent scaling
```

There is no predetermined User-count threshold.

---

# 97. Search Data Freshness

🟡 **Open Technical Decision**

Exact Search freshness expectations have not been established.

Initial database-backed Search may provide near-immediate visibility.

A future asynchronous index may introduce short propagation delay.

Removal and restriction events may require stronger freshness guarantees than ordinary metadata updates.

---

# 98. Search Retention

Search indexes SHOULD remove data that no longer belongs in searchable representations.

Historical data required elsewhere does not automatically need to remain Searchable.

---

# 99. Search Rebuildability

A dedicated Search index SHOULD be rebuildable from authoritative Mosaic state where practical.

This is a central architectural property.

```text
Delete Search Index
       ↓
Rebuild from Domain
       ↓
Search restored
```

should be conceptually possible without losing Mosaic's authoritative creative history.

---

# 100. Search Decisions

## SEARCH-ADR-001 — Begin with Database-Backed Search

**Status:** ✅ Decided

Mosaic will initially use appropriate relational database capabilities for Search unless implementation evidence demonstrates that a dedicated Search engine is already necessary.

---

## SEARCH-ADR-002 — Search Has an Explicit Boundary

**Status:** ✅ Decided

Search will remain a distinct application capability even when implemented through the relational database.

This preserves future infrastructure flexibility.

---

## SEARCH-ADR-003 — Search Is Derived

**Status:** ✅ Decided

Search representations and indexes are derived from authoritative Mosaic domain data.

---

## SEARCH-ADR-004 — Search Prioritizes Relevance

**Status:** ✅ Decided

Query relevance is the primary conceptual objective of Search.

Popularity alone does not define relevance.

---

## SEARCH-ADR-005 — Search Respects Visibility

**Status:** ✅ Decided

Search MUST enforce Mosaic visibility, moderation, privacy, and access rules.

---

## SEARCH-ADR-006 — Basic Search Does Not Depend on AI

**Status:** ✅ Decided

Mosaic's foundational Search capability will not require semantic or generative AI services.

---

## SEARCH-ADR-007 — Search and Discovery Remain Distinct

**Status:** ✅ Decided

Search, Feed/Discovery, Trending, and Recommendations are separate Product and technical responsibilities even when they share signals or infrastructure.

---

# 101. Open Search Decisions

| Decision                          | Status                   |
| --------------------------------- | ------------------------ |
| Initial searchable resource types | 🟡 Open / MVP            |
| Exact searchable fields           | 🟡 Open                  |
| Search ranking formula            | 🟡 Open                  |
| Search sorting modes              | 🟡 Open Product Decision |
| Initial filters                   | 🟡 Open / MVP            |
| Empty-query behavior              | 🟡 Open Product Decision |
| Tag normalization                 | 🟡 Open                  |
| Search pagination strategy        | 🟡 Open                  |
| Search freshness expectations     | 🟡 Open                  |
| Blocking effect on Search         | 🟡 Open Product Decision |
| Private content Search behavior   | 🟡 Open Product Decision |
| Dedicated Search technology       | 🟡 Open                  |
| Search analytics retention        | 🟡 Open                  |
| Search personalization            | 🔮 Future Possibility    |
| Typo tolerance                    | 🔮 Future Possibility    |
| Synonyms                          | 🔮 Future Possibility    |
| Semantic Search                   | 🔮 Future Possibility    |
| Embedding technology              | 🔮 Future Possibility    |
| Hybrid Search                     | 🔮 Future Possibility    |
| Unified Search                    | 🔮 Future Possibility    |
| Editorial promotion               | 🟡 Open Product Decision |
| Sponsored Search                  | 🔮 Future Possibility    |

---

# 102. Search Architecture Summary

Initial Search:

```text
                     USER
                      │
                  Search Query
                      │
                      ▼
                  Search API
                      │
                      ▼
              Search Application
                      │
             Visibility / Filters
                      │
                      ▼
             Relational Search
                      │
                      ▼
              Ranked Results
```

Possible future evolution:

```text
              AUTHORITATIVE DOMAIN
                      │
                 Indexing Events
                      │
                      ▼
                Search Projection
                      │
                      ▼
              Dedicated Search Index
                 │             │
                 │             └── Semantic Index
                 │
                 ▼
               Search API
                 │
        ┌────────┼────────┐
        │        │        │
     Keyword   Filters   Semantic
        │        │        │
        └────────┼────────┘
                 │
                 ▼
           Ranked Results
```

The architecture prioritizes:

```text
Simple initial infrastructure
          +
Explicit Search boundary
          +
Relevance
          +
Visibility enforcement
          +
Rebuildable derived data
          +
Future evolution
```

rather than:

```text
Premature Search cluster
          +
AI dependency
          +
Popularity-only ranking
          +
Search as source of truth
```

The central rule is:

> **Start with the simplest Search architecture that satisfies Mosaic's real retrieval needs, while preserving a clean path to specialized Search when those needs justify it.**

---

# Related Documentation

## Product

* [Product Vision](../01-product/product-vision.md)
* [Publications](../01-product/publications.md)
* [Prompt System](../01-product/prompts.md)
* [Remix & Lineage](../01-product/remix-lineage.md)
* [Discovery & Search](../01-product/discovery.md)
* [Social System](../01-product/social.md)
* [Moderation & Trust](../01-product/moderation.md)

## Specification

* [Business Rules](../02-specification/business-rules.md)
* [Functional Requirements](../02-specification/functional-requirements.md)
* [Non-Functional Requirements](../02-specification/non-functional-requirements.md)

## Technical

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Security & Privacy →](./security.md)
* [Scalability](./scalability.md)
* [Observability](./observability.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)

---

**Previous:** [← Media Storage](./media-storage.md) · [Documentation Home](../README.md) · **Next:** [Security & Privacy →](./security.md)
