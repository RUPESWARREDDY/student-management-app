import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toast } from "react-toastify";
import styles from "./NavBar.module.css";

export default function NavBar({ toggleTheme, mode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <Box className={styles["navbar-root"]}>
      <AppBar
        position="static"
        elevation={0}
        className={styles["navbar-appbar"]}
      >
        <Toolbar className={styles["navbar-toolbar"]}>
          <Box className={styles["navbar-brand"]}>
            <Typography variant="h5">
              EQUINOX <span className={styles.logo}>| PHOTON</span>
            </Typography>
          </Box>

          <Box className={styles["navbar-search"]}>
            <SearchIcon
              fontSize="small"
              style={{ color: "#999", marginRight: 8 }}
            />
            <InputBase
              placeholder="Search anything or add bookmarks"
              className={styles["navbar-search-input"]}
            />
          </Box>

          <Box className={styles["navbar-links"]}>
            <Link
              component={RouterLink}
              to="/dashboard"
              className={`${styles["navbar-link"]} ${
                location.pathname === "/dashboard" ? styles["active"] : ""
              }`}
            >
              Dashboard
            </Link>

            <Link
              component={RouterLink}
              to="/devices"
              className={`${styles["navbar-link"]} ${
                location.pathname === "/devices" ? styles["active"] : ""
              }`}
            >
              Devices
            </Link>

            <Link
              component={RouterLink}
              to="/software"
              className={`${styles["navbar-link"]} ${
                location.pathname === "/software" ? styles["active"] : ""
              }`}
            >
              Software
            </Link>

            <Tooltip
              title={
                mode === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            <IconButton onClick={handleLogout} sx={{ color: "#fff" }}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
