import React from 'react';
import image from '../Images/default.png';

interface Props{
    list:any,
    height:string,
    name:string
}
export const Images = (props:Props)=> {
    function getSrc(){
        var body;
        for(var i =0; i< props.list.length; i++){
            if(props.list[i].default.includes(props.name)){
                return body=props.list[i].default;
            }
            else{
                body = image;
            }
        }
        return body;

    }
    return(
        <img src={getSrc()} alt={props.name} width={props.height} />
    )
}