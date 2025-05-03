import { useEffect, useState } from 'react';
import { getFeedbacks, deleteFeedback } from 'C:/Projects/ssvr/labs/src/laba6/api.js';
import { Box, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    const data = await getFeedbacks();
    setFeedbacks(data);
  };

  const handleDelete = async (id) => {
    await deleteFeedback(id);
    loadFeedbacks();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Отзывы пользователей</Typography>
      <List>
        {feedbacks.map((fb) => (
          <ListItem
            key={fb.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(fb.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={fb.message} secondary={fb.userEmail} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
