import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [display, setDisplay] = useState('loading');
  const [allCommunities, setAllCommunities] = useState('');
  const [highCommunities, setHighCommunities] = useState([]);
  const [lowCommunities, setLowCommunities] = useState([]);

  useEffect(() => {
    axios.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=16000&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false')
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
        <h1>Loading...</h1>
      </div>
    );
  }

  if (display === 'ready') {
    return (
      <div className="App">
        <h3>High Communities: {highCommunities.length}</h3>
        {highCommunities.map((community) => {
          return(
            <ul>
              <li>
                <span>{community.name}</span>
                <span>{community.parameters[0].average}</span>
              </li>
            </ul>
          )
        })}
        <h3>Low Communities: {lowCommunities.length}</h3>
        {lowCommunities.map((community) => {
          return(
            <ul>
              <li>
                <span>{community.name}</span>
                <span>{community.parameters[0].average}</span>
              </li>
            </ul>
          )
        })}
      </div>
    );
  }
}

export default App;
