import React, { useState } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { createTaskGroup } from "../actions/taskGroups";

const AddGroup = ({ setAdd }) => {
  const [group, setGroup] = useState({
    manhom: "",
    tennhom: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (group.manhom && group.tennhom) {
      dispatch(createTaskGroup(group));
    } else {
      console.log("Error! Lack of data!");
    }
    setAdd(false);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Input
          type="text"
          name="manhom"
          onChange={(e) => setGroup({ ...group, manhom: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="text"
          name="tennhom"
          onChange={(e) => setGroup({ ...group, tennhom: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
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
  );
};

export default AddGroup;
