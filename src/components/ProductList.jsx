import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

import ProductCard from "./ProductCard";
import { getProducts } from "../api/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import {Card,Typography,Box}from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
function ProductList() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

useEffect(() => {
    if (products.length === 0) return;

    const shuffled = [...products].sort(() => Math.random() - 0.5);

    setNewArrivals(shuffled.slice(0, 5));
    setBestSellers(shuffled.slice(6, 10));
}, [products]);

    const ProductSwiper = ({ title, products }) => (
    <>

        <Typography
            variant="h4"
            sx={{
                mt: 5,
                mb: 2,
                fontWeight: "bold",
            }}
        >
            {title}
        </Typography>

        <Swiper
            modules={[Navigation]}
            spaceBetween={2}
            slidesPerView={3.5}
            navigation
            breakpoints={{
                0: { slidesPerView: 1.2 },
                600: { slidesPerView: 2.2 },
                900: { slidesPerView: 3.2 },
                1200: { slidesPerView: 4 },
            }}
        >
            {products.map(product => (
                <SwiperSlide key={product.id}>
                    <ProductCard product={product}/>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await getProducts(
                    page - 1,
                    10
                );

                setProducts(response.content);
                setTotalPages(response.totalPages);
                console.log(response.content);

            } catch (error) {

                console.error(error);

            }

        };

        fetchProducts();

    }, [page]);

    return (
        
        <>  
        <Box
    sx={{
        mt: 3,
        minHeight:"100vh",
        p:4,
    }}
>
 <Box sx={{width: "100%",py:2, mb: 6 }}>
    <ProductSwiper
        title="🆕 New Arrivals"
        products={newArrivals}
    />
</Box>

<Box sx={{ mb: 6 }}>
    <ProductSwiper
        title="⭐ Best Sellers"
        products={bestSellers}
    />
</Box>

        <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    mb:"6"
                }}
            >
                Explore 
            </Typography>
         <Box
    sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mt: 3,
        padding:"10px"
    }}
>

                {products.map(product => (
                    <ProductCard
                        product = {product}
                    />
                ))}
            </Box>
                  <Box
        sx={{
          borderBottom:"1px solid #ddd",
          my:3
        }}
      />

            <div
                style={{
                    display: "flex",
                    marginBottom: "40px",
                    justifyContent: "center",

                }}
            >
            <p style={{ textAlign: "center" }}>
                Showing {products.length} products
            </p>
                <Pagination
                    count={totalPages}
                    page={page}
                    color="primary"
                    onChange={(event, value) => {
                        setPage(value);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}
                />
            </div>
            </Box>
        </>
    );
}

export default ProductList;