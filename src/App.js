

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ConversationsList } from './components/ConversationList';
import { Conversation } from './components/Conversation';

function App() {
  const successNotification = useSelector((state) => state.successNotification);
  const errorNotification = useSelector((state) => state.errorNotification);
  const dispatch = useDispatch();

  const closeNotification = () => {
    dispatch({ type: 'CLOSE_NOTIFICATIONS' });
  };

  const showAlertNotification = (type, message, onCloseCallback) => {
    window.alert(message);
    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  useEffect(() => {
    if (successNotification) {
      showAlertNotification('success', successNotification, closeNotification);
    }

    if (errorNotification) {
      showAlertNotification('error', errorNotification, closeNotification);
    }
    console.log('successNotification ', successNotification);
    console.log('errorNotification ', errorNotification);
  }, [successNotification, errorNotification]);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Left side: ConversationsList */}
        <div style={{ width: '30%', padding: '20px', borderRight: '1px solid #ccc' }}>
          <ConversationsList />
        </div>

        {/* Right side: Conversation */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<p>Select a conversation</p>} />

            {/* Conversation route */}
            <Route path="/conversation/:id" element={<Conversation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
