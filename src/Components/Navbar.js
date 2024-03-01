import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment-timezone';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const drawer = (
    <div>
      <List>
        {['Home', 'Cancellation', 'EmailTemplate', 'AddEmail'].map((text) => (
          <ListItem button component={Link} to={`/${text.toLowerCase()}`} key={text} onClick={handleDrawerToggle} sx={{ width: 'auto', justifyContent: 'center', bgcolor: 'inherit' }}>
            <ListItemText primary={text} sx={{ textAlign: 'center', color: '#fff !important' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: '#2F2257 !important', color: '#fff !important' }}>
        <Toolbar>
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
              <Typography variant="h6" noWrap component="div" sx={{ color: '#fff !important', flexGrow: 1, textAlign: 'center' }}>
                Automated Email Sender
              </Typography>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ color: '#fff !important', fontSize: '20px' }}>
                Date and Time (EST): {currentEstDateTime}
              </Typography>
              <Typography sx={{ color: '#fff !important', fontSize: '30px' }} variant="h6" noWrap component="div">
                Automated Email Sender
              </Typography>
              <List style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {['Home', 'Cancellation', 'EmailTemplate', 'AddEmail'].map((text) => (
                  <ListItem button component={Link} to={`/${text.toLowerCase()}`} key={text} sx={{ color: '#fff !important', padding: '0 10px' }}>
                    <ListItemText primary={text} sx={{ color: '#fff !important', textAlign: 'center' }} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: '#2F2257 !important' },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Navbar;
