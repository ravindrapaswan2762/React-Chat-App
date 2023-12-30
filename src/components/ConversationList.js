import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewConversation, newConversationToggle } from '../redux/actions';
import '../assets/ConversationList.css';
import { NewConversation } from './NewConversation';
import search from '../search.png';
import addIcon from '../addIcon.png';

// Functional component for the ConversationsList
export const ConversationsList = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Redux state and dispatch
  const conversations = useSelector((state) => state.conversations);
  const isContactForm = useSelector((state) => state.isContactForm);
  const dispatch = useDispatch();

  // Handler for new conversation toggle
  const newConversationHandler = async () => {
    await dispatch(newConversationToggle());
  };

  // Filtered conversations based on search term
  const filteredConversations = conversations.filter((conversation) =>
    conversation.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <h2>Conversations List</h2>

      {/* Search box */}
      <div className='searchBox'>
        <img className="addIcon" src={addIcon} onClick={newConversationHandler} />
        <input
          className='searchInput'
          type="text"
          placeholder="Search by contact name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img className="search" src={search} alt='search'/>
      </div>

      {/* Display new conversation form if isContactForm is true */}
      {isContactForm && <NewConversation />}

      {/* List of conversations */}
      <ul>
        {filteredConversations.map((conversation) => (
          <li key={conversation.id}>
            {/* Link to individual conversation */}
            <Link to={`/conversation/${conversation.id}`}>
              <div>
                {/* Contact name with black color */}
                <strong style={{color: 'black'}}>{conversation.contactName}</strong>
                {/* Last message with grey color */}
                <p style={{color: 'grey'}}>{conversation.lastMsg}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
