// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Component definition
// year - full year 
// month - month number: 1 - January, 2 - February, ... 12 - December
export default function DatePicker({ onSelect, calendarYear, calendarMonth, sx }) {
  // Define helper functions
  // Get the number of days in a given calendar month
  const getDays = (calYear, calMonth) => {
    return (new Date(calYear, calMonth, 0)).getDate();
  }

  // Returns an array of dates in a given calendar month
  const getDates = (calYear, calMonth) => {
    return Array(getDays(calYear, calMonth)).fill(0).map((_, i) => new Date(calYear, calMonth - 1, i + 1));
  }

  // Check if calendar month is valid
  const isValidCalendarMonth = (calYear, calMonth) => {
    return !isNaN(getDays(calYear, calMonth));
  }

  // Get the first day of the month
  const firstDay = (calYear, calMonth) => {
    return new Date(calYear, calMonth - 1, 1);
  }

  // Get calendar month string 
  const getCalendarMonthString = (calYear, calMonth) => {
    const dateString = firstDay(calYear, calMonth).toString();
    const dateTokens = dateString.split(' ');
    return `${dateTokens[1]} ${dateTokens[3]}`;
  }

  // Start computation here

  // Get today
  const today = new Date();

  // Validate and update calendar year and calendar month
  if (!isValidCalendarMonth(calendarYear, calendarMonth)) {
    calendarYear = today.getFullYear();
    calendarMonth = today.getMonth() + 1;
  }

  // Get the first day
  const first = firstDay(calendarYear, calendarMonth);

  // Render the component
  return (
    <mui.Grid
      columns={7}
      container
      sx={{
        ...sx,
        p: '16px',
        width: '200px',
        backgroundColor: '#fff',
        border: '1px #ddd solid',
        borderRadius: '3px'
      }}>
      {/* Month header */}
      <mui.Grid item xs={7}>
        <span>{getCalendarMonthString(calendarYear, calendarMonth)}</span>
      </mui.Grid>

      {/* Put calendar month spaces here */}
      {Array(firstDay(calendarYear, calendarMonth).getDay()).fill('').map(s => (
        <mui.Grid item xs={1} />
      ))}

      {/* Put the actual buttons */}
      {getDates(calendarYear, calendarMonth).map((d) => (
        <mui.Grid item xs={1}>
          <mui.Button
            onClick={() => onSelect(d)}
            sx={{
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
            }}
          >
            {d.getDate()}
          </mui.Button>
        </mui.Grid>
      ))}
    </mui.Grid>
  );
}