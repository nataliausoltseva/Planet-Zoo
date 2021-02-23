import React, { useEffect, useState } from 'react';
import './Search/Search.css';
import {Table} from './Table';
import { Images } from './Images';
import { ConservationStatus } from './ConservationStatus';
import {IMediaGridProps, Animals, Enrichment} from './interfaces';


function AnimalsInfo(props:IMediaGridProps) {
    var JSON_animals = require('../JSON components/animals.json');
    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactivity:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},continents:"", conservation_status:"",habitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, id:0, population:"", edition:"", shared_habitat:[{animal:""}] }]);

    var JSON_habitat = require('../JSON components/habitat.json');
    const [habitatInformation, setHabitatInformation] = useState<Enrichment[]>([{name:"", cost:"",type:"", animals:[{species:""}]}]);
    const [value, setValue] = useState("");

    useEffect(()=> {
        fetch(`https://localhost:44380/api/HabitatEnrichments`)
        .then(res => res.json())
        .then(response => {
            setHabitatInformation(response);
        })
        .catch(()=> {
            console.log("website down");
            setHabitatInformation(JSON_habitat);
        });

        fetch(`https://localhost:44380/api/Animals`)
        .then(res => res.json())
        .then(response => {
            setAnimalInformation(response);
        })
        .catch(()=> {
            console.log("website down");
            setAnimalInformation(JSON_animals);
        });
        
    // eslint-disable-next-line
    }, [JSON_animals,JSON_habitat, value]); 

    for(var i=0; i<animalInformation.length; i++){
        if(animalInformation[i].edition === "standard" ){
            animalInformation[i].edition = "Standard"
        }
        else if(animalInformation[i].edition === "arctic pack"){
            animalInformation[i].edition = "Arctic Pack"
        }
        else if(animalInformation[i].edition === "south america pack"){
            animalInformation[i].edition = "South America Pack"
        }
        else if(animalInformation[i].edition === "aquatic pack"){
            animalInformation[i].edition = "Aquatic pack"
        }
        else if(animalInformation[i].edition === "australia pack"){
            animalInformation[i].edition = "Australia pack"
        }
        else if(animalInformation[i].edition === "deluxe"){
            animalInformation[i].edition = "Deluxe"
        }
    }

    function importAll(r:any) {
        return r.keys().map(r);
    }

    const foodImages = importAll(require.context('../Images/Food', false, /.*\.PNG$/));
    const toyImages = importAll(require.context('../Images/Toys', false, /.*\.PNG$/));
    const animalImages = importAll(require.context('../Images/Animals', false,/.*\.PNG$/));    
    const exhibitImages = importAll(require.context('../Images/Exhibit', false,/.*\.PNG$/));  
    const biomesImages = importAll(require.context('../Images/Biomes',false, /.*\.PNG$/));

    function getResult(){
        var index = animalInformation.findIndex((item,i)=> {
            return item.species === props.SearchQuery
        });
        var body;

        var newToyList = [];
        var newFoodList = [];
        var newExhibitList = []
        for(var i=0; i<habitatInformation.length;i++){
           for(var j=0; j<habitatInformation[i].animals.length;j++){
                if(habitatInformation[i].animals[j].species === animalInformation[index].species){
                    if(habitatInformation[i].type==="toy"){
                        newToyList.push({
                            name:habitatInformation[i].name
                        })
                    }
                    else if(habitatInformation[i].type==="food"){
                        newFoodList.push({
                            name:habitatInformation[i].name
                        })
                    }
                    else if(habitatInformation[i].type==="exhibit"){
                        newExhibitList.push({
                            name:habitatInformation[i].name
                        })
                    }
                }
           }
        }
        
        if(animalInformation[index].interactivity === "full"){
            body = (
                <div>
                    <div className="DivToMakeFirstRow">
                        <div className="FirstRowLeft">
                            <Images list={animalImages} height={"350"} name={animalInformation[index].species}/>
                            <div style={{marginLeft:"1em"}}>
                                <h3>{animalInformation[index].species}</h3>
                                {animalInformation[index].habitat.land_area === "0"?null:<p>Land area: {animalInformation[index].habitat.land_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habitat.land_area_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habitat.climbing_area === "0"?null:<p>Climb area: {animalInformation[index].habitat.climbing_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habitat.climbing_areay_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habitat.water_area === "0"?null:<p>Water area: {animalInformation[index].habitat.water_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habitat.water_area_for_additional_animal} m<sup>2</sup>)</p>}
                                <p>Ratio (F:M): {animalInformation[index].social.female} : {animalInformation[index].social.male}</p>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                                
                                <ConservationStatus message="Conservation Status:" status={animalInformation[index].conservation_status}/>
                                
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Biomes:<div className='BiomesContainer'> {animalInformation[index].habitat.biomes.map((item,i) => <li key={i}><br/><Images list={biomesImages} height={"30"} name={item.biome}/> {item.biome.charAt(0).toUpperCase()+ item.biome.slice(1)}</li>)}</div></p>
                            <p>Population in wild: {fixPopulation(animalInformation[index].population)}</p>
                            <p>Temperature of Habitat: {animalInformation[index].habitat.temperature} °C</p>
                        </div>
                    </div>
                    <div className="SharedAnimals">
                        {animalInformation[index].shared_habitat.length?(<div><h3 style={{textAlign:"center"}}>Comptable Animals:</h3><ul>{animalInformation[index].shared_habitat.map((item,i) => <li key={i}><Images list={animalImages} height={"70"} name={item.animal}/>{item.animal}</li>)}</ul></div>):<p style={{textAlign:'center'}}>This animal <strong>does not benefit</strong> from sharing space with other species</p>}
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div className="ToyEnrichment" >
                            <h3 style={{textAlign:"center"}}>Toy Enrichments</h3> <div>{newToyList.map((item,i) => <li key={i}><br/><Images list={toyImages} height={"50"} name={item.name}/>{item.name}</li>)}</div>
                        </div>
                        <div className="FoodEnrichment">
                            <h3 style={{textAlign:"center"}}>Food Enrichments</h3> <div>{newFoodList.map((item,i) => <li key={i}><br/><Images list={foodImages} height={"50"} name={item.name}/>{item.name}</li>)}</div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            body = (
                <div>
                    <div className="DivToMakeFirstRow">
                        <div>
                            <Images list={animalImages} height={"200"} name={animalInformation[index].species}/>
                            <div>
                                <h3>{animalInformation[index].species}</h3>
                                <ConservationStatus message="Conservation Status:" status={animalInformation[index].conservation_status}/>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Temperature: {animalInformation[index].habitat.temperature}</p>
                            <p>Humidity: {animalInformation[index].habitat.humidity}</p>
                            <p>Biomes:<div className='BiomesContainer'> {animalInformation[index].habitat.biomes.map((item,i) => <li key={i}><br/><Images list={biomesImages} height={"30"} name={item.biome}/> {item.biome.charAt(0).toUpperCase()+ item.biome.slice(1)}</li>)}</div></p>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div>
                            <h3 style={{textAlign:"center"}}>Exhibit Enrichments</h3>{newExhibitList.map((item,i) => <li key={i}><br/><Images list={exhibitImages} height={"50"} name={item.name}/> {item.name}</li>)}
                        </div>
                    </div>
                </div>
            );
        }

        return body;
    }

    function fixPopulation(population:string){
        if(population.includes("~")){
          var newString = parseInt(population.replace("~", " ").trim()).toLocaleString();
          return "approx. " + newString;
        }
        if(population === "Unknown"){
           return "-";
        }
        if(population.includes("-")){
          var res = population.split("-").map((item) => {
            return parseInt(item,10).toLocaleString();
          });
    
          return res.join(" - ");
        }
        return parseInt(population).toLocaleString();
      }
    
    return (
        <div>
            <div>
                {props.SearchQuery === ""? <Table products={animalInformation} handleOnClick={(value:string)=> setValue(value)} /> : getResult()}
            </div>
        </div>
    );
}

export default AnimalsInfo;
