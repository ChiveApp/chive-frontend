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
