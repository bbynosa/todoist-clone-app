// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Component imports
import InlineTaskForm from './InlineTaskForm';

// Icon imports
import { ReactComponent as AddIcon } from "../../icons/icon_add.svg";

// Component definition
export default function AddTaskForm({ saveTask, formMode }) {
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    if (showForm) {
      formMode('add');
    } else {
      formMode('edit');
    }
  }, [showForm, formMode]);

  // Define handlers
  const onSave = (task) => {
    saveTask(task);
  };

  const onCancel = () => {
    setShowForm(false);
  };

  // Render UI 
  return (
    !showForm ?
      <mui.Box pl={11} py={1} pr={2}>
        <mui.Button
          onClick={() => setShowForm(true)}
          variant="text"
          sx={{
            color: 'grey',
            textTransform: 'none',
            textDecoration: 'none',
            backgroundColor: 'white',
            '.MuiButton-startIcon': {
              color: '#dd4b39',
              borderRadius: '50%',
              height: '17px',
              width: '17px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'inherit'
            },
            '&:hover .MuiButton-startIcon': {
              color: '#fff',
              backgroundColor: '#dd4b39'
            },
            '&:hover': {
              color: '#dd4b39',
              backgroundColor: 'white'
            }
          }}
          startIcon={<AddIcon />}
        >
          Add task
        </mui.Button>
      </mui.Box>
      :
      <InlineTaskForm onSave={onSave} onCancel={onCancel} />
  );
}