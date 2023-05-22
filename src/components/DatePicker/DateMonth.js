// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Import utils
import * as DateUtils from './DateUtils';

// Import components
import DateButton from './DateButton';

// Component definition
export default function DateMonth({ monthIndex, year, onSelect }) {
  const firstDate = new Date(year, monthIndex, 1);
  const lastDate = new Date(year, monthIndex + 1, 0);
  const dates = [...Array(DateUtils.days(monthIndex, year)).keys()];

  // Render
  return (
    <mui.Grid
      columns={7}
      container
      >

      <mui.Grid
        item
        xs={7}
        py={1}
        sx={{
          fontSize: '12px',
          fontWeight: '700',
          borderBottom: '1px solid #ddd'
        }}
        >
        {DateUtils.monthName(firstDate.getMonth())}
      </mui.Grid>

      <mui.Grid item xs={DateUtils.weekOfDay(firstDate)} />

      {dates.map(d => (
        <DateButton key={d} monthIndex={firstDate.getMonth()} year={firstDate.getFullYear()} date={d + 1} onSelect={onSelect} />
      ))}

    </mui.Grid>
  )
}