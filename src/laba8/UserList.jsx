import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsers, deleteUser, blockUser } from 'C:/Projects/ssvr/labs/src/laba6/api.js';
import UserTable from 'C:/Projects/ssvr/labs/src/laba8/UserTable.jsx';
import { Box, Typography } from '@mui/material';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (id === currentUserId) {
      alert("Вы не можете удалить сами себя!");
      return;
    }
    await deleteUser(id);
    refreshUsers();
  };

  const handleBlock = async (id, blocked) => {
    if (id === currentUserId) {
      alert("Вы не можете заблокировать сами себя!");
      return;
    }
    await blockUser(id, blocked);
    refreshUsers();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Список пользователей</Typography>
      <UserTable users={users} onDelete={handleDelete} onBlock={handleBlock} />
    </Box>
  );
}
