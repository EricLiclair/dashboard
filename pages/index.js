import { Button, Fab, Paper, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Graph, SignIn, TabularData } from '../components/home';
import { SignOut } from '../auth';
import { StyledTab, StyledTabs } from '../theme/components';
import NotAllowed from '../components/home/notAllowed';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Home() {
  const { user } = useContext(UserContext);

  // Can take only 0 or 1
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const views = {
    0: <TabularData />,
    1: <Graph />
  }
  return user ? (
    user.role === 'ADMIN' ? (
      <Box sx={{ height: '100%', width: '100%' }}>

        <StyledTabs
          value={value}
          onChange={handleChange}
        >
          <StyledTab label="Table" />
          <StyledTab label="Graph" />
          <StyledTab disabled label="Disabled" />
        </StyledTabs>

        {views[value]}
        <Fab sx={{ position: 'fixed', top: '1rem', right: '1rem' }} size='medium' variant='circular' color='secondary' onClick={SignOut}>
          <LogoutIcon />
        </Fab>
      </Box>
    ) : <NotAllowed />
  ) : <SignIn />
}
