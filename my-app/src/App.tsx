import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import AnimalsInfo from './components/AnimalsInfo';
import { IUserInput } from './components/interfaces';
import Search from './components/Search/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TemporaryDrawer from './components/Drawer/Drawer';
import { ContinentMap } from './components/ContinentMap/ContinentMap';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function App() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "",
  });

  const [show, setShow] = useState(false);
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }

  function changeValue(value: string){
    let UserInput:IUserInput = {
      SearchQuery:value
    }
    setUserInput(UserInput);
  }

  return (
    <div className="App">
      <div style={{display:"flex", justifyContent:"space-around"}}>
        <TemporaryDrawer show={show} handleOnClick={(value:string) => changeValue(value)}/>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={() => {changeValue(""); setShow(false) }}
          style={{width:"10%", height:"3em", marginTop:"2em"}}
          disabled={UserInput.SearchQuery===""}
        >
          Back
        </Button>
        <Search SetUserInput={(a: IUserInput) => {SetUserInput(a); setShow(true)}} />
        <ContinentMap />
      </div>
      <AnimalsInfo SearchQuery={UserInput.SearchQuery} handleOnClick={(value:string) => changeValue(value)}/>
      
    </div>
  );
}

export default App;
