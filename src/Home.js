import React from 'react';

import { getAccount } from './Account';

export default function() {
  // const classes = useStyles();
  const account = getAccount();

  console.log(account)

  return <div ></div>;
}
