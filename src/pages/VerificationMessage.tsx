import { IonContent, IonPage } from '@ionic/react';
import VerifyMessage from '../components/VerifyMessage';

import './Tab1.css';

const Verification: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <VerifyMessage/>
      </IonContent>
    </IonPage>
  );
};

export default Verification;
