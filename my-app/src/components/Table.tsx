import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface Props{
    rows: any[]
}

export default function SortableTable(props:Props) {
  const classes = useStyles();
  console.log(props.rows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Species</TableCell>
            <TableCell align="center">Conservative Status</TableCell>
            <TableCell align="center">Continents</TableCell>
            <TableCell align="center">Edition</TableCell>
            <TableCell align="center">Population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.species}>
              <TableCell component="th" scope="row">
                {row.species}
              </TableCell>
              <TableCell align="center">{row.conversation_status}</TableCell>
              <TableCell align="center">{row.continents}</TableCell>
              <TableCell align="center">{row.edition}</TableCell>
              <TableCell align="center">{row.population}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}