import './App.css';
import Layout from './Layout/Layout';
import React from 'react';
import AuthProvider from '../Context/AuthContext';

//! outer most part of app for routing
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Layout/>
      </div>
    </AuthProvider>
  );
}

export default App;
