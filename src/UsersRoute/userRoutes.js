import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { TimeProvider } from '../Components/TimeContext';
import Home from '../Components/Home';

import EmailTemplate from '../Components/EmailTemplate';
import AddEmail from '../Components/AddEmail';
// import Navbar from '../Components/Navbar';
import Navbar from '../Components/Navbar';
import TableComponent from '../Components/TableComponent';
// import SignupPage from '../Components/SignUp';

 import {TeamProvider} from '../Components/TeamProvider';

const UserRoutes = () => {
  return (
   
    <TimeProvider>
     <TeamProvider>
      <Navbar />
   
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/scmtracker" element={<TableComponent/>} />
          {/* <Route path="/signup" element={< SignupPage/>} /> */}
          <Route path="/emailtemplate" element={<EmailTemplate />} />
          <Route path="/addemail" element={<AddEmail />} />
          
        </Routes>
        </TeamProvider>
      </TimeProvider>
    
  )
}

export default UserRoutes