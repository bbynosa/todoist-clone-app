import { useEffect, useState, createElement } from "react";
import api from "../../api/axios";

import Spinner from "../../components/Spinner";
import { TaskRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Divider,
  Box,
  TextField,
  Checkbox,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CircleOutlined } from "@mui/icons-material";

import { ReactComponent as InboxIcon } from "../../icons/TaskEditModal/inbox.svg";
import { ReactComponent as UserIcon } from "../../icons/TaskEditModal/user.svg";
import { ReactComponent as DateIcon } from "../../icons/TaskEditModal/date.svg";
import { ReactComponent as FlagIcon } from "../../icons/TaskEditModal/flag.svg";
import { ReactComponent as PlusIcon } from "../../icons/TaskEditModal/plus.svg";
import { ReactComponent as MoveUpIcon } from "../../icons/TaskEditModal/move_up.svg";
import { ReactComponent as MoveDownIcon } from "../../icons/TaskEditModal/move_down.svg";
import { ReactComponent as MenuIcon } from "../../icons/TaskEditModal/menu.svg";
import { ReactComponent as CloseIcon } from "../../icons/TaskEditModal/close.svg";

import { ReactComponent as PriorityIcon } from "../../icons/icon_priority.svg";
import { ReactComponent as PriorityIconFill } from "../../icons/icon_priority_fill.svg";

export default function TaskViewEditModal({
  open,
  closeTaskModal,
  selectedTaskId,
}) {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTask() {
      await getTaskFromApi(selectedTaskId);
    }

    getTask();
  }, [selectedTaskId]);

  const getTaskFromApi = async (taskId) => {
    const { data } = await api.get(`/api/tasks/${taskId}`);

    const dueDate = new Date(data.due_date);
    data.due_date_day = dueDate.getDay();
    data.due_date_month_name = dueDate
      .toLocaleString("default", { month: "long" })
      .substring(0, 3); //get name of month from Date():https://stackoverflow.com/questions/1643320/get-month-name-from-date

    setTask(data);
    setLoading(false);
  };

  const close = () => closeTaskModal();

  const headerButtonStyle = {
    p: "2px",
    color: "gray",
    textTransform: "none",
    textDecoration: "none",
    mr: 1,
    "&:hover": {
      backgroundColor: "#e5e5e5",
      color: "black",
    },
    minWidth: "10px",
  };

  const priorityIconColors = [
    {
      value: 1,
      color: "#d1453b",
    },
    {
      value: 2,
      color: "#eb8909",
    },
    {
      value: 3,
      color: "#246fe0",
    },
    {
      value: 4,
      color: "#666666",
    },
  ];

  return (
    <Dialog
      open={open}
      // Set dimensions of dialog, from: https://stackoverflow.com/questions/47698037/how-can-i-set-a-height-to-a-dialog-in-material-ui
      PaperProps={{
        sx: { minHeight: "90%", width: "864px", maxWidth: "100%" },
      }}
      onClose={close}
    >
      <DialogContent>
        {!loading ? (
          <Grid container>
            <Grid container paddingBottom={2}>
              <Grid
                item
                container
                xs={6}
                justifyContent="flex-start"
                padding-vi
              >
                <DialogContentText>
                  <InboxIcon style={{ color: "#246fe0", paddingRight: "10px" }} />
                  Inbox
                </DialogContentText>
              </Grid>
              <Grid item container xs={6} justifyContent="flex-end">
                <Button sx={headerButtonStyle}>
                  <MoveUpIcon />
                </Button>
                <Button sx={headerButtonStyle}>
                  <MoveDownIcon />
                </Button>
                <Button sx={headerButtonStyle}>
                  <MenuIcon />
                </Button>
                <Button sx={headerButtonStyle} onClick={() => close()}>
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ borderTop: "1px solid #eee", paddingTop: 2 }}>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={1}>
                    <Checkbox
                      icon={<CircleOutlined />}
                      checkedIcon={<CheckCircleOutlineIcon color="disabled" />}
                    />
                  </Grid>
                  <Grid item xs={11} paddingLeft="10px" paddingRight="25px">
                    <Grid paddingBottom="15px">
                      <DialogContentText
                        fontWeight="bold"
                        fontSize="20px"
                        color="black"
                        paddingBottom="15px"
                      >
                        {task.name}
                      </DialogContentText>
                      <DialogContentText paddingBottom="30px">
                        {task.description}
                      </DialogContentText>
                      <Button
                        sx={{
                          color: "gray",
                          textTransform: "none",
                          textDecoration: "none",
                          px: "12px",
                          mr: 1,
                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                            color: "black",
                          },
                        }}
                      >
                        + Add sub-task
                      </Button>
                    </Grid>
                    <Grid
                      container
                      sx={{ borderTop: "1px solid #eee" }}
                      paddingTop="20px"
                    >
                      <Grid item xs={1}>
                        <UserIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Box
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: "10px",
                            // Credits to https://stackoverflow.com/questions/24287192/css-change-parent-on-focus-of-child
                            ":focus-within": {
                              border: "1px solid #999",
                            },
                          }}
                        >
                          <TextField
                            autoFocus
                            type="text"
                            placeholder="Comment"
                            name="comment"
                            sx={{
                              input: {
                                // fontWeight: "bold",
                                padding: "2px",
                              },
                              fieldset: {
                                display: "none",
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={4} direction="column" spacing={2}>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <DialogContentText>Project</DialogContentText>
                  </Grid>
                  <Grid item>
                    <DialogContentText>
                      <InboxIcon
                        style={{ color: "#246fe0", paddingRight: 10 }}
                      />
                      Inbox
                    </DialogContentText>
                  </Grid>
                </Grid>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <DialogContentText
                      sx={{ borderTop: "1px solid #eee", paddingTop: "10px" }}
                    >
                      Due date
                    </DialogContentText>
                  </Grid>
                  <Grid item>
                    <DialogContentText>
                      {/* TODO: Date icon color should be dependent on the date? i.e. 1 color for "past due date", 1 color for "next week", etc. See todoist implementation  */}
                      <DateIcon
                        style={{ color: "#d1453b", paddingRight: 10 }}
                      />
                      {task.due_date_day} {task.due_date_month_name}
                    </DialogContentText>
                  </Grid>
                </Grid>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <DialogContentText
                      sx={{ borderTop: "1px solid #eee", paddingTop: "10px" }}
                    >
                      Priority
                    </DialogContentText>
                  </Grid>
                  <Grid item>
                    <DialogContentText>
                      {task.priority !== 4 ? (
                        <FlagIcon
                          style={{
                            color: priorityIconColors.find(
                              (x) => x.value === task.priority
                            ).color,
                            paddingRight: 10,
                          }}
                        />
                      ) : (
                        <PriorityIcon
                          style={{
                            color: priorityIconColors.find(
                              (x) => x.value === task.priority
                            ).color,
                            paddingRight: 10,
                          }}
                        />
                      )}
                      P{task.priority}
                    </DialogContentText>
                  </Grid>
                </Grid>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <DialogContentText
                      sx={{
                        borderTop: "1px solid #eee",
                        paddingTop: "10px",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={8}>
                          Labels
                        </Grid>
                        <Grid item container xs={4} justifyContent="flex-end">
                          <PlusIcon />
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Spinner />
        )}
      </DialogContent>
    </Dialog>
  );
}
