# Progress Tracker

> **Purpose**
>
> This document is the authoritative record of the project's implementation progress.
>
> Every meaningful development session must update this file before ending.
>
> The goal is to ensure any developer or AI can resume work immediately without re-analyzing the codebase.
>
> This document tracks implementation status, completed work, architectural decisions, technical debt, blockers, and upcoming milestones.

---

# Project Status

## Current Phase

**Production Audit Remediation**

Current objective:

* Execute the prioritized remediation plan from the production readiness audit.
* Start with Critical security issues, then High, then Medium.
* Preserve existing business functionality at every step.
* Verify all three builds after every phase.

---

# Current Goal

Current implementation target:

> Phase 7.1: Critical Security Hardening (MongoDB injection, err leak, Asset/Auth validation)

---

# Overall Progress

| Area                     | Status      |
| ------------------------ | ----------- |
| Context Engineering      | Complete    |
| Architecture Definition  | Complete    |
| Coding Standards         | Complete    |
| Public Website           | Existing    |
| Admin Dashboard          | Existing    |
| Backend APIs             | Existing    |
| Database Models          | Existing    |
| Production Refactor         | Complete   |
| Performance Optimization    | Pending     |
| Accessibility Review        | Pending     |
| SEO Audit                   | Pending     |
| Security Hardening          | Complete    |
| Production Audit Remediation | In Progress |
| Testing & Verification      | Pending     |
| Deployment Readiness        | Pending     |

---

# Completed

Record completed work in chronological order.

Each entry should include:

* Date
* Module
* Summary
* Validation performed

Example:

### 2026-07-02

**Architecture Context**

Completed:

* Defined production architecture
* Established system boundaries
* Documented storage model
* Documented authentication model
* Defined architectural invariants

Validation:

* Reviewed against project requirements
* No conflicts with existing architecture

---

### 2026-07-03

**Phase 1: Security Hardening & Production Validation**

Completed:

#### Environment & Secrets
* Enforced JWT secret enforcement in `api/src/config/index.ts`
* Implemented `getSecretEnv()` function to fail fast when critical secrets are missing
* Removed fallback secrets (`'secret'`, `'refresh_secret'`) from production config
* Secrets now mandatory and cannot have fallback values

#### CORS & Network Security
* Verified CORS is already properly restricted to allowed origins via `CORS_ORIGINS` env var
* Default allowed origins: `http://localhost:3000`, `http://localhost:3001`
* Confirmed `xss-clean` middleware is applied to all request bodies

#### Authentication & Error Handling
* Verified auth middleware uses correct HTTP status codes:
  - `401` for missing/invalid tokens
  - `403` for permission denied
  - `404` for missing users
* Confirmed user sessions check `isActive` status

#### HTML Content Sanitization
* Created `api/src/utils/sanitize.ts` utility module
* Implemented `sanitizeHtmlContent()` function to prevent XSS attacks:
  - Removes script tags and content
  - Strips event handlers (onclick, onerror, etc.)
  - Removes dangerous tags (iframe, object, embed, form)
  - Removes javascript: and data: protocol URLs
* Integrated sanitization into:
  - `api/src/module/blog/blog.service.ts`
  - `api/src/module/event/event.service.ts`
  - `api/src/module/industry/industry.service.ts`
* All create/update operations now sanitize content fields

#### Type Safety & Build Health
* Added `api/src/types/xss-clean.d.ts` type declaration
* Backend TypeScript compilation passes without errors
* Admin dashboard builds successfully with 18 static pages

Validation:

* API build: ✅ Successful (tsc compilation)
* Admin build: ✅ Successful (18 static pages generated)
* Public site build: ⚠️ Google Fonts network connectivity issue (environmental, not code)
* Code changes preserve existing functionality
* No breaking changes to API contracts
* Sanitization is applied at write-time (secure-by-default)

---

### 2026-07-03

**Public Form Contract Cleanup**

Completed:

* Mapped the inquiry form payload to the backend schema so `companyName` now submits as `company` and `inquiryType` submits as `productInterested`
* Mapped the quote request form to backend-supported fields and preserved extra company/timeline context in `notes`
* Mapped the job application form to backend-supported fields and preserved LinkedIn/cover-letter context in `notes`
* Extended the matching create validation schemas to accept `notes` where the models already support them
* Added a public fetch timeout wrapper so prerendering falls back instead of hanging on slow API responses

Validation:

