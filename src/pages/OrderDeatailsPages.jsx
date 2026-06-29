import { useEffect, useState } from "react";
import {Box,Card,Typography,Divider,Button,Stack,LinearProgress,} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../api/paymentService";

import {getOrdersByUserId,confirmOrder, getOrderById} from "../api/orderService";
const API = "http://localhost:8080";

export default function OrdersPage() {
    const navigate = useNavigate();

    const [open,setOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const {orderId} = useParams();
    const getProgress = (status) => {

    switch(status){

        case "CREATED":
            return 30;

        case "CONFIRMED":
            return 70;

        case "PAID":
            return 100;

        default:
            return 0;
    }

};
  useEffect(() => {

    const loadOrder = async () => {

      const data = await getOrderById(orderId);



      // newest order
      setOrder(data);
    };

    loadOrder();

  }, [orderId]);

  if (!order) {
    return <Typography p={5}>Loading...</Typography>;
  }

  const handleConfirm = async () => {

    const updatedOrder = await confirmOrder(order.id);

    setOrder(updatedOrder);
    console.log("order.status");
    console.log(order.status);
    setOpen(true);
    };
const handlePay = async () => {

    const payment =
        await createPayment(order.id);
        localStorage.setItem("currentOrderId", order.id);

    window.location.href =
        payment.checkoutUrl;
};

  return (
<>
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 5,
      }}
    >

      <Card
        sx={{
          mx: "auto",
          borderRadius: 10,
          p: 8,
        }}
      >

        {/* Header */}

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Thank you for your order!
        </Typography>

        <Typography
          color="text.secondary"
          mb={5}
        >
          Order #{order.id}
        </Typography>

        <Stack
          direction="row"
          spacing={10}
            sx={{
                alignItems: "flex-start",
                p:0
    }}
        >

          {/* LEFT */}

          <Box sx={{
        flex: 1,
        minWidth: 0,
    }}>

            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                mb: 3,
              }}
            >

             <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
                >
            Current Status
            </Typography>
            

<Typography
    color="primary"
>
    {order.status}
</Typography>
                <Divider />

<LinearProgress
    variant="determinate"
    value={getProgress(order.status)}
    sx={{
        mt:3,
        mb:2,
        height:12,
        borderRadius:20
    }}
/>

<Box
    display="flex"
    justifyContent="space-between"
>

<Typography variant="body2">
Created → Confirmed → Paid → Shipped
</Typography>
      <Box
        sx={{
          my:2
        }}
      />

<Typography
    mt={4}
    color="text.secondary"
>
Estimated Delivery
</Typography>

<Typography
    fontWeight="bold"
>
Tomorrow before 3 PM
</Typography>
<Button
    variant="outlined"
    fullWidth
    sx={{
        mt:4,
        borderRadius:5
    }}
>
    Track Your Order
</Button>

</Box>

            </Card>

            <Card
              sx={{
                p: 3,
                borderRadius: 4,
              }}
            >

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Actions
              </Typography>
                    <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:1
        }}
      />

        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
        gap: 2,
  }}
>

<Button
 variant="contained"
    sx={{
        mt:1,
        borderRadius:5,
        width: 350
    }}
onClick={handleConfirm}
disabled={order.status !== "CREATED"}
>
Confirm Order
</Button>

<Button
 variant="contained"
    fullWidth
    sx={{
        mt:1,
        borderRadius:5,
        width : 350
    }}
    color="success"
disabled={order.status !== "CONFIRMED"}
onClick={handlePay}
>
Proceed To Payment
</Button>
</Box>

            </Card>

          </Box>

          {/* RIGHT */}

          <Box sx={{
        flex: 1,
        minWidth: 380,
    }}>
            <Card
  sx={{
    p: 4,
    borderRadius: 4,
  }}
>

  <Typography
    variant="h4"
    fontWeight="bold"
    mb={3}
  >
    Order Details
  </Typography>
        <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:2
        }}
      />


  {/* Purchased Items */}

  <Typography
    variant="h6"
    fontWeight="bold"
    mb={2}
  >
    Purchased Items
  </Typography>
      <Box
        sx={{
          my:1
        }}
      />

  <Stack spacing={2} mb={3}>

    {order.orderItems.map((item) => (

      <Box
        key={item.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
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
        
        <Typography >

          {item.quantity} × {item.productName}

        </Typography>
        </Box>

        <Typography fontWeight="bold">

          ${item.subTotal}

        </Typography>

      </Box>

    ))}

  </Stack>

      <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:2
        }}
      />

  {/* Price Summary */}

  <SummaryRow
    title="Subtotal"
    value={`$${order.totalPrice}`}
  />

  <SummaryRow
    title="Shipping"
    value="$0"
  />

  <SummaryRow
    title="Tax"
    value="$0"
  />

  <Divider sx={{ my: 2 }} />

  <SummaryRow
    title="Total"
    value={`$${order.totalPrice}`}
    bold
  />

</Card>

           

          </Box>

        </Stack>

      </Card>

    </Box>
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        message="Order Confirmed Successfully" />
    </>
  );

}

function SummaryRow({title,value,bold = false,}) {

  return (

    <Box
    sx={{
      display:"flex",
      justifyContent:"space-between",
      alignItems : "center",
      py: 1
      }}
    >

      <Typography
        fontWeight={bold ? 700 : 400}
      >
        {title}
      </Typography>

      <Typography
        fontWeight={bold ? 700 : 400}
      >
        {value}
      </Typography>

    </Box>

  );

}