// Import the express module
let express = require("express");
let path = require("path");

// Initialize an express application
let app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for the '/contact-us' page
app.get("/contact-us", function (req, res) {
  // Render the 'contact-us.ejs' view
  return res.render("contact-us");
});

// Define a route for the '/support' page
app.get("/support", function (req, res) {
  // Render the 'support.ejs' view
  return res.render("support");
});

// Define a route for the root URL ('/')
app.get("/", function (req, res) {
  // Render the 'homepage.ejs' view
  return res.render("homepage");
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server Started at localhost:3000");
});

// Log a message to indicate that the server.js file is being executed
console.log("Console from server.js file");
