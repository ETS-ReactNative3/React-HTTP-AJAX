import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL="https://jsonplaceholder.typicode.com/"

// whatever you do here will be seen globally
axios.interceptors.request.use(request => {
  // imp to return otherwise you are blocking the request
  console.log(["Request interceptors"], request);
  return request;
}, error => {
  console.log(error);
  // catch block should handle component error
  return Promise.reject(error);
});


// whatever you do here will be seen globally
axios.interceptors.response.use(response => {
  // imp to return otherwise you are blocking the request
  console.log(["Response Interceptors"], response);
  return response;
}, error => {
  console.log(error);
  // catch block should handle component error
  return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
