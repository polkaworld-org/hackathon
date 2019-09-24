import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import { getAccount } from './Account';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import config from './config';

const useStyles = makeStyles({
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
  back: {
    position: 'absolute',
    left: 5,
    fontSize: 14,
    top: -2,
  },
  main: {
    position: 'relative',
    maxWidth: '100%',
    paddingTop: 45,
  },
  title: {
    fontSize: 18,
    margin: 'auto',
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
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    background: '#FAFBFC',
    borderBottom: '1px solid #D1D1D6',
  },
  address: {
    width: 250,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 14,
    color: '#8E8E93',
  },
  itemscore: {
    fontSize: 14,
    color: '#34C69A',
    fontWeight: 'bold',
  },
  itemscorenull: {
    fontSize: 14,
    color: '#111111',
    fontWeight: 'bold',
  },
});

export default function({ history, match }) {
  const classes = useStyles();
  const account = getAccount();

  if (!account) {
    history.push('/login');
    return null;
  }

  const {
    params: { id },
  } = match;

  const [loading, setLoading] = useState(true);
  const [voteData, setVoteData] = useState(null);
  const [voteStatus, setVoteStatus] = useState('0');
  const [scoreList, setScoreList] = useState(null);

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
          project: 210,
        };

        for (const i of scoreList.detail) {
          if (i.type === '1') {
            total.judge -= 10 - i.score;
          } else if (i.type === '2') {
            total.project -= 10 - i.score;
          }
        }

        scoreList.total = (total.judge / 130) * 0.7 + (total.project / 210) * 0.3;

        return scoreList;
      });

      if (detail.result.find(({ target }) => target === id)) {
        const aaa = detail.result.find(({ target }) => target === id);
        const index = config
          .filter(({ type }) => type === '2')
          .slice()
          .sort((a, b) => {
            const aa = detail.result.find(x => x.target === a.address) || 0;
            const bb = detail.result.find(x => x.target === b.address) || 0;
            return bb.total - aa.total;
          })
          .findIndex(({ address }) => address === aaa.target);

        aaa.index = index + 1;
        setScoreList(aaa);
      }

      setVoteData(detail.result);
      setVoteStatus(status.result);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.back}>
          <NavLink to="/">
            <IconButton>
              <ArrowBackIos />
            </IconButton>
          </NavLink>
        </div>
        <div className={classes.title}>Detail</div>
      </div>
      <div className={classes.main}>
        <div className={classes.card}>
          <div className={classes.cardLeft}>
            <div className={classes.cardTitle}>{config.find(({ address }) => address === id).projectName}</div>
            <div className={classes.cardAddress}>{id}</div>
          </div>
          <div className={classes.cardRight}>
            <div className={classes.score}>
              <div className={classes.scoreTitle}>Score</div>
              <div className={classes.scoreContent}>
                {scoreList && scoreList.total ? (scoreList.total * 100).toFixed(2) : '-'}
              </div>
            </div>
            <div className={classes.rate}>
              <div className={classes.rateTitle}>Ranking</div>
              <div className={`${classes.rateContent}`}>{scoreList && scoreList.total ? scoreList.index : '-'}</div>
            </div>
          </div>
        </div>
        {!loading &&
          scoreList &&
          scoreList.detail.map(({ score, address, projectName }) => {
            return (
              <div className={classes.item} key={address}>
                <div className={classes.address}>{projectName || address}</div>
                {score ? (
                  <div className={classes.itemscore}>+{score}</div>
                ) : (
                  <div className={classes.itemscorenull}>-</div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
