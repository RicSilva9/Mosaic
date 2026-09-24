# Technology Stack

> **Section:** Technical
> **Status:** Implementation Baseline — Pending Integration Validation
> **Audience:** Engineering & Contributors
> **Last updated:** September 2026

---

## 1. Purpose

This document records the initial implementation technology choices for Mosaic. It supplements, rather than replaces, the existing [Architecture](./architecture.md), [Security](./security.md), [Deployment](./deployment.md), and [Data Model](./data-model.md) specifications. Product and business rules remain authoritative.

**Project constraints:** the maintainer is learning backend development; initial recurring costs should be near zero; the first deliverable is a demonstrable portfolio MVP, without abandoning maintainability.

**Decision vocabulary:** **Selected** means the initial implementation direction; **Provisional** requires a technical spike or verification before integration; **Deferred** means intentionally excluded from the first foundation milestone. Selection does not imply implementation or successful testing.

## 2. Architecture and Repository

| Concern                | Choice                          | State       | Rationale                                                                                               |
| ---------------------- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| Language               | TypeScript                      | Selected    | Shared language across the web app, API, and contracts.                                                 |
| Architecture           | Modular monolith                | Selected    | Explicit domain modules with one primary business application, avoiding microservice overhead.          |
| Repository             | pnpm workspace monorepo         | Selected    | One versioned codebase with distinct deployable applications and shared packages.                       |
| Web application        | Next.js + React                 | Selected    | Responsive frontend and public, indexable Creation/profile pages.                                       |
| API application        | NestJS, REST-oriented HTTP/JSON | Selected    | Explicit modules, validation, authorization boundaries, and backend learning.                           |
| Styling                | Tailwind CSS                    | Selected    | Consistent styling with a low configuration burden.                                                     |
| Database               | PostgreSQL                      | Selected    | Relational integrity for social relationships and Creation lineage.                                     |
| Database access        | Prisma + versioned migrations   | Provisional | Typed access and migration workflow; validate compatibility with chosen runtime and managed PostgreSQL. |
| Online database        | Supabase PostgreSQL             | Provisional | Managed development/demo database subject to current free-tier limits and project lifecycle.            |
| Identity provider      | Supabase Auth                   | Provisional | Avoid building password handling; integration and session contract require a security spike.            |
| Media object storage   | Cloudflare R2                   | Provisional | S3-compatible storage; validate account requirements, upload policy, quotas, and demo costs.            |
| Local media processing | FFmpeg                          | Selected    | Learn and validate media processing locally before hosted workers.                                      |
| Local services         | Docker Compose                  | Selected    | Reproducible local PostgreSQL and supporting services.                                                  |
| Browser E2E            | Playwright                      | Selected    | Verify essential user journeys across the web and API.                                                  |
| API tests              | Jest (NestJS default)           | Selected    | Unit and integration tests for business rules and controllers.                                          |
| Frontend tests         | Vitest + Testing Library        | Selected    | Component and client-side logic tests.                                                                  |
| Version control        | Git + GitHub                    | Selected    | Small, reviewable commits and portfolio visibility.                                                     |

The monorepo contains **two deployable applications**, but the NestJS API remains the **single primary business backend**. Next.js handles presentation, page rendering, and narrowly scoped session/BFF concerns when needed; it must not become a second independent implementation of domain rules.

## 3. Initial Repository Layout

```text
mosaic/
├── apps/
│   ├── web/                 # Next.js presentation application
│   └── api/                 # NestJS modular business backend
├── packages/
│   ├── contracts/           # API-facing schemas/types, no Prisma entities
│   └── config/              # Shared tooling configuration
├── infra/
│   └── docker/              # Local service configuration
├── docs/
├── package.json
└── pnpm-workspace.yaml
```

**Boundary rule:** shared contracts describe external API data; they do not expose Prisma models or database internals. API contracts are versioned when breaking changes require it. Avoid premature shared domain packages.

## 4. Database and Data Ownership

PostgreSQL is the authoritative store for Users/Profiles, Creations, Prompts, Lineage, social interactions, moderation state, and media metadata. Files belong in object storage, not relational rows. Prisma migrations are reviewed and committed. SQL constraints and transactions protect integrity; application validation alone is insufficient. The final physical User/Account/Profile mapping and lineage-parent cardinality remain domain decisions to resolve before their respective migrations.

Use a **local PostgreSQL container by default**. A managed database is optional for a public demo, not required for initial development. Never put a privileged database credential in the browser.

## 5. Authentication and Authorization — Integration Gate

Supabase Auth is the initial identity-provider candidate, **not yet a finalized session implementation**. Before building protected flows, create a small technical spike that demonstrates:

