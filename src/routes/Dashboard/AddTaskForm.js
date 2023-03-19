// React imports 
import * as React from "react";

// Material UI imports 
import { Box, FormControl, Button, TextField, Select, MenuItem } from '@mui/material';

// Utility imports
import { v4 as uuidv4 } from "uuid";

// Global constants
const priorities = [1, 2, 3, 4];
const emptyTask = {
  id: "",
  author: "40edeec4-8a93-4d19-bcf7-9241d23cccfb", // FIXME: Change with actual user id 
  created_at: "",
  description: "",
  due_date: "",
  is_complete: false,
  name: "",
  priority: 4,                                    // Default priority 
  updated_at: ""
};

// Component definition
export default function AddTaskForm({ saveTodo, formMode }) {
  const [showForm, setShowForm] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ ...emptyTask });

  React.useEffect(() => {
    if (showForm) {
      formMode('add');
    } else {
      formMode('edit');
    }
  }, [showForm, formMode]);

  // Define validation
  const validate = (task) => {
    // Validate due_date
    if (task.due_date === null || task.due_date.length === 0
      || new Date(task.due_date) < new Date((new Date()).toDateString()))
      return false;

    // Validate name 
    if (task.name === null || task.name.length === 0)
      return false;

    return true;
  }

  // Define handlers
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  }

  const handleSave = () => {
    saveTodo({ ...newTask, id: uuidv4() });
    setNewTask({
      ...emptyTask
    });
  }

  /**
   * Task Format
   * {
        "author": "40edeec4-8a93-4d19-bcf7-9241d23cccfb",
        "created_at": "Sat, 21 Jan 2023 09:23:23 GMT",
        "description": "Lorem ipsum",
        "due_date": "Wed, 15 Feb 2023 09:23:23 GMT",
        "id": "2e318ea2-575a-49b2-ba71-32bbcd928146",
        "is_complete": false,
        "name": "Feed dogs",
        "priority": 2,    (1, 2, 3, 4)
        "updated_at": "Mon, 23 Jan 2023 09:23:23 GMT"
    }
   */

  // Render UI 
  return (
    <div>
      {showForm ?
        <div>
          <FormControl>
            <TextField
              autoFocus
              type="text"
              placeholder="Task name"
              name="name"
              onChange={handleOnChange}
              value={newTask.name}
            />
            <TextField
              multiline
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleOnChange}
              value={newTask.description}
            />
            <TextField
              type="date"
              placeholder="Due Date"
              name="due_date"
              onChange={handleOnChange}
              value={newTask.due_date}
            />
            <Select
              label="Priority"
              name="priority"
              onChange={handleOnChange}
              value={newTask.priority}
            >
              {priorities.map((value) =>
                <MenuItem key={value} value={value}>Priority {value}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Box>
            <Button type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="button" disabled={!validate(newTask)} onClick={handleSave}>Add Task</Button>
          </Box>
        </div>
        :
        <Button onClick={() => setShowForm(true)}>Add Task</Button>
      }
    </div>
  );
}