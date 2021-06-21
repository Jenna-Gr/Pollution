import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Typography, AppBar, Toolbar } from '@material-ui/core/';
import { v4 as uuidv4 } from 'uuid';

import Community from './Community.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  title: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    color: 'white',
  },
  appBar1: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: '#2c856a'
  },
  appBar2: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.palette.primary
  },
}));

const Communities = props => {
  const classes = useStyles();

  return (
    <div data-testid="communities">
      <AppBar position="static" className={classes.appBar1} >
        <Toolbar variant="dense" >
          <Typography variant="h5" data-testid="low-heading">
            LOW POLLUTION COMMUNITIES: {props.lowCommunities.length}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        style={{
          maxHeight: '25vh',
          boxSizing: 'border-box',
          padding: '1em',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          <List className={classes.root}>
            {props.lowCommunities.map((community, index) => {
              while (index < props.displayCount) {
                return (
                  <div data-testid="low-community" key={uuidv4()}>
                    <Community
                      index={index}
                      community={community}
                    />
                  </div>
                );
              }
              })}
          </List>
      </Grid>
      <AppBar position="static" className={classes.appBar2} >
        <Toolbar variant="dense" >
          <Typography variant="h5" data-testid="high-heading">
            HIGH POLLUTION COMMUNITIES: {props.highCommunities.length}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        style={{
          maxHeight: '25vh',
          boxSizing: 'border-box',
          padding: '1em',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          <List className={classes.root}>
            {props.highCommunities.map((community, index) => {
              while (index < props.displayCount) {
                return (
                  <div data-testid="high-community" key={uuidv4()}>
                    <Community
                      index={index}
                      community={community}
                    />
                  </div>
                );
              }
              })}
          </List>
      </Grid>
    </div>
  );
};

export default Communities;