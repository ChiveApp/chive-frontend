import React from "react";

import GroceryItem from "./GroceryItem";

/**
 * TODO:
 * - refactor to do a query of the users' grocerylist items
 * - pictures???
 */

const GroceryItemsList = props => {
  var groceryComponents = props.userContext.groceryList.map(item => (
    <GroceryItem {...props} id={item} key={item} />
  ));

  if (groceryComponents.length === 0) {
    return (
      <h2 style={{ marginTop: "1.5rem" }}>
        Nothing's here! Add a recipe to grow your list.
      </h2>
    );
  }
  return groceryComponents;
};

export default GroceryItemsList;
