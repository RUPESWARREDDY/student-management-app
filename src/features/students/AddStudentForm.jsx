import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addStudent } from "../../Redux-store/studentSlice";
import { toast } from "react-toastify";

const grades = ["A", "B", "C"];

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      age: "",
      grade: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(addStudent({ ...data, age: Number(data.age) }));
    toast.success("Student added successfully!");
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        mt: 3,
        width: "100%",
        justifyContent: { xs: "center", sm: "center", md: "space-evenly" },
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="age"
        control={control}
        rules={{ required: "Age is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="number"
            label="Age"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="grade"
        control={control}
        rules={{ required: "Grade is required" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>Grade</InputLabel>
            <Select {...field} label="Grade">
              {grades.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <Typography variant="caption" color="error">
                {fieldState.error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
}
