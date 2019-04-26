import gql from "graphql-tag";
import { USER_FRAGMENT } from "./fragments";

export const CREATE_USER = gql`
  ${USER_FRAGMENT}

  mutation createUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      ...profile
    }
  }
`;

export const LOGIN_MUTATION = gql`
  ${USER_FRAGMENT}

  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...profile
    }
  }
`;

export const ADD_FAVORITE = gql`
  ${USER_FRAGMENT}

  mutation addFavorite($recipeId: ID!) {
    addFavorite(recipeId: $recipeId) {
      ...profile
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  ${USER_FRAGMENT}

  mutation removeFavorite($recipeId: ID!) {
    removeFavorite(recipeId: $recipeId) {
      ...profile
    }
  }
`;

export const ADD_GROCERY = gql`
  ${USER_FRAGMENT}

  mutation addGrocery($recipeId: ID!) {
    addGrocery(recipeId: $recipeId) {
      ...profile
    }
  }
`;

export const REMOVE_GROCERY = gql`
  ${USER_FRAGMENT}

  mutation removeGrocery($recipeId: ID!) {
    removeGrocery(recipeId: $recipeId) {
      ...profile
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;
