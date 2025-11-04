import React from "react";

const ChatHeader = ({ activeChat, user }) => {
  const title = activeChat.isGroupChat
    ? activeChat.chatName
    : activeChat.users?.find((u) => u._id !== user?._id)?.name || "Chat";

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
        {title}
      </h2>
    </div>
  );
};

export default ChatHeader;
