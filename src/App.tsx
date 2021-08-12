import { Redirect, Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ChatRoom from "./pages/ChatRoom";
import PhotoPage1 from "./pages/PhotoPage";
import LoginPage from "./pages/LoginPage";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Registration from "./pages/Registration";
import PhotoProvider from "./contexts/photoContext";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route path="/login" component={LoginPage} exact={true} />
      <PhotoProvider>
        <Route path="/photos" component={PhotoPage1} exact={true} />
        <Route path="/chatroom" component={ChatRoom} exact={true} />
      </PhotoProvider>

      {/* <Route path="/tab3" component={ChatRoom} /> */}
      <Route path="/signup" component={Registration} exact={true} />
      <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
    </IonReactRouter>
  </IonApp>
);
export default App;
