import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function StudentDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Box p={3}>
        <Typography variant="h6">
          No student data found. Please go back to the student list.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </Box>
    );
  }

  const { name, age, grade, image, description } = state;

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
          <Typography variant="h6" ml={1}>
          Back
        </Typography>
        </IconButton>
       
      </Box>

      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {image && (
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt={name}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">Age: {age}</Typography>
          <Typography variant="body1">Grade: {grade}</Typography>
          {description && (
            <Typography variant="body2" mt={2}>
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
