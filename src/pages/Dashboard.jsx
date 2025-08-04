import React from "react";
import { Container,Box} from "@mui/material";
import FilterStudents from "../features/students/FilterStudents";
import AddStudentForm from "../features/students/AddStudentForm";

export default function Dashboard() {
  
  return (
    <Box  >
    <Container maxWidth="lg" disableGutters>
    <AddStudentForm />
    <FilterStudents />
    </Container>
    </Box>
  );
}
