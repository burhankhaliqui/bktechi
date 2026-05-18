# Assignment Analysis (3, Lab 3, 4, Lab 4)

This document explains how each app works, the main flows, and how to run them. The order matches your request:

1) Assignment 3
2) Lab Assignment 3
3) Assignment 4
4) Lab Assignment 4

All four apps are Express + MongoDB + EJS projects built around the same Apple product catalog data. Each one adds more features on top of the previous.

---

## 1) Assignment 3 (Dynamic Product Catalog)

**Goal:** Build a product catalog with search, filtering, sorting, and pagination.

### Main files
- server.js: bootstraps the app, DB connection, middleware, and routes.
- routes/products.js: catalog list route with filters.
- models/Product.js: Mongoose model and slug creation.
- middlewares/global.js: loads distinct categories for the UI.
- views/: EJS templates (home, layout, products list).
- seed.js: seeds 31 products with local image paths.
- config/default.json: MongoDB URI + port.

### How it works (workflow)
1. **Server startup**
   - Connects to MongoDB.
   - Sets EJS + layout, parses form bodies, serves /public.
   - Applies a global middleware to load categories into `res.locals`.

2. **Homepage**
   - GET / renders `views/index.ejs` with Apple-style hero sections.

3. **Product catalog**
   - GET /products reads query params: `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`.
   - Builds a MongoDB filter and sort object.
   - Queries `Product` with pagination (8 per page).
   - Renders `views/products/index.ejs` with the product grid and pagination controls.

4. **Data model**
   - Product has name, slug, description, price, category, rating, stock, image.
   - Slug is generated automatically on save using `slugify`.

### Query params for the catalog
- `search`: partial name match (case-insensitive)
- `category`: one of iPhone, Mac, iPad, Apple Watch, AirPods, Accessories
- `minPrice`, `maxPrice`: numeric price filter
- `sort`: name-asc, name-desc, price-asc, price-desc, rating-desc
- `page`: 1-based page index

### Run it
- Install: `npm install`
- Seed: `npm run seed`
- Start: `npm run start` (port 3001)

---

## 2) Lab Assignment 3 (Auth + Admin Panel)

**Goal:** Add authentication, role-based access control, admin product management, and a protected checkout page.

### What is added vs Assignment 3
- User accounts (register/login/logout)
- Session-based auth with MongoDB session store
- Flash messages for success/error feedback
- Admin dashboard + product CRUD with image uploads
- Checkout route protected by login

### Main files
- server.js: sessions, cookies, flash, and admin layout setup.
- routes/auth/index.js: register, login, logout, profile.
- middlewares/auth.js: `isLoggedIn` and `isAdmin` guards.
- routes/admin/*: admin dashboard and product CRUD.
- routes/checkout.js: simple protected page.
- models/User.js: user schema with role.
- seed.js: same product seed data.
- config/default.json: DB, port, adminEmail.

### Auth workflow
1. **Register**
   - Validates input, checks for existing email.
   - Hashes password with bcrypt.
   - Sets role to admin if email matches `adminEmail` in config.

2. **Login**
   - Verifies email + password.
   - Stores user info in session.
   - Uses flash to show success/errors.

3. **Session & UI**
   - `res.locals.user` is set for layout usage.
   - Header shows login/profile/admin links based on user role.

### Admin workflow (RBAC)
- All admin routes use `isAdmin`.
- Admin pages use `admin-layout` template.
- Products CRUD supports image upload via multer.
- Existing product images are removed from disk on update/delete.

### Checkout workflow
- GET /checkout is protected by `isLoggedIn`.
- If not logged in, user is redirected to /auth/login.

### Run it
- Install: `npm install`
- Seed: `npm run seed`
- Start: `npm run start` (port 3003)
- Admin access: register with the `adminEmail` in config.

---

## 3) Assignment 4 (Admin Panel + Product Management)

**Goal:** A focused admin-capable catalog with login and session auth.

### What is added vs Assignment 3
- User accounts + login
- Session-based auth
- Admin dashboard and product CRUD with image upload

### Main files
- server.js: sessions, admin layout, routes.
- routes/auth/index.js: register/login/logout.
- middlewares/auth.js: `ensureAuthenticated` and `ensureAdmin`.
- routes/admin/*: dashboard + product CRUD.
- models/User.js: user schema with role.
- seed.js: product seed data.
- config/default.json: DB, port, adminEmail.

### Auth workflow
- Register + login are similar to Lab 3, but without flash messages.
- Admin role is assigned if the email matches `adminEmail`.
- Session stores user info for UI and admin access.

### Admin workflow
- Admin routes require `ensureAdmin`.
- Product CRUD is the same multer-based flow:
  - create/edit products, upload images
  - delete old images when updating

### Run it
- Install: `npm install`
- Seed: `npm run seed`
- Start: `npm run start` (port 3002)

---

## 4) Lab Assignment 4 (JWT REST API + Admin + Store UI)

**Goal:** Combine the session-based store with a JWT-based REST API.

### What is added vs Lab 3
- REST API endpoints under `/api/v1`
- JWT login + protected API routes
- Order model and order creation API
- User profile API
- Uses dotenv for JWT secret

### Main files
- server.js: adds JSON parsing and API routes.
- routes/api/v1/auth.js: login returns a JWT.
- routes/api/v1/products.js: catalog JSON endpoints.
- routes/api/v1/orders.js: create orders (JWT protected).
- routes/api/v1/user.js: profile (JWT protected).
- middlewares/verifyToken.js: Bearer token validation.
- models/Order.js: order schema.
- seed.js: product seed data.
- config/default.json: DB, port, adminEmail.

### JWT API workflow
1. **Login (API)**
   - POST /api/v1/auth/login with email + password.
   - Returns `{ token }` if valid.

2. **Access protected routes**
   - Send `Authorization: Bearer <token>` header.
   - `verifyToken` validates and sets `req.user`.

3. **Products (API)**
   - GET /api/v1/products supports search, filtering, sorting, pagination.
   - GET /api/v1/products/:id returns a single product.

4. **Orders (API)**
   - POST /api/v1/orders creates an order tied to the JWT user.
   - Validates items array and total.

5. **User profile (API)**
   - GET /api/v1/user/profile returns user basic info.

### Run it
- Install: `npm install`
- Seed: `npm run seed`
- Start: `npm run start` (port 3004)
- Set JWT secret: create a `.env` file with `JWT_SECRET=your_secret`

---

## Shared product catalog logic (all projects)
- Same product seed list and schema across all apps.
- Same filtering logic in `/products` routes:
  - search, category, price range, sorting, pagination
- UI and layout share a consistent Apple-like storefront theme.

---

## Quick reference: ports and DB
- Assignment 3: 3001
- Assignment 4: 3002
- Lab Assignment 3: 3003
- Lab Assignment 4: 3004
- MongoDB: `mongodb://127.0.0.1:27017/assignment3-catalog`
