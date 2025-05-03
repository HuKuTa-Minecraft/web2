// components/SideDrawer.jsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

const labs = [
  { id: 1, title: 'Лабораторная 1' },
  { id: 2, title: 'Лабораторная 2' },
  { id: 3, title: 'Лабораторная 3' },
  { id: 4, title: 'Лабораторная 4' }
];

export default function SideDrawer({ open, onClose, onSelect }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {labs.map((lab) => (
          <ListItemButton key={lab.id} onClick={() => { onSelect(lab); onClose(); }}>
            <ListItemText primary={lab.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
