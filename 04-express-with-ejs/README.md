# Express with EJS Demo

This project demonstrates a basic Express.js setup using the EJS templating engine.

## Features Covered

- Initializing an Express application.
- Setting up EJS as the view engine for rendering HTML pages dynamically.
- Serving static files (CSS, images, client-side JavaScript) from a public directory.
- Setting up basic routing for different endpoints:
  - `/`
  - `/contact-us`
  - `/hobbies`

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Navigate into the project directory:

```bash
cd 04-express-with-ejs
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the server:

```bash
node server.js
```

Or use the npm script:

```bash
npm start
```

The server runs on port `3000`.

- Homepage: http://localhost:3000/
- Contact Us page: http://localhost:3000/contact-us
- Hobbies page: http://localhost:3000/hobbies

## Local Testing with Nodemon

Install nodemon globally:

```bash
npm install -g nodemon
```

Or install it as a dev dependency (already included in this project):

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

EJS (Embedded JavaScript) lets you generate HTML with JavaScript on the server.

- **Views folder**: Express looks for templates in `views/` by default.
- **Rendering**: `res.render("homepage")` renders `views/homepage.ejs`.
- **Client side**: The browser only gets plain HTML output, not EJS tags.

## The Public Folder and Static Routes

The `public/` folder is for static assets such as:

- CSS
- Browser JavaScript
- Images and media

In `server.js`:

```js
app.use(express.static("public"));
```

This exposes all files in `public/` at the application root.

## Static File Paths

Do **not** include `/public/` in URLs.

If your files are:

- `public/css/style.css`
- `public/js/app.js`
- `public/logo.png`

Use these links in EJS:

```html
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js"></script>
<img src="/logo.png" alt="Logo">
```

The leading `/` ensures the browser always requests files from your app root.
