import * as React from "react";

import * as Mui from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CircleOutlined } from "@mui/icons-material";

// TODO: Can we please store these SVGs outside src/ dir, probably on public/ dir
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DateIcon } from "../../icons/date.svg";
import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as HorizontalMenuIcon } from "../../icons/menu.svg";
import { ReactComponent as DoubleVerticalMenuIcon } from "../../icons/double-vertical-menu.svg";


export default function TaskListItem({ row }) {
  const [showTaskButtons, setShowTaskButtons] = React.useState(false);

  const taskButtonVisibility = {
    visibility: showTaskButtons ? "visible" : "hidden",
  };

  return (
    <Mui.ListItem
      disablePadding={true}
      key={row.id}
      onMouseEnter={() => setShowTaskButtons(true)}
      onMouseLeave={() => setShowTaskButtons(false)}
    >
      <Mui.Grid container>
        <Mui.Grid item xs={10} container>
          <Mui.Button sx={taskButtonVisibility}>
            <DoubleVerticalMenuIcon />
          </Mui.Button>
          <Mui.Checkbox
            icon={<CircleOutlined />}
            checkedIcon={<CheckCircleOutlineIcon color="disabled" />}
          />
          <Mui.ListItemText
            primary={row.name}
            secondary={
              <div>
                {(row.description || "").split("\n").map((l) => (
                  <div>{l}</div>
                ))}
              </div>
            }
          />
        </Mui.Grid>
        <Mui.Grid item xs={2}>
          <Mui.ButtonGroup
            variant="text"
            sx={{
              ...taskButtonVisibility,
              button: {
                border: "none!important",
              },
              "button:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Mui.Button>
              <EditIcon />
            </Mui.Button>
            <Mui.Button>
              <DateIcon />
            </Mui.Button>
            <Mui.Button>
              <CommentIcon />
            </Mui.Button>
            <Mui.Button>
              <HorizontalMenuIcon />
            </Mui.Button>
          </Mui.ButtonGroup>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.ListItem>
  );
}
