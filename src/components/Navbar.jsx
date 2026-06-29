import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  return (
    <AppBar  
      position="sticky"
    elevation={0}
    sx={{
      backgroundColor: "#000000",
      color: "#ffffff",
      borderBottom: "1px solid #e0e0e0",
          borderRadius: "20px",
      
  }}
>
      <Toolbar >

        {/* Logo */}
<Link
  to="/home"
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    🍒 IT FITS
  </Typography>
</Link>

        {/* Push menu items to the right */}
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inheret" startIcon={<ShoppingCartIcon />}
        component={Link} to="/categories">
          Categories
        </Button>

        <Button color="inherit" startIcon={<FavoriteIcon />}>
          Wishlist
        </Button>

        <Button color="inherit" startIcon={<ShoppingCartIcon />}
        component={Link} to="/cart">
          Cart
        </Button>

        <Button color="inherit" startIcon={<PersonIcon />}>
          Profile
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;