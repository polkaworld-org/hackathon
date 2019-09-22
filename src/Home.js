import React, { useState, useEffect, useReducer, useMemo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';

import Modal from './Modal';

import { getAccount, setStatus } from './Account';
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
  admin: {
    position: 'absolute',
    left: 16,
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
  number: {},
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

  const isAdmin = account.type === '0';

  const showDetail = isAdmin || voteStatus === '1';

  useEffect(() => {
    Promise.all([
      fetch('https://api.polkaworld.org/detail').then(r => r.json()),
      fetch('https://api.polkaworld.org/status').then(r => r.json()),
    ]).then(([detail, status]) => {
      detail.result.map(scoreList => {
        scoreList.detail = Object.keys(scoreList.result).map(voteAddress => {
          const voteAccount = config.find(({ address }) => address === voteAddress);
          const score = scoreList.result[voteAddress];
          return {
            score,
            ...voteAccount,
          };
        });

        let total = {
          judge: 130,
          project: 240,
        };

        for (const i of scoreList.detail) {
          if (i.type === '1') {
            total.judge -= 10 - i.score;
          } else if (i.type === '2') {
            total.project -= 10 - i.score;
          }
        }

        scoreList.total = (total.judge / 130) * 0.7 + (total.project / 240) * 0.3;

        return scoreList;
      });

      setVoteData(detail.result);
      setVoteStatus(status.result);
      setLoading(false);
    });
  }, [count]);

  const projects = useMemo(() => {
    if (showDetail && voteData) {
      return config
        .filter(({ type }) => type === '2')
        .slice()
        .sort((a, b) => {
          const aa = voteData.find(x => x.target === a.address) || 0;
          const bb = voteData.find(x => x.target === b.address) || 0;
          return bb.total - aa.total;
        });
    } else {
      return config.filter(({ type }) => type === '2');
    }
  }, [config, voteData, showDetail]);

  return (
    <div>
      <div className={classes.header}>
        {isAdmin && (
          <div className={classes.admin}>
            <div
              onClick={() => {
                setStatus(voteStatus === '0' ? true : false).then(() => {
                  forceUpdate();
                });
              }}
              className={classes.link}
            >
              {voteStatus === '0' ? '关闭投票' : '开启投票'}
            </div>
          </div>
        )}
        <div className={classes.title}>{account.projectName || (account.type === '0' ? 'Admin' : 'Judge')}</div>
        <div className={classes.rule}>
          <NavLink to="/rule" className={classes.link}>
            Rule
          </NavLink>
        </div>
      </div>
      <div className={classes.main}>
        {voteData &&
          projects.map(({ projectName, address }) => {
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

            const canVote = !isSelf && score === '-' && !showDetail;

            return (
              <div
                className={`${classes.card} ${canVote ? (address === openAddress ? classes.black : '') : classes.grey}`}
                key={address}
                onClick={() => {
                  if (showDetail) {
                    history.push(`/detail/${address}`);
                  } else if (canVote) setOpenAddress(address);
                }}
              >
                <div className={classes.cardLeft}>
                  <div className={classes.cardTitle}>{projectName}</div>
                  <div className={classes.cardAddress}>{address}</div>
                </div>
                <div className={classes.cardRight}>
                  <div className={classes.score}>
                    <div className={classes.scoreTitle}>Score</div>
                    <div className={classes.scoreContent}>
                      {loading || !showDetail
                        ? '-'
                        : voteData
                        ? voteData.find(x => x.target === address) &&
                          Math.floor(voteData.find(x => x.target === address).total * 100)
                        : '-'}
                    </div>
                  </div>
                  {showDetail ? (
                    <div className={classes.rate}>
                      <div className={classes.rateTitle}>Number</div>
                      <div className={`${classes.scoreContent}`}>
                        {voteData
                          ? voteData.find(x => x.target === address) &&
                            voteData.find(x => x.target === address).detail.length
                          : '-'}
                      </div>
                    </div>
                  ) : (
                    <div className={classes.rate}>
                      <div className={classes.rateTitle}>My Rated</div>
                      <div className={`${classes.rateContent} ${score !== '-' ? classes.scoreValue : ''}`}>{score}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <Modal target={openAddress} onClose={() => setOpenAddress('')} callBack={forceUpdate} />
    </div>
  );
}
