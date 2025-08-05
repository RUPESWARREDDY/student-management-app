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
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/dashboard")}
      >
        <IconButton size="sm">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1">Back</Typography>
      </Button>

      <Card
        sx={{
          maxWidth: 300,
          mx: "auto",
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
        }}
      >
        {image ? (
          <CardMedia
            component="img"
            height="100px"
            image={image}
            alt={name}
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              mx: "auto", 
              mt: 2,
            }}
          />
        ) : (
          <CardMedia
            component="img"
            height="250"
            image="https://picsum.photos/200"
            alt={name}
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              mx: "auto", 
              mt: 2,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">Age: {age}</Typography>
          <Typography variant="body1">Grade: {grade}</Typography>
          {description ? (
            <Typography variant="body2" mt={2}>
              {description}
            </Typography>
          ) : (
            <Typography variant="body2" mt={2}>
              Aspires to grow in a creative tech environment.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
