// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Component definition
export default function DateButton({ monthIndex, date, year, onSelect }) {
  const dateObject = new Date(year, monthIndex, date);
  const todayFull = new Date();
  const today = new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate());

  const activeStyle = {
    minWidth: 0,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#202020',
    ':hover': {
      backgroundColor: '#f1f1f1' // #dd4b39 - selected
    }
  };

  const inactiveStyle = {
    minWidth: 0,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#202020!important',
    opacity: '0.15'
  };

  const todayStyle = {
    minWidth: 0,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#fff',
    backgroundColor: 'rgb(221, 75, 57)',
    fontWeight: '700',
    ':hover': {
      backgroundColor: 'rgb(221, 75, 57)' // #dd4b39 - selected
    }
  };

  const active = dateObject >= today;

  // Define event handlers
  const handleClick = () => {
    if (active) {
      onSelect(dateObject);
    }
  };

  // Render 
  return (
    <mui.Grid item xs={1}>
      <mui.Button
        onClick={handleClick}
        disabled={!active}
        variant="text"
        sx={active ? (dateObject.getTime() === today.getTime() ? todayStyle : activeStyle) : inactiveStyle}
      >
        {dateObject.getDate()}
      </mui.Button>
    </mui.Grid>
  );
}