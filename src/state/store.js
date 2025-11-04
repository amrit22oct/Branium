import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";
import socketReducer from "./slices/socketSlice"; // ✅ new slice for online/typing state
import { socketMiddleware } from "../socket/socketMiddleware.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
    socket: socketReducer, // ✅ include socket state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚙️ prevents warnings from socket events
    }).concat(socketMiddleware),
});

export default store;
