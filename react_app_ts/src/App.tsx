//npm start --prefix react_app_ts

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import './App.css';
import axios from 'axios';

import Button from '@mui/material/Button';
import { ButtonGroup, Container, Grid, Paper, Box, Autocomplete, TextField } from '@mui/material';

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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
    <Container fixed = {true}>
      <h4>Hello this is react</h4>
      <p>data from fastapi: {stateTest}</p>
      <MyTag message = {"mmmm"} message2 = {321}></MyTag>

      <MUIButtons></MUIButtons>
      <MUIGrid></MUIGrid>
      <MyAutocomplete></MyAutocomplete>
    </Container>
  );
}
function MUIButtons(){
  return (<>
    <ButtonGroup>

      <Button variant='outlined'>Create</Button>
      <Button variant='outlined'>Update</Button>

    </ButtonGroup>
    <Button variant='outlined'>Delete</Button>
    
  </>)
}
function MUIGrid(){
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CustomPaper>xs=8</CustomPaper>
        </Grid>
        <Grid item xs={4}>
          <CustomPaper>xs=4</CustomPaper>
        </Grid>
        <Grid item xs={4}>
          <CustomPaper>xs=4</CustomPaper>
        </Grid>
        <Grid item xs={8}>
          <CustomPaper>xs=8</CustomPaper>
        </Grid>
      </Grid>
      
    </Box>
  )
}
function MyTag({message, message2}:Readonly<StateTestProps>){
  return (
    <>
      <p>{message} {message2}</p>
    </>
  )
}

function MyAutocomplete() {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },]

    const testLabel = "this_is_test_label"
    const testYear = 1234
    top100Films.push({label:testLabel, year:testYear})
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

export default App;
