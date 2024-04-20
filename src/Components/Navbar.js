import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment-timezone';
import CreateUser from './CreateUser';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentEstDateTime, setCurrentEstDateTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const nowInEst = moment.tz('America/New_York').format('MM/DD/YYYY hh:mm:ss A');
      setCurrentEstDateTime(nowInEst);
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginDialogToggle = () => {
    setLoginDialogOpen(!loginDialogOpen);
  };

  const pages = ['Home', 'SCM Tracker'];

  const drawer = (
    <div>
      <List>
        {pages.map((text) => (
          <ListItem button component={Link} to={`/${text.replace(/\s+/g, '').toLowerCase()}`} key={text} onClick={handleDrawerToggle}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: '#2F2257', color: '#fff' }}>
      <Toolbar>
          <Typography sx={{ flexGrow: 1, textAlign: 'left' }}>
            Date and Time (EST): {currentEstDateTime}
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#fff !important' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
                Automated Email Sender
              </Typography>
              <Button color="inherit" onClick={handleLoginDialogToggle}>Login</Button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', flexGrow: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', color: 'white' }}>
                  Automated Email Sender
                </Typography>
              </div>
              <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', gap: '20px' }}>
                {pages.map((text) => (
                  <Button color="inherit" component={Link} to={`/${text.replace(/\s+/g, '').toLowerCase()}`} key={text}>
                    {text}
                  </Button>
                ))}
                <Button color="inherit" onClick={handleLoginDialogToggle}>Login</Button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: '#2F2257' },
        }}
      >
        {drawer}
      </Drawer>
      <CreateUser isOpen={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </div>
  );
};

export default Navbar;
