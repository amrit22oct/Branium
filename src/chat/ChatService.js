import socket from "../api/socket";
import {
  getChat,
  accessChat,
  createGroupChat,
  fetchGroupChats,
  fetchMessages,
  sendMessage,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} from "../api/chatApi";
import {
  addChat,
  setActiveChat,
  updateLatestMessage,
  incrementUnread,
} from "../state/slices/chatSlice";
import { addMessage, setMessages } from "../state/slices/messageSlice";

/**
 * 🔹 ChatService – Centralized Chat Manager
 * Handles socket + API + Redux sync in one place
 */
class ChatService {
  constructor(store) {
    this.store = store;
    this.user = null;
  }

  /**
   * Initialize Chat Service with user + socket
   */
  init(user, token) {
    this.user = user;

    socket.auth = { token };
    socket.connect();

    socket.emit("setup", user);
    socket.on("connected", () => console.log("✅ Socket connected"));
    socket.on("online users", (users) =>
      console.log("🟢 Online users:", users.length)
    );

    // 🔸 Listen for new chats created
    socket.on("chat created", (chat) => {
      this.store.dispatch(addChat(chat));
    });

    // 🔸 Listen for incoming messages
    socket.on("message received", (msg) => this.handleIncomingMessage(msg));
  }

  /**
   * Clean up listeners (on unmount/logout)
   */
  disconnect() {
    socket.off("connected");
    socket.off("online users");
    socket.off("chat created");
    socket.off("message received");
    socket.disconnect();
  }

  /**
   * 🔹 Fetch all user chats
   */
  async loadChats() {
    try {
      const chats = await getChat();
      this.store.dispatch({
        type: "chat/fetchChats/fulfilled",
        payload: chats,
      });
      return chats;
    } catch (err) {
      console.error("❌ Failed to fetch chats:", err);
      throw err;
    }
  }

  /**
   * 🔹 Open or access chat with another user
   */
  async openChat(userId) {
    try {
      const chat = await accessChat(userId);
      this.store.dispatch(setActiveChat(chat));
      return chat;
    } catch (err) {
      console.error("❌ Error opening chat:", err);
      throw err;
    }
  }

  /**
   * 🔹 Create a new group chat
   */
  async createGroupChat({ users, chatName }) {
    try {
      const group = await createGroupChat({ users, chatName });
      this.store.dispatch(addChat(group));
      return group;
    } catch (err) {
      console.error("❌ Error creating group:", err);
      throw err;
    }
  }

  /**
   * 🔹 Fetch group chats
   */
  async loadGroupChats() {
    try {
      const groups = await fetchGroupChats();
      return groups;
    } catch (err) {
      console.error("❌ Failed to fetch group chats:", err);
      throw err;
    }
  }

  /**
   * 🔹 Fetch messages for chat
   */
  async loadMessages(chatId) {
    try {
      const messages = await fetchMessages(chatId);
      this.store.dispatch(setMessages(messages));
      return messages;
    } catch (err) {
      console.error("❌ Failed to fetch messages:", err);
      throw err;
    }
  }

  /**
   * 🔹 Send message via socket + API
   */
  async sendMessage(chatId, content) {
    try {
      const msg = await sendMessage({ chatId, content });
      socket.emit("new message", msg);
      this.store.dispatch(addMessage(msg));
      this.store.dispatch(updateLatestMessage({ chatId, message: msg }));
      return msg;
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      throw err;
    }
  }

  /**
   * 🔹 Handle incoming socket message
   */
  handleIncomingMessage(msg) {
    const chatId = msg.chat?._id || msg.chatId;
    const state = this.store.getState();
    const activeChat = state.chat.activeChat;

    // Update sidebar preview
    this.store.dispatch(updateLatestMessage({ chatId, message: msg }));

    // If active chat open, add message directly
    if (activeChat && activeChat._id === chatId) {
      this.store.dispatch(addMessage(msg));
    } else {
      this.store.dispatch(incrementUnread(chatId));
    }
  }

  /**
   * 🔹 Rename group chat
   */
  async renameGroupChat(chatId, chatName) {
    try {
      const updated = await renameGroupChat({ chatId, chatName });
      this.store.dispatch(updateLatestMessage({ chatId, message: updated }));
      return updated;
    } catch (err) {
      console.error("❌ Error renaming group:", err);
      throw err;
    }
  }

  /**
   * 🔹 Add user to group
   */
  async addUserToGroup(chatId, userId) {
    try {
      const updated = await addToGroup({ chatId, userId });
      return updated;
    } catch (err) {
      console.error("❌ Error adding user to group:", err);
      throw err;
    }
  }

  /**
   * 🔹 Remove user from group
   */
  async removeUserFromGroup(chatId, userId) {
    try {
      const updated = await removeFromGroup({ chatId, userId });
      return updated;
    } catch (err) {
      console.error("❌ Error removing user from group:", err);
      throw err;
    }
  }
}

export default ChatService;
