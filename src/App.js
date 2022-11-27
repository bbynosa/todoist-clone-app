import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskEditForm from "./TaskEditForm";

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

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const data = localStorage.getItem("tasks");
      setRows(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (selectedTaskId) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const selectedTask = tasks.find((task) => task.id === selectedTaskId);
      setSelectedTask(selectedTask);
    }
  }, [selectedTaskId]);

  const handleClickOpen = () => {
    setFormMode("add");
    setOpen(true);
  };
  const saveTask = (newTask) => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (formMode === "add") {
      setOpen(false);
      data.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(data));
    } else if (formMode === "edit") {
      setOpenEdit(false);

      const newRows = data.map((row) => {
        if (row.id === newTask.id) {
          return newTask;
        }
        return row;
      });
      localStorage.setItem("tasks", JSON.stringify(newRows));
    }
    getTasks();
  };

  const getTasks = () => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    setRows(data);
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

  const deleteTask = (id) => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    const newRows = data.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newRows));
    getTasks();
  };

  return (
    <div className="App">
      <Button variant="contained" onClick={handleClickOpen}>
        Add a task
      </Button>
      <TaskList rows={rows} selectTask={selectTask} deleteTask={deleteTask} />
      {open && (
        <TaskForm
          open={open}
          handleClose={handleClose}
          saveTask={saveTask}
          data={selectedTask}
        />
      )}

      {openEdit && (
        <TaskEditForm
          open={openEdit}
          handleClose={handleCLoseEdit}
          id={selectedTaskId}
          saveTask={saveTask}
        />
      )}
    </div>
  );
}
