import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core/';
import { v4 as uuidv4 } from 'uuid';

export default function DataModal({ name, data }) {
  const rows = [];
  const columns = [
    { id: 'average', label: 'Average Value', minWidth: 170 },
    { id: 'unit', label: 'Unit', minWidth: 190 },
  ];

  function createData() {
    data.forEach((parameter) => {
      rows.push({ average: parameter.average, unit: parameter.unit })
    })
  }
  createData();

  const useStyles = makeStyles({
    root: {
      width: '80%',
      marginTop: '20rem',
      align: 'center',
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();

  return (
    <Container component={Paper} className={classes.root}>
      <h4 align="center">{name}</h4>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={uuidv4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length && rows.map((row) => (
              <TableRow key={uuidv4()} hover role="checkbox" tabIndex={-1}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={uuidv4()} align={column.align}>{value}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}