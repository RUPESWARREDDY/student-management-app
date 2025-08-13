import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./EquipmentCard.module.css";
import { useState } from "react";
const EquipmentCard = ({ equipment }) => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className={styles.card}>
        <Box className={styles.cardHeader}>
          <CardMedia
            component="img"
            image={equipment?.image || "/src/assets/threadmill.png"}
            alt="image"
            className={styles.media}
          />
          <CardContent>
            <Typography variant="caption" className={styles.status}>
              {equipment?.status}
            </Typography>
            <Typography variant="h6" className={styles.deviceName}>
              {equipment?.name}
            </Typography>
            <Typography variant="body2" className={styles.deviceQuantity}>
              Device Quantity {equipment?.quantity.toString().padStart(2, "0")}
            </Typography>
          </CardContent>
        </Box>
        <CardContent>
          <Box>
            <Typography variant="body2" className={styles.reasonText}>
              Reason{" "}
              <Box component="span" className={styles.reasonValue}>
                {equipment?.reason}
              </Box>
            </Typography>
            <Typography variant="body2" color="gray">
              Maintenance Status{" "}
              <Chip
                label={equipment?.maintenance}
                size="small"
                className={styles.maintenance}
              />
            </Typography>
          </Box>
        </CardContent>
        <Tooltip
          title="View Details"
          classes={{ tooltip: styles.customTooltip }}
        >
          <IconButton className={styles.moreBtn} onClick={handleOpenDialog}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Card>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "lightgray",
            padding: 2,
          },
        }}
      >
        <DialogTitle>Equipment Details</DialogTitle>
        <DialogContent dividers>
          <Typography>
            <strong>Name:</strong> {equipment?.name}
          </Typography>
          <Typography>
            <strong>Status:</strong> {equipment?.status}
          </Typography>
          <Typography>
            <strong>Quantity:</strong> {equipment?.quantity}
          </Typography>
          <Typography>
            <strong>Reason:</strong> {equipment?.reason}
          </Typography>
          <Typography>
            <strong>Maintenance:</strong> {equipment?.maintenance}
          </Typography>
          <Typography>
            <strong>Description:</strong>{" "}
            {equipment?.description || "No description provided"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EquipmentCard;
