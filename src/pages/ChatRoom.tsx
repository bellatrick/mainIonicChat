import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import {Button} from '@material-ui/core';
import "../components/Chatroom/styles.css";
import ChatComponent from "../components/Chatroom/ChatComponent";
import {useHistory} from 'react-router-dom'
import { Store } from "../utils/Store";
import {useContext} from 'react'
const ChatRoom: React.FC = () => {
  const history = useHistory()

  const {dispatch}= useContext(Store)
  return (
    <IonPage>
      <IonToolbar>
      <IonHeader className="header">
        <IonTitle>ChatRoom</IonTitle>
        <div className='chat-aside'>
        <Button onClick={()=> history.replace('/gallery')}>Gallery</Button>
        <Button onClick={()=> {
          history.replace('/login')
          dispatch({type:'LOGOUT'})}}>Logout</Button>
        </div>
       
        {/* <button onClick={() => takePhoto()}>Post a picture</button> */}
      </IonHeader>
      </IonToolbar>
      
      <IonContent fullscreen>
        <ChatComponent />
     
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;