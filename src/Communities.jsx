import React from 'react';
import { Grid } from '@material-ui/core/';

import Community from './Community.jsx';

const Communities = props => {

  return (
    <div data-testid="communities">
      <h3> LOW POLLUTION COMMUNITIES: {props.lowCommunities.length}</h3>
      <Grid
        style={{
          maxHeight: '50vh',
          boxSizing: 'border-box',
          padding: '1em',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
        {props.lowCommunities.map((community, index) => {
          while (index < props.displayCount) {
            return (
              <Community
                key={`${community.id}`}
                index={index}
                community={community}
              />
            );
          }
          })}
      </Grid>
      <h3> HIGH POLLUTION COMMUNITIES: {props.highCommunities.length} </h3>
      <Grid
        style={{
          maxHeight: '50vh',
          boxSizing: 'border-box',
          padding: '1em',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
        {props.highCommunities.map((community, index) => {
          while (index < props.displayCount) {
            return (
              <Community
                key={`${community.id}`}
                index={index}
                community={community}
              />
            );
          }
          })}
      </Grid>
    </div>
  );
};

export default Communities;