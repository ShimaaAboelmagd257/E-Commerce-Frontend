import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function CategoryCard({ category }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() =>
         navigate(`/categories/${category.id}`)
        }
            sx={{
                width: 450,
                borderRadius: 4,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-5px)"
                }
            }}
        >
            <CardMedia
                component="img"
                height="450"
                image={`${API_BASE_URL}${category.image}`}   
                alt={category.name}
            />

            <CardContent>
                <Typography
                    variant="h5"
                    align="center"
                    fontWeight="bold"

                >
                    {category.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;