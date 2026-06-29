import { useEffect, useState } from "react";
import {Box,Card,Typography,Stack,Button,LinearProgress,} from "@mui/material";
import OrderCard from "../components/OrderCard"
import { useNavigate } from "react-router-dom";
import { getOrderStatus } from "../api/orderService";
import paymentSuccess from "../assets/payment_success.jpg";
import paymentFailed from "../assets/payment_failed.jpg";
import paymentPinding from"../assets/payment_pending.jpg"
import { useParams } from "react-router-dom";
function PaymentPage() {
  let title;
let description;
let image;
let buttonText;
let buttonAction;
  const orderId = localStorage.getItem("currentOrderId");
  const [status, setStatus] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
  
      const loadStatus = async () => {
    
        const data =
          await getOrderStatus(orderId);
  
        setStatus(data);
  
      };
  
      loadStatus();
  
    }, []);
    if(status == null){

return(

<Box>

<LinearProgress/>

<Typography>

Checking payment...

</Typography>

</Box>

);

}
    switch(status){

case "PAID":

title = "Payment Successful";

description =
"Your order has been placed successfully.";

image = paymentSuccess;

buttonText = "Continue Shopping";

buttonAction = () => navigate("/home");

break;

case "FAILED":

title = "Payment Failed";

description =
"Your payment couldn't be completed. Please try again.";

image = paymentFailed;

buttonText = "Try Again";

buttonAction =
() => navigate("/orders");

break;

case "PENDING":

title = "Processing Payment";

description =
"We're still waiting for confirmation from the payment gateway.";

image = paymentPending;

buttonText = "Refresh";

buttonAction =
() => window.location.reload();

break;

case "OUT_OF_STOCK":

title = "Item Out Of Stock";

description =
"Unfortunately one or more items became unavailable before payment completed.";

image = paymentFailed;

buttonText = "Back To Cart";

buttonAction =
() => navigate("/cart");

break;

default:

title = "Checking Payment...";

description =
"Please wait while we verify your payment.";

image = paymentPending;

buttonText = "Home";

buttonAction =
() => navigate("/home");

}
    
      return (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            bgcolor: "#fff",
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
              src={image}
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
              flex: 1,
              boxShadow: 0,
              borderRadius: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                {title}
              </Typography>
    
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 5,
                }}
              >
                    {description}             
               </Typography>
    
              <Button
                variant="contained"
                size="large"
                onClick={buttonAction}
                sx={{
                  width: "100%",
                  py: 1.8,
                  borderRadius: "30px",
                  fontSize: 18,
                  textTransform: "none",
                  backgroundColor : "black"
                }}
              >
                {buttonText}
              </Button>
            </Box>
          </Card>
        </Box>
      );
    }
  


export default PaymentPage;