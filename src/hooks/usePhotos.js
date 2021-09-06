import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";
import { useHistory } from "react-router-dom";

const PHOTO_STORAGEE = "photos";
const SINGLE_STORAGE = "singles";
export function usePhotoGallery() {
  const history = useHistory();

  const [photos, setPhotos] = useState([]);
  const [singlePhoto, setSinglePhoto] = useState({
    filepath: "",
    webviewPath: "",
    timeStamp: null,
  });
  useEffect(() => {
    
      const loadSaved = async () => {
      const { value } = await Storage.get({ key: PHOTO_STORAGEE });
      const { valueSingle } = await Storage.get({ key: SINGLE_STORAGE });
      const photosInStorage = value ? JSON.parse(value) : [];
      const singlePhotosInStorage = valueSingle ? JSON.parse(valueSingle) : {};
      try{
      if(!photosInStorage) return
      if (!isPlatform("hybrid")) {
        for (let photo of photosInStorage) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          singlePhotosInStorage.filepath = photo.filepath;
          singlePhotosInStorage.webviewPath = `data:image/jpeg;base64,${file.data}`;
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setSinglePhoto({
        filepath: singlePhotosInStorage.filepath,
        webviewPath: singlePhotosInStorage.webviewPath,
        timeStamp: new Date().toISOString(),
      });
      setPhotos(photosInStorage);
    }catch(err){console.log(err)}}
    
    loadSaved();
  }, []);

  const takePhoto = async () => {
   try{ const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  })
    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setSinglePhoto({
      filepath: fileName,
      webviewPath: savedFileImage.webviewPath,
    });
    setPhotos(newPhotos);
    Storage.set({ key: SINGLE_STORAGE, value: JSON.stringify(singlePhoto) });
    Storage.set({ key: PHOTO_STORAGEE, value: JSON.stringify(newPhotos) });
    history.push("/gallery");
  }catch(err){
    console.log(err)
  }
  }
  const savePicture = async (photo, fileName) => {
    let base64Data;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const deletePhoto = async (photo) => {
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    Storage.set({ key: PHOTO_STORAGEE, value: JSON.stringify(newPhotos) });

    const filename = photo.filepath.substr(photo.filepath.lastIndexOf("/") + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
    setPhotos(newPhotos);
  };

  return {
    singlePhoto,
    deletePhoto,
    photos,
    takePhoto,
  };
}

export async function base64FromPath(path) {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}
