import React, { useEffect, useRef } from "react";
import * as GiIcons from "react-icons/gi";
import "./styles.css";
import { IonImg } from "@ionic/react";
import { db } from "./firebase";
import Spinner from "./loadersAndNotifications/Spinner";

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
  }, [setLoadedMessages, setdisableFunctions]);

  useEffect(() => {
    if (setScroll) scrollToBottom();
    db.ref("messages").on("value", (snapshot) => {
      let messagesArr = [];
      snapshot.forEach((snap) => {
        messagesArr.push(snap.val());
        setLoadedMessages([...messagesArr]);
        console.log("fetched");
        setdisableFunctions(false);
      });
      scrollToBottom();
    });
  });
  const filteredMessages = loadedMessages.sort(function (a, b) {
    return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
  });
  return (
    <div>
      {disableFunctions && <Spinner message="Loading chats..." />}

      {!disableFunctions &&
        filteredMessages.map((message, i) => (
          <div
            className={
              message.name === "naphee"
                ? "messages__user user-callout"
                : "messages__users--01 callout"
            }
            key={i}
          >
            <p className="messages__users--01-id">{message.name}</p>
            <p className="messages__users--01-content">{message.message}</p>
            <div className="messages__user-status user-callout">
              <p className="messages__user-status--time2">
                {message.time.slice(16, 21)}
              </p>

              {message.name === "naphee" && (
                <>
                  <GiIcons.GiCheckMark className="fa-check icon" />
                  <GiIcons.GiCheckMark className="fa-check second" />
                </>
              )}
            </div>

            {message.imageUrl && (
              <span>
                <IonImg src={message.imageUrl} />
              </span>
            )}
          </div>
        ))}
      <div
        ref={messageEndRef}
        style={{ background: "transparent", height: "10px" }}
      ></div>
    </div>
  );
};

export default ChatBody;
