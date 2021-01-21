import { ColDef, DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import './Search.css';

interface Animals {
    species:string,
    interactive:string,
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

function AnimalsInfo() {
    var JSON_data = require('../JSON components/animals.json');
    const [animalInformation, setAnimalInformation] = useState<Animals[]>([{species:"", interactive:"",social:{group_size:"", male:"", female:""},reproduction:{maturity:0,incubation:0,interbirth:0},continents:"", conversation_status:"",habbitat:{land_area:"", land_area_for_additional_animal:"", water_area:"", water_area_for_additional_animal:"", climbing_area:"", climbing_areay_for_additional_animal:"", temperature:"", humidity:"", biomes:[{biome:""}]}, url:"", id:0, population:"", edition:"", shared_habitat:[{animal:""}] }]);

    useEffect(()=> {
        setAnimalInformation(JSON_data);
        
    // eslint-disable-next-line
    }, [JSON_data]);

    const columns:ColDef[]=[
        {
            field:"species", headerName:"Species", width:150,headerAlign: 'center',
        },
        {
            field:"conversation_status", headerName:"Conservative Status", width:200,headerAlign: 'center',
        },
        {
            field:"continents", headerName:"Continents", width:150,headerAlign: 'center',
        },
        {
            field:"edition", headerName:"Edition", width:100,headerAlign: 'center',
        },
        {
            field:"population", headerName:"Population", width:150,headerAlign: 'center',
        }
    ];

    return (
        <div>
            <div style={{ flexGrow: 1 }}>
                <DataGrid rows={animalInformation} columns={columns} hideFooter autoHeight density="standard" />
            </div>
        </div>
    );
}

export default AnimalsInfo;
