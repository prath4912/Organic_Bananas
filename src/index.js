import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import Fruitstate from './context/Fruitstate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Fruitstate>

    <App />
    </Fruitstate>

    <Toaster 
     
      toastOptions={{
    // Define default options
    className: 'z-5',
    duration: 5000,
    style: {
      background: '#FFCF00',
      color: 'black',
    },

  }}></Toaster>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
