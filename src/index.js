import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import firebase from "firebase/compat/app";
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBZ3grIa_1ARRpz0KeW-XVOjST6yKdJ5RA",
  authDomain: "flashcards-b2afb.firebaseapp.com",
  databaseURL: "https://flashcards-b2afb-default-rtdb.firebaseio.com",
  projectId: "flashcards-b2afb",
  storageBucket: "flashcards-b2afb.appspot.com",
  messagingSenderId: "571777361497",
  appId: "1:571777361497:web:1a1c27897b4c08cbf97348"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer);

const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);

