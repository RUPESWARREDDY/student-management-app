import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./EquipmentCard.module.css";

const EquipmentCard = ({ equipment }) => {
  return (
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
      <IconButton className={styles.moreBtn}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default EquipmentCard;
