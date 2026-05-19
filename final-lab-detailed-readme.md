# SP24 BCS A Final Lab Exam - Detailed Report

## Project Title

Real-Time Sales Dashboard for an Express, EJS, and Mongoose E-Commerce Store

## Original Task

The final lab task required extending an existing e-commerce application by adding a dynamic sales dashboard.

The required feature was:

- Create a new `/sales` dashboard page.
- Render the page with EJS and `express-ejs-layouts`.
- Calculate sales data from MongoDB using Mongoose.
- Show:
  - total revenue
  - total orders
  - top-selling product or recent transactions
- Create a JSON API endpoint:
  - `GET /api/sales-data`
- Use jQuery polling on the frontend.
- Refresh the dashboard automatically every 10 seconds without reloading the page.

## What We Had Before The Final Lab

Before starting the final lab, the project already had multiple assignments and lab tasks.

The most useful base was `lab-assignment4`, because it already contained:

- Express.js server
- EJS views
- `express-ejs-layouts`
- MongoDB connection using Mongoose
- Product model
- User model
- Order model
- Session-based login/register/logout
- Admin role support
- Admin product management
- JWT API routes
- Product catalog page
- Checkout route placeholder

Because the final lab needed sales data from orders, `lab-assignment4` was the best starting point.

## New Folder Created

A new folder was created:

```text
final lab/
```

This folder was copied from `lab-assignment4` and then modified for the final exam task.

The older assignments were not changed.

## Main Final Lab Features

The final lab now supports:

- Public product browsing
- Add to bag/cart
- Bag count in the navbar
- Login and register flow
- Checkout protected by login
- Order creation after checkout
- Admin-only sales dashboard
- Admin-only sales JSON API
- Live sales update every 10 seconds using jQuery

## Authentication And Authorization Logic

The app now has clear role-based behavior.

### Guest User

A guest user can:

- Open the homepage
- Open `/products`
- Add products to the bag
- See the bag count update

A guest user cannot:

- Complete checkout
- Open `/sales`
- Access `/api/sales-data`

If a guest clicks checkout, the app redirects them to:

```text
/auth/login
```

After login, the user is sent back to:

```text
/checkout
```

The bag remains saved in the session.

### Normal Customer

A logged-in customer can:

- Browse products
- Add products to bag
- Open checkout
- Complete checkout
- Create an order

A normal customer cannot:

- Open `/sales`
- Access `/api/sales-data`

After checkout, the customer is redirected back to:

```text
/products
```

### Admin User

An admin can:

- Open admin dashboard
- Manage products
- Open `/sales`
- Access live sales API

Admin access is based on the configured admin email in:

```text
final lab/config/default.json
```

## Sales Dashboard Logic

The dashboard is implemented in:

```text
final lab/routes/sales.js
```

The route has one shared helper function:

```js
getSalesStats()
```

This function calculates:

- total orders using `Order.countDocuments()`
- total revenue using Mongoose aggregation
- top-selling product using `$unwind`, `$group`, `$sort`, and `$limit`
- recent orders using `Order.find().sort().limit(5)`

The same helper is used by:

- the EJS page route
- the JSON API route

This keeps the logic clean and avoids duplicate code.

## Routes Added

### Sales Page

```text
GET /sales
```

Purpose:

- Renders the sales dashboard.
- Uses `admin-layout`.
- Requires admin login.

View used:

```text
final lab/views/sales.ejs
```

### Sales JSON API

```text
GET /api/sales-data
```

Purpose:

- Returns latest sales statistics in JSON format.
- Used by jQuery polling.
- Requires admin login.

Example response:

```json
{
  "totalRevenue": 299,
  "totalOrders": 1,
  "topProduct": "HomePod (2nd Gen)",
  "topProductQty": 1,
  "recentOrders": []
}
```

## jQuery Live Update

The live update code is inside:

```text
final lab/views/sales.ejs
```

It uses:

```js
setInterval(loadSalesData, 10000);
```

Every 10 seconds, the browser calls:

```text
/api/sales-data
```

Then it updates the dashboard values:

- total revenue
- total orders
- top product
- quantity sold
- recent transactions table
- last updated time

This happens without a full page reload.

## Bag And Checkout Logic

The original app did not have a working cart/bag flow for this final task.

So a simple session-based bag was added.

### Add To Bag Route

File:

```text
final lab/routes/products.js
```

Route:

```text
POST /bag/add/:id
```

Logic:

- Finds product by id.
- Checks if product exists.
- Checks if product is in stock.
- Creates `req.session.cart` if it does not exist.
- If product already exists in bag, increases quantity by 1.
- Otherwise adds a new item to the bag.
- Redirects back to the products page.

### Bag Count

File:

