import { useState } from "react";
import { login } from "../api/authService";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import LoginImage from "../assets/logo2.jpg"; 
import Logo from "../assets/logo1.jpg"; 
import Navbar from "../components/SignInNavbar";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
          const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


  const handleLogin = async(e)=>{

    e.preventDefault();

    try{

      const response = await login(email,password);

      localStorage.setItem("token",response.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id:response.userId,
          email:response.email,
          name:response.name
        })
      );

      navigate("/home");

    }catch(err){

      alert("Invalid Email or Password");

    }

  };

  return(

    <Box
      sx={{
        display:"flex",
        height:"100vh",
        bgcolor:"#000000",
        
      }}
    >

      {/* LEFT SIDE */}

      <Box
        sx={{
          flex:1,
          overflow:"hidden",
          borderRadius:"30px 0 0 30px",
          backgroundImage:`url(${LoginImage})`,
          backgroundSize:"cover",
          backgroundPosition:"center"
        }}
    

      Box/>


      {/* RIGHT SIDE */}

<Card
  sx={{
    flex: 1,
    borderRadius: "30px 0 0 30px",
    boxShadow: 0,
    display: "flex",
    flexDirection: "column",
    bgcolor: "#ffffff",
  }}
>

  {/* Navbar */}
  <Box
    sx={{
      px: 2,
      py: 3,
    }}
  >
    <Navbar />
  </Box>

  {/* Center Area */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <form
      onSubmit={handleLogin}
      style={{
        width: "480px",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Typography
        variant="h2"
        sx={{
          fontWeight: 300,
          mb: 3,
          textAlign: "left",
        }}
      >
        Sign In
      </Typography>

      <TextField
        fullWidth
        placeholder="Email"
        value={email}
        onChange={(e) =>{ setEmail(e.target.value);

                if (!email.includes("@")) {
                setEmailError("Please enter a valid email address.");
                } else {
                    setEmailError("");
                }
              }}

        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "40px",
            height: 55,
          },
        }}
      />

      <TextField
        fullWidth
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {setPassword(e.target.value);
                            if (password.length < 8) {
                    setPasswordError("Password must be at least 8 characters.");
                  } else {
                  setPasswordError("");
                  }

              }}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: "40px",
            height: 55,
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          height: 55,
          borderRadius: "40px",
          fontSize: 18,
          textTransform: "none",
          background:
            "linear-gradient(90deg,#ff6a00,#ff2d75)",
        }}
      >
        Sign In
      </Button>

    </form>
  </Box>

</Card>

    </Box>

  );

}