import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function SignUpNavbar() {

  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters>

        {/* Logo */}

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          🍒 IT FITS
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right */}

        <Typography variant="body1">

          Already have an account?

          <Link
            component="button"
            underline="none"
            onClick={() => navigate("/login")}
            sx={{
              ml:1,
              fontWeight:"bold",
              color:"#000000",
              cursor:"pointer"
            }}
          >
            Sign In
          </Link>

        </Typography>

      </Toolbar>
    </AppBar>
  );
}