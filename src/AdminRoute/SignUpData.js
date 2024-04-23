import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

const SignUpData = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleReject = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/user/api/users/${userId}`);
      // Update local state or fetch users again to reflect the changes
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleStatusUpdate = async () => {
    try {
      // Make API call to update status
      await axios.put(`http://localhost:3000/user/api/users/${selectedUserId}`, { status: statusToUpdate });
      
      // Update the local state with the new status
      setUsers(users.map(user => {
        if (user._id === selectedUserId) {
          return { ...user, status: statusToUpdate };
        }
        return user;
      }));
      
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredUsers = filter === 'pending' ? users.filter(user => user.status === 'pending') : users;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <RadioGroup row value={filter} onChange={(e) => setFilter(e.target.value)}>
        <FormControlLabel value="pending" control={<Radio />} label="Pending Approval" />
        <FormControlLabel value="all" control={<Radio />} label="All Users" />
      </RadioGroup>
      <Table style={{ borderCollapse: 'collapse', border: '1px solid black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '20px 0', textAlign: 'center' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Serial No.</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold'  }}>First Name</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold'  }}>Email</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold'  }}>Status</TableCell>
            {filter === 'pending' && <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold'  }}>Actions</TableCell>}
            {filter !== 'pending' && <TableCell style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold'  }}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell style={{ border: '1px solid black', padding: '10px' }}>{index + 1}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '10px' }}>{user.firstName}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '10px' }}>{user.lastName}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '10px' }}>{user.email}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '10px' }}>{user.status}</TableCell>
              {filter === 'pending' && (
                <TableCell style={{ border: '1px solid black', padding: '10px' }}>
                  <Button onClick={() => handleApprove(user._id)} variant="contained" color="primary" style={{ margin: '5px' }}>Approve</Button>
                  <Button onClick={() => handleReject(user._id)} variant="contained" color="secondary" style={{ margin: '5px' }}>Reject</Button>
                  <Button onClick={() => handleDelete(user._id)} variant="contained" color="secondary">Delete</Button>
                </TableCell>
              )}
              {filter !== 'pending' && (
                <TableCell style={{ border: '1px solid black', padding: '10px' }}>
                  <Button onClick={() => handleApprove(user._id)} variant="contained" color="primary" style={{ margin: '5px' }}>Approve</Button>
                  <Button onClick={() => handleReject(user._id)} variant="contained" color="secondary" style={{ margin: '5px' }}>Reject</Button>
                  <Button onClick={() => handleDelete(user._id)} variant="contained" color="secondary">Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Status"
            type="text"
            fullWidth
            value={statusToUpdate}
            onChange={(e) => setStatusToUpdate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUpData;
