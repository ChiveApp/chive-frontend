import React, { Component, createContext } from "react";

export const UserContext = createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.defaultContext = {
      email: "",
      name: "",
      profilePicture: "",
      inventory: [],
      favorites: [],
      groceryList: [],
      updateUser: this.updateUser,
      clearUser: this.clearUser
    };

    this.updateUser = this.updateUser.bind(this);

    this.state = this.defaultContext;

    if (props.user && props.user.__typename === "User") {
      this.state = {
        ...this.state,
        ...props.user
      };
    }
  }

  updateUser = updatedUser => {
    this.setState(updatedUser);
  };

  clearUser = () => {
    this.setState(this.defaultContext);
  };

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider value={this.state}>{children}</UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
