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

  //search
  const [searchInput, setSearchInput] = useState('');   //state of search input value
  const [filteredResults, setFilteredResults] = useState([]);   //state of filtered results

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput !== ""){
        const filteredData = todos.filter((item) => {   //filter todo list based on search term 
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        // console.log(filteredData);
        setFilteredResults(filteredData);
    } else {
        setFilteredResults(todos);
    }
}

  //editing 
//   const [editId, setEdit] = useState(false);        //state of edit
//   const [inputValue, setInputValue] = useState(""); //state of inputValue for edit 

//   const editTodo = (id, text) => {
//     let editTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         todo.Name = text;
//       }
//       return todo;
//     });
//     setTodos(editTodos);
//     setEdit(false);
//   };

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
    } catch (err){
        console.log(err);
    }
  };

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>ToDo List!</h1>
      <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)} />
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

      <div className="container">   {/* render all todo list items */}

        {searchInput.length > 1 ? (
            filteredResults.map((item) => {
                return(
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
                )
            })
    ) : (
        todos.map((item) => {
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
          )
        })
    )}
      </div>
    </div>
  );
}


export default Items;
