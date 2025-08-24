import { Chip, Box, MenuItem, Select  } from "@mui/material";

const statusChip = (value) => (
  <Chip
    label={value}
    sx={{
      backgroundColor: "rgba(104, 197, 104, 0.4);",
      color: "white !important",
    }}
    size="small"
    variant="text"
  />
);

export const fitnessColumns = [
  { field: "deviceName", headerName: "DEVICE NAME", minWidth: 150, flex: 1 },
  { field: "deviceType", headerName: "DEVICE TYPE", minWidth: 150, flex: 1 },
  {
    field: "serialNumber",
    headerName: "SERIAL NUMBER",
    minWidth: 150,
    flex: 1,
  },
  { field: "facility", headerName: "FACILITY", minWidth: 150, flex: 1 },
  {
    field: "lastActivityOn",
    headerName: "LAST ACTIVITY ON",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "equipmentStatus",
    headerName: "EQUIPMENT STATUS",
    minWidth: 200,
    flex: 1,
renderCell: (params) => {
  const value = params.value;
  const isActive = value === "Active";
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Update the row in DataGrid
    params.api.updateRows([
      { id: params.id, equipmentStatus: newValue }
    ]);
  };
  return (
   <Box sx={{ display: "flex", alignItems: "center", gap: 1,height: "100%" }}>
     <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isActive ? "#e6f4eb" : "#fdecea", 
        borderRadius: "15px",
        width:"100px",
        padding: "0px 4px",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isActive ? "green" : "red",
        }}
      />
      <Select
        color="primary"
        size="small"
        value={value}
        disableUnderline
        onChange={ handleChange}
        variant="standard"
        sx={{
          fontSize: "0.85rem",
          color: isActive ? "green" : "red",
          "& .MuiSelect-icon": {
            color: isActive ? "green" : "red",
          },
        }}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
    </Box>
   </Box>
  );
}

  },
  {
    field: "powerMeterStatus",
    headerName: "POWER METER STATUS",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => statusChip(params.value),
  },
];

function getCurrentDateTime() {
  const date = new Date();
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
export const assetsColumns = [
  { field: "deviceName", headerName: "DEVICE NAME", minWidth: 150, flex: 1 },
  { field: "macId", headerName: "MAC ID", minWidth: 150, flex: 1 },
  { field: "ipAddress", headerName: "IP ADDRESS", minWidth: 150, flex: 1 },
  { field: "facility", headerName: "FACILITY", minWidth: 150, flex: 1 },
  {
    field: "lastActivity",
    headerName: "LAST ACTIVITY ON",
    renderCell: () => <span>{getCurrentDateTime()}</span>,
    minWidth: 150,
    flex: 1,
  },
  {
    field: "connectedDevices",
    headerName: "CONNECTED DEVICES",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "greengrassVersion",
    headerName: "GREENGRASS VER.",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "status",
    headerName: "STATUS",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => statusChip(params.value),
  },
];
