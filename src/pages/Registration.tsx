import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { usePhotoGallery} from '../hooks/usePhotoGallery';
import ImageContainer from '../components/imageContainer';
const Registration: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();

  return (
    <IonPage>
    <ImageContainer/>
    </IonPage>
  );
};

export default Registration;
