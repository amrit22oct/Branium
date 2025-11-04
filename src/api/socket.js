import { io } from "socket.io-client";

// 🌐 Use environment variable or fallback to localhost
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: false, // controlled manually in App.jsx
  transports: ["websocket"], // avoid polling
  reconnection: true,
  reconnectionAttempts: 10, // try 10 times
  reconnectionDelay: 1000, // start with 1s
  reconnectionDelayMax: 5000, // max delay between retries
  timeout: 10000, // connection timeout
});

// --- 🔹 Log lifecycle events ---
socket.on("connect", () =>
  console.log(`🟢 Socket connected (${socket.id}) → ${SOCKET_URL}`)
);

socket.on("disconnect", (reason) => {
  console.warn("🔴 Socket disconnected:", reason);
});

socket.io.on("reconnect_attempt", (attempt) => {
  console.log(`🔁 Reconnect attempt ${attempt}`);
});

socket.io.on("reconnect", (attempt) => {
  console.log(`🟢 Successfully reconnected after ${attempt} tries`);
});

socket.io.on("reconnect_error", (err) => {
  console.error("⚠️ Reconnection error:", err.message);
});

socket.io.on("reconnect_failed", () => {
  console.error("❌ Reconnection failed — giving up.");
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Socket connection error:", err.message);
});

// --- 🔹 Optional helper to safely emit events ---
socket.safeEmit = (event, data = {}, callback) => {
  if (!socket.connected) {
    console.warn(`⚠️ Tried to emit "${event}" but socket is disconnected.`);
    return;
  }
  try {
    socket.emit(event, data, callback);
  } catch (err) {
    console.error(`❌ Error emitting event "${event}":`, err);
  }
};

export default socket;
