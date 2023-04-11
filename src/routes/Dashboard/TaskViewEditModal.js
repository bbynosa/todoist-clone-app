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

import moment from "moment";

export default function TaskViewEditModal({
  open,
  onClose,
  selectedTaskId,
  onEditTaskSave,
  formMode,
}) {
  const [task, setTask] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectText, setSelectText] = React.useState(false);
  const [leftTextField, setLeftTextField] = React.useState(false);
  const [taskDueDateFormatted, setTaskDueDateFormatted] = React.useState({});

  React.useEffect(() => {
    const getTask = async () => {
      await getTaskFromApi(selectedTaskId);
    };

    getTask();
  }, [selectedTaskId]);

  React.useEffect(() => {
    const formatDates = () => {
      const due_date_fmt = formatDateToApiFormat(task.due_date);
      const created_at_fmt = formatDateToApiFormat(task.created_at);
      const updated_at_fmt = formatDateToApiFormat(task.updated_at);

      setTask({
        ...task,
        due_date: due_date_fmt,
        created_at: created_at_fmt,
        updated_at: updated_at_fmt,
      });
    };
    if (task !== null) formatDates();
  }, [task]);

  React.useEffect(() => {
    if (task !== null) handleSave();
  }, [task?.priority]);

  const getTaskFromApi = async (taskId) => {
    const { data } = await api.get(`/api/tasks/${taskId}`);

    //get name of month from Date():https://stackoverflow.com/questions/1643320/get-month-name-from-date
    const dueDate = new Date(data.due_date);
    setTaskDueDateFormatted({
      day: dueDate.getDay(),
      monthName: dueDate
        .toLocaleString("default", { month: "long" })
        .substring(0, 3),
    });

    setTask({ ...data });
    setLoading(false);
  };

  const handleClose = () => {
    if (selectText) setSelectText(false);
    onClose();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTask(() => {
      return {
        ...task,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    formMode("edit");
    onEditTaskSave(task);
    setSelectText(false);
  };

  const formatDateToApiFormat = (date) =>
    moment(date).format("YYYY-MM-DD HH:mm:ss");

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

  // TODO: Refactor this form. some components can be reusable
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
                <Mui.Button
                  sx={headerButtonStyle}
                  onClick={() => handleClose()}
                >
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
                    <Mui.Grid
                      paddingBottom="15px"
                      // oncClick={() => setSelectText(true)}
                    >
                      <Mui.Box
                        sx={
                          selectText
                            ? {
                                border: !leftTextField
                                  ? "1px solid #999"
                                  : "2px solid #eee",
                                borderRadius: "10px",
                              }
                            : {}
                        }
                        p={0}
                      >
                        <Mui.Box padding="5px">
                          <Mui.FormControl fullWidth>
                            <Mui.TextField
                              autoFocus
                              fullWidth
                              type="text"
                              placeholder="Task name"
                              name="name"
                              onChange={handleOnChange}
                              value={task.name}
                              sx={{
                                input: {
                                  fontWeight: "bold",
                                  padding: 0,
                                },
                                fieldset: {
                                  display: "none",
                                },
                              }}
                              onClick={() => {
                                setSelectText(true);
                                setLeftTextField(false);
                              }}
                              onBlur={() => setLeftTextField(true)}
                            />
                            <Mui.TextField
                              fullWidth
                              type="text"
                              placeholder="Task description"
                              name="description"
                              onChange={handleOnChange}
                              value={task.description}
                              sx={{
                                input: {
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                  padding: 0,
                                },
                                fieldset: {
                                  display: "none",
                                },
                              }}
                              onClick={() => {
                                setSelectText(true);
                                setLeftTextField(false);
                              }}
                              onBlur={() => setLeftTextField(true)}
                            />
                          </Mui.FormControl>
                        </Mui.Box>
                      </Mui.Box>
                      {selectText && (
                        <Mui.Grid
                          container
                          justifyContent="flex-end"
                          paddingTop="10px"
                        >
                          <Mui.Button
                            type="button"
                            onClick={() => setSelectText(false)}
                            sx={{
                              color: "black",
                              fontWeight: "normal",
                              textTransform: "none",
                              textDecoration: "none",
                              backgroundColor: "#f5f5f5",
                              px: "12px",
                              mr: 1,
                              "&:hover": {
                                backgroundColor: "#e5e5e5",
                              },
                            }}
                          >
                            Cancel
                          </Mui.Button>
                          <Mui.Button
                            type="button"
                            // disabled={!validate(draftTask)}
                            onClick={() => handleSave()}
                            sx={{
                              color: "white",
                              fontWeight: "normals",
                              textTransform: "none",
                              textDecoration: "none",
                              backgroundColor: "#dd4b39",
                              px: "12px",
                              "&:hover": {
                                backgroundColor: "#b03d32",
                              },
                              ":disabled": {
                                backgroundColor: "rgba(219, 76, 63, 0.4)",
                                color: "white",
                              },
                            }}
                          >
                            Save
                          </Mui.Button>
                        </Mui.Grid>
                      )}

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
                      {taskDueDateFormatted.day}{" "}
                      {taskDueDateFormatted.monthName}
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
                    <Mui.Select
                      label="Priority"
                      name="priority"
                      onChange={handleOnChange}
                      value={task.priority}
                      sx={{
                        "&": {
                          height: "28px",
                          display: "flex",
                          width: "auto",
                        },
                        fieldset: {
                          display: "none",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: 0,
                        },
                      }}
                      renderValue={(value) =>
                        value !== 4 ? (
                          <>
                            <FlagIcon
                              style={{
                                color: priorityIconColors.find(
                                  (x) => x.value === value
                                ).color,
                                paddingRight: 10,
                              }}
                            />
                            P{value}
                          </>
                        ) : (
                          <>
                            <PriorityIcon
                              style={{
                                color: priorityIconColors.find(
                                  (x) => x.value === value
                                ).color,
                                paddingRight: 10,
                              }}
                            />
                            P{value}
                          </>
                        )
                      }
                    >
                      {priorityIconColors.map(({ value, color }) => (
                        <Mui.MenuItem key={value} value={value}>
                          {value !== 4 ? (
                            <FlagIcon
                              style={{
                                color: color,
                                paddingRight: 10,
                              }}
                            />
                          ) : (
                            <PriorityIcon
                              style={{
                                color: color,
                                paddingRight: 10,
                              }}
                            />
                          )}
                          Priority {value}
                        </Mui.MenuItem>
                      ))}
                    </Mui.Select>
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
