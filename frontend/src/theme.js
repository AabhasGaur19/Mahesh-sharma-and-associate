//src/theme.js
import { createTheme } from '@mui/material/styles';
import { adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  // Customize theme if needed
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
}));

export default theme;