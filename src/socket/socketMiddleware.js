// src/socket/socketMiddleware.js
import socket from "../api/socket";
import { addMessage } from "../state/slices/messageSlice";
import {   updateChatLatestMessage as updateLatestMessage,
  incrementUnreadCount as incrementUnread,} from "../state/slices/chatSlice";
import { setOnlineUsers } from "../state/slices/socketSlice";
import { logout } from "../state/slices/authSlice";

let initialized = false;

export const socketMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Auto-connect when user logs in
  if (action.type === "auth/login/fulfilled" && state.auth.user && !socket.connected) {
    socket.auth = { token: localStorage.getItem("token") };
    socket.connect();
  }

  // Disconnect on logout
  if (action.type === logout.type) {
    socket.disconnect();
  }

  // One-time listener setup
  if (!initialized && socket) {
    initialized = true;

    socket.on("message received", (msg) => {
      const chatId = msg.chat?._id || msg.chatId;
      store.dispatch(addMessage(msg));
      store.dispatch(updateLatestMessage({ chatId, message: msg }));

      const activeChat = store.getState().chat.activeChat;
      if (!activeChat || activeChat._id !== chatId) {
        store.dispatch(incrementUnread(chatId));
      }
    });

    socket.on("online users", (users) => {
      store.dispatch(setOnlineUsers(users));
    });

    socket.on("auth error", () => {
      store.dispatch(logout());
    });
  }

  return result;
};
