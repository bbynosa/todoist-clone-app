import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskEditForm from "./TaskEditForm";
import { Typography } from "@mui/material";
import axios from "./axios";
import Spinner from "./components/Spinner";

function createData(id, name, status, priority, notes, createdBy, assignedTo) {
  return { id, name, status, priority, notes, createdBy, assignedTo };
}

const seedData = [
  createData(
    "Feed dogs",
    "In Progress",
    "Medium",
    "lorem ipsum",
    "Bruce",
    "Bruce"
  ),
  createData(
    "Clean house",
    "In Progress",
    "Medium",
    "lorem ipsum",
    "Bruce",
    "Snowy"
  ),
  createData(
    "Water plants",
    "Not started",
    "Low",
    "lorem ipsum",
    "Bruce",
    "Papsy"
  ),
  createData(
    "Wash dishes",
    "Completed",
    "Urgent",
    "lorem ipsum",
    "Bruce",
    "Bruce"
  ),
  createData(
    "Buy food",
    "In Progress",
    "Medium",
    "lorem ipsum",
    "Bruce",
    "Bruce"
  ),
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [formMode, setFormMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    try {
      listTodos();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedTaskId) {
        getTodo();
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTaskId]);

  const listTodos = async () => {
    setLoading(true);
    const { data } = await axios.get("/todos");
    setRows(data);
    setLoading(false);
  };

  const getTodo = async () => {
    const { data } = await axios.get(`/todos/${selectedTaskId}`);
    setSelectedTask(data);
  };

  const createTodo = async (data) => {
    await axios.post("/todos", data);
  };

  const editTodo = async (data) => await axios.put(`/todos/${data.id}`, data);

  const deleteTodo = async (id) => await axios.delete(`/todos/${id}`);

  const handleClickOpen = () => {
    setFormMode("add");
    setOpen(true);
  };

  const saveTask = async (task) => {
    try {
      setSaveLoading(true);
      if (formMode === "add") {
        await createTodo(task);
        setSaveLoading(false);
        setOpen(false);
      } else if (formMode === "edit") {
        await editTodo(task);
        setSaveLoading(false);
        setOpenEdit(false);
      }
      await listTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const selectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setFormMode("edit");
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask({});
    setSelectedTaskId("");
  };

  const handleCLoseEdit = () => {
    setOpenEdit(false);
    setSelectedTaskId("");
  };

  const deleteTask = async (id) => {
    setLoading(true);
    await deleteTodo(id);
    await listTodos();
    setLoading(false);
  };

  return (
    <div className="App">
      <Typography variant="h3">Todolist App</Typography>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a task
      </Button>
      {!loading ? (
        <TaskList rows={rows} selectTask={selectTask} deleteTask={deleteTask} />
      ) : (
        <Spinner />
      )}
      {open && (
        <TaskForm
          open={open}
          handleClose={handleClose}
          saveTask={saveTask}
          data={selectedTask}
          loading={saveLoading}
        />
      )}

      {openEdit && (
        <TaskEditForm
          open={openEdit}
          handleClose={handleCLoseEdit}
          id={selectedTaskId}
          saveTask={saveTask}
          saveLoading={saveLoading}
        />
      )}
    </div>
  );
}
