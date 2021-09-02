import React, { useState } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { updateTaskGroup, deleteTaskGroup } from "../actions/taskGroups";

const GroupRow = ({ taskGroup }) => {
  const [edit, setEdit] = useState(false);
  const [group, setGroup] = useState(taskGroup);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (edit) {
      dispatch(updateTaskGroup(group._id, group));
    }

    // console.log(group);
    setEdit(!edit);
  };

  // const handleDelete = async () => {
  //   console.log(group);
  //   await api.deleteTaskGroup(group._id);
  //   window.location.reload();
  // };

  return (
    <TableRow key={taskGroup.manhom}>
      <TableCell component="th" scope="row">
        {edit ? (
          <Input
            type="text"
            value={group.manhom}
            onChange={(e) => setGroup({ ...group, manhom: e.target.value })}
          />
        ) : (
          group.manhom
        )}
      </TableCell>
      <TableCell align="right">
        {edit ? (
          <Input
            type="text"
            value={group.tennhom}
            onChange={(e) => setGroup({ ...group, tennhom: e.target.value })}
          />
        ) : (
          group.tennhom
        )}
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {edit ? "Xong" : "Sửa"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 5 }}
          onClick={() => dispatch(deleteTaskGroup(taskGroup._id))}
        >
          Xóa
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default GroupRow;
