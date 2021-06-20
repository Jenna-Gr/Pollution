import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import axios from 'axios';

import Communities from './Communities.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  title: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    color: 'white'
  },
  appBar: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'black'
  }
}));

const App = () => {
  const classes = useStyles();
  const [display, setDisplay] = useState('loading');
  const [allCommunities, setAllCommunities] = useState('');
  const [highCommunities, setHighCommunities] = useState([]);
  const [lowCommunities, setLowCommunities] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    axios.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=160&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false')
      .then((response) => {
        setAllCommunities(response.data.results);
        // console.log(response.data.results);
        response.data.results.forEach((community) => {
          var category = 'low';
          community.parameters.forEach((parameter) => {
            if (parameter.unit === 'µg/m³' && parameter.average >= 5) {
              category = 'high';
            }
          })
          if (category === 'high') {
            setHighCommunities(highCommunities => [...highCommunities, community]);
          } else {
            setLowCommunities(lowCommunities => [...lowCommunities, community]);
          }
        })
        setDisplay('ready');
      })
      .catch((error) => {
        throw error;
      });
  }, []);


  if (display === 'loading') {
    return (
      <div className="App">
        <header>
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (display === 'ready') {
    return (
      <div className="App">
        <ButtonGroup>
          <Button
            aria-label="load more communities"
            data-restid="more-communities"
            variant="outlined"
            onClick={() => {
              setDisplayCount(displayCount + 4);
            }}> Show More Communities </Button>
        </ButtonGroup>
        <Grid>
          <Communities
            highCommunities={highCommunities}
            lowCommunities={lowCommunities}
            displayCount={displayCount} />
        </Grid>
      </div>
    );
  }
}

export default App;
