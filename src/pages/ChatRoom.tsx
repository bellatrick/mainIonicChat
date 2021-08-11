import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { images, square, triangle,  receiptOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PhotoPage from './PhotoPage';
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
      <IonTabs>
      <IonRouterOutlet>


  
          <Route path="/tab1" component={LoginPage} exact={true} />
          <Route path="/tab2" component={PhotoPage} exact={true} />
          <Route path="/tab3" component={ChatRoom} /> 
          <Route path="/" render={() => <Redirect to="/tab3" />} exact={true} />
       </IonRouterOutlet>


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
        </IonTabBar>
      </IonTabs>
    </IonContent>
   
  </IonPage>
  );
};

export default ChatRoom;
