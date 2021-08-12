import React, { useState } from "react";

import * as GiIcons from "react-icons/gi";
import "./styles.css";
import { IonImg } from "@ionic/react";
import Preview from "../ImagePreview";

const dateNow = Date();
const oneDay = 24 * 60 * 60 * 1000;
const twoDays = 48 * 60 * 60 * 1000;

const ChatList = ({ filteredMessages, messageEndRef }) => {
  const [viewPic, setViewPic] = useState(false);
  const [pic, setPic] = useState(null);

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
      {filteredMessages.map((message, i) => (
        <div
          className={
            message.name === "naphee"
              ? "messages__user user-callout"
              : "messages__users--01 callout"
          }
          key={i}
        >
          <div className="moment">
            {Math.round(Math.abs(dateNow - message.time) / oneDay) === 1 && (
              <h3>Today</h3>
            )}

            {Math.round(Math.abs(dateNow - message.time) / twoDays) === 2 && (
              <h3>Yesterday</h3>
            )}
          </div>
          <p className="messages__users--01-id">{message.name}</p>
          {message.imageUrl && (
            <span onClick={() => viewPicHandler(message.imageUrl)}>
              <IonImg src={message.imageUrl} />
            </span>
          )}
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
