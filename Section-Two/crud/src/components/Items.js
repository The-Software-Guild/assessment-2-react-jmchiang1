import React, { useState, useEffect } from "react";
import axios from "axios";
import APIHelper from "./ApiHelper";
import "./Items.css";
import Modal from "./Modal";

function Items() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemLists, setItemLists] = useState([
    {
      Name: "",
      Task: "",
      Easy: "",
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
      //   setTodos(todos.filter(({ id: i }) => id !== i));
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  //updating content
  //function grabbed from stackoverflow
  //   const updateTodo = (e, id) => {
  //     e.preventDefault();
  //     const data = {
  //       Name: todos.Name,
  //       Task: todos.Task,
  //       Easy: todos.Easy,
  //       Count: todos.Count,
  //       Day: todos.Day,
  //     };
  //     axios
  //       .put(`http://localhost:3001/todos/${id}`, data)
  //       .then((result) => {})
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>ToDo List!</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <h5>Create Item Here</h5>
        <div style={{ display: "inline-grid" }}>
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
          <input
            type="text"
            name="Day"
            value={itemLists.Day}
            onChange={handleChange}
            placeholder="Day"
            required
          />
          <div>
            <input
              type="checkbox"
              name="scales"
              value={itemLists.Easy}
              defaultChecked
            />
            <label htmlFor="True">True</label>
          </div>

          <div>
            <input type="checkbox" value={itemLists.Easy} />
            <label htmlFor="False">False</label>
          </div>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>

      <div className="container">
        {/* if edit button is clicked, set state to true and conditionally render input forms, will replace the current h2 tags */}
        {/* istouched === true ? <input>Name: {item.Name} </input> : <h2>Name: {item.Name}</h2>  */}
        {/* render "Save button", once pressed, save state of current input and set istouched to false and fire axios.put */}{" "}
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
                  {/* <button onChange={() => setEdit(true)} onClick={updateTodo}>Edit </button> */}
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
                  {/* <button onClick={() => setEdit(true)}>Edit</button> */}
                  <button onClick={() => {
                      setModalOpen(true);
                    }}>Edit </button>
                </div>
              );
            })}
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
    </div>
  );
}

export default Items;