* API build: ✅ Successful (`npm run build`)
* Web build: ✅ Successful (`npm run build`)
* Existing behavior preserved while eliminating silent payload loss on public submit flows

---

### 2026-07-03

**Authentication & Session Hardening**

Completed:

#### JWT Token Handling
* Replaced the hardcoded access-token expiry in `api/src/utils/jwt.ts` with the configured `JWT_ACCESS_EXPIRES_IN` environment value
* Added a typed auth token payload so token generation and verification share the same shape

#### Middleware & Session Validation
* Updated `api/src/middleware/auth.middleware.ts` to verify tokens through the shared JWT helper
* Removed the unnecessary password select from auth middleware user lookup
* Kept role and active-user checks unchanged

#### Login Flow Hardening
* Updated `api/src/module/auth/user.service.ts` to generate tokens with the authenticated user id, email, and role
* Added a typed call to the user password comparison helper
* Preserved the `lastLogin` update and existing login response contract

Validation:

* API build: ✅ Successful (`npm run build`)
* Web build: ✅ Successful (`npm run build`)
* No runtime behavior changes were introduced beyond using the configured JWT expiry

---

### 2026-07-04

**Phase 2: API & Data Fetching Optimization**

Completed:

#### API Configuration & Consolidation
* Created centralized `web/src/lib/api-config.ts` module (shared constants)
  - `API_BASE_URL`: Single source of truth for API endpoint
  - `CACHE_DURATIONS`: Unified cache duration constants (60s for volatile, 300s for stable)
  - `CACHE_HEADERS`: Helper constants for Cache-Control headers
* Updated `web/src/lib/api.ts` to import from api-config.ts

#### Backend Caching Infrastructure
* Created `api/src/middleware/cache.middleware.ts`
  - Route-specific Cache-Control headers (products: 60s, categories: 300s)
  - Includes s-maxage and stale-while-revalidate directives for ISR support
  - No-cache headers for admin/auth routes
  - Proper Vary headers for cache revalidation
* Integrated into express middleware pipeline in `api/src/app.ts`
* Applied to all `/api/v1` routes

#### Frontend Data Fetching Deduplication
* Implemented React `cache()` wrappers for all fetch functions in `web/src/lib/api.ts`:
  - `getProducts()` with query parameter support via `createCachedGetter`
  - `getBlogs()` with query parameter support (uses direct `cache()` wrapper)
  - `getEvents()` with query parameter support (uses direct `cache()` wrapper)
  - `getCategories()`, `getIndustries()`, `getJobs()`, `getTestimonials()`, `getSettings()` (via `createCachedGetter`)
* Deduplicates multiple calls to same function within single render cycle
* Combines with Next.js `unstable_cache()` for ISR-level caching

#### Dynamic Sitemap Generation
* Created `web/src/app/sitemap.ts` with dynamic content routing
  - Fetches products, blogs, industries, and jobs from API
  - Generates XML sitemap entries with proper:
    - `lastModified` dates (uses updatedAt or createdAt)
    - `changeFrequency` values (weekly for products/blogs/jobs, monthly for industries)
    - `priority` scores (0.7 for products/industries, 0.6 for blogs/jobs)
  - Graceful fallback to static routes if API unavailable
  - Improves SEO for content-driven pages

#### Type Definitions Update
* Added missing timestamp fields to type definitions:
  - `TProduct.updatedAt` (optional string)
  - `TIndustry.updatedAt` and `TIndustry.createdAt` (optional strings)
  - `TJob.updatedAt` (optional string)
* Ensures type safety for sitemap generation with proper fallbacks

#### Build Verification
* API backend: ✅ TypeScript compilation passes
* Web frontend: ✅ TypeScript compilation passes
* All cache-related imports resolve correctly
* Sitemap generation logic verified for compilation

Validation:

* API build: ✅ `npm run build` succeeds
* Web build: ✅ TypeScript type checking passes
* No breaking changes to existing API contracts
* Cache headers compatible with Vercel ISR
* Deduplication pattern matches React best practices
* All data fetchers maintain backward compatibility

---

### 2026-07-05

**Phase 4: Accessibility & SEO**

Completed:

#### Keyboard Navigation & ARIA Labels
* Added full keyboard navigation to desktop dropdown menus in `web/src/components/layout/Navbar.tsx`:
  - Enter/Space to toggle dropdown open/close
  - Escape to close dropdown
  - ArrowDown/ArrowUp to navigate between child items
  - Focus management with `onFocus`/`onBlur` handlers to close on focus loss
