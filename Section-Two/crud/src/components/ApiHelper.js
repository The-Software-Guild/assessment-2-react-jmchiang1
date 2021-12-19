import axios from "axios";

const API_URL = "http://localhost:3001/todos/";
async function createTodo(item) {
  const { data: newTodo } = await axios.post(API_URL, {
    item,
  });
  return newTodo;
}

async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.patch(`${API_URL}${id}`, payload);
  return newTodo;
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos };
