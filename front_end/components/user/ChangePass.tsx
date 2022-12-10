import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserService } from '../../service/UserService';
import { useAuth } from '../../utils/useAuth';

export default function ChangePass(props) {
  const { changePassword } = UserService()
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')
  const { accessToken, userId } = useAuth();
  const handleChangeOldPass = (event) => {
    setOldPass(event.target.value)
  }

  const handleChangeNewPass = (event) => {
    setNewPass(event.target.value)
  }
  const handleChangeRepeatPass = (event) => {
    setRepeatPass(event.target.value)
  }
  const handleChangePass = async () => {
    if(newPass !== repeatPass) {
      console.log("Mật khẩu không trùng khớp")
    }
    else{
      const pass = {
        oldPassword: oldPass,
        newPassword: newPass
      }
      const response = await changePassword(pass, userId, accessToken)
      props.changePass()
    }
  };

  const handleCancel = () => {
    props.changePass()
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
            value={oldPass}
            onChange={handleChangeOldPass}
          />
          <TextField
            
            margin="dense"
            id="newpass"
            label="New Password"
            fullWidth
            variant="standard"
            value={newPass}
            onChange={handleChangeNewPass}
          />
          <TextField
            
            margin="dense"
            id="repeatpass"
            label="Repeat New Password"
            type="password"
            fullWidth
            variant="standard"
            value={repeatPass}
            onChange={handleChangeRepeatPass}
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