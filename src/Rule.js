import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { getAccount } from './Account';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';

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
  content: {
    padding: 16,
    fontSize: 15,
    color: '#8E8E93',
    '& p': {
      marginTop: 4,
      marginBottom: 4,
    },
    '& div': {
      marginBottom: 16,
    },
  },
});

export default function({ history }) {
  const classes = useStyles();
  const account = getAccount();

  if (!account) {
    history.push('/login');
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.back}>
          <NavLink to="/">
            <IconButton aria-label="delete">
              <ArrowBackIos />
            </IconButton>
          </NavLink>
        </div>
        <div className={classes.title}>Rule</div>
      </div>
      <div className={classes.main}>
        <div className={classes.content}>
          <div>
            <p>打分规则： </p>
            <p>
              1. 在每个队开始展示时就可以对其进行打分，可以选择 1-10 分，如果你放弃为某个队投票，则默认你给该队伍评了 10
              分；
            </p>
            <p>2.每个评委/团队只能给每个队评分一次，一旦提交评分不可修改；</p>
            <p>3. 每个队的总得分 = 70% 评委评分 + 30% 团队互评评分；</p>
            <p>4. 在所有队伍展示完毕 3 分钟后，投票系统将关闭，并显示最终分数排名。</p>
          </div>
          <div>
            <p>建议的评分维度：</p>
            <p>1. 商业价值 (30%): 市场广阔，有商业前景；</p>
            <p>2. 完成度 (30%): 具有可演示性，而非概念模型；</p>
            <p>3.创新性 (20%): 立意独特，打破常规思维；</p>
            <p>4. 技术难度 (20%): 技术层面具有一定突破。</p>
          </div>
          <div>
            <p>Rating rules: </p>
            <p>
              1. Choose from 1-10 to rate each team during or after its presentation, if you didn’t rate certain team,
              then your score would be set as default value which is 10 points.
            </p>
            <p>2. Each judge/team can only rate a team for one time, and cannot edit the score once submit； </p>
            <p> 3. Final score = 70% Judges score + 30% team peer rating score; </p>
            <p>
              4. The rating system will close in 3 minutes after all teams’ presentation and the final rank will be
              shown the at that time.
            </p>
          </div>
          <div>
            <p>Suggested Judgement Dimension：</p>
            <p>
              1. Business Value (30%): Whether there is real value of business, how big the market is, and whether there
              is business prospects;
            </p>
            <p>2. Completeness (30%): Demonstrable, not conceptual models，What are the to do list or 3 milestones;</p>
            <p>3. Creativity (20%): Whether the project is innovative or not;</p>
            <p>4. Technical Difficulty (20%): Whether to break through some technical problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
