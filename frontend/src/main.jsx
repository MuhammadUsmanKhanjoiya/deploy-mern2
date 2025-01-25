import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with routing and Toastify styles
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Report performance metrics (optional)
reportWebVitals(console.log);
