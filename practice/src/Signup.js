import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Login from "./Login";

const Signup = () => {
  const [Data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (submitted) {
    return <Login />;
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          name="name"
          value={Data.name}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={Data.password}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={Data.email}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
