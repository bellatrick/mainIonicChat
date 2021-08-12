import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const history = useHistory();

  const redirectToChats = () => {
    history.push("/chatroom");
  };
  const redirectToSignUp = () => {
    history.push("/signup");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <button onClick={redirectToChats}>Click to login</button>
        <button onClick={redirectToSignUp}>New? sign up</button>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
