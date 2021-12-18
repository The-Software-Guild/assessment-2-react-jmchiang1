const express = require("express");
const router = express.Router();
let todos = require("../dummyData");
const { v4: uuidv4 } = require("uuid");

//get all todos - WORKING
router.get("/", function (req, res, next) {
    try {
        res.status(200).send(todos);
    } catch (err){
        res.status(400).send("Invalid GET all request");
        next(err);
    }
});

//get single todo - WORKING WITH HARD CODED NUMBER ID
router.get("/:id", (req, res, next) => {
  let { id } = req.params;
  id = Number(id)
  try {
      const findTodo = todos.find((task) => task.id === id);
      res.status(200).send(findTodo);
      console.log("GET SINGLE ITEM SUCCESSFUL");
  } catch (err){
      res.status(400).send("Invalid GET by ID request");
      next(err);
  }
});

//update existing item by id - WORKS
router.patch("/:id", (req, res, next) => {
  let id  = req.params.id;
  try {
      const item = todos.find((item) => item.id === parseInt(id));
      if (!item) {
          return res.status(404).send("Item with ID doesn't exist");
      }
      item.Name = req.body.Name;
      item.Task = req.body.Task;
      item.Easy = req.body.Easy;
      item.Count = req.body.Count;
      item.Day = req.body.Day;
      res
        .status(200).send(item);
        // .redirect("/");
  } catch (err){
      res.status(404).send('Invalid Item update');
      next(err);
  }
});

//create new item - WORKS
router.post("/", (req, res, next) => {
  var newItem = req.body;
  console.log("REQ.BODY", newItem);
  try {
      todos.push({ ...newItem, id: uuidv4() });
      res.status(200)
      .send(newItem)
    //   .redirect("/todos")
  } catch (err) {
      res.status(404).send("Invalid creation");
      next(err);
  }
});

//delete single item - 
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  try {
      todos = todos.filter((item) => item.id !== parseInt(id));
      res.status(200)
    //   .send(todos);
      .redirect("/todos")
  } catch (err) {
      res.send(404).send('Invalid Deletion');
      next(err);
  }
});

module.exports = router;
