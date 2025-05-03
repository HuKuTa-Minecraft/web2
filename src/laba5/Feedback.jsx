import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemText,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeedbacks,
  submitFeedback,
  removeFeedback,
} from "C:/Projects/ssvr/labs/src/laba6/feedbackSlice.js";
import { getUsers } from "C:/Projects/ssvr/labs/src/laba6/api.js";

export default function Feedback() {
  const dispatch = useDispatch();
  const { list: feedbacks, loading } = useSelector((state) => state.feedback);
  const currentUserEmail = useSelector((state) => state.auth.currentUserEmail);
  const currentUserRole = useSelector((state) => state.auth.currentUserRole);

  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");

  const isAdmin = currentUserRole === "admin";

  useEffect(() => {
    dispatch(fetchFeedbacks(isAdmin ? null : currentUserEmail)); // загрузить все отзывы для админа, только свои для юзера
    if (isAdmin) {
      getUsers().then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedEmail(data[0].email); // по умолчанию выбрать первого
        }
      });
    }
  }, [dispatch, currentUserEmail, isAdmin]);

  const onSubmit = (data) => {
    const emailToUse = isAdmin ? selectedEmail : currentUserEmail;
    if (!emailToUse) return;
    dispatch(submitFeedback({ userEmail: emailToUse, message: data.message }));
    reset();
  };

  const handleDelete = (id) => {
    dispatch(removeFeedback(id));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4 }}>
        Форма обратной связи
      </Typography>

      {isAdmin && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-select-label">Выберите пользователя</InputLabel>
            <Select
              labelId="user-select-label"
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              label="Выберите пользователя"
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.email}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Ваш отзыв"
            multiline
            rows={4}
            margin="normal"
            {...register("message", { required: true })}
          />
          <Button type="submit" variant="contained">
            Отправить
          </Button>
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>
        {isAdmin ? "Все отзывы" : "Мои отзывы"}
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <List>
          {feedbacks.map((fb) => (
            <ListItem
              key={fb.id}
              secondaryAction={
                isAdmin && (
                  <IconButton edge="end" onClick={() => handleDelete(fb.id)}>
                    <DeleteIcon />
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={fb.message}
                secondary={`Отправил: ${fb.userEmail}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
