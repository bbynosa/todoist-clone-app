// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Icon imports
import { ReactComponent as PriorityIcon } from "../../icons/icon_priority.svg";
import { ReactComponent as PriorityIconFill } from "../../icons/icon_priority_fill.svg";

// Component imports
import DateField from '../../components/DateField';

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
  const isAdd = !taskToEdit;
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
        border: '1px solid #eee',
        borderRadius: '10px',

        // Credits to https://stackoverflow.com/questions/24287192/css-change-parent-on-focus-of-child
        ':focus-within': {
          border: '1px solid #999'
        }
      }} p={0}>
        <mui.FormControl fullWidth sx={{ p: 1 }}>
          <mui.TextField
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
              {priorities.map(({ value, icon, color }) =>
                <mui.MenuItem key={value} value={value}>
                  {React.createElement(icon, { style: { marginRight: '4px', verticalAlign: 'middle', color: color } })}
                  Priority {value}
                </mui.MenuItem>
              )}
            </mui.Select>
            <DateField 
              placeholder="Due date"
              name="due_date"
              sx={{
                '&': {
                  color: 'red'
                }
              }}
              />
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
            {isAdd ? 'Add Task' : 'Save'}
          </mui.Button>
        </mui.Grid>
      </mui.Box>
    </mui.Box>
  );
}