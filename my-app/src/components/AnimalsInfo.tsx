import { Box, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useEffect, useState } from 'react';
import './Search.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
                            <div>
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
                            <p>Biomes: {animalInformation[index].habbitat.biomes.map((item,i) => <span key={i}><br/>{item.biome}</span>)}</p>
                            <p>Population in wild: {animalInformation[index].population}</p>
                            <p>Temperature of Habitat: {animalInformation[index].habbitat.temperature} °C</p>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div className="ToyEnrichment">
                            {newToyList.map((item,i) => <span key={i}><br/><img src={item.url} width={50} alt={item.name}/>{item.name}</span>)}
                        </div>
                        <div className="FoodEnrichment">
                            {newFoodList.map((item,i) => <span key={i}><br/><img src={item.url} width={50}alt={item.name} />{item.name}</span>)}
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
                            <p>Biomes: {animalInformation[index].habbitat.biomes.map((item,i) => <span key={i}><br/>{item.biome}</span>)}</p>
                        </div>
                    </div>
                    <div className="DivToMakeSecondRow">
                        <div>
                            {newExhibitList.map((item,i) => <span key={i}><br/><img src={item.url} width={50}alt={item.name} />{item.name}</span>)}
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
