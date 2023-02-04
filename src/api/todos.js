// Todos table functions 
import axios from './axios';

// RESTful API endpoint for todo objects
const endpoint = '/todos';

/**
 * Get all rows in the todos table.
 * @returns array of todos 
 */
async function getTodos() {
  const { data } = await axios.get(endpoint);
  return data;
}

/**
 * Insert a new todo in the todos table
 * @param {*} todo new todo to insert 
 * @returns true if success, false if not
 */
async function postTodo(todo) {
  const { status } = await axios.post(endpoint, todo);
  return status === 200;
}

/**
 * Update the todo in the todos table. Make sure that id is specified. 
 * @param {*} todo data to update
 * @returns true if success, false if not 
 */
async function putTodo(todo) {
  const { status } = axios.put(`${endpoint}/${todo.id}`, todo);
  return status === 200;
}

/**
 * Delete the todo specified by the id parameter.
 * @param {*} id todo identifier
 * @returns true if success, false if not 
 */
async function deleteTodo(id) {
  const { status } = await axios.delete(`${endpoint}/${id}`);
  return status === 200;
}

/**
 * Get todo based on the given identifier
 * @param {*} id todo identifier
 * @returns todo object
 */
async function getTodo(id) {
  const { data } = await axios.get(`${endpoint}/${id}`);
  return data;
}

const status = ["Not started", "In progress", "Completed"];

/**
 * Get the list of possible status values 
 * @returns list of status
 */
function getStatus() {
  return status;
}

const priorities = ["Urgent", "Important", "Medium", "Low"];

/**
 * Get the list of possible priority values
 * @returns list of priorities
 */
function getPriorities() {
  return priorities;
}

export { getTodos, postTodo, putTodo, deleteTodo, getTodo, getStatus, getPriorities };
