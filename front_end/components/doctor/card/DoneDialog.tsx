import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DoneDialogProps {
    open,
    onSubmit,
    onCancel,
}

export default function DoneDialog(props: DoneDialogProps) {
  const {open, onSubmit, onCancel} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận yêu cầu này đã hoàn thành"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Việc xác nhận không thể được chỉnh sửa lại. Hãy chắc chắn rằng bạn đã hoàn thành yêu cầu
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Hủy</Button>
          <Button onClick={onSubmit} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}