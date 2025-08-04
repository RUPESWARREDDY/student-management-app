import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import StudentTable from "./StudentTable";

export default function FilterStudents() {
  const [filterGrade, setFilterGrade] = useState("All");

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Grade</InputLabel>
          <Select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            label="Filter by Grade"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <StudentTable filterGrade={filterGrade} />
    </>
  );
}
