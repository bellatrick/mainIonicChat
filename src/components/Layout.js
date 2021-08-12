import { images, square, triangle, receiptOutline } from "ionicons/icons";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
const Layout = ({ children }) => {
 
  return (
    <>{children}
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
    </>
  );
};

export default Layout;
