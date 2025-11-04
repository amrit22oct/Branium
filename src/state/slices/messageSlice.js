import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMessage, sendMessage, replyMessage } from "../../api/chatApi";
import { updateChatLatestMessage as updateLatestMessage } from "./chatSlice";



/** --- Async thunks --- */
export const getMessages = createAsyncThunk("message/getMessages", async (chatId, thunkAPI) => {
  try {
    return await fetchMessage(chatId);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load messages");
  }
});

export const sendNewMessage = createAsyncThunk(
  "message/sendNewMessage",
  async ({ chatId, content, clientId }, thunkAPI) => {
    try {
      const data = await sendMessage(chatId, content, clientId);
      thunkAPI.dispatch(updateLatestMessage({ chatId: data.chat?._id || chatId, message: data }));
      return { ...data, clientId }; // keep clientId for reducer replacement
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to send message");
    }
  }
);

export const sendReplyMessage = createAsyncThunk(
  "message/sendReplyMessage",
  async ({ chatId, replyTo, content }, thunkAPI) => {
    try {
      const data = await replyMessage(chatId, replyTo, content);
      thunkAPI.dispatch(updateLatestMessage({ chatId: data.chat?._id || chatId, message: data }));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to send reply");
    }
  }
);

/** --- Slice --- */
const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    replyTo: null,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const msg = action.payload;
      if (!msg) return;
      const exists = msg._id
        ? state.messages.some((m) => m._id === msg._id)
        : msg.clientId
        ? state.messages.some((m) => m.clientId === msg.clientId)
        : false;

      if (!exists) state.messages.push(msg);
    },

    replaceMessageByClientId: (state, action) => {
      const { clientId, realMessage } = action.payload;
      state.messages = state.messages.map((m) =>
        m.clientId === clientId ? realMessage : m
      );
    },

    setMessages: (state, action) => {
      state.messages = action.payload || [];
    },
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
    setReplyTo: (state, action) => {
      state.replyTo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendNewMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.loading = false;
        const msg = action.payload;
        // Replace optimistic message if clientId matches
        if (msg?.clientId) {
          const idx = state.messages.findIndex((m) => m.clientId === msg.clientId);
          if (idx !== -1) state.messages[idx] = msg;
          else state.messages.push(msg);
        } else {
          state.messages.push(msg);
        }
      })
      .addCase(sendNewMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendReplyMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendReplyMessage.fulfilled, (state, action) => {
        state.loading = false;
        const reply = action.payload;
        const msgId = reply?.parentMessage || reply?.messageId;
        const target = state.messages.find((m) => m._id === msgId);
        if (target) {
          if (!target.replies) target.replies = [];
          target.replies.push(reply);
        }
      })
      .addCase(sendReplyMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  replaceMessageByClientId,
  setMessages,
  clearMessages,
  setReplyTo,
} = messageSlice.actions;

export default messageSlice.reducer;
