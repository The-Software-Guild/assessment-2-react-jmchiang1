const express = require("express");
const router = express.Router();
let todos = require("../dummyData");

router.delete("/:id", (req, res, next) => {
    let { id } = req.params;
    todos = todos.find((item) => item.id !== id);
    res.status(200).send(todos);
})

module.exports = router;