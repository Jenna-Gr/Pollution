import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Chart: props = ({
  value,
  size,
}) => {
  return (
    <div>
      <CircularProgress
        size={`${size}%`}
        value={value}
        thickness={22}
        variant="determinate"
        color="primary"
      />
    </div>
  );
};
export default Chart;