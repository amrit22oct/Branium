import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from './ChatBox1.jsx';
import store from "../state/store.js"; // ✅ Add this line


import ChatSidebar from "./ChatSidebar1.jsx";
import socket from "../api/socket.js";
import {
  fetchChats,
  setActiveChat,
  addChat,
  updateChatLatestMessage as updateLatestMessage,
  incrementUnreadCount as incrementUnread,
  resetUnreadCount as clearUnread,
} from "../state/slices/chatSlice.js";
import { clearMessages, getMessages } from "../state/slices/messageSlice.js";
import { getCurrentUser } from "../api/authApi.js";
import { toast } from "react-toastify";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const activeChatRef = useRef(null);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // ===================================================
  // 🔹 Initialize user & socket setup
  // ===================================================
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getCurrentUser();
        const currentUser = res?.user || res;
        if (!currentUser) return;

        setUser(currentUser);
        socket.emit("setup", currentUser);
        dispatch(fetchChats());
      } catch (err) {
        console.error("❌ Failed to load user:", err);
        toast.error("Failed to load user data");
      }
    };
    init();
  }, [dispatch]);

  // ===================================================
  // 🔹 Socket listeners (global only)
  // ===================================================
  useEffect(() => {
    if (!user) return;

    const handleOnlineUsers = (users) => setOnlineUsers(users);
    const handleChatCreated = (chat) => dispatch(addChat(chat));

    // 🔔 Listen for notifications (messages for inactive chats)
    const handleNotification = (data) => {
      const { chatId, message } = data || {};
      if (!chatId || !message) return;
    
      const openChat = activeChatRef.current;
    
      // 🚫 Ignore if this chat is already open
      if (openChat && openChat._id === chatId) return;
    
      // ✅ Get chats directly from Redux store
      const currentChats = store.getState().chat.chats;
      const existingChat = currentChats.find((c) => c._id === chatId);
    
      // 🚫 Skip if chat is not known (prevents "Unknown Chat" bug)
      if (!existingChat) {
        console.warn("Ignoring notification for unknown chat:", chatId);
        return;
      }
    
      // ✅ Update the latest message and unread badge
      dispatch(updateLatestMessage({ chatId, message }));
      dispatch(incrementUnread(chatId));
    
      toast.info(`💬 New message from ${message.senderId?.name || "Someone"}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    
      new Audio("/notification.mp3").play().catch(() => {});
    };
    

    socket.on("online users", handleOnlineUsers);
    socket.on("chat created", handleChatCreated);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("online users", handleOnlineUsers);
      socket.off("chat created", handleChatCreated);
      socket.off("notification", handleNotification);
    };
  }, [user, dispatch]);

  // ===================================================
  // 🔹 Chat selection handler
  // ===================================================
  const handleSelectChat = (chat) => {
    dispatch(setActiveChat(chat));
    dispatch(clearMessages());
    dispatch(getMessages(chat._id));
    dispatch(clearUnread(chat._id)); // ✅ Clear unread count when chat is opened
  };

  // ===================================================
  // 🔹 UI
  // ===================================================
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ChatSidebar
        onSelectChat={handleSelectChat}
        user={user}
        onlineUsers={onlineUsers}
      />
      <div className="flex-1 flex flex-col">
        <ChatBox activeChat={activeChat} user={user} />
      </div>
    </div>
  );
};

export default ChatPage;