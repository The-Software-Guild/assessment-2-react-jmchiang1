import React, { useState, useEffect } from "react";
import axios from "axios";
import APIHelper from "./ApiHelper";

function Items() {
  const [todos, setTodos] = useState([]);
  const [itemLists, setItemLists] = useState([
    {
      Name: "",
      Task: "",
      Easy: true,
      Count: "",
      Day: [],
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  //get
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      console.log(todos);
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  //create
  const handleChange = (event) => {
    setItemLists({ ...itemLists, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/todos/", itemLists)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //   setItemLists(itemLists);
  };

  //delete
  const deleteTodo = async (id) => {
    try {
      await APIHelper.deleteTodo(id);
    //   setTodos(todos.filter(({ id: i }) => id !== i));
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {}
  };

  //update
//   const updateTodo = (id) => {
//     axios.patch(`http://localhost:3001/todos/${id}`, 
//     {
//       Name: todos.Name,
//       Task: todos.Task,
//       Easy: todos.Easy,
//       Count: todos.Count,
//       Day: todos.Day,
//     })
//       .then(response => {
//         setTodos(todos);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

  const updateTodo = ({onChange}) => {
    let todoContent;
    if (isEditing) {
      todoContent = (
        <>
          <input
            value={todos.Name}
            onChange={e => {
              onChange({
                ...todos,
                title: e.target.value
              });
            }} />
          <button onClick={() => setIsEditing(false)}>
            Save
          </button>
        </>
      );
    } else {
      todoContent = (
        <>
          {todos.Name}
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      );
    }
  }

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>ToDo List!</h1>
      <form onSubmit={handleSubmit}>
        <h5>Create Item Here</h5>
        <div
          style={{ display: "inline-grid" }}
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
          <input
            type="text"
            name="Day"
            value={itemLists.Day}
            onChange={handleChange}
            placeholder="Day"
            required
          />

          <label>Easy?</label>
          <select name="Easy" id="Easy">
            <option value={itemLists.Easy} onChange={handleChange}>
              True
            </option>
            <option value={itemLists.Easy} onChange={handleChange}>
              False
            </option>
          </select>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>

      <div className="container">
        {todos.map((item) => {
          return (
            <div key={item.id} className="item-div">
              <h2> Name: {item.Name} </h2>
              <h2> Task: {item.Task} </h2>
              <h2> Easy?: {String(item.Easy).toUpperCase()} </h2>
              <h2> Count: {item.Count} </h2>
              <h2> Day: {item.Day.map((x) => x + ' | ')} </h2>
              {/* <h2> Day: {item.Day} </h2> */}
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Edit </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Items;
