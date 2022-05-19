import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import Auth from './Auth';


const firebaseConfig = {
  apiKey: "AIzaSyDv2U8mj1_U8YtpJJVmKxHAd50y2xDPnxs",
  authDomain: "betmaster-60c73.firebaseapp.com",
  projectId: "betmaster-60c73",
  storageBucket: "betmaster-60c73.appspot.com",
  messagingSenderId: "245372679386",
  appId: "1:245372679386:web:4b5c1144a373ef133261e3"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
);