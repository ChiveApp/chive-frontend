import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

const LOGGED_IN_QUERY = gql`
  query {
    loggedIn {
      email
      name
      inventory {
        name
      }
    }
  }
`;

const LoadingScreen = () => {
  return <p>Loading...</p>;
};

const ErrorScreen = () => {
  return <p>Oopsie woopsie...</p>;
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
