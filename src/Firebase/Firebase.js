import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const app = firebase.initializeApp({

    // ! main DataBase for now
    // apiKey: "AIzaSyANrtNsKJGPCa9FS0zcXBbr-Z-kNKsav-g",
    // authDomain: "e-commerce-bc5e9.firebaseapp.com",
    // databaseURL: "https://e-commerce-bc5e9-default-rtdb.firebaseio.com",
    // projectId: "e-commerce-bc5e9",
    // storageBucket: "e-commerce-bc5e9.appspot.com",
    // messagingSenderId: "284318056079",
    // appId: "1:284318056079:web:42f693033a2c100c9c3afa",
    // measurementId: "G-M8CQFJMPF2"
    
    //! Testing DataBase
    apiKey: "AIzaSyDbhxxxSo45IirbSUcBdIIZ0RzHw_rx8mY",
    authDomain: "e-commerce-ddfd4.firebaseapp.com",
    databaseURL: "https://e-commerce-ddfd4.firebaseio.com",
    projectId: "e-commerce-ddfd4",
    storageBucket: "e-commerce-ddfd4.appspot.com",
    messagingSenderId: "880420574197",
    appId: "1:880420574197:web:bc6fd4db76cfa2902786bc",
    measurementId: "G-E0QEFGFRW7"
});

export default app;