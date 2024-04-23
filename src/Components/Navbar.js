import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import moment from 'moment-timezone';
import axios from 'axios';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [currentEstDateTime, setCurrentEstDateTime] = useState('');
  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    team: '',
    role:'user',
    status:'pending',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [firstName, setFirstName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const tick = () => {
      const nowInEst = moment.tz('America/New_York').format('MM/DD/YYYY hh:mm:ss A');
      setCurrentEstDateTime(nowInEst);
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in
      setIsLoggedIn(true);
      // Fetch user data here if needed
      // For now, just set the first name
      setFirstName(localStorage.getItem('firstName')); // Retrieve first name from localStorage
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginDialogToggle = () => {
    setLoginDialogOpen(!loginDialogOpen);
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/api/login', loginFormData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('firstName', response.data.firstName); // Store first name in localStorage
      setFirstName(response.data.firstName);
      setIsLoggedIn(true);
      setLoginDialogOpen(false);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignupDialogToggle = () => {
    setSignupDialogOpen(!signupDialogOpen);
  };

  const handleSignupFormChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!signupFormData.email.endsWith('@alterahealth.com')) {
        alert('Please use an email address with the domain "@alterahealth.com"');
        return;
      }
      const response = await axios.post('http://localhost:3000/user/api/signup', signupFormData);
      console.log('Signup response:', response.data);
      setSignupFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        team: '',
      });
      setSignupDialogOpen(false);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName'); // Remove first name from localStorage
    setFirstName('');
    setIsLoggedIn(false);
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
              {isLoggedIn && (
                <>
                  <Typography sx={{ color: '#fff', backgroundColor: '#2F2257', padding: '8px', borderRadius: '4px' }}>
                    {firstName}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              )}
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
                {isLoggedIn ? (
                  <>
                    <Typography sx={{ color: 'black',fontSize:'20px', backgroundColor: '#fff', padding: '4px',width:'8rem', borderRadius: '4px',textAlign:'center' }}>
                      {firstName}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" onClick={handleLoginDialogToggle}>Login</Button>
                    <Button color="inherit" onClick={handleSignupDialogToggle}>Sign Up</Button>
                  </>
                )}
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
      <Dialog open={loginDialogOpen} onClose={handleLoginDialogToggle}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            name="email"
            value={loginFormData.email}
            onChange={handleLoginFormChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={loginFormData.password}
            onChange={handleLoginFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogToggle}>Cancel</Button>
          <Button onClick={handleLoginSubmit}>Login</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={signupDialogOpen} onClose={handleSignupDialogToggle}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            name="firstName"
            value={signupFormData.firstName}
            onChange={handleSignupFormChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            name="lastName"
            value={signupFormData.lastName}
            onChange={handleSignupFormChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            name="email"
            value={signupFormData.email}
            onChange={handleSignupFormChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={signupFormData.password}
            onChange={handleSignupFormChange}
          />
          <Select
            value={signupFormData.team}
            onChange={(e) => setSignupFormData(prevState => ({ ...prevState, team: e.target.value }))}
            fullWidth
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">Select Team</MenuItem>
            <MenuItem value="SCM team">SCM App Team</MenuItem>
            <MenuItem value="DB team">DB Team</MenuItem>
            <MenuItem value="Monitoring team">Monitoring Team</MenuItem>
            <MenuItem value="Patching team">Patching Team</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignupDialogToggle}>Cancel</Button>
          <Button onClick={handleSignupSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
