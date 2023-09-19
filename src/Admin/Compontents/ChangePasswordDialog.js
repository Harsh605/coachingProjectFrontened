import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updatePassword, updateProfile } from '../../slices/userSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ChangePasswordDialog({open,setOpen}) {
    const dispatch = useDispatch()
    const [oldPassword,setOldPassword]= useState("")
    const [newPassword,setNewPassword]= useState("")
    const [confirmPassword,setConfirmPassword]= useState("")
    const [error,setError]= useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
            dispatch(updatePassword({oldPassword,newPassword,confirmPassword})).then(()=>{
              dispatch(loadUser())
            })
       
      }

  return (
    <div>
      <BootstrapDialog
      sx={{zIndex:"11000"}}
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          Update Password
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers className='grid grid-row-1 gap-6'>
            <TextField required id="outlined-basic" value={oldPassword} type="password" label="Old Password" variant="outlined" onChange={(e) => setOldPassword(e.target.value)} />
            <TextField required id="outlined-basic" value={newPassword} type="password" label="New Password" variant="outlined" onChange={(e) => setNewPassword(e.target.value)} />
            <TextField required id="outlined-basic" value={confirmPassword} type="password" label="Confirm Password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} />
            {error &&
                <Typography color="red">"New Password and Confirm Password must be same.</Typography>}
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" autoFocus >
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div >
  );
}