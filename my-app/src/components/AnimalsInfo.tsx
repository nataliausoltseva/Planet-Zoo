import React, { useEffect, useState } from 'react';
import './Search/Search.css';
import {Table} from './Table';
import { Images } from './Images';
import { ConservationStatus } from './ConservationStatus';

interface Animals {
    species:string,
    interactivity:string,
    social:Social,
    reproduction:Reproduction,
    habbitat:Habbitat,
    id:number,
    population:string,
    edition:string,
    shared_habitat:SharedHabitat[],
    conversation_status:string,
    continents:string
}

interface Social {
    group_size:string,
    male:string,
    female: string
}

interface Reproduction {
    maturity: number,
    incubation: number,
    interbirth:number
}

interface Habbitat {
    land_area:string,
    land_area_for_additional_animal:string,
    water_area: string,
    water_area_for_additional_animal:string,
    climbing_area:string,
    climbing_areay_for_additional_animal:string,
    temperature:string,
    humidity:string,
    biomes: Biomes[]
}

interface Biomes {
    biome: string
}

interface SharedHabitat {
    animal:string
}

interface Enrichment{
    name:string,
    cost:string,
    type:string,
    animals:Species[]
}

interface Species{
    species:string
}

interface IMediaGridProps {
    SearchQuery: (string|null),
    handleOnClick:(value:string)=> void;
}

function AnimalsInfo(props:IMediaGridProps) {
    var JSON_animals = require('../JSON components/animals.json');
    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactivity:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},continents:"", conversation_status:"",habbitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, id:0, population:"", edition:"", shared_habitat:[{animal:""}] }]);

    var JSON_habbitat = require('../JSON components/habitat.json');
    const [habitatInformation, setHabitatInformation] = useState<Enrichment[]>([{name:"", cost:"",type:"", animals:[{species:""}]}]);
    const [value, setValue] = useState("");

    useEffect(()=> {
        setAnimalInformation(JSON_animals);
        setHabitatInformation(JSON_habbitat);
    // eslint-disable-next-line
    }, [JSON_animals,JSON_habbitat, value]); 

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
    
    console.log(biomesImages);
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
                                {animalInformation[index].habbitat.land_area === "0"?null:<p>Land area: {animalInformation[index].habbitat.land_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.land_area_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.climbing_area === "0"?null:<p>Climb area: {animalInformation[index].habbitat.climbing_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.climbing_areay_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.water_area === "0"?null:<p>Water area: {animalInformation[index].habbitat.water_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.water_area_for_additional_animal} m<sup>2</sup>)</p>}
                                <p>Ratio (F:M): {animalInformation[index].social.female} : {animalInformation[index].social.male}</p>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                                
                                <ConservationStatus message="Conservation Status:" status={animalInformation[index].conversation_status}/>
                                
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Biomes:<div className='BiomesContainer'> {animalInformation[index].habbitat.biomes.map((item,i) => <li key={i}><br/><Images list={biomesImages} height={"30"} name={item.biome}/>{item.biome.charAt(0).toUpperCase()+ item.biome.slice(1)}</li>)}</div></p>
                            <p>Population in wild: {fixPopulation(animalInformation[index].population)}</p>
                            <p>Temperature of Habitat: {animalInformation[index].habbitat.temperature} °C</p>
                        </div>
                    </div>
                    <div className="SharedAnimals">
                        {animalInformation[index].shared_habitat.length?(<div><h3>Comptable Animals:</h3><ul>{animalInformation[index].shared_habitat.map((item,i) => <li key={i}><Images list={animalImages} height={"70"} name={item.animal}/>{item.animal}</li>)}</ul></div>):<p style={{textAlign:'center'}}>This animal <strong>does not benefit</strong> from sharing space with other species</p>}
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div className="ToyEnrichment">
                            <h3>Toy Enrichments</h3> <div>{newToyList.map((item,i) => <li key={i}><br/><Images list={toyImages} height={"50"} name={item.name}/>{item.name}</li>)}</div>
                        </div>
                        <div className="FoodEnrichment">
                            <h3>Food Enrichments</h3> <div>{newFoodList.map((item,i) => <li key={i}><br/><Images list={foodImages} height={"50"} name={item.name}/>{item.name}</li>)}</div>
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
                                <ConservationStatus message="Conservation Status:" status={animalInformation[index].conversation_status}/>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Temperature: {animalInformation[index].habbitat.temperature}</p>
                            <p>Humidity: {animalInformation[index].habbitat.humidity}</p>
                            <p>Biomes: {animalInformation[index].habbitat.biomes.map((item,i) => <li key={i}><br/>{item.biome}</li>)}</p>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div>
                            {newExhibitList.map((item,i) => <li key={i}><br/><Images list={exhibitImages} height={"50"} name={item.name}/> {item.name}</li>)}
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
