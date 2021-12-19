const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const PORT = process.env.PORT || 3001;
const Routes = require('./routes/Routes')

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/todos", Routes);

app.listen(PORT, function() {
  console.log("Runnning on " + PORT);
});

module.exports = app;