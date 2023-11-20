import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function About() {
    const [validationError, setValidationError] = useState<string[]>([])

    function getValidationErrors(){
        agent.TestError.getValidationError()
        .then(() => console.log('should not see this'))
        .catch((error) => setValidationError(error))
    }
    return(
        <>
        <Typography variant='h6'>About Page</Typography>
        <Typography variant='h6'>Error testing purpose</Typography>
        <ButtonGroup fullWidth>
            <Button variant='contained' onClick={() => agent.TestError.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
            <Button variant='contained' onClick={() => agent.TestError.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
            <Button variant='contained' onClick={() => agent.TestError.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
            <Button variant='contained' onClick={() => agent.TestError.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
            <Button variant='contained' onClick={getValidationErrors}>Test validation-error</Button>
        </ButtonGroup>
        {validationError.length > 0 &&
        <Alert severity='error'>
            <AlertTitle>Validation Error</AlertTitle>
            <List>
                {validationError.map(error =>(
                    <ListItem key={error}>{error}</ListItem>
                ))}
            </List>
            </Alert>}

        </>
    )
}