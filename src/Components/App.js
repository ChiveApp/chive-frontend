import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../styles/App.css";

import Landing from "./slides/Landing";
import Signin from "./Signin";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

export default App;
