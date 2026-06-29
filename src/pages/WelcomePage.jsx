import {Box,Button,Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function WelcomePage() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 4
      }}
    >

      {/* Left Side */}
      <Box flex={1}>
        <img
          src="/assets/shoppingA.jpg"
          alt="Shopping"
          style={{
            width: "100%",
            borderRadius: "20px"
          }}
        />
      </Box>

      {/* Right Side */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
      >

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Welcome To Shopi
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
        >
          Find your favorite products with ease
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Typography>
          New User?
        </Typography>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>

      </Box>

    </Box>
  );
}