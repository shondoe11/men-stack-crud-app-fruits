const log = require("debug")("fruits:controllers:fruits");
const Fruit = require("../models/Fruit");

const create = async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  log("body %o", req.body);
  await Fruit.create(req.body);
  res.redirect("/fruits");
};

const index = async (req, res) => {
  const fruits = await Fruit.find({});

  res.render("fruits/index.ejs", { fruits });
};

const show = async (req, res) => {
  const { fruitId } = req.params;

  const fruit = await Fruit.findById(fruitId);

  res.render("fruits/show.ejs", { fruit });
};

const destroy = async (req, res) => {
  const { fruitId } = req.params;

  await Fruit.findByIdAndDelete(fruitId);

  res.send(fruitId);
};

const update = async (req, res) => {
  const { fruitId } = req.params;

  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  const fruit = await Fruit.findByIdAndUpdate(fruitId, req.body, { new: true });

  res.send(fruit);
};

module.exports = {
  create,
  index,
  show,
  destroy,
  update,
};
