import React from "react";
// Imports Apollo dependenceies and context for JWT use
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// Enables the use of the graphql playground for use in texting queries and mutations
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Creates a middleware that attaches a JWT token as an `authorization` header to every authorized request to the server
const authLink = setContext((_, { headers }) => {
  // retrieves the token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Returns the headers to the context so that httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Sets our client to run the authLink middleware before it makes the request to the GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
