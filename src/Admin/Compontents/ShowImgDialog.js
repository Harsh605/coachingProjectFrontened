import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShowImgDialog({img,open,setOpen}) {

  

  return (
    <div>
      
      
      <Dialog open={open} onClose={()=>setOpen(false)} style={{zIndex:"10001"}}>
       <img src={img} alt={img}/>
      </Dialog>
    </div>
  );
}