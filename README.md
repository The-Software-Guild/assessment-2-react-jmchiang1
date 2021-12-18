[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6605845&assignment_repo_type=AssignmentRepo)

assessment #2 - React.js

    You must complete both sections by Monday December 20th
    Handed in via github classroom: https://classroom.github.com/a/uxPbbmLq
    Once finished book your code review with me via the following link: https://calendly.com/patrick-morgan-bkny/c165-assessment-2-react

Section One: Prototypes & Equivalence in JS
Refresh: https://www.youtube.com/watch?v=2rkEbcptR64
[] Part A: Equivalence
[] Write a function called strictEquals(a, b) that returns the same value as a === b.
    Your implementation must not use the === or !== operators.

[] Part B: Prototypal Inheritance
You are given a function, Square, that takes four parameters, A, B, C, and D, denoting the length of the square's edges.
Using prototype properties, add a method to Square named isSquare that prints true if a Square object has equal edges and false if they are unequal.
function Square(A, B, C, D) {
this.A = A;
this.B = B;
this.C = C;
this.D = D;
}
example test code
function processData(input) {
let sq1 = new Square(input[0], input[1], input[2], input[3]);
sq1.isSquare();

console.log(Object.getPrototypeOf(sq1));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
input = "";
process.stdin.on("data", function (input) {
input += input;
});

process.stdin.on("end", function () {
input = input.split(' ').map(num => Number(num));
processData(input);
});

[] Section Two: React.js
[] Part A: everythings-a-to-do-list
[] Purpose: Create a server using Express in Node, that serves up any data of your choice, and create a frontend application in React to interact with the server.

[] Follow TDD and test all routes using mocha/chai (BONUS: Use Jest & Enzyme to test some React components)

Getting Started

Step 1: Data - create an array of static data (fake database), hard coded in your server. Each object in the array must include at least:

[X] 2 strings
[X] 1 boolean
[X] 1 array
[X] 1 number
[X] An ID - unique identifier. Use the uuid package to generate unique IDs.

Step 2: Endpoints - Backend using Express - Create a server with the following functionality:

[X] Create a GET endpoint that returns all objects from the array and sends them to the client.
[X] Create a GET ONE endpoint that returns one object from the dataset.
[X] Create a POST endpoint that adds a new object to the array.
[X] Create a PUT endpoint that can update an object in the array.
[X] Create a DELETE endpoint that can delete an object in the array.
[] Create an endpoint that will query the dataset and return object(s) from it the based on certain criteria.
Example. Your dataset includes football players and the team they play for. Create a route that will return all players that play for a specific team.

Step 3: Status codes & Error Handling - Backend

Create a global error handler in server.js file.
Include at least one of each of the following status codes in all of your routes:
[] 200
[] 201
[] 500

Step 4: Frontend using Axios - Build a client-side React interface to function with your backend server, including the following CRUD operations:

[] Create (POST) a new object(s) to the dataset you created in Step 1.
[] Read (GET) a list of all the objects in the dataset.
[] Update (PUT) an object(s) in the dataset.
[] Delete (DELETE) an object(s) from the dataset.
[] GET ONE
[] Querying endpoint (i.e. a search bar that lets you filter through the list of ****\_****)
[] Step 5: The frontend React app must be fully styled and responsive.

Outcome:
Your final web application should have the following:

Web application (interact in browser)
The web app should list the items in the dataset (the initial ones created in Step 1), then update,
in real time (does not require refreshing the browser), to list any modifications made, such as Add, Delete, Edit items.
[] A form to Add items
[] An option (ex. button) to Delete items
[] An option (ex. button) to Edit items
[] When a User presses the Edit button, additional options to Submit the Edit and/or Cancel the Edit should be available to the User
Postman interaction
[] All backend endpoints created are functional:
[] GET
[] GET One
[] GET query selection (Step 2. f. above)
[] POST
[] PUT
[] DELETE
[] Each of status codes (at least 3) created are functional and display when the endpoint they are associated with is called in Postman.

reminders:
We should be following TDD and all code written here on out should be fully tested up to unit tests depth
All further code should be 100% fully es6. Not a mix match of some var declerations and some let/const, ...etc
From here on out, all assessments must be 'fully styled and responsive' and described earlier — using a combination of media queries, css flexbox & grid
Make sure all of your code is 'PR & code review ready' per the shared resources in slack, please reach out if you need more detail on what I am looking for
In your PR's you can include any relevant media (screenshots, gifs, etc)
I have moved the assignment 'vending-machine' due date until Wednesday morning September 8th at 10:00am est when class starts

how-to:
https://www.take-a-screenshot.org/
