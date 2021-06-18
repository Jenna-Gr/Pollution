import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [display, setDisplay] = useState('loading');
  const [allCommunities, setAllCommuniites] = useState('');

  useEffect(() => {
    axios.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=10&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&entity=community&dumpRaw=false')
      .then((response) => {
        setAllCommuniites(response.data.results);
        console.log(response.data.results);
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
        {allCommunities.map((community) => {
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
