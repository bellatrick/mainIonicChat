import React, { useState, useContext } from "react";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatBody";
import "./styles.css";
import { db } from "./firebase";
import { PhotoContext } from "../../contexts/photoContext";
import Posting from "./Posting";

const pushNewMessage = async (object) => {
  await db.ref("messages").push(object);
};
const ChatComponent = () => {
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [disableFunctions, setdisableFunctions] = useState(true);
  const { photoToPost, setPhotoToPost } = useContext(PhotoContext);

  const closePost = () => {
    setPhotoToPost(null);
  };

  const sendMessage = (message, ref) => {
    if (message?.trim() === "") return;
    const time = Date();

    const messageObject = {
      name: "naphee",
      message: message,
      time: time,
    };
    if (disableFunctions) return;
    setLoadedMessages([...loadedMessages, messageObject]);

    ref.current.value = "";
    pushNewMessage(messageObject);
  };

  return (
    <div className="wrapper">
      <div className="messages">
        <ChatBody
          loadedMessages={loadedMessages}
          setLoadedMessages={setLoadedMessages}
          disableFunctions={disableFunctions}
          setdisableFunctions={setdisableFunctions}
        />
      </div>
      <div className="footer">
        <ChatInput
          sendMessage={sendMessage}
          disableFunctions={disableFunctions}
        />
      </div>
      {photoToPost && <Posting photo={photoToPost} closePost={closePost} />}
    </div>
  );
};

export default ChatComponent;
