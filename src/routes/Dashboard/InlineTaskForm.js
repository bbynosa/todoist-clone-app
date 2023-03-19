// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Icon imports
//import { ReactComponent as AddIcon } from "../../icons/icon_add.svg";
//import { ReactComponent as DateIcon } from "../../icons/icon_date.svg"; FIXME: For custom date picker
import { ReactComponent as PriorityIcon } from "../../icons/icon_priority.svg";
import { ReactComponent as PriorityIconFill } from "../../icons/icon_priority_fill.svg";

// Global constants
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
export default function InlineTaskForm({ taskToEdit, onCancel, onSave }) {
  const [draftTask, setDraftTask] = React.useState({ ...(taskToEdit || emptyTask) });

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
    setDraftTask({
      ...draftTask,
      [name]: value
    });
  }

  const handleSave = () => {
    onSave({ ...draftTask });
    setDraftTask({
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

  // #999999 - border 

  // Is this the best way?
  // TODO: Replace with CSS 
  const [formFocus, setFormFocus] = React.useState(false);

  // Priority styles
  const priorities = [
    {
      value: 1,
      icon: PriorityIconFill,
      color: '#d1453b'
    },
    {
      value: 2,
      icon: PriorityIconFill,
      color: '#EB8909'
    },
    {
      value: 3,
      icon: PriorityIconFill,
      color: '#246FE0'
    },
    {
      value: 4,
      icon: PriorityIcon,
      color: '#666666'
    }
  ]

  // Render UI 
  return (
    <mui.Box pl={11} py={1} pr={2}>
      <mui.Box sx={{
        border: `1px solid ${formFocus ? '#999' : '#eee'}`,
        borderRadius: '10px'
      }} p={0}>
        <mui.FormControl fullWidth sx={{ p: 1 }}>
          <mui.TextField
            onFocus={() => setFormFocus(true)}
            onBlur={() => setFormFocus(false)}
            autoFocus
            fullWidth
            type="text"
            placeholder="Task name"
            name="name"
            onChange={handleOnChange}
            value={draftTask.name}
            sx={{
              input: {
                fontWeight: 'bold',
                p: 0
              },
              fieldset: {
                display: 'none'
              }
            }}
          />
          <mui.TextField
            onFocus={() => setFormFocus(true)}
            onBlur={() => setFormFocus(false)}
            multiline
            fullWidth
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleOnChange}
            value={draftTask.description}
            sx={{
              textarea: {
                fontWeight: 'normal',
                p: 0
              },
              '.MuiInputBase-root': {
                p: 0
              },
              fieldset: {
                display: 'none'
              }
            }}
          />
          <mui.Grid my={1} justifyContent="flex-start" container>
            <mui.TextField
              onFocus={() => setFormFocus(true)}
              onBlur={() => setFormFocus(false)}
              type="date"
              placeholder="Due Date"
              name="due_date"
              onChange={handleOnChange}
              value={draftTask.due_date}
              sx={{
                input: {
                  p: 0,
                  mr: 1,
                  border: '1px grey solid',
                  borderRadius: '5px',
                  height: '28px',
                  display: 'flex',
                  width: 'auto'
                },
                fieldset: {
                  display: 'none'
                }
              }}
            />
            <mui.Select
              onFocus={() => setFormFocus(true)}
              onBlur={() => setFormFocus(false)}
              label="Priority"
              name="priority"
              onChange={handleOnChange}
              value={draftTask.priority}
              sx={{
                '&': {
                  p: 0,
                  border: '1px grey solid',
                  borderRadius: '5px',
                  height: '28px',
                  display: 'flex',
                  width: 'auto'
                },
                fieldset: {
                  display: 'none'
                }
              }}
            >
              {/* 1: #d1453b */}
              {priorities.map(({ value, icon, color }) =>
                <mui.MenuItem key={value} value={value}>
                  {React.createElement(icon, { style: { marginRight: '4px', verticalAlign: 'middle', color: color } })}
                  Priority {value}
                </mui.MenuItem>
              )}
            </mui.Select>
          </mui.Grid>
        </mui.FormControl>
        {/* https://stackoverflow.com/questions/45159071/mui-how-to-align-a-component-to-the-center-right */}
        <mui.Grid p={1} justifyContent="flex-end" container sx={{ borderTop: '1px solid #eee' }}>
          <mui.Button
            type="button"
            onClick={() => { if (onCancel) onCancel(); }}
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none',
              textDecoration: 'none',
              backgroundColor: '#f5f5f5',
              px: '12px',
              mr: 1,
              '&:hover': {
                backgroundColor: '#e5e5e5'
              }
            }}
          >
            Cancel
          </mui.Button>
          <mui.Button
            type="button"
            disabled={!validate(draftTask)}
            onClick={handleSave}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              textDecoration: 'none',
              backgroundColor: '#dd4b39',
              px: '12px',
              '&:hover': {
                backgroundColor: '#b03d32'
              },
              ':disabled': {
                backgroundColor: 'rgba(219, 76, 63, 0.4)',
                color: 'white'
              }
            }}
          >
            Add Task
          </mui.Button>
        </mui.Grid>
      </mui.Box>
    </mui.Box>
  );
}