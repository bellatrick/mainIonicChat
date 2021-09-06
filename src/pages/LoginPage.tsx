import { IonContent, IonPage } from '@ionic/react';

import SignInForm from '../components/SignInForm';
import './Tab1.css';

const LoginPage: React.FC = () => {
  
  return (
    <IonPage className='loginPage'>
     <IonContent>
     <SignInForm/>
     </IonContent>   
    </IonPage>
  );
};

export default LoginPage;
