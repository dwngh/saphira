import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserService } from '../../service/UserService';
import { useAuth } from '../../utils/useAuth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error('Mật khẩu không trùng khớp !', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
      else{
        const pass = {
          oldPassword: oldPass,
          newPassword: newPass
        }
        const response = await changePassword(pass, userId, accessToken)
        if(typeof(response) === typeof({})) {
          toast.error(response.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        } else {
          toast.success('Cập nhật thành công!', {
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(() => {
            props.changePass()
          }, 3000)
        }
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
            id="oldpassword"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            value={oldPass}
            onChange={handleChangeOldPass}
          />
          <TextField
            
            margin="dense"
            id="newpassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPass}
            onChange={handleChangeNewPass}
          />
          <TextField
            
            margin="dense"
            id="repeatpassword"
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
      <ToastContainer />
    </div>
  );
}