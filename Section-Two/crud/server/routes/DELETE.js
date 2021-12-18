const express = require("express");
const router = express.Router();
let todos = require("../dummyData.js");

router.delete("/:id", (req, res, next) => {
    let { id } = req.params;
    todos = todos.filter((item) => item.id !== id);
    res.status(200)
    .send(todos);
    // .redirect("/")
})

module.exports = router;