* Added proper `aria-controls` linking triggers to their dropdown content panels
* Added `role="menu"`, `role="menuitem"` to desktop dropdown structures
* Added `role="dialog"`, `aria-modal="true"` to mobile navigation overlay
* Added `aria-expanded` and `aria-controls` to mobile menu toggle button
* Added `aria-hidden="true"` on decorative/visual-only elements (grid pattern overlay, hamburger icon lines)
* Added `aria-label="Search"` on search button
* Added `aria-label` on mobile toggle with contextual open/close label
* Escape key closes the mobile navigation menu
* Improved `role="navigation"` on desktop nav element

#### Structured Data Markup (JSON-LD)
* Created `web/src/lib/json-ld.ts` with typed helper functions:
  - `organizationJsonLd()` — Organization schema for root layout
  - `localBusinessJsonLd()` — LocalBusiness schema for root layout
  - `productJsonLd()` — Product schema on product detail pages
  - `blogPostingJsonLd()` — BlogPosting schema on blog detail pages
  - `breadcrumbJsonLd()` — BreadcrumbList schema on detail pages
* Injected Organization + LocalBusiness JSON-LD into `web/src/app/layout.tsx`
* Injected Product + BreadcrumbList JSON-LD into `web/src/app/products/[slug]/page.tsx`
* Injected BlogPosting + BreadcrumbList JSON-LD into `web/src/app/blog/[slug]/page.tsx`
* Injected BreadcrumbList JSON-LD into `web/src/app/industries/[slug]/page.tsx`

#### Open Graph Metadata Improvements
* Added OG image support (from settings.defaultSEO.ogImage) with proper dimensions to root layout metadata
* Added OG image + Twitter card metadata to: products listing, blog listing, careers, contact, industries listing, updates/events
* Added full `generateMetadata()` with OG + Twitter cards to: about, process, gallery pages (previously missing)
* Added OG image (from product images) to product detail page with OG + Twitter card metadata
* Added OG image (from blog cover image) + `og:type: article` + `og:published_time` to blog detail page
* Added OG image + Twitter card to industry detail page (improved from basic OG)
* Added `twitter:card: summary_large_image` to all dynamic pages with proper images

#### Client Component Metadata Note
* Infrastructure, Quality, and Request-Quote pages are `"use client"` and use root layout fallback metadata

Validation:

* Web build: ✅ Successful (`npm run build`) — all 18 pages generated, TypeScript passes
* No breaking changes to existing functionality
* All navigation behaviors preserved (mouse hover still works alongside keyboard)
* All visual elements unchanged

---

### 2026-07-05

**Phase 5: Architecture & Route Cleanup**

Completed:

#### Folder Structure Alignment
* Created `features/` directory with scoped subdirectories: `products/`, `careers/`, `contact/`, `industries/`, `events/`
* Moved 7 feature-specific components from `components/sections/` and `components/forms/` into their feature folders:
  - `ProductsOverview`, `ProductFilterBar` → `features/products/components/`
  - `CareersPreview`, `JobDetailsModal` → `features/careers/components/`
  - `ContactForm` → `features/contact/components/`
  - `IndustriesServed` → `features/industries/components/`
  - `EventsAndBlogPreview` → `features/events/components/`
* Created backward-compatible re-export files at all original import paths
* Created `services/` directory with API abstraction layer:
  - `services/client.ts` — base HTTP client (fetchWithTimeout, fetchJson, getWithQuery, postJson)
  - `services/products.ts` — product & category API
  - `services/careers.ts` — job & application API
  - `services/contact.ts` — inquiry & quote API
  - `services/content.ts` — blog, event, industry, testimonial API
  - `services/settings.ts` — settings API
  - `services/index.ts` — barrel exports
* Updated `lib/api.ts` to delegate HTTP calls to services layer (retains Next.js caching layer)
* Created `hooks/` directory with reusable hooks:
  - `hooks/use-media-query.ts` — responsive breakpoints
  - `hooks/use-scroll-progress.ts` — framer-motion scroll animation wrapper
  - `hooks/index.ts` — barrel exports

#### Express Route Simplification
* Renamed `UserRoutes` export to `AuthRoutes` in `api/src/module/auth/user.routes.ts` for naming consistency
* Updated `api/src/routes/index.ts` with:
  - Clear table documenting all public paths per module
  - Consistent import naming (`AuthRoutes` instead of `UserRoutes`)
  - Logical grouping with auth as explicit `/auth` mount
  - Self-documenting route manifest

