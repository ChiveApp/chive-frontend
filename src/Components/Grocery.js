import React from "react";
import { Button } from "reactstrap";
import { ADD_GROCERY, REMOVE_GROCERY } from "../graphql/mutations";
import { Mutation } from "react-apollo";

const Grocery = props => {
  const { userContext, recipeId } = props;

  if (userContext.groceryList.indexOf(recipeId) !== -1) {
    return (
      <Mutation
        mutation={REMOVE_GROCERY}
        onCompleted={({ removeGrocery: newUser }) => {
          console.log(newUser);

          props.userContext.updateUser(newUser);
        }}
      >
        {removeGrocery => (
          <div>
            <Button
              outline
              color="dark"
              onClick={() => {
                removeGrocery({ variables: { recipeId: recipeId } });
              }}
            >
              Remove from Grocery List
            </Button>
          </div>
        )}
      </Mutation>
    );
  } else {
    return (
      <Mutation
        mutation={ADD_GROCERY}
        onCompleted={({ addGrocery: newUser }) => {
          console.log(newUser);

          props.userContext.updateUser(newUser);
        }}
      >
        {addGrocery => (
          <div>
            <Button
              outline
              color="dark"
              onClick={() => {
                addGrocery({ variables: { recipeId: recipeId } });
              }}
            >
              Add to Grocery List
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
};

export default Grocery;
