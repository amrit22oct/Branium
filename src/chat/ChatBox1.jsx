import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../api/socket";
import {
  getMessages,
  sendNewMessage,
  sendReplyMessage,
  addMessage,
} from "../state/slices/messageSlice";
import { updateChatLatestMessage as updateLatestMessage } from "../state/slices/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ReplyBar from "./ReplyBar";
import MessageInput from "./MessageInput";
import { toast } from "react-toastify";

const ChatBox = ({ activeChat, user }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState(new Set());
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);
  const prevChatIdRef = useRef(null);
  const chatId = activeChat?._id;

  // ==========================================================
  // 🔹 Join/Leave chat room and listen for its messages only
  // ==========================================================
useEffect(() => {
  if (!chatId || !user) return;

  // Leave previous chat room if changed
  if (prevChatIdRef.current && prevChatIdRef.current !== chatId) {
    socket.emit("leave chat", prevChatIdRef.current);
  }

  // Join the new chat room
  prevChatIdRef.current = chatId;
  socket.emit("join chat", chatId);

  // ✅ Listen ONLY for messages of this chat
  const handleIncomingForThisChat = (msg) => {
    // Handle both server formats (msg.chat._id or msg.chatId)
    const incomingChatId =
      msg?.chat?._id?.toString?.() || msg?.chatId?.toString?.();

    // 🚫 Ignore if this message doesn’t belong to this chat
    if (!incomingChatId || incomingChatId !== chatId.toString()) return;

    // ✅ Safe clone
    const safeMessage = {
      ...msg,
      chat: { _id: chatId },
    };

    dispatch(addMessage(safeMessage));
    dispatch(updateLatestMessage({ chatId, message: safeMessage }));
  };

  socket.on("message received", handleIncomingForThisChat);

  return () => {
    socket.emit("leave chat", chatId);
    socket.off("message received", handleIncomingForThisChat);
  };
}, [chatId, user, dispatch]);


  useEffect(() => {
    if (chatId) dispatch(getMessages(chatId));
  }, [dispatch, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSending || !newMessage.trim() || !chatId) return;

      setIsSending(true);
      try {
        const payload = replyingTo
          ? { chatId, content: newMessage.trim(), replyTo: replyingTo._id }
          : { chatId, content: newMessage.trim() };

        const action = replyingTo ? sendReplyMessage : sendNewMessage;
        const res = await dispatch(action(payload)).unwrap();

        // Emit to socket
        socket.emit("new message", {
          ...res,
          chat: { _id: chatId },
          senderId: user,
        });

        dispatch(addMessage(res));
        dispatch(updateLatestMessage({ chatId, message: res }));

        setNewMessage("");
        setReplyingTo(null);
      } catch (err) {
        console.error("❌ Error sending message:", err);
        toast.error("Failed to send message");
      } finally {
        setIsSending(false);
      }
    },
    [dispatch, isSending, chatId, newMessage, replyingTo, user]
  );

  const handleReplyClick = useCallback((msg) => setReplyingTo(msg), []);
  const cancelReply = useCallback(() => setReplyingTo(null), []);

  // ==========================================================
  // 🔹 UI Rendering
  // ==========================================================
  if (!activeChat || !user)
    return (
      <div className="flex-1 flex items-center justify-center font-bold text-xl">
        💬 Select a chat to start messaging
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-500 transition-colors duration-200">
      <ChatHeader activeChat={activeChat} user={user} />
      <MessageList
  messages={messages}
  user={user}
  expandedMessages={expandedMessages}
  setExpandedMessages={setExpandedMessages}
  onReply={handleReplyClick}
  messagesEndRef={messagesEndRef}
/>

      <ReplyBar replyingTo={replyingTo} cancelReply={cancelReply} />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
        isSending={isSending}
      />
    </div>
  );
};

export default ChatBox;
