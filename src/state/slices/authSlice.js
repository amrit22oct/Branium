import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getCurrentUser } from "../../api/authApi";
import { clearChats } from "./chatSlice";
import { clearMessages } from "./messageSlice";

// 🔹 Login
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await loginUser(credentials);
    if (res.token) localStorage.setItem("token", res.token);
    return res.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 🔹 Register
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const res = await registerUser(userData);
    const user = res.user || res;
    if (res.token) localStorage.setItem("token", res.token);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 🔹 Get current user (token-based auto-login)
export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    return await getCurrentUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");

      // Clear all app data on logout
      action?.asyncDispatch?.(clearChats());
      action?.asyncDispatch?.(clearMessages());
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
