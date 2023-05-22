// Date utility functions
const weekOfDay = (d) => (d.getDay() + 6) % 7;

const monthHeaderNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const monthName = (m) => monthHeaderNames[m % 12];

const days = (m, y) => new Date(y, m + 1, 0).getDate();


// Export functions
export { weekOfDay, monthName, days };