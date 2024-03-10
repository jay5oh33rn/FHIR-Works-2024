import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chat.css'; // Make sure this import points to the correct file path

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const containerRef = useRef(null); // Ref for the message container
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.post('http://192.168.0.1:8070/message', { userId: user.userId });
        if (response.data && response.data.newMessages) {
          setMessages((prevMessages) => [...prevMessages, ...response.data.newMessages]);
          scrollToBottom(); // Scroll to bottom when new messages are added
        }
      } catch (error) {
        console.error('Error fetching new messages:', error);
      }
    };

    const polling = setInterval(fetchResponses, 5000);

    return () => clearInterval(polling);
  }, [user.userId]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.0.1:8070/message', { text: message, userId: user.userId });
      setMessages((prevMessages) => [...prevMessages, { from: 'You', text: message }]);
      setMessage('');
      if (response.data && response.data.text) {
        setMessages((prevMessages) => [...prevMessages, { from: 'Chatbot', text: response.data.text }]);
        scrollToBottom(); // Scroll to bottom after adding new message
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEndChat = () => {
    navigate('/summary');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Therapy Chat</h1>
        <button className="end-chat" onClick={handleEndChat}>End Chat</button>
      </div>
      <div className="messages" ref={containerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === 'You' ? 'sent' : 'received'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
