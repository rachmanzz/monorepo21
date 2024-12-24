'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  palette: {
    primary: {
      light: '#FF7F50',
      main: '#dd6236',
      dark: '#8f1e00', 
    },
    secondary: {
      light: '#ffd299',
      main: '#8B4513',
    },
    text: {
      primary: '#000000',
      secondary: '#2c2c2c',
    },
    background: {
      default: '#F7EEDD', 
      paper: '#ede4d3',
    },
    mode: "light"
  },
});

export default theme;
