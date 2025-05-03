import React, { useEffect, useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchUserByEmail, updateUser } from "C:/Projects/ssvr/labs/src/laba6/api.js";

export default function ProfileEditor() {
  const email = useSelector((state) => state.auth.currentUserEmail);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email) {
      fetchUserByEmail(email).then((data) => {
        setUser(data);
        setPassword(data?.password || "");
      });
    }
  }, [email]);

  const handleSave = async () => {
    if (user) {
      await updateUser(user.id, { ...user, password });
      alert("Профиль обновлён");
    }
  };

  return user ? (
    <Container>
      <h2>Редактирование аккаунта</h2>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={user.email}
        disabled
      />
      <TextField
        fullWidth
        margin="normal"
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSave}>
        Сохранить
      </Button>
    </Container>
  ) : null;
}
