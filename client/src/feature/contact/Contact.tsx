import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";


export default function Contact() {

    const dispatch = useAppDispatch()
    const {data, title}= useAppSelector((state) => state.counter)
    
    return(
        <>
        <Typography variant='h6'>
            {title}
        </Typography>
        <Typography variant='h6'>
            {data}
        </Typography>
        <ButtonGroup>
            <Button variant = 'contained' onClick={() => dispatch(decrement(1))}>Decrement</Button>
            <Button variant = 'contained' onClick={() => dispatch(increment(1))}>Increment</Button>
            <Button variant = 'contained' onClick={() => dispatch(increment(5))}>Increment by 5</Button>
        </ButtonGroup>
        </>
    )
}