const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

app.get("/hobbies", (req, res) => {
  res.render("hobbies");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
