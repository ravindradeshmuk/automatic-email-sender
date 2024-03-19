import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AdminHeader from './AdminHeader';
import SidebarAdmin from './SidebarAdmin';
import UpdateHeading from './UpdateHeading';
import AddClient from './AddClient';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    padding: theme.spacing(3),
    marginLeft: '250px', // Space for Sidebar
  },
  toolbar: theme.mixins.toolbar,
}));

export default function AdminDashboard() {
  const classes = useStyles();
  const location = useLocation();

  // You can add additional logic here if needed for specific admin routes
  const isAdminRoute = location.pathname && location.pathname.startsWith('/admin');

  return (
    <div>
      <AdminHeader/>
      {isAdminRoute && <SidebarAdmin />}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {/* Define your admin routes here */}
          <Route path="updateheading" element={<UpdateHeading />} exact />
          <Route path="addclient" element={<AddClient />} exact />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}
