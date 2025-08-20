import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Box, Container, Paper, Typography, Avatar } from "@mui/material";
import { Web as WebIcon } from "@mui/icons-material";

function LoginPage({ setUser }) {
  const handleLoginSuccess = (res) => {
    console.log("res", res)
    console.log("res.credential", res.credential)
    const user = jwtDecode(res.credential);
    console.log("user", user)
    setUser(user);
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            <WebIcon sx={{ fontSize: 30 }} />
          </Avatar>

          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
            Web Scraping Dashboard
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Login with Google
            </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                theme="filled_blue"
                size="large"
                text="signin_with"
              />
            </Box>
          </Box>

        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
