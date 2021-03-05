import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RootRoutes from './routes/RootRoutes';
import reportWebVitals from './reportWebVitals';

import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';

import { ToastProvider } from 'react-toast-notifications';

import store from './logic/store';

ReactDOM.render(
  <ToastProvider>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RootRoutes />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
