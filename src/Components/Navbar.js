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
      const nowInEst = moment.tz('America/New_York').format('MM/DD/YYYY HH:mm:ss');
      setCurrentEstDateTime(nowInEst);
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close drawer when a link is clicked
  const handleDrawerClose = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div>
      <List>
        {['Home', 'Cancellation', 'EmailTemplate', 'AddEmail'].map((text, index) => (
          <ListItem button component={Link} to={`/${text.toLowerCase()}`} key={text} onClick={handleDrawerClose}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: '#2F2257' }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Automated Email Sender
              </Typography>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p style={{ margin: '30px', fontSize: '20px' }}>Date and Time (EST): {currentEstDateTime}</p>
              <Typography style={{ margin: '15px', fontSize: '2rem' }} variant="h6" noWrap component="div">
                Automated Email Sender
              </Typography>
              <List style={{ display: 'flex' }}>
                {['Home', 'Cancellation', 'EmailTemplate', 'AddEmail'].map((text, index) => (
                  <ListItem button component={Link} to={`/${text.toLowerCase()}`} key={text} style={{ color: '#fff' }}>
                    <ListItemText primary={text} />
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
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Navbar;
