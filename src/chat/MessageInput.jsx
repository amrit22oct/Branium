import React, { useRef, useEffect } from "react";

const MessageInput = ({ newMessage, setNewMessage, handleSend, isSending }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [newMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-3 flex items-end gap-2 border-t dark:border-gray-700"
    >
      <textarea
        ref={textareaRef}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 resize-none rounded-xl p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
      />

      <button
        type="submit"
        disabled={isSending || !newMessage.trim()}
        className={`rounded-xl px-4 py-2 font-semibold transition-colors ${
          isSending
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
