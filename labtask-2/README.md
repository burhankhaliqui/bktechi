# Lab Task 2 - Express with EJS

This project is a basic demonstration of using Express.js with the EJS (Embedded JavaScript) templating engine.

## Features Covered

- Initializing an Express application.
- Setting up EJS as the view engine for rendering HTML pages dynamically.
- Serving static files (like CSS, images, and client-side JavaScript) from a public directory.
- Setting up basic routing for different endpoints (`/`, `/contact-us`, and `/hobbies`).

## Prerequisites

Make sure you have Node.js installed on your machine.

## Installation

1. Navigate into the project directory:

```bash
cd labtask-2
```

2. Install the required dependencies:

```bash
npm install
```

## Running the Application

To start the server, run:

```bash
node server.js
```

The server will start on port `3000`.

- Homepage: http://localhost:3000/
- Contact Us page: http://localhost:3000/contact-us
- Hobbies page: http://localhost:3000/hobbies

## Local Testing with Nodemon

Install nodemon globally (if needed):

```bash
npm install -g nodemon
```

Or install it as a development dependency:

```bash
npm install --save-dev nodemon
```

Run with nodemon:

```bash
nodemon server.js
```

If not installed globally:

```bash
npx nodemon server.js
```

## How EJS Works (For Beginners)

EJS lets you generate HTML markup with plain JavaScript on the server.

- **Views folder**: Express looks for EJS templates in `views/`.
- **Rendering**: `res.render("homepage")` renders `views/homepage.ejs`.
- **Client side**: The browser receives only final HTML, not EJS tags.

## The Public Folder and Static Routes

The `public` folder stores static assets such as:

- CSS stylesheets
- Client-side JavaScript
- Images and media files

In `server.js`:

```js
app.use(express.static("public"));
```

This tells Express to serve files from the `public` directory.

## How to Set Paths for CSS, JS, and Images

Do **not** include `/public/` in URLs. Use root paths:

- CSS: `<link rel="stylesheet" href="/css/mystyles.css">`
- JS: `<script src="/js/myscripts.js"></script>`
- Image: `<img src="/logo.png" alt="My Website Logo">`

Use a leading `/` so file paths work from all routes.
