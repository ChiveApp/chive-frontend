import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "../styles/App.css";

import Landing from "./slides/Landing";
import Signin from "./Signin";
import Register from "./Register";
import Profile from "./Profile";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signin" component={Signin} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
