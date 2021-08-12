import ReactDom from "react-dom";
import "./spinner.css";

const Spinner = ({ message }) => {
  return ReactDom.createPortal(
    <div className="modal">
      <h3>{message}</h3>
      <div className="modal__spinner full__height"></div>
    </div>,
    document.getElementById("post_root")
  );
};

export default Spinner;
