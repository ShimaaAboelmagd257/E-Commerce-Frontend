import {Box,Typography} from "@mui/material";

export default function SummaryRow({
    title,
    value,
    bold=false,
    color="black"
}){

    return(

        <Box
            sx={{
                display:"flex",
                justifyContent:"space-between",
                mb:2
            }}
        >

            <Typography
                color="text.secondary"
                fontWeight={bold ? 700 : 400}
            >
                {title}
            </Typography>

            <Typography
                fontWeight={bold ? 700 : 500}
                color={color}
            >
                ${value}
            </Typography>

        </Box>

    );

}