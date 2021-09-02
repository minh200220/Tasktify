import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const MyNav = (props) => {
  let { match } = props;
  const [isOpen, setIsOpen] = useState(false); // nav
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const toggleFunc = () => setDropdownOpen((prevState) => !prevState);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history.push("/auth");
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Tasktyfi</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href={`${match.url}/thongke/`}>Thống kê</NavLink>
          </NavItem>
          {user?.result.vaitro === 1 && (
            <NavItem>
              <NavLink href={`${match.url}/nhomviec/`}>Nhóm việc</NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink href={`${match.url}/congviec/`}>Công việc</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`${match.url}/canhan/`}>Cá nhân</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
          <Dropdown isOpen={dropdownOpen} toggle={toggleFunc}>
            <DropdownToggle caret>{user?.result.ten}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>Đăng xuất</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default MyNav;
