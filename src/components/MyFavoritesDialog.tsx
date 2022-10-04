import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useFavoriteStore} from '../store/index'


export default function MyFavoriteDialog() {
  
const [open, setOpen] = React.useState(false);
const favorites = useFavoriteStore(state => state.favorites);

  const handleClickOpen = () => {
   setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="success" endIcon={<FavoriteIcon />} onClick={handleClickOpen}>
      {`My favorites characters (${favorites.length})`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`My favorites characters:`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
                {favorites.map((item) => <li>{item.name}</li>)}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