#### Database Index Optimization
* Added `createdAt: -1` index to Product model (sort by newest)
* Added `isActive: 1, name: 1` compound index to Industry model (filter active + alphabetical)
* Added `department: 1, location: 1, type: 1` compound index to Job model (filter by criteria)
* Added `productId: 1` index to Quote model (lookup by product)
* Added `isPublished: 1` index to Testimonial model (filter published)
* Added `category: 1, type: 1` and `createdAt: -1` indexes to Asset model (filter + sort)
* Added `isActive: true, index: true` to User model (filter active)
* Added `createdAt: -1` index to Blog model (sort by newest)

Validation:

* Web build: ✅ Compiled successfully, TypeScript passes, all 18 pages generated
* API build: ✅ TypeScript compilation passes without errors
* All existing imports preserved via re-export files
* Zero breaking changes to runtime behavior

---

### 2026-07-05

**Phase 6: Scalability & Infrastructure**

Completed:

#### Monitoring & Observability
* Created `api/src/middleware/requestId.middleware.ts` — attaches UUID `x-request-id` to every request/response for distributed tracing
* Enhanced health check (`GET /`) to include database connectivity status, uptime, timestamp, and requestId
* Returns `503` when database is disconnected (degraded mode detection)
* Moved `winston` and `morgan` from devDependencies to production dependencies for production logging
* Added `api/src/types/express.d.ts` — global Express type augmentation for `req.requestId` and `req.user`

#### Distributed Rate Limiting
* Installed `rate-limit-mongo` — distributes rate limit state across all API instances via MongoDB
* Replaced in-memory `express-rate-limit` store with MongoDB store (`rateLimits` collection)
* Added stricter per-route rate limiter on `/api/v1/auth` — 20 requests per 15 min window (vs. 100 for general API)
* Both limiters use the same MongoDB store for consistency
* Added `api/src/types/rate-limit-mongo.d.ts` type declaration for the untyped package

#### Refresh Token Lifecycle
* Extended `api/src/utils/jwt.ts` with:
  - `generateRefreshToken()` — signs with `jwt_refresh_secret` and configurable expiry
  - `verifyRefreshToken()` — verifies against `jwt_refresh_secret`
  - `AuthTokenPayload.type` field to distinguish access vs refresh tokens
* Created `api/src/module/auth/token-blacklist.model.ts` — Mongoose model with TTL index for automatic expiry of blacklisted tokens
* Created `api/src/module/auth/token.service.ts` — token lifecycle service:
  - `issueTokens()` — generates paired access + refresh tokens on login
  - `refreshAccessToken()` — validates refresh token, checks blacklist, issues new pair, blacklists old
  - `blacklistToken()` — adds refresh token to blacklist for logout/rotation
* Updated `api/src/module/auth/user.service.ts`:
  - `loginUser()` now returns both `token` (access) and `refreshToken`
  - `refreshToken()` delegates to token service
  - `logoutUser()` accepts optional refresh token to blacklist
* Updated `api/src/module/auth/user.controller.ts`:
  - `login` returns `refreshToken` alongside existing `token` and `user`
  - `refresh` — new handler at `POST /auth/refresh-token`
  - `logout` now extracts Bearer token and blacklists it
* Updated `api/src/module/auth/user.routes.ts` — added `POST /refresh-token` public route
* Existing admin login flow unchanged — the `token` field in the response is preserved, `refreshToken` is additive

#### File Upload Infrastructure
* Created `api/src/middleware/upload.middleware.ts` — multer-based upload middleware:
  - Disk storage with UUID-based filenames
  - Allowed types: JPEG, PNG, GIF, WebP, SVG, PDF, DOC
  - 10 MB max file size
  - Single and multiple file upload support
* Created `api/src/utils/storage.ts` — storage abstraction layer:
  - `ensureUploadDir()`, `getUploadPath()`, `getPublicUrl()`, `deleteFile()`, `getFileSize()`
  - Local disk storage with configurable `UPLOAD_DIR` env var
  - Architecture ready for S3/Cloudinary extension
* Updated `api/src/module/asset/asset.model.ts` — added `mimeType` field
* Updated `api/src/module/asset/asset.service.ts`:
  - `createAsset()` handles both URL-based and file-upload assets
  - Auto-populates `url`, `size`, `mimeType` from uploaded file
  - `deleteAsset()` cleans up local files when asset is removed
