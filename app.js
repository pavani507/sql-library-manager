const express = require("express");
const app = express();
const sqlite = require("sqlite3");
var path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const sequelize = require("./models").sequelize;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

var routes = require("./routes/index");
var books = require("./routes/books");

app.use("/", routes);
app.use("/books", books);

app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  res.render("page-not-found", { error: err });
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server is running on port 3000."));
});

module.exports = app;
