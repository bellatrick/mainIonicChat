import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { usePhotoGallery} from '../hooks/usePhotos';
import ImageContainer from '../components/imageContainer';
const ChatRoom: React.FC = () => {
  const { deletePhoto, photos, takePhoto, singlePhoto } = usePhotoGallery();

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
