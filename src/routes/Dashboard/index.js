import * as React from "react";

import * as Mui from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import axios from "../../api/axios";

// Local components
import TaskList from "./TaskList";
import TaskEditForm from "./TaskEditForm";
import TaskViewEditModal from "./TaskViewEditModal";
import AddTaskForm from "./AddTaskForm";

import Spinner from "../../components/Spinner";

export default function Dashboard() {
  const [rows, setRows] = React.useState([]);
  const [selectedTaskId, setSelectedTaskId] = React.useState("");
  const [formMode, setFormMode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [taskModalOpen, setTaskModalOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      listTodos();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const listTodos = async () => {
    // TODO: Fix invoking list tasks API twice
    setLoading(true);
    const { data } = await axios.get("api/tasks");
    setRows(data);
    setLoading(false);
  };

  const createTodo = async (data) => {
    await axios.post("api/tasks", data);
  };

  const saveEditTask = async (data) =>
    await axios.put(`api/tasks/${data.id}`, data);

  const deleteTodo = async (id) => await axios.delete(`api/tasks/${id}`);

  const saveTask = async (task) => {
    try {
      if (formMode === "add") {
        await createTodo(task);
        setOpen(false);
      } else if (formMode === "edit") {
        await saveEditTask(task);
      }
      await listTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const selectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setTaskModalOpen(true);
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

  const closeTaskModal = () => {
    setTaskModalOpen(false);
  };

  return (
    <div>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={3}>
          <Mui.Paper>
            <Mui.List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <Mui.ListItem key={text} disablePadding>
                    <Mui.ListItemButton>
                      <Mui.ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </Mui.ListItemIcon>
                      <Mui.ListItemText primary={text} />
                    </Mui.ListItemButton>
                  </Mui.ListItem>
                )
              )}
            </Mui.List>
            <Mui.Divider />
            <Mui.List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <Mui.ListItem key={text} disablePadding>
                  <Mui.ListItemButton>
                    <Mui.ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </Mui.ListItemIcon>
                    <Mui.ListItemText primary={text} />
                  </Mui.ListItemButton>
                </Mui.ListItem>
              ))}
            </Mui.List>
          </Mui.Paper>
        </Mui.Grid>
        <Mui.Grid item xs={9}>
          {!loading ? (
            <TaskList
              rows={rows}
              deleteTask={deleteTask}
              saveTask={saveTask}
              formMode={handleFormMode}
              setRows={setRows}
              setSelectedTaskId={selectTask}
            />
          ) : (
            <Spinner />
          )}
          <AddTaskForm saveTask={saveTask} formMode={setFormMode} />
        </Mui.Grid>
      </Mui.Grid>
      <TaskViewEditModal
        open={taskModalOpen}
        onClose={closeTaskModal}
        selectedTaskId={selectedTaskId}
        onEditTaskSave={saveTask}
        formMode={setFormMode}
      />
    </div>
  );
}
