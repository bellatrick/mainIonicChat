import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBAcB-BJDKlLxKwV7CMUXQ8tlix_JiQEpI",
  authDomain: "react-chat-6b90f.firebaseapp.com",
  projectId: "react-chat-6b90f",
  storageBucket: "react-chat-6b90f.appspot.com",
  messagingSenderId: "404304941640",
  databaseURL: "https://react-chat-6b90f-default-rtdb.firebaseio.com",
  appId: "1:404304941640:web:d6a33e9764e9ff0de77e7d"
};

firebase.initializeApp(firebaseConfig);

// const checkUsers = () => {
//   const listRef = new Firebase(url);
// };

export const db = firebase.database();
export const auth= firebase.auth()