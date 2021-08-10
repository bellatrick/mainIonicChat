import React,{useEffect} from 'react'
import { usePhotoGallery } from '../hooks/usePhotos';

const ImageContainer = () => {
    const { deletePhoto, photos, takePhoto, singlePhoto } = usePhotoGallery();
   useEffect(() => {
     
    console.log(singlePhoto)
    console.log(photos)
   }, [singlePhoto, photos])
    return (
        <>
        <img style={{width:'100px'}} src={singlePhoto.webviewPath} alt='imagetab'/>
            {photos.map((photo, i)=> <img style={{width:'100px'}} src={photo.webviewPath} key= {i} alt='imagetab'/>)} 
        </>
    )
}

export default ImageContainer
