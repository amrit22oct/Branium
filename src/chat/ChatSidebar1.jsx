import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  addChat,
  setActiveChat,
  resetUnreadCount,
} from "../state/slices/chatSlice";
import { formatDistanceToNow } from "date-fns";
import { Users, Circle } from "lucide-react";
import { toast } from "react-toastify";
import socket from "../api/socket";

const ChatSidebar = ({ onSelectChat, user, onlineUsers = [] }) => {
  const dispatch = useDispatch();
  const { chats, activeChat, unreadCounts } = useSelector(
    (state) => state.chat
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) dispatch(fetchChats());
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;
    const handleChatCreated = (chat) => {
      dispatch(addChat(chat));
      toast.success(`New chat created with ${chat.chatName || "user"}`);
    };
    socket.on("chat created", handleChatCreated);
    return () => socket.off("chat created", handleChatCreated);
  }, [user, dispatch]);

  const getChatName = (chat) => {
    if (!chat) return "Unknown Chat";
    if (chat.isGroupChat) return chat.chatName || "Unnamed Group";
    const otherUser = chat.users?.find((u) => u && u._id !== user?._id);
    return otherUser?.name || "Unknown User";
  };

  const isOnline = (chat) => {
    const otherUser = chat.users?.find((u) => u && u._id !== user?._id);
    return otherUser?._id && onlineUsers.includes(otherUser._id);
  };

  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats || [];
    return (chats || []).filter((chat) =>
      (getChatName(chat) || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, chats]);

  const handleChatClick = (chat) => {
    dispatch(setActiveChat(chat));
    dispatch(resetUnreadCount(chat._id));
    onSelectChat(chat);
  };

  const renderChatItem = (chat) => {
    const latest = chat.latestMessage;
    const lastMessageText = latest
      ? latest.content.length > 35
        ? latest.content.slice(0, 35) + "..."
        : latest.content
      : "No messages yet";
    const unread = unreadCounts?.[chat._id] || 0;

    return (
      <div
        key={chat._id}
        onClick={() => handleChatClick(chat)}
        className={`flex items-center justify-between p-3 cursor-pointer transition-all rounded-2xl border-b-black border-b-2 ${
          activeChat?._id === chat._id
            ? "bg-gray-500 text-white"
            : "hover:bg-amber-50 dark:hover:bg-amber-200"
        }`}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="relative w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold">
            {getChatName(chat)?.[0]?.toUpperCase() || "?"}
            {!chat.isGroupChat && (
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${
                  isOnline(chat) ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            )}
          </div>
          <div className="flex flex-col truncate">
            <span className="font-medium truncate">{getChatName(chat)}</span>
            <span
              className={`text-sm truncate m-0.5 ${
                activeChat?._id === chat._id ? "text-white" : "text-black"
              }`}
            >
              {latest
                ? `${latest.senderId?.name || "Someone"}: ${lastMessageText}`
                : "No messages yet"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center text-xs">
          {latest?.createdAt && (
            <span className="text-gray-900">
              {formatDistanceToNow(new Date(latest.createdAt), {
                addSuffix: true,
              })}
            </span>
          )}
          {unread > 0 && (
            <span className="mt-1 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">
              {unread}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 flex flex-col border-r border-gray-200 dark:border-amber-800 bg-white dark:bg-amber-100 text-black ">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold">Chats</h2>
        <button
          onClick={() => toast.info("Group creation UI coming soon!")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          <Users className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100 focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2 ">
        {filteredChats.length > 0 ? (
          [...filteredChats]
            .sort(
              (a, b) =>
                new Date(b.latestMessage?.createdAt || 0) -
                new Date(a.latestMessage?.createdAt || 0)
            )
            .map(renderChatItem)
        ) : (
          <div className="text-center text-gray-500 mt-10">No chats found</div>
        )}
      </div>

      <div className="p-3 text-sm border-t border-gray-200 dark:border-gray-800 text-gray-500 flex items-center gap-2">
        <Circle className="w-3 h-3 text-green-500" /> {onlineUsers.length} online
      </div>
    </div>
  );
};

export default ChatSidebar;
