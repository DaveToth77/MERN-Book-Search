import React, { useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

// Imports useMutation and useQuery from @apollo-client so that the imported REMOVE_BOOK mutation and the GET_ME query can be called
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const SavedBooks = () => {
  // Brings in the GET_ME userQuery hook with the data, the loading boolean, the refetch ability, and an error code if needed
  const { loading, error, data, refetch } = useQuery(GET_ME);

  // useEffect hook to refetch the user's saved book data every time the data changes
  useEffect(() => {
    refetch();
  }, [refetch, data]);

  // Sets the userData variable to the data retrieved from the GET_ME query
  const userData = data?.me;

  if (error) {
    console.log(error.message);
  }

  // Applies the REMOVE_BOOK mutation to the function removeBook to be called
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Calls the removeBook function to use the REMOVE_BOOK mutation on the book with the corresponding bookId
      await removeBook({ variables: { bookId } });

      // Upon success, remove book's id from localStorage
      removeBookId(bookId);

      // Forces a refetch of the GET_ME query so that the the updated userData and component is displayed without reloading of the page
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