1. Sign-up and explicit sign-in, preserving the documented rule that registration does not silently imply an authenticated session.
2. Secure browser session behavior for the chosen Next.js/NestJS origin arrangement, including cookie settings, CSRF considerations, refresh/expiry, and sign-out.
3. NestJS verification of identity using provider-issued tokens/JWKS or another documented trusted mechanism; never trust user IDs from request bodies.
4. Backend-owned authorization for resource ownership, roles, moderation, and account state.
5. Account/profile provisioning, duplicate-event safety, and recovery from partial failures.
6. Local and CI test strategies that do not require live third-party secrets.

Choose the exact browser-to-API flow and document its threat model **before** implementing identity endpoints. Supabase project configuration and free-tier availability must be checked at setup time. A self-managed alternative can be considered if the spike fails the cost, security, or learning criteria.

## 6. Media and Background Work

Use R2 as the provisional remote object store. The API owns upload authorization and issues time-limited upload permissions; it validates media type, size, ownership, and publication readiness independently of client claims. FFmpeg processing starts locally, with explicit interfaces for future asynchronous jobs. Do not perform long-running transcodes in ordinary API requests or assume a free serverless tier supports them.

**Deferred:** Redis/BullMQ deployment, managed transcode services, advanced CDN transformations, and multi-region storage. Introduce a durable job mechanism before background processing becomes necessary for the actual MVP workflow; a deferred queue does not authorize unreliable fire-and-forget work.

## 7. Search, Deployment, and Operations

Use PostgreSQL-backed discovery/search initially, as established by [Search](./search.md). Hosting providers for the Next.js frontend and NestJS API remain **open**; the local milestone must not depend on permanent free hosting. Verify each provider's current quotas, commercial-use terms, billing requirements, inactivity behavior, and support for long-running media jobs before deployment.

Environments start with local development and isolated automated tests. Add an online demo environment when deployment choices and resource budgets are confirmed. Use environment variables and a documented `.env.example`; never commit secrets. Maintain structured logging, basic health checks, migration discipline, and a backup/restore plan before accepting real user data.

## 8. Alternatives Considered

| Decision        | Alternative                                     | Trade-off                                                                                 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Next.js         | React + Vite                                    | Simpler client-only setup, but public-page rendering and SEO need an additional strategy. |
| NestJS          | Express/Fastify alone                           | Less framework overhead, but more architectural conventions to establish manually.        |
| PostgreSQL      | SQLite                                          | Simpler local setup, less representative of the intended relational deployment.           |
| Prisma          | Drizzle or SQL query layer                      | Worth revisiting if migration/control requirements or integration tests reveal friction.  |
| Supabase Auth   | Self-managed auth                               | More direct learning/control, but higher security and maintenance responsibility.         |
| R2              | Supabase Storage or local S3-compatible storage | Fewer providers or fully local testing, with different quota and portability trade-offs.  |
| pnpm workspaces | Turborepo orchestration                         | Additional orchestration can be added if task coordination becomes a measurable problem.  |

## 9. Foundation Milestone — Acceptance Criteria

The foundation is complete only when all of the following are **actually demonstrated**:

* [ ] Install dependencies from a clean checkout with a pinned runtime/package-manager policy.
* [ ] Run the Next.js app and NestJS API independently within the workspace.
* [ ] Start and stop local PostgreSQL reproducibly with Docker Compose.
* [ ] Apply an initial migration and verify an API-to-database read/write round trip.
* [ ] Call a versioned API health endpoint from the web app without embedding secrets.
* [ ] Run linting, formatting checks, type checks, backend tests, and a minimal browser smoke test.
* [ ] Document environment setup and the exact commands in the repository README.
* [ ] Verify that generated files, credentials, and media uploads are not committed accidentally.

Do not mark this milestone complete based only on generated scaffolding.

## 10. Open Implementation Decisions

These questions must be resolved at their relevant gates rather than silently assumed:

* Supported Node.js, pnpm, Next.js, NestJS, Prisma, and PostgreSQL versions and their compatibility matrix.
* Prisma versus alternative database-access tooling after a minimal migration spike.
* The authentication session/token/cookie design across frontend and backend.
* The physical identity model and lineage parent cardinality before domain migrations.
* Storage upload size limits, cleanup, and processing lifecycle.
* Hosting and deployment for the API and media workers, with verified cost limits.
* Whether/when a durable queue is necessary for the first media-processing flow.
* CI provider, browser support matrix, and concrete accessibility/performance targets.

## 11. Related Documents

* [Architecture](./architecture.md)
* [Data Model](./data-model.md)
* [API](./api.md)
* [Media Storage](./media-storage.md)
* [Security](./security.md)
* [Testing](./testing.md)
* [Deployment](./deployment.md)
* [MVP](../04-delivery/mvp.md)

---

[← Architecture](./architecture.md) · [Documentation Index](../README.md) · [Data Model →](./data-model.md)
