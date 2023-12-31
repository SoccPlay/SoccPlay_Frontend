import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import AuthenApi from "../../components/Axios/AuthenApi";
import Typography from "@mui/material/Typography";
import { withSnackbar } from "../../hook/withSnackbar";
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

function SignIn({ snackbarShowMessage }) {
  const [error, setError] = useState(); // Initialize with null
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigateWithDelay = (path, delay) => {
    setTimeout(() => {
      navigate(path);
    }, delay);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = await AuthenApi.Login(formData);
      if (token != null) {
        localStorage.setItem("localtoken", token.data.data.token);
        console.log("Login successful! Token:", token.data.data.token);
        snackbarShowMessage("Login successful!", "success");
        const redirectPath = localStorage.getItem("redirectPath");
        if (redirectPath) {
          navigate(redirectPath);
          localStorage.removeItem("redirectPath"); // Xóa địa chỉ đã ghi nhớ sau khi sử dụng
        } else {
          // Mặc định chuyển hướng đến một trang khác nếu không có địa chỉ ghi nhớ
          navigateWithDelay("/", 3000);
        }
      } else {
        setError(token.message);
        console.log(token.message);
      }
    } catch (error) {
      console.error("Login error:", error.response.data.Exception);
      snackbarShowMessage(error.response.data.Exception, "error");
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
          background: "#50e448b",
        }}
      >
        <div
          className="box"
          style={{
            position: "relative",
            width: "480px",
            height: "520px",
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
              Sign in
            </h2>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{ marginTop: "35px" }}
              fullWidth
              required
            />
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Link href="#" variant="body2" color="secondary">
                Forgot Password
              </Link>
              <Link href="/signup" variant="body2" color="secondary">
                Sign Up
              </Link>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default withSnackbar(SignIn);
