const express = require("express");
const router = express.Router();
let todos = require("../dummyData");
const { v4: uuidv4 } = require("uuid");
const res = require("express/lib/response");

//get all todos - WORKING
router.get("/", (req, res, next) => {
    try {
        res.status(200).send(todos);
    } catch (err){
        res.status(400).send("Invalid GET all request");
        next(err);
    }
});

//get single todo - WORKING WITH HARD CODED NUMBER ID
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
      const findTodo = todos.find((task) => task.id === parseInt(id));
      if (!findTodo){
          return res.status(404).send("Invalid GET by ID request");
      } else {
          res.status(200).send(findTodo);
      }
});

//update existing item by id - WORKS
router.patch("/:id", (req, res, next) => {
  let id  = req.params.id;
  try {
      const item = todos.find((item) => item.id === parseInt(id));
      item.Name = req.body.Name;
      item.Task = req.body.Task;
      item.Easy = req.body.Easy;
      item.Count = req.body.Count;
      item.Day = req.body.Day;
      res
        .status(200).send(item);
  } catch (err){
      res.status(404).send('Invalid Item update');
    //   next(err);
  }
});

//create new item - WORKS
// router.post("/", (req, res, next) => {
//   var newItem = req.body;
//   try {
//       todos.push({ ...newItem, id: uuidv4() });
//       res.status(200)
//       .send(newItem)
//   } catch (err) {
//       res.status(404).send("Invalid creation");
//       next(err);
//   }
// });

router.post("/", (request, response) => {
    const todo = {
      id: uuidv4(),
      Name: request.body.Name,
      Task: request.body.Task,
      Easy: request.body.Easy,
      Count: request.body.Count,
    };
    try {
        todos.push(todo);
        response.status(200).send(todo);
    } catch (err) {
        res.status(404).send('Invalid creation')
    }
  });

//delete single item - 
// router.delete("/:id", (req, res, next) => {
//   let id = req.params.id;
//   try {
//       todos = todos.filter((item) => item.id !== parseInt(id));
//       res.status(200)
//     //   .send(todos);
//       .redirect("/todos")
//   } catch (err) {
//       res.send(404).send('Invalid Deletion');
//       next(err);
//   }
// })

router.delete("/:id", (request, response) => {
    const id = request.params.id;
    const findItem = todos.find((item) => item.id === parseInt(id));
    if (!findItem)
      return response
        .status(404)
        .send("Invalid Deletion");
  
    const index = todos.indexOf(findItem);
    todos.splice(index, 1);
    response.send(findItem);
  });

//search query string - NOT WORKING
router.get("/search", (req, res, next) => {
    try {
        res.status(200).send(req.query);
        // console.log(req.query);
    } catch (err){
        res.status(400).send("Invalid search request");
        next(err);
    }
});

//error handler
router.use((req, res, next) => {
    const err = new Error("Task not found");
    err.status = 404;
    next(err);
})

//global error handler
router.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

module.exports = router;
