import React, { Component } from "react";

import { FavoriteItem } from "./FavoriteItem";

/**
 * TODO:
 * - refactor to do a query for the users' favorite recipes
 * - pictures???
 */

export default class FavoriteItemsList extends Component {
  render() {
    var favorites = [
      {
        id: "5cc2565774b9eb5f4a29447e"
      }
    ];

    var favoritesComponents = favorites.map(item => (
      <FavoriteItem id={item.id} key={item.id} />
    ));
    return favoritesComponents;
  }
}
