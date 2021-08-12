import { Redirect, Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ChatRoom from "./pages/ChatRoom";
import PhotoPage from "./pages/PhotoPage";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { images, square, triangle, receiptOutline } from "ionicons/icons";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Store } from "./utils/Store";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import "./theme/variables.css";
import Registration from "./pages/Registration";
import { StoreProvider } from "./utils/Store";
import Verification from "./pages/Verification";
import PhotoProvider from "./contexts/photoContext";
const App: React.FC = () => {
  // const { state } = useContext(Store);
  // const { user } = state;

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" component={LoginPage} exact={true} />
            <PhotoProvider>
           
              <Route path="/gallery" component={PhotoPage} exact={true} />
              <Route path="/chats" component={ChatRoom} exact={true} />
            </PhotoProvider>
            <Route path="/register" component={Registration} exact={true} />
            <Route path="/verify" component={Verification} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/chats" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={triangle} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
            <IonTabButton tab="gallery" href="/gallery">
              <IonIcon icon={images} />
              <IonLabel>Photos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Chats" href="/chats">
              <IonIcon icon={square} />
              <IonLabel>Chats</IonLabel>
            </IonTabButton>
            <IonTabButton tab="register" href="/register">
              <IonIcon icon={receiptOutline} />
              <IonLabel>Registration</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
