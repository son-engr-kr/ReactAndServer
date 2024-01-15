import React, { useState, useEffect } from 'react';
import './App.css';
interface StateTestProps{
  message:string
  message2:number
}

function App() {
  const [stateTest, setStateTest] = useState<string>();
  useEffect(() => {
    fetch('http://localhost:8000')
    .then((response) => response.json())
    .then((data:StateTestProps) => setStateTest(data.message))
  },[])
  return (
    <>
      <h4>Hello this is react</h4>
      <p>data from fastapi: {stateTest}</p>
      <MyTag message = {"mmmm"} message2 = {3}></MyTag>
    </>
  );
}

function MyTag({message, message2}:Readonly<StateTestProps>){
  return (
    <>
      {message} {message2}
    </>
  )
}

export default App;
