import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{'Are you sure？'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Each judge/team can only rate a team for one time, and cannot edit the score once submit
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          No
        </Button>
        <Button onClick={() => onClose(true)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
