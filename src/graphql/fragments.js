import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment profile on User {
    email
    name
    profilePicture
    favorites
    groceryList
    inventory {
      name
      quantity
      unit
    }
  }
`;

export const RECIPE_FRAGMENT = gql`
  fragment details on Recipe {
    _id
    name
    directions
    rating
    source
    siteName
    image
    ingredients {
      groupName
      ingredients {
        name
        quantity
        unit
      }
    }
  }
`;
