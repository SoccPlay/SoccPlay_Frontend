import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenApi from "../../components/Axios/AuthenApi";
import {
  Typography,
  Grid,
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
  Link,
  TextField,
  Button,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c72e2",
    },
    secondary: {
      main: "#8f8f8f",
    },
  },
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      SWP391 {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [error, setError] = useState(); // Initialize with null
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });
  const navigateWithDelay = (path, delay) => {
    setTimeout(() => {
      navigate(path);
    }, delay);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [success, setSussess] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await AuthenApi.Register(formData);
      if (response.status === 200) {
        console.log("Registration successful!");
        setSussess("Registration successful!");
        navigateWithDelay("/signin", 3000);
      } else {
        setError(response.message);
        console.log(response.message);
      }
    } catch (error) {
      console.error("Registration error:", error.response.data.Messages);
      setError(error.response.data.Messages);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="100%"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#1c72e2",
        }}
      >
        <div
          className="box"
          style={{
            position: "relative",
            width: "580px",
            height: "600px",
            backgroundColor: "#fefefe",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Add animations here if desired */}
          <form
            style={{
              position: "absolute",
              inset: "2px",
              borderRadius: "8px",
              background: "#f7f7f7",
              zIndex: 10,
              padding: "50px 40px",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <h2
              style={{
                color: "#030304",
                fontWeight: 500,
                textAlign: "center",
                letterSpacing: "0.1em",
              }}
            >
              Sign Up
            </h2>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={{ marginTop: "20px" }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ marginTop: "20px" }}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <TextField
              label="FullName"
              variant="outlined"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              style={{ marginTop: "20px" }}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              variant="outlined"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{ marginTop: "20px" }}
              fullWidth
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ marginTop: "20px" }}
              fullWidth
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={{ marginTop: "20px" }}
              fullWidth
              required
            />
            {success && (
              <Typography
                variant="body"
                color="red" // Change to your success color
                style={{
                  marginBottom: "10px",
                  textAlign: "center", // Align the text to the center
                }}
              >
                {success}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Register
            </Button>
            {error && (
              <Typography
                variant="body"
                color="red"
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
