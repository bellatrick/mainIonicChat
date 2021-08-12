import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
// import Emoji from "./Emoji";
// import * as AiIcons from "react-icons/ai";
// import * as GiIcons from "react-icons/gi";
// import Picker from "emoji-picker-react";

// const API_ENDPOINT =
//   "https://chatproject-2db75-default-rtdb.firebaseio.com/messages.json";

const ChatPage = () => {
  const messageRef = useRef(null);
  const messageEndRef = useRef(null);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [sendingIcon, setSendingIcon] = useState(false);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    setSending(false);
    setSendingIcon(false);
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
            scrollToBottom();
          });
        });
    };
    fetchMessages();
    return () => {};
  }, [sending]);

  // useEffect(() => {
  //   scrollToBottom();
  //   return () => {};
  // }, [loadedMessages]);

  const filteredMessages = loadedMessages.sort(function (a, b) {
    return Object.values(a.time) < Object.values(b.time) ? -1 : 1;
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message.trim() === "") return;
    const time = Date();

    setLoadedMessages([
      ...loadedMessages,
      {
        name: "naphee",
        message: message,
        time: time,
      },
    ]);
    scrollToBottom();
    setSendingIcon(true);

    fetch(
      "https://chatproject-2db75-default-rtdb.firebaseio.com/messages.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: "naphee",
          message: message,
          time: time,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        setSending(true);
      })
      .catch((error) => console.log(error));

    messageRef.current.value = "";
  };
  return (
    <div className="chat__container">
      <div className="chat__body">
        {filteredMessages.map((message, i) => (
          <div
            className={message.name === "naphee" ? "mymessage" : "theirmessage"}
            key={i}
          >
            {/* <img className="user__image__circle" alt="" /> */}
            <p className="nameStamp">{message.name}</p>
            <p>{message.message}</p>
            <span className="timestamp">{message.time.slice(16, 21)}</span>
            {/* <span className="loading__icon">
              {message.name !== "naphee" && <GiIcons.GiCheckMark />}
              {message.name === "naphee" && (
                <div>
                  {sendingIcon &&
                  message === filteredMessages[filteredMessages.length - 1] ? (
                    <AiIcons.AiOutlineClockCircle />
                  ) : (
                    <GiIcons.GiCheckMark />
                  )}
                </div>
              )}
            </span> */}
          </div>
        ))}
        <div
          ref={messageEndRef}
          style={{ background: "red", height: "10px" }}
        ></div>
      </div>
      <div style={{ width: "100%", height: "50px" }}>
        <form className="chat__form" onSubmit={sendMessage}>
          {/* <Picker onEmojiClick={onEmojiClick} /> */}
          <input ref={messageRef} />
          {/* <Emoji /> */}
          <button>Send message</button>
        </form>
      </div>
    </div>
  );
};

// AiOutlineClockCircle
// GiCheckMark
export default ChatPage;
