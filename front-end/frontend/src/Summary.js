import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Summary.css'; // Make sure this import points to the correct file path

const Summary = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/chat'); // Navigate back to chat or home page
  };

  return (
    <div className="summary-container">
      <div className="summary-content">
        <h1>Chat Summary</h1>
        <p>Thank you for chatting with us today. We hope this session has been helpful. Remember, we're here whenever you need us. Take care!</p>
        <button onClick={handleGoBack} className="back-button">Back to Chat</button>
      </div>
    </div>
  );
};

export default Summary;
