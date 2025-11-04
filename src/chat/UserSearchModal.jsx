import React, { useState } from "react";
import API from "../api/api";
import { useDispatch } from "react-redux";
import { addChat, createGroup } from "../state/slices/chatSlice";
import socket from "../api/socket"
const UserSearchModal = ({ token, onClose }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 Search users
  const handleSearch = async (val) => {
    setQuery(val);
    if (!val.trim()) return setResults([]);
    setLoading(true);
    try {
      const { data } = await API.get(`/auth?search=${val}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle select
  const toggleSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  // ✅ Create Group
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2)
      return alert("Enter a group name and select at least 2 users");

    const res = await dispatch(
      createGroup({
        chatName: groupName,
        users: selectedUsers.map((u) => u._id),
      })
    ).unwrap();

    socket.emit("create group", res);
    onClose();
  };

  // ✅ Start Direct Chat
  const handleStartChat = async (uid) => {
    const { data } = await API.post(
      "/chat",
      { userId: uid },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(addChat(data));
    socket.emit("new chat", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
          Create Group or Start Chat
        </h3>

        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 mb-3"
        />

        <div className="max-h-60 overflow-y-auto mb-3">
          {loading ? (
            <p className="text-gray-500 text-center">Searching...</p>
          ) : results.length > 0 ? (
            results.map((u) => {
              const selected = selectedUsers.some((x) => x._id === u._id);
              return (
                <div
                  key={u._id}
                  onClick={() => toggleSelect(u)}
                  className={`p-2 flex items-center gap-2 rounded-md cursor-pointer ${
                    selected
                      ? "bg-blue-100 dark:bg-blue-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <img
                    src={
                      u.pic ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartChat(u._id);
                    }}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Chat
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No users found</p>
          )}
        </div>

        {selectedUsers.length >= 2 && (
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 mb-3"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          {selectedUsers.length >= 2 && (
            <button
              onClick={handleCreateGroup}
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Create Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
