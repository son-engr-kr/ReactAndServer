import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [stateTest, setStateTest] = useState("default");
  useEffect(() => {
    fetch('http://localhost:8000')
    .then((response) => response.json())
    .then((data) => setStateTest(data))
  },[])
  return (
    <>
      <h4>Hello this is react</h4>
      <p>data from fastapi: {stateTest.message}</p>
    </>
  );
}

export default App;
