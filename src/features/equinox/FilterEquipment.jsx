import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  DialogActions,
  DialogContentText,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  fitnessColumns,
  assetsColumns,
} from "../../constants/deviceTableColumns";
import styles from "./FilterEquipment.module.css";
import DevicesTable from "./DevicesTable";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";
export default function FilterEquipment() {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [assets, setAssets] = useState([]);
  const [fitnessCols, setFitnessCols] = useState(
    fitnessColumns.map((c) => c.field)
  );
  const [assetCols, setAssetCols] = useState(assetsColumns.map((c) => c.field));

  const [menuAnchor, setMenuAnchor] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDevices, resAssets] = await Promise.all([
          axios.get("http://localhost:3000/fitnessdevices"),
          axios.get("http://localhost:3000/itAssets"),
        ]);
        setDevices(resDevices.data);
        setAssets(resAssets.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchData();
  }, []);
  const toggleCol = (cols, setCols, field) => {
    setCols((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.text("Fitness Devices", 14, 10);
    autoTable(doc, {
      head: [fitnessColumns.map((c) => c.headerName)],
      body: devices.map((row) => fitnessColumns.map((c) => row[c.field] || "")),
      startY: 20,
    });

    doc.addPage();
    doc.text("IT Assets", 14, 10);
    autoTable(doc, {
      head: [assetsColumns.map((c) => c.headerName)],
      body: assets.map((row) => assetsColumns.map((c) => row[c.field] || "")),
      startY: 20,
    });

    doc.save("devices_report.pdf");
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(devices);
    const ws2 = XLSX.utils.json_to_sheet(assets);

    XLSX.utils.book_append_sheet(wb, ws1, "Fitness Devices");
    XLSX.utils.book_append_sheet(wb, ws2, "IT Assets");

    XLSX.writeFile(wb, "devices_report.xlsx");
  };
  const handleExportEmail = () => {
    window.location.href = `mailto:balasatyay.in@mouritech.com?subject=Exported Data&body=Please find the attached exported file.`;
  };
  return (
    <Box className={styles.pageWrapper}>
      <Box className={styles.headerRow}>
        <Typography variant="h6" gutterBottom color="gray">
          Filter Equipments
        </Typography>
        <Box className={styles.iconRow}>
          {[
            FilterAltIcon,
            ViewWeekIcon,
            BookmarkBorderIcon,
            FileDownloadOutlinedIcon,
          ].map((Icon, idx) => (
            <IconButton
              key={idx}
              size="small"
              className={styles.iconButton}
              onClick={(e) => {
                if (idx === 1) setOpen(true);
                if (idx === 3) setMenuAnchor(e.currentTarget);
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Box>
      </Box>
      <DevicesTable
        fitnessVisibleCols={fitnessCols}
        assetVisibleCols={assetCols}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "dark",
            color: "white",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            minWidth: 180,
            paddingY: 1,
            left: "100px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleExportExcel();
            setMenuAnchor(null);
          }}
        >
          Export as Excel
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleExportEmail();
            setMenuAnchor(null);
          }}
        >
          Export as Email
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleExportPDF();
            setMenuAnchor(null);
          }}
        >
          Export as PDF
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "#888887",
            color: "white",
          },
        }}
      >
        <DialogTitle>Select Visible Columns</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h5" color="white" gutterBottom>
                  Fitness Devices
                </Typography>
                <FormGroup>
                  {fitnessColumns.map((col) => (
                    <FormControlLabel
                      key={col.field}
                      control={
                        <Checkbox
                          checked={fitnessCols.includes(col.field)}
                          onChange={() =>
                            toggleCol(fitnessCols, setFitnessCols, col.field)
                          }
                        />
                      }
                      label={col.headerName}
                      sx={{
                        color: "black",
                        borderRadius: "6px",
                        px: 1,
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box>
                <Typography variant="h5" color="white" gutterBottom>
                  IT Assets
                </Typography>
                <FormGroup>
                  {assetsColumns.map((col) => (
                    <FormControlLabel
                      key={col.field}
                      control={
                        <Checkbox
                          checked={assetCols.includes(col.field)}
                          onChange={() =>
                            toggleCol(assetCols, setAssetCols, col.field)
                          }
                        />
                      }
                      label={col.headerName}
                      sx={{
                        color: "black",
                        borderRadius: "6px",
                        px: 1,
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="white"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
