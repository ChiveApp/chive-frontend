import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// import { withMutationState } from "../hocs/Mutation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLock } from "@fortawesome/free-solid-svg-icons";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`;

/**
 * TODO:
 * - write email, password checking for before submitting mutation
 */

class Signin extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      email: "",
      password: "",
      buttonDisabled: false,
      buttonText: this.props.loginLoading ? "Signing in..." : "Sign in!",
      errorComponent: undefined
    };

    // We can attach our own functions by binding them to the class
    this.handleTextChange = this.handleTextChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * Update the state[name] field everytime the associated input changes
   * @param {} event
   */
  handleTextChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  validateForm(event, login) {
    event.preventDefault();

    /**
     * TODO: validate form
     */

    login({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  render() {
    return (
      <div
        className="d-flex flex-column"
        style={{
          height: "100vh"
        }}
      >
        <Navbar />
        <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
          {/* You can attach a function to the class and use it as a function for an element */}
          <Form style={{ minWidth: "20%" }}>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="images/chivelogo.svg"
                alt="chive logo"
                style={{ width: "50%" }}
              />
            </div>
            <br />
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="foodie67@chive.com"
                onChange={this.handleTextChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="secretPassword5!"
                onChange={this.handleTextChange}
              />
            </FormGroup>
            <Mutation
              mutation={LOGIN_MUTATION}
              onCompleted={({ login }) => {
                this.props.userContext.updateUser({
                  email: login.email,
                  name: login.name
                });
                this.props.history.push("/profile");
              }}
            >
              {(login, { loading, error }) => {
                let buttonText = undefined;

                if (loading) {
                  buttonText = (
                    <Fragment>
                      <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
                    </Fragment>
                  );
                } else {
                  buttonText = "Sign in!";
                }

                if (error) {
                  buttonText = (
                    <Fragment>
                      <FontAwesomeIcon icon={faLock} /> Try again
                    </Fragment>
                  );
                }

                return (
                  <Fragment>
                    <Button
                      onClick={event => this.validateForm(event, login)}
                      style={{ width: "100%" }}
                      disabled={loading}
                    >
                      {buttonText}
                    </Button>
                  </Fragment>
                );
              }}
            </Mutation>
          </Form>
          <Link to="/register" style={{ marginTop: ".4rem" }}>
            Need an account?
          </Link>
        </div>
      </div>
    );
  }
}

export default Signin;
