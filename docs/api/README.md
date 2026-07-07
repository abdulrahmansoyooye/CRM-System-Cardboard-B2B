# CARDBOX API — REST API Reference

**Base URL**: `http://localhost:4000/api/v1`

**Content-Type**: `application/json`

---

## Table of Contents

1. [General Conventions](#general-conventions)
2. [Health Check](#health-check)
3. [Authentication](#authentication)
   - [Login](#post-authlogin)
   - [Logout](#post-authlogout)
   - [Refresh Token](#post-authrefresh-token)
   - [Create User](#post-authcreate)
   - [Get All Users](#get-authall)
   - [Get User by ID](#get-authiddetails)
   - [Update User](#put-authidupdate)
   - [Deactivate User](#patch-authiddeactivate)
   - [Admin: Get All Users](#get-adminusers)
   - [Admin: Create User](#post-adminusers)
   - [Admin: Update User](#put-adminusersid)
   - [Admin: Deactivate User](#delete-adminusersid)
4. [Products](#products)
   - [List Products](#get-products)
   - [Get Product by Slug](#get-productsslug)
   - [Create Product](#post-adminproducts)
   - [Update Product](#put-adminproductsid)
   - [Delete Product](#delete-adminproductsid)
5. [Categories](#categories)
   - [List Categories](#get-categories)
   - [Get Category by Slug](#get-categoriesslug)
   - [Create Category](#post-admincategories)
   - [Update Category](#put-admincategoriesid)
   - [Delete Category](#delete-admincategoriesid)
6. [Blogs](#blogs)
   - [List Blogs](#get-blogs)
   - [Get Blog by Slug](#get-blogsslug)
   - [Create Blog](#post-adminblogs)
   - [Update Blog](#put-adminblogsid)
   - [Delete Blog](#delete-adminblogsid)
7. [Events](#events)
   - [List Events](#get-events)
   - [Get Event by ID](#get-eventsid)
   - [Create Event](#post-adminevents)
   - [Update Event](#put-admineventsid)
   - [Delete Event](#delete-admineventsid)
8. [Industries](#industries)
   - [List Industries](#get-industries)
   - [Get Industry by Slug](#get-industriesslug)
   - [Create Industry](#post-adminindustries)
   - [Update Industry](#put-adminindustriesid)
   - [Delete Industry](#delete-adminindustriesid)
9. [Jobs](#jobs)
   - [List Jobs](#get-jobs)
   - [Get Job by ID](#get-jobsid)
   - [Create Job](#post-adminjobs)
   - [Update Job](#put-adminjobsid)
   - [Delete Job](#delete-adminjobsid)
10. [Job Applications](#job-applications)
    - [Create Application](#post-jobsapply)
    - [List Applications](#get-adminapplications)
    - [Get Application by ID](#get-adminapplicationsid)
    - [Update Application](#put-adminapplicationsid)
    - [Delete Application](#delete-adminapplicationsid)
11. [Inquiries](#inquiries)
    - [Submit Inquiry](#post-contact)
    - [List Inquiries](#get-admininquiries)
    - [Get Inquiry by ID](#get-admininquiriesid)
    - [Update Inquiry](#put-admininquiriesid)
    - [Delete Inquiry](#delete-admininquiriesid)
12. [Quotes](#quotes)
    - [Submit Quote Request](#post-quote)
    - [List Quotes](#get-adminquotes)
    - [Get Quote by ID](#get-adminquotesid)
    - [Update Quote](#put-adminquotesid)
    - [Delete Quote](#delete-adminquotesid)
13. [Testimonials](#testimonials)
    - [List Testimonials](#get-testimonials)
    - [Get Testimonial by ID](#get-testimonialsid)
    - [Create Testimonial](#post-admintestimonials)
    - [Update Testimonial](#put-admintestimonialsid)
    - [Delete Testimonial](#delete-admintestimonialsid)
14. [Assets](#assets)
    - [List Assets](#get-assets)
    - [Create Asset](#post-adminassets)
    - [Delete Asset](#delete-adminassetsid)
15. [Settings](#settings)
    - [Get Settings](#get-settings)
    - [Create Setting](#post-adminsettings)
    - [Update Setting](#put-adminsettingsid)

---

## General Conventions

### Response Format

**Success**:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Paginated Success**:
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "meta": { "page": 1, "limit": 10, "total": 42, "totalPage": 5 },
  "data": [ ... ]
}
```

**Error**:
```json
{
  "success": false,
  "message": "Validation Error",
  "errorSources": [
    { "path": "email", "message": "Invalid email address" }
  ],
  "stack": null
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error / Bad request |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Resource not found |
| 500 | Internal server error |

### Authentication Header

```
Authorization: Bearer <jwt_access_token>
```

### Rate Limiting

| Scope | Limit | Window |
|-------|-------|--------|
| General API | 100 requests | 15 minutes |
| Auth routes (`/auth/*`) | 20 requests | 15 minutes |

---

## Health Check

### GET /

Health check endpoint with database connectivity status.

**Authentication**: None

**Response** `200`:
```json
{
  "success": true,
  "message": "Cardbox B2B API is running",
  "uptime": 1234.56,
  "timestamp": "2026-07-07T12:00:00.000Z",
  "requestId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "checks": {
    "database": "connected",
    "server": "healthy"
  }
}
```

**Response** `503` (degraded):
```json
{
  "success": false,
  "message": "API is degraded",
  "checks": { "database": "disconnected", "server": "healthy" }
}
```

---

## Authentication

### POST /auth/login

Authenticates a user and returns JWT access + refresh tokens.

**Authentication**: None

**Authorization**: None

**Request Body**:
```json
{
  "email": "admin@cardbox.demo",
  "password": "CardboxAdminPassword2026"
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| email | string | Yes | Valid email format |
| password | string | Yes | Min 1 character |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "System Administrator",
    "email": "admin@cardbox.demo",
    "role": "super_admin",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 401 | Email not found or incorrect password |
| 403 | User account is inactive |

---

### POST /auth/logout

Logs out the user and blacklists the refresh token.

**Authentication**: Bearer token (optional — extracted from Authorization header for blacklisting)

**Authorization**: None

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### POST /auth/refresh-token

Exchanges a refresh token for a new access + refresh token pair.

**Authentication**: None

**Authorization**: None

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| refreshToken | string | Yes | Min 1 character |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 400 | Refresh token is required |
| 401 | Token revoked, invalid, expired, or wrong type |
| 403 | User account is inactive |
| 404 | User not found |

---

### POST /auth/create

Creates a new admin user.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@cardbox.demo",
  "password": "SecurePass123",
  "role": "admin"
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | Min 3 characters |
| email | string | Yes | Valid email format |
| password | string | Yes | Min 6 characters |
| role | string | Yes | Must be one of: super_admin, admin, content_manager, hr_manager, sales_manager |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e2",
    "name": "John Doe",
    "email": "john@cardbox.demo",
    "role": "admin",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 400 | User already exists |

---

### GET /auth/all

Retrieves all admin users.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "name": "System Administrator",
      "email": "admin@cardbox.demo",
      "role": "super_admin",
      "isActive": true,
      "lastLogin": "2026-07-07T10:00:00.000Z"
    }
  ]
}
```

---

### GET /auth/:id/details

Retrieves a single user by ID.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "System Administrator",
    "email": "admin@cardbox.demo",
    "role": "super_admin",
    "isActive": true
  }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | User not found |

---

### PUT /auth/:id/update

Updates a user's details.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Request Body** (all optional):
```json
{
  "name": "John Updated",
  "email": "john.updated@cardbox.demo",
  "role": "content_manager",
  "isActive": true
}
```

**Success Response** `200`:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | User not found |

---

### PATCH /auth/:id/deactivate

Soft-deletes a user by setting `isActive: false`.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "User deactivated successfully",
  "data": { "isActive": false }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | User not found |

---

### GET /admin/users

Admin-friendly alias for listing users. Same as `GET /auth/all`.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [ ... ]
}
```

---

### POST /admin/users

Admin-friendly alias for creating a user. Same as `POST /auth/create`.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@cardbox.demo",
  "password": "SecurePass456",
  "role": "content_manager"
}
```

**Success Response** `201`:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### PUT /admin/users/:id

Admin-friendly alias for updating a user. Same as `PUT /auth/:id/update`.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/users/:id

Admin-friendly alias for deactivating a user (soft-delete). Same as `PATCH /auth/:id/deactivate`.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "User deactivated successfully",
  "data": { "isActive": false }
}
```

---

## Products

### GET /products

Retrieves a paginated, filterable list of products.

**Authentication**: None

**Authorization**: None

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| searchTerm | string | — | Searches name and shortDescription (regex, case-insensitive) |
| categoryId | string | — | Filter by category ObjectId |
| isActive | boolean | — | Filter by active status |
| isFeatured | boolean | — | Filter by featured status |
| sort | string | `-createdAt` | Sort field(s), comma-separated (prefix `-` for desc) |
| page | number | 1 | Page number |
| limit | number | 10 | Results per page |
| fields | string | — | Comma-separated field names to return |

**Cache Control**: `public, max-age=60, s-maxage=120, stale-while-revalidate=300`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "meta": { "page": 1, "limit": 10, "total": 4, "totalPage": 1 },
  "data": [
    {
      "_id": "64a1b2c3d4e5f6a7b8c9d0e3",
      "name": "Ultra-Tough Master Carton XL",
      "slug": "ultra-tough-master-carton-xl",
      "shortDescription": "High-density double-wall carton for sea-freight consolidation.",
      "fullDescription": "Constructed from premium virgin kraft paper...",
      "specifications": ["Dimension: 600x400x400mm", "Material: BC Flute", "Load Capacity: 45kg"],
      "moq": 500,
      "deliveryTimeline": "5-7 Working Days",
      "isFeatured": true,
      "isActive": true,
      "images": ["https://images.unsplash.com/..."],
      "categoryId": { "_id": "...", "name": "Master Cartons" },
      "createdAt": "2026-07-07T10:00:00.000Z"
    }
  ]
}
```

---

### GET /products/:slug

Retrieves a single product by its URL slug.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| slug | string | Product slug (e.g. `ultra-tough-master-carton-xl`) |

**Cache Control**: `public, max-age=60, s-maxage=120, stale-while-revalidate=300`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e3",
    "name": "Ultra-Tough Master Carton XL",
    "slug": "ultra-tough-master-carton-xl",
    "images": ["..."],
    "categoryId": { "_id": "...", "name": "Master Cartons" }
  }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Product not found |

---

### POST /admin/products

Creates a new product.

**Authentication**: Bearer token required

**Authorization**: `admin` (product route uses `['admin']`)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "E-Commerce Mailer Box",
  "categoryId": "64a1b2c3d4e5f6a7b8c9d0e7",
  "shortDescription": "Lightweight shipping box for parcel delivery.",
  "fullDescription": "Optimized for high-volume logistics...",
  "specifications": ["Weight: 120g", "Material: Recycled Kraft"],
  "materialDetails": "100% Recycled Fiber",
  "strengthDetails": "Edge Crush Test: 32 lbf/in",
  "availableSizes": ["12x10x6", "14x12x8"],
  "moq": 1000,
  "deliveryTimeline": "3-5 Working Days",
  "isFeatured": false,
  "images": ["https://example.com/image.jpg"],
  "seo": {
    "metaTitle": "E-Commerce Mailer Box | CARDBOX",
    "metaDescription": "Sustainable e-commerce packaging solutions."
  },
  "isActive": true
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | Min 3 characters |
| categoryId | string | Yes | Must be a valid ObjectId |
| shortDescription | string | No | — |
| fullDescription | string | No | — |
| specifications | string[] | No | — |
| materialDetails | string | No | — |
| strengthDetails | string | No | — |
| availableSizes | string[] | No | — |
| moq | number | No | Min 1, default 1 |
| deliveryTimeline | string | No | — |
| isFeatured | boolean | No | Default false |
| images | string[] | Yes | At least 1 image URL required |
| seo.metaTitle | string | No | — |
| seo.metaDescription | string | No | — |
| isActive | boolean | No | Default true |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 400 | Product with this slug already exists |

---

### PUT /admin/products/:id

Updates an existing product.

**Authentication**: Bearer token required

**Authorization**: `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Product ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Request Body**: Any subset of the product creation fields.

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Product not found |

---

### DELETE /admin/products/:id

Deletes a product permanently.

**Authentication**: Bearer token required

**Authorization**: `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Product ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Product not found |

---

## Categories

### GET /categories

Retrieves all product categories.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6a7b8c9d0e7",
      "name": "Master Cartons",
      "slug": "master-cartons",
      "description": "Primary shipping containers...",
      "coverImage": "https://images.unsplash.com/...",
      "isActive": true
    }
  ]
}
```

---

### GET /categories/:slug

Retrieves a single category by slug, with populated products.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| slug | string | Category slug (e.g. `master-cartons`) |

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Category fetched successfully",
  "data": {
    "_id": "...",
    "name": "Master Cartons",
    "slug": "master-cartons",
    "products": [
      { "_id": "...", "name": "Ultra-Tough Master Carton XL", ... }
    ]
  }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Category not found |

---

### POST /admin/categories

Creates a new category.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Heavy-Duty Boxes",
  "description": "Triple-wall corrugated engineering...",
  "coverImage": "https://example.com/image.jpg",
  "seo": { "metaTitle": "...", "metaDescription": "..." },
  "isActive": true
}
```

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 400 | Category with this slug already exists |

---

### PUT /admin/categories/:id

Updates a category.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Category ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Category not found |

---

### DELETE /admin/categories/:id

Permanently deletes a category.

**Authentication**: Bearer token required

**Authorization**: `super_admin`, `admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Category ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Category not found |

---

## Blogs

### GET /blogs

Retrieves all blog posts.

**Authentication**: None

**Authorization**: None

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status (`draft`, `published`) |
| category | string | Filter by category |
| sort | string | Sort field(s) |

**Cache Control**: `public, max-age=60, s-maxage=120, stale-while-revalidate=300`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "title": "Structural Engineering: The Science of Triple-Wall Corrugated",
      "slug": "science-of-triple-wall-corrugated",
      "category": "Engineering",
      "excerpt": "An in-depth analysis...",
      "featuredImage": "https://images.unsplash.com/...",
      "tags": ["Engineering", "Sustainability"],
      "status": "published",
      "publishedAt": "2026-07-07T10:00:00.000Z"
    }
  ]
}
```

---

### GET /blogs/:slug

Retrieves a single blog post by slug.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| slug | string | Blog slug |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "...",
    "title": "...",
    "slug": "...",
    "content": "<p>Full HTML content...</p>",
    "status": "published"
  }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Blog not found |

---

### POST /admin/blogs

Creates a new blog post. Content is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "New Blog Post",
  "category": "Engineering",
  "excerpt": "A short summary...",
  "content": "<p>Full HTML content</p>",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["Engineering", "Packaging"],
  "seo": { "metaTitle": "...", "metaDescription": "..." },
  "status": "published"
}
```

**Validation Rules**: Title is required; all other fields optional.

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/blogs/:id

Updates a blog post. Content is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Blog ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Blog not found |

---

### DELETE /admin/blogs/:id

Permanently deletes a blog post.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Blog ObjectId |

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Blog not found |

---

## Events

### GET /events

Retrieves all events.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=60, s-maxage=120, stale-while-revalidate=300`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "title": "Industry Expo 2026",
      "description": "Annual packaging industry exhibition...",
      "eventDate": "2026-08-15T00:00:00.000Z",
      "images": ["..."],
      "isFeatured": true
    }
  ]
}
```

---

### GET /events/:id

Retrieves a single event by ObjectId.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Event ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Event not found |

---

### POST /admin/events

Creates a new event. Description is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Industry Expo 2026",
  "description": "Join us at the premier packaging expo...",
  "eventDate": "2026-08-15T10:00:00Z",
  "images": ["https://example.com/image.jpg"],
  "isFeatured": false
}
```

**Validation Rules**: Title is required.

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/events/:id

Updates an event. Description is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Event ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/events/:id

Permanently deletes an event.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Event ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Industries

### GET /industries

Retrieves all industries with populated related products.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "name": "Automotive & Heavy Industry",
      "slug": "automotive-heavy-industry",
      "overview": "Specialized 7-ply protection...",
      "images": ["..."],
      "isActive": true,
      "relatedProducts": [
        { "_id": "...", "name": "7-Ply Industrial Chassis Box" }
      ]
    }
  ]
}
```

---

### GET /industries/:slug

Retrieves a single industry by slug with populated related products.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| slug | string | Industry slug |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Industry not found |

---

### POST /admin/industries

Creates a new industry. Description is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Aerospace Packaging",
  "overview": "High-precision packaging for aerospace components...",
  "relatedProducts": ["64a1b2c3d4e5f6a7b8c9d0e4"],
  "images": ["https://example.com/image.jpg"],
  "isActive": true
}
```

**Validation Rules**: Name is required.

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/industries/:id

Updates an industry. Description is sanitized for XSS at write time.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Industry ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/industries/:id

Permanently deletes an industry.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Industry ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Jobs

### GET /jobs

Retrieves all job listings.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "title": "Production Operations Manager",
      "department": "Operations",
      "location": "Dubai Industrial City",
      "type": "Full-Time",
      "salary": "AED 25,000 - 30,000",
      "description": "Lead high-volume corrugated board manufacturing...",
      "status": "open"
    }
  ]
}
```

---

### GET /jobs/:id

Retrieves a single job by ObjectId.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Job ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Job not found |

---

### POST /admin/jobs

Creates a new job posting.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Senior Packaging Engineer",
  "department": "Engineering",
  "experience": "5-7 Years",
  "location": "Jebel Ali, Dubai",
  "description": "Design innovative corrugated packaging solutions...",
  "status": "open"
}
```

**Validation Rules**: Title is required.

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/jobs/:id

Updates a job posting.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Job ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/jobs/:id

Permanently deletes a job posting.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Job ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Job Applications

### POST /jobs/apply

Submits a job application.

**Authentication**: None

**Authorization**: None

**Request Body**:
```json
{
  "jobId": "64a1b2c3d4e5f6a7b8c9d0e8",
  "name": "Ahmed Mohammed",
  "email": "ahmed@example.com",
  "phone": "+971501234567",
  "resumeFile": "https://example.com/resume.pdf",
  "notes": "I have 5 years of experience in packaging engineering."
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| jobId | string | Yes | Valid ObjectId |
| name | string | Yes | — |
| email | string | Yes | Valid email format |
| phone | string | No | — |
| resumeFile | string | No | URL to uploaded resume |
| notes | string | No | Additional context |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### GET /admin/applications

Retrieves all job applications.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "jobId": { "_id": "...", "title": "Production Operations Manager" },
      "name": "Ahmed Mohammed",
      "email": "ahmed@example.com",
      "phone": "+971501234567",
      "status": "new"
    }
  ]
}
```

---

### GET /admin/applications/:id

Retrieves a single application by ObjectId.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Application ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

---

### PUT /admin/applications/:id

Updates an application (e.g. change status).

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Application ObjectId |

**Request Body** (partial update):
```json
{
  "status": "reviewed",
  "notes": "Candidate has been shortlisted for interview."
}
```

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/applications/:id

Permanently deletes an application.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Application ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Inquiries

### POST /contact

Submits a contact inquiry (public form).

**Authentication**: None

**Authorization**: None

**Request Body**:
```json
{
  "name": "John Buyer",
  "company": "Global Trade Corp",
  "phone": "+971501234567",
  "email": "john@example.com",
  "message": "I am interested in your 7-ply heavy-duty boxes for automotive parts shipping.",
  "productInterested": "7-Ply Industrial Chassis Box"
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | — |
| email | string | Yes | Valid email format |
| company | string | No | — |
| phone | string | No | — |
| message | string | No | — |
| productInterested | string | No | — |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### GET /admin/inquiries

Retrieves all contact inquiries.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "name": "John Buyer",
      "company": "Global Trade Corp",
      "email": "john@example.com",
      "phone": "+971501234567",
      "message": "I am interested in...",
      "productInterested": "7-Ply Industrial Chassis Box",
      "status": "new",
      "notes": ""
    }
  ]
}
```

---

### GET /admin/inquiries/:id

Retrieves a single inquiry.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Inquiry ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

---

### PUT /admin/inquiries/:id

Updates an inquiry (status, assignment, notes).

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Inquiry ObjectId |

**Request Body**:
```json
{
  "status": "contacted",
  "assignedTo": "64a1b2c3d4e5f6a7b8c9d0e1",
  "notes": "Customer called, quote requested for 500 units."
}
```

**Validation Rules**:
| Field | Type | Constraints |
|-------|------|-------------|
| status | string | Must be one of: new, contacted, quoted, closed |
| assignedTo | string | Valid User ObjectId |
| notes | string | — |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/inquiries/:id

Permanently deletes an inquiry.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Inquiry ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Quotes

### POST /quote

Submits a quotation request (public form).

**Authentication**: None

**Authorization**: None

**Request Body**:
```json
{
  "productId": "64a1b2c3d4e5f6a7b8c9d0e3",
  "quantity": 5000,
  "customizationDetails": "Need custom printing with our logo in CMYK.",
  "deliveryLocation": "Jebel Ali Free Zone, Dubai",
  "name": "Sarah Buyer",
  "phone": "+971501234567",
  "email": "sarah@example.com",
  "notes": "Expected delivery within 2 weeks."
}
```

**Validation Rules**:
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | — |
| email | string | Yes | Valid email |
| productId | string | No | Valid ObjectId |
| quantity | number | No | — |
| customizationDetails | string | No | — |
| deliveryLocation | string | No | — |
| phone | string | No | — |
| notes | string | No | — |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### GET /admin/quotes

Retrieves all quotation requests.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "productId": { "_id": "...", "name": "Ultra-Tough Master Carton XL" },
      "quantity": 5000,
      "name": "Sarah Buyer",
      "email": "sarah@example.com",
      "status": "new",
      "notes": "Expected delivery within 2 weeks."
    }
  ]
}
```

---

### GET /admin/quotes/:id

Retrieves a single quote request.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Quote ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

---

### PUT /admin/quotes/:id

Updates a quote request (status, notes).

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Quote ObjectId |

**Request Body**:
```json
{
  "status": "quoted",
  "notes": "Sent pricing for 5000 units with custom printing."
}
```

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/quotes/:id

Permanently deletes a quote request.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Quote ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Testimonials

### GET /testimonials

Retrieves all testimonials.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "clientName": "Sarah Al-Mansoori",
      "company": "Emirates Industrial Partners",
      "feedback": "Cardbox's structural engineering...",
      "rating": 5,
      "isPublished": true
    }
  ]
}
```

---

### GET /testimonials/:id

Retrieves a single testimonial by ObjectId.

**Authentication**: None

**Authorization**: None

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Testimonial ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

---

### POST /admin/testimonials

Creates a new testimonial.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "clientName": "Jane Doe",
  "company": "ABC Corp",
  "feedback": "Excellent packaging solutions.",
  "rating": 5,
  "isPublished": true
}
```

**Validation Rules**: clientName and feedback are required.

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/testimonials/:id

Updates a testimonial.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Testimonial ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

---

### DELETE /admin/testimonials/:id

Permanently deletes a testimonial.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Testimonial ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Deleted successfully",
  "data": { ... }
}
```

---

## Assets

### GET /assets

Retrieves all assets.

**Authentication**: None

**Authorization**: None

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "name": "Product Hero Image",
      "category": "Product Images",
      "url": "http://localhost:4000/uploads/uuid.jpg",
      "size": "102400",
      "type": "JPEG",
      "mimeType": "image/jpeg"
    }
  ]
}
```

---

### POST /admin/assets

Creates a new asset, optionally with file upload.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>` | `Content-Type: multipart/form-data`

**Request (URL-based)**:
```json
{
  "name": "Product Image",
  "category": "Products",
  "url": "https://example.com/image.jpg",
  "size": "102400",
  "type": "JPEG",
  "mimeType": "image/jpeg"
}
```

**Request (File upload)**: `multipart/form-data` with field `file` containing the uploaded file. Body fields can also be sent as form data.

**Upload Restrictions**:
| Constraint | Value |
|------------|-------|
| Allowed MIME types | image/jpeg, image/png, image/gif, image/webp, image/svg+xml, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| Max file size | 10 MB |
| Storage | Local disk with UUID filenames |

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Asset registered successfully",
  "data": { ... }
}
```

---

### DELETE /admin/assets/:id

Permanently deletes an asset and its associated file on disk.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Asset ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Asset deleted permanently",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Asset not found |

---

## Settings

### GET /settings

Retrieves website settings.

**Authentication**: None

**Authorization**: None

**Cache Control**: `public, max-age=300, s-maxage=600, stale-while-revalidate=3600`

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "companyName": "CARDBOX Industrial Manufacturing",
      "tagline": "Engineering Superior Corrugated Protection",
      "contactEmail": "logistics@cardbox.demo",
      "contactPhone": "+971 4 881 2345",
      "address": "Industrial Plot 45, Jebel Ali, Dubai, UAE",
      "socialLinks": {
        "linkedin": "https://linkedin.com/company/cardbox-industrial",
        "twitter": "https://twitter.com/cardboxuae",
        "facebook": "https://facebook.com/cardboxmanufacturing"
      },
      "defaultSEO": {
        "metaTitle": "CARDBOX | Industrial Corrugated Packaging Manufacturer",
        "metaDescription": "Leading UAE manufacturer..."
      },
      "homepageHero": { "title": "...", "subtitle": "..." },
      "ctaBanner": { "title": "...", "buttonText": "...", "buttonLink": "..." },
      "analyticsId": "UA-CARDBOX-2026"
    }
  ]
}
```

---

### POST /admin/settings

Creates a new settings record.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Headers**: `Authorization: Bearer <token>`

**Success Response** `201`:
```json
{
  "success": true,
  "message": "Created successfully",
  "data": { ... }
}
```

---

### PUT /admin/settings/:id

Updates website settings.

**Authentication**: Bearer token required

**Authorization**: `admin`, `super_admin`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Setting ObjectId |

**Success Response** `200`:
```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

**Error Responses**:
| Status | Condition |
|--------|-----------|
| 404 | Setting not found |
