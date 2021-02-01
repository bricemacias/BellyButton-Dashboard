import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.REACT_APP_API_URL;
const API_GUEST_KEY = process.env.REACT_APP_API_KEY;
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: API_URL,
  cache: cache,
  headers: {
    authorization: `Bearer ${API_GUEST_KEY}`,
  },
});

test('renders learn react link', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
