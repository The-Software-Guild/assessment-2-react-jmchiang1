const express = require("express");
const router = express.Router();
let todos = require("../dummyData.js");

//update existing item by id - NOT WORKING 
router.patch("/:id", (req, res, next) => {
  let { id } = req.params;
  const { name, task, easy, count, day } = req.body;
  const findItem = todos.find((item) => item.id === id);
  if (id === undefined) {
    const err = new Error("Item doesn't exist");
    next(err);
  }
  if (name) findItem.name = name;
  if (task) findItem.task = task;
  if (easy) findItem.easy = easy;
  if (count) findItem.count = count;
  if (day) findItem.day = day;

  res.status(200)
//   .send(findItem);
  .redirect("/")
});

module.exports = router;
