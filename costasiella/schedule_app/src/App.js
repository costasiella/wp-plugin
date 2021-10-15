import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

import './App.css';

import ClassesSchedule from "./ClassesSchedule"


const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);

  // request size check
  if (graphQLErrors[0].message === "Request body exceeded settings.DATA_UPLOAD_MAX_MEMORY_SIZE.") {
    console.error('CHOSEN FILE EXCEEDS SIZE LIMIT')
  }
});


// Fetch CSRF Token 
let csrftoken;
async function getCsrfToken() {
    if (csrftoken) return csrftoken;
    csrftoken = await fetch('http://localhost:3000/d/csrf/')
        .then(response => response.json())
        .then(data => data.csrfToken)
    console.log("GOT TOKEN: " + csrftoken)

    return await csrftoken
}

//Set up link to Costasiella backend
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/d/graphql/',
  credentials: 'include', // We're in a different domain, so include, not same-origin
});


const csrfLink = setContext(async (_, { headers }) => {
  // get the csrfToken
  const csrfToken = await getCsrfToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-CSRFToken': csrfToken
    }
  }
});

// set up ApolloClient
const client = new ApolloClient({
  link: from([csrfLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})



function App() {
  return (
    <ApolloProvider client={client}>
      <ClassesSchedule />
    </ApolloProvider>
  );
}

export default App;
