// React imports 
import * as React from "react";

// Material UI imports 
import * as mui from '@mui/material';

// Import icons
import { ReactComponent as DeleteIcon } from '../icons/icon_del.svg';
import { ReactComponent as DateIcon } from '../icons/icon_date.svg';

// Component imports
import DatePicker from "./DatePicker";

// Component definition
export default function DateField({ name, value, placeholder, onChange, sx }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(value instanceof Date ? value : null);

  // Handlers
  const onSelect = (date) => {
    setSelectedDate(date);
    setAnchorEl(null);
    onChange({ target: { name: name, value: date.toISOString() } });
  }

  // Render component
  return (
    <mui.Box
      sx={{
        ...sx,
        '&': {
          p: 0,
          border: '1px #ddd solid',
          borderRadius: '5px',
          height: '28px',
          background: '#fff'
        },
        '&:hover': {
          backgroundColor: '#eee',
          svg: {
            color: '#1a1a1a'
          }
        }
      }}
    >
      <mui.Button
        onClick={(e) => setAnchorEl(anchorEl ? null: e.target)}
        sx={{
          '&': {
            textTransform: 'none',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            py: 0,
            pl: '6px',
            pr: !selectedDate ? '6px' : '28px',
            height: '28px',
            lineHeight: '28px',
            verticalAlign: 'middle',
            color: '#808080',
            svg: {
              color: 'rgb(0, 0, 0, 0.56)'
            }
          },
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <DateIcon
          style={{
            marginRight: '4px'
          }}
        />
        {selectedDate ? selectedDate.toDateString() : placeholder}
      </mui.Button>
      <mui.Button
        onClick={() => setSelectedDate(null)}
        sx={{
          '&': {
            p: 0,
            height: '16px',
            width: '16px',
            minWidth: '16px',
            marginLeft: '-22px',
            marginTop: '6px',
            position: 'absolute',
            color: '#666',
            display: !selectedDate ? 'none' : 'inline-block'
          },
          '&:hover': {
            color: '#1a1a1a',
            backgroundColor: '#d3d3d3'
          }
        }}
      >
        <DeleteIcon />
      </mui.Button>
      <mui.Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
      >
        <DatePicker
          onSelect={onSelect}
        />
      </mui.Popper>
    </mui.Box>
  );
}