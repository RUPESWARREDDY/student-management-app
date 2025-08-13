import React from 'react'
import { Box, Typography, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import styles from "./FilterEquipment.module.css";
import DevicesTable from './DevicesTable';
export default function FilterEquipment() {
  return (
     <Box className={styles.pageWrapper}>
       <Box className={styles.headerRow}>
        <Typography variant="h6" gutterBottom color="gray">
          Filter Equipments
        </Typography>
        <Box className={styles.iconRow}>
          {[FilterAltIcon, ViewWeekIcon, BookmarkBorderIcon, FileDownloadOutlinedIcon].map(
            (Icon, idx) => (
              <IconButton key={idx} size="small" className={styles.iconButton}>
                <Icon />
              </IconButton>
            )
          )}
        </Box>
      </Box>
      <DevicesTable/>
    </Box>
  )
}

