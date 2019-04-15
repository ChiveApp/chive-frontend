import React, { Component, Fragment } from "react";

import FavoriteItem from "./FavoriteItem";

export default class FavoriteItemsList extends Component {
  render() {
    var favorites = [
      {
        name: "Chicken Stir Fry",
        rating: "4.5",
        time: "30 mins",
        image: "images/favrecppic.jpg"
      },
      {
        name: "Chicken Lo Mein",
        rating: "4.5",
        time: "30 mins",
        image: "images/favrecppic.jpg"
      },
      {
        name: "Vegans r kewl",
        rating: "4.5",
        time: "30 mins",
        image: "images/favrecppic.jpg"
      },
      {
        name: "but plants feel pain",
        rating: "4.5",
        time: "30 mins",
        image: "images/favrecppic.jpg"
      }
    ];
    var favoritesComponents = favorites.map(item => (
      <FavoriteItem
        name={item.name}
        rating={item.rating}
        time={item.time}
        image={item.image}
        key={favorites.indexOf(item)}
      />
    ));
    return favoritesComponents;
  }
}
