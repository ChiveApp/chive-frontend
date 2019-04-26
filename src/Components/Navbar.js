import React, { Component } from "react";
import {
  Collapse,
  Navbar as BootNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../graphql/mutations";

/**
 * TODO: make navbar dynamic on whether the user is signed in or not
 */

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    if (props.userContext.email !== "" && props.userContext.name !== "") {
      this.state.loggedIn = true;
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { loggedIn } = this.state;

    console.log("Navbar props: ", this.props);

    const loggedInCollapse = (
      <Mutation
        mutation={LOGOUT_MUTATION}
        onCompleted={data => {
          if (data.logout) {
            console.log("User should have lost cookie");
            this.props.history.push("/");
          }
        }}
      >
        {(logout, { loading, error }) => {
          if (loading) {
            console.log("logout loading...");
          }

          if (error) {
            console.log("logout error...");
          }

          return (
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {/* PROFILE */}
                  <NavLink tag={RouterNavLink} exact to="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* RECIPE SEARCH */}
                  <NavLink tag={RouterNavLink} exact to="/recipe">
                    Recipe Search
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* LOGOUT */}
                  <NavLink
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          );
        }}
      </Mutation>
    );

    const notLoggedInCollapse = (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/register">
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/signin">
              Signin
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    );

    return (
      <BootNavbar color="light" light expand="md">
        <NavbarBrand tag={RouterNavLink} exact to="/">
          chive
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        {loggedIn ? loggedInCollapse : notLoggedInCollapse}
      </BootNavbar>
    );
  }
}

export default Navbar;
