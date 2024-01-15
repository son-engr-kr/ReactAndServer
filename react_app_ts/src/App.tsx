//npm start --prefix react_app_ts

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Button from '@mui/material/Button';


interface StateTestProps{
  message:string
  message2:number
}

function App() {
  const [stateTest, setStateTest] = useState<string>();
  ////fetch
  // useEffect(() => {
  //   fetch('http://localhost:8000')
  //   .then((response) => response.json())
  //   .then((data:StateTestProps) => setStateTest(data.message))
  // },[])

  ////axios
  // useEffect(()=>{
  //   axios.get('http://localhost:8000').then((responce) =>
  //   setStateTest(responce.data.message) )
  // },[])


  return (
    <>
      <h4>Hello this is react</h4>
      <p>data from fastapi: {stateTest}</p>
      <MyTag message = {"mmmm"} message2 = {321}></MyTag>

      <Button>ButtonTest</Button>
    </>
  );
}

function MyTag({message, message2}:Readonly<StateTestProps>){
  return (
    <>
      <p>{message} {message2}</p>
    </>
  )
}

export default App;
