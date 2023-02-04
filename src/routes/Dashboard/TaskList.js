import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, Button } from "@mui/material";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import InlineAdd from "./InlineAdd";
import { useState } from "react"
import sortByProperty from "../../utils";

const status = ["Not started", "In progress", "Completed"];
const priorities = ["Urgent", "Important", "Medium", "Low"];

// Dictionary of fields that can be used to sort the tasks
// Format is Field Name => Property Name
const sortFields = {
  "Default": "id",
  "Name": "name",
  "Status": "status",
  "Priority": "priority",
  "Assigned To": "assigned_to"
};

// Define a transform function for each sort field
// If nothing is defined, use the default transform
const sortFieldTransform = {
  "Priority": (priority) => priorities.indexOf(priority),
  "Status": (stat) => status.indexOf(stat)
};

export default function TaskList({ rows, selectTask, deleteTask, saveTodo, formMode, setRows }) {

  // Define state variables 
  const [sortField, setSortField] = useState("Default");

  // Define handlers
  const handleSortChange = (event) => {
    const { value } = event.target;

    // Set the current sort field
    setSortField(value);

    // Sort the rows 
    const propertyName = sortFields[value];
    setRows(value in sortFieldTransform
      ? sortByProperty(rows, propertyName, sortFieldTransform[value])
      : sortByProperty(rows, propertyName));
  }

  // Render UI 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head" align="left">Status</TableCell>
            <TableCell variant="head" align="left">Priority</TableCell>
            <TableCell variant="head" align="left">Assigned to</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  label="Sort By"
                  value={sortField}
                  onChange={handleSortChange}
                >
                  {Object.keys(sortFields).map((sortField) => (
                    <MenuItem key={sortField} value={sortField}>{sortField}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* TODO: Avoid prop drilling. Maybe time to use redux or context */}
            <InlineAdd saveTodo={saveTodo} formMode={formMode} />
          </TableRow>
          {/* TODO: New todo should be first on the list. We can do this by sorting by created_date */}
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    href="#"
                    underline="hover"
                    onClick={() => {
                      selectTask(row.id);
                    }}
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.priority}</TableCell>
                <TableCell align="left">{row.assigned_to}</TableCell>
                <TableCell align="left">
                  {/* TODO: replace to loadingButton MUI component */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => deleteTask(row.id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              key="no-data"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Loading data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
