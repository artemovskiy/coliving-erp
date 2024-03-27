import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { House } from 'coliving-erp-api-client';
import React from 'react';

export interface HousesTableProps {
    data: House[]
}

function HousesTable({ data }: HousesTableProps) {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map(house => <TableRow key={house.id ?? 0} hover>
                        <TableCell>{house.id}</TableCell>
                        <TableCell>{house.name}</TableCell>
                    </TableRow>)
                }
            </TableBody>
            <TableFooter>

            </TableFooter>
        </Table>
    </TableContainer>;
};

export default HousesTable;
