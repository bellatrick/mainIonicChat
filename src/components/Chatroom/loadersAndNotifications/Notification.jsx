import ReactDom from "react-dom";
import * as AiIcons from "react-icons/ai";
import "../styles.css";

const Notification = ({ notification, nodisplay, tryAgain }) => {
  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={nodisplay}></div>
      <div className="modal">
        <AiIcons.AiFillCloseCircle
          className="close__icon cursor"
          onClick={nodisplay}
        />
        <p className="modal__paragraph">{notification}</p>
        <button onClick={tryAgain} className = "cursor">Retry</button>
      </div>
    </>,
    document.getElementById("post_root")
  );
};

export default Notification;
