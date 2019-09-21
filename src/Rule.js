import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({

});

export default function({ history }) {
  const classes = useStyles();
  const account = getAccount();

  if (account) {
    history.push('/');
    return null;
  }

  return (
    <div className={classes.container}>

    </div>
  );
}
