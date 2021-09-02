import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Auth from "./view/Auth";
import User1 from "./view/User1";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/user1" component={User1} />
          <Redirect from="/" to="auth" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
