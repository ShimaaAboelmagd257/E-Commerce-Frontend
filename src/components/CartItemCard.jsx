import {Card,Box,Typography,IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { API_BASE_URL } from "../../config";



export default function CartItemCard({item,onDelete}){

return(

<Card
sx={{
mb:3,
p:3,
borderRadius:5,
boxShadow:0,
border:"1px solid #ddd"
}}
>

<Box
sx={{
display:"flex",
alignItems:"center"
}}
>

<Box
component="img"
src={`${API_BASE_URL}${item.productImage}`}
sx={{
width:110,
height:110,
objectFit:"cover",
borderRadius:3,
mr:3
}}
/>

<Box sx={{flex:1}}>

<Typography
variant="h6"
fontWeight="bold"
>
{item.productTitle}
</Typography>

<Typography color="text.secondary">
Quantity : {item.quantity}
</Typography>

<Typography
variant="h5"
fontWeight="bold"
mt={2}
>
${item.price}
</Typography>

</Box>

<Box
sx={{
display:"flex",
flexDirection:"column",
alignItems:"flex-end",
justifyContent:"space-between",
height:110
}}
>

<IconButton color="error"
onClick={() => onDelete(item.productId)}
>
<DeleteIcon/>
</IconButton>

<Box
sx={{
display:"flex",
alignItems:"center",
borderRadius:20,
bgcolor:"#f7f7f7",
px:2,
py:.5
}}
>

<IconButton size="small">
<RemoveIcon/>
</IconButton>

<Typography
sx={{
mx:2
}}
>
{item.quantity}
</Typography>

<IconButton size="small">
<AddIcon/>
</IconButton>

</Box>

</Box>

</Box>

</Card>

);

}