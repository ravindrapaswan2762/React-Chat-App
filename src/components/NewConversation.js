// Importing necessary hooks and actions from React and Redux
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addNewConversation } from "../redux/actions";
import styles from '../assets/NewConversation.module.css';

// Importing notification actions
import { showSuccessNotification } from "../redux/actions";
import { showErrorNotification } from "../redux/actions";

// NewConversation component to add a new conversation
export function NewConversation(){
    // State to manage the input for the contact name
    const [name, setName] = useState("");
    
    // Accessing the dispatch function from Redux
    const dispatch = useDispatch();

    // Function to handle adding a new conversation
    const handler = async () => {
        try {
          // Dispatching the action to add a new conversation
          await dispatch(addNewConversation({ "contactName": name, lastMsg: "", "messages": [] }, () => {
            console.log("Conversation added successfully");
          }));
          
          // Clearing the input field after successful addition
          await setName("");
          
          // Showing a success notification
          dispatch(showSuccessNotification("Conversation added successfully!"));
        } catch (error) {
          // Showing an error notification in case of failure
          dispatch(showErrorNotification(error));
        }
    };

    // Rendering the NewConversation component
    return (
        <div className={styles.NewConversationBox}>
            {/* Input field for entering the contact name */}
            <input 
                className={styles.textArea} 
                type="text" 
                placeholder="Enter contact name" 
                required
                onChange={(e)=>setName(e.target.value)}
                value={name}
            />
            
            {/* Button to trigger the conversation addition */}
            <button className={styles.button} onClick={handler}>Add</button>
        </div>
    )
}
