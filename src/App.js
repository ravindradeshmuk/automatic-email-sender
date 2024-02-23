// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimeProvider } from './Components/TimeContext'; // Note the named import
import Home from './Components/Home';
import Cancellation from './Components/Cancellation';
import EmailTemplate from './Components/EmailTemplate';
import AddEmail from './Components/AddEmail';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <TimeProvider> {/* Use TimeProvider here */}
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/emailtemplate" element={<EmailTemplate />} />
          <Route path="/addemail" element={<AddEmail />} />
          {/* Additional routes */}
        </Routes>
      </TimeProvider>
    </Router>
  );
}

export default App;
