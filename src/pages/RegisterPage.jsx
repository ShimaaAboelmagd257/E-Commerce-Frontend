import { useState } from "react";
import { register } from "../api/authService";
import {Box,Button,Card,TextField,Typography,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCartByUserId } from "../api/cartService";
import LoginImage from "../assets/logo3.jpg";
import SignUpNavbar from "../components/SignUpNavbar";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async(e)=>{

    e.preventDefault();

   try {



      const response = await register(

        fullName,

        email,

        password

      );

      console.log("REGISTER RESPONSE", response);

      localStorage.setItem(

        "token",

        response.token

      );

      console.log(response.token);

      localStorage.setItem(

      "user",JSON.stringify({

        id: response.userId,

        email: response.email,

        name: response.name

    })

    );

    



      navigate("/home");

    }catch(err){

      alert("Registration Failed");
      console.log(err);

    }

  };

  return(

    <Box
      sx={{
        display:"flex",
        height:"100vh",
      }}
    >

      {/* LEFT IMAGE */}

      <Box
        sx={{
          flex:1,
          backgroundImage:`url(${LoginImage})`,
          backgroundSize:"cover",
          backgroundPosition:"center"
        }}
      />

      {/* RIGHT */}

      <Card
        sx={{
          flex:1,
          display:"flex",
          flexDirection:"column",
          boxShadow:0,
          borderRadius:0,
        }}
      >

        <Box sx={{p:4}}>
          <SignUpNavbar/>
        </Box>

        <Box
          sx={{
            flex:1,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >

          <form
            onSubmit={handleRegister}
            style={{
              width:"420px",
              display:"flex",
              flexDirection:"column",
            }}
          >

            <Typography
              variant="h2"
              sx={{
                mb:6,
                fontWeight:300,
                textAlign:"center"
              }}
            >
              Sign Up
            </Typography>

            <TextField
              fullWidth
              placeholder="Full Name"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              sx={{
                mb:3,
                "& .MuiOutlinedInput-root":{
                  borderRadius:"40px",
                  height:55
                }
              }}
            />

            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              sx={{
                mb:3,
                "& .MuiOutlinedInput-root":{
                  borderRadius:"40px",
                  height:55
                }
              }}
            />

            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              sx={{
                mb:4,
                "& .MuiOutlinedInput-root":{
                  borderRadius:"40px",
                  height:55
                }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                height:55,
                borderRadius:"40px",
                fontSize:18,
                textTransform:"none",
                background:"linear-gradient(90deg,#ff6a00,#ff2d75)"
              }}
            >
              Sign Up
            </Button>

          </form>

        </Box>

      </Card>

    </Box>

  );

}