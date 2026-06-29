import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../api/productService";

function CategoryProduct() {

    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const response = await getProductsByCategory( categoryId );
                setProducts( response.content);
            } catch(error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (

        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                padding: "30px"
            }}
        >

            {products.map(product => (

                <ProductCard
                    product={product}
                />

            ))}

        </div>

    );
}

export default CategoryProduct;