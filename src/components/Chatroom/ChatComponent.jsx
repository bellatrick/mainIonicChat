import React, { useState, useContext, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatBody";
import "./styles.css";
// import { db } from "./firebase";
import { PhotoContext } from "../../contexts/photoContext";
import Posting from "./Posting";
import { Store, StoreProvider } from "../../utils/Store";
import { timeFormat } from "./TimeFormats";

const ChatComponent = () => {
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [disableFunctions, setdisableFunctions] = useState(true);
  const { photoToPost, setPhotoToPost } = useContext(PhotoContext);
  const { state } = useContext(Store);
  const [loggedUserName, setloggedUserName] = useState('')

  useEffect(() => {
    if (state.user) {
     setloggedUserName(state.user.username)
     console.log(state.user.username)
    }

  }, []);

  const closePost = () => {
    setPhotoToPost(null);
  };

  const sendMessage = (message) => {
    if (message.trim() === "") {
      console.log("empty");
      return;
    }
    const time = new Date();
    
    setLoadedMessages([...loadedMessages, {
      message: message,
      createdAt:timeFormat(time)
    }]);
    setScroll(true);
    const pushNewMessage = () => {
      fetch(
        "https://anter-chat-app.herokuapp.com/api/v1/message",
        {
          method: "POST",
          body: JSON.stringify({message:message}),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(function (response) { })
        .catch((error) => console.log(error));
    };
    pushNewMessage();
  };

  return (
    <StoreProvider>
      <div className="wrapper">
        <div className="messages">
          <ChatBody
            loadedMessages={loadedMessages}
            setLoadedMessages={setLoadedMessages}
            disableFunctions={disableFunctions}
            setdisableFunctions={setdisableFunctions}
            setScroll={setScroll}
          />
        </div>
        <div className="footer">
          <ChatInput
            sendMessage={sendMessage}
            disableFunctions={disableFunctions}
          />
        </div>
        {photoToPost && (
          <Posting
            photo={photoToPost}
            closePost={closePost}
            loadedMessages={loadedMessages}
            setLoadedMessages={setLoadedMessages}
            name={loggedUserName}
          />
        )}
      </div>
    </StoreProvider>
  );
};

export default ChatComponent;