```text
final lab/server.js
```

Logic:

```js
res.locals.cartCount = (req.session.cart || []).reduce((sum, item) => sum + item.qty, 0);
```

This makes `cartCount` available in all EJS pages.

File:

```text
final lab/views/layout.ejs
```

The bag icon displays the count when the cart has items.

### Checkout

File:

```text
final lab/routes/checkout.js
```

Routes:

```text
GET /checkout
POST /checkout
```

Checkout is protected in:

```text
final lab/server.js
```

Using:

```js
app.use('/checkout', isLoggedIn, checkoutRoute);
```

Checkout logic:

- Reads cart from session.
- Calculates total.
- Shows order summary.
- On submit, creates an `Order`.
- Reduces product stock.
- Clears the cart.
- Redirects customer to `/products`.

## Files Changed Or Added

### Added Files

```text
final lab/routes/sales.js
final lab/views/sales.ejs
final lab/README.md
final-lab-detailed-readme.md
```

### Changed Files

```text
final lab/server.js
final lab/routes/products.js
final lab/routes/checkout.js
final lab/routes/auth/index.js
final lab/middlewares/auth.js
final lab/views/layout.ejs
final lab/views/admin-layout.ejs
final lab/views/checkout.ejs
final lab/public/css/style.css
final lab/public/css/admin.css
final lab/config/default.json
final lab/package.json
```

## Important File Responsibilities

### `server.js`

Main app file.

Responsibilities:

- Connects to MongoDB.
- Configures EJS layouts.
- Configures sessions.
- Adds global locals like `user`, `cartCount`, flash messages.
- Mounts routes.
- Protects checkout using `isLoggedIn`.
- Uses admin layout for `/admin` and `/sales`.

### `routes/sales.js`

Handles:

- sales dashboard page
- sales JSON API
- sales calculations
- admin-only API protection

### `routes/products.js`

Handles:

- product catalog
- filtering
- sorting
- pagination
- add-to-bag route

### `routes/checkout.js`

Handles:

- checkout page
- cart summary
- order creation
- stock update
- cart clearing

### `middlewares/auth.js`

Handles:

- login protection
- admin protection
- return-to-checkout behavior for logged-out users

### `views/sales.ejs`

Handles:

- initial server-rendered dashboard values
- dashboard cards
- recent order table
- jQuery AJAX polling every 10 seconds

### `views/layout.ejs`

Handles:

- main store layout
- navbar
- Login/Register links
- role display
- admin/sales links for admin
- bag count badge

### `views/admin-layout.ejs`

Handles:

- admin sidebar
- sales dashboard link
- admin page layout

## How The Final Flow Works

1. User opens:

```text
/products
```

2. User clicks:

```text
Add to Bag
```

3. Product is added to:

```text
req.session.cart
```

4. Bag count updates in navbar.

5. User clicks bag/checkout.

6. If not logged in:

```text
/auth/login
```

7. After login, user returns to:

```text
/checkout
```

8. User clicks:

```text
Complete Checkout
```

9. App creates an order in MongoDB.

10. App clears cart.

11. Customer returns to:

```text
/products
```

12. Admin opens:

```text
/sales
```

13. Dashboard shows updated sales.

14. Every 10 seconds, jQuery refreshes data from:

```text
/api/sales-data
```

## How To Run

Go to the final lab folder:

```bash
cd "d:\apple-clone\final lab"
```

Install dependencies:

```bash
npm install
```

Seed products if needed:

```bash
npm run seed
```

Start the app:

```bash
npm start
```

Open the store:

```text
http://localhost:3005/products
```

Open the admin sales dashboard:

```text
http://localhost:3005/sales
```

## MongoDB

The app uses:

```text
mongodb://127.0.0.1:27017/assignment3-catalog
```

MongoDB must be running before starting the app.

## Admin Access

The admin email is configured in:

```text
final lab/config/default.json
```

Current value:

```json
"adminEmail": "admin@gmail.com"
```

Register or login using that email to become admin.

## Testing Checklist

Use this checklist to test the final lab:

- Open `/products` without login.
- Confirm products are visible.
- Click `Add to Bag`.
- Confirm bag count becomes `1`.
- Click bag/checkout.
- Confirm app redirects to login.
- Register or login.
- Confirm app returns to checkout.
- Complete checkout.
- Confirm app returns to products.
- Login as admin.
- Open `/sales`.
- Confirm total revenue and total orders updated.
- Wait 10 seconds.
- Confirm dashboard refreshes automatically.

## Final Result

The final lab requirement has been completed.

The application now includes a real-time admin sales dashboard connected to real checkout orders. The dashboard uses server-rendered EJS for the first load and jQuery AJAX polling for live updates every 10 seconds.
