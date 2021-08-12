import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";

import "../components/Chatroom/styles.css";
import ChatComponent from "../components/Chatroom/ChatComponent";

const ChatRoom: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="header">
        <IonTitle>ChatRoom</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        <ChatComponent />
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;