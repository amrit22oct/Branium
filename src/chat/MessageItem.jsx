const MessageItem = ({ msg, user, isExpanded, onToggleExpand, onReply }) => {
  // ✅ Defensive guards
  if (!msg) return null;

  const isOwn = msg.senderId?._id === user?._id;
  const senderName = msg.senderId?.name || "Unknown";
  const content = msg.content || "[No content]";
  const maxChars = 300;

  // ✅ Handle long messages
  const shouldTruncate = content.length > maxChars;
  const displayText =
    shouldTruncate && !isExpanded ? content.slice(0, maxChars) + "..." : content;

  return (
    <div
      className={`flex relative ${
        isOwn ? "justify-end" : "justify-start"
      } group`}
    >
      <div
        className={`relative px-4 py-2 rounded-2xl shadow-md sm:max-w-[70%] ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        {/* ✅ Reply Preview */}
        {msg.replyTo && (
          <div
            className={`text-xs italic mb-1 border-l-2 pl-2 ${
              isOwn
                ? "border-blue-300 text-blue-100"
                : "border-gray-400 text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="font-semibold">
              {msg.replyTo.senderId?.name || "User"}:
            </span>{" "}
            {msg.replyTo.content || "[Attachment]"}
          </div>
        )}

        {/* ✅ Message content */}
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {displayText}
        </p>

        {/* ✅ Read more / less toggle */}
        {shouldTruncate && (
          <button
            onClick={onToggleExpand}
            className={`text-xs mt-1 ${
              isOwn
                ? "text-blue-100 hover:text-white"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* ✅ Reply button (appears on hover) */}
        <button
          onClick={() => onReply(msg)}
          className={`absolute -top-5 ${
            isOwn ? "left-0" : "right-0"
          } text-gray-400 opacity-0 group-hover:opacity-100 text-xs hover:text-blue-500`}
        >
          ↩ Reply
        </button>

        {/* ✅ Sender name (for received messages only) */}
        {!isOwn && (
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {senderName}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
