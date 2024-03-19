import React, { useState } from 'react';
import { TextField, Button, FormControl,Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import axios from 'axios';

const UpdateHeading = () => {
  const [email, setEmail] = useState('');
  const [options, setOptions] = useState({
    pending: false,
    started: false,
    inProgress: false,
    delayed: false,
    issueDetected: false,
    completed: false,
    NA: false
  });

  const handleChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      email,
     options
    };
    try {
      await axios.post('http://localhost:3000/api/user/api/data', dataToSend);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={{ marginTop: 60, background: '#f9f9f9', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '150px', borderRadius: '5px' }}>
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 id="heading-label">Add Header</h2>
    <TextField
          label="Add heading"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <h2 id="heading-label">Drop Down Option</h2>
         
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={options.pending} onChange={handleChange} name="pending" />}
              label="Pending"
            />
            <FormControlLabel
              control={<Checkbox checked={options.started} onChange={handleChange} name="started" />}
              label="Started"
            />
            <FormControlLabel
              control={<Checkbox checked={options.inProgress} onChange={handleChange} name="inProgress" />}
              label="In Progress"
            />
            <FormControlLabel
              control={<Checkbox checked={options.delayed} onChange={handleChange} name="delayed" />}
              label="Delayed"
            />
            <FormControlLabel
              control={<Checkbox checked={options.issueDetected} onChange={handleChange} name="issueDetected" />}
              label="Issue Detected"
            />
            <FormControlLabel
              control={<Checkbox checked={options.completed} onChange={handleChange} name="completed" />}
              label="Completed"
            />
            <FormControlLabel
              control={<Checkbox checked={options.NA} onChange={handleChange} name="NA" />}
              label="NA"
            />
          </FormGroup>
        </FormControl>
        <Button variant="contained"style={{ marginTop: '100px', alignSelf: 'flex-end' }} onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default UpdateHeading;
