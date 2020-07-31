import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const Slider1 = withStyles({
  root: {
    color: '#52af77',
    height: 2,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    webkitAnimation: 'live-cell 2s linear infinite alternate both',
    animation: 'live-cell 2s linear infinite alternate both',
    height: 10,
    borderRadius: 5
  },
})(Slider);


export default function CustomSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(500);


  function changeInterval(e){
    setValue(e.target.value)
  }

  return (
    <div className={classes.root}>
     
      <Typography id='discrete-slider' gutterBottom> Adjust Speed </Typography>
      <Slider1 valueLabelDisplay="auto" aria-labelledby='discrete-slider' min={100} max={1000} step={100} defaultValue={500} onChange={changeInterval}/>

    </div>
  );
}
