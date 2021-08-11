import { IonContent, IonPage } from '@ionic/react';

import VerifyUser from '../components/VerifyUser';
import './Tab1.css';

const Verification: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <VerifyUser/>
      </IonContent>
    </IonPage>
  );
};

export default Verification;
