import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../../reduxstore/studentSlice";
import { useNavigate } from "react-router-dom";
import ToolbarMenuButton from "../../components/ToolbarMenuButton";

export default function StudentTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.list);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const allGrades = ["All", "A", "B", "C"];
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [density, setDensity] = useState("compact");

  const allColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary.main"
          onClick={() =>
            navigate(`/students/${params.row.id}`, { state: params.row })
          }
        >
          {params.row.name}
        </Button>
      ),
    },
    { field: "age", headerName: "Age", flex: 0.5, minWidth: 100 },
    { field: "grade", headerName: "Grade", flex: 0.5, minWidth: 100 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      minWidth: 120,
      renderCell: (params) => (
        <Button
          color="error"
          onClick={() => {
            setSelectedStudentId(params.row.id);
            setSelectedStudentName(params.row.name);
            setOpen(true);
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {})
  );

  const handleColumnToggle = (field) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDensityChange = (value) => setDensity(value);
  const handleGradeFilter = (value) => setFilterGrade(value);

  const displayedColumns = allColumns.filter(
    (col) => visibleColumns[col.field]
  );
  const filtered =
    filterGrade === "All"
      ? students
      : students.filter((s) => s.grade === filterGrade);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection:{
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          gap: 2,
        }}
      >
        <ToolbarMenuButton
          icon={<DensityMediumIcon />}
          label="Density"
          selected={[density]}
          options={["compact", "standard", "comfortable"].map((d) => ({
            label: d,
            value: d,
          }))}
          onChange={handleDensityChange}
          multiple={false}
        />
        <ToolbarMenuButton
          icon={<FilterListIcon />}
          label="Search"
          selected={[filterGrade]}
          options={allGrades.map((g) => ({ label: g, value: g }))}
          onChange={handleGradeFilter}
          multiple={false}
        />
        <ToolbarMenuButton
          icon={<ViewColumnIcon />}
          label="Columns"
          selected={Object.keys(visibleColumns).filter(
            (key) => visibleColumns[key]
          )}
          options={allColumns.map((col) => ({
            label: col.headerName,
            value: col.field,
          }))}
          onChange={handleColumnToggle}
          multiple={true}
          showFormControl
        />
        <Typography sx={{ marginLeft: "auto", fontWeight: 600 }}>
          Total Count: {filtered.length}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: { xs: 1, sm: 2 },
        }}
      >
        <DataGrid
          rows={filtered}
          columns={displayedColumns}
          pageSize={5}
          density={density}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>

      <Dialog
        PaperProps={{
          sx: { width: "600px", height: "200px", maxWidth: "none" },
        }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{" "}
            <strong>{selectedStudentName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteStudent(selectedStudentId));
              setOpen(false);
            }}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
