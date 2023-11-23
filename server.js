require("dotenv").config();
const express = require("express");
const passport = require("passport");
const compression = require("compression");
const helmet = require("helmet");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const rootRouter = require("./routes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const app = express();

app.use(passport.initialize());

require("./config/passport");

app.use(cookieParser());
app.use(helmet());
app.use(compression({ threshold: 400 }));

require("./config/db").connectedToDb();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(rootRouter);

mongoose.connection.once("open", () => {
  console.log("database connection is established");
  app.listen(port, () => {
    console.log("Express app started on port " + port);
  });
});
