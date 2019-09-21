import React, { useState, useEffect, useReducer } from 'react';

import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';

import Modal from './Modal';

import { getAccount } from './Account';
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
  black: {
    background: '#111111',
    color: '#ffffff',
    '& $cardTitle': {
      color: '#ffffff',
    },
    '& $cardAddress': {
      color: '#ffffff',
    },
    '& $scoreTitle': {
      color: '#ffffff',
    },
    '& $rateTitle': {
      color: '#ffffff',
    },
    '& $rateContent': {
      color: '#ffffff',
    },
    '& $scoreContent': {
      color: '#ffffff',
    },
  },
  grey: {
    background: '#FAFBFC',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  scoreValue: {
    color: '#34C69A',
  },
});

export default function({ history }) {
  const classes = useStyles();

  const [count, forceUpdate] = useReducer(x => x + 1, 1);
  const [openAddress, setOpenAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [voteData, setVoteData] = useState(null);
  const [voteStatus, setVoteStatus] = useState('0');
  const account = getAccount();

  if (!account) {
    history.push('/login');
    return null;
  }

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8081/detail').then(r => r.json()),
      fetch('http://localhost:8081/status').then(r => r.json()),
    ]).then(([detail, status]) => {
      setVoteData(detail.result);
      setVoteStatus(status.result);
      setLoading(false);
    });
  }, [count]);

  const projects = config.filter(({ type }) => type === '2');

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.title}>{account.projectName || (account.type === '0' ? 'Admin' : 'Judge')}</div>
        <div className={classes.rule}>
          <NavLink to="/rule" className={classes.link}>
            Rule
          </NavLink>
        </div>
      </div>
      <div className={classes.main}>
        {projects.map(({ projectName, address }) => {
          const isSelf = address === account.address;

          let score = '-';
          if (isSelf || loading) {
            score = '-';
          } else {
            const findResult = voteData.find(x => x.target === address);
            if (findResult && findResult.result[account.address]) {
              score = `+${findResult.result[account.address]}`;
            } else {
              score = '-';
            }
          }

          const canVote = !isSelf && score === '-';

          return (
            <div
              className={`${classes.card} ${canVote ? (address === openAddress ? classes.black : '') : classes.grey}`}
              key={address}
              onClick={() => {
                if (canVote) setOpenAddress(address);
              }}
            >
              <div className={classes.cardLeft}>
                <div className={classes.cardTitle}>{projectName}</div>
                <div className={classes.cardAddress}>{address}</div>
              </div>
              <div className={classes.cardRight}>
                <div className={classes.score}>
                  <div className={classes.scoreTitle}>Score</div>
                  <div className={classes.scoreContent}>{loading ? '-' : voteStatus ? '-' : '1'}</div>
                </div>
                <div className={classes.rate}>
                  <div className={classes.rateTitle}>My Rated</div>
                  <div className={`${classes.rateContent} ${score !== '-' ? classes.scoreValue : ''}`}>{score}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal target={openAddress} onClose={() => setOpenAddress('')} callBack={forceUpdate} />
    </div>
  );
}
