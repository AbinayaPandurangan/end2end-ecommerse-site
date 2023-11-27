import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";


export default function BasketPage(){
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    if (!basket) return <Typography variant='h3'>Your Basket is empty</Typography>
    

    return (
      <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Sub-Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight:20}}/>
                  <span>{item.name}</span>
                </Box>
                
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={status==='pendingRemoveItem' + item.productId +'rem'} color='primary' onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name:'rem'}))}><Remove/></LoadingButton>
                {item.quantity}
                <LoadingButton loading={status==='pendingAddItem' + item.productId} color='primary' onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}><Add/></LoadingButton>
                </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
              <TableCell align="right">
              <LoadingButton loading={status==='pendingRemoveItem' + item.productId + 'del'} color='primary' onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))}><Delete/></LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
    <Grid item xs={6}></Grid>
    <Grid item xs={6}><BasketSummary/>
    <Button component={Link} to='/checkout'
    variant = 'contained' size='large' fullWidth>Checkout</Button>
    </Grid>
  
    </Grid>
    </>
    )

}