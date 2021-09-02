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

import { createTask } from "../actions/tasks";

const useStyles = makeStyles({
  cell: {
    width: 130,
  },
  formControl: {
    marginLeft: 5,
    marginRight: 10,
    minWidth: 120,
  },
});

const AddRow = ({ setAdd, groups, users }) => {
  const [open, setOpen] = useState(true);
  const [task, setTask] = useState({
    nhom: "",
    nguoiphancong: "",
    nguoithuchien: "",
    ngayphancong: "",
    ngayhethan: "",
    noidung: "",
    ketqua: 0,
    nhanxet: "Không",
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = () => {
    if (
      task.nhom &&
      task.nguoiphancong &&
      task.nguoithuchien &&
      task.ngayphancong &&
      task.ngayhethan &&
      task.noidung
    ) {
      dispatch(createTask(task));
    } else {
      console.log("Error! Lack of data!");
    }
    setAdd(false);

    // console.log(task);
  };

  // useEffect(() => {
  //   const getTeachers = async () => {
  //     const result = await axios("http://localhost:5000/teacher");
  //     setUsers(result.data);
  //     console.log(result.data);
  //   };

  //   getTeachers();
  // }, []);

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
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              label="Nhóm"
              onChange={(e) => setTask({ ...task, nhom: e.target.value })}
              required
            >
              {groups.map((group) => (
                <MenuItem key={group.manhom} value={group.tennhom}>
                  {group.tennhom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              label="Người phân công"
              onChange={(e) =>
                setTask({ ...task, nguoiphancong: e.target.value })
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
        </TableCell>
        <TableCell align="right">
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              label="Người thực hiện"
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
        </TableCell>
        <TableCell align="right">
          <Input
            type="date"
            name="ngayphancong"
            onChange={(e) => setTask({ ...task, ngayphancong: e.target.value })}
            className={classes.cell}
            required
          />
        </TableCell>
        <TableCell align="right">
          <Input
            type="date"
            name="ngayhethan"
            onChange={(e) => setTask({ ...task, ngayhethan: e.target.value })}
            className={classes.cell}
            required
          />
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
                    <TableCell>Tiến độ</TableCell>
                    <TableCell>Nhận xét</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Input
                        type="textarea"
                        name="noidung"
                        onChange={(e) =>
                          setTask({ ...task, noidung: e.target.value })
                        }
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        name="ketqua"
                        onChange={(e) =>
                          setTask({ ...task, ketqua: e.target.value })
                        }
                        className={classes.cell}
                        required
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Input
                        type="text"
                        name="nhanxet"
                        onChange={(e) =>
                          setTask({ ...task, nhanxet: e.target.value })
                        }
                        className={classes.cell}
                        required
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Xong
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 5 }}
                        onClick={() => setAdd(false)}
                      >
                        Hủy
                      </Button>
                    </TableCell>
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

export default AddRow;
