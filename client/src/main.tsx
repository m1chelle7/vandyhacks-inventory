import { MantineProvider, createTheme } from '@mantine/core';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import '@mantine/dates/styles.css';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);