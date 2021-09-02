import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";

import TablePaginationActions from "./TablePagination";
import Row from "./Row";
import AddRow from "./AddRow";
import Download from "./Download";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 500,
  },
  header: {
    backgroundColor: "#DBEBC0",
  },
  formControl: {
    marginLeft: 5,
    marginRight: 10,
    minWidth: 120,
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default function MyTable({ disabled }) {
  const [add, setAdd] = useState(false);
  const [select, setSelect] = useState({
    groups: [],
    users: [],
  });

  // get tasks
  let tasks = useSelector((state) => state.tasks);
  const user = JSON.parse(localStorage.getItem("profile")).result;
  if (disabled) {
    tasks = tasks.filter((task) => task.nguoithuchien === user.ten);
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // state for option
  const [state, setState] = useState("Nhóm công việc");

  // search filler
  const [filter, setFilter] = useState("");
  const [day, setDay] = useState({ from: "", to: "", setting: false });
  const lowercasedFilter = filter.toLowerCase();
  const filteredData = tasks.filter((item) => {
    if (state === "Nhóm công việc") {
      return item.nhom.toLowerCase().includes(lowercasedFilter);
    } else if (state === "Người thực hiện") {
      return item.nguoithuchien.toLowerCase().includes(lowercasedFilter);
    } else if (state === "Người phân công") {
      return item.nguoiphancong.toLowerCase().includes(lowercasedFilter);
    } else {
      if (!day.from || !day.to) return true;
      else
        return (
          item.ngayphancong.slice(0, 10) >= day.from &&
          item.ngayhethan.slice(0, 10) <= day.to
        );
    }
  });

  const classes = useStyles();

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // change filter type
  const handleStateChange = (e) => {
    if (e.target.value === "Thời gian") {
      setDay({ ...day, setting: true });
    } else setDay({ ...day, setting: false });

    setState(e.target.value);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDaySearch = (e) => {
    setDay({ ...day, [e.target.name]: e.target.value });
    console.log(day);
  };

  useEffect(() => {
    let url1 = "http://localhost:5000/teacher";
    let url2 = "http://localhost:5000/taskgroups";

    const req1 = axios.get(url1);
    const req2 = axios.get(url2);

    axios
      .all([req1, req2])
      .then(
        axios.spread((...responses) => {
          const res1 = responses[0];
          const res2 = responses[1];
          setSelect({ users: res1.data, groups: res2.data });
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, []);

  return !tasks.length && !select.groups && !select.users ? (
    <div className="d-flex justify-content-center">
      <CircularProgress />
    </div>
  ) : (
    <Card>
      <CardContent>
        {day.setting ? (
          <span>
            <TextField
              type="date"
              label="Từ ngày"
              variant="outlined"
              name="from"
              value={day.from}
              onChange={handleDaySearch}
            />
            <TextField
              type="date"
              label="Đến ngày"
              variant="outlined"
              name="to"
              value={day.to}
              onChange={handleDaySearch}
            />
          </span>
        ) : (
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            value={filter}
            onChange={handleChange}
          />
        )}
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Lọc theo
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Lọc theo"
            value={state}
            onChange={handleStateChange}
          >
            {!disabled && (
              <MenuItem value="Người thực hiện">Người thực hiện</MenuItem>
            )}
            <MenuItem value="Người phân công">Người phân công</MenuItem>
            <MenuItem value="Nhóm công việc">Nhóm công việc</MenuItem>
            <MenuItem value="Thời gian">Thời gian</MenuItem>
          </Select>
        </FormControl>
        {!disabled && user.vaitro === 1 && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setAdd(true)}
          >
            Thêm
          </Button>
        )}
        <Download tasks={filteredData} />
      </CardContent>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="collapsible table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell />
                <TableCell>Công việc</TableCell>
                <TableCell align="right">Người phân công</TableCell>
                {!disabled && (
                  <TableCell align="right">Người thực hiện</TableCell>
                )}
                <TableCell align="right">Ngày bắt đầu</TableCell>
                <TableCell align="right">Ngày hết hạn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {add && (
                <AddRow
                  setAdd={setAdd}
                  groups={select.groups}
                  users={select.users}
                />
              )}
              {(rowsPerPage > 0
                ? filteredData
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredData.reverse()
              ).map((task) => (
                <Row
                  key={task._id}
                  row={task}
                  disabled={disabled}
                  user={user}
                  users={select.users}
                  groups={select.groups}
                />
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
