// React Imports
import * as React from "react";

// Material UI Imports
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
  TableCell,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Utility Imports
import { v4 as uuidv4 } from "uuid";

// Component Imports
import Spinner from "../../components/Spinner";

// API Imports
import { getStatus, getPriorities } from "../../api";

const status = getStatus();
const priorities = getPriorities();

const initialState = {
  id: "",
  name: "",
  status: "Not started",
  priority: "Medium",
  notes: "",
  created_by: "",
  assigned_to: "",
};

export default function InlineAdd({ saveTodo, formMode }) {
  const [todo, setTodo] = React.useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo(() => {
      return {
        ...todo,
        [name]: value,
      };
    });
  };

  const save = () => {
    console.log(todo);
    formMode('add');
    saveTodo({ ...todo, id: uuidv4() });
  };

  return (
    <>
      <TableCell>
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
          value={todo.name}
        />
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={todo.status}
            label="Status"
            name="status"
            onChange={handleChange}
          >
            {status.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={todo.priority}
            label="Priority"
            name="priority"
            onChange={handleChange}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <TextField
          margin="dense"
          id="assignedTo"
          label="Assigned to"
          type="text"
          fullWidth
          variant="standard"
          name="assigned_to"
          onChange={handleChange}
          value={todo.assigned_to}
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={save}>
          Add
        </Button>
      </TableCell>
    </>
  );
}
