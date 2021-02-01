import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const GET_USERS = gql`
  query Users {
    allUsers(role: MEMBER) {
      data {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
    console.log(data);
  }, [data, loading, error]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
