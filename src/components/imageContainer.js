import React,{useEffect} from 'react'
import { usePhotoGallery } from '../hooks/usePhotos';
import {IonRow, IonCol, IonImg} from '@ionic/react'
const ImageContainer = () => {
    const { deletePhoto, photos, takePhoto, singlePhoto } = usePhotoGallery();
 
    return (
        <>

        <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="4" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
         </IonRow>
        </>
    )
}

export default ImageContainer
