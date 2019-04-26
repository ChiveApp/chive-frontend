import React, { Fragment } from "react";
import "../styles/Profile.css";
import MarginPageNav from "./Layout/MarginPageNav";
import { Query } from "react-apollo";
import { RECIPE_BY_ID } from "../graphql/queries";
import { recipesURL } from "../configuration/config";
import E404 from "./InfoPages/E404";
import { Button } from "reactstrap";
import Favorite from "./Favorite";
import Grocery from "./Grocery";

// export class Recipe extends Component {
//   render() {
//     var ingredients = ["bunch of carrots", "some sugar", "too much frosting"];

//     ingredients = ingredients.map((ingredient, index) => (
//       <li key={index}>{ingredient}</li>
//     ));

//     var directions = [
//       "Blend carrots and sugar",
//       "Bake the blend",
//       "Dump on frosting"
//     ];
//     directions = directions.map((direction, index) => (
//       <li key={index}>{direction}</li>
//     ));
//     var rating = "10 outta 10";
//     var name = "Chef lady";
//     var description =
//       "Wow chef lady look happy, she put parsely on ribs(?) Amaze, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) AmazeWow chef lady look happy, she put parsely on ribs(?) Amaze";

const Recipe = props => {
  if (!props.match.params.id) {
    return <E404 />;
  }

  return (
    <MarginPageNav {...props}>
      <Query query={RECIPE_BY_ID} variables={{ id: props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p />;
          }

          if (error) {
            window.location.replace("/recipe_not_found");
          }

          const { recipeById } = data;

          var groupNames = recipeById.ingredients.map(
            (ingredientGroup, index) => {
              return (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <h4>{ingredientGroup.groupName}</h4>
                  <hr />
                  <ul>
                    {ingredientGroup.ingredients.map((ingredient, index) => {
                      return (
                        <li key={index}>{`${ingredient.quantity} ${
                          ingredient.unit
                        } ${ingredient.name}`}</li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          );

          return (
            <Fragment>
              <img
                src={
                  recipeById.image
                    ? `${recipesURL}${recipeById.image}`
                    : `${recipesURL}default.png`
                }
                alt={recipeById.name}
                className="border border-dark rounded-square align-self-center"
                style={{ width: "100%", maxWidth: "640px" }}
              />
              <br />
              <h3
                style={{
                  margin: "0px",
                  padding: "0px"
                }}
                className="align-self-center"
              >
                {recipeById.name}
              </h3>
              <p className="align-self-center">
                Rating: {recipeById.rating * 100}%
              </p>
              <div className="d-flex flex-row">
                <Favorite {...props} recipeId={recipeById._id} />
                <Grocery {...props} recipeId={recipeById._id} />
              </div>
              {recipeById.description && (
                <div
                  className="container"
                  style={{
                    maxWidth: "750px"
                  }}
                >
                  <p className="align-self-center">{recipeById.description}</p>
                </div>
              )}
              <hr />
              <ol className="container mb-0">{groupNames}</ol>
              <hr />
              <h4
                align="left"
                style={{
                  marginBottom: "0px"
                }}
              >
                Directions
              </h4>
              <hr />
              <ol className="container">
                {recipeById.directions.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ol>
              <div>
                <Button
                  outline
                  color="dark"
                  onClick={() => {
                    window.location.replace(recipeById.source);
                  }}
                  style={{ marginBottom: "1.5rem" }}
                >
                  See it on {recipeById.siteName}
                </Button>
              </div>
            </Fragment>
          );
        }}
      </Query>
    </MarginPageNav>
  );
};

export default Recipe;
