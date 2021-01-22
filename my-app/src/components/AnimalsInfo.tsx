import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ColDef} from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import './Search.css';

interface Animals {
    species:string,
    interactivity:string,
    social:Social,
    reproduction:Reproduction,
    habbitat:Habbitat,
    url:string,
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
    url:string,
    cost:string,
    type:string,
    animals:Species[]
}

interface Species{
    species:string
}

interface IMediaGridProps {
    SearchQuery: (string|null)
}
function AnimalsInfo(props:IMediaGridProps) {
    var JSON_animals = require('../JSON components/animals.json');
    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactivity:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},continents:"", conversation_status:"",habbitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, url:"", id:0, population:"", edition:"", shared_habitat:[{animal:""}] }]);

    var JSON_habbitat = require('../JSON components/habitat.json');
    const [habitatInformation, setHabitatInformation] = useState<Enrichment[]>([{name:"", url:"", cost:"",type:"", animals:[{species:""}]}]);

    const [toggleTable, setToggleTable] = useState(true);

    useEffect(()=> {
        setAnimalInformation(JSON_animals);
        setHabitatInformation(JSON_habbitat);

    // eslint-disable-next-line
    }, [JSON_animals,JSON_habbitat]);

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

    function returnTable(){
        var body = (
            <TableContainer>
                <Table  aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Species</TableCell>
                        <TableCell align="center" sortDirection="asc">Conservative Status</TableCell>
                        <TableCell align="center">Continents</TableCell>
                        <TableCell align="center">Edition</TableCell>
                        <TableCell align="center">Population</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {animalInformation.map((row) => (
                        <TableRow key={row.species}>
                            <TableCell component="th" scope="row" >
                                {row.species}
                            </TableCell>
                            <TableCell align="center">{row.conversation_status}</TableCell>
                            <TableCell align="center">{row.continents}</TableCell>
                            <TableCell align="center">{row.edition}</TableCell>
                            <TableCell align="center">{row.population}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
        return body;
    }
    function getResult(){
        var index = animalInformation.findIndex((item,i)=> {
            return item.species === props.SearchQuery
        });
        var body;

        var newToyList = [];
        var newFoodList = [];
        for(var i=0; i<habitatInformation.length;i++){
           for(var j=0; j<habitatInformation[i].animals.length;j++){
                if(habitatInformation[i].animals[j].species === animalInformation[index].species){
                    if(habitatInformation[i].type==="toy"){
                        newToyList.push({
                            name:habitatInformation[i].name,
                            url:habitatInformation[i].url
                        })
                    }
                    else if(habitatInformation[i].type==="food"){
                        newFoodList.push({
                            name:habitatInformation[i].name,
                            url:habitatInformation[i].url
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
                            <img src={animalInformation[index].url} height={200} className="AnimalImage"/>
                            <div>
                                <h3>{animalInformation[index].species}</h3>
                                {animalInformation[index].habbitat.land_area === "0"?null:<p>Land area: {animalInformation[index].habbitat.land_area} m<sup>2</sup> (For every additional animal: {animalInformation[index].habbitat.land_area_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.climbing_area === "0"?null:<p>Climb area: {animalInformation[index].habbitat.climbing_area} m<sup>2</sup> (For every additional animal: {animalInformation[index].habbitat.climbing_areay_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.water_area === "0"?null:<p>Water area: {animalInformation[index].habbitat.water_area} m<sup>2</sup> (For every additional animal: {animalInformation[index].habbitat.water_area_for_additional_animal} m<sup>2</sup>)</p>}
                                <p>Ratio (F:M): {animalInformation[index].social.female} : {animalInformation[index].social.male}</p>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                                <p>Conservation Status: {animalInformation[index].conversation_status}</p>
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Biomes: {animalInformation[index].habbitat.biomes.map((item,i) => <span key={i}><br/>{item.biome}</span>)}</p>
                            <p>Population in wild: {animalInformation[index].population}</p>
                            <p>Temperature of Habitat: {animalInformation[index].habbitat.temperature} °C</p>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div className="ToyEnrichment">
                            {newToyList.map((item,i) => <span key={i}><br/><img src={item.url} width={50}/>{item.name}</span>)}
                        </div>
                        <div className="FoodEnrichment">
                            {newFoodList.map((item,i) => <span key={i}><br/><img src={item.url} width={50}/>{item.name}</span>)}
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
                            <img src={animalInformation[index].url} width="40%"/>
                            <div>
                                <h3>{animalInformation[index].species}</h3>
                                <p> Conservation Status: {animalInformation[index].conversation_status}</p>
                            </div>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div>
    
                        </div>
                    </div>
                </div>
            );
        }

        return body;
    }
    return (
        <div>
            <div>
            {props.SearchQuery === ""? returnTable() : getResult()}
        </div>
        </div>
    );
}

export default AnimalsInfo;
