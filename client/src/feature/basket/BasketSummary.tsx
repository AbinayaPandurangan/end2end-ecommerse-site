import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/useStoreContext";
import { currencyFormat } from "../../app/util/util";
//import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const {basket} = useStoreContext()
    const subTotalCalc = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);


    const subtotal = subTotalCalc? currencyFormat(subTotalCalc): 0;
    const deliveryFee = (subTotalCalc !== undefined && (subTotalCalc/100) > 100 ) ? 0 : 500; 

    const total = currencyFormat((subTotalCalc? subTotalCalc : 0 )+ deliveryFee)
    
    

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}