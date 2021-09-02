import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

import ThongKe from "./ThongKe";
import CaNhan from "./CaNhan";
import CongViec from "./CongViec";
import NhomViec from "./NhomViec";
import Nav from "../components/Nav";

const User1 = (props) => {
  let match = useRouteMatch();

  return (
    <BrowserRouter>
      <Nav match={match} />
      <Switch>
        <Route path={`${match.path}/thongke`} component={ThongKe} />
        <Route path={`${match.path}/nhomviec`} component={NhomViec} />
        <Route path={`${match.path}/congviec`} component={CongViec} />
        <Route path={`${match.path}/canhan`} component={CaNhan} />
        <Redirect from={`${match.path}`} to={`${match.path}/thongke`} />
      </Switch>
    </BrowserRouter>
  );
};

export default User1;
