import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import "../styles/App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { graphqlURL } from "../configuration/config";

import Landing from "./slides/Landing";
import Signin from "./Signin";
import Register from "./Register";
import Profile from "./Profile";
import GroceryList from "./GroceryList";
import RecipeSearch from "./RecipeSearch";
import Recipe from "./Recipe";
import E404 from "./InfoPages/E404";

import { UserProvider, UserConsumer } from "../Contexts/UserContext";
import { AutoLogin } from "./AutoLogin";

library.add(fas);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new createUploadLink({
      uri: graphqlURL,
      credentials: "include"
    })
  ]),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <AutoLogin>
              <UserProvider>
                <UserConsumer>
                  {userContext => {
                    /**
                     * provides the userContext to Components rendered with RouteWithUser by props
                     */

                    const RouteWithUser = ({
                      component: RouteComponent,
                      ...rest
                    }) => {
                      return (
                        <Route
                          {...rest}
                          render={props => {
                            return (
                              <RouteComponent
                                {...props}
                                userContext={userContext}
                              />
                            );
                          }}
                        />
                      );
                    };

                    return (
                      <Switch>
                        <RouteWithUser path="/signin" component={Signin} />
                        <RouteWithUser path="/register" component={Register} />
                        <RouteWithUser path="/profile" component={Profile} />
                        <RouteWithUser
                          path="/grocerylist"
                          component={GroceryList}
                        />
                        <RouteWithUser
                          path="/recipesearch"
                          component={RecipeSearch}
                        />
                        <RouteWithUser path="/recipe/:id" component={Recipe} />
                        <Route component={E404} />
                      </Switch>
                    );
                  }}
                </UserConsumer>
              </UserProvider>
            </AutoLogin>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
