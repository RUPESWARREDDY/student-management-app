import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "./Table.module.css";
import { dataGridSx } from "../constants/deviceDatagridStyles";

export default function Table({
  title,
  count,
  rows,
  columns,
  loading,
  expanded,
  onToggle,
}) {
  return (
    <Box className={styles.tableSection}>
      <Box className={styles.toggleRow} onClick={onToggle}>
        <Typography variant="body2">
          {title} {count}
        </Typography>
        {expanded ? <ExpandLessIcon /> :<ExpandMoreIcon /> }
      </Box>
      {expanded && (
        <Box className={styles.dataGridContainer}>
          {loading ? (
            <CircularProgress color="success" />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              hideFooterPagination
              hideFooterSelectedRowCount
              disableRowSelectionOnClick
              sx={dataGridSx}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
