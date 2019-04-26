import gql from "graphql-tag";
import { USER_FRAGMENT } from "./fragments";

export const LOGGED_IN_QUERY = gql`
  ${USER_FRAGMENT}

  query {
    loggedIn {
      ...profile
    }
  }
`;

export const GET_FAVORITE_ITEM = gql`
  query recipeById($id: ID!) {
    recipeById(id: $id) {
      _id
      name
      rating
      image
    }
  }
`;

export const GET_GROCERY_ITEMS = gql`
  query recipeById($id: ID!) {
    recipeById(id: $id) {
      _id
      name
      ingredients {
        groupName
        ingredients {
          name
          quantity
          unit
        }
      }
    }
  }
`;

export const RECIPE_BY_NAME_QUERY = gql`
  query recipeByName($name: String!) {
    recipeByName(name: $name) {
      name
      rating
      image
      description
    }
  }
`;

export const RECIPE_BY_INGREDIENTS_QUERY = gql`
  query recipeByIngredients($ingredients: [String!]!) {
    recipeByIngredients(ingredients: $ingredients) {
      name
      rating
      image
      description
    }
  }
`;
