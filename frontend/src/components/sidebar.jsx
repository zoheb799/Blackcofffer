import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GetAppIcon from '@mui/icons-material/GetApp';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #4a148c, #7b1fa2)',
          color: '#fff'
        },
      }}
    >
      <Toolbar>
        <Typography variant="h5" noWrap sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textAlign: 'center', width: '100%' }}>
          Dashboard
        </Typography>
      </Toolbar>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          sx={{
            color: '#e1bee7', 
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#e1bee7' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ '& .MuiTypography-root': { fontFamily: 'Roboto, sans-serif', fontWeight: '500' } }} />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/postdata" 
          sx={{
            color: '#e1bee7', 
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#e1bee7' }}>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Post Data" sx={{ '& .MuiTypography-root': { fontFamily: 'Roboto, sans-serif', fontWeight: '500' } }} />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/getdata" 
          sx={{
            color: '#e1bee7', 
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#e1bee7' }}>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Get Data" sx={{ '& .MuiTypography-root': { fontFamily: 'Roboto, sans-serif', fontWeight: '500' } }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
