import * as React from "react";

import api from "../../api/axios";

import Spinner from "../../components/Spinner";

import * as Mui from "@mui/material";

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

export default function TaskViewEditModal({
  open,
  closeTaskModal,
  selectedTaskId,
}) {
  const [task, setTask] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getTask() {
      await getTaskFromApi(selectedTaskId);
    }

    getTask();
  }, [selectedTaskId]);

  const getTaskFromApi = async (taskId) => {
    const { data } = await api.get(`/api/tasks/${taskId}`);

    //get name of month from Date():https://stackoverflow.com/questions/1643320/get-month-name-from-date
    const dueDate = new Date(data.due_date);
    data.due_date_day = dueDate.getDay();
    data.due_date_month_name = dueDate
      .toLocaleString("default", { month: "long" })
      .substring(0, 3);

    setTask(data);
    setLoading(false);
  };

  const handleClose = () => closeTaskModal();

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
    <Mui.Dialog
      open={open}
      // Set dimensions of dialog, from: https://stackoverflow.com/questions/47698037/how-can-i-set-a-height-to-a-dialog-in-material-ui
      PaperProps={{
        sx: { minHeight: "90%", width: "864px", maxWidth: "100%" },
      }}
      onClose={handleClose}
    >
      <Mui.DialogContent>
        {!loading ? (
          <Mui.Grid container>
            <Mui.Grid container paddingBottom={2}>
              <Mui.Grid
                item
                container
                xs={6}
                justifyContent="flex-start"
                padding-vi
              >
                <Mui.DialogContentText>
                  <InboxIcon
                    style={{ color: "#246fe0", paddingRight: "10px" }}
                  />
                  Inbox
                </Mui.DialogContentText>
              </Mui.Grid>
              <Mui.Grid item container xs={6} justifyContent="flex-end">
                <Mui.Button sx={headerButtonStyle}>
                  <MoveUpIcon />
                </Mui.Button>
                <Mui.Button sx={headerButtonStyle}>
                  <MoveDownIcon />
                </Mui.Button>
                <Mui.Button sx={headerButtonStyle}>
                  <MenuIcon />
                </Mui.Button>
                <Mui.Button sx={headerButtonStyle} onClick={() => handleClose()}>
                  <CloseIcon />
                </Mui.Button>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid
              container
              sx={{ borderTop: "1px solid #eee", paddingTop: 2 }}
            >
              <Mui.Grid item xs={8}>
                <Mui.Grid container>
                  <Mui.Grid item xs={1}>
                    <Mui.Checkbox
                      icon={<CircleOutlined />}
                      checkedIcon={<CheckCircleOutlineIcon color="disabled" />}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={11} paddingLeft="10px" paddingRight="25px">
                    <Mui.Grid paddingBottom="15px">
                      <Mui.DialogContentText
                        fontWeight="bold"
                        fontSize="20px"
                        color="black"
                        paddingBottom="15px"
                      >
                        {task.name}
                      </Mui.DialogContentText>
                      <Mui.DialogContentText paddingBottom="30px">
                        {task.description}
                      </Mui.DialogContentText>
                      <Mui.Button
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
                      </Mui.Button>
                    </Mui.Grid>
                    <Mui.Grid
                      container
                      sx={{ borderTop: "1px solid #eee" }}
                      paddingTop="20px"
                    >
                      <Mui.Grid item xs={1}>
                        <UserIcon />
                      </Mui.Grid>
                      <Mui.Grid item xs={11}>
                        <Mui.Box
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: "10px",
                            // Credits to https://stackoverflow.com/questions/24287192/css-change-parent-on-focus-of-child
                            ":focus-within": {
                              border: "1px solid #999",
                            },
                          }}
                        >
                          <Mui.TextField
                            autoFocus
                            type="text"
                            placeholder="Comment"
                            name="comment"
                            sx={{
                              input: {
                                padding: "2px",
                              },
                              fieldset: {
                                display: "none",
                              },
                            }}
                          />
                        </Mui.Box>
                      </Mui.Grid>
                    </Mui.Grid>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid container item xs={4} direction="column" spacing={2}>
                <Mui.Grid item container direction="column" spacing={1}>
                  <Mui.Grid item>
                    <Mui.DialogContentText>Project</Mui.DialogContentText>
                  </Mui.Grid>
                  <Mui.Grid item>
                    <Mui.DialogContentText>
                      <InboxIcon
                        style={{ color: "#246fe0", paddingRight: 10 }}
                      />
                      Inbox
                    </Mui.DialogContentText>
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item container direction="column" spacing={1}>
                  <Mui.Grid item>
                    <Mui.DialogContentText
                      sx={{ borderTop: "1px solid #eee", paddingTop: "10px" }}
                    >
                      Due date
                    </Mui.DialogContentText>
                  </Mui.Grid>
                  <Mui.Grid item>
                    <Mui.DialogContentText>
                      {/* TODO: Date icon color should be dependent on the date? i.e. 1 color for "past due date", 1 color for "next week", etc. See todoist implementation  */}
                      <DateIcon
                        style={{ color: "#d1453b", paddingRight: 10 }}
                      />
                      {task.due_date_day} {task.due_date_month_name}
                    </Mui.DialogContentText>
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item container direction="column" spacing={1}>
                  <Mui.Grid item>
                    <Mui.DialogContentText
                      sx={{ borderTop: "1px solid #eee", paddingTop: "10px" }}
                    >
                      Priority
                    </Mui.DialogContentText>
                  </Mui.Grid>
                  <Mui.Grid item>
                    <Mui.DialogContentText>
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
                    </Mui.DialogContentText>
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item container direction="column" spacing={1}>
                  <Mui.Grid item>
                    <Mui.DialogContentText
                      sx={{
                        borderTop: "1px solid #eee",
                        paddingTop: "10px",
                      }}
                    >
                      <Mui.Grid container>
                        <Mui.Grid item xs={8}>
                          Labels
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          container
                          xs={4}
                          justifyContent="flex-end"
                        >
                          <PlusIcon />
                        </Mui.Grid>
                      </Mui.Grid>
                    </Mui.DialogContentText>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        ) : (
          <Spinner />
        )}
      </Mui.DialogContent>
    </Mui.Dialog>
  );
}
