import { Box, Button, Popover, Typography } from '@material-ui/core';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useMemo, useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useSortableData = (items: any[]) => {
  const [sortConfig, setSortConfig] = useState<any>({});
  const sortedItems = useMemo(()=> {
    let sortableItems = [...items];
    if(sortConfig !== null){
      sortableItems.sort((a,b) => {
        if(a[sortConfig.key] < b[sortConfig.key]){
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if(a[sortConfig.key] > b[sortConfig.key]){
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: any) => {
    let direction = 'ascending';
    if(sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending'){
      direction = 'descending';
    }
    setSortConfig({key, direction});
  }

  return {items: sortedItems, requestSort, sortConfig};
};

interface Props {
  products: any[]
}

export const Table = (props:Props) => {
  const {items, requestSort, sortConfig} = useSortableData(props.products);
  const getClassNamesFor = (name:string) => {
    if(!sortConfig){
      return;
    }
    return sortConfig.key === name ? sortConfig.directopm : undefined;
  };

  function getStatusInfo(status:string){
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

  function addColorStatus(status:string){
    var body;
    if(status === "CR"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px Red"}}>
                CR               
            </Typography>
        )
    }
    else if(status === "DD"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px lightgrey"}}>
                DD               
            </Typography>
        )
    }
    else if(status === "DM"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px grey"}}>
              DM                
            </Typography>
        )
    }
    else if(status === "EN"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px orange"}}>
                EN              
            </Typography>
        )
    }
    else if(status === "EX"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px black", color:"white"}}>
                EX                  
            </Typography>
        )
    }
    else if(status === "LC"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px green"}}>
                LC             
            </Typography>
        )
    }
    else if(status === "NT"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"2px 2px 2px #C6FF33"}}>
               NT          
            </Typography>
        )
    }
    else if(status === "VU"){
        body = (
            <Typography component={'span'} variant={'body2'} style={{textShadow:"4px 2px 4px #FBFF33"}}>
                VU             
            </Typography>
        )
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

  return(
    <table>
      <thead>
        <tr>
          <th>
            <Button
              onClick={() => requestSort('species')}
              className={getClassNamesFor('species')}
            >
              Species
            </Button>
          </th>
          <th>
            <Button
              onClick={() => requestSort('conversation_status')}
              className={getClassNamesFor('conversation_status')}
            >
              Conservation Status
            </Button>
          </th>
          <th>
            <Button
              onClick={() => requestSort('continents')}
              className={getClassNamesFor('continents')}
            >
              Continents
            </Button>
          </th>
          <th>
            <Button
              onClick={() => requestSort('edition')}
              className={getClassNamesFor('edition')}
            >
              Edition
            </Button>
          </th>
          <th>
            <Button
              onClick={() => requestSort('population')}
              className={getClassNamesFor('population')}
            >
              Population
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.species}>
            <td style={{textAlign:"left"}}>{item.species}</td>
            <td>  <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                      <div>
                      {addColorStatus(item.conversation_status)}
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
                              {getStatusInfo(item.conversation_status)}
                          </Box>
                      </Popover>
                      </div>
                  )}
                  </PopupState> </td>
            <td>{item.continents}</td>
            <td>{item.edition}</td>
            <td>{fixPopulation(item.population)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};