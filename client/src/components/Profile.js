import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Card,
} from "reactstrap";

import * as api from "../api/index.js";

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const token = JSON.parse(localStorage.getItem("profile")).token;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const vaitro = (e) => {
    if (
      e.target.value === "Trưởng bộ môn" ||
      e.target.value === "Phó trưởng bộ môn"
    )
      setUser({ ...user, chucvu: e.target.value, vaitro: 1 });
    else setUser({ ...user, chucvu: e.target.value, vaitro: 0 });
  };

  const update = async (id, teacher) => {
    try {
      const { data } = await api.updateTeacher(id, teacher);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    update(user._id, user);
    localStorage.setItem("profile", JSON.stringify({ result: user, token }));

    window.location.reload();
    // console.log(user);
  };

  return (
    <Card className="p-3">
      <h1>Hồ sơ cá nhân</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label for="ten">Tên</Label>
              <Input
                type="text"
                name="ten"
                id="ten"
                value={user.ten}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label for="mscb">Mã số cán bộ</Label>
              <Input
                type="text"
                name="mscb"
                id="mscb"
                value={user.mscb}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label for="hocvi">Học vị</Label>
              <Input
                type="text"
                name="hocvi"
                id="hocvi"
                value={user.hocvi}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label for="chucvu">Chức vụ</Label>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                onChange={vaitro}
              >
                <option value="" selected></option>
                <option value="Trưởng bộ môn">Trưởng bộ môn</option>
                <option value="Phó trưởng bộ môn">Phó trưởng bộ môn</option>
                <option value="Trưởng khoa">Trưởng khoa</option>
                <option value="Phó trưởng khoa">Phó trưởng khoa</option>
                <option value="Giảng viên">Giảng viên</option>
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Hoàn thành</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Profile;
