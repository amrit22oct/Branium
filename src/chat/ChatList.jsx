import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({
  chats,
  activeChatId,
  currentUserId,
  unreadCounts,
  onlineUsers,
  onSelectChat,
}) => {
  const directChats = chats.filter((c) => !c.isGroupChat);
  const groupChats = chats.filter((c) => c.isGroupChat);

  return (
    <ul className="overflow-y-auto flex-1 divide-y divide-gray-200 dark:divide-gray-700">
      <Section title="Direct Messages">
        {directChats.length > 0 ? (
          directChats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              activeChatId={activeChatId}
              currentUserId={currentUserId}
              unreadCounts={unreadCounts}
              onlineUsers={onlineUsers}
              onSelectChat={onSelectChat}
            />
          ))
        ) : (
          <Empty text="No direct messages yet" />
        )}
      </Section>

      <Section title="Group Chats">
        {groupChats.length > 0 ? (
          groupChats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              activeChatId={activeChatId}
              currentUserId={currentUserId}
              unreadCounts={unreadCounts}
              onlineUsers={onlineUsers}
              onSelectChat={onSelectChat}
            />
          ))
        ) : (
          <Empty text="No group chats yet" />
        )}
      </Section>
    </ul>
  );
};

const Section = ({ title, children }) => (
  <li className="p-2">
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
      {title}
    </h3>
    <ul>{children}</ul>
  </li>
);

const Empty = ({ text }) => (
  <li className="p-4 text-gray-500 dark:text-gray-400 text-center">{text}</li>
);

export default ChatList;
