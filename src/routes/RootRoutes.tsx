import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../logic/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from '../styles/GlobalStyles';

import { ApolloProvider } from '@apollo/client';

import VerifyTokenRoute from './VerifyTokenRoute';
import LoginApp from '../auth/Login';

import ClientCreator from '../components/utils/ClientCreator';
import ScrollToTop from '../components/ScrollToTop';

const RootRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const guestToken: string = process.env.REACT_APP_API_KEY
    ? process.env.REACT_APP_API_KEY
    : '';
  const guestClient = ClientCreator({ token: guestToken });
  const [localClient, setLocalClient] = useState(
    token && token !== '' ? ClientCreator({ token: token }) : null
  );

  useEffect(() => {
    token && token !== ''
      ? setLocalClient(ClientCreator({ token: token }))
      : setLocalClient(null);
  }, [token]);

  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop>
        <Switch>
          {localClient && token && token !== '' ? (
            <Route
              exact
              render={() => (
                <ApolloProvider client={localClient}>
                  <VerifyTokenRoute />
                </ApolloProvider>
              )}
            ></Route>
          ) : (
            <Route
              exact
              render={() => (
                <ApolloProvider client={guestClient}>
                  {' '}
                  <LoginApp />{' '}
                </ApolloProvider>
              )}
            ></Route>
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default RootRoutes;
