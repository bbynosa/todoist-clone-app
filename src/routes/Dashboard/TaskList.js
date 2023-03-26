import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Link,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemButton,
  Radio,
  ButtonGroup,
  Typography,
  Grid,
  ButtonBase,
  Box,
} from "@mui/material";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import InlineAdd from "./InlineAdd";
import { useState } from "react";
import sortByProperty from "../../utils";

// TODO: Can we please store these SVGs outside src/ dir, probably on public/ dir
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DateIcon } from "../../icons/date.svg";
import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as ViewIcon } from "../../icons/view.svg";
import { ReactComponent as OpenMoreIcon } from "../../icons/open-more.svg";

import Spinner from "../../components/Spinner";
import TaskListItem from "./TaskItem";

const status = ["Not started", "In progress", "Completed"];
const priorities = ["Urgent", "Important", "Medium", "Low"];

// Dictionary of fields that can be used to sort the tasks
// Format is Field Name => Property Name
const sortFields = {
  Default: "id",
  Name: "name",
  Status: "status",
  Priority: "priority",
  "Assigned To": "assigned_to",
};

// Define a transform function for each sort field
// If nothing is defined, use the default transform
const sortFieldTransform = {
  Priority: (priority) => priorities.indexOf(priority),
  Status: (stat) => status.indexOf(stat),
};

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function TaskList({
  rows,
  selectTask,
  deleteTask,
  saveTodo,
  formMode,
  setRows,
  openTaskModal,
  setSelectedTaskId,
}) {
  // Define state variables
  const [sortField, setSortField] = useState("Default");
  const [showTaskButtons, setShowTaskButtons] = useState(false);

  // Define handlers
  const handleSortChange = (event) => {
    const { value } = event.target;

    // Set the current sort field
    setSortField(value);

    // Sort the rows
    const propertyName = sortFields[value];
    setRows(
      value in sortFieldTransform
        ? sortByProperty(rows, propertyName, sortFieldTransform[value])
        : sortByProperty(rows, propertyName)
    );
  };

  const handleTaskModalOpen = (taskId) => {
    console.log("handleTaskModalOpen()");
    setSelectedTaskId(taskId);
  };

  // Render UI
  return (
    <>
      <Grid container paddingTop="50px">
        <Grid item md={4} paddingLeft="90px">
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            Inbox
          </Typography>
        </Grid>
        <Grid item md={8}>
          <ButtonGroup>
            <Button>
              <CommentIcon />
            </Button>
            <Button>
              <ViewIcon />
            </Button>
            <Button>
              <OpenMoreIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <List sx={style}>
          {rows.length ? (
            rows.map((row) => (
              <>
                <ButtonBase onClick={() => handleTaskModalOpen(row.id)}>
                  <TaskListItem row={row} key={row.id} />
                </ButtonBase>
                <Divider />
              </>
            ))
          ) : (
            <Spinner />
          )}
        </List>
      </Grid>
    </>
  );
}