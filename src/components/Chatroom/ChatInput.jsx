import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as FaIcons from "react-icons/fa";
import { usePhotoGallery } from "../../hooks/usePhotos";

import "./styles.css";
import Waiting from "./loadersAndNotifications/Waiting";

const ChatInput = ({ sendMessage, disableFunctions }) => {
  const [waiting, setWaiting] = useState(false);
  const { takePhoto } = usePhotoGallery();
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();

  const redirectToPhotos = () => {
    history.push("/photos");
  };
  const enableSending = () => {
    if (disableFunctions === false) {
      sendMessage(inputValue);
    } else {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
      }, 3000);
    }
  };
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
            setInputValue("");
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="hidden"></button>
        </form>
        <span
          className="footer__photo"
          onClick={() => {
            if (!disableFunctions) redirectToPhotos();
          }}
        >
          <FaIcons.FaPaperclip />
        </span>
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
          setInputValue("");
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
