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
import Spinner from "../../components/Spinner";
import { LoadingButton } from "@mui/lab";

const status = ["Not started", "In progress", "Completed"];
const priorities = ["Urgent", "Important", "Medium", "Low"];
const initialState = {
  id: "",
  name: "",
  status: "",
  priority: "",
  notes: "",
  created_by: "",
  assigned_to: "",
};

export default function TaskForm({ open, handleClose, saveTask, loading }) {
  const [task, setTask] = React.useState(initialState);

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
    saveTask({ ...task, id: uuidv4() });
  };

  const close = () => {
    setTask({ ...initialState });
    handleClose();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Add task</DialogTitle>
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
            margin="dense"
            id="created_by"
            label="Created by"
            type="text"
            fullWidth
            variant="standard"
            name="created_by"
            value={task.created_by}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="assigned_to"
            label="Assigned to"
            type="text"
            fullWidth
            variant="standard"
            name="assigned_to"
            value={task.assigned_to}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <LoadingButton onClick={save} loading={loading}>
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
