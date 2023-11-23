import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/useStoreContext";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";


export default function BasketPage(){
    const {basket, setBasket , removeItem} = useStoreContext();
    const [status, setStatus] = useState({
      loading: false,
      name: ''
    })
    if (!basket) return <Typography variant='h3'>Your Basket is empty</Typography>

    function handleAddItem(productId: number, name: string){
      setStatus({loading: true, name});
      agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error=> console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string){
      setStatus({loading: true, name});
      agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error=> console.log(error))
      .finally(() => setStatus({loading: false, name: ''}))
    }


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
                <LoadingButton loading={status.loading && status.name === 'remove' + item.productId} color='primary' onClick={() => handleRemoveItem(item.productId,1 ,'remove' + item.productId)}><Remove/></LoadingButton>
                {item.quantity}
                <LoadingButton loading={status.loading && status.name === 'add'+ item.productId} color='primary' onClick={() => handleAddItem(item.productId, 'add' + item.productId)}><Add/></LoadingButton>
                </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
              <TableCell align="right">
              <LoadingButton loading={status.loading && status.name === 'del' + item.productId} color='primary' onClick={() => handleRemoveItem(item.productId, item.quantity , 'del' + item.productId)}><Delete/></LoadingButton>
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