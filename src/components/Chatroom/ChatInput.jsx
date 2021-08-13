import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as FaIcons from "react-icons/fa";
import { usePhotoGallery } from "../../hooks/usePhotos";
import { Picker } from "emoji-mart";

import "./styles.css";
import Waiting from "./loadersAndNotifications/Waiting";

const ChatInput = ({ sendMessage, disableFunctions }) => {
  const [waiting, setWaiting] = useState(false);
  const { takePhoto } = usePhotoGallery();
  const [inputValue, setInputValue] = useState("");

  const [openEmoji, setOpenEmoji] = useState(false);

  const history = useHistory();

  const redirectToPhotos = () => {
    history.push("/photos");
  };
  const enableSending = () => {
    if (disableFunctions === false) {
      sendMessage(inputValue);
      setOpenEmoji(false);
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
            className="fa fa-paperclip icon cursor"
            aria-hidden="true"
            onClick={() => {
              if (!disableFunctions) setOpenEmoji((prev) => !prev)
            }
            }
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
          className = "cursor"
        >
          <FaIcons.FaPaperclip />
        </span>
        <span
          className="footer__photo"
          onClick={() => {
            if (!disableFunctions) takePhoto();
          }}
          className = "cursor"
        >
          <MdIcons.MdCamera />
        </span>
      </div>
      <button
        className="footer__speaker cursor"
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
      {waiting && <Waiting message="Please wait..." />}
      {openEmoji && (
        <>
          <div className="overlay" onClick={() => setOpenEmoji(false)}></div>
          <Picker
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={(emoji) => {
              console.log(emoji.native);
              setInputValue(inputValue + emoji.native);
            }}
            style={{
              position: "absolute",
              bottom: "50px",
              left: "20px",
              width: "300px",
              height: "300px",
              background: "white",
            }}
          />
        </>
      )}
    </>
  );
};

export default ChatInput;
