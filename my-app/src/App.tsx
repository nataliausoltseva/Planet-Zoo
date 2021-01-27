import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import AnimalsInfo from './components/AnimalsInfo';
import { IUserInput } from './components/interfaces';
import Search from './components/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  const [value, setValue] = useState("");
  
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }

  function changeValue(){
    let UserInput:IUserInput = {
      SearchQuery:""
    }
    setUserInput(UserInput);
  }

  return (
    <div className="App">
      <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={() => changeValue()}
          style={{width:"10%", height:"3em", marginTop:"2em"}}
          disabled={UserInput.SearchQuery===""}
        >
          Back
        </Button>
        <Search SetUserInput={(a: IUserInput) => SetUserInput(a)} />
      </div>
      <AnimalsInfo SearchQuery={UserInput.SearchQuery}/>
      
    </div>
  );
}

export default App;
