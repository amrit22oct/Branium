import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import AuthContext from "./context/AuthContext.jsx";
import ThemeContext from "./context/ThemeContext.jsx";
import UIContext from "./context/UIContext.jsx";
import ErrorBoundary from "./components/feedback/ErrorBoundary.jsx";
import { Provider } from "react-redux";
import store from "./state/store.js";
import socket from "./api/socket.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import the new SocketInitializer
import SocketInitializer from "./socket/SocketInitializer.jsx";

/* ============================================================
   🔹 Socket Status Indicator
   ============================================================ */
const SocketStatus = () => {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium shadow-md transition-all ${
        connected ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {connected ? "🟢 Connected" : "🔴 Disconnected"}
    </div>
  );
};

/* ============================================================
   🔹 Main App Wrapper
   ============================================================ */
const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AuthContext>
        <ThemeContext>
          <UIContext>
            <Router>
              {/* ✅ Socket Connection Manager */}
              <SocketInitializer />

              {/* Main Router */}
              <AppRouter />

              {/* Connection Status Indicator */}
              <SocketStatus />

              {/* Toast Notifications */}
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Router>
          </UIContext>
        </ThemeContext>
      </AuthContext>
    </Provider>
  </ErrorBoundary>
);

export default App;
