import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "C:/Projects/ssvr/labs/src/laba6/authSlice.js";
import { fetchUserByEmail, registerUser } from "C:/Projects/ssvr/labs/src/laba6/api.js";

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return re.test(email) || "Введите корректный email";
};

export default function AuthForm() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const { email, password } = getValues();
    const user = await fetchUserByEmail(email);

    if (!user || user.password !== password) {
      alert("Неверный email или пароль");
      return;
    }

    if (user.blocked) {
      alert("Ваш аккаунт заблокирован. Обратитесь к администратору.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUserEmail", user.email);
    localStorage.setItem("currentUserId", user.id);
    localStorage.setItem("currentUserRole", user.role || "user");

    dispatch(login({ email: user.email, id: user.id, role: user.role }));
  };

  const handleRegister = async () => {
    const { email, password } = getValues();
    const existingUser = await fetchUserByEmail(email);

    if (existingUser) {
      alert("Этот email уже зарегистрирован");
      return;
    }

    const newUser = await registerUser({ email, password, role: "user" });
    alert("Регистрация успешна! Теперь войдите.");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">Авторизация / Регистрация</Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email", {
            required: "Email обязателен",
            validate: validateEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
          margin="normal"
          {...register("password", { required: "Пароль обязателен" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button fullWidth variant="contained" onClick={handleSubmit(handleLogin)}>Войти</Button>
          <Button fullWidth variant="outlined" onClick={handleSubmit(handleRegister)}>Регистрация</Button>
        </Stack>
      </Box>
    </Container>
  );
}