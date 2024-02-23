import React, { useState,useContext } from 'react';
import { Radio, RadioGroup, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, withStyles } from '@material-ui/core';
import TimeContext from './TimeContext';
// Initial mock data for the clients, with a 'time' field added
const initialClients = [
  { id: 1, name: 'Internal stakeholders', zone: 'east', emailSent: 'NA', lastStatus: 'Planned', time: '12:00 PM' },
  { id: 2, name: 'Atlantic General', zone: 'east', emailSent: 'NA', lastStatus: 'Started', time: '1:00 PM' },
  { id: 3, name: 'Baptist Healthcare', zone: 'west', emailSent: 'NA', lastStatus: 'Completed', time: '2:00 PM' },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: '1px solid #ddd',
  },
  body: {
    fontSize: 14,
    border: '1px solid #ddd',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const EmailStatusLabel = withStyles({
  root: {
    marginRight: '10px',
  },
})(Button); // Using Button for the sake of visual consistency, but it's purely for label purposes here.

const Home = () => {
  const currentEstTime = useContext(TimeContext);
  // console.log(currentEstTime)
  const [selectedZone, setSelectedZone] = useState('east');
  const [clients, setClients] = useState(initialClients);
  const [selectedClients, setSelectedClients] = useState([]);

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedClients = clients.filter(client => client.zone === selectedZone).map(n => n.id);
      setSelectedClients(newSelectedClients);
    } else {
      setSelectedClients([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedClients.indexOf(id);
    let newSelected = [...selectedClients];

    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedClients(newSelected);
  };

  const isSelected = (id) => selectedClients.includes(id);

  const updateClientStatus = (id, action) => {
    const updatedClients = clients.map(client => {
      if (client.id === id) {
        switch (action) {
          case 'send':
            return { ...client, emailSent: 'Sent' };
          case 'discard':
            return { ...client, emailSent: 'Discarded' };
          case 'reject':
            return { ...client, emailSent: 'Rejected' };
          case 'fetch':
            return { ...client, emailSent: 'NA' };
          default:
            return client;
        }
      }
      return client;
    });
    setClients(updatedClients);
  };

  // Function to determine the label color based on the email status
  const getLabelColor = (emailSentStatus) => {
    switch (emailSentStatus) {
      case 'Sent':
        return 'primary';
      case 'Discarded':
        return 'secondary';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <h1>SCM Patching Notification</h1>
      <RadioGroup row value={selectedZone} onChange={handleZoneChange}>
        <FormControlLabel value="east" control={<Radio />} label="East zone client" />
        <FormControlLabel value="west" control={<Radio />} label="West zone client" />
      </RadioGroup>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedClients.length > 0 && selectedClients.length < clients.filter(client => client.zone === selectedZone).length}
                  checked={selectedClients.length === clients.filter(client => client.zone === selectedZone).length}
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              <StyledTableCell><b>Client Name</b></StyledTableCell>
              <StyledTableCell><b>Time Stamp</b></StyledTableCell>
              <StyledTableCell><b>Last Status</b></StyledTableCell>
              <StyledTableCell colSpan={2}><b>Email Administration</b></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {clients.filter(client => client.zone === selectedZone).map((client) => {
              const isItemSelected = isSelected(client.id);
              let emailAdminContent;
              switch (client.emailSent) {
                case 'NA':
                  emailAdminContent = (
                    <>
                      <EmailStatusLabel disabled color="default">Ready to send</EmailStatusLabel>
                      <Button variant="contained" color="primary" onClick={() => updateClientStatus(client.id, 'send')} style={{ marginRight: '10px' }}>Send</Button>
                      <Button variant="contained" color="secondary" onClick={() => updateClientStatus(client.id, 'reject')}>Reject</Button>
                    </>
                  );
                  break;
                case 'Sent':
                  emailAdminContent = (
                    <>
                      <EmailStatusLabel disabled color={getLabelColor(client.emailSent)}>Sent successfully</EmailStatusLabel>
                      <Button variant="contained" onClick={() => updateClientStatus(client.id, 'discard')}>Discard</Button>
                    </>
                  );
                  break;
                case 'Discarded':
                  emailAdminContent = (
                    <>
                      <EmailStatusLabel disabled color={getLabelColor(client.emailSent)}>Disregarded</EmailStatusLabel>
                      <Button variant="contained" onClick={() => updateClientStatus(client.id, 'fetch')}>Fetch</Button>
                    </>
                  );
                  break;
                case 'Rejected':
                  emailAdminContent = (
                    <>
                      <EmailStatusLabel disabled color={getLabelColor(client.emailSent)}>Rejected</EmailStatusLabel>
                      <Button variant="contained" onClick={() => updateClientStatus(client.id, 'fetch')}>Fetch</Button>
                    </>
                  );
                  break;
                default:
                  emailAdminContent = null;
              }

              return (
                <StyledTableRow
                  key={client.id}
                  hover
                  onClick={(event) => handleClick(event, client.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </StyledTableCell>
                  <StyledTableCell>{client.name}</StyledTableCell>
                  <StyledTableCell>{currentEstTime}</StyledTableCell>
                  <StyledTableCell>{client.lastStatus}</StyledTableCell>
                  <StyledTableCell colSpan={2}>{emailAdminContent}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
