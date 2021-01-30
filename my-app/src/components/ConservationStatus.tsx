import { Box, Popover, Typography } from '@material-ui/core';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
    message:string,
    status:string
}
export const ConservationStatus = (props:Props) => {

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
    
    return(
        <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
            <div>
            {props.message} {addColorStatus(props.status)}
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
                    {consStatus(props.status)}
                </Box>
            </Popover>
            </div>
        )}
        </PopupState>
    )
}