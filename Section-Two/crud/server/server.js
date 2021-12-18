const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const PORT = process.env.PORT || 3001;
const GET = require('./routes/GET')
const POST = require('./routes/POST')
const PATCH = require('./routes/PATCH')
const DELETE = require('./routes/DELETE')

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", GET);
app.use("/", POST);
app.use("/:id", PATCH);
app.use("/", DELETE);

app.listen(PORT, function() {
  console.log("Runnning on " + PORT);
});
module.exports = app;