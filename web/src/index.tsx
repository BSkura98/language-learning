import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Amplify } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import { AccountProvider } from './utils/users/Account';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18next';
import awsExports from './aws-exports';
import { isLocalhost } from './helpers/isLocalhost';

Amplify.configure(awsExports);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Arial',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HelmetProvider>
    <AccountProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <React.StrictMode>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <App />
          </React.StrictMode>
        </ThemeProvider>
        {isLocalhost() && <ReactQueryDevtools />}
      </QueryClientProvider>
    </AccountProvider>
  </HelmetProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
