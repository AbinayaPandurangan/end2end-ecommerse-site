import {  Button, Grid,  Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import Notfound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/baskets";
import { Order } from "../../app/models/order";

import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

export default function OrderDetails() {

    const [orderDetails, setOrderDetails] = useState<Order>();
    const [loading, setLoading] = useState(true);
    const {id} = useParams<{id: string}>();

    
    useEffect(() => {
        if (id) 
        {agent.Orders.fetch(parseInt(id))
        .then(details => setOrderDetails(details))
        .catch((error) => console.log(error))
        .finally (() => setLoading(false))}

    }, [id])

    if (loading) return <LoadingComponent message="Loading Order Details ..." />
    if (!orderDetails) return <Notfound />

    const subtotal = orderDetails?.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);


    return (
        <>
         <Grid container spacing={2} sx={{marginBottom:2, marginTop:2, p:2}} display='flex'>
    <Grid item xs={9}><Typography variant='h6'>Order#{orderDetails?.id} - {orderDetails?.orderStatus}</Typography></Grid>
    <Grid item xs={3} justifyContent='right'><Button component = {Link} to={'/orders'} variant="contained">Back to Orders</Button></Grid>
    </Grid>
    
    <Grid container>
    <Grid item xs={12}>
   <BasketTable items={orderDetails.orderItems as BasketItem[]} isBasket={false}/>
    </Grid>
    <Grid item xs={6} sx={{marginTop:2, p: 2}}>
   
        <Typography variant='h6'>Shipping Address</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.fullName}</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.address1}</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.address2}</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.city}</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.zip}</Typography>
        <Typography variant="body1">{orderDetails?.shippingAddress.state},{orderDetails?.shippingAddress.country}</Typography>
        
    </Grid>
    <Grid item xs={6}>
   <BasketSummary subtotal={subtotal}/>
    </Grid>
    </Grid>
           
        </>
        
    )
}