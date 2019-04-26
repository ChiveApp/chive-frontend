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

  return favoritesComponents;
};

export default FavoriteItemsList;
