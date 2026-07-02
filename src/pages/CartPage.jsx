import {useEffect, useState}from "react";
import {Card,Typography,Box,Divider}from "@mui/material";
import {getCartById, getCartByUserId,removeCartItem,updateCartItemQauntity}from "../api/cartService";
import CartItemCard from "../components/CartItemCard";
import { createOrderFromCart } from "../api/orderService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/emptycart.jpg";

import SummaryRow from "../components/SummaryRow"
export default function CartPage()
{

    const [cart,setCart] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleDecrease = async (item) => {

    try {

        if (item.quantity === 1) {
            return;
        }

        const updatedCart = await updateCartItemQuantity(
            cart.id,
            item.productId,
            item.quantity - 1
        );

        setCart(updatedCart);

    } catch (error) {

        console.error(error);

    }

};
const handleIncrease = async (item) => {

    try {

        const updatedCart = await updateCartItemQuantity(
            cart.id,
            item.productId,
            item.quantity + 1
        );

        setCart(updatedCart);

    } catch (error) {

        console.error(error);

    }

};
    const handleCheckout = async () => {
    
    const order =await createOrderFromCart(cart.id);
    navigate(`/orders` );
    };
const handleRemoveCartItem = async (productId) => {

    try {


        const updatedCart = await removeCartItem(
            cart.id,
            productId
        );

        setCart(updatedCart);

    } catch (error) {

        console.error(error);

    }

};
    useEffect(() => {

        const loadCart = async () => {
            console.log(user.id);
            if (!user.id) {return;}
        try {
            const cart = await getCartByUserId(user.id);
            setCart(cart);

        } catch (error) {
            console.error(error);
        }
    };
     console.log("cart");

     console.log(cart);

        loadCart();

    },[]);

    if (!cart || cart.items.length === 0) {
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
          src={emptyCart}
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
            Your Cart is Empty
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 5,
            }}
          >
            Looks like you haven't added any products yet.
            <br />
            Start shopping to fill your cart.
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
        width:"100%",
        mt:5,
        px:4
    }}
>

    <Typography
        variant="h3"
        sx={{
            mb:4,
            fontWeight:300,
            letterSpacing:2
        }}
    >
        YOUR CART
    </Typography>

    <Box
        sx={{
            display:"flex",
            gap:4,
            alignItems:"flex-start"
        }}
    >

        {/* LEFT */}

        <Box sx={{flex:2}}>
            

            {cart.items.map(item=>(
                <CartItemCard
                    key={item.productId}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onDelete={handleRemoveCartItem}
                />
            ))}

        </Box>

        {/* RIGHT */}

        <Card
            sx={{
                flex:1,
                p:4,
                borderRadius:5,
                boxShadow:0,
                border:"1px solid #ddd"
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Order Summary
            </Typography>
            <Box
                sx={{
                    my:3
                }}
            />


            <SummaryRow
                title="Subtotal"
                value={cart.totalPrice}
            />

            <SummaryRow
                title="Discount"
                value={0}
                color="red"
            />

            <SummaryRow
                title="Delivery Fee"
                value={15}
            />

            <Box
                sx={{
                    borderBottom:"1px solid #ddd",
                    my:3
                }}
            />

            <SummaryRow
                title="Total"
                value={cart.totalPrice +15}
                bold
                
            />

            <Box sx={{mt:4}}>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCheckout}
                    sx={{
                        height:55,
                        borderRadius:8,
                        bgcolor:"black",
                        textTransform:"none",
                        fontSize:18,

                        "&:hover":{
                            bgcolor:"#222"
                        }
                    }}
                >
                    Go To Checkout →
                </Button>

            </Box>

        </Card>

    </Box>

</Box>

);
}