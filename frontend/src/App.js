import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      console.log(result)
    })
  })
  
  return (
    <>
    </>
  );
}

export default App;
