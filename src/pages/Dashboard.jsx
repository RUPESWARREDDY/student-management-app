import React from "react";
import { Container, Box } from "@mui/material";
import AddStudentForm from "../features/students/AddStudentForm";
import StudentTable from "../features/students/StudentTable";

export default function Dashboard() {
  return (
    <Box mx={4}>
      <Container maxWidth="lg" disableGutters>
        <AddStudentForm />
        <StudentTable />
      </Container>
    </Box>
  );
}
