import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const PhotoContext = createContext();

const PhotoProvider = ({ children }) => {
  const history = useHistory();
  const [photoToPost, setPhotoToPost] = useState(null);

  const postPhoto = (photo) => {
    setPhotoToPost(photo.webviewPath);
    history.push("/chatroom");
  };

  const value = {
    photoToPost: photoToPost,
    postPhoto: postPhoto,
    setPhotoToPost: setPhotoToPost,
  };
  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export default PhotoProvider;
