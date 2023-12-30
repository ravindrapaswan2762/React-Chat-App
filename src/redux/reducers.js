import dummyData from '../dummyData.json';

const initialState = {
  isContactForm: false,
  conversations: [...dummyData.conversations],
  successNotification: null,
  errorNotification: null,
};


export const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ADD_MESSAGE':
      console.log(action.payload.conversationId, " ,,, ", action.payload.messageOBJ)
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          console.log(conversation.id, " === ", parseInt(action.payload.conversationId))
          if (conversation.id === parseInt(action.payload.conversationId)) {
            
            return {
              ...conversation,
              lastMsg: action.payload.messageOBJ.text,
              messages: [...conversation.messages, action.payload.messageOBJ],
        
            };
          }
          return conversation;
        }),
      };


    case 'ADD_NEW_CONVERSATION':
      console.log('add con. from reducer ', action.payload)
      const newConversationId = state.conversations.length + 1;

      return {
        ...state,
        conversations: [
          {
            id: newConversationId,
            ...action.payload
          },
          ...state.conversations,
        ],
      };


      case 'CONVERSATION_TOGGLE':
        return {
          ...state,
          isContactForm: !state.isContactForm
        }

      case 'SHOW_SUCCESS_NOTIFICATION':
        return {
          ...state,
          successNotification: action.payload,
        };

      case 'SHOW_ERROR_NOTIFICATION':
        return {
          ...state,
          errorNotification: action.payload,
        };


      case 'CLOSE_NOTIFICATIONS':
        return {
          ...state,
          successNotification: null,
          errorNotification: null,
        };



    default:
      return state;
  }
};

export default reducer;
