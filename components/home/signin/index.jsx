import { Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Snackbar, TextField, Typography, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { SignInWithEmailAndPassword } from '../../../auth'

export default function SignIn() {
    const [error, setError] = useState(false);
    const [role, setRole] = useState('USER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const toggleRole = () => {
        role === 'ADMIN' ? setRole('USER') : setRole('ADMIN');
    }

    const createNewUser = async () => {
        if (!(email && password)) {
            setError({
                errorCode: 'emptyfields',
                errorMessage: 'All fields are required'
            })
            setOpen(true);
            return;
        };
        const response = await SignInWithEmailAndPassword(email, password);
        if (response?.error) {
            setError(response.error)
            setOpen(true);
            return;
        };
    }

    useEffect(() => {
        role === 'ADMIN' ? (
            setEmail('shubhmkushwaha10@gmail.com'),
            setPassword('somepassword')
        )
            : null;
    })
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={() => { setOpen(false) }}
                autoHideDuration={3000}
            >
                <Alert severity='error'>
                    {error?.errorMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ width: '100%', minHeight: 350, maxWidth: 350, display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', padding: '3rem', justifyContent: 'space-around' }}>
                    <Typography variant='h6' gutterBottom color='text.primary'>Sign In</Typography>
                    <FormGroup >
                        <TextField
                            id='signin-email'
                            disabled={role === 'ADMIN'}
                            value={role === 'ADMIN' ? 'shubhmkushwaha10@gmail.com' : email}
                            label='email'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id='signin-password'
                            disabled={role === 'ADMIN'}
                            value={role === 'ADMIN' ? 'somepassword' : password}
                            label='password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel control={<Checkbox checked={role === 'ADMIN'} onChange={toggleRole} />} label="Sign In as Admin" />
                        <br />
                        <Button onClick={createNewUser}>Sign In</Button>
                    </FormGroup>
                </Paper>
            </Box>
        </>

    )
}
