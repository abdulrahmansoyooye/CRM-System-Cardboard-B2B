# Code Standards

## Purpose

This document defines the mandatory engineering standards for the project.

Every new feature, refactor, bug fix, optimization, or enhancement must comply with these standards.

Consistency is prioritized over personal coding preferences.

When multiple valid approaches exist, choose the one that best aligns with these standards.

---

# General Engineering Principles

## Single Responsibility Principle

Every module, component, hook, service, utility, and function should have one clearly defined responsibility.

Avoid "God" components that manage UI, state, API calls, and business logic simultaneously.

---

## Prefer Refactoring Over Rewriting

The application already exists.

Improve existing implementations whenever possible instead of replacing them completely.

Preserve business behavior while improving quality.

---

## Solve Root Causes

Never patch symptoms.

Always identify and resolve the underlying issue instead of layering temporary workarounds.

---

## Keep Modules Small

Prefer smaller reusable modules over large files.

Recommended maximum sizes:

* Components: 200–300 lines
* Hooks: 150 lines
* Services: 200 lines
* Utility files: 150 lines

Large files should be broken into logical modules.

---

## Separation of Concerns

Never mix unrelated responsibilities.

Examples:

* UI should not contain business logic.
* Services should not contain presentation logic.
* Components should not directly access databases.
* Controllers should not contain database queries.

---

## DRY (Don't Repeat Yourself)

Avoid duplicated:

* Logic
* Validation
* Types
* API requests
* Constants
* Styles

Extract reusable functionality.

---

## KISS (Keep It Simple)

Choose the simplest solution that satisfies the requirements.

Avoid unnecessary abstractions or overly clever implementations.

---

## Readability Over Cleverness

Code should be understandable by another developer without additional explanation.

Prefer descriptive names over shortened identifiers.

---

# Naming Conventions

## Components

Use PascalCase.

Examples:

* ProductCard
* HeroSection
* ContactForm

---

## Hooks

Prefix with `use`.

Examples:

* useProducts
* usePagination
* useQuoteForm

---

## Utilities

Use camelCase.

Examples:

* formatCurrency
* generateSlug
* calculateReadingTime

---

## Constants

Use UPPER_SNAKE_CASE.

Examples:

* MAX_UPLOAD_SIZE
* DEFAULT_PAGE_SIZE

---

## Files

Use kebab-case unless framework conventions require otherwise.

Examples:

* product-card.tsx
* api-client.ts
* seo-utils.ts

---

## Variables

Use descriptive camelCase names.

Avoid abbreviations unless they are widely understood.

---

# TypeScript Standards

## Strict Mode

TypeScript strict mode is mandatory.

No implementation should bypass type safety.

---

## Avoid `any`

Never use `any` unless there is a documented and unavoidable reason.

Prefer:

* interfaces
* type aliases
* generics
* discriminated unions
* unknown with validation

---

## Validate Unknown Data

Every external input must be validated before use.

Examples:

* API requests
* URL parameters
* Query strings
* Form data
* File uploads

Use Zod schemas for validation.

---

## Shared Types

Common interfaces belong inside the shared `/types` directory.

Avoid duplicating interfaces across features.

---

## Type Inference

Use inference where it improves readability.

Explicitly annotate public APIs, exported functions, and complex return types.

---

# React & Next.js Standards

## Server Components by Default

Use Server Components whenever client-side interactivity is unnecessary.

---

## Client Components Only When Required

Add `"use client"` only for:

* State management
* Event handlers
* Browser APIs
* Client-side effects

Avoid unnecessary client bundles.

---

## Component Composition

Prefer composing smaller components over creating large monolithic components.

---

## Data Fetching

Prefer server-side data fetching where appropriate.

Avoid duplicate client requests.

---

## Route Responsibilities

Pages should primarily compose layouts and feature components.

Business logic belongs in services or server actions.

---

## Metadata

Every public page must export appropriate metadata.

Include:

* title
* description
* Open Graph
* Twitter metadata
* canonical URL

---

## Images

Always use the Next.js `Image` component unless there is a valid technical reason not to.

Images must include descriptive `alt` text.

---

# Styling Standards

## Tailwind CSS First

Use Tailwind CSS utility classes before creating custom CSS.

---

## Design Tokens

Do not hardcode:

* Colors
* Spacing
* Border radius
* Shadows
* Typography

