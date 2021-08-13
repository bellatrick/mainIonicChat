import ReactDom from "react-dom";
import "./waiting.css";
import { AiOutlineReload } from "react-icons/ai";

const Waiting = ({ message, failedToLoad, reload }) => {
  return ReactDom.createPortal(
    <>
      <div className="waiting__modal">
        <p>{message}</p>
        {failedToLoad && <AiOutlineReload onClick={reload} className="reload" />}
      </div>
    </>,
    document.getElementById("post_root")
  );
};

export default Waiting;
