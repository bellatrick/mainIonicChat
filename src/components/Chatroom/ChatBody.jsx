import React, { useEffect, useRef, useState, useContext} from "react";
import "./styles.css";
import { db } from "./firebase.js";
import Spinner from "./loadersAndNotifications/Spinner";
import ChatList from "./ChatList";
import Waiting from "./loadersAndNotifications/Waiting";

const ChatBody = ({
  loadedMessages,
  setLoadedMessages,
  disableFunctions,
  setdisableFunctions,
  setScroll,
}) => {
  const messageEndRef = useRef(null);
  const [failedToLoad, setFailedToLoad] = useState(false)

  const scrollToBottom = () => {
    messageEndRef.current && messageEndRef.current.scrollIntoView();
  };
  const fetchMessages = () => {
    setFailedToLoad(false)
    fetch(
      "https://react-chat-6b90f-default-rtdb.firebaseio.com/messages.json"
    )
      .then((response) => response.json())
      .then((messages) => {
        
        console.log("supposed")
        const messagesArr = [];
        if (!messages || messages.length === 0) {
          setLoadedMessages([]);
          console.log("no messages")
          setdisableFunctions(false)
          return;
        }
        const messagesIDs = Object.keys(messages);
        messagesIDs.forEach((message, index) => {
          messagesArr.push(messages[message]);
          setLoadedMessages([...messagesArr])
          setdisableFunctions(false);
          setLoadedMessages([...messagesArr])
          scrollToBottom();
          setFailedToLoad(false)
        });

        setFailedToLoad(false)
      }).catch(err => { console.log(err) 
        setFailedToLoad(true) });
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (setScroll) scrollToBottom(); 
      const unsubscribe= db.ref("messages").on("value", (snapshot) => {
      let messagesArr = [];
      snapshot?.forEach((snap) => {
        messagesArr.push(snap.val());
        setLoadedMessages(filteredMessages([...messagesArr]));
        setdisableFunctions(false);
      });
      scrollToBottom();
    });
    return ()=>{
      unsubscribe()
    }
  }, []);
  const filteredMessages =(messages)=>{  
   if( messages.length !== 0)
     return messages.sort(function (a, b) {
      return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
    })
    else return []
  }
   
  return (
    <div>
      {disableFunctions && <Spinner message="Loading chats..." />}
      {failedToLoad && <Waiting message="Network error. Please refresh..." failedToLoad={failedToLoad} reload={fetchMessages} />}

      {!disableFunctions && (
        <ChatList
          filteredMessages={loadedMessages}
          messageEndRef={messageEndRef}
        />
      )}
    </div>
  );
};

export default ChatBody;
