import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import Modal from './Modal';
import { getAccount, vote } from './Account';
import config from './config';

const useStyles = makeStyles({
  main: {
    position: 'relative',
    maxWidth: '100%',
    paddingTop: 45,
  },
  header: {
    top: 0,
    left: 'auto',
    right: 0,
    position: 'fixed',
    width: '100%',
    background: '#f9f9f9',
    textAlign: 'center',
    overflow: 'hidden',
    padding: 12,
    color: '#030303',
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    margin: 'auto',
  },
  rule: {
    position: 'absolute',
    right: 16,
    top: 12,
    fontSize: 18,
  },
  card: {
    display: 'flex',
    borderBottom: '1px solid #D1D1D6',
  },
  cardLeft: {
    flex: 1,
    padding: '14px 12px',
    wordBreak: 'break-all',
  },
  cardTitle: {
    fontSize: 16,
    color: '#000000',
  },
  cardAddress: {
    marginTop: 8,
    fontSize: 14,
    color: '#8E8E93',
  },
  cardRight: {
    display: 'flex',
    paddingTop: 16,
    paddingBottom: 16,
  },
  score: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRight: '1px solid #EFEFF4',
  },
  scoreTitle: {
    fontSize: 14,
    color: '#C7C7CC',
  },
  rate: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  scoreContent: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateTitle: {
    paddingTop: 1,
    fontSize: 14,
    color: '#C7C7CC',
  },
  rateContent: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function({ history }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(true);
  const account = getAccount();

  if (!account) {
    history.push('/login');
    return null;
  }

  const projects = config.filter(({ type }) => type === '2');

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.title}>{account.projectName || (account.type === '0' ? 'Admin' : 'Judge')}</div>
        <div className={classes.rule}>Rule</div>
      </div>
      <div className={classes.main}>
        {projects.map(({ projectName, address }) => (
          <div className={classes.card} key={address}>
            <div className={classes.cardLeft}>
              <div className={classes.cardTitle}>{projectName}</div>
              <div className={classes.cardAddress}>{address}</div>
            </div>
            <div className={classes.cardRight}>
              <div className={classes.score}>
                <div className={classes.scoreTitle}>Score</div>
                <div className={classes.scoreContent}>-</div>
              </div>
              <div className={classes.rate}>
                <div className={classes.rateTitle}>My Rated</div>
                <div className={classes.rateContent} style={{ color: '#34C69A' }}>
                  +5
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}></Modal>
    </div>
  );
}
