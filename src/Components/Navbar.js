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

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <BootNavbar color="light" light expand="md">
        <NavbarBrand tag={RouterNavLink} exact to="/">
          chive
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
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
      </BootNavbar>
    );
  }
}

export default Navbar;
