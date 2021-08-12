import React, { useEffect, useRef, useState } from "react";
import * as GiIcons from "react-icons/gi";
import "./styles.css";
import { IonImg } from "@ionic/react";
// import { db } from "./firebaseConfig";
import Spinner from "./loadersAndNotifications/Spinner";
import ChatList from "./ChatList";
import Waiting from "./loadersAndNotifications/Waiting";

const dateFormat = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? "0" + minutes : minutes
  const timestamp = hours + ":" + minutes + ampm
  return timestamp
}
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
        const messagesArr = [];
        if (!messages || messages.length === 0) {
          setLoadedMessages([]);
          return;
        }
        const messagesIDs = Object.keys(messages);
        messagesIDs.forEach((message, index) => {
          messagesArr.push(messages[message]);

          messagesArr.map((item) => {
            return {
              name: item.name,
              message: item.message,
              time: new Date(new Date().toLocaleString) - new Date(new Date(item.time).toLocaleString()) > 2 ? `${item.time.toLocaleDateString().slice(0, 9)} ${dateFormat(item.time)}` : dateFormat(item.time)
            }
          })
          setLoadedMessages([...messagesArr]);
          console.log(loadedMessages)
          setdisableFunctions(false);
          scrollToBottom();
        });
      }).catch(err => { setFailedToLoad(true) });
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (setScroll) scrollToBottom();
    //   db.ref("messages").on("value", (snapshot) => {
    //     let messagesArr = [];
    //     snapshot.forEach((snap) => {
    //       messagesArr.push(snap.val());
    //       setLoadedMessages([...messagesArr]);
    //       setdisableFunctions(false);
    //     });
    //     scrollToBottom();
    //   });
  });
  const filteredMessages =
    loadedMessages.length !== 0
      ? loadedMessages.sort(function (a, b) {
        return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
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
