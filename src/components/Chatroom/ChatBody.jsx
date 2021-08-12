import React, { useEffect, useRef, useState } from "react";
import * as GiIcons from "react-icons/gi";
import "./styles.css";
import { IonImg } from "@ionic/react";
import { db } from "./firebaseConfig";
import Spinner from "./loadersAndNotifications/Spinner";
import Preview from "../ImagePreview";
import ChatList from "./ChatList";

const dateNow = Date();
const oneDay = 24 * 60 * 60 * 1000;
const twoDays = 48 * 60 * 60 * 1000;

const ChatBody = ({
  loadedMessages,
  setLoadedMessages,
  disableFunctions,
  setdisableFunctions,
  setScroll,
}) => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    const fetchMessages = () => {
      fetch(
        "https://chatproject-2db75-default-rtdb.firebaseio.com/messages.json"
      )
        .then((response) => response.json())
        .then((messages) => {
          const messagesArr = [];
          if (!messages) {
            setLoadedMessages([]);
            return;
          }
          const messagesIDs = Object.keys(messages);
          messagesIDs.forEach((message, index) => {
            messagesArr.push(messages[message]);
            setLoadedMessages([...messagesArr]);
            setdisableFunctions(false);
            scrollToBottom();
          });
        });
    };
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
          return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
        })
      : [];
  return (
    <div>
      {disableFunctions && <Spinner message="Loading chats..." />}

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
