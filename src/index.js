const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Disable
app.disable("x-powered-by");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false
  })
);

if (process.env.NODE_ENV === "production") {
  // Production
} else {
  // Development
  app.use(morgan("dev"));
}

// Controllers
const { homeController } = require("./controllers");

app.use("/", homeController);

module.exports = app;
