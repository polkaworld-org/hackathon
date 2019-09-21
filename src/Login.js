import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import logo from './imgs/logo.jpg';

import { mnemonicValidate, mnemonicExist, saveAccount, getAccount } from './Account';

const useStyles = makeStyles({
  container: {
    paddingTop: 56,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgContainer: {
    paddingLeft: 60,
    paddingRight: 60,
    '& img': {
      width: '100%',
      maxWidth: 480,
    },
  },
  textFieldContainer: {
    marginTop: 8,
    display: 'inline-flex',
    width: '100%',
    maxWidth: 560,
    padding: 16,
    paddingBottom: 32,
  },
  textfield: {
    width: '100%',
  },
  button: {
    height: 48,
    width: 163,
  },
});

export default function({ history }) {
  const classes = useStyles();
  const account = getAccount();

  const [mnemonic, setMnemonic] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={logo} alt="polkaworld hackathon" />
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          className={classes.textfield}
          multiline
          rows="2"
          rowsMax="100"
          value={mnemonic}
          helperText={errorMsg}
          placeholder="Import Mnemonic"
          onChange={e => setMnemonic(e.target.value)}
          margin="normal"
          variant="outlined"
          error={!!errorMsg}
          onFocus={() => setErrorMsg('')}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            if (!mnemonic) {
              setErrorMsg('please input mnemonic');
            } else if (!mnemonicValidate(mnemonic.trim())) {
              setErrorMsg('mnemonic error');
            } else if (!mnemonicExist(mnemonic.trim())) {
              setErrorMsg('account not exist');
            } else {
              saveAccount(mnemonic.trim());
              history.push('/');
            }
          }}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
}
