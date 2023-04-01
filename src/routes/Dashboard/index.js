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
  const [openEdit, setOpenEdit] = React.useState(false);
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

  const editTodo = async (data) =>
    await axios.put(`api/tasks/${data.id}`, data);

  const deleteTodo = async (id) => await axios.delete(`api/tasks/${id}`);

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
    setTaskModalOpen(true);
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
              saveTodo={saveTodo}
              formMode={handleFormMode}
              setRows={setRows}
              setSelectedTaskId={selectTask}
            />
          ) : (
            <Spinner />
          )}
          <AddTaskForm saveTodo={saveTodo} formMode={setFormMode} />
        </Mui.Grid>
      </Mui.Grid>
      {openEdit && (
        <TaskEditForm
          open={openEdit}
          handleClose={handleCLoseEdit}
          id={selectedTaskId}
          saveTask={saveTodo}
          saveLoading={saveLoading}
        />
      )}
      <TaskViewEditModal
        open={taskModalOpen}
        onClose={closeTaskModal}
        selectedTaskId={selectedTaskId}
      />
    </div>
  );
}
