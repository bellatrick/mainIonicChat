import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import {Button} from '@material-ui/core';
import "../components/Chatroom/styles.css";
import ChatComponent from "../components/Chatroom/ChatComponent";
import {useHistory} from 'react-router-dom'
import { Store } from "../utils/Store";

import {auth} from '../components/Chatroom/firebase'
import {useContext, useEffect} from 'react'
const ChatRoom: React.FC = () => {
  const history = useHistory()

  const { dispatch, user}= useContext(Store)
  const handleLogout= async()=>{
    await auth.signOut()
    history.push('/login')
}
  useEffect(()=>{
     if(!user) 
     history.push('/login')
  },[])

  return (
    <IonPage>
      <IonToolbar>
      <IonHeader className="header">
        <IonTitle>ChatRoom</IonTitle>

        <div className='chat-aside'>
        <Button onClick={()=> history.push('/gallery')}>Gallery</Button>
        <Button onClick={()=> {
          handleLogout()
          dispatch({type:'LOGOUT'})}}>Logout</Button>
        </div>
      </IonHeader>
      </IonToolbar>
      
      <IonContent fullscreen>
      <ChatComponent />
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;