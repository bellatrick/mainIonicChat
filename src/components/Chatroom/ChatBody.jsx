import React, { useEffect, useRef, useState} from "react";
import "./styles.css";
import { db } from "./firebase.js";
import Spinner from "./loadersAndNotifications/Spinner";
import ChatList from "./ChatList";
import Waiting from "./loadersAndNotifications/Waiting";
import {dateFormat, timeFormat} from "./TimeFormats"



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
      "https://chatproject-2db75-default-rtdb.firebaseio.com/messages.json"
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
          setdisableFunctions(false);
          scrollToBottom();
          setFailedToLoad(false)
        });
        const messagesArr2 = messagesArr.map((item) => {
          return {
            name: item.name,
            message: item.message,
            time:  dateFormat(item.time) > 2 ? `${new Date(new Date(item.time).toISOString()).toLocaleDateString()} ${timeFormat(new Date(item.time))}` : timeFormat(new Date(item.time))
          }
        })
        setLoadedMessages([...messagesArr2])
        setFailedToLoad(false)
      }).catch(err => { console.log(err) 
        setFailedToLoad(true) });
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (setScroll) scrollToBottom();
    db.ref("messages").on("value", (snapshot) => {
      let messagesArr = [];
      snapshot.forEach((snap) => {
        messagesArr.push(snap.val());
        setLoadedMessages([...messagesArr]);
        setdisableFunctions(false);
      });
      scrollToBottom();
    });
  });
  const filteredMessages =
    loadedMessages.length !== 0
      ? loadedMessages.sort(function (a, b) {
        return Object.values(a.time) < Object.values(b.time) ? 1 : -1;
      })
      : [];
  return (
    <div>
      {disableFunctions && <Spinner message="Loading chats..." />}
      {failedToLoad && <Waiting message="Network error. Please refresh..." failedToLoad={failedToLoad} reload={fetchMessages} />}

      {!disableFunctions && (
        <ChatList
          filteredMessages={filteredMessages}
          messageEndRef={messageEndRef}
        />
      )}
    </div>
  );
};

export default ChatBody;
