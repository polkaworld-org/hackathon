import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { getAccount, vote } from './Account';
import Dialog from './Dialog';

const useStyles = makeStyles({
  main: {
    padding: '16px 16px 16px 20px',
    background: '#FAFBFC',
    boxShadow: '0 -2px 4px 0',
    display: 'flex',
  },
  sliderContainer: {
    marginTop: 24,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: -1,
    marginRight: -1,
    marginTop: 8,
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default function Modal({ title, target, onClose, callBack, ...props }) {
  const classes = useStyles();

  const [score, setScore] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <Drawer anchor="bottom" {...props} open={!!target} onClose={onClose}>
        <div className={classes.main}>
          <div className={classes.sliderContainer}>
            <Slider value={score} onChange={(e, v) => setScore(v)} valueLabelDisplay="on" step={1} min={1} max={10} />
            <div className={classes.label}>
              <div>Dislike</div>
              <div>Amazing</div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
              Confirm
            </Button>
          </div>
        </div>
      </Drawer>
      <Dialog
        open={dialogOpen}
        onClose={result => {
          if (result) {
            setDialogOpen(false);
            vote(target, score).then(data => {
              onClose();
              callBack();
            });
          } else {
            setDialogOpen(false);
            onClose();
          }
        }}
      ></Dialog>
    </div>
  );
}
