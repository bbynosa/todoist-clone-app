import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, Button } from "@mui/material";

import TextField from "@mui/material/TextField";
import {
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import InlineAdd from "./InlineAdd";


const status = ["Not started", "In progress", "Completed"];
const priorities = ["Urgent", "Important", "Medium", "Low"];

export default function TaskList({ rows, selectTask, deleteTask, saveTodo, formMode }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Assigned to</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* TODO: Avoid prop drilling. Maybe time to use redux or context */}
            <InlineAdd saveTodo={saveTodo} formMode={formMode}/>
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
