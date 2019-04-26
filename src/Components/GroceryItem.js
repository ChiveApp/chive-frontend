import React from "react";
import { GET_GROCERY_ITEMS } from "./../graphql/queries";
import { Query } from "react-apollo";

/**
 * TODO:
 * - verify props
 * - clean up layout
 * - make a nicer check off overlay
 * - make sure it's responsive
 */

// Each grocery item is a recipe
// we want to list the ingredients by ingredient groups and then list
// those in that respective group

export const GroceryItem = ({ id }) => (
  <Query query={GET_GROCERY_ITEMS} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const { recipeById } = data;

      // need to map for each group name too
      var groupNames = recipeById.ingredients.map((ingredientGroup, index) => {
        return (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <h4>{ingredientGroup.groupName}</h4>
            {ingredientGroup.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>{`${ingredient.quantity} ${ingredient.unit} ${
                  ingredient.name
                }`}</li>
              );
            })}
          </div>
        );
      });
      return (
        <div>
          <h2>{recipeById.name}</h2>
          {groupNames}
        </div>
      );
    }}
  </Query>
);
