import React from "react";
import { Container, Row, Col } from "reactstrap";
import Profile from "../components/Profile";

const CaNhan = () => {
  return (
    <Container>
      <Row className="p-5  justify-content-md-center">
        <Col sm={9}>
          <Profile />
        </Col>
      </Row>
    </Container>
  );
};

export default CaNhan;
