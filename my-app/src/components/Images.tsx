import React from 'react';
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
                body=props.list[i].default;
            }
        }
        return body;

    }
    return(
        <img src={getSrc()} alt={props.name} width={props.height} />
    )
}