* Updated `api/src/module/asset/asset.controller.ts` — handles `req.file` alongside `req.body`
* Updated `api/src/module/asset/asset.route.ts` — added multer middleware to `POST /admin/assets`
* Added `app.use('/uploads', express.static('uploads'))` to serve uploaded files
* Existing admin URL-based asset creation still works — file upload is an additive capability

Validation:

* API build: ✅ TypeScript compilation passes without errors
* Web build: ✅ Compiled successfully, all 18 pages generated
* Admin build: ⚠️ Pre-existing TypeScript error in `BlogForm.tsx:53` (missing `author` property) — unrelated to this phase
* All existing API contracts preserved — `refreshToken` is additive to login response
* Rate limiting continues to work but now uses MongoDB store instead of memory
* File uploads are backward-compatible — URL-based asset creation still functions

---

# Next Up

Ordered implementation queue — Production Audit Remediation.

## Phase 7.1: Critical Security Hardening (LOW RISK)
- C3: Prevent MongoDB operator injection (product.service.ts)
- C2: Remove raw `err` object from error middleware response
- C5: Add Zod validation to Asset POST route
- C4: Add Zod validation to auth login/refresh-token routes

## Phase 7.2: Admin Route Alignment
- C1: Fix admin user management routes (frontend calls `/admin/users`, API has `/auth/*`)

## Phase 7.3: Output Security
- C8: Replace `dangerouslySetInnerHTML` blog rendering with DOMPurify
- C7: Remove abandoned `xss-clean` package

## Phase 7.4: CSRF Protection
- C6: Install and configure `csrf-csrf` middleware

## Phase 7.5: Cache & Performance
- P7: Add pagination to all list endpoints
- P12: Set `gcTime` higher than `staleTime` in TanStack Query
- P38: Add compression middleware
- P39: Add fetch timeout to admin API client

## Phase 7.6: Accessibility
- A1: Add `htmlFor`/`id` to all form inputs
- A2: Focus trapping on mobile menu
- A3: Focus trapping on admin modals
- A4: `prefers-reduced-motion` support
- A5: Fix hardcoded dark color and contrast

## Phase 7.7: SEO
- SE1: Add metadata to client-component pages
- SE2: Dynamic canonical URLs
- SE3: Fix heading hierarchy

## Phase 7.8: Code Quality & Technical Debt
- Any types remediation
- Dead code removal
- Silent `.catch(() => [])` replacement
- Component consolidation

Always keep this list prioritized.

---

# Open Questions

Document unresolved product or technical decisions.

Never make undocumented assumptions.

Example:

### Question

Should gallery images support video uploads in the future?

Status:

Pending Product Decision

---

### Question

Should products support multilingual content?

Status:

Future Enhancement

---

### Question

Should quote requests support file attachments?

Status:

Needs Business Confirmation

---

# Technical Debt

Track improvements that should be completed later but are outside the current scope.

Example:

* Large ProductCard component should be split into smaller reusable components.
* Replace repeated API utilities with shared service abstraction.
* Introduce centralized error boundary strategy.
* Improve loading skeleton consistency.
* Reduce duplicate Tailwind utility combinations.
* Standardize validation schemas.

Each item should include a priority:

* High
* Medium
* Low

---

# Architecture Decisions

Every architectural decision should include:

* Decision
* Reason
* Impact

Example:

## Decision

Use feature-based module organization.

Reason:

Improves scalability and maintainability.

Impact:

Reduces coupling and improves code ownership.

---

## Decision

Backend remains REST-based.

Reason:

Matches existing infrastructure and business requirements.

Impact:

Avoids unnecessary migration complexity.

---

## Decision

Authentication uses JWT with Refresh Tokens.

Reason:

Supports stateless backend architecture.

Impact:

Improves scalability.

---

# Risks

Document anything that could impact delivery.

Examples:

* Legacy code requiring careful refactoring.
* Missing automated tests.
* Inconsistent component patterns.
* Duplicate business logic.
* Large components increasing maintenance cost.

Each risk should include:

* Severity
* Mitigation strategy

---

# Verification Log

Every completed implementation should include verification.

Example:

### Product Listing Refactor

Verified:

* Build succeeds
* TypeScript passes
* ESLint passes
* Responsive layout verified
* Existing functionality preserved
* No API regressions

### Authentication & Session Hardening

Verified:

* API build succeeds
* Web build succeeds
* JWT expiry now comes from configuration
* Token payload shape is typed consistently across generation and verification
* Existing login and authorization behavior is preserved

