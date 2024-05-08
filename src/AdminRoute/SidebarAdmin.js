import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import UpdateIcon from '@mui/icons-material/Update';
import GetAppIcon from '@mui/icons-material/GetApp';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupIcon from '@mui/icons-material/Group';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#151744', // Change background color to blue
    color: 'white', // Change text color to white
    '& .MuiTypography-root': {
      //fontWeight: 'bold', // Make text bold
  },
  },
  toolbar: {
    minHeight: 120, // adjust the height to match your AppBar
  },
  whiteIcon: {
    color: 'white',
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
        <ListItemIcon><DashboardIcon className={classes.whiteIcon}/></ListItemIcon>
        <ListItemText primary="Add More Heading" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/addclient')}>
        <ListItemIcon><AccountCircleIcon className={classes.whiteIcon} /></ListItemIcon>
        <ListItemText primary="AddClient" />
      </ListItem>
      
      <ListItem button onClick={() => handleNavigation('/admindashboard/template')}>
        <ListItemIcon><ViewListIcon className={classes.whiteIcon} /></ListItemIcon>
        <ListItemText primary="Template" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/updateresourse')}>
        <ListItemIcon><UpdateIcon className={classes.whiteIcon} /></ListItemIcon>
        <ListItemText primary="Update Resource" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/update-template')}>
        <ListItemIcon><GetAppIcon className={classes.whiteIcon}/></ListItemIcon>
        <ListItemText primary="Get Template" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/sign-up-data')}>
        <ListItemIcon><ContactsIcon className={classes.whiteIcon}/></ListItemIcon>
        <ListItemText primary="User Data" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/admindashboard/all-user')}>
        <ListItemIcon><GroupIcon className={classes.whiteIcon}/></ListItemIcon>
        <ListItemText primary="All User" />
      </ListItem>
       <ListItem button onClick={() => handleNavigation('/admindashboard/pending-user')}>
        <ListItemIcon><PendingActionsIcon className={classes.whiteIcon}/></ListItemIcon>
        <ListItemText primary="Pending User" />
      </ListItem>
    </List>
  </Drawer>
);
}
export default SidebarAdmin;