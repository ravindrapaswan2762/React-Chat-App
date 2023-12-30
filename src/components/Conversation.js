// Conversation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions';
import '../assets/Conversation.css';
import userIcon from '../user.png';
import { showSuccessNotification } from "../redux/actions";
import { showErrorNotification } from "../redux/actions";

// Helper function to format the time
const formattedTime = (time) => {
  return new Date(time).toLocaleTimeString('en-US', { timeStyle: 'short' });
};

// Main Conversation component
export const Conversation = () => {
  const [newMessage, setNewMessage] = useState('');

  const conversations = useSelector((state) => state.conversations);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find the current conversation based on the id from the URL
  const currentConversation = conversations.find((conv) => conv.id === parseInt(id, 10)) || null;

  // Function to send a new message
  const sendMessage = () => {
    try {
      if (newMessage.trim() === '') {
        return;
      }
      dispatch(addMessage(id, { text: newMessage, sender: 'me', time: new Date().toISOString() }));
      setNewMessage('');
      dispatch(showSuccessNotification("Message added successfully!"));
    } catch (error) {
      dispatch(showErrorNotification(error));
    }
  };

  return (
    <div className="conversation-container">
      <h2>Conversation</h2>

      {currentConversation ? (
        <div>
          <h3>Contact: {currentConversation.contactName}</h3>
          <ul className="message-list">
            {/* Mapping through messages and displaying them */}
            {currentConversation.messages.map((message, index) => (
              <li key={index} className={message.sender === 'me' ? 'sent' : 'received'}>
                
                <div className="message-info">
                  {/* Displaying user icon based on sender */}
                  {message.sender === 'user' && (
                    <img src={userIcon} alt="User Icon" />
                  )}
                  {message.sender === 'me' && (
                    <img src={userIcon} alt="User Icon" />
                  )}
                  {/* Displaying the sender's username or contact name */}
                  {message.sender === 'user' ?  <span style={{padding: '0px 10px'}} className="message-username">{currentConversation.contactName}</span>:
                    <span style={{padding: '0px 10px'}} className="message-username">{message.sender}</span>}
                  {/* Displaying the timestamp of the message */}
                  <span className="message-time">{formattedTime(message.time)}</span>
                </div>

                {/* Displaying the text of the message */}
                <p>{message.text}</p>
                  
              </li>
            ))}
          </ul>

          {/* Input container for typing new messages */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* Button to send the new message */}
            <button onClick={sendMessage}>Send</button>
          </div>
          
        </div>
      ) : (
        // Display a loading message if the conversation is not yet loaded
        <p>Loading...</p>
      )}
    </div>
  );
};
