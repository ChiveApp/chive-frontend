import React, { Component, createContext } from "react";

export const UserContext = createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: ""
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(newUser) {
    this.setState({
      email: newUser.email,
      name: newUser.name
    });
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          email: this.state.email,
          name: this.state.name,
          updateUser: this.updateUser
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
