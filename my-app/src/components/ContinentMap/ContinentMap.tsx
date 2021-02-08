import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PublicIcon from '@material-ui/icons/Public';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Images } from '../Images';
import { Animals } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface Props{
  handleOnClick: (value:boolean) => void
}
export const ContinentMap = (props:Props) => {
    function importAll(r:any) {
      return r.keys().map(r);
    }
    const continentImages = importAll(require.context('./continent_images', false, /.*\.PNG$/));
    const classes = useStyles();
    var JSON_animals = require('../../JSON components/animals.json');

    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactivity:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},continents:"", conversation_status:"",habbitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, id:0, population:"", edition:"", shared_habitat:[{animal:""}] }]);

    useEffect(()=> {
      setAnimalInformation(JSON_animals);
    }, [animalInformation]);

    return(
        <div style={{marginLeft:"1em"}}>
          <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={()=>props.handleOnClick(false)}
          style={{width:"10%", height:"3em", marginTop:"2em"}}
          >
            Back
          </Button>
          <div className="NorthAmerica" style={{display:"flex"}}>
          <h3>North America</h3>
            <Images list={continentImages} height={"25%"} name="northamerica"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("North America")?item.species:null}</li>)}
            </ul>
          </div>
          <div className="SouthAmerica" style={{display:"flex"}}>
          <h3>South America</h3>
            <Images list={continentImages} height={"25%"} name="southamerica"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("South America")?item.species:null}</li>)}
            </ul>
          </div>
          <div className="Europe" style={{display:"flex"}}>
          <h3>Europe</h3>
            <Images list={continentImages} height={"25%"} name="europe"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("Europe")?item.species:null}</li>)}
            </ul>
          </div>
          <div className="Asia" style={{display:"flex"}}>
            <h3>Asia</h3>
            <Images list={continentImages} height={"25%"} name="asia"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("Asia")?item.species:null}</li>)}
            </ul>
          </div>
          <div className="Antarctica" style={{display:"flex"}}>
          <h3>Antarctica</h3>
            <Images list={continentImages} height={"25%"} name="antarctica"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("Antarctica")?item.species:null}</li>)}
            </ul>
          </div>
          <div className="Oceania" style={{display:"flex"}}>
          <h3>Oceania</h3>
            <Images list={continentImages} height={"25%"} name="oceania"/>
            <ul>
                {animalInformation.map((item,i) => <li key={i}>{item.continents.includes("Oceania")?item.species:null}</li>)}
            </ul>
          </div>
        </div>
    )
}