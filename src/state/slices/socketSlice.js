import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    onlineUsers: [],
    typingUsers: {}, // { chatId: [users currently typing] }
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload || [];
    },
    setTypingUsers: (state, action) => {
      const { chatId, user, typing } = action.payload;
      if (!chatId) return;

      const current = state.typingUsers[chatId] || [];
      if (typing) {
        if (!current.find((u) => u._id === user._id)) {
          state.typingUsers[chatId] = [...current, user];
        }
      } else {
        state.typingUsers[chatId] = current.filter((u) => u._id !== user._id);
      }
    },
  },
});

export const { setOnlineUsers, setTypingUsers } = socketSlice.actions;
export default socketSlice.reducer;
