import { TaskRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TaskViewEditModal({
  open,
  closeTaskModal,
  selectedTaskId,
}) {
  const [task, setTask] = useState({});

  useEffect(() => {
    async function getTask() {
      await getTaskFromApi(selectedTaskId);
    }

    getTask();
  }, [selectedTaskId]);

  const getTaskFromApi = async (taskId) => {
    const { data } = await api.get(`/api/tasks/${taskId}`);
    const dueDate = new Date(data.due_date);
    data.due_date_day = dueDate.getDay();
    data.due_date_month_name = dueDate
      .toLocaleString("default", { month: "long" })
      .substring(0, 3); //get name of month from Date():https://stackoverflow.com/questions/1643320/get-month-name-from-date
    console.log(data.due_date);
    console.log("get task api data" + JSON.stringify(data));
    setTask(data);
  };

  const close = () => closeTaskModal();

  return (
    <Dialog
      open={open}
      // Set dimensions of dialog, from: https://stackoverflow.com/questions/47698037/how-can-i-set-a-height-to-a-dialog-in-material-ui
      PaperProps={{ sx: { minHeight: "90%", minWidth: "50%" } }}
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <DialogContentText>Inbox</DialogContentText>
          </Grid>
          <Grid item xs={6}>
            <DialogContentText>Icons</DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <DialogContentText>{task.name}</DialogContentText>
            <DialogContentText>{task.description}</DialogContentText>
          </Grid>
          <Grid item xs={4}>
            <DialogContentText>Project</DialogContentText>
            <DialogContentText>Inbox</DialogContentText>
            <DialogContentText>Due date</DialogContentText>
            <DialogContentText>
              {task.due_date_day} {task.due_date_month_name}
            </DialogContentText>
            <DialogContentText>Priority</DialogContentText>
            <DialogContentText>P{task.priority}</DialogContentText>
          </Grid>
        </Grid>
        {/* <Typography>{task.name}</Typography>
        <p>{task.description}</p> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
