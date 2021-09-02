import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import GroupTable from "../components/GroupTable";
import { useDispatch } from "react-redux";

import { getTaskGroups } from "../actions/taskGroups";

export default function PhanCong() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskGroups());
  }, [dispatch]);

  return (
    <Container>
      <Row className="py-4 justify-content-md-center">
        <Col>
          <GroupTable />
        </Col>
      </Row>
    </Container>
  );
}
