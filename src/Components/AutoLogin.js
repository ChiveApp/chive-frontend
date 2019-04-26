import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import { LOGGED_IN_QUERY } from "../graphql/queries";

import E503 from "./InfoPages/E503";

const LoadingScreen = () => {
  return <p />;
};

const ErrorScreen = () => {
  return <E503 />;
};

class AutoLoginComponent extends Component {
  render() {
    if (this.props.data.loading) {
      return LoadingScreen();
    }

    if (this.props.data.error) {
      return ErrorScreen();
    }

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { user: this.props.data.loggedIn })
    );

    return childrenWithProps;
  }
}

export const AutoLogin = compose(graphql(LOGGED_IN_QUERY))(AutoLoginComponent);
