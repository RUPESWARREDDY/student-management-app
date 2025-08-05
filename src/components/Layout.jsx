import React from "react";
import NavBar from "./NavBar";
import { Box } from "@mui/material";

export default function Layout({ children, toggleTheme, mode }) {
  return (
    <>
      <NavBar toggleTheme={toggleTheme} mode={mode} />
      <Box component="main">{children}</Box>
    </>
  );
}
