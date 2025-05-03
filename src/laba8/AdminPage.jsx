import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Администрирование</Typography>
      <Button variant="contained" component={Link} to="/admin/users" sx={{ mr: 2 }}>
        Пользователи
      </Button>
      <Button variant="contained" component={Link} to="/admin/feedbacks">
        Отзывы
      </Button>
    </Box>
  );
}
