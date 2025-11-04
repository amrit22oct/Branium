import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ReplyBar = ({ replyingTo, cancelReply }) => (
  <AnimatePresence>
    {replyingTo && (
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex justify-between items-center"
      >
        <div className="flex flex-col text-sm max-w-[80%]">
          <span className="text-gray-500 text-xs">Replying to:</span>
          <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
            {replyingTo.senderId?.name || "User"}:{" "}
            {replyingTo.content?.slice(0, 50)}
          </span>
        </div>
        <button
          onClick={cancelReply}
          className="text-gray-400 hover:text-red-500 text-lg"
        >
          <X size={18} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ReplyBar;