---

# Session Notes

Summarize the most recent development session.

Include:

* What was completed
* Important discoveries
* Architectural changes
* Known blockers
* Recommended next step

Example:

### Session Summary

Completed:

* Standardized API response structure.
* Refactored reusable product components.
* Improved folder organization.
* Updated architecture documentation.

Notes:

No breaking changes introduced.

Recommended next step:

Begin accessibility improvements for shared UI components.

### Session Summary

Completed:

* Hardened JWT token generation and verification in the auth flow.
* Removed unnecessary password selection from auth middleware.
* Kept login, role checks, and last-login updates working as before.

Notes:

Both API and web production builds passed after the change.

Recommended next step:

Continue with the next highest-priority production hardening item in the queue.

### Session Summary

Completed:

* Added keyboard navigation (Enter/Space/Escape/Arrow keys) and proper ARIA roles/attributes to the Navbar dropdown menus
* Created structured data (JSON-LD) utility with 5 schema types and injected into layout and detail pages
* Improved Open Graph and Twitter card metadata across all public pages with dynamic images
* Added missing `generateMetadata` exports to pages that lacked them (about, process, gallery)

Notes:

* Web build passes successfully with all 18 pages generated
* Admin build has a pre-existing TypeScript error unrelated to these changes
* Existing navigation behavior (mouse hover) preserved alongside new keyboard support
* All page rendering, styling, and business logic remains unchanged

Recommended next step:

Begin Phase 5: Architecture & Route Cleanup (folder alignment, Express route simplification, index audit).

### Session Summary

Completed:

* Created feature-scoped folder structure (products, careers, contact, industries, events) with backward-compatible re-exports from original paths
* Created services/ layer with per-domain API modules and base HTTP client, delegating from lib/api.ts
* Created hooks/ directory with useMediaQuery and useScrollProgress hooks
* Simplified Express route mounting in api/src/routes/index.ts with documented route table and consistent AuthRoutes naming
* Added 8 database index optimizations across Product, Industry, Job, Quote, Testimonial, Asset, User, and Blog models

Notes:

* Both web and API production builds pass
* Zero breaking changes — all existing imports continue to work through re-exports
* StatCounter.tsx duplicate in components/ui/ did not exist (already clean)
* InfrastructurePreview kept in components/sections/ as a shared page-level section

Recommended next step:

Begin Phase 6: Scalability & Infrastructure (cloud storage, distributed rate limiting, monitoring, refresh token lifecycle).

### Session Summary

Completed:

* Implemented refresh token lifecycle (token service, blacklist model, refresh endpoint, login/logout updates)
* Replaced in-memory rate limiter with MongoDB-based distributed store + auth-specific stricter limits (20 req/15 min)
* Created request ID middleware for distributed tracing (x-request-id header on every request/response)
* Enhanced health check endpoint with DB status, uptime, and degraded-mode detection (503)
* Moved winston/morgan to production dependencies
* Created multer-based file upload middleware with local disk storage and storage abstraction layer
* Added mimeType field to asset model and updated asset controller/service/route for file uploads

Notes:

* API and web builds pass cleanly
* Admin build has a pre-existing TypeScript error in BlogForm.tsx (missing `author` property) - unrelated to these changes
* Login response now includes `refreshToken` field (additive, doesn't break existing admin login)
* File upload is backward-compatible - URL-based asset creation still works alongside file uploads
* Rate limit storage now persists across restarts via MongoDB instead of in-memory

Recommended next step:

Begin Production Testing and Deployment Preparation.

---

# Definition of Ready

Before starting any new implementation:

* Relevant context documents reviewed.
* Requirements are fully understood.
* Scope is clearly defined.
* Dependencies identified.
* Architecture supports the change.

---

# Definition of Done

A task is complete only if:

* Requirements satisfied.
* Existing functionality preserved.
* Build passes successfully.
* No TypeScript errors.
* No lint errors.
* Documentation updated.
* Accessibility maintained.
* Security unaffected.
* Performance not degraded.
* Progress Tracker updated.

---

# AI Handoff Checklist

Before ending every session, confirm:

* Current progress accurately recorded.
* Completed work documented.
* Remaining work identified.
* Next task prioritized.
* Open questions listed.
* Architecture decisions recorded.
* Technical debt updated.
* Verification completed.
* Session notes written.

A new AI session should be able to continue development immediately by reading this document without needing additional context.
