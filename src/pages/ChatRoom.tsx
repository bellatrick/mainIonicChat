import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";

import "../components/Chatroom/styles.css";
import ChatComponent from "../components/Chatroom/ChatComponent";

const ChatRoom: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="header">
        <IonTitle>ChatRoom</IonTitle>
        {/* <button onClick={() => takePhoto()}>Post a picture</button> */}
      </IonHeader>
      <IonContent fullscreen>
        <ChatComponent />
        {/* <ChatComponent /> */}
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ChatRoom</IonTitle>
          </IonToolbar>
        </IonHeader> */}
      </IonContent>
    </IonPage>
  );
};

export default ChatRoom;
