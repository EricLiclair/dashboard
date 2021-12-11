import React, { useState, useEffect } from 'react'
import { Select, MenuItem, CircularProgress, Box, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
];


export const GetStockData = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=CNY&apikey=2RDG8P2VJNWD4HK5';
    useEffect(async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const rows = [];
            const timeSeries = json['Time Series (Digital Currency Monthly)'];
            let count = 1;
            timeSeries && Object.keys(timeSeries).map((time, id1) => {
                const dateTime = timeSeries[time];
                // console.log(dateTime)
                rows.push({
                    id: count,
                    datetime: time,
                    open: dateTime['1b. open (USD)'],
                    high: dateTime['2b. high (USD)'],
                    low: dateTime['3b. low (USD)'],
                    close: dateTime['4b. close (USD)'],
                    volume: dateTime['5. volume'],
                    marketCap: dateTime['6. market cap (USD)'],
                })
                count += 1;
            })
            setResponse(rows);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setError(error);
            setLoading(false);
        }
    }, [])

    return [response, loading, error];
}

export default function Graph() {
    const [data, loading, error] = GetStockData();
    console.log(data)
    return (
        <>
            {
                loading ? <CircularProgress size={32} /> :
                    <Box sx={{ height: 800, padding: '1rem' }}>
                        <Paper elevation={0} sx={{ padding: '0 0.5rem', marginTop: '1rem', height: '80vh' }}>
                            <br />
                            <Typography gutterBottom>Stock Values of BTC (USD) over a period of 12 months</Typography>
                            <ResponsiveContainer width='100%' height='80%'>
                                <LineChart width={350} height={350} data={data.slice(0, 12)}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <Legend verticalAlign="bottom" height={16} />
                                    <XAxis dataKey='datetime' />
                                    <Tooltip />
                                    <Line type="monotone" dataKey={'high'} stroke={'#573BFF'} />
                                    <Line type="monotone" dataKey={'low'} stroke={'#00C3F9'} />
                                    <Line type="monotone" dataKey={'close'} stroke={'#0092BB'} />
                                    <Line type="monotone" dataKey={'open'} stroke={'#2B1D7F'} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>

                    </Box>
            }

        </>
    )
}
