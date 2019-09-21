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
    MuiSlider: {
      track: {
        height: 3,
      },
      thumb: {
        height: 25,
        width: 25,
        backgroundColor: '#fff',
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        marginTop: -11,
        marginLeft: -11,
        '&:focus,&:hover,&$active': {
          boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
          '@media (hover: none)': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
          },
        },
      },
      valueLabel: {
        left: 'calc(-50% + 10px)',
        top: -16,
        color: '#111111',
        fontSize: 14,
        '& *': {
          background: 'transparent',
          color: '#000',
        },
      },
      active: {},
      markLabel: {
        marginTop: 10,
        fontSize: 12,
        color: '#8E8E93',
      },
      markLabelActive: {
        color: '#8E8E93',
      },
    },
  },
});

export default theme;
