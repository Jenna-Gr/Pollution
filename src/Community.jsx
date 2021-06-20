import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Community = props => {

  return (
    <div>
        <h4> {props.community.name} </h4>
    </div>
  );
};

export default Community;