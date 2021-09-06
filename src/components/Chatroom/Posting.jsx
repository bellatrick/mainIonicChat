import { useRef, useContext, useState } from "react";
import ReactDom from "react-dom";
import { PhotoContext } from "../../contexts/photoContext";
import "./styles.css";
import { IonImg } from "@ionic/react";
import * as AiIcons from "react-icons/ai";
import Notification from "./loadersAndNotifications/Notification";
import { timeFormat } from "./TimeFormats";

const Posting = ({
  photo,
  closePost,
  setLoadedMessages,
  loadedMessages,
  name,
}) => {
  const [isPosting, setIsPosting] = useState(true);
  const { setPhotoToPost } = useContext(PhotoContext);
  const captionRef = useRef(null);

  const nodisplay = () => {
    setIsPosting(true);
  };

  const submitPost = (e) => {
    e.preventDefault();
    setIsPosting(true);
    const message = captionRef.current.value;
    const time = new Date();
    const messageObject = {
      name: name,
      message: message,
      time:time,
      imageUrl: photo,
    };
    setLoadedMessages([...loadedMessages, messageObject]);
    fetch(
      "https://react-chat-6b90f-default-rtdb.firebaseio.com/messages.json",
      {
        method: "POST",
        body: JSON.stringify(messageObject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        setPhotoToPost(null);
      })
      .catch((error) => setIsPosting(false));
  };
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="post__modal">
        <AiIcons.AiFillCloseCircle
          className="post__close"
          onClick={closePost}
        />
        <div className="post__image">
          <IonImg src={photo} />
        </div>

        <div className="post__form">
          <form onSubmit={submitPost}>
            <input style={{width:'80%'}} placeholder="Say something..." ref={captionRef} />
            <button className="post__button" onClick={closePost}>
              Post
            </button>
          </form>
        </div>
        {!isPosting && (
          <Notification
            notification="Unable to post. Please try again"
            nodisplay={nodisplay}
            tryAgain={submitPost}
          />
        )}
      </div>
    </>,
    document.getElementById("post_root")
  );
};

export default Posting;
