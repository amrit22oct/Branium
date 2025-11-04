import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChat,
  accessChat,
  createGroupChat,
  fetchGroupChats,
} from "../../api/chatApi";

// ============================================================
// 🔹 Async Thunks
// ============================================================
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, thunkAPI) => {
    try {
      return await getChat();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch chats"
      );
    }
  }
);

export const openChat = createAsyncThunk(
  "chat/openChat",
  async (userId, thunkAPI) => {
    try {
      return await accessChat(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to open chat"
      );
    }
  }
);

export const createGroup = createAsyncThunk(
  "chat/createGroup",
  async (groupData, thunkAPI) => {
    try {
      return await createGroupChat(groupData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create group"
      );
    }
  }
);

export const getGroups = createAsyncThunk(
  "chat/getGroups",
  async (_, thunkAPI) => {
    try {
      return await fetchGroupChats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load groups"
      );
    }
  }
);

// ============================================================
// 🔹 Chat Slice
// ============================================================
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChat: null,
    groupChats: [],
    unreadCounts: {},
    loading: false,
    error: null,
  },

  reducers: {
    // 🟢 Set Active Chat
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      if (action.payload?._id) {
        state.unreadCounts[action.payload._id] = 0;
      }
    },

    // 🟢 Add or Move Chat to Top
    addChat: (state, action) => {
      const newChat = action.payload;
      const exists = state.chats.some((c) => c._id === newChat._id);
      if (!exists) {
        state.chats.unshift(newChat);
      } else {
        state.chats = [
          newChat,
          ...state.chats.filter((c) => c._id !== newChat._id),
        ];
      }
    },

    // 🟢 Remove Chat
    removeChat: (state, action) => {
      state.chats = state.chats.filter((c) => c._id !== action.payload);
    },

    // 🟢 Clear All Chats
    clearChats: (state) => {
      state.chats = [];
      state.activeChat = null;
      state.groupChats = [];
      state.unreadCounts = {};
      state.error = null;
    },

    // 🟢 Update Latest Message (real-time)
    updateChatLatestMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!chatId || !message) return;

      const chatIndex = state.chats.findIndex((c) => c._id === chatId);

      if (chatIndex !== -1) {
        // Update existing chat
        const updatedChat = {
          ...state.chats[chatIndex],
          latestMessage: message,
          updatedAt: message.createdAt || new Date().toISOString(),
        };

        // Move chat to top
        state.chats.splice(chatIndex, 1);
        state.chats.unshift(updatedChat);
      } else {
        // Add new chat if not present
        state.chats.unshift({
          _id: chatId,
          latestMessage: message,
          updatedAt: message.createdAt || new Date().toISOString(),
        });
      }

      // Force re-render
      state.chats = [...state.chats];
    },

    // 🟢 Increment Unread Count
    incrementUnreadCount: (state, action) => {
      const chatId = action.payload;
      state.unreadCounts[chatId] = (state.unreadCounts[chatId] || 0) + 1;
    },

    // 🟢 Reset Unread Count
    resetUnreadCount: (state, action) => {
      const chatId = action.payload;
      if (chatId) state.unreadCounts[chatId] = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(openChat.fulfilled, (state, action) => {
        const chat = action.payload;
        state.activeChat = chat;
        const exists = state.chats.some((c) => c._id === chat._id);
        if (!exists) state.chats.unshift(chat);
        state.unreadCounts[chat._id] = 0;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        const group = action.payload;
        state.groupChats.push(group);
        state.chats.unshift(group);
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groupChats = action.payload;
      });
  },
});

export const {
  setActiveChat,
  addChat,
  removeChat,
  clearChats,
  updateChatLatestMessage,
  incrementUnreadCount,
  resetUnreadCount,
} = chatSlice.actions;

export default chatSlice.reducer;
