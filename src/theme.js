import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
  },
  typography: {
    fontFamily: 'Cairo, Arial, sans-serif',
    useNextVariants: true,
  },
  overrides: {
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          background: '#FAFBFC',

          '& fieldset': {
            borderRadius: 6,
            borderColor: '#DCE0E2',
          },
          '&:hover fieldset': {
            borderColor: '#DCE0E2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#DCE0E2',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
      },
    },
    MuiFormHelperText: {
      root: {
        color: '#f44336',
      },
      contained: {
        margin: '8px 14px 0 0',
      },
    },
  },
});

export default theme;
