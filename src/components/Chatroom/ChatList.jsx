import React, { useState, useContext, useEffect } from "react";

import * as GiIcons from "react-icons/gi";
import "./styles.css";
import { IonImg } from "@ionic/react";
import Preview from "../ImagePreview";
import { Store } from "../../utils/Store";
import { timeFormat, dateFormat, differenceInDates } from "./TimeFormats";

const ChatList = ({ filteredMessages, messageEndRef }) => {
  const [viewPic, setViewPic] = useState(false);
  const [pic, setPic] = useState(null);

  const { state } = useContext(Store);

  const [loggedUserName, setloggedUserName] = useState("");

  useEffect(() => {
    if (state.user) {
      setloggedUserName(state.user.username);
    }
  }, []);

  const viewPicHandler = (url) => {
    setViewPic(true);
    setPic(url);
  };
  const nodisplay = () => {
    setViewPic(false);
    setPic(null);
  };
  return (
    <div>
      {filteredMessages.map((message) => (
        <div
          className={
            message.name === loggedUserName
              ? "messages__user user-callout"
              : "messages__users--01 callout"
          }
          key={message._id}
        >
          <p className="messages__users--01-id">{message.user.username}</p>
          {message.image && (
            <span
              onClick={() => viewPicHandler(message.image)}
              className="cursor"
            >
              <IonImg src={message.image} />
            </span>
          )}
          <p className="messages__users--01-content">{message.message}</p>
          <div className="messages__user-status user-callout">
            <p className="messages__user-status--time2">
              {timeFormat(new Date(message.createdAt))}
            </p>

            {message.user.username === "naphee" && (
              <>
                <GiIcons.GiCheckMark className="fa-check icon" />
                <GiIcons.GiCheckMark className="fa-check second" />
              </>
            )}
          </div>
        </div>
      ))}
      <div
        ref={messageEndRef}
        style={{ background: "transparent", height: "10px" }}
      ></div>

      {viewPic && <Preview image={pic} nodisplay={nodisplay} />}
    </div>
  );
};

export default ChatList;
