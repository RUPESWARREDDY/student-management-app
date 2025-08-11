import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
import DeviceTable from "../../components/Table";
import { fitnessColumns, assetsColumns } from "../../constants/deviceTableColumns";
import styles from "./DevicesTable.module.css"; 

export default function DevicesTable() {
  const [devices, setDevices] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDevices, setShowDevices] = useState(true);
  const [showAssets, setShowAssets] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchData();
  }, []);

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

      <DeviceTable
        title="Fitness Devices"
        count={devices.length}
        rows={devices}
        columns={fitnessColumns}
        loading={loading}
        expanded={showDevices}
        onToggle={() => {
          setShowDevices((p) => !p);
          setShowAssets((p) => !p);
        }}
      />
      <DeviceTable
        title="IT Assets"
        count={assets.length}
        rows={assets}
        columns={assetsColumns}
        loading={loading}
        expanded={showAssets}
        onToggle={() => {
          setShowDevices((p) => !p);
          setShowAssets((p) => !p);
        }}
      />
    </Box>
  );
}
