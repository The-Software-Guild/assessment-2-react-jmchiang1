let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require('../server/server')

//Assertion Style
chai.should();
chai.use(chaiHttp);
describe('Todo List API', () => {

    /**
     * Test the GET route
     */
    describe("GET /", () => {
        it("It should GET all the items", (done) => {
            chai.request(server)
                .get("/todos")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(5);
                done();
                });
        });

        it("It should NOT GET all the items", (done) => {
            chai.request(server)
                .get("/todo")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /:id", () => {
        it("It should GET a item by ID", (done) => {
            const itemId = 1;
            chai.request(server)                
                .get("/todos/" + itemId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('Name');
                    response.body.should.have.property('Task');
                    response.body.should.have.property('Easy');
                    response.body.should.have.property('Count');
                    response.body.should.have.property('Day');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a item by ID", (done) => {
            const itemId = 0;
            chai.request(server)                
                .get("/todos/" + itemId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("Invalid GET by ID request");
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /todos", () => {
        it("It should POST a new item", (done) => {
            const item = 
            {
                Name: "Person 6",
                Task: "task 6",
                Easy: "true",
                Count: 6,
                Day: ["day"],
              };
            chai.request(server)                
                .post("/todos")
                .send(item)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('Name').eq("Person 6");
                    response.body.should.have.property('Task').eq("task 6");
                    response.body.should.have.property('Easy').eq("true");
                    response.body.should.have.property('Count').eq(6);
                done();
                });
        });

        // it("It should NOT POST a new item with empty string", (done) => {
        //     const item = {
        //         Names: ''
        //     };
        //     chai.request(server)                
        //         .post("/todos")
        //         .send(item)
        //         .end((err, response) => {
        //             response.should.have.status(404);
        //             response.text.should.be.eq("Invalid creation");
        //         done();
        //         });
        // });

    });


    /**
     * Test the PUT route
     */
    describe("PATCH /todos/:id", () => {
        it("It should PATCH an existing item", (done) => {
            const itemId = 1;
            const item = {
                Name: "name changed",
                Task: "task changed"
            };
            chai.request(server)                
                .patch("/todos/" + itemId)
                .send(item)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('Name').eq("name changed");
                    response.body.should.have.property('Task').eq("task changed");
                done();
                });
        });

        it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
            const itemId = 1;
            const item = {
                Name: "ts",
                Task: "change"
            };
            chai.request(server)                
                .put("/todos/" + itemId)
                .send(item)
                .end((err, response) => {
                    response.should.have.status(404);
                    // response.text.should.be.eq("Invalid Item update");
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /todos/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const itemId = 1;
            chai.request(server)                
                .delete("/todos/" + itemId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const taskId = 999;
            chai.request(server)                
                .delete("/todos/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("Invalid Deletion");
                done();
                });
        });

    });
});
