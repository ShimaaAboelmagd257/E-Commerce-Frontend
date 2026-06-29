import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryService";
import CategoryCard from "./CategoryCard";
import {Card,Typography,Box}from "@mui/material";

function CategoryList() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const data = await getCategories();

                console.log(data);

                setCategories(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchCategories();

    }, []);

    return (
        <Card
        sx={{
          mx: "auto",
          borderRadius: 10,
          p: 8,
        }}
      >
            <Typography
                variant="h3"
                sx={{
                    mb:4,
                    fontWeight: "bold",
                }}
            >
                Categories
            </Typography>
        <div
        
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                
            }}
        >
            

            {categories.map(category => (

                <CategoryCard
                    key={category.id}
                    category={category}
                />

            ))}

        </div>
        </Card>
    );
}

export default CategoryList;