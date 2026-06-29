import {Card,Box,Typography,Button,LinearProgress,Avatar,Stack,Divider} from "@mui/material";

import { useNavigate } from "react-router-dom";

const API = "https://happily-reward-sinless.ngrok-free.dev/api";

export default function OrderCard({ order }) {

  const navigate = useNavigate();
   const progress = () => {

    switch(order.status){

      case "CREATED":
        return 25;

      case "CONFIRMED":
        return 60;

      case "PAID":
        return 100;

      default:
        return 0;

    }

  };

  return (

    <Card
    sx={{
        p:5,
        borderRadius:5,
        mb:4,
        boxShadow:0,
        border:"1px solid #ddd"
    }}
>

    <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
    >
        Order #{order.id}
    </Typography>

    {/* Purchased Items */}

    <Stack spacing={0}>

        {order.orderItems.map(item => (

<Box
    key={item.id}
    sx={{
        display: "flex",
        alignItems: "center",
        py: 2,
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
    }}
>

    {/* Product Image */}
        <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
        }
          
        }>
    <Box
        component="img"
        src={`${API}${item.productImage}`}
        sx={{
            width: 90,
            height: 90,
            objectFit: "cover",
            borderRadius: 2,
        }}
    />




    {/* Quantity */}

    <Typography
        sx={{
            width: 200,
            textAlign: "center",
        }}
    >
        {item.quantity} × {item.productName}
    </Typography>
    </Box>

    {/* Price */}

    <Typography
        sx={{
            width: 120,
            textAlign: "right",
            fontWeight: "bold",
        }}
    >
        ${item.subTotal}
    </Typography>

</Box>

        ))}

    </Stack>
    
        <Box
        sx={{
          my:2
        }}
      />


    <Typography
        fontWeight="bold"
        my={2}
    >
        Order Status
    </Typography>

    <LinearProgress
        variant="determinate"
        value={
            order.status==="CREATED"
            ?25
            :order.status==="CONFIRMED"
            ?70
            :100
        }
        sx={{
            height:10,
            borderRadius:10,
            mb:1
        }}
    />

    <Typography
        color="text.secondary"
        mb={3}
    >
        {order.status}
    </Typography>

        <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:2
        }}
      />


    <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
    >

        <Typography
            variant="h6"
            fontWeight="bold"
        >
            Total
        </Typography>

        <Typography
            variant="h6"
            fontWeight="bold"
        >
            ${order.totalPrice}
        </Typography>

    </Box>

    <Button
        fullWidth
        variant="contained"
            sx={{
        mt:1,
        borderRadius:5,
    }}
        onClick={() =>
            navigate(`/orders/${order.id}`)
        }
    >
        Proceed Order
    </Button>

</Card>

  );

}