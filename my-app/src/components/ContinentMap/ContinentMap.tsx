import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);
export const ContinentMap = () => {
    
    const classes = useStyles();
    return(
        <div>
            <Button
            variant="contained"
            size="small"
            className={classes.button}
            startIcon={<PublicIcon />}
            style={{height:"3em", marginTop:"2em"}}
            >
            Continents
            </Button>
        </div>
    )
}