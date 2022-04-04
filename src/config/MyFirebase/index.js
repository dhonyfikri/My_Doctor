// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnhD7tOuUQ4j-Nks7rdinNOPtp1WMp6vA',
  authDomain: 'my-doctor-01-91e82.firebaseapp.com',
  projectId: 'my-doctor-01-91e82',
  storageBucket: 'my-doctor-01-91e82.appspot.com',
  messagingSenderId: '148154571649',
  appId: '1:148154571649:web:735ad6aa154de43c1b2680',
  measurementId: 'G-063GR9YE00',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const authentication = getAuth(app);  // memunculkan peringatan
const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const database = getDatabase(app);

const MyFirebase = {
  authentication: authentication,
  database: database,
};

export default MyFirebase;

// import firebase from 'firebase';

// firebase.initializeApp({
//   apiKey: 'AIzaSyDnhD7tOuUQ4j-Nks7rdinNOPtp1WMp6vA',
//   authDomain: 'my-doctor-01-91e82.firebaseapp.com',
//   projectId: 'my-doctor-01-91e82',
//   storageBucket: 'my-doctor-01-91e82.appspot.com',
//   messagingSenderId: '148154571649',
//   appId: '1:148154571649:web:735ad6aa154de43c1b2680',
//   measurementId: 'G-063GR9YE00',
// });

// const MyFirebase = firebase;

// export default MyFirebase;
