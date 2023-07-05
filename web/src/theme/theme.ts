import { createTheme } from '@mui/material';

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

export { theme };
