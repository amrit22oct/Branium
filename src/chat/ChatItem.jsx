import React from "react";
import { Circle } from "lucide-react";

const ChatItem = ({
  chat,
  activeChatId,
  currentUserId,
  onlineUsers,
  onSelectChat,
}) => {
  const isGroup = chat.isGroupChat;
  const otherUser = !isGroup
    ? chat.users?.find((u) => u._id !== currentUserId)
    : null;
  const chatName = isGroup ? chat.chatName : otherUser?.name || "Unknown";
  const lastMessage = chat.latestMessage?.content || "No messages yet";
  const isOnline = !isGroup && onlineUsers.includes(otherUser?._id);

  return (
    <li
      onClick={() => onSelectChat(chat)}
      className={`p-3 flex items-center justify-between cursor-pointer rounded-md transition ${
        activeChatId === chat._id
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {!isGroup && (
          <Circle
            className={`w-3 h-3 ${
              isOnline ? "text-green-500" : "text-gray-400"
            }`}
            fill={isOnline ? "currentColor" : "transparent"}
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{chatName}</p>
          <p
            className={`text-sm truncate ${
              activeChatId === chat._id
                ? "text-blue-100"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {lastMessage}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
