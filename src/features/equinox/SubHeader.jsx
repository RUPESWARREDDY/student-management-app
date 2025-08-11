import React from "react";
import { Typography, Box, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./SubHeader.module.css";

function SubHeader() {
  return (
    <Box className={styles.subheader}>
      <Box className={styles.titleBox}>
        <ArrowBackIosNewIcon fontSize="small" />
        <Typography variant="h6">Equipment</Typography>
      </Box>

      <Box className={styles.searchBox}>
        <SearchIcon fontSize="small" className={styles.searchIcon} />
        <InputBase
          placeholder="Search Equipment"
          className={styles.searchInput}
        />
      </Box>

      <Button variant="outlined" className={styles.addButton}>
        + Add Equipment
      </Button>
    </Box>
  );
}

export default SubHeader;
