import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: 40,
    padding: theme.spacing(2), // Add padding
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)', // Add shadow
    backgroundColor: '#fff', // Add background color
    borderRadius: 8, // Add border radius for rounded corners
  },
  textField: {
    marginBottom: theme.spacing(2),
    minWidth: 200, // Set minimum width
  },
  errorText: {
    color: 'red',
    marginBottom: theme.spacing(2), // Add margin to separate error messages
  },
}));

const AddClient = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    'Read Only': 'No',
        'Data Center': 'Azure',
        'Live/Not Live': 'Live',
        'Time Zone Group': 'West',
        'Site Name': '',
        'Code': '',
        'SQL Configuration': 'AO - 3 Replicas',
        'Assigned Resource': '',
        'SCM App Group 1 START': 'Pending',
        'SCM App Group 2 - Complete': 'Pending',
        'SCM App Group 2 - Complete (Enter EST Time in 24h format)':'',
    'SUN Component App Group Complete':'Pending',
    'Patch Reboots Complete (Enter EST Time in 24h format)':'',
    'Patch/Reboots Complete':'Pending',
    'C:/drive cleanup (Cleanup on all servers including Gold Images)':'Pending',
    'Citrix Infra Validation':'Pending',
     'SCM App Validation':'Pending',
    'DB Validation':'Pending',
    'Monitoring ISS/E-Link Validation':'Pending',
    'Monitoring Alerts Validation	':'Pending',
    'Maintenance Mode Disabled':'Pending',
    'Azure VM State Check':'Pending',
  
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const numericFields = [
      'SCM App Group 2 - Complete (Enter EST Time in 24h format)',
      'Patch Reboots Complete (Enter EST Time in 24h format)'
    ];
    const validationErrors = numericFields
      .filter(field => formData[field].trim() !== '' && isNaN(formData[field]))
      .map(field => `${field} must be a number if not empty.`);

    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      throw new Error(validationErrors.join(' '));
    }

    const isAnyFieldEmpty = Object.keys(formData).some(key => !numericFields.includes(key) && formData[key].trim() === '');

    if (isAnyFieldEmpty) {
      setError('All fields are required except the two numeric fields which can be empty.');
      throw new Error('All fields are required except the two numeric fields which can be empty.');
    }

    // Construct data to be sent to the server
    const postData = { ...formData };
      const response = await fetch('https://autoapi.cardzpay.com/api/user/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData), // Send postData instead of formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
  
      setFormData({
        'Read Only': 'No',
        'Data Center': 'Azure',
        'Live/Not Live': 'Live',
        'Time Zone Group': 'West',
        'Site Name': '',
        'Code': '',
        'SQL Configuration': 'AO - 3 Replicas',
        'Assigned Resource': '',
        'SCM App Group 1 START': 'Pending',
        'SCM App Group 2 - Complete': 'Pending',
        'SCM App Group 2 - Complete (Enter EST Time in 24h format)':'',
    'SUN Component App Group Complete':'Pending',
    'Patch Reboots Complete (Enter EST Time in 24h format)':'',
    'Patch/Reboots Complete':'Pending',
    'C:/drive cleanup (Cleanup on all servers including Gold Images)':'Pending',
    'Citrix Infra Validation':'Pending',
     'SCM App Validation':'Pending',
    'DB Validation':'Pending',
    'Monitoring ISS/E-Link Validation':'Pending',
    'Monitoring Alerts Validation	':'Pending',
    'Maintenance Mode Disabled':'Pending',
    'Azure VM State Check':'Pending',
  
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div className={classes.formContainer}>
      {error && <div className={classes.errorText}>{error}</div>}
      {Object.entries(formData).map(([label, value]) => (
        <TextField
          key={label}
          className={classes.textField}
          label={label}
          value={value}
          onChange={handleChange}
          name={label}
          fullWidth
        />
      ))}
    
      
      {/* Add similar TextField components for other fields */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
}

export default AddClient;
