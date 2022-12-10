import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ChangePass(props) {

  const handleChangePass = () => {
    
  };

  const handleCancel = () => {

  };

  return (
    <div>
      <Dialog open={true} >
      <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="oldpass"
            label="Old Password"
            fullWidth
            variant="standard"
          />
          <TextField
            
            margin="dense"
            id="newpass"
            label="New Password"
            fullWidth
            variant="standard"
          />
          <TextField
            
            margin="dense"
            id="repeatpass"
            label="Repeat New Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleChangePass}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}