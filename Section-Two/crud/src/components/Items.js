import React, { useState, useEffect } from "react";
import axios from "axios";
import APIHelper from "./ApiHelper";
import "./Items.css";
import Modal from "./Modal";
// import { type } from "express/lib/response";

function Items() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]); //data from the server
  const [input, setInput] = useState({
    Name: "",
    Task: "",
    Easy: "",
    Count: "",
    Day: [""],
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput !== "") {
      const filteredData = todos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(todos);
    }
  };

  //get all todos objects
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      console.log(todos);
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  //handleChange function to store all values in all state changes
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  //submit itemLists data to axios.post request
//   const handleSubmit = () => {
//     console.log("day", todos.Day);

//     axios
//       .post("http://localhost:3001/todos/", input)
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

console.log("typeof",typeof(input.Day))

const handleSubmit = async (e) => {
    console.log("todos id", todos.id);
    await axios.post("http://localhost:3001/todos/", input);
    e.preventDefault();
  };


  //find item by id and delete it.
  const deleteTodo = async (id) => {
    try {
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>ToDo List!</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <div className="float-container">
        <div className="float-right">
          <form onSubmit={handleSubmit} style={{ backgroundColor: "white" }}>
            <h2 style={{ backgroundColor: "white" }}>Create Item Here</h2>
            <div
              style={{
                display: "block",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <input
                type="text"
                name="Name"
                value={input.Name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="Task"
                value={input.Task}
                onChange={handleChange}
                placeholder="Task"
                required
              />
              <input
                type="number"
                name="Count"
                value={input.Count}
                onChange={handleChange}
                placeholder="Count"
                required
              />
              <div style={{ backgroundColor: "white" }} className="DAY-OF-WEEK">
                <input
                  type="Day"
                  name="text"
                  value={input.Day}
                //   onChange={(e) => console.log(setInput({ ...input, Day: e.target.value }))}
                  onChange={(e) => setInput({ ...input, Day: e.target.value })}
                  // onChange={handleChange}
                  placeholder="Specify day of the week"
                  required
                />
              </div>

              <input
                type="Easy"
                name="text"
                value={input.Easy}
                onChange={(e) => setInput({ ...input, Easy: e.target.value })}
                placeholder="Easy?: True or False?"
                required
              />
            </div>
            <div style={{ backgroundColor: "white" }}>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
        <div className="container">
          {" "}
          {searchInput.length > 1
            ? filteredResults.map((item, i) => {
                return (
                    <div key={i} className="item-div">
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Name </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Name}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Task </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Task}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Count </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Count}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Day </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Day}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Easy? </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{String(item.Easy).toUpperCase()}</h3>
                    </div>

                    <div className="button-div">
                      <button onClick={() => deleteTodo(item.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                    </div>
                    {modalOpen && (
                      <Modal todos={item} setOpenModal={setModalOpen} />
                    )}
                  </div>
                );
              })
            : todos.map((item, i) => {
                return (
                  <div key={i} className="item-div">
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Name </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Name}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Task </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Task}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Count </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Count}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Day </h2>
                      {/* <h3 style={{backgroundColor: 'transparent'}}>{item.Day.map((x, i) => 
                      <p key={i} style={{backgroundColor: 'transparent'}}>{x}</p>
                      )}</h3> */}
                      {/* <h3 style={{backgroundColor: 'transparent'}}>{item.Day.split("")}</h3> */}
                      <h3 style={{backgroundColor: 'transparent'}}>{item.Day}</h3>
                    </div>
                    <div style={{backgroundColor: 'transparent', padding: '10px'}}>
                      <h2> Easy? </h2>
                      <h3 style={{backgroundColor: 'transparent'}}>{String(item.Easy).toUpperCase()}</h3>
                    </div>

                    <div className="button-div">
                      <button onClick={() => deleteTodo(item.id)}>
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                    </div>
                    {modalOpen && (
                      <Modal todos={item} setOpenModal={setModalOpen} />
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Items;
