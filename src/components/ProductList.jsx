import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

import ProductCard from "./ProductCard";
import { getProducts } from "../api/productService";

function ProductList() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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
        </>
    );
}

export default ProductList;