Use design tokens defined in the design system.

---

## Responsive Design

Design mobile-first.

Support:

* Mobile
* Tablet
* Desktop
* Large Desktop

Avoid fixed pixel layouts.

---

## Component Consistency

Buttons, cards, forms, badges, alerts, and tables should reuse shared components.

Avoid duplicate styling.

---

## Animation

Use subtle animations that improve usability.

Avoid excessive motion.

Respect reduced-motion preferences.

---

# API Standards

## RESTful Design

Use predictable REST conventions.

Examples:

* GET /products
* GET /products/:slug
* POST /admin/products
* PUT /admin/products/:id
* DELETE /admin/products/:id

---

## Validation First

Validate every request before executing business logic.

---

## Authentication

Protected endpoints must require valid authentication.

---

## Authorization

Verify user permissions before every mutation.

Never rely on frontend validation.

---

## Consistent Responses

Success responses:

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

## Error Handling

Return meaningful HTTP status codes.

Avoid exposing internal implementation details.

Log server errors appropriately.

---

# Database Standards

## Single Source of Truth

Store structured business data only once.

Avoid duplicate records.

---

## Relationships

Use references consistently.

Maintain referential integrity.

---

## Soft Deletes

Prefer soft deletes for business-critical data where recovery may be required.

---

## Index Frequently Queried Fields

Index:

* Slugs
* Email
* Categories
* Status
* Foreign keys
* Frequently filtered fields

---

## Migrations

Schema changes must remain backward-compatible whenever possible.

---

# File Upload Standards

Allowed formats:

* JPG
* PNG
* WEBP
* PDF (resumes only)

Maximum sizes:

* Images: 2MB
* Resume PDFs: 5MB

Only file paths or URLs should be stored in the database.

---

# Security Standards

Every implementation must consider:

* Input validation
* Output sanitization
* XSS prevention
* CSRF protection
* Rate limiting
* Password hashing
* Secure HTTP headers
* Environment variable protection

Never expose secrets in client-side code.

---

# Performance Standards

Avoid:

* Duplicate API requests
* Large bundles
* Unnecessary renders
* Deep component trees
* Unoptimized images
* Blocking operations

Prefer:

* Lazy loading
* Memoization when justified
* Code splitting
* Pagination
* Efficient caching
* Optimized database queries

---

# Accessibility Standards

Every UI implementation must include:

* Semantic HTML
* Keyboard accessibility
* Proper heading hierarchy
* Visible focus indicators
* ARIA attributes where appropriate
* Accessible form labels
* Screen reader compatibility

Accessibility is a required quality standard, not an optional enhancement.

---

# Testing Standards

New or modified functionality should be verifiable.

Consider:

* Happy path
* Error states
* Loading states
* Empty states
* Responsive behavior
* Permission checks
* Validation failures

---

# Logging Standards

Log:

* Authentication events
* Server errors
* Failed API requests
* Unexpected exceptions

Never log:

* Passwords
* Tokens
* Secrets
* Sensitive personal information

---

# File Organization

## `/app`

Routing, layouts, metadata, loading states, and page composition.

---

## `/components`

Reusable presentation components shared across multiple features.

---

## `/features`

Feature-specific modules containing components, hooks, services, validation, and business logic.

Examples:

* Products
* Blog
* Careers
* Contact
* Gallery
* Events

---

## `/lib`

Shared utilities, helpers, constants, API clients, environment utilities, and reusable functions.

---

## `/hooks`

Reusable React hooks with no feature-specific coupling.

---

## `/services`

Backend communication layer responsible for API requests and response handling.

---

## `/types`

Shared TypeScript interfaces, DTOs, API contracts, and domain models.

---

## `/server`

Backend implementation including routes, controllers, services, middleware, validation, and database models.

---

## `/public`

Static assets such as logos, icons, downloadable resources, and optimized images.

---

## `/context`

Project documentation that defines architecture, business rules, coding standards, production requirements, and AI guidance.

This directory must never contain runtime application code.

---

# Production Checklist for Every Pull Request

Before code is considered complete, verify:

* Builds successfully
* No TypeScript errors
* No ESLint errors
* No unused imports
* No dead code
* No duplicated logic
* No accessibility regressions
* No security regressions
* No performance regressions
* Documentation updated where required
* Existing functionality preserved

Only production-quality code should be merged into the main branch.
