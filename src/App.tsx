import { Redirect, Route, useLocation } from 'react-router-dom';
import { images, square, triangle, ellipse, phonePortrait, receiptOutline } from 'ionicons/icons';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import PhotoPage from './pages/PhotoPage';
import ChatRoom from './pages/ChatRoom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Registration from './pages/Registration';

interface LocationState {
  from: {
    pathname:string
  }
}
const App: React.FC = () => { 
  const location = useLocation<LocationState>()
  const {from} = location.state
  return  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={LoginPage} exact={true} />
          <Route path="/tab2" component={PhotoPage} exact={true} />
          <Route path="/tab3" component={ChatRoom} />
          <Route path="/tab4" component={Registration} exact={true} />
          <Route path="/" render={() => <Redirect to="/tab3" />} exact={true} />
        </IonRouterOutlet>
       {from.pathname==='/tab3' && 
         <IonTabBar slot="bottom">
         <IonTabButton tab="tab1" href="/tab1">
           <IonIcon icon={triangle} />
           <IonLabel>Tab One</IonLabel>
         </IonTabButton>
         <IonTabButton tab="tab2" href="/tab2">
           <IonIcon icon={images} />
           <IonLabel>Photos</IonLabel>
         </IonTabButton>
         <IonTabButton tab="tab3" href="/tab3">
           <IonIcon icon={square} />
           <IonLabel>Tab Three</IonLabel>
         </IonTabButton>
         <IonTabButton tab="tab4" href="/tab4">
           <IonIcon icon={receiptOutline} />
           <IonLabel>Registration</IonLabel>
         </IonTabButton>
       </IonTabBar>}
      </IonTabs>
    </IonReactRouter>
  </IonApp>
}
export default App;
