# Architecture Context

## Purpose

This document defines the architectural foundation of the project.

Every implementation must respect the architectural boundaries defined here.

The application follows a modular, scalable, production-ready architecture where each layer has a single responsibility. Business logic, presentation, data access, authentication, and infrastructure concerns must remain isolated.

---

# Technology Stack

| Layer              | Technology                                                   | Responsibility                                              |
| ------------------ | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Frontend           | Next.js (App Router) + TypeScript                            | Public website, Admin Dashboard, Routing, Server Components |
| Styling            | Tailwind CSS                                                 | Responsive styling and design system implementation         |
| UI Components      | shadcn/ui + Radix UI                                         | Accessible, reusable UI components                          |
| Forms              | React Hook Form + Zod                                        | Form state management and validation                        |
| State Management   | TanStack Query + React Context                               | Server state, caching, client state where necessary         |
| Backend API        | Node.js + Express.js                                         | Business logic, REST APIs, authentication, validation       |
| Database           | MongoDB + Mongoose                                           | Primary data persistence                                    |
| Authentication     | JWT + Refresh Tokens                                         | Secure authentication and session management                |
| Authorization      | Role-Based Access Control (RBAC)                             | Permission enforcement across admin modules                 |
| File Storage       | Local Uploads (Production-ready for S3/Cloudinary migration) | Product images, gallery images, certifications, resumes     |
| Image Optimization | Next.js Image                                                | Responsive image optimization                               |
| Validation         | Zod                                                          | Request and response validation                             |
| Logging            | Winston / Pino                                               | Structured application logging                              |
| Security           | Helmet, CORS, Rate Limiter, bcrypt                           | Secure HTTP headers, request protection, password hashing   |
| Deployment         | Docker + Nginx                                               | Containerized deployment and reverse proxy                  |
| CI/CD              | GitHub Actions                                               | Automated testing, linting, and deployment                  |
| Monitoring         | Sentry + Google Analytics                                    | Error monitoring and website analytics                      |

---

# High-Level Architecture

```
                 Users
                   │
                   ▼
        Next.js Frontend (Public + Admin)
                   │
         REST API Requests (HTTPS)
                   │
                   ▼
          Express.js Backend API
                   │
     ┌─────────────┼─────────────┐
     │             │             │
Authentication   Business Logic   Validation
     │             │             │
     └─────────────┼─────────────┘
                   │
             Data Access Layer
                   │
                   ▼
          MongoDB Database
                   │
                   ▼
            File Storage Layer
```

Each layer communicates only with the layer directly beneath it.

No layer should bypass another.

---

# Project Structure Responsibilities

## `/app`

Owns:

* App Router pages
* Layouts
* Route groups
* Metadata
* Server Components
* Route-level loading and error boundaries

Must never contain business logic.

---

## `/components`

Owns:

* Reusable UI components
* Shared layouts
* Cards
* Navigation
* Forms
* Modals
* Tables
* Dialogs

Components should remain presentation-focused.

---

## `/features`

Owns complete feature modules.

Examples:

* Products
* Blog
* Careers
* Contact
* Events
* Gallery
* Authentication

Each feature owns:

* Components
* Hooks
* Services
* Validation
* Types

Features must remain independent whenever possible.

---

## `/lib`

Owns shared utilities.

Examples:

* API client
* Authentication helpers
* Formatters
* Constants
* Environment helpers
* Shared utility functions

Must not contain feature-specific business logic.

---

## `/hooks`

Owns reusable React hooks.

Hooks should encapsulate reusable client-side logic.

---

## `/services`

Owns communication with backend services.

Responsibilities include:

* HTTP requests
* API abstraction
* Response transformation
* Error normalization

No UI logic belongs here.

---

## `/types`

Owns shared TypeScript types.

Includes:

* DTOs
* API responses
* Domain models
* Shared interfaces

---

## `/context`

Owns project documentation and AI context.

This directory defines:

* Architecture
* Standards
* Business rules
* Progress tracking
* Production requirements

No runtime code belongs here.

---

## `/server`

Owns backend implementation.

Responsibilities:

* Controllers
* Services
* Middleware
* Validation
* Routes
* Database models

Presentation logic must never exist here.

---

# Storage Model

## MongoDB

Stores:

* Products
* Categories
* Industries
* Blogs
* Events
* Careers
* Job Applications
* Testimonials
* Contact Inquiries
* Quote Requests
* Website Settings
* Users
* Roles

MongoDB is the single source of truth for structured business data.

---

## File Storage

Stores:

* Product images
* Gallery images
* Certifications
* Resume uploads
* Blog images
* Event images
* Company branding assets

Only file paths or URLs are stored in the database.

---

## Environment Variables

Stores:

* JWT secrets
* Database connection strings
* API keys
* Analytics IDs
* SMTP credentials
* Cloud storage credentials

Sensitive configuration must never be committed to version control.

---

# Authentication Model

Authentication is restricted to the administrative system.

Public visitors do not require authentication.

Authentication flow:

1. User logs in.
2. Credentials are validated.
3. JWT Access Token is issued.
4. Refresh Token manages session renewal.
5. Protected routes validate tokens before execution.

Passwords are always hashed using bcrypt.

Plain-text passwords are never stored.

---

# Authorization Model

Role-Based Access Control (RBAC) is mandatory.

Supported roles:

* Super Admin
* Admin
* Content Manager
* HR Manager
* Sales Manager

Permissions are enforced in middleware before controller execution.

Controllers must never assume permissions.

---

# Data Ownership Model

Each module owns its own data.

Examples:

Products own:

* Specifications
* Images
* Categories
* SEO metadata

Blogs own:

* Content
* Tags
* Featured image
* Publishing status

Jobs own:

* Applications
* Status
* Department

Relationships must be maintained using document references.

---

# Architectural Boundaries

Frontend:

* Displays data
* Collects user input
* Calls APIs

Backend:

* Validates requests
* Executes business logic
* Persists data

Database:

* Stores data only

No layer may assume responsibilities belonging to another.

---

# Communication Rules

Frontend communicates only through REST APIs.

Controllers communicate with Services.

Services communicate with Models.

Models communicate with MongoDB.

Direct database access from UI components is prohibited.

---

# Invariants

The following rules must never be violated.

## 1. Separation of Concerns

Business logic must never exist inside UI components.

---

## 2. Single Source of Truth

Every piece of business data must have exactly one authoritative source.

Avoid duplicated state.

---

## 3. API-First Communication

All data mutations must occur through authenticated API endpoints.

Direct database manipulation outside the backend is prohibited.

---

## 4. Stateless Backend

The backend must remain stateless.

Application state belongs in the database or cache, not server memory.

---

## 5. Validation at Every Boundary

Every external request must be validated before reaching business logic.

Never trust client input.

---

## 6. Security by Default

Authentication, authorization, validation, sanitization, and rate limiting are mandatory for every protected endpoint.

---

## 7. Reusable Components

UI components must be reusable, composable, and independent of page-specific business logic.

---

## 8. Accessibility First

Every user interface must meet modern accessibility standards using semantic HTML, keyboard navigation, proper focus management, and ARIA attributes where appropriate.

---

## 9. Performance Matters

Avoid unnecessary rendering, duplicate network requests, oversized bundles, and inefficient database queries.

Every implementation should improve or preserve performance.

---

## 10. Documentation Consistency

Whenever architectural decisions change, the relevant context documents must be updated immediately.

The documentation must always accurately represent the current system.
