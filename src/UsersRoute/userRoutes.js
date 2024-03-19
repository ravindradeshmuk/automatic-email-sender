import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { TimeProvider } from '../Components/TimeContext';
import Home from '../Components/Home';
import Cancellation from '../Components/Cancellation';
import EmailTemplate from '../Components/EmailTemplate';
import AddEmail from '../Components/AddEmail';
// import Navbar from '../Components/Navbar';
import Navbar from '../Components/Navbar';
import TableComponent from '../Components/TableComponent';



const UserRoutes = () => {
  return (
   
    <TimeProvider>
       <Navbar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/teblecompo" element={<TableComponent/>} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/emailtemplate" element={<EmailTemplate />} />
          <Route path="/addemail" element={<AddEmail />} />
          
        </Routes>
      </TimeProvider>
    
  )
}

export default UserRoutes