import {
  Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow,
} from '@mui/material';
import { House } from 'coliving-erp-api-client';
import React from 'react';

export interface HousesTableProps {
  data: House[]
  onRowClick?: (houseId: number) => void
}

function HousesTable({ data, onRowClick }: HousesTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
                    data.map((house) => (
                      <TableRow key={house.id ?? 0} hover onClick={() => { onRowClick!(house.id!); }}>
                        <TableCell>{house.id}</TableCell>
                        <TableCell>{house.name}</TableCell>
                      </TableRow>
                    ))
                }
        </TableBody>
        <TableFooter />
      </Table>
    </TableContainer>
  );
}

HousesTable.defaultProps = {
  onRowClick: () => {},
};

export default HousesTable;
