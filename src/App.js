import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { FirestoreProvider } from '@react-firebase/firestore';
import { FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import MyTabs from './components/Tabs';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCTt89jK3vBv8s7U_31IlBxEeluW_K-Ric",
  authDomain: "simple-1a484.firebaseapp.com",
  databaseURL: "https://simple-1a484.firebaseio.com",
  projectId: "simple-1a484",
  storageBucket: "simple-1a484.appspot.com",
  messagingSenderId: "825717527488",
  appId: "1:825717527488:web:7dff0c943a01a654b82e25",
  measurementId: "G-5LZ6VTTD18"
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.firestore().enablePersistence();
} else {
  firebase.app(); // if already initialized, use that one
}


// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function App() {

  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <FirestoreProvider firebase={firebase} {...config}>
        <div className="App">
          <IfFirebaseAuthed>
            <MyTabs />
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </IfFirebaseUnAuthed>
        </div>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
