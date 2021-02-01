import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
