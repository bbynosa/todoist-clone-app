import * as React from "react";
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
  Checkbox,
} from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import InlineAdd from "./InlineAdd";
import { useState } from "react";
import sortByProperty from "../../utils";

// TODO: Can we please store these SVGs outside src/ dir, probably on public/ dir
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DateIcon } from "../../icons/date.svg";
import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as HorizontalMenuIcon } from "../../icons/menu.svg";
import { ReactComponent as DoubleVerticalMenuIcon } from "../../icons/double-vertical-menu.svg";

import Spinner from "../../components/Spinner";
import { CheckCircleOutline, CircleOutlined } from "@mui/icons-material";

export default function TaskListItem({ row }) {
  const [showTaskButtons, setShowTaskButtons] = useState(false);

  const taskButtonVisibility = {
    visibility: showTaskButtons ? "visible" : "hidden",
  };

  return (
    <ListItem
      key={row.id}
      onMouseEnter={() => setShowTaskButtons(true)}
      onMouseLeave={() => setShowTaskButtons(false)}
    >
      <Button sx={taskButtonVisibility}>
        <DoubleVerticalMenuIcon />
      </Button>
      <Checkbox
        icon={<CircleOutlined />}
        checkedIcon={<CheckCircleOutlineIcon color="disabled" />}
      />
      <ListItemText
        primary={row.name}
        secondary={
          <div>
            {(row.description || "").split("\n").map((l) => (
              <div>{l}</div>
            ))}
          </div>
        }
      />
      <ButtonGroup
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
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DateIcon />
        </Button>
        <Button>
          <CommentIcon />
        </Button>
        <Button>
          <HorizontalMenuIcon />
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}
