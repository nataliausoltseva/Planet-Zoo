import React from 'react';
import './App.css';


function App() {
  
  var data = require('./JSON components/animals.json');
  console.log(data);

  function showAnimals(){
    var body;
    for(var i=0;i<data.length;i++){
      if(data[i].interactivity === "full"){
        console.log("FULL",data[i].species);
      }
      if(data[i].interactivity === "exhibit"){
        console.log("EXHIBIT",data[i].species);
      }
    }

    return body;
  }
  return (
    <div className="App">
        <div>
          {showAnimals()}
        </div>
    </div>
  );
}

export default App;
