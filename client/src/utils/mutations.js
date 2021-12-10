import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`

  mutation saveBook($title: String!, $author: String!, $description: String!, $image: String!, $link: String!) {
    saveBook(title: $title, author: $author, description: $description, image: $image, link: $link) {
      _id
      title
      author
      description
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`

  mutation removeBook($_id: String!) {
    removeBook(_id: $_id) {
      _id
      title
      author
      description
      image
      link
    }
  }
`;

