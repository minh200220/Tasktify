import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../components/Table";
import { useDispatch } from "react-redux";

import { getTasks } from "../actions/tasks";

export default function ThongKe() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Container>
      <Row className="py-4">
        <Col sm={12}>
          <Table />
        </Col>
      </Row>
    </Container>
  );
}
