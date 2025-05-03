import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', textAlign: 'center', bgcolor: '#eee' }}>
      <Typography variant="body2">Лабораторная работа 3 / Лабораторная работа 7</Typography>
      <Box sx={{ mt: 1 }}>
        <Button component={Link} to="/feedback" size="small" variant="text">Обратная связь</Button>
        <Button component={Link} to="/profile" size="small" variant="text">Профиль</Button>
      </Box>
    </Box>
  );
}
