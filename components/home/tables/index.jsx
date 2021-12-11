import React, { useEffect, useState } from 'react'
import { Box, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'id', headerName: 'Sr. No.' },
    { field: 'datetime', headerName: 'Date Time', width: 300 },
    { field: 'open', headerName: 'Stock Open', width: 300 },
    { field: 'high', headerName: 'Stock High', width: 300 },
    { field: 'low', headerName: 'Stock Low', width: 300 },
    { field: 'close', headerName: 'Stock Close', width: 300 },
    { field: 'volume', headerName: 'Stock Volume', width: 300 },
];




export const GetStockData = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=2RDG8P2VJNWD4HK5';
    useEffect(async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setResponse(json);
            console.log(json);
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
    const [rows, setRows] = useState([]);
    const createData = () => {
        const timeSeries = data['Time Series (60min)'];
        let count = 1;
        timeSeries && Object.keys(timeSeries).map((time, id1) => {
            const dateTime = timeSeries[time];
            rows.push({
                id: count,
                datetime: time,
                open: dateTime['1. open'],
                high: dateTime['2. high'],
                low: dateTime['3. low'],
                close: dateTime['4. close'],
                volume: dateTime['5. volume'],
            })
            count += 1;
        })
    }
    data && createData();
    return (

        <Box sx={{ textAlign: 'center', minHeight: 350 }}>
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
            {
                loading ? <CircularProgress size={32} /> :
                    <>
                        <Box sx={{ height: 800 }}>
                            <br />
                            <Typography gutterBottom>Stock Values of IBM (USD)</Typography>
                            <DataGrid columns={columns} rows={rows} />
                        </Box>
                    </>
            }

        </Box>


    )
}


const dt = new Date();
dt.getUt