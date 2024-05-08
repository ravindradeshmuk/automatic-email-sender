import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const UpdateResource = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://autoapi.cardzpay.com/api/user/asignresource/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const updatedResource = { 'Assigned Resource': editData['Assigned Resource'] };

      // Ensure editData._id is not undefined
      if (!editData._id) {
        console.error('ID is undefined.');
        return;
      }

      await axios.patch(`https://autoapi.cardzpay.com/client/data/updateAssignedResource/${editData._id}`, updatedResource);

      const updatedData = data.map(item => {
        if (item._id === editData._id) {
          return { ...item, 'Assigned Resource': editData['Assigned Resource'] };
        }
        return item;
      });

      setData(updatedData);
      setOpen(false); // Assuming this is meant to close a modal or similar
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };



  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: '100px', maxWidth: '650px', marginLeft: '200px', marginRight: '200px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#151744' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Site Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Assigned Resource</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '' }} >
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row['Site Name']}</TableCell>
                <TableCell>
                  <div style={{display:'flex',alignItems:'left'}}>
                    <div style={{ flex: 1,marginLeft:'0px' }}>
                      {row['Assigned Resource']}
                    </div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{
                        marginRight: '40px'

                      }}
                      onClick={() => { setOpen(true); setEditData(row); }}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Assigned Resource</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Assigned Resource"
            type="text"
            fullWidth
            variant="standard"
            value={editData['Assigned Resource'] || ''}
            onChange={(e) => setEditData({ ...editData, 'Assigned Resource': e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateResource;