import React from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/components/laba2/navbar";
import Button from "./components/components/laba2/button";
import Container from "./components/components/laba2/container";
import LabsPage from "./pages/lab3_pages";
import { ThemeProvider } from "C:/Projects/ssvr/labs/src/laba4/theme_context.jsx";
import UseHooksPage from "C:/Projects/ssvr/labs/src/laba4/usehooks.jsx"; 
import CounterPage from "C:/Projects/ssvr/labs/src/laba4/counter_page.jsx";
import AuthForm from "C:/Projects/ssvr/labs/src/laba5/AuthForm.jsx";
import Feedback from "C:/Projects/ssvr/labs/src/laba5/Feedback.jsx";
import ProfileEditor from "C:/Projects/ssvr/labs/src/laba6/ProfileEditor.jsx";
import { Button as MuiButton, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "C:/Projects/ssvr/labs/src/laba6/authSlice.js";
import { Link } from "react-router-dom";
import AdminPage from "C:/Projects/ssvr/labs/src/laba8/AdminPage.jsx";
import UserList from "C:/Projects/ssvr/labs/src/laba8/UserList.jsx";
import AdminFeedback from "C:/Projects/ssvr/labs/src/laba8/AdminFeedback.jsx";
import FeedbackList from "C:/Projects/ssvr/labs/src/laba9/FeedbackList.jsx";
import NestedButtons from "C:/Projects/ssvr/labs/src/laba9/NestedButtons";
import "./App.css";

function Home() {
  return (
    <Container>
      <h1>Hello World</h1>
      <p>Я хочу зачёт. Поставьте зачёт :) </p>
      <NestedButtons />
    </Container>
  );
}

function About() {
  return (
    <Container>
      <h1>Я бездарь</h1>
      <p>Никита Глуховцев, 4.205-2</p>
      <Button />
    </Container>
  );
}

function App() {
  const { isLoggedIn, currentUserRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserId");
    localStorage.setItem("isLoggedIn", "false");
  };

  if (!isLoggedIn) {
    return <AuthForm />;
  }

  return (
    <ThemeProvider>
      <Router>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Navbar />
          <Box sx={{ display: "flex", gap: 2 }}>
            <MuiButton component={Link} to="/profile" variant="outlined">
              Аккаунт
            </MuiButton>
            {currentUserRole === "admin" && (
              <MuiButton component={Link} to="/admin" variant="outlined" color="success">
                Админ. Права
              </MuiButton>
            )}
            <MuiButton variant="outlined" color="error" onClick={handleLogout}>
              Выход
            </MuiButton>
          </Box>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/hooks" element={<UseHooksPage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<ProfileEditor />} />
          <Route path="/feedbacks" element={<FeedbackList />} />
          

          {/* Администрирование (только для админа) */}
          {currentUserRole === "admin" && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/feedbacks" element={<AdminFeedback />} />
            </>
          )}

          {/* Если вдруг нет доступа */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
