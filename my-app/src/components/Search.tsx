import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { IUserInput } from './interfaces';
import Button from 'react-bootstrap/Button';
import './Search.css';


interface ISearchBarProps {
    SetUserInput: (a:IUserInput) => void;
}

function Search( props: ISearchBarProps) {
    var data = require('../JSON components/animals.json');
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQueryChange = (s:string)=> {
        var lowerCaseString = s.toLowerCase();
        setSearchQuery(lowerCaseString);
    }

    const [hasFocus, setHasFocus] = useState<boolean>(false);

    var array: string[] = [];
    
    for(var i = 0; i<data.length;i++){
        array.push(data[i].species);
    }

    const handleSubmit = () => {
        if(array.some(item => item === searchQuery)){
            let UserInput:IUserInput = {
                SearchQuery:searchQuery
            }
            props.SetUserInput(UserInput);
        }

        else{
            setHasFocus(true);
            alert("Animal is not found");
        }
    }

    const checkValue = (value:any) => {
        if(array.some(item => item === value)){
            setSearchQuery(value);
        }

        else{
            return;
        }
    }

    return (
        <div className="SearchBarContainer">
            <Grid container spacing={1}>
                <div>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={array}
                        getOptionLabel={(option) => option}
                        style={{width: "35vh", paddingRight:10}}  
                        getOptionSelected={(option, value) => option === value}
                        onChange={(event, value)=> checkValue(value)}
                        renderInput={(params) =>
                        <TextField {...params}
                            label="Animal"
                            error={hasFocus && searchQuery===""}
                            value={searchQuery}
                            onChange={event => handleSearchQueryChange(event.target.value)}/>}
                    />
                    <Button variant="primary" size="sm" onClick={handleSubmit} style={{width:"6rem", height:50}}>
                        Search
                    </Button>
                </div>
            </Grid>
        </div>
    );
}

export default Search;
