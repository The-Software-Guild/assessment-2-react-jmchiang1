const { v4: uuidv4 } = require("uuid");

let todos = [
  {
    Name: "Jonathan Chiang",
    Task: "Buy the milk",
    Easy: true,
    Count: 1,
    Day: ["Monday", "Tuesday"],
    id: '406c4561-fbae-4747-90dc-328e4b79811c'
  },
  {
    Name: "Michael Leung",
    Task: "Walk the dog",
    Easy: true,
    Count: 2,
    Day: ["Monday", "Saturday"],
    id: 'd6eae58e-a1e7-43b9-b6b5-68d00946e2bd'
  },
  {
    Name: "Eric Liang",
    Task: "Deliver the package",
    Easy: false,
    Count: 4,
    Day: ["Monday", "Tuesday", "Saturday", "Sunday"],
    id: '2167d807-c2fc-4a9e-af5e-8047ede65aad'
  },
  {
    Name: "May Wu",
    Task: "Graduate from bootcamp",
    Easy: false,
    Count: 1,
    Day: ["Thursday", "Monday"],
    id: 'ea9fa306-13fb-48ad-8618-a3158c68c363'
  },
  {
    Name: "Ken Chu",
    Task: "Get a new job",
    Easy: false,
    Count: 10,
    Day: ["Wednesday", "Thursday", "Friday"],
    id: 'c4c8c1d8-dce5-4205-9ef7-8abe4a32f898'
  },
];

module.exports = todos;
