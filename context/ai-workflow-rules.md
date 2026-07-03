# AI Workflow Rules

## Purpose

This document defines the mandatory workflow that every AI agent must follow while working on this project.

The objective is **not to rebuild the application**, but to transform the existing codebase into a scalable, maintainable, secure, performant, and production-ready system while preserving existing business functionality.

Every implementation decision must align with the project's context documents. The context folder is the single source of truth for architecture, business rules, coding standards, UI conventions, and feature behavior.

---

# Development Philosophy

The project already exists.

The AI must prioritize:

* Refactoring over rewriting
* Improving over replacing
* Preserving business behavior
* Incremental improvements
* Long-term maintainability
* Production-grade engineering practices

Avoid unnecessary rewrites simply because a different implementation appears cleaner.

If existing code is correct, improve it instead of replacing it.

---

# Primary Sources of Truth

Before making any code changes, review every relevant document inside the `/context` directory.

At minimum:

* project-overview.md
* architecture.md
* coding-standards.md
* ui-design-system.md
* component-rules.md
* api-contracts.md
* database-schema.md
* security.md
* performance.md
* seo.md
* accessibility.md
* testing.md
* production-checklist.md
* progress-tracker.md

If multiple documents conflict, follow this priority:

1. Business Requirements
2. Architecture
3. Security
4. API Contracts
5. Database Schema
6. UI Design System
7. Coding Standards

Never invent behavior that contradicts these documents.

---

# Overall Development Approach

This project follows a context-driven, specification-first workflow.

Every implementation must be based on documented requirements rather than assumptions.

The AI should:

1. Understand the existing implementation.
2. Compare it against the context documents.
3. Identify technical debt.
4. Refactor incrementally.
5. Verify functionality.
6. Update documentation.
7. Proceed to the next task.

The objective is continuous improvement without introducing regressions.

---

# Refactoring Principles

Every code change should improve at least one of the following:

* Readability
* Maintainability
* Performance
* Accessibility
* Security
* Scalability
* Reliability
* Testability
* Reusability

Avoid cosmetic refactors that provide no engineering value.

---

# Scoping Rules

Only work on one logical feature or subsystem at a time.

Examples include:

* Authentication
* Navigation
* Product Listing
* Product Details
* Blog Module
* Contact Form
* Careers
* Dashboard
* API Integration
* SEO
* Performance Optimization

Never combine unrelated concerns into a single implementation.

---

# Maximum Scope Per Task

Each implementation should be small enough to:

* Review easily
* Test independently
* Build successfully
* Deploy safely
* Roll back if necessary

Large changes should always be broken into smaller milestones.

---

# When Work Must Be Split

Split implementation whenever it combines multiple architectural boundaries.

Examples include:

### UI + Backend

Do not redesign UI while also modifying API behavior.

Complete one before the other.

---

### API + Database

Do not redesign API contracts while restructuring database models.

---

### Multiple Independent Features

Examples:

* Careers
* Blog
* Product Catalog

Each should be completed independently.

---

### Refactor + New Feature

Never introduce new functionality while performing a production refactor unless explicitly requested.

---

### Large Component Trees

Break work into:

* Layout
* Components
* State Management
* Data Fetching
* Accessibility
* Testing

---

# Existing Code First

Before creating anything new:

* Search for reusable components.
* Search for existing utilities.
* Search for shared hooks.
* Search for existing services.
* Search for existing types.

Avoid duplication.

Always extend existing architecture where appropriate.

---

# Production Quality Expectations

Every completed implementation must satisfy:

## Maintainability

* Small functions
* Clear naming
* Single Responsibility Principle
* Low coupling
* High cohesion

---

## Readability

* Self-documenting code
* Minimal comments
* Descriptive variable names
* Consistent formatting

---

## Scalability

Design for future growth.

Avoid hardcoded values.

Prefer configuration over duplication.

---

## Performance

Avoid:

* Unnecessary re-renders
* Duplicate API requests
* Large client bundles
* Blocking operations
* Deep component nesting

Prefer:

* Lazy loading
* Code splitting
* Memoization where appropriate
* Image optimization
* Efficient caching

---

## Security

Every implementation must consider:

* Input validation
* Output encoding
* Authentication
* Authorization
* XSS prevention
* CSRF protection
* Secure file uploads
* Rate limiting
* Environment variable protection

Never expose secrets.

---

## Accessibility

Every UI change must include:

* Semantic HTML
* Keyboard navigation
* Proper heading hierarchy
* Focus management
* Color contrast compliance
* ARIA attributes where necessary
* Screen reader compatibility

---

## SEO

Public pages must include:

* Proper metadata
* Canonical URLs
* Open Graph support
* Structured heading hierarchy
* Schema-ready markup
* Optimized images
* Crawlable content

---

# Handling Missing Requirements

Never invent product behavior.

If documentation is incomplete:

1. Stop implementation.
2. Record the missing requirement.
3. Add it to `progress-tracker.md`.
4. Request clarification if necessary.

Temporary assumptions are not allowed unless explicitly documented.

---

# Handling Existing Bugs

If unrelated bugs are discovered:

* Document them.
* Do not silently fix them unless they block current work.
* Record them inside `progress-tracker.md`.

Avoid expanding scope unnecessarily.

---

# Documentation Synchronization

Whenever implementation changes:

Update relevant context documents.

Examples:

* Architecture changes
* Folder structure
* API contracts
* Database schema
* Coding conventions
* Security decisions
* Performance strategy
* Component architecture

Documentation must never become outdated.

---

# Protected Areas

Unless explicitly instructed, do not modify:

* Third-party libraries
* Generated code
* Build configuration
* Dependency lock files
* Generated UI library components
* Vendor code
* Environment configuration
* CI/CD configuration

Only modify project-owned source code.

---

# Code Quality Rules

Every implementation must:

* Pass linting
* Pass formatting
* Build successfully
* Avoid TypeScript errors
* Avoid unused code
* Avoid dead imports
* Avoid duplicated logic

---

# Testing Expectations

Every completed task should include verification where applicable:

* Functional testing
* Component behavior
* Responsive layout
* Error handling
* Edge cases
* Loading states
* Empty states

Never consider a task complete without verification.

---

# Definition of Done

A feature is complete only when:

* Requirements are fully satisfied.
* Existing functionality is preserved.
* Production standards are met.
* Documentation is updated.
* Build succeeds.
* No new lint errors exist.
* No TypeScript errors exist.
* Performance has not regressed.
* Accessibility requirements are satisfied.
* Security requirements remain intact.

---

# Before Moving to the Next Task

Confirm:

1. The current implementation works end-to-end.
2. No architectural boundary has been violated.
3. Context documentation reflects the latest implementation.
4. Progress Tracker has been updated.
5. The application builds successfully.
6. Existing functionality remains unchanged.
7. No production standards have been compromised.

Only then may work continue.

---

# Guiding Principle

Every decision should move the project closer to a production-ready application.

When multiple valid solutions exist, prefer the one that is:

* Easiest to maintain
* Most scalable
* Most secure
* Most readable
* Most performant
* Most consistent with the existing architecture

The AI is expected to behave like a senior software engineer performing a production refactor—not as a code generator creating a new application from scratch.
