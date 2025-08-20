import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  console.log("clientId:", clientId); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <GoogleOAuthProvider clientId={clientId}>
          {user ? (
            <Dashboard user={user} setUser={setUser} />
          ) : (
            <LoginPage setUser={setUser} />
          )}
        </GoogleOAuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
