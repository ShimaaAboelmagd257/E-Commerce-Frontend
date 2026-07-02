import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";


export default function SignInNavbar() {

  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
      backgroundColor: "#000000",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters>

        {/* Left */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          🍒 IT FITS
        </Typography>

        {/* Push everything else to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right */}
        <Button color="inheret" startIcon={<PersonIcon /> } onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
        <Box/>

      </Toolbar>
    </AppBar>
  );
}