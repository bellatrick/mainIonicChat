import firebase from 'firebase/app'

import 'firebase/auth'

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyBAcB-BJDKlLxKwV7CMUXQ8tlix_JiQEpI",
        authDomain: "react-chat-6b90f.firebaseapp.com",
        projectId: "react-chat-6b90f",
        storageBucket: "react-chat-6b90f.appspot.com",
        messagingSenderId: "404304941640",
        appId: "1:404304941640:web:d6a33e9764e9ff0de77e7d"
      }).auth()

