import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../components/Table";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getTasks } from "../actions/tasks";

export default function CongViec() {
  let match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const disabled = match.path === "/user1/congviec" ? true : false;
  return (
    <Container>
      <Row className="py-4">
        <Col>
          <Table disabled={disabled} />
        </Col>
      </Row>
    </Container>
  );
}
