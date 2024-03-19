import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TableContainer,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    width: '100%',
    border: '1px solid #ddd',
  },
  headerCell: {
     backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  alphabetHeaderCell: {
    backgroundColor:'#E3F2FD',
    color: theme.palette.common.black,
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  cell: {
    textAlign: 'center',
    border: '1px solid #ddd',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // maxWidth: 150, // You can adjust this width based on your needs
  },
  // Adding a style for the table container to enable horizontal scrolling
  tableContainer: {
    overflowX: 'auto',
  },
  select: {
    width: '100%',
    backgroundColor: '#FFF',
    '& .MuiSelect-icon': {
      color: theme.palette.action.active,
    },
  },
  inputTime: {
    width: '100%',
  },
  // Adding custom styles for specified columns
  specialRow: {
    backgroundColor: '#393392',
    color: '#FFFFFF',
    '& > *': {
      fontWeight: 'bold',
    },
  },
}));

function TableComponent() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [tableHeadings, setTableHeadings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/client/data/api/tableData');
      const headings = response.data.headings.filter(heading => heading !== '_id' && heading !== '__v');
      setTableHeadings(headings);

      const data = response.data.data.map(row => {
        const filteredRow = {};
        Object.keys(row).forEach(key => {
          if (key !== '_id' && key !== '__v') {
            filteredRow[key] = row[key];
          }
        });
        return filteredRow;
      });
     
    // Since 'data' is now declared with 'let', this reassignment is allowed
    // Instead of reassigning 'data', immediately use setTableData to update the state with a new array that includes the special rows
    setTableData([
      { specialRow: true, label: 'East', type: 'east' }, // Add special row for East at the beginning
      ...data, // Spread the original data
      { specialRow: true, label: 'West', type: 'west' }, // Add special row for West at the end
    ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDropdownChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };

  const handleTimeChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };

  const dropdownOptions = [
    'Pending', 'Started', 'In Progress', 'Delayed',
    'Issue Detected', 'Completed', 'NA',
  ];

  const shouldRenderDropdown = (index) => {
    // Logic to determine if a dropdown should be rendered based on index
    return index >= 7 && index < 21; // Example condition
  };

  const alphabetHeaders = Array.from({ length: tableHeadings.length }, (_, i) => String.fromCharCode(65 + i));

  // Function to dynamically apply header cell style based on column name
  // Hypothetical actual names for the columns

// Updated getHeaderCellStyle function
const getHeaderCellStyle= (heading) => {
  // Make sure these conditions accurately check for your specific heading names
  // The heading names here are placeholders; replace them with the actual heading names or conditions that match your headings for P, S, T, Q, R
  if (["P", "S", "T"].includes(heading)) {
    return classes.headerCellPST;
  } else if (heading === "Q") {
    return classes.headerCellQ;
  } else if (heading === "R") {
    return classes.headerCellR;
  }
  return classes.headerCell; // Default style
};
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.alphabetHeaderCell}></TableCell>
            {alphabetHeaders.map((letter, index) => (
              <TableCell key={index} className={classes.alphabetHeaderCell}>
                {letter}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className={classes.headerCell}>#</TableCell>
            {tableHeadings.map((heading, index) => (
              <TableCell key={index} className={getHeaderCellStyle(heading)}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {tableData.map((row, rowIndex) => {
            if (row.specialRow) {
              return (
                <TableRow key={`special-${row.type}-${rowIndex}`} className={classes.specialRow}>
                  <TableCell colSpan={tableHeadings.length + 1}>
                    {row.label}
                  </TableCell>
                </TableRow>
              );
            }
            return (
            <TableRow key={rowIndex}>
              <TableCell className={classes.cell}>{rowIndex + 1}</TableCell>
              {tableHeadings.map((heading, columnIndex) => {
                const isTimeInputColumn = heading === 'SCM App Group 2 - Complete (Enter EST Time in 24h format)' || 
                                         heading === 'Patch Reboots Complete (Enter EST Time in 24h format)';
                const isDropdown = shouldRenderDropdown(columnIndex);
                return (
                  <TableCell key={columnIndex} className={classes.cell}>
                    {isTimeInputColumn ? (
                      <TextField
                        type="number"
                        className={classes.inputTime}
                        value={row[heading] || ''}
                        onChange={(event) => handleTimeChange(event, rowIndex, heading)}
                        inputProps={{ min: 50, max: 100, step: 1 }}
                      />
                    ) : isDropdown ? (
                      <Select
                        value={row[heading] || 'Pending'}
                        onChange={(event) => handleDropdownChange(event, rowIndex, heading)}
                        className={classes.select}
                        IconComponent={KeyboardArrowDownIcon}
                      >
                        {dropdownOptions.map((option, optionIndex) => (
                          <MenuItem key={optionIndex} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      row[heading]
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
            )
   })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
