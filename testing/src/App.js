import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick = {()=>{
        console.log("hi");
      }}>
        click me
      </button>
    </div>
  );
}

export default App;