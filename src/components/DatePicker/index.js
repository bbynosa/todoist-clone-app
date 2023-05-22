// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Import utils
import * as DateUtils from './DateUtils';

// Import components
import DateMonth from './DateMonth';

// Import icons
import { ReactComponent as PrevIcon } from '../../icons/prev.svg';
import { ReactComponent as NextIcon } from '../../icons/next.svg';

// Component definition
// year - full year 
// month - month number: 1 - January, 2 - February, ... 12 - December
export default function DatePicker({ onSelect, calendarYear, calendarMonth, sx }) {
  // Get today 
  const today = new Date();

  // Get list of months to display
  const startMonth = [today.getMonth(), today.getFullYear()];
  const nextMonth = [today.getMonth() + 1, today.getFullYear()];
  const [months, setMonths] = React.useState(
    [
      [3, 2023],
      [4, 2023],
      [5, 2023],
      [6, 2023],
      [7, 2023],
      [8, 2023],
      [9, 2023]
    ]
  );
  const [currentMonth, setCurrentMonth] = React.useState(structuredClone(startMonth));
  const scrollOffset = React.useRef(0);

  // Define event handlers
  const handleScroll = (e) => {
    // Compute scroll offset
    const scrollOffset = e.target.scrollTop + e.target.offsetTop;

    // Loop through each child 
    for (let i in e.target.childNodes) {
      const top = e.target.childNodes[i].offsetTop;
      const bottom = e.target.childNodes[i].offsetHeight + top;

      if (top <= scrollOffset && scrollOffset <= bottom) {
        setCurrentMonth(structuredClone(months[i]));
        return;
      }
    }
  };

  const dayHeaderStyle = {
    fontSize: '10px',
    lineHeight: '24px',
    color: '#808080',
    textAlign: 'center'
  };

  const monthBtnStyle = {
    width: '24px',
    height: '24px',
    color: 'black'
  };

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Render the component
  return (
    <mui.Box
      sx={{
        ...sx,
        p: '16px',
        width: '200px',
        backgroundColor: '#fff',
        border: '1px #ddd solid',
        borderRadius: '3px'
      }}>

      {/* Month Header */}
      <mui.Box sx={{ display: 'flex' }} py={'4px'}>
        <mui.Box
          sx={{
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '24px',
            width: '100%'
          }}>
          {DateUtils.monthName(currentMonth[0])} {currentMonth[1]}
        </mui.Box>

        <mui.Box
          sx={{
            flexShrink: '0'
          }}
        >
          <PrevIcon sx={monthBtnStyle} />
          <NextIcon sx={monthBtnStyle} />
        </mui.Box>

      </mui.Box>

      {/* Day Header */}
      <mui.Grid container columns={7}>
        {days.map((d, i) => (
          <mui.Grid item key={i} xs={1} sx={dayHeaderStyle}>{d}</mui.Grid>
        ))}
      </mui.Grid>

      {/* Month Scroller */}
      <mui.Box
        sx={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          maxHeight: '200px',
          scrollbarWidth: 'none'
        }}
        onScroll={handleScroll}
      >
        {months.map(([m, y], i) => (
          <DateMonth key={i} monthIndex={m} year={y} onSelect={onSelect} scrollOffset={scrollOffset.current} />
        ))}
      </mui.Box>
    </mui.Box >
  );
}