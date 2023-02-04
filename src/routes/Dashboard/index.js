// React Imports
import { useEffect, useState } from "react";

// Material UI Imports
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

// Component Imports
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskEditForm from "./TaskEditForm";
import Spinner from "../../components/Spinner";

// API Imports
import { getTodos, getTodo, postTodo, putTodo, deleteTodo } from '../../api';

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

export default function Dashboard() {
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
        getTask();
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTaskId]);

  const listTodos = async () => {
    setLoading(true);
    const data = await getTodos();
    setRows(data);
    setLoading(false);
  };

  const getTask = async () => {
    setSelectedTask(await getTodo(selectedTaskId));
  };

  const handleClickOpen = () => {
    setFormMode("add");
    setOpen(true);
  };

  const saveTodo = async (task) => {
    try {
      setSaveLoading(true);
      if (formMode === "add") {
        await postTodo(task);
        setSaveLoading(false);
        setOpen(false);
      } else if (formMode === "edit") {
        await putTodo(task);
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

  const handleFormMode = (mode) => {
    setFormMode(mode);
  };

  return (
    <div>
      {/* <Button variant="contained" onClick={handleClickOpen}>
        Add a task
      </Button> */}
      {!loading ? (
        <TaskList
          rows={rows}
          selectTask={selectTask}
          deleteTask={deleteTask}
          saveTodo={saveTodo}
          formMode={handleFormMode}
          setRows={setRows}
        />
      ) : (
        <Spinner />
      )}
      {open && (
        <TaskForm
          open={open}
          handleClose={handleClose}
          saveTask={saveTodo}
          data={selectedTask}
          loading={saveLoading}
        />
      )}

      {openEdit && (
        <TaskEditForm
          open={openEdit}
          handleClose={handleCLoseEdit}
          id={selectedTaskId}
          saveTask={saveTodo}
          saveLoading={saveLoading}
        />
      )}
    </div>
  );
}
