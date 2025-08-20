import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, Card, CardContent, Grid, AppBar, Toolbar, Avatar, IconButton, Button, Chip, Alert, Paper, Divider, CircularProgress} from "@mui/material";
import { Refresh as RefreshIcon, Logout as LogoutIcon, Article as ArticleIcon, TrendingUp as TrendingUpIcon, Schedule as ScheduleIcon} from "@mui/icons-material";

function Dashboard({ user, setUser }) {
  const [data, setData] = useState({ headlines: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const res = await axios.get("http://127.0.0.1:8080/api/scrape");
      console.log("res", res);
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "white", color: "text.primary" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <ArticleIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Web Scraping Dashboard
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Welcome, {user?.name || "User"}
            </Typography>
            <Avatar sx={{ width: 35, height: 35, bgcolor: "primary.main" }}>
              {user?.name?.charAt(0) || "U"}
            </Avatar>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <ArticleIcon sx={{ mr: 2, color: "primary.main" }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Scraped Headlines
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {data.headlines && data.headlines.length > 0 ? (
              <Grid container spacing={2}>
                {data.headlines.map((headline, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        borderLeft: "3px solid",
                        borderColor: "primary.main",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {headline}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                        <Chip
                          label={`Article ${index + 1}`}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {new Date().toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <ArticleIcon sx={{ fontSize: 50, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  No headlines available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click refresh to fetch the latest data
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Dashboard;
