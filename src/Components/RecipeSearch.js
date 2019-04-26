import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  CardColumns
} from "reactstrap";
import MarginPageNav from "./Layout/MarginPageNav";
import { ApolloConsumer } from "react-apollo";
import {
  RECIPE_BY_NAME_QUERY,
  RECIPE_BY_INGREDIENTS_QUERY
} from "../graphql/queries";
import RecipeCard from "./RecipeCard";

export class RecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      byName: true,
      recipeName: "",
      recipeIngredients: [],
      tempIngredient: "",
      submitted: false,
      recipes: []
    };
  }

  handleChange = e => {
    if (this.state.byName) {
      this.setState({ recipeName: e.target.value });
    } else {
      this.setState({ tempIngredient: e.target.value });
    }
  };

  handleEnter = e => {
    if (e.key === "Enter")
      if (this.state.byName) {
        this.setState({ recipeName: e.target.value });
        this.handleSearch();
      } else {
        if (e.target.value)
          this.setState({
            recipeIngredients: [...this.state.recipeIngredients, e.target.value]
          });
        e.target.value = "";
      }
  };

  removeBadge = e => {
    const { innerText } = e.target;

    var recipeIngredients = this.state.recipeIngredients;

    var index = recipeIngredients.indexOf(innerText);
    if (index !== -1) {
      recipeIngredients.splice(index, 1);
    }

    this.setState({
      recipeIngredients: recipeIngredients
    });
  };

  handleSearch = () => {
    if (
      this.state.recipeName !== "" ||
      this.state.recipeIngredients.length !== 0
    ) {
      this.setState({ submitted: true });
    }
  };

  render() {
    const pills = this.state.recipeIngredients.map((ingredient, index) => (
      <Button
        outline
        onClick={this.removeBadge}
        color="success"
        size="sm"
        key={index}
        style={{ marginBottom: "3px" }}
      >
        {ingredient}
      </Button>
    ));

    return (
      <MarginPageNav {...this.props}>
        <InputGroup style={{ marginBottom: "10px" }}>
          <InputGroupAddon addonType="prepend">
            <Button
              onClick={() => {
                this.setState({ byName: !this.state.byName });
              }}
            >
              {this.state.byName ? "Name" : "Ingredient"}
            </Button>
          </InputGroupAddon>
          <Input
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
            className={"rounded-right"}
          />
        </InputGroup>
        {pills.length && !this.state.byName ? (
          <div
            className="d-flex flex-wrap justify-content-around"
            style={{ marginBottom: "10px" }}
          >
            {pills}
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center">
          <ApolloConsumer>
            {client => (
              <Button
                onClick={async () => {
                  const { data } = await client.query({
                    query: this.state.byName
                      ? RECIPE_BY_NAME_QUERY
                      : RECIPE_BY_INGREDIENTS_QUERY,
                    variables: this.state.byName
                      ? { name: this.state.recipeName }
                      : { ingredients: this.state.recipeIngredients }
                  });

                  var recipes = undefined;

                  if (this.state.byName) {
                    recipes = data.recipeByName;
                  } else {
                    recipes = data.recipeByIngredients;
                  }

                  this.setState({ recipes: recipes });
                }}
                outline
                style={{ marginBottom: "1.5rem", width: "50%" }}
              >
                Search!
              </Button>
            )}
          </ApolloConsumer>
        </div>
        <CardColumns>
          {this.state.recipes.map((recipe, index) => {
            return <RecipeCard {...recipe} key={index} />;
          })}
        </CardColumns>
      </MarginPageNav>
    );
  }
}

export default RecipeSearch;
