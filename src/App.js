// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserRoutes from './UsersRoute/userRoutes';
import AdminDashboard from './AdminRoute/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        {/* User Dashboard Routes */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admindashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
