import API from "./api"; // ✅ Make sure this is your axios instance

// 🔹 Access or create a 1-on-1 chat
export const accessChat = async (userId) => {
  const { data } = await API.post("/chat", { userId });
  return data;
};

// 🔹 Fetch all chats
export const getChat = async () => {
  try {
    const { data } = await API.get("/chat");
    return data;
  } catch (error) {
    console.error("❌ Error fetching chats:", error);
    throw error;
  }
};

// 🔹 Send message
export const sendMessage = async (chatId, content) => {
  const { data } = await API.post(`/chat/message`, { chatId, content });
  return data;
};

// 🔹 Get all messages in a chat
export const fetchMessage = async (chatId) => {
  const { data } = await API.get(`/chat/message/${chatId}`); // ✅ use GET not POST
  return data;
};

// 🔹 Reply to a message
export const replyMessage = async (chatId, replyTo, content) => {
  const { data } = await API.post(`/chat/message/reply`, {
    chatId,
    replyTo, 
    content,
  });
  return data;
};


// 🔹 Create a group chat
export const createGroupChat = async (groupData) => {
  const { data } = await API.post("/chat/group", groupData);
  return data;
};

// 🔹 Fetch all group chats
export const fetchGroupChats = async () => {
  const { data } = await API.get("/chat/group");
  return data;
};
