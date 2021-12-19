const { v4: uuidv4 } = require("uuid");

let todos = [
  {
    Name: "Jonathan Chiang",
    Task: "Buy the milk",
    Easy: true,
    Count: 1,
    Day: ["Monday", "Tuesday"],
    id: uuidv4()
  },
  {
    Name: "Michael Leung",
    Task: "Walk the dog",
    Easy: true,
    Count: 2,
    Day: ["Monday", "Saturday"],
    id: uuidv4()
  },
  {
    Name: "Eric Liang",
    Task: "Deliver the package",
    Easy: false,
    Count: 4,
    Day: ["Monday", "Tuesday", "Saturday", "Sunday"],
    id: uuidv4()
  },
  {
    Name: "May Wu",
    Task: "Graduate from bootcamp",
    Easy: false,
    Count: 1,
    Day: ["Thursday", "Monday"],
    id: uuidv4()
  },
  {
    Name: "Ken Chu",
    Task: "Get a new job",
    Easy: false,
    Count: 10,
    Day: ["Wednesday", "Thursday", "Friday"],
    id: uuidv4()
  },
];

module.exports = todos;
