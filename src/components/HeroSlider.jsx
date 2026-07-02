import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import shoppingA from "../assets/shopping1.jpg";
import shoppingB from "../assets/shopping2.jpg";
import shoppingC from "../assets/shopping3.jpg"

const slides = [
  {
    title: "We are at your service",
    subtitle: "Best products, best prices, anytime",
    image: shoppingA
  },
  {
    title: "Hot Deals Every Day",
    subtitle: "Save more with exclusive offers",
    image: shoppingB
  },
  {
    title: "Fast & Reliable Delivery",
    subtitle: "Get your products in no time",
    image: shoppingC
  }
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <Box
      sx={{
        height: 400,
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "3px"
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
                  borderRadius: "20px"

        }}
      />

      {/* Text */}
      <Box sx={{ zIndex: 1, textAlign: "center" , color: "white"}}>
        <Typography variant="h1" fontWeight="bold" >
          {slide.title}
        </Typography>

        <Typography variant="h4">
          {slide.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroSlider;