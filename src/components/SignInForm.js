import { useContext } from "react";
import "./SignInForm.css";
import {FcGoogle} from 'react-icons/fc'
import { Store } from "../utils/Store";
import { useHistory } from "react-router-dom";
import { auth } from "../components/Chatroom/firebase";
import firebase from "firebase/app";

const SignInForm = () => {
  const history = useHistory();

  const { user } = useContext(Store);
  return (
    <div className="formSec">
      <h1>Welcome to Ionic Group Chat</h1>
      <button
        type="submit"
        style={{ margin: "auto" }}
        className="btn"
        onClick={() =>{ 
          auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          user&&history.push('/chats')}
        }
      ><FcGoogle/>   <nbsp/>
          Sign In with google
      </button>
    </div>
  );
};

export default SignInForm;
