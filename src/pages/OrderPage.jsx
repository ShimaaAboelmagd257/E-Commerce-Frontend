import { useEffect, useState } from "react";
import {Box,Card,Typography,Stack,Button,LinearProgress,} from "@mui/material";
import OrderCard from "../components/OrderCard"
import { useNavigate } from "react-router-dom";
import { getOrdersByUserId } from "../api/orderService";
import emptyOrder from "../assets/emptyorder.jpg";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const loadOrders = async () => {

      const user =
        JSON.parse(localStorage.getItem("user"));

      const data =
        await getOrdersByUserId(user.id);

      setOrders(data);

    };

    loadOrders();

  }, []);
      if (!orders || orders.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
        bgcolor:"#000000",
        }}
      >
        {/* LEFT IMAGE */}
  
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            backgroundColor: "#f8f8f8",
            display: "flex",
          }}
        >
          <Box
            component="img"
            src={emptyOrder}
            sx={{
              objectFit: "contain",
              backgroundPosition:"center",
                      borderRadius : "20px"
  
  
            }}
          />
        </Box>
  
        {/* RIGHT CARD */}
  
        <Card
          sx={{
            justifyContent: "center",
            alignItems: "center",
                flex: 1,
    borderRadius: "30px 0 0 30px",
    boxShadow: 0,
    display: "flex",
    flexDirection: "column",
    bgcolor: "#ffffff",

          }}
        >
          <Box
            sx={{
              width: 420,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              You have no orders
            </Typography>
  
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 5,
              }}
            >
              Looks like you didn't checked out yet.
              <br />
              Start shopping to fill your cart and make an order.
            </Typography>
  
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/home")}
              sx={{
                width: "100%",
                py: 1.8,
                borderRadius: "30px",
                fontSize: 18,
                textTransform: "none",
                backgroundColor : "black"
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Card>
      </Box>
    );
  }
  

  return (

    <Box
      sx={{
        bgcolor:"#f5f5f5",
        minHeight:"100vh",
        p:5,
      }}
    >

      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
      >
        My Orders
      </Typography>
      <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:3
        }}
      />
        

        <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 3,
    mt: 3,
  }}
>
          {orders.map(order => (

          <OrderCard
            key={order.id}
            order={order}
            navigate={navigate}
          />

        ))}
    

      </Box>

    </Box>

  );

}