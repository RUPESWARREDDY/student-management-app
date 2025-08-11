import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import EquipmentCard from "../../components/EquipmentCard";
import { Box } from "@mui/material";
import styles from "./EquipmentCarousel.module.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const EquipmentCarousel = () => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/outoforder")
      .then((res) => setEquipments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6, px: 6 }}>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        trackMouse={true}
        showDots={false}
        infinite={false}
        keyBoardControl
        arrows={false}
        renderButtonGroupOutside={false}
        containerClass="carousel-container"
        itemClass={`carousel-item-padding-40-px ${styles.carouselItem}`}
        removeArrowOnDeviceType={[]}
      >
        {equipments.map((eq) => (
          <EquipmentCard key={eq?.id} equipment={eq} />
        ))}
      </Carousel>
    </Box>
  );
};

export default EquipmentCarousel;
