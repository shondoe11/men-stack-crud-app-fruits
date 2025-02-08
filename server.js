//* imports -> require
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");

//* config
const log = require("debug")("fruits:server");
const app = express();
const port = 3000;
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Fruit = require("./models/Fruit");
const fruitsController = require("./controllers/fruits");

//* middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
//* following line is for EJS only -> interpret the body of the POST
app.use(express.urlencoded({ extended: false }));

//* routes
app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  // res.send("new fruits");
  res.render("fruits/new.ejs");
});

app.post("/fruits", fruitsController.create);
app.get("/fruits", fruitsController.index);
app.get("/fruits/:fruitId", fruitsController.show);
app.delete("/fruits/:fruitId", fruitsController.destroy);
app.put("/fruits/:fruitId", fruitsController.update);

//* listen
app.listen(port, () => {
  log(`Example app listening on port ${port}`);
});
