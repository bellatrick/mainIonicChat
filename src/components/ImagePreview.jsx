import ReactDom from "react-dom";
import "./Chatroom/styles.css";
import * as AiIcons from "react-icons/ai";
import { IonImg } from "@ionic/react";

const Preview = ({ image, nodisplay }) => {
  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={nodisplay}></div>
      <div className="preview__modal">
        <AiIcons.AiFillCloseCircle
          className="close__icon"
          onClick={nodisplay}
        />
        <div>
          <IonImg className="preview__image__div" src={image} />
        </div>
      </div>
    </>,
    document.getElementById("post_root")
  );
};

export default Preview;
