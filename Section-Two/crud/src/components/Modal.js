import React, {useState} from "react";
import "./Modal.css";

function Modal({ setOpenModal, todos }) {

    const [input, setInput] = useState({
        Name: '',
        Task: '',
        Easy: '',
        Count: '',
        Day: [],
    })

  return (
    <div className="container">
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="body">
          <input
            type="text"
            name="Name"
            value={input.Name}
            onChange={(e) => console.log(setInput({...input, Name: e.target.value})) }
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="Task"
            value={input.Task}
            onChange={(e) => console.log(setInput({...input, Task: e.target.value})) }
            placeholder="Task"
            required
          />
          <input
            type="text"
            name="Easy"
            value={input.Easy}
            onChange={(e) => console.log(setInput({...input, Easy: e.target.value})) }
            placeholder="Easy"
            required
          />
          <input
            type="text"
            name="Name"
            value={input.Count}
            onChange={(e) => console.log(setInput({...input, Count: e.target.value})) }
            placeholder="Count"
            required
          />
          <input
            type="text"
            name="Day"
            value={input.Day}
            onChange={(e) => console.log(setInput({...input, Day: e.target.value})) }
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
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
