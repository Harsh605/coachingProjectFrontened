import * as React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Privacypolicy() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <p style={{ cursor: "pointer" }} onClick={handleClickOpen('paper')} className='footer-links'>Privacy Policy</p>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h5>INTRODUCTION:-</h5>

            By using or accessing the platform in any way including resistering on the platform, using viewing sharing, embedding and or downloading any services you agree to be bound by the terms of use, you also accept and agree to be bound by instu talent hub policies, including but not limited to the instu talent hub privacy policy and the instu talent hub copyright policy.

            <br />
            <br />
            <h5>YOUR ACCOUNT:-</h5>

            You can become a resistered user of the platform by setting up password protected account with us in order to set up such an account you will be required to enter details of your resistered email id and password or you may login using the account details of any partner website.

            <br />
            <br />
            <h5>RESTRICTION AND TERMINATION OF USE:-</h5>

            Instu Talent Hub may block, restrict, disable,suspend or terminate your access to all or part of the free services offered on the platform at any time in instu talent hub 's Sole descretion without prior notice to you by instu talent hub.specifically in case of prolonged inactivity instu talent hub reserves the right to disable, diactivated for inactivity, the user name accociated with that account may be given to another user without notice to you or such other user party.if you violate the terms of use instu talent hub may at its Sole discreation block, restrict, disable, suspend or terminate the paid services offered on the platform.

            <br />
            <br />
            <h5>PRIVACY POLICY:-</h5>


            Your privacy is very important to us.users of our platform should refer to our privacy policy, which is incorporated into this tearms at use by reference, with respect to the disclosure, collection,storage,usaes and protection of your information during the course your interaction of your information during the course your interaction with the platform.

            <br />
            <br />
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}