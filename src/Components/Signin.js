import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import Navbar from "./Navbar";
import gql from "graphql-tag";

/**
 * TODO:
 * - write error supporting for invalid credentials
 * - write email, password checking for before submitting mutation
 */

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`;

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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

  render() {
    return (
      <Fragment>
        <div
          className="d-flex flex-column"
          style={{
            height: "100vh"
          }}
        >
          <Navbar />
          <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
            {/* You can attach a function to the class and use it as a function for an element */}
            <Form onSubmit={this.handleSubmit} style={{ minWidth: "20%" }}>
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
              <Mutation mutation={LOGIN}>
                {(login, { loading, error, data }) => (
                  <Fragment>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        login({
                          variables: {
                            email: this.state.email,
                            password: this.state.password
                          }
                        });
                      }}
                      style={{ width: "100%" }}
                      disabled={loading || error}
                    >
                      {loading ? "spinning icon Signing in..." : "Sign in!"}
                    </Button>
                    {data && <Redirect to="/profile" />}
                    {error && console.log(error)}
                  </Fragment>
                )}
              </Mutation>
            </Form>
            <Link to="/register">
              <br />
              Need an account?
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Signin;
