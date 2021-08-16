import React, { useEffect, useRef, useState, useContext } from "react";
import "./styles.css";
import { db } from "./firebase.js";
import Spinner from "./loadersAndNotifications/Spinner";
import ChatList from "./ChatList";
import Waiting from "./loadersAndNotifications/Waiting";
import { dateFormat, timeFormat } from "./TimeFormats";
import { Store } from "../../utils/Store";

const ChatBody = ({
  loadedMessages,
  setLoadedMessages,
  disableFunctions,
  setdisableFunctions,
  setScroll,
}) => {
  const messageEndRef = useRef(null);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const { state } = useContext(Store);
  console.log(state.user);
  const scrollToBottom = () => {
    messageEndRef.current && messageEndRef.current.scrollIntoView();
  };
  const fetchMessages = () => {
    setFailedToLoad(false);
    fetch("https://anter-chat-app.herokuapp.com/api/v1/message")
      .then((response) => response.json())
      .then((incomingData) => {
        const loadedData = [...incomingData.data];
        setdisableFunctions(false);
        setLoadedMessages(loadedData);
        scrollToBottom();
        setFailedToLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setFailedToLoad(true);
      });
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
  }, []);
  const filteredMessages =
    loadedMessages.length !== 0
      ? loadedMessages.sort(function (a, b) {
          return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
        })
      : [];
  return (
    <div>
      {disableFunctions && <Spinner message="Loading chats..." />}
      {failedToLoad && (
        <Waiting
          message="Network error. Please refresh..."
          failedToLoad={failedToLoad}
          reload={fetchMessages}
        />
      )}

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
