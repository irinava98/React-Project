import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
const root = document.getElementById('root'); // <- This is the correct method call for React version 17
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);