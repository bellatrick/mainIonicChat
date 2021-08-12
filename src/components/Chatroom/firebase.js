import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBWF07LMIA6ZHSfXQriJY2yV8RcdILTUIo",
  authDomain: "chatproject-2db75.firebaseapp.com",
  databaseURL: "https://chatproject-2db75-default-rtdb.firebaseio.com",
  projectId: "chatproject-2db75",
  storageBucket: "chatproject-2db75.appspot.com",
  messagingSenderId: "178038971761",
  appId: "1:178038971761:web:ffc44b43e0133542982ad0",
};

firebase.initializeApp(firebaseConfig);

// const checkUsers = () => {
//   const listRef = new Firebase(url);
// };

export const db = firebase.database();
