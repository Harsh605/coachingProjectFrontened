import React from 'react';
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
import { loadUser, updateProfile } from '../../slices/userSlice';

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

export default function ProfileUpdatedDialog({ open, setOpen, name, email, setEmail, setName, avatar, setAvatar }) {
  // const [open, setOpen] = React.useState(true);
const dispatch = useDispatch()
  const handleImgUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateProfile({name,email,avatar})).then(()=>{
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
          Update Profile
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers className='grid grid-row-1 gap-6'>
            <TextField id="outlined-basic" value={name} type="name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <TextField id="outlined-basic" value={email} type="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
            {/* <Input  value={img} onChange={handleSetImg}/> */}
            <label htmlFor="dropzone-file" className="w-full   border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                <div className='flex w-full items-center justify-center gap-4'>
                  <div className='w-full  sm:w-1/2 flex justify-center item-center'>
                    <img src={avatar} style={{ width: "100%", maxWidth: "150px" }} alt="Avatar Preview" />
                  </div>
                  <div className='w-full sm:w-1/2'>
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokelinecap="round" strokeLinejoin="round" strokeWidth
                      ="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                </div>

              </div>

              <input
                type="file"
                name="file"
                id="dropzone-file"
                onChange={handleImgUpload}
                accept="image/*"
                className=" hidden px-4 py-2 transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />

            </label>
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