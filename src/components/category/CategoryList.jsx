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
          p: 4,
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
        <Box
        
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "27px",
                justifyContent: "center"
                
                
            }}
        >
            

            {categories.map(category => (

                <CategoryCard
                    key={category.id}
                    category={category}
                />

            ))}

        </Box>
        </Card>
    );
}

export default CategoryList;