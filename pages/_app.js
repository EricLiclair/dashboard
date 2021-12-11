import '../styles/globals.css';
import '../firebase/config';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import themeOptions from '../theme/themeOptions';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { UserContext } from '../context/userContext';
import { GetUser } from '../utils';

const auth = getAuth();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          ...user,
          ...await GetUser(user.uid)
        });
      }
      else {
        setUser(null);
      }
    })
  }, []);


  return (
    <ThemeProvider theme={themeOptions}>
      <UserContext.Provider value={{ user }}>
        <Box sx={{ backgroundColor: 'background.default', padding: '1rem', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Component {...pageProps} />
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp;
