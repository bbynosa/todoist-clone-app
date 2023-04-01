import Button from "@mui/material/Button";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskEditForm from "./TaskEditForm";
import { Grid, Paper, Typography } from "@mui/material";
import axios from "../../api/axios";
import Spinner from "../../components/Spinner";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// Local components
import AddTaskForm from "./AddTaskForm";

export default function Dashboard() {
  const [openEdit, setOpenEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [formMode, setFormMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [open, setOpen] = useState(false);

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
    // TODO: Fix invoking list tasks API twice
    setLoading(true);
    const { data } = await axios.get("api/tasks");
    setRows(data);
    setLoading(false);
  };

  const getTodo = async () => {
    const { data } = await axios.get(`api/tasks/${selectedTaskId}`);
    setSelectedTask(data);
  };

  const createTodo = async (data) => {
    await axios.post("api/tasks", data);
  };

  const editTodo = async (data) =>
    await axios.put(`api/tasks/${data.id}`, data);

  const deleteTodo = async (id) => await axios.delete(`api/tasks/${id}`);

  const handleClickOpen = () => {
    setFormMode("add");
    setOpen(true);
  };

  const saveTodo = async (task) => {
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

  const handleFormMode = (mode) => {
    setFormMode(mode);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
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
          <AddTaskForm saveTodo={saveTodo} formMode={setFormMode} />
        </Grid>
      </Grid>
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