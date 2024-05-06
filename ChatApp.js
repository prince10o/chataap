import React, { useState } from "react";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const getRandomUsername = () =>
    user_list[Math.floor(Math.random() * user_list.length)];

  function getInitials(name) {
    const parts = name.split(" ");
    const initials = parts.map((part) => part[0].toUpperCase()).join("");
    return initials.substring(0, 2);
  }

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        id: messages.length,
        user: getRandomUsername(),
        text: input,
        likes: 0,
      };

      setMessages([...messages, newMessage]);
      setInput("");
      setShowUserList(false);
    }
  };

  const handleLike = (id) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.id === id) {
        return { ...msg, likes: msg.likes + 1 };
      }
      return msg;
    });
    setMessages(updatedMessages);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.includes("@")) {
      setShowUserList(true);
      setCursorPosition(e.target.selectionStart);
    } else {
      setShowUserList(false);
    }
  };

  const handleUserSelect = (user) => {
    const beforeCursor = input.substring(0, cursorPosition - 1);
    const newInput = `${beforeCursor}@${user}`;
    setInput(newInput);
    setShowUserList(false);
  };

  return (
    <div className="chat-app">
      <div className="chat-thread">
        {messages.map((msg) => (
          <div className="chat-message-container" key={msg.id}>
            <div className="chat-avatar">{getInitials(msg.user)}</div>
            <div className="chat-message-content">
              <strong>{msg.user}</strong>
              <div className="chat-message-text">{msg.text}</div>
            </div>
            <div className="like-button">
              <button onClick={() => handleLike(msg.id)}>👍 {msg.likes}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {showUserList && (
        <div className="user-list">
          {user_list.map((user) => (
            <div
              key={user}
              className="user-item"
              onClick={() => handleUserSelect(user)}
            >
              {user}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatApp;
