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
    // Assuming you want the same styling as headerCell
    backgroundColor:'#E3F2FD',
    color: theme.palette.common.black,
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  cell: {
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  select: {
    width: '100%',
    '& .MuiSelect-icon': {
      color: theme.palette.action.active,
    },
  },
  inputTime: {
    width: '100%',
  },
}));

function TableComponent() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [tableHeadings, setTableHeadings] = useState([]);
  const dropdownOptions = [
    'Pending', 'Started', 'In Progress', 'Delayed',
    'Issue Detected', 'Completed', 'NA',
  ];

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
      setTableData(data);
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

   const alphabetHeaders = Array.from({ length: tableHeadings.length }, (_, i) => String.fromCharCode(65 + i));



  const shouldRenderDropdown = (index) => {
    // Based on your requirements, assuming you want dropdowns for headings from 'H' to 'U'
    return index >= 7 && index < 21; // 'H'(7) to 'U'(20) in 0-indexed array
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
            <TableCell key={index} className={classes.headerCell}>
              {heading}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell className={classes.cell}>{rowIndex + 1}</TableCell>
            {tableHeadings.map((heading, columnIndex) => {
              const isDropdown = shouldRenderDropdown(columnIndex);
              const isTimeInputColumn = heading === 'SCM App Group 2 - Complete (Enter EST Time in 24h format)' || 
                                       heading === 'Patch Reboots Complete (Enter EST Time in 24h format)';
              return (
                <TableCell key={columnIndex} className={classes.cell}>
                  {isTimeInputColumn ? (
                    <TextField
                      type="number"
                      className={classes.inputTime}
                      value={row[heading] || ''}
                      onChange={(event) => handleTimeChange(event, rowIndex, heading)}
                      inputProps={{ min: 0, max: 23, step: 1 }}
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
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}

export default TableComponent;
