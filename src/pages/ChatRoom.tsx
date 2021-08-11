import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';


const ChatRoom: React.FC = () => {
 

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>ChatRoom</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">ChatRoom</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer name="Tab 1 page" />
      
    </IonContent>
  </IonPage>
  );
};

export default ChatRoom;
