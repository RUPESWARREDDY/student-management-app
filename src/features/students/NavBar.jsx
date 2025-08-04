import React from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function NavBar({ toggleTheme, mode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "primary.main",
        color: "white",
        height: "60px",
        px: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6">Student Management System</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default NavBar;
