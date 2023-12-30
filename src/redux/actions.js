
export const addMessage = (conversationId, messageOBJ) => {
  console.log("conversationId action ",conversationId)
  console.log("message action ", messageOBJ)
  return {
    type: 'ADD_MESSAGE',
    payload: { conversationId, messageOBJ },
  }
};

export const addNewConversation = (conversation) => {
  console.log("conversation from action ", conversation)
  return {
    type: 'ADD_NEW_CONVERSATION',
    payload: conversation,
  }
};

export const newConversationToggle = () => {
  return {
    type: 'CONVERSATION_TOGGLE'
  }
  
}

export const showSuccessNotification = (message) => ({
  type: 'SHOW_SUCCESS_NOTIFICATION',
  payload: message,
});

export const showErrorNotification = (message) => ({
  type: 'SHOW_ERROR_NOTIFICATION',
  payload: message,
});