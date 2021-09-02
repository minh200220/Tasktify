import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { updateTask, deleteTask } from "../actions/tasks";

const useStyles = makeStyles({
  cell: {
    width: 130,
  },
  button: {
    marginLeft: 10,
  },
  formControl: {
    marginLeft: 5,
    marginRight: 10,
    minWidth: 120,
  },
});

const Row = ({ row, disabled, user, users, groups }) => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(row);
  const dispatch = useDispatch();
  const classes = useStyles();

  const formatDate = (input) => {
    var datePart = input.slice(0, 10).match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  const handleSubmit = () => {
    if (edit) {
      dispatch(updateTask(task._id, task));
    }

    // console.log(task);
    setEdit(!edit);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {edit ? (
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                label="Nhóm"
                value={task.nhom}
                onChange={(e) => setTask({ ...task, nhom: e.target.value })}
                required
                disabled={disabled}
              >
                {groups.map((group) => (
                  <MenuItem key={group.manhom} value={group.tennhom}>
                    {group.tennhom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            task.nhom
          )}
        </TableCell>
        <TableCell align="right">
          {edit ? (
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                label="Người phân công"
                onChange={(e) =>
                  setTask({ ...task, nguoiphancong: e.target.value })
                }
                value={task.nguoiphancong}
                required
                disabled={disabled}
              >
                {users.map((user) => (
                  <MenuItem key={user.email} value={user.ten}>
                    {user.ten}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            task.nguoiphancong
          )}
        </TableCell>
        {!disabled && (
          <TableCell align="right">
            {edit ? (
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  label="Người thực hiện"
                  value={task.nguoithuchien}
                  onChange={(e) =>
                    setTask({ ...task, nguoithuchien: e.target.value })
                  }
                  required
                >
                  {users.map((user) => (
                    <MenuItem key={user.email} value={user.ten}>
                      {user.ten}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              task.nguoithuchien
            )}
          </TableCell>
        )}

        <TableCell align="right">
          {edit ? (
            <Input
              type="date"
              className={classes.cell}
              value={task.ngayphancong.slice(0, 10)}
              onChange={(e) =>
                setTask({ ...task, ngayphancong: e.target.value })
              }
              disabled={disabled}
            />
          ) : (
            formatDate(task.ngayphancong)
          )}
        </TableCell>
        <TableCell align="right">
          {edit ? (
            <Input
              type="date"
              className={classes.cell}
              value={task.ngayhethan.slice(0, 10)}
              onChange={(e) => setTask({ ...task, ngayhethan: e.target.value })}
              disabled={disabled}
            />
          ) : (
            formatDate(task.ngayhethan)
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nội dung</TableCell>
                    <TableCell>Tiến độ (%)</TableCell>
                    <TableCell>Nhận xét</TableCell>
                    {(user.vaitro === 1 || disabled) && (
                      <TableCell align="right">Thao tác</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: 500 }}
                    >
                      {edit ? (
                        <Input
                          type="textarea"
                          value={task.noidung}
                          onChange={(e) =>
                            setTask({ ...task, noidung: e.target.value })
                          }
                          disabled={disabled}
                        />
                      ) : (
                        task.noidung
                      )}
                    </TableCell>
                    <TableCell>
                      {edit ? (
                        <Input
                          type="text"
                          className={classes.cell}
                          value={task.ketqua}
                          onChange={(e) =>
                            setTask({ ...task, ketqua: e.target.value })
                          }
                        />
                      ) : (
                        task.ketqua
                      )}
                    </TableCell>
                    <TableCell>
                      {edit ? (
                        <Input
                          type="text"
                          className={classes.cell}
                          value={task.nhanxet}
                          onChange={(e) =>
                            setTask({ ...task, nhanxet: e.target.value })
                          }
                          disabled={disabled}
                        />
                      ) : (
                        task.nhanxet
                      )}
                    </TableCell>
                    {(user.vaitro === 1 || disabled) && (
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          {edit ? "Xong" : "Sửa"}
                        </Button>
                        {!disabled && (
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => dispatch(deleteTask(task._id))}
                          >
                            Xóa
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
