import firebase from '@firebase/app'

require('firebase/auth') // Referencia a la libreria de aunteticacion y DB
require('firebase/firestore')


var config = {
    apiKey: "AIzaSyALhn3INWBhLHhKSSfQTHkBssalEo1F5X0",
    authDomain: "monster-chat-701b2.firebaseapp.com",
    databaseURL: "https://monster-chat-701b2.firebaseio.com",
    projectId: "monster-chat-701b2",
    storageBucket: "monster-chat-701b2.appspot.com",
    messagingSenderId: "556960493339"
  };
  firebase.initializeApp(config);

  
  const auth = firebase.auth()  //instancia de autenticcación
  const db = firebase.firestore() 

  export {auth, db}