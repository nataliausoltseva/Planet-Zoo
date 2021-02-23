export interface IUserInput {
    SearchQuery: (string|null);
}

export interface Animals {
    species:string,
    interactivity:string,
    social:Social,
    reproduction:Reproduction,
    habitat:Habbitat,
    id:number,
    population:string,
    edition:string,
    shared_habitat:SharedHabitat[],
    conservation_status:string,
    continents:string
}

export interface Social {
    group_size:string,
    male:string,
    female: string
}

export interface Reproduction {
    maturity: number,
    incubation: number,
    interbirth:number
}

export interface Habbitat {
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

export interface Biomes {
    biome: string
}

export interface SharedHabitat {
    animal:string
}

export interface Enrichment{
    name:string,
    cost:string,
    type:string,
    animals:Species[]
}

export interface Species{
    species:string
}

export interface IMediaGridProps {
    SearchQuery: (string|null),
    handleOnClick:(value:string)=> void;
}