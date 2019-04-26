import React from "react";
import { Button } from "reactstrap";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../graphql/mutations";
import { Mutation } from "react-apollo";

const Favorite = props => {
  const { userContext, recipeId } = props;

  if (userContext.favorites.indexOf(recipeId) !== -1) {
    return (
      <Mutation
        mutation={REMOVE_FAVORITE}
        onCompleted={({ removeFavorite: newUser }) => {
          props.userContext.updateUser(newUser);
        }}
      >
        {removeFavorite => (
          <div>
            <Button
              outline
              color="dark"
              onClick={() => {
                removeFavorite({ variables: { recipeId: recipeId } });
              }}
              style={{ marginRight: "1rem" }}
            >
              Remove from favorites
            </Button>
          </div>
        )}
      </Mutation>
    );
  } else {
    return (
      <Mutation
        mutation={ADD_FAVORITE}
        onCompleted={({ addFavorite: newUser }) => {
          console.log(newUser);

          props.userContext.updateUser(newUser);
        }}
      >
        {addFavorite => (
          <div>
            <Button
              outline
              color="dark"
              onClick={() => {
                addFavorite({ variables: { recipeId: recipeId } });
              }}
              style={{ marginRight: "1rem" }}
            >
              Add to favorites
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
};

export default Favorite;
