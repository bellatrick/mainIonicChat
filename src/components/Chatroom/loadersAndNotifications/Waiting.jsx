import ReactDom from "react-dom";
import "./waiting.css";

const Waiting = () => {
  console.log("waiting");
  return ReactDom.createPortal(
    <>
      <div className="waiting__modal">
        <p>Please wait...</p>
      </div>
    </>,
    document.getElementById("post_root")
  );
};

export default Waiting;
