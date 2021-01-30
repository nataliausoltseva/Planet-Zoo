import { Box, Popover, Typography } from '@material-ui/core';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useEffect, useState } from 'react';
import './Search/Search.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Table} from './Table';

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

    function importAll(r:any) {
        return r.keys().map(r);
    }

    const foodImages = importAll(require.context('../Images/Food', false, /.*\.PNG$/));
    const toyImages = importAll(require.context('../Images/Toys', false, /.*\.PNG$/));

    function consStatus(status:string){
        var body;

        if(status === "CR"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Critical Endangered Animal</strong> - Faces  an extremely high risk of extinction in the immediate future                 
                </Typography>
            )
        }
        else if(status === "DD"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Data Deficient Animal</strong> - Not enough data to make an assessment of its risk of extinction                 
                </Typography>
            )
        }
        else if(status === "DM"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Domesticated Animal</strong> -  No immediate threat to the survival of the species                 
                </Typography>
            )
        }
        else if(status === "EN"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Endangered Animal</strong> - Faces a high risk of extinction in the near future               
                </Typography>
            )
        }
        else if(status === "EX"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Extinct Animal</strong> - Extensive and appropriate surverys have failed to record any living members                  
                </Typography>
            )
        }
        else if(status === "LC"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Least Concern Animal</strong> - Species that have been evaluated and found to be so common that no conservation concern is projected in the foreseeable future                
                </Typography>
            )
        }
        else if(status === "NT"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                   <strong>Near Threatened Animal </strong>- Close to qualifuing for lisitng as V but not fully meeting those criteria, slowly declining or fairly small populations but probably no danger of going extinct even without conservation activity in the foreseeable future or threats suspected to affect taxon in the near future but still avoidable             
                </Typography>
            )
        }
        else if(status === "VU"){
            body = (
                <Typography component={'span'} variant={'body2'}>
                    <strong>Vulnerable Animal </strong>- Faces a considerable risk of extinction in the medium term               
                </Typography>
            )
        }

        return body;
    }

    function getFoodImageSrc(name:string){
        var src:any;
        switch(name){
            case "Bamboo Feeder":
                src = foodImages[0].default;
                break;
            case "Block of Frozen Fruit":
                src = foodImages[1].default;
                break;
            case "Dog Ball":
                src = foodImages[2].default
                break;
            case "Eucalyptus Tree Feeder":
                src = foodImages[3].default
                break;
            case "Forage Box":
                src = foodImages[4].default
                break;
            case "Forage Pool":
                src = foodImages[5].default
                break;
            case "Frozen Blood Pumpkin":
                src = foodImages[6].default
                break;
            case "Fruit Spike Tree":
                src = foodImages[7].default
                break;
            case "Grazing Ball Feeder":
                src = foodImages[8].default
                break;
            case "Barrel Feeder Hanging":
                src = foodImages[9].default
                break;
            case "Hanging Grazer Feeder":
                src = foodImages[10].default
                break;
            case "Barrel Feeder Large":
                src = foodImages[11].default
                break;
            case "Fixed Roller Feeder Large":
                src = foodImages[12].default
                break;
            case "Pinata":
                src = foodImages[13].default;
                break;
            case "Restraint Feeder":
                src = foodImages[14].default
                break;
            case "Rotation Line Feeder":
                src = foodImages[15].default
                break;
            case "Slow Feeder":
                src = foodImages[16].default
                break;
            case "Barrel Feeder Small":
                src = foodImages[17].default
                break;
            case "Fixed Roller Feeder Small":
                src = foodImages[18].default
                break;
            case "Suspended High Grazer Feeder":
                src = foodImages[19].default
                break;
            case "Termite Mound":
                src = foodImages[20].default
                break;
            case "Toy Puzzle Feeder":
                src = foodImages[21].default
                break;
            case "Tree Forager":
                src = foodImages[22].default
                break;
            case "Tree Scatter Feeder":
                src = foodImages[23].default
                break;
            case "Underwater Box Feeder":
                src = foodImages[24].default
                break;
        }
        return src;
    }

    function getToyImageSrc(name:string){
        var src:any;
        switch(name){
            case "Block of Ice":
                src = toyImages[0].default;
                break;
            case "Blood Scent Marker":
                src = toyImages[1].default;
                break;
            case "Bobbin Drum":
                src = toyImages[2].default
                break;
            case "Bobbin Enrichment":
                src = toyImages[3].default
                break;
            case "Cardboard Box":
                src = toyImages[4].default
                break;
            case "Chew Toy":
                src = toyImages[5].default
                break;
            case "Fire Hose Ball":
                src = toyImages[6].default
                break;
            case "Gift Box":
                src = toyImages[7].default
                break;
            case "Grab Ball":
                src = toyImages[8].default
                break;
            case "Gyro":
                src = toyImages[9].default
                break;
            case "Herb Scent Marker":
                src = toyImages[10].default
                break;
            case "Large Ball":
                src = toyImages[11].default
                break;
            case "Large Snow Ball":
                src = toyImages[12].default
                break;
            case "Large Tyre":
                src = toyImages[13].default
                break;
            case "Mirror Mobile":
                src = toyImages[14].default
                break;
            case "Mud Bath":
                src = toyImages[15].default;
                break;
            case "Musical Keyboard":
                src = toyImages[16].default
                break;
            case "Plant Screen":
                src = toyImages[17].default
                break;
            case "Prey Scented Sack":
                src = toyImages[18].default
                break;
            case "Rubbing Pad":
                src = toyImages[19].default
                break;
            case "Rubbing Pillar":
                src = toyImages[20].default
                break;
            case "Scratching Post":
                src = toyImages[21].default
                break;
            case "Skittle":
                src = toyImages[22].default
                break;
            case "Small Ball Colourful":
                src = toyImages[23].default
                break;
            case "Small Ball":
                src = toyImages[24].default
                break;
            case "Small Ice Ball":
                src = toyImages[25].default
                break;
            case "Snowman Skittle":
                src = toyImages[26].default
                break;
            case "Sprinkler":
                src = toyImages[27].default
                break;
            case "Tyre":
                src = toyImages[28].default
                break;
            case "Water Jet":
                src = toyImages[29].default
                break;
            case "Water Pool":
                src = toyImages[30].default
                break;
            case "Waterfall and Metal Frame":
                src = toyImages[31].default
                break;
            case "Wind Chimes":
                src = toyImages[32].default
                break;   
        }
        return src;
    }

    function getAnimalSrc(name:string){
        var imagesrc = "";

        for(var i=0;i< animalInformation.length;i++){
            if(animalInformation[i].species === name){
                imagesrc = animalInformation[i].url;
            }
        }
        return imagesrc;
    }
    
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
                    //console.log(habitatInformation[i].type);
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
                    else if(habitatInformation[i].type==="exhibit"){
                        newExhibitList.push({
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
                            <img src={animalInformation[index].url} height={200} alt={animalInformation[index].species}/>
                            <div style={{marginLeft:"1em"}}>
                                <h3>{animalInformation[index].species}</h3>
                                {animalInformation[index].habbitat.land_area === "0"?null:<p>Land area: {animalInformation[index].habbitat.land_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.land_area_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.climbing_area === "0"?null:<p>Climb area: {animalInformation[index].habbitat.climbing_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.climbing_areay_for_additional_animal} m<sup>2</sup>)</p>}
                                {animalInformation[index].habbitat.water_area === "0"?null:<p>Water area: {animalInformation[index].habbitat.water_area} m<sup>2</sup> (Add'l sp: {animalInformation[index].habbitat.water_area_for_additional_animal} m<sup>2</sup>)</p>}
                                <p>Ratio (F:M): {animalInformation[index].social.female} : {animalInformation[index].social.male}</p>
                                <p>Group Size: {animalInformation[index].social.group_size}</p>
                                
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                    Conservation Status: {animalInformation[index].conversation_status}
                                    <ArrowDropDownIcon {...bindTrigger(popupState)} className="ArrowDown"/>
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                        }}
                                        transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                        }}
                                    >
                                        <Box p={2}>
                                            {consStatus(animalInformation[index].conversation_status)}
                                        </Box>
                                    </Popover>
                                    </div>
                                )}
                                </PopupState>    
                                
                            </div>
                        </div>
                        <div>
                            <p>Continents: {animalInformation[index].continents}</p>
                            <p>Biomes: {animalInformation[index].habbitat.biomes.map((item,i) => <li key={i}><br/>{item.biome.charAt(0).toUpperCase()+ item.biome.slice(1)}</li>)}</p>
                            <p>Population in wild: {fixPopulation(animalInformation[index].population)}</p>
                            <p>Temperature of Habitat: {animalInformation[index].habbitat.temperature} °C</p>
                        </div>
                    </div>
                    <div className="SharedAnimals">
                        {animalInformation[index].shared_habitat.length?(<div><strong>Comptable Animals:</strong><ul>{animalInformation[index].shared_habitat.map((item,i) => <li><img src={getAnimalSrc(item.animal)} alt={item.animal} height={70} />{item.animal}</li>)}</ul></div>):<p>This animal does not benefit from sharing space with other species</p>}
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div className="ToyEnrichment">
                            Toy Enrichments <div>{newToyList.map((item,i) => <li key={i}><br/><img src={getToyImageSrc(item.name)} width={50} alt={item.name}/>{item.name}</li>)}</div>
                        </div>
                        <div className="FoodEnrichment">
                            Food Enrichments <div>{newFoodList.map((item,i) => <li key={i}><br/><img src={getFoodImageSrc(item.name)} width={50}alt={item.name} />{item.name}</li>)}</div>
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
                            <img src={animalInformation[index].url} height={200} alt={animalInformation[index].species}/>
                            <div>
                                <h3>{animalInformation[index].species}</h3>
                                <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                    Conservation Status: {animalInformation[index].conversation_status}
                                    <ArrowDropDownIcon {...bindTrigger(popupState)} className="ArrowDown"/>
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                        }}
                                        transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                        }}
                                    >
                                        <Box p={2}>
                                            {consStatus(animalInformation[index].conversation_status)}
                                        </Box>
                                    </Popover>
                                    </div>
                                )}
                                </PopupState>    
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
                            {newExhibitList.map((item,i) => <li key={i}><br/><img src={item.url} width={50}alt={item.name} />{item.name}</li>)}
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
                {props.SearchQuery === ""? <Table products={animalInformation} /> : getResult()}
            </div>
        </div>
    );
}

export default AnimalsInfo;
