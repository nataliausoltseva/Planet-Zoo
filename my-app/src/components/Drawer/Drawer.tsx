import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

type Anchor = 'left'

interface Props{
    show:boolean
    handleOnClick: (value:string)=> void;
}

export default function TemporaryDrawer(props:Props) {

  const [state, setState] = React.useState({
    left: false
  });
  const data = require('../../JSON components/animals.json');

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor: Anchor) => (
    <div
      
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
        <ListItem button>
            <ListItemText primary={"Animals"} />
          </ListItem>
      </List>
      <Divider />
      <List>
        {data.map((item: { species: string; }, index: any) => (
          <ListItem button key={item.species} onClick={()=>props.handleOnClick(item.species)}>
            <ListItemText primary={item.species} />
          </ListItem>
        ))}
      </List>

    </div>
  );

  return (
    <div>
      { props.show?(
        <React.Fragment key={"left"}>
          <Button
          variant="contained"
          size="small"
          startIcon={<MenuIcon />}
          onClick={toggleDrawer("left", true)}
          style={{width:"5%", height:"3em", marginTop:"2em"}}
          hidden={true}
        />
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
      ):null}
    </div>
  );
}