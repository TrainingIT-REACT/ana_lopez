import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import '@babel/polyfill';
import 'whatwg-fetch';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

let worker;
let refreshing = false;

document.getElementById('reload').addEventListener('click', () => {
  console.log('reloading');
  worker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.log('Service worker correctly installed: ', registration.scope);
        registration.addEventListener('updatefound', () => {
          worker = registration.installing;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed') {
              const updateApp = document.getElementById('updateApplication');
              updateApp.classList.add('show');
            }
          });
        });
      },
      err => {
        console.log('The service worker failed', err);
      }
    );

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
}
