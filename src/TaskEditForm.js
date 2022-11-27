import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  useThemeProps,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const status = ["Not started", "In progress", "Completed"];
const priorities = ["Urgent", "Important", "Medium", "Low"];
const initialState = {
  id: "",
  name: "",
  status: "",
  priority: "",
  notes: "",
  createdBy: "",
  assignedTo: "",
};

export default function TaskEditForm({ open, handleClose, id, saveTask}) {
  const [task, setTask] = React.useState({
    ...initialState,
  });

  React.useEffect(() => {
    if (id) {
      const data = JSON.parse(localStorage.getItem('tasks'));
      const selectedTask = data.find(task => task.id === id);
      setTask(selectedTask);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask(() => {
      return {
        ...task,
        [name]: value,
      };
    });
  };

  const save = () => {
    console.log(task);
    saveTask(task);
  };

  const close = () => {
    setTask({ ...initialState });
    handleClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open}>
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            onChange={handleChange}
            value={task.name}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={task.status}
              label="Status"
              name="status"
              onChange={handleChange}
            >
              {status.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={task.priority}
              label="Priority"
              name="priority"
              onChange={handleChange}
            >
              {priorities.map((priority) => (
                <MenuItem value={priority}>{priority}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="standard"
            name="notes"
            onChange={handleChange}
            value={task.notes}
          />
          <TextField
            autoFocus
            margin="dense"
            id="createdBy"
            label="Created by"
            type="text"
            fullWidth
            variant="standard"
            name="createdBy"
            value={task.createdBy}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="assignedTo"
            label="Assigned to"
            type="text"
            fullWidth
            variant="standard"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
