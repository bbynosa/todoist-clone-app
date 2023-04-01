import * as React from "react";

import * as Mui from '@mui/material';

// TODO: Can we please store these SVGs outside src/ dir, probably on public/ dir
import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as ViewIcon } from "../../icons/view.svg";
import { ReactComponent as OpenMoreIcon } from "../../icons/open-more.svg";

import Spinner from "../../components/Spinner";
import TaskListItem from "./TaskItem";

export default function TaskList({ rows, setSelectedTaskId }) {
  const handleTaskModalOpen = (taskId) => {
    setSelectedTaskId(taskId);
  };

  return (
    <>
      <Mui.Grid container paddingTop="50px" paddingRight="30px">
        <Mui.Grid item md={4} paddingLeft="75px">
          <Mui.Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            Inbox
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item md={8} container justifyContent="flex-end">
          <Mui.ButtonGroup
            variant="text"
            style={{
              button: {
                border: "none!important",
              },
              "button:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Mui.Button>
              <CommentIcon />
            </Mui.Button>
            <Mui.Button>
              <ViewIcon />
            </Mui.Button>
            <Mui.Button>
              <OpenMoreIcon />
            </Mui.Button>
          </Mui.ButtonGroup>
        </Mui.Grid>
        <Mui.Grid item md={12}>
          <Mui.List>
            {rows.length ? (
              rows.map((row) => (
                <>
                  <Mui.ButtonBase
                    onClick={() => handleTaskModalOpen(row.id)}
                    style={{ width: "100%" }}
                  >
                    <TaskListItem row={row} key={row.id} />
                  </Mui.ButtonBase>
                  <Mui.Divider />
                </>
              ))
            ) : (
              <Spinner />
            )}
          </Mui.List>
        </Mui.Grid>
      </Mui.Grid>
    </>
  );
}
