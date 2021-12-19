import axios from "axios";
import React, {useState} from "react";
import "./Modal.css";

function Modal({ setOpenModal, todos }) {

    // console.log("todos",todos)

    const [input, setInput] = useState({
        Name: '',
        Task: '',
        Easy: '',
        Count: '',
        Day: [],
    })
    //submit function should update data in server as well as close modal and re-render data
    const submit = async (e, id) => { 
        id = todos.id
        console.log("todos id", todos.id)   //returns: c4c8c1d8-dce5-4205-9ef7-8abe4a32f898
        await axios.patch(`http://localhost:3001/todos/${id}`, input)
    }
    
    const handleChange = (e) => {
        setInput({
            ...input, Name: e.target.value
    })
    // console.log(input)
    }

  return (
    <div className="container" id={todos.id} >
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
            onChange={(e) => setInput({...input, Task: e.target.value}) }
            placeholder="Task"
            required
          />
          <input
            type="text"
            name="Easy"
            value={input.Easy}
            onChange={(e) => setInput({...input, Easy: e.target.value}) }
            placeholder="Easy"
            required
          />
          <input
            type="text"
            name="Name"
            value={input.Count}
            onChange={(e) => setInput({...input, Count: e.target.value}) }
            placeholder="Count"
            required
          />
          <input
            type="text"
            name="Day"
            value={input.Day}
            onChange={(e) => setInput({...input, Day: e.target.value}) }
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
            <button onClick={submit} >Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
