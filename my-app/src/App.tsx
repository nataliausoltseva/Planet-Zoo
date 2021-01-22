import React, { useState } from 'react';
import './App.css';
import AnimalsInfo from './components/AnimalsInfo';
import { IUserInput } from './components/interfaces';
import Search from './components/Search';

function App() {
  // eslint-disable-next-line
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "",
    
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }

  return (
    <div className="App">
      <Search SetUserInput={(a: IUserInput) => SetUserInput(a)}/>
      <AnimalsInfo SearchQuery={UserInput.SearchQuery}/>
    </div>
  );
}

export default App;
