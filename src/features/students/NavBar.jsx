import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          backgroundColor:"darkblue",
          height:"50px",
          padding:"0px 10px"
        }}
      >
        <Typography variant="h5" color="white">Student Dashboard</Typography>
        <Button variant="contained" color="error" onClick={handleLogout} size="small">
          Logout
        </Button>
      </Box>
    </>
  );
}

export default NavBar;
