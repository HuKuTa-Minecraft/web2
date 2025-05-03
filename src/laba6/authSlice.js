import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  currentUserEmail: localStorage.getItem("currentUserEmail") || null,
  currentUserId: localStorage.getItem("currentUserId") || null,
  currentUserRole: localStorage.getItem("currentUserRole") || "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.currentUserEmail = action.payload.email;
      state.currentUserId = action.payload.id;
      state.currentUserRole = action.payload.role || "user";
      localStorage.setItem("currentUserRole", action.payload.role || "user");
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUserEmail = null;
      state.currentUserId = null;
      state.currentUserRole = "user";
      localStorage.removeItem("currentUserRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

