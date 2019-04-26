import React from "react";

import { FavoriteItem } from "./FavoriteItem";

/**
 * TODO:
 * - refactor to do a query for the users' favorite recipes
 * - pictures???
 */

const FavoriteItemsList = props => {
  var favoritesComponents = props.userContext.favorites.map(item => (
    <FavoriteItem {...props} id={item} key={item} />
  ));

  if (favoritesComponents.length === 0) {
    return (
      <h2 style={{ marginTop: "1.5rem" }}>
        Nothing's Here! Check out our Recipe Search to find some faves.
      </h2>
    );
  }

  return favoritesComponents;
};

export default FavoriteItemsList;
