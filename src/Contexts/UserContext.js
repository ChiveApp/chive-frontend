import React, { Component, createContext } from "react";

export const UserContext = createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.updateUser = this.updateUser.bind(this);

    this.state = {
      email: "",
      name: "",
      profilePicture: "",
      inventory: [],
      favorites: [],
      groceryList: [],
      updateUser: this.updateUser
    };

    if (props.user && props.user.__typename === "User") {
      this.state = {
        ...this.state,
        ...props.user
      };
    }
  }

  updateUser(updatedUser) {
    this.setState({ ...updatedUser });
  }

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider value={this.state}>{children}</UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
