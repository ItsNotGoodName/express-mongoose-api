const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Disable
app.disable("x-powered-by");

// Middleware
app.use(cors());
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
