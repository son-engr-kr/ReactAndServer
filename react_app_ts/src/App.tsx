//npm start --prefix react_app_ts

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import './App.css';
import axios from 'axios';

import Button from '@mui/material/Button';
import { ButtonGroup, Container, Grid, Paper, Box, Autocomplete, TextField } from '@mui/material';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './drag_and_drop/DraggableCard';
import DropZone from './drag_and_drop/DropZone';

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




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

  const handleDrop = (cardId: string) => {
    console.log(`Dropped: ${cardId}`);
  };

  return (
    <Container fixed = {true}>
      <h4>Hello this is react</h4>
      <p>data from fastapi: {stateTest}</p>
      <MyTagWithInterfaceProps message = {"MyTagWithInterfaceProps"} message2 = {321}></MyTagWithInterfaceProps>
      <MyTagWithJustProps message = {"MyTagWithJustProps"} message2 = {"message2"}></MyTagWithJustProps>

      <MUIButtons></MUIButtons>
      <MUIGrid></MUIGrid>
      <MyAutocomplete></MyAutocomplete>
      <MyDnD></MyDnD>
    </Container>
  );
}
function MyDnD(){
  const [cards, setCards] = useState([
    { id: 'card1', text: 'Card 1', zone: 1 },
    { id: 'card2', text: 'Card 2', zone: 2 }
  ]);

  const moveCard = (draggedId: string, targetId: string, targetZone: number) => {
    setCards((prevCards) => {
      const draggedCard = prevCards.find(card => card.id === draggedId);
      const targetIndex = prevCards.findIndex(card => card.id === targetId && card.zone === targetZone);
      
      if (!draggedCard) return prevCards;
      
      const updatedCards = prevCards.filter(card => card.id !== draggedId);
      if (targetIndex >= 0) {
        // 타겟 카드가 있는 경우 그 위치에 드래그된 카드를 삽입
        updatedCards.splice(targetIndex, 0, { ...draggedCard, zone: targetZone });
      } else {
        // 타겟 카드가 없는 경우 새로운 존에 추가
        updatedCards.push({ ...draggedCard, zone: targetZone });
      }

      return updatedCards;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '30px' }}>
        <DropZone zone={1} onDrop={moveCard}>
          {cards.filter(card => card.zone === 1).map(card => (
            <DraggableCard key={card.id} id={card.id} text={card.text} targetZone={1} moveCard={moveCard}/>
          ))}
        </DropZone>
        <DropZone zone={2} onDrop={moveCard}>
          {cards.filter(card => card.zone === 2).map(card => (
            <DraggableCard key={card.id} id={card.id} text={card.text} targetZone={2} moveCard={moveCard}/>
          ))}
        </DropZone>
      </div>
    </DndProvider>
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
interface StateTestProps{
  message:string
  message2:number
}
function MyTagWithInterfaceProps({message, message2}:Readonly<StateTestProps>){
  return (
    <>
      <p>{message} {message2}</p>
    </>
  )
}
function MyTagWithJustProps({message, message2}:{message:string,message2:string}){
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
