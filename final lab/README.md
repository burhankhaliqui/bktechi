# Final Lab - Sales Dashboard

This project extends the existing Express, EJS, and Mongoose e-commerce app with a live sales dashboard.

## Main Feature

- `GET /sales`
  - Renders the sales dashboard using `express-ejs-layouts`.
  - Shows total revenue, total orders, top-selling product, and recent orders.
  - Uses server-side EJS values for the first page load.

- `GET /api/sales-data`
  - Returns the latest dashboard data as JSON.
  - Used by the sales page for live updates.

## Live Update

The `views/sales.ejs` page uses jQuery polling:

- calls `/api/sales-data`
- runs every 10 seconds
- updates dashboard values without reloading the page

## Run

```bash
npm install
npm run seed
npm start
```

Open the store:

```text
http://localhost:3005/products
```

Login rules:

- Products can be browsed without login.
- Users can add products to the bag without login.
- The bag count updates in the navbar when an item is added.
- Checkout requires login. If the user is not logged in, they are redirected to login first.
- After login, the user is sent back to checkout with the bag still saved.
- Checkout creates an order, clears the bag, and sends the customer back to `/products`.
- Only an admin user can open `/sales`.
- Only an admin user can call `/api/sales-data`.

Admin sales dashboard:

```text
http://localhost:3005/sales
```

The app uses MongoDB:

```text
mongodb://127.0.0.1:27017/assignment3-catalog
```
