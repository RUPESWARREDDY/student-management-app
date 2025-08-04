import React, { useEffect,useState} from "react";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "./studentSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
export default function StudentTable({ filterGrade }) {
  const [open, setOpen] =useState(false);
  const [selectedStudentId, setSelectedStudentId] =useState(null);
  const [selectedStudentName, setSelectedStudentName] =useState("");
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filtered =
    filterGrade === "All"
      ? students
      : students.filter((s) => s.grade === filterGrade);

  const columns = [
    { field: "name", headerName: "Name", width: 550 },
    { field: "age", headerName: "Age", width: 200 },
    { field: "grade", headerName: "Grade", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
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
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
        />
      </Box>
      <Dialog
         PaperProps={{
          sx: {
            width: '600px',        
            height: '200px',        
            maxWidth: 'none',       
          },
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
