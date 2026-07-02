import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { addItemToCart } from "../api/cartService";
import Snackbar from "@mui/material/Snackbar";
import { API_BASE_URL } from "../config";
import { getCartByUserId } from "../api/cartService";

export default function ProductCard({product}) {

  console.log(product.image);
  const [open, setOpen] =useState(false);
  const handleAddToCart = async () => {

    try {
       const user = JSON.parse(localStorage.getItem("user"));
       const cart = await getCartByUserId(user.id);


        await addItemToCart(
            cart.id,
            product.id,
            1
        );
        console.log("cartId");
        setOpen(true);

    } catch (error) {

        console.error(error);
        alert("Failed to add item");
        console.log(error);


    }
};

  return (
    <>
    <Card
      sx={{
        width: 280,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height="260"
        image={`${API_BASE_URL}${product.image}`}   
         alt={product.name}
      />
      
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          {product.title}
        </Typography>

      

        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pt: 0,
        }}
      >
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>

        <Button
          onClick={handleAddToCart}
          variant="contained"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            px: 3,
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </Card>
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      message="Added To Cart"
    />
    </>
  );
      console.log(product);
      console.log(product.image);

}

