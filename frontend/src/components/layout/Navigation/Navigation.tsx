import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import React from 'react';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import { Link } from 'react-router-dom';

export interface NavigationProps {
  open?: boolean;
}

function Navigation({ open }: NavigationProps) {
  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText>
            Overview
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to="/accommodations"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <CalendarViewMonthIcon />
          </ListItemIcon>
          <ListItemText>
            Accommodations
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to="/residents"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            Residents
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to="/houses"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HouseIcon />
          </ListItemIcon>
          <ListItemText>
            Houses
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to="/reports/expected-earn"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HouseIcon />
          </ListItemIcon>
          <ListItemText>
            Expected earn report
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

Navigation.defaultProps = {
  open: true,
};

export default Navigation;
