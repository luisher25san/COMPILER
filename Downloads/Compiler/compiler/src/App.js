// src/App.js
import React from 'react';
import Compiler from './components/Compiler1';

const App = () => {
  return (
    <div classname="title">
      <h1 style={{ textAlign: 'center' }}>My React Compiler App</h1>
      <Compiler />
    </div>
  );
};

export default App;
