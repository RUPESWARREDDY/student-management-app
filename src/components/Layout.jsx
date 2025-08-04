import React from "react";
import NavBar from "../features/students/NavBar";
import { Box } from "@mui/material";

export default function Layout({ children, toggleTheme, mode }) {
  return (
    <>
      <NavBar toggleTheme={toggleTheme} mode={mode} />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
}
