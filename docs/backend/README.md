# CARDBOX Backend — Production Architecture Reference

## Overview

The CARDBOX backend is a stateless REST API built with **Express.js 5** and **TypeScript 5**, using **MongoDB** (via Mongoose ODM) for data persistence. It serves the public website and admin dashboard with a unified API layer under `/api/v1`.

**Port**: `4000` (configurable via `PORT` env)

**Entry Point**: `api/src/server.ts`

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Request Lifecycle](#request-lifecycle)
3. [Modules](#modules)
4. [Controllers](#controllers)
5. [Services](#services)
6. [Middleware](#middleware)
7. [Validation](#validation)
8. [Authentication](#authentication)
9. [Authorization](#authorization)
10. [Error Handling](#error-handling)
11. [Logging](#logging)
12. [File Uploads](#file-uploads)
13. [Database Access](#database-access)
14. [Configuration](#configuration)
15. [Environment Variables](#environment-variables)
16. [Security](#security)
17. [Performance](#performance)
18. [Route Map](#route-map)

---

## Folder Structure

```
api/
├── src/
│   ├── server.ts                  # Entry point: MongoDB connect, HTTP listen, graceful shutdown
│   ├── app.ts                     # Express app assembly: middleware pipeline, routes, error handler
│   │
│   ├── config/
│   │   ├── index.ts               # Environment config loader (getRequiredEnv, getSecretEnv)
│   │   └── db.ts                  # Database connection helper
│   │
│   ├── core/
│   │   ├── errors/
│   │   │   └── AppError.ts        # Custom error class with statusCode, isOperational
│   │   ├── logger/                # (reserved for logger configuration)
│   │   └── response/
│   │       └── sendResponse.ts    # Standardized JSON response helper
│   │
│   ├── middleware/                 # 8 middleware modules
│   │   ├── auth.middleware.ts      # JWT verification + RBAC enforcement
│   │   ├── cache.middleware.ts     # Cache-Control header injection
│   │   ├── error.middleware.ts     # Global error handler (Zod, Mongoose, AppError, DuplicateKey)
│   │   ├── morgan.middleware.ts    # HTTP request logging via Morgan + Winston
│   │   ├── requestId.middleware.ts # UUID x-request-id per request (distributed tracing)
│   │   ├── role.middleware.ts      # Role-based guard utility
│   │   ├── upload.middleware.ts    # Multer file upload config (10 MB, UUID filenames)
│   │   └── validate.middleware.ts  # Zod schema validation wrapper
│   │
│   ├── module/                     # 13 feature modules
│   │   ├── asset/                  # Image/document asset management
│   │   ├── auth/                   # User CRUD, login/logout, JWT, token blacklist
│   │   ├── blog/                   # Blog posts with HTML content
│   │   ├── category/               # Product categories with virtual products population
│   │   ├── event/                  # Company events and updates
│   │   ├── industry/               # Industries served with related products
│   │   ├── inquiry/                # Contact inquiries (B2B leads)
│   │   ├── job/                    # Job listings
│   │   ├── job_application/        # Job applications/resumes
│   │   ├── product/                # Product catalog (paginated, searchable, filtered)
│   │   ├── quote/                  # Quotation requests
│   │   ├── setting/                # Website settings (branding, SEO, social)
│   │   └── testimonial/            # Customer testimonials
│   │
│   ├── routes/
│   │   └── index.ts                # Route aggregator (mounts all module routes)
│   │
│   ├── types/
│   │   ├── dtos.ts                 # 15 typed DTOs for create/update operations
│   │   ├── express.d.ts            # Express Request augmentation (requestId, user, file)
│   │   └── rate-limit-mongo.d.ts   # Type declaration for rate-limit-mongo
│   │
│   ├── utils/
│   │   ├── asyncHandler.ts         # Async error wrapper for controllers
│   │   ├── hash.ts                 # bcrypt password hash/compare
│   │   ├── jwt.ts                  # JWT sign/verify (access + refresh tokens)
│   │   ├── logger.ts               # Winston logger instance
│   │   ├── sanitize.ts             # HTML sanitization (XSS prevention)
│   │   ├── slug.ts                 # URL slug generation
│   │   └── storage.ts              # File storage abstraction (local disk, ready for S3)
│   │
│   └── scripts/
│       └── seed.ts                 # Database seed script (demo data)
│
├── .env                            # Environment variables (gitignored)
├── tsconfig.json                   # TypeScript strict mode, ES2022, NodeNext
├── package.json
└── dist/                           # Compiled output
```

---

## Request Lifecycle

```
Request
  │
  ▼
1. requestId.middleware       ── Attach UUID to request/response (x-request-id)
  │
  ▼
2. morgan.middleware          ── Log HTTP method, URL, status, response time
  │
  ▼
3. helmet()                   ── Secure HTTP headers
  │
  ▼
4. cors()                     ── CORS validation
  │
  ▼
5. express.json()             ── Body parsing
  │
  ▼
6. express.static('/uploads') ── Serve uploaded files
  │
  ▼
7. cache.middleware           ── Set Cache-Control headers (applied to /api/v1 routes)
  │
  ▼
8. Global Rate Limiter        ── 100 req/15 min (MongoDB store)
  │
  ▼
9. Auth Rate Limiter          ── 20 req/15 min (applied to /api/v1/auth)
  │
  ▼
10. Route Matching            ── Router dispatches to controller
  │
  ▼
11. validate.middleware       ── Zod schema validation (body, query, params)
  │
  ▼
12. auth.middleware           ── JWT verification + role check (if admin route)
  │
  ▼
13. Controller                ── Extracts params, calls service, sends response
  │
  ▼
14. Service                   ── Business logic, calls model
  │
  ▼
15. Model                     ── Mongoose document operations
  │
  ▼
16. MongoDB                   ── Database persistence
  │
  ▼
17. Global Error Handler      ── Catches errors, sends consistent error response
```

---

## Modules

Each module follows a consistent 5-file pattern:

```
module/{name}/
├── {name}.model.ts       ── Mongoose schema + model
├── {name}.service.ts     ── Business logic (CRUD operations)
├── {name}.controller.ts  ── Request/response handling
├── {name}.route.ts       ── Route definitions (public + admin)
└── {name}.validation.ts  ── Zod validation schemas
```

### Module Summary

| Module | MongoDB Collection | Public Endpoints | Admin Endpoints | Notable |
|--------|-------------------|-----------------|-----------------|---------|
| auth | `users`, `token_blacklists` | login, logout, refresh-token | create, getAll, getById, update, deactivate | JWT + refresh tokens, bcrypt hashing |
| product | `products` | GET list, GET by slug | POST, PUT, DELETE | Paginated, searchable, MongoDB injection prevention |
| category | `categories` | GET list, GET by slug | POST, PUT, DELETE | Virtual products population |
| blog | `blogs` | GET list, GET by slug | POST, PUT, DELETE | XSS sanitization on content |
| event | `events` | GET list, GET by ID | POST, PUT, DELETE | XSS sanitization on description |
| industry | `industries` | GET list, GET by slug | POST, PUT, DELETE | Populated relatedProducts, XSS sanitization |
| job | `jobs` | GET list, GET by ID | POST, PUT, DELETE | — |
| job_application | `job_applications` | POST (apply) | GET list, GET by ID, PUT, DELETE | — |
| inquiry | `inquiries` | POST (contact) | GET list, GET by ID, PUT, DELETE | Status tracking, assignment |
| quote | `quotes` | POST (quote request) | GET list, GET by ID, PUT, DELETE | Product reference |
| testimonial | `testimonials` | GET list, GET by ID | POST, PUT, DELETE | Published filter |
| asset | `assets` | GET list | POST (with file upload), DELETE | Multer file handling, disk cleanup |
| setting | `settings` | GET list | POST, PUT | Singleton-ish (single document) |

---

## Controllers

Controllers are responsible for:
1. Extracting data from `req.params`, `req.query`, `req.body`, `req.file`
2. Calling the appropriate service method
3. Sending a standardized response via `sendResponse()`

**Pattern**: Every controller function is wrapped with `asyncHandler()` to catch async errors and forward them to the global error handler.

**Standard export**: Each module exports a `{Module}Controller` object containing all handler functions.

**Example** (`product.controller.ts`):
```
create(req, res)        → calls ProductService.createProduct()
getAll(req, res)        → calls ProductService.getAllProducts() + returns pagination meta
getBySlug(req, res)     → calls ProductService.getProductBySlug()
update(req, res)        → calls ProductService.updateProduct()
deleteProduct(req, res) → calls ProductService.deleteProduct()
```

---

## Services

Services contain all business logic and database operations. They:
- Call Mongoose models for CRUD
- Generate slugs from names
- Sanitize HTML content before storage
- Handle pagination, filtering, sorting, field selection
- Throw `AppError` for business rule violations
- Coordinate across modules (e.g., asset service cleans up files)

**Example** (`product.service.ts`):
- `createProduct()` — generates slug, checks uniqueness, creates document
- `getAllProducts()` — implements search, filter, sort, paginate, field-select pipeline
- `getProductBySlug()` — finds by slug, populates category, throws 404 if missing
- `updateProduct()` — regenerates slug if name changed
- `deleteProduct()` — hard delete

**MongoDB Injection Prevention** (in product service): All keys starting with `$` are stripped from query objects before they reach MongoDB.

---

## Middleware

### 1. requestId.middleware.ts
- Attaches a UUID to `req.requestId` and `x-request-id` response header
- Propagates incoming `x-request-id` if provided by client
- Enables distributed tracing across requests

### 2. morgan.middleware.ts
- Logs HTTP requests using the "dev" format
- Routes output through Winston logger at `http` level
- Skipped when `NODE_ENV !== 'development'`

### 3. cache.middleware.ts
- Injects `Cache-Control` headers based on resource type
- Public resources (products, blogs, etc.): `public, max-age=60-300, s-maxage=120-600, stale-while-revalidate=300-3600`
- Admin/auth routes: `private, no-cache, no-store, must-revalidate`
- Implements `Vary: Accept-Encoding` for public, `Vary: Authorization` for protected routes
- Non-GET requests bypass caching

### 4. auth.middleware.ts
- Extracts Bearer token from `Authorization` header
- Verifies JWT using the shared `verifyToken()` helper
- Looks up user by email from decoded payload
- Checks `isActive` status (403 if inactive)
- Checks role against required roles array (403 if insufficient)
- Sets `req.user` with `{ id, email, role }` for downstream use

### 5. role.middleware.ts
- Standalone role guard utility
- Checks `req.user.role` against allowed roles array
- Throws 401 if user context missing, 403 if role not permitted

### 6. validate.middleware.ts
- Wraps async handler that calls `schema.parseAsync()` on `req.body`, `req.query`, `req.params`, `req.cookies`
- Allows Zod to validate all inputs before reaching controller
- On failure, throws ZodError which is caught by global error handler

### 7. upload.middleware.ts
- Multer configuration for file uploads
- Storage: local disk at `UPLOAD_DIR` (default: `./uploads`), UUID-based filenames
- Allowed MIME types: JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX
- Max file size: 10 MB
- Exports `uploadSingle` (single file, field `file`) and `uploadMultiple` (array, field `files`, max 10)

### 8. error.middleware.ts
- Global error handler (Express error middleware signature)
- Handles error types:
  - `ZodError` → 400 Validation Error (maps issues to path/message)
  - Mongoose `ValidationError` → 400 (maps error paths)
  - MongoDB `code 11000` → 400 Duplicate Key (extracts field name)
  - `AppError` → uses `statusCode` and `message` from error
  - Generic `Error` → 500 Internal Server Error
  - Unknown → 500
- Returns `stack` only in development mode

---

## Validation

**Framework**: Zod 4.x

**Location**: Each module has a `{name}.validation.ts` file.

**Structure**: Every schema wraps fields inside `body:` to match the `validateRequest` middleware's expectations (it runs `schema.parseAsync({ body: req.body, query: req.query, params: req.params })`).

**Pattern**:
```typescript
export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product name is required' }).min(3),
    categoryId: z.string({ message: 'Category ID is required' }),
    // ... all optional fields
  }).strict(),  // .strict() rejects unknown fields
});
```

**Strict mode**: All schemas use `.strict()` to reject unexpected fields, preventing mass-assignment attacks.

**Coverage**: All admin create and update endpoints have Zod validation. Public endpoints that accept POST data (login, contact, quote, job application) also have validation.

---

## Authentication

### Mechanism: JWT (Access + Refresh Tokens)

**Token Service** (`api/src/module/auth/token.service.ts`):

| Token | Secret | Expiry (default) | Purpose |
|-------|--------|-------------------|---------|
| Access | `JWT_ACCESS_SECRET` | 1 day (`JWT_ACCESS_EXPIRES_IN`) | Authorizes API requests |
| Refresh | `JWT_REFRESH_SECRET` | 30 days (`JWT_REFRESH_EXPIRES_IN`) | Obtains new access tokens |

**Token Payload** (`AuthTokenPayload`):
```typescript
{
  id: string;       // User ObjectId
  email: string;    // User email
  role: string;     // User role
  type: 'access' | 'refresh';  // Token type discrimination
  iat: number;      // Issued at
  exp: number;      // Expiry timestamp
}
```

**Flow**:
1. Login → validate credentials → issue access + refresh tokens
2. API calls → extract Bearer token → verify JWT → validate user active → check role
3. Token refresh → verify refresh token → check blacklist → issue new pair → blacklist old
4. Logout → extract Bearer token → blacklist the associated refresh token

**Password Hashing**: bcrypt with 12 salt rounds (configurable via `BCRYPT_SALT_ROUNDS`)

**Blacklist**: TokenBlacklist MongoDB collection with TTL index on `expiresAt` for automatic cleanup.

---

## Authorization

### Role-Based Access Control (RBAC)

**Roles** (ordered by privilege):

| Role | Description |
|------|-------------|
| `super_admin` | Full system access, bypasses most role checks |
| `admin` | General administrative access |
| `content_manager` | Content editing (blogs, events, industries) |
| `hr_manager` | Jobs and applications management |
| `sales_manager` | Leads, inquiries, quotes management |

**Enforcement**:

Auth middleware accepts a required roles array:
```typescript
authMiddleware(['admin', 'super_admin'])
```

- Missing token → `401`
- Invalid token → `401`
- User not found → `404` (avoids user enumeration)
- User inactive → `403`
- Role not in allowed list → `403`

`super_admin` is always implicitly permitted (even if not in the required roles list).

**Product-specific note**: The product route uses `authMiddleware(['admin'])` (without `super_admin`), though `super_admin` is still allowed by the middleware's super_admin bypass logic.

---

## Error Handling

### AppError Class
```typescript
class AppError extends Error {
  statusCode: number;    // HTTP status code
  isOperational: boolean; // True for expected errors
}
```

### Global Error Handler
Centralized in `error.middleware.ts`, catches:
1. **Zod validation errors** (`ZodError`) → 400 with field-level issue details
2. **Mongoose validation errors** → 400 with path/message
3. **MongoDB duplicate key** (`code 11000`) → 400 with extracted field name
4. **AppError** (operational) → uses the error's statusCode and message
5. **Generic Error** → 500 with message
6. **Unknown** → 500 "Something went wrong"

**Security**: Stack traces are only exposed in `development` mode. In production, `stack` is `null`.

### Error Response Contract
```json
{
  "success": false,
  "message": "Human-readable error description",
  "errorSources": [
    { "path": "fieldName", "message": "Specific validation message" }
  ],
  "stack": null
}
```

---

## Logging

### Framework: Winston 3 + Morgan

**Logger** (`utils/logger.ts`):
- **Levels**: error, warn, info, http, debug
- **Console**: Colorized, timestamped (`YYYY-MM-DD HH:mm:ss:ms`)
- **File (errors)**: `logs/error.log` — JSON format, error level only
- **File (all)**: `logs/all.log` — JSON format, all levels
- **Level selection**: `debug` in development, `warn` in production

**Morgan Middleware**:
- HTTP request logging (method, URL, status, content-length, response time)
- Output piped to Winston at `http` severity
- Skipped outside development to reduce noise

### Open Questions / Areas for Improvement
- `core/logger/` directory exists but is empty (no custom logic)
- `db.ts` uses `console.log` instead of the Winston logger
- No structured logging for authentication events (future enhancement)

---

## File Uploads

### Framework: Multer

**Configuration** (`middleware/upload.middleware.ts`):

| Setting | Value |
|---------|-------|
| Storage | Disk (configurable via `UPLOAD_DIR` env) |
| Filename | UUID + original extension |
| Max size | 10 MB |
| Allowed types | JPEG, PNG, GIF, WebP, SVG, PDF, DOC, DOCX |

**Storage Abstraction** (`utils/storage.ts`):
- `ensureUploadDir()` — Creates upload directory if missing
- `getUploadPath()` — Resolves full file path
- `getPublicUrl()` — Constructs public URL for the file
- `deleteFile()` — Removes file from disk
- `getFileSize()` — Returns file size in bytes

**Asset Integration** (`module/asset/`):
- Accepts both URL-based and file-upload-based asset creation
- On file upload: stores file, auto-populates `url`, `size`, `mimeType`
- On deletion: cleans up local files if `url` points to local storage
- Architecture ready for S3/Cloudinary — just replace `storage.ts` implementation

**Static Serving**: `app.ts` mounts `express.static('uploads')` at `/uploads`

---

## Database Access

### ODM: Mongoose 9

**Connection**: MongoDB Atlas via `MONGODB_URI` environment variable.

**Connection management**: `server.ts` connects before starting HTTP listener. Graceful shutdown on `unhandledRejection` and `uncaughtException`.

**Models**: Each module defines its Mongoose schema in `{name}.model.ts`. Schemas include:
- Field definitions with types, required constraints, defaults
- Indexes on frequently queried fields
- Text indexes for search (products, events)
- Virtual fields for population (categories → products)
- Pre-save hooks for password hashing (user model)
- Instance methods for password comparison (user model)
- ToJSON transforms to remove sensitive fields (password, __v)

**Indexes applied**:
| Model | Indexes |
|-------|---------|
| Product | `{ slug: 1 }` (unique), `{ name: 'text', shortDescription: 'text' }`, `{ isFeatured: 1 }`, `{ isActive: 1 }`, `{ createdAt: -1 }` |
| Category | `{ name: 1 }`, `{ slug: 1 }` (unique), `{ isActive: 1 }` |
| Blog | `{ status: 1, publishedAt: 1 }`, `{ createdAt: -1 }` |
| Event | title (text), description (text), `{ eventDate: 1 }`, `{ isFeatured: 1 }` |
| Industry | `{ isActive: 1, name: 1 }` |
| Job | `{ status: 1 }`, `{ department: 1, location: 1, type: 1 }` |
| JobApplication | `{ jobId: 1, status: 1 }` |
| Inquiry | `{ status: 1, assignedTo: 1 }` |
| Quote | `{ status: 1 }`, `{ productId: 1 }` |
| Testimonial | `{ isPublished: 1 }` |
| Asset | `{ category: 1, type: 1 }`, `{ createdAt: -1 }` |
| User | `{ email: 1 }` (unique), `{ role: 1 }`, `{ isActive: 1 }` |
| TokenBlacklist | `{ token: 1 }`, `{ expiresAt: 1 }` (TTL) |

---

## Configuration

### Config Loader (`config/index.ts`)

Loads environment variables from `.env` with two strategies:

- **`getRequiredEnv(name, fallback?)`** — Returns value or fallback; throws in production if missing
- **`getSecretEnv(name)`** — Hard requirement: throws even in development if missing (used for JWT secrets)

### Exported Config
```typescript
{
  NODE_ENV: string;
  port: number;                           // default 4000
  database_url: string;                   // MONGODB_URI
  bcrypt_salt_rounds: number;             // default 12
  jwt_access_secret: string;              // required
  jwt_access_expires_in: string;          // default '1d'
  jwt_refresh_secret: string;             // required
  jwt_refresh_expires_in: string;         // default '30d'
}
```

---

## Environment Variables

| Variable | Required | Default | Used In | Purpose |
|----------|----------|---------|---------|---------|
| `MONGODB_URI` | Yes | — | config, app.ts, seed.ts | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Yes | — | jwt.ts | Signing access tokens |
| `JWT_REFRESH_SECRET` | Yes | — | jwt.ts | Signing refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | No | `1d` | jwt.ts | Access token TTL |
| `JWT_REFRESH_EXPIRES_IN` | No | `30d` | jwt.ts | Refresh token TTL |
| `BCRYPT_SALT_ROUNDS` | No | `12` | hash.ts | Password hash rounds |
| `PORT` | No | `4000` | server.ts | HTTP port |
| `CORS_ORIGINS` | No | `http://localhost:3000,http://localhost:3001` | app.ts | Allowed CORS origins |
| `NODE_ENV` | No | `development` | config, logger, error.middleware | Environment mode |
| `UPLOAD_DIR` | No | `./uploads` | upload.middleware.ts, storage.ts | File upload directory |
| `API_BASE_URL` | No | `http://localhost:4000` | storage.ts | Base URL for public file URLs |

---

## Security

### Layers

| Layer | Implementation | Details |
|-------|---------------|---------|
| HTTP Headers | `helmet()` | Sets 15+ secure HTTP headers (CSP, HSTS, X-Frame-Options, etc.) |
| CORS | `cors()` | Restricted to `CORS_ORIGINS` env var; rejects unknown origins |
| Rate Limiting | `express-rate-limit` + `rate-limit-mongo` | 100 req/15 min general, 20 req/15 min auth; distributed via MongoDB |
| Input Validation | Zod `.strict()` | Every admin endpoint validates body shape; unknown fields rejected |
| XSS Prevention (write-time) | `sanitize.ts` | Blog, event, and industry services strip scripts, event handlers, dangerous tags before storage |
| XSS Prevention (read-time) | DOMPurify | Client-side `SanitizedHtml.tsx` sanitizes blog HTML before rendering |
| Password Storage | bcrypt (12 rounds) | Pre-save hook hashes passwords; `select: false` prevents accidental exposure |
| JWT Verification | `jsonwebtoken` | Tokens verified on every protected request; payload validated for shape |
| Token Blacklist | MongoDB collection | Revoked refresh tokens stored with TTL auto-expiry |
| MongoDB Injection | Manual key stripping | Product service removes `$`-prefixed keys from query objects |
| Error Exposure | Conditional stack trace | `stack` returned only in development; production returns `null` |
| Duplicate Key Prevention | Uniqueness checks | Services check for existing records before creation (products, users, categories) |
| File Upload Validation | MIME type whitelist | Only images, PDF, DOC/DOCX allowed; max 10 MB |

### Security Checklist Status

- ✅ Helmet security headers
- ✅ CORS origin restriction
- ✅ Rate limiting (per-IP + distributed)
- ✅ Input validation (Zod strict mode)
- ✅ XSS prevention (write-time + read-time)
- ✅ SQL/NoSQL injection prevention
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Token refresh/rotation
- ✅ Token blacklisting (logout)
- ✅ Error information control (no stack in production)
- ✅ File upload restrictions (type + size)
- ⬜ CSRF protection (Phase 7.4 — pending)

---

## Performance

### Caching Strategy

| Layer | Implementation | Details |
|-------|---------------|---------|
| Backend Cache Headers | `cache.middleware.ts` | Route-specific `Cache-Control` with `stale-while-revalidate` |
| Frontend Caching | Next.js `unstable_cache` + React `cache()` | Server-side deduplication + ISR |
| Products | 60s client, 120s CDN, 300s stale | Fast-changing catalog |
| Categories | 300s client, 600s CDN, 3600s stale | Rarely changes |
| Industries | 300s client, 600s CDN, 3600s stale | Rarely changes |
| Blogs | 60s client, 120s CDN, 300s stale | Moderate update frequency |
| Events | 60s client, 120s CDN, 300s stale | Moderate update frequency |
| Jobs | 300s client, 600s CDN, 3600s stale | Slow-moving |
| Testimonials | 300s client, 600s CDN, 3600s stale | Rarely changes |
| Settings | 300s client, 600s CDN, 3600s stale | Rarely changes |
| Admin/Auth | `no-cache, no-store` | Never cached |

### Pagination
- Product list endpoint supports `page`, `limit`, `sort`, `fields`, `searchTerm` parameters
- Returns `meta` object with `page`, `limit`, `total`, `totalPage`
- Other list endpoints return all records (pagination pending — see Phase 7.5)

### Database Optimizations
- Indexes on all frequently queried/ filtered/ sorted fields
- `select()` excludes unused fields (e.g., `-password` on user queries)
- Text indexes on product name + description for search
- Compound indexes on common filter combinations (industry: `isActive + name`, job: `department + location + type`)

---

## Route Map

### Public Routes (no authentication)

| Method | Path | Module | Cache |
|--------|------|--------|-------|
| GET | `/` | Health check | No |
| GET | `/products` | Product | 60s |
| GET | `/products/:slug` | Product | 60s |
| GET | `/categories` | Category | 300s |
| GET | `/categories/:slug` | Category | 300s |
| GET | `/blogs` | Blog | 60s |
| GET | `/blogs/:slug` | Blog | 60s |
| GET | `/events` | Event | 60s |
| GET | `/events/:id` | Event | 60s |
| GET | `/industries` | Industry | 300s |
| GET | `/industries/:slug` | Industry | 300s |
| GET | `/jobs` | Job | 300s |
| GET | `/jobs/:id` | Job | 300s |
| GET | `/testimonials` | Testimonial | 300s |
| GET | `/testimonials/:id` | Testimonial | 300s |
| GET | `/assets` | Asset | 60s |
| GET | `/settings` | Setting | 300s |
| POST | `/contact` | Inquiry | No |
| POST | `/quote` | Quote | No |
| POST | `/jobs/apply` | Job Application | No |

### Auth Routes (rate limited: 20 req/15 min)

| Method | Path | Module | Auth | Roles |
|--------|------|--------|------|-------|
| POST | `/auth/login` | Auth | No | — |
| POST | `/auth/logout` | Auth | Optional | — |
| POST | `/auth/refresh-token` | Auth | No | — |
| POST | `/auth/create` | Auth | Yes | super_admin, admin |
| GET | `/auth/all` | Auth | Yes | super_admin, admin |
| GET | `/auth/:id/details` | Auth | Yes | super_admin, admin |
| PUT | `/auth/:id/update` | Auth | Yes | super_admin, admin |
| PATCH | `/auth/:id/deactivate` | Auth | Yes | super_admin, admin |

### Admin Routes (all require JWT + role check)

| Method | Path | Module | Roles |
|--------|------|--------|-------|
| POST | `/admin/products` | Product | admin |
| PUT | `/admin/products/:id` | Product | admin |
| DELETE | `/admin/products/:id` | Product | admin |
| POST | `/admin/categories` | Category | super_admin, admin |
| PUT | `/admin/categories/:id` | Category | super_admin, admin |
| DELETE | `/admin/categories/:id` | Category | super_admin, admin |
| POST | `/admin/blogs` | Blog | admin, super_admin |
| PUT | `/admin/blogs/:id` | Blog | admin, super_admin |
| DELETE | `/admin/blogs/:id` | Blog | admin, super_admin |
| POST | `/admin/events` | Event | admin, super_admin |
| PUT | `/admin/events/:id` | Event | admin, super_admin |
| DELETE | `/admin/events/:id` | Event | admin, super_admin |
| POST | `/admin/industries` | Industry | admin, super_admin |
| PUT | `/admin/industries/:id` | Industry | admin, super_admin |
| DELETE | `/admin/industries/:id` | Industry | admin, super_admin |
| POST | `/admin/jobs` | Job | admin, super_admin |
| PUT | `/admin/jobs/:id` | Job | admin, super_admin |
| DELETE | `/admin/jobs/:id` | Job | admin, super_admin |
| GET | `/admin/applications` | Job Application | admin, super_admin |
| GET | `/admin/applications/:id` | Job Application | admin, super_admin |
| PUT | `/admin/applications/:id` | Job Application | admin, super_admin |
| DELETE | `/admin/applications/:id` | Job Application | admin, super_admin |
| POST | `/admin/inquiries` | Inquiry | admin, super_admin |
| GET | `/admin/inquiries` | Inquiry | admin, super_admin |
| GET | `/admin/inquiries/:id` | Inquiry | admin, super_admin |
| PUT | `/admin/inquiries/:id` | Inquiry | admin, super_admin |
| DELETE | `/admin/inquiries/:id` | Inquiry | admin, super_admin |
| GET | `/admin/quotes` | Quote | admin, super_admin |
| GET | `/admin/quotes/:id` | Quote | admin, super_admin |
| PUT | `/admin/quotes/:id` | Quote | admin, super_admin |
| DELETE | `/admin/quotes/:id` | Quote | admin, super_admin |
| POST | `/admin/testimonials` | Testimonial | admin, super_admin |
| PUT | `/admin/testimonials/:id` | Testimonial | admin, super_admin |
| DELETE | `/admin/testimonials/:id` | Testimonial | admin, super_admin |
| POST | `/admin/assets` | Asset | admin, super_admin |
| DELETE | `/admin/assets/:id` | Asset | admin, super_admin |
| POST | `/admin/settings` | Setting | admin, super_admin |
| PUT | `/admin/settings/:id` | Setting | admin, super_admin |
| GET | `/admin/users` | Auth | super_admin, admin |
| POST | `/admin/users` | Auth | super_admin, admin |
| PUT | `/admin/users/:id` | Auth | super_admin, admin |
| DELETE | `/admin/users/:id` | Auth | super_admin, admin |
