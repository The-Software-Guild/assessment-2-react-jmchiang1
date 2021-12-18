const express = require("express");
const router = express.Router();
let todos = require("../dummyData");
const { v4: uuidv4 } = require("uuid");

//create new item
router.post("/", (req, res) => {
    var newItem = req.body;  
    console.log("REQ.BODY",newItem);
    todos.push({...newItem, id: uuidv4() });
    res.status(200)
    .redirect("/");
  });


module.exports = router;