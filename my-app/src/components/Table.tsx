import { Button} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { ConservationStatus } from './ConservationStatus';

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
  handleOnClick:(value:string)=> void;
}

export const Table = (props:Props ) => {
  const {items, requestSort, sortConfig} = useSortableData(props.products);
  const getClassNamesFor = (name:string) => {
    if(!sortConfig){
      return;
    }
    return sortConfig.key === name ? sortConfig.directopm : undefined;
  };

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
            <td><Button color="primary" onClick={()=>props.handleOnClick(item.species)} style={{display:"block"}}>{item.species}</Button></td>
            <td>  <ConservationStatus message="" status={item.conversation_status}/></td>
            <td>{item.continents}</td>
            <td>{item.edition}</td>
            <td>{fixPopulation(item.population)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};