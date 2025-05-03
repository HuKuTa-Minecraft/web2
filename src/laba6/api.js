import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// AUTH
export const fetchUserByEmail = async (email) => {
  const res = await api.get(`/users?email=${email}`);
  return res.data[0];
};

export const registerUser = async (userData) => {
  const res = await api.post("/users", userData);
  return res.data;
};

export const updateUser = async (id, updatedData) => {
  const res = await api.put(`/users/${id}`, updatedData);
  return res.data;
};

// USERS (admin panel)
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

export const blockUser = async (id, blocked) => {
  await api.patch(`/users/${id}`, { blocked });
};

// FEEDBACK
export const getFeedbacks = async (email = null) => {
  if (email) {
    const res = await api.get(`/feedbacks?userEmail=${email}`);
    return res.data;
  } else {
    const res = await api.get("/feedbacks");
    return res.data;
  }
};

export const addFeedback = async (feedbackData) => {
  const res = await api.post("/feedbacks", feedbackData);
  return res.data;
};

export const deleteFeedback = async (id) => {
  await api.delete(`/feedbacks/${id}`);
};

export const updateFeedback = async (id, newData) => {
  const res = await api.put(`/feedbacks/${id}`, newData);
  return res.data;
};

export default api;
