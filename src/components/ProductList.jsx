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


    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [specialOffers, setSpecialOffers] = useState([]);

    useEffect(() => {
        if (products.length === 0) return;

        const shuffled = [...products].sort(() => Math.random() - 0.5);

        setFeaturedProducts(shuffled.slice(0, 8));
        setNewArrivals([...shuffled].reverse().slice(0, 8));
        setBestSellers([...shuffled].sort(() => Math.random() - 0.5).slice(0, 8));
        setSpecialOffers([...shuffled].sort(() => Math.random() - 0.5).slice(0, 8));
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
            spaceBetween={20}
            slidesPerView={4}
            navigation
            breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 },
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
        width:"100%",
        mt: 5,
        px: 0,
        padding : "40px"
    }}
>
        <ProductSwiper
        title="🆕 New Arrivals"
        products={newArrivals}
    />

    <ProductSwiper
        title="⭐ Best Sellers"
        products={bestSellers}
    />

    <ProductSwiper
        title="🔥 Featured Products"
        products={featuredProducts}
    />

    <ProductSwiper
        title="💸 Special Offers"
        products={specialOffers}
    />
        <Typography
                variant="h3"
                sx={{
                    mb:4,
                    fontWeight: "bold",
                }}
            >
                Explore 
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    padding: "30px",
                }}
            >

                {products.map(product => (
                    <ProductCard
                        product = {product}
                    />
                ))}
            </div>

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