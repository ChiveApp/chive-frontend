import React from "react";
import { Query } from "react-apollo";
import { GET_FAVORITE_ITEM } from "./../graphql/queries";
import { recipesURL } from "../configuration/config";

/**
 * TODO:
 * - verify props
 * - clean up layout
 * - edit buttons
 * - make sure it's responsive
 */

export const FavoriteItem = ({ id }) => (
  <Query query={GET_FAVORITE_ITEM} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      console.log(data);
      const { recipeById } = data;
      return (
        <div
          className="d-flex flex-row align-items-center"
          style={{
            marginBottom: "20px"
          }}
        >
          <img
            src={recipesURL + recipeById.image}
            alt="Food"
            style={{
              minWidth: "150px",
              minHeight: "100px",
              maxWidth: "150px",
              maxHeight: "100px"
            }}
          />
          <div className="d-flex flex-column" style={{ marginLeft: "10px" }}>
            <h4
              style={{
                margin: "0px",
                padding: "0px"
              }}
            >
              {" "}
              {recipeById.name}
            </h4>

            <h5>Rating: {recipeById.rating * 100}%</h5>
          </div>
        </div>
      );
    }}
  </Query>
);
