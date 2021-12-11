import React, { useEffect, useState } from 'react'
import { Box, Snackbar, Alert } from '@mui/material';
export const GetStockData = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=2EWTQJWH507WLYYV';
    useEffect(async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setResponse(json);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setError(error);
            setLoading(false);
        }
    }, [])

    return [response, loading, error];
}

export default function TabularData() {
    const [data, loading, error] = GetStockData();
    const [open, setOpen] = useState(false);
    console.log(data);
    return (
        <Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={() => { setOpen(false) }}
                autoHideDuration={3000}
            >
                <Alert severity='error'>
                    Some thing went wrong
                </Alert>
            </Snackbar>
            Hello
        </Box>
    )
}
