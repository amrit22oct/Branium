import React from "react";

const ChatHeader = ({ activeChat, user }) => {
  const title = activeChat.isGroupChat
    ? activeChat.chatName
    : activeChat.users?.find((u) => u._id !== user?._id)?.name || "Chat";

  return (
    <div className="p-4 bg-gray-500 border-b-2 border-gray-200 dark:border-black flex justify-between items-center rounded-b-2xl">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
        {title}
      </h2>
    </div>
  );
};

export default ChatHeader;
