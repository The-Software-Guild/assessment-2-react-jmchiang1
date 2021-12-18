const express = require("express");
const router = express.Router();
let todos = require("../dummyData");

//get all todos - WORKING
router.get("/", function (req, res, next) {
  res.status(200).send(todos);
});

//get single todo - WORKING
router.get("/:id", (req, res, next) => {
  let { id } = req.params;
  const findTodo = todos.find((task) => task.id === parseInt(id));
  if (req.body.length === 0){ //not sure if this error handling logic works 
    const err = new Error("Item doesn't exist") 
    next(err);
} else {
  res.status(200).send(findTodo);
  console.log('GET SINGLE ITEM SUCCESSFUL')
}
});

module.exports = router;