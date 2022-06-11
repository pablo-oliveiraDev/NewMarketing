import React from 'react';
import AuthProvider from './Contexts/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3500} theme='colored' />
        <Router />
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
