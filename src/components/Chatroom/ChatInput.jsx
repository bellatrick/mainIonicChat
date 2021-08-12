import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import { usePhotoGallery } from "../../hooks/usePhotos";

import "./styles.css";
import Waiting from "./loadersAndNotifications/Waiting";

const ChatInput = ({ sendMessage, disableFunctions }) => {
  const [waiting, setWaiting] = useState(false);
  const { takePhoto } = usePhotoGallery();

  const history = useHistory();
  const messageRef = useRef(null);
  const redirectToPhotos = () => {
    history.push("/photos");
  };
  const enableSending = () => {
    if (!disableFunctions) {
      sendMessage(message, messageRef);
    } else {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
      }, 3000);
    }
  };
  const message = messageRef?.current?.value;
  return (
    <>
      <div className="user-action">
        <span className="footer-smiley">
          <GoIcons.GoSmiley
            className="fa fa-paperclip icon"
            aria-hidden="true"
          />
        </span>
        <form
          className="footer__message"
          onSubmit={(e) => {
            e.preventDefault();
            enableSending();
          }}
        >
          <input ref={messageRef} placeholder="Type your message..." />
          <button className="hidden"></button>
        </form>
        <span
          className="footer__photo"
          onClick={() => {
            if (!disableFunctions) takePhoto();
          }}
        >
          <MdIcons.MdCamera />
        </span>
      </div>
      <button
        className="footer__speaker"
        onClick={() => {
          enableSending();
        }}
      >
        <IoIcons.IoMdPaperPlane
          className="fa fa-microphone fa-lg icon"
          aria-hidden="true"
        />
      </button>
      {waiting && <Waiting />}
    </>
  );
};

export default ChatInput;
