import { List, ListItemButton, ListItemText } from '@mui/material';

const labs = [
  { id: 1, title: 'Лабораторная 1' },
  { id: 2, title: 'Лабораторная 2' },
  { id: 3, title: 'Лабораторная 3' },
  { id: 4, title: 'Лабораторная 4' },
];

export default function Menu({ onSelect }) {
  return (
    <List component="nav">
      {labs.map((lab) => (
        <ListItemButton key={lab.id} onClick={() => onSelect(lab)}>
          <ListItemText primary={lab.title} />
        </ListItemButton>
      ))}
    </List>
  );
}
