import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './index.css';
import App from './App';

extend(OrbitControls);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
