import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: {
    minHeight: 64, // adjust the height to match your AppBar
  },
});

 const  SidebarAdmin=()=>{
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.toolbar} />
    <List>
      <ListItem button component={Link} to="/admindashboard/updateheading">
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Add More Heading" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/addclient')}>
        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
        <ListItemText primary="AddClient" />
      </ListItem>
      
      <ListItem button onClick={() => handleNavigation('/admindashboard/template')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="Template" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/updateresourse')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="Update Resource" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/update-template')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="Get Template" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/sign-up-data')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="User Data" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/all-user')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="All User" />
      </ListItem>
       <ListItem button onClick={() => handleNavigation('/admindashboard/pending-user')}>
        <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
        <ListItemText primary="Pending User" />
      </ListItem>
    </List>
  </Drawer>
);
}
export default SidebarAdmin;