import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLock } from "@fortawesome/free-solid-svg-icons";
import { UserConsumer } from "../Contexts/UserContext";

/**
 * TODO:
 * - write email, password checking for before submitting mutation
 */

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      buttonDisabled: false,
      buttonText: "Sign in!",
      errorComponent: undefined,
      userContext: undefined
    };

    // We can attach our own functions by binding them to the class
    this.handleTextChange = this.handleTextChange.bind(this);
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

  submitCredentials = async event => {
    event.preventDefault();

    const { data } = await this.props.mutate({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });

    if (data) {
      console.log(data);
      this.state.userContext.updateUser({
        email: data.login.email,
        name: data.login.name
      });
    }
  };

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
            <UserConsumer>
              {userContext => {
                /**
                 * TODO: handle error for invalid credentials
                 */

                console.log(userContext);

                this.state.userContext = userContext;

                // if (loading) {
                //   buttonText = (
                //     <Fragment>
                //       <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
                //     </Fragment>
                //   );
                // } else {
                //   buttonText = "Sign in!";
                // }

                // if (error) {
                //   buttonText = (
                //     <Fragment>
                //       <FontAwesomeIcon icon={faLock} /> Try again
                //     </Fragment>
                //   );
                //   errorMessage = (
                //     <div
                //       className="d-flex flex-column flex-fill justify-content-center align-items-center"
                //       style={{ marginTop: ".6rem" }}
                //     >
                //       {error.graphQLErrors[0].message}
                //     </div>
                //   );
                // }

                // if (data) {
                //   console.log(data);
                //   let { login } = data;
                //   userContext.updateUser({
                //     email: login.email,
                //     name: login.name
                //   });
                // }

                return (
                  <Fragment>
                    <Button
                      onClick={this.submitCredentials}
                      style={{ width: "100%" }}
                      disabled={this.state.buttonDisabled}
                    >
                      {this.state.buttonText}
                    </Button>
                    {this.state.errorComponent}
                  </Fragment>
                );
              }}
            </UserConsumer>
          </Form>
          <Link to="/register" style={{ marginTop: ".4rem" }}>
            Need an account?
          </Link>
        </div>
      </div>
    );
  }
}

export default graphql(gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`)(Signin);
