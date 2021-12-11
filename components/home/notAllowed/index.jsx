import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { SignOut } from '../../../auth'

export default function NotAllowed() {
    return (
        <Box sx={{ width: '100%', }} textAlign='left'>
            <Typography variant='h3' component='div' gutterBottom>Restricted Access</Typography>
            <Typography variant='h5' component='a'>Profiles with <Typography fontWeight={600} color='primary' variant='inherit' component='a'>USER</Typography> role are not allowed to access the dashboard</Typography>
            <Typography variant='body1' component='div' gutterBottom>Request an <Typography fontWeight={600} color='primary' variant='inherit' component='a'>ADMIN</Typography> to raise your role</Typography>
            <br />
            <Button onClick={SignOut}>Sign Out</Button>
        </Box>
    )
}
