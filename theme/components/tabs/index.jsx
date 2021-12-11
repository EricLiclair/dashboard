import React, { useContext } from 'react'
import styled from '@emotion/styled';
import { Tabs, Tab } from '@mui/material';


const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px',
    marginBottom: "2rem",
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '60%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    color: theme.palette.primary.light,
    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export {
    StyledTabs,
    StyledTab
};