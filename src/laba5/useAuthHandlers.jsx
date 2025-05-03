import { useLoginState } from "C:/Projects/ssvr/labs/src/laba5/useLoginState.js";
import { fetchUserByEmail, registerUser } from "C:/Projects/ssvr/labs/src/laba6/api.js";

export function useAuthHandlers() {
  const [isLoggedIn, setIsLoggedIn] = useLoginState();

  const handleLogin = async (data) => {
    const user = await fetchUserByEmail(data.email);
    if (!user || user.password !== data.password) {
      alert("Неверный email или пароль");
      return;
    }
    localStorage.setItem("currentUserEmail", user.email);
    localStorage.setItem("currentUserId", user.id);
    setIsLoggedIn(true);
  };

  const handleRegister = async (data) => {
    const existingUser = await fetchUserByEmail(data.email);
    if (existingUser) {
      alert("Email уже зарегистрирован");
      return;
    }
    await registerUser({ email: data.email, password: data.password });
    alert("Регистрация успешна! Теперь войдите.");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserId");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, handleLogin, handleRegister, handleLogout };
}

