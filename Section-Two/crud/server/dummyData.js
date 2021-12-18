const { v4: uuidv4 } = require("uuid");

let todos = [
  {
    name: "Jonathan Chiang",
    task: "Buy the milk",
    easy: true,
    count: 1,
    day: ["Monday", "Tuesday"],
    id: 1
  },
  {
    name: "Michael Leung",
    task: "Walk the dog",
    easy: true,
    count: 2,
    day: ["Monday", "Saturday"],
    id: uuidv4(),
  },
  {
    name: "Eric Liang",
    task: "Deliver the package",
    easy: false,
    count: 4,
    day: ["Monday", "Tuesday", "Saturday", "Sunday"],
    id: uuidv4(),
  },
  {
    name: "May Wu",
    task: "Graduate from bootcamp",
    easy: false,
    count: 1,
    day: ["Monday"],
    id: uuidv4(),
  },
  {
    name: "Ken Chu",
    task: "Get a new job",
    easy: false,
    count: 10,
    day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    id: uuidv4(),
  },
];

module.exports = todos;
