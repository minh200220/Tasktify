import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import TablePaginationActions from "./TablePagination";
import AddGroup from "./AddGroup";
import GroupRow from "./GroupRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

export default function BasicTable() {
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const taskGroups = useSelector((state) => state.taskGroups);
  const classes = useStyles();

  // search filler
  const [state, setState] = useState("Mã nhóm");
  const [filter, setFilter] = useState("");
  const lowercasedFilter = filter.toLowerCase();
  const filteredData = taskGroups.filter((item) => {
    if (state === "Tên nhóm") {
      return item.tennhom.toLowerCase().includes(lowercasedFilter);
    } else {
      return item.manhom.toLowerCase().includes(lowercasedFilter);
    }
  });

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
    setState(e.target.value);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return !taskGroups.length ? (
    <div className="d-flex justify-content-center">
      <CircularProgress />
    </div>
  ) : (
    <Card>
      <CardContent>
        <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          value={filter}
          onChange={handleChange}
        />
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
            <MenuItem value="Mã nhóm">Mã nhóm</MenuItem>
            <MenuItem value="Tên nhóm">Tên nhóm</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setAdd(true)}
        >
          Thêm
        </Button>
      </CardContent>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã nhóm</TableCell>
                <TableCell align="right">Tên nhóm</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {add && <AddGroup setAdd={setAdd} />}
              {(rowsPerPage > 0
                ? filteredData
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredData.reverse()
              ).map((taskGroup) => (
                <GroupRow taskGroup={taskGroup} key={taskGroup.manhom} />
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
