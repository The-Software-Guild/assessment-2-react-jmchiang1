import React, { useState, useEffect } from "react";
import axios from "axios";
import APIHelper from "./ApiHelper";
import "./Items.css";
import Modal from "./Modal";

function Items() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]); //data from the server
  const [itemLists, setItemLists] = useState([
    {
      Name: "",
      Task: "",
      Easy: "true",
      Count: "",
      Day: [],
    },
  ]);

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

  //handleChange function to store all values in state
  const handleChange = (event) => {
    setItemLists({ ...itemLists, [event.target.name]: event.target.value });
  };

  //submit itemLists data to axios.post request
  const handleSubmit = () => {
    console.log("day", itemLists.Day);

    axios
      .post("http://localhost:3001/todos/", itemLists)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <div
          className="float-right"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "1rem",
          }}
        >
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
                value={itemLists.Name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="Task"
                value={itemLists.Task}
                onChange={handleChange}
                placeholder="Task"
                required
              />
              <input
                type="number"
                name="Count"
                value={itemLists.Count}
                onChange={handleChange}
                placeholder="Count"
                required
              />
              <div style={{ backgroundColor: "white", margin: "1rem" }}>
                <label
                  style={{
                    backgroundColor: "white",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                  htmlFor="easy"
                >
                  Day of the week
                </label>
                <select style={{ borderRadius: "10px", backgroundColor: 'white' }} name="Todays_Day">
                  <option value={itemLists.Day} selected></option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div className="easy-div">
                <label
                  style={{ backgroundColor: "white", fontWeight: "bold" }}
                  htmlFor="easy"
                >
                  Easy?
                </label>
                <div style={{ backgroundColor: "white" }}>
                  <input
                    style={{ width: "2rem" }}
                    type="checkbox"
                    value={itemLists.Easy}
                    defaultChecked
                  />
                  <label style={{ backgroundColor: "white" }} htmlFor="True">
                    True
                  </label>
                </div>
                <div style={{ backgroundColor: "white" }}>
                  <input
                    style={{ width: "2rem" }}
                    type="checkbox"
                    value={itemLists.Easy}
                  />
                  <label style={{ backgroundColor: "white" }} htmlFor="False">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "white" }}>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
        <div className="container">
          {" "}
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <div key={item.id} className="item-div">
                    <h2> Name: {item.Name} </h2>
                    <h2> Task: {item.Task} </h2>
                    <h2> Easy?: {String(item.Easy).toUpperCase()} </h2>
                    <h2> Count: {item.Count} </h2>
                    {/* <h2> Day: {item.Day.map((x) => x + ' | ')} </h2> */}
                    <h2> Day: {item.Day} </h2>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      Edit{" "}
                    </button>
                    {modalOpen && (
                      <Modal todos={item} setOpenModal={setModalOpen} />
                    )}
                  </div>
                );
              })
            : todos.map((item, i) => {
                return (
                  <div key={i} className="item-div">
                    <h2> Name: {item.Name} </h2>
                    <h2> Task: {item.Task} </h2>
                    <h2> Easy?: {String(item.Easy).toUpperCase()} </h2>
                    <h2> Count: {item.Count} </h2>
                    <h2> Day: {item.Day} </h2>

                        <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        <button onClick={() => {setModalOpen(true)}}> Edit{" "}</button>
                        {modalOpen && ( <Modal todos={item} setOpenModal={setModalOpen} />)}
                    <div className="button-div">
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Items;
