import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  // apiKey: "AIzaSyAReyOg7lHblDTeKinJEiUFolepcDkeKKI4",
  authDomain: "organic-bananas-1ee64.firebaseapp.com",
  projectId: "organic-bananas-1ee64",
  storageBucket: "organic-bananas-1ee64.appspot.com",
  messagingSenderId: "68923984259",
  appId: "1:68923984259:web:1dbeb9a857631ead8a4eb6",
  measurementId: "G-HS1BV736D9"
};

const firebase = initializeApp(firebaseConfig);

const storage = getStorage(firebase);



export default storage ;
// const analytics = getAnalytics(firebase);

