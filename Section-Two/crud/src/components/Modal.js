import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Modal.css";

function Modal({ setOpenModal, todos }) {

  const [input, setInput] = useState({
    Name: "",
    Task: "",
    Easy: "",
    Count: "",
    Day: [],
  });

//   const submitFunc = useEffect((id) => {
//     id = todos.id
//     const submit = async () => {
//       const todos = axios.patch(`http://localhost:3001/todos/${id}`, input);
//       console.log(todos);
//       setInput(input);
//     };
//     submit();
//   }, [input, todos.id]);

  const submitFunc = async (e, id) => {
    id = todos.id;
    console.log("todos id", todos.id);
    await axios.patch(`http://localhost:3001/todos/${id}`, input);
    e.preventDefault();
    // setInput(input);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" id={todos.id}>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="body">
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
              onChange={(e) => setInput({ ...input, Task: e.target.value })}
              placeholder="Task"
              required
            />
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                marginBottom: "1rem",
              }}
            >
              <label for="html" style={{ backgroundColor: "white" }}>
                Easy?
              </label>
              <select
                style={{
                  backgroundColor: "white",
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                }}
                name="Boolean"
              >
                <option value={input.Day} selected></option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>

            <input
              type="number"
              name="Count"
              value={input.Count}
              onChange={(e) => setInput({ ...input, Count: e.target.value })}
              placeholder="Count"
              required
            />
            <input
              type="text"
              name="Day"
              value={input.Day}
              onChange={(e) => setInput({ ...input, Day: e.target.value })}
              placeholder="Day"
              required
            />
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={submitFunc}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
