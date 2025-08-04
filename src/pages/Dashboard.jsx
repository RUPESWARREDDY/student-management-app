import React from "react";
import { Container,Box} from "@mui/material";
import FilterStudents from "../features/students/FilterStudents";
import AddStudentForm from "../features/students/AddStudentForm";
import NavBar from "../features/students/NavBar";

export default function Dashboard() {
  
  return (
    <Box  sx={{ mb: 4 }} >
      <NavBar />
    <Container maxWidth="lg" disableGutters>
    <AddStudentForm />
    <FilterStudents />
    </Container>
    </Box>
  );
}
