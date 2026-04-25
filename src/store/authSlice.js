import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // ✅ SIGNUP
    signup: (state, action) => {
      const { email, username, password } = action.payload;

      if (!email || !username || !password) {
           toast.error("All fields required"); 
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // prevent duplicate email
      const exists = users.find((u) => u.email === email);
      if (exists) {
        toast.error("User already exists")
        return;
      }

      const newUser = { email, username, password };

      users.push(newUser);

      // ✅ save all users
      localStorage.setItem("users", JSON.stringify(users));

      // ✅ set current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      state.user = newUser;
      state.isAuthenticated = true;
    },

    // ✅ LOGIN
    login: (state, action) => {
      const { email, password } = action.payload;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        toast.error("Invalid email or password")
        return;
      }
      if (foundUser) {
        toast.success("Login successfully ✅"); 
      }

      // OPTIONAL Gmail check
      if (!email.endsWith("@gmail.com")) {
        toast.error("only gmail allowed")
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      state.user = foundUser;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("currentUser");
    },

    loadUser: (state) => {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { signup, login, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;