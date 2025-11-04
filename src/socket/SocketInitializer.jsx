// src/socket/SocketInitializer.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../api/socket";
import { toast } from "react-toastify";
import { addMessage } from "../state/slices/messageSlice";
import {
  updateChatLatestMessage as updateLatestMessage,
  incrementUnreadCount as incrementUnread,
} from "../state/slices/chatSlice";
import { setOnlineUsers } from "../state/slices/socketSlice";

const SocketInitializer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      socket.disconnect();
      return;
    }

    // ✅ Always re-authenticate before connect
    socket.auth = { token };

    // ✅ Reconnect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    /** ------------------------------
     * 🔹 Event Handlers
     * ------------------------------ */
    const handleConnect = () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("setup", user);
      toast.success(`Connected as ${user?.name || "User"}`, {
        autoClose: 1000,
      });
    };

    const handleDisconnect = (reason) => {
      console.warn("🔴 Socket disconnected:", reason);
      // don’t auto toast on reloads
    };

    const handleAuthError = (message) => {
      console.error("Auth error:", message);
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      socket.disconnect();
    };

    const handleMessage = (msg) => {
      const chatId = msg.chat?._id || msg.chatId;
      if (!chatId) return;

      dispatch(addMessage(msg));
      dispatch(updateLatestMessage({ chatId, message: msg }));

      // only increment if not current chat
      if (!activeChat || activeChat._id !== chatId) {
        dispatch(incrementUnread(chatId));
      }
    };

    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUsers(users));
    };

    /** ------------------------------
     * 🔹 Register Listeners
     * ------------------------------ */
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("auth error", handleAuthError);
    socket.on("message received", handleMessage);
    socket.on("online users", handleOnlineUsers);

    /** ------------------------------
     * 🔹 Handle Auto Reconnects
     * ------------------------------ */
    socket.io.on("reconnect", () => {
      console.log("🟢 Reconnected, re-authenticating...");
      socket.emit("setup", user);
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log(`⟳ Reconnect attempt ${attempt}...`);
    });

    socket.io.on("reconnect_error", (err) => {
      console.error("Reconnect failed:", err.message);
    });

    /** ------------------------------
     * 🔹 Cleanup on Unmount
     * ------------------------------ */
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("auth error", handleAuthError);
      socket.off("message received", handleMessage);
      socket.off("online users", handleOnlineUsers);
      socket.io.off("reconnect");
      socket.io.off("reconnect_attempt");
      socket.io.off("reconnect_error");
    };
  }, [user, activeChat, dispatch]);

  return null;
};

export default SocketInitializer;
