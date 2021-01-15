import React, { useEffect, useState } from 'react';

interface Animals {
    species:string,
    interactive:string,
    social:Social,
    reproduction:Reproduction,
    origins:Origins,
    habbitat:Habbitat,
    url:string
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

interface Origins {
    continents:string,
    regions:Regions[]
}

interface Regions {
    country:string
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
function AnimalsInfo() {
  
    var data = require('../JSON components/animals.json');
    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactive:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},origins:{continents:"", regions:[{country:""}]},habbitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, url:""}]);

    useEffect(()=> {
        setAnimalInformation(data);
        
    // eslint-disable-next-line
    }, [data]);

    console.log(animalInformation);
    return (
        <div>
            <div  style={{ listStyleType:"none"}}>
            {animalInformation.map((item,i)=>
            <li key={i}>{item.species}</li>)} 
            </div>
        </div>
    );
}

export default AnimalsInfo;
