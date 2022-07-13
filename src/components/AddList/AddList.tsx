import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addListAsync } from '../../redux/features/listsSlice';


const AddList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    listName.length > 0 ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  },[listName])

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSubmit = (): void => {
    setOpen(false);
    
    dispatch(
      addListAsync({
        listName: listName,
    }))
    
    setListName('');
  }

  const handleChange = (e: ChangeEvent): void => {
    setListName((e.target as HTMLTextAreaElement).value)
  }

  return (
    <>
      <Button 
        variant="contained" 
        endIcon={<AddIcon />}
        onClick={handleClickOpen} 
        >
        Add List
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{minWidth: 500}}>Add New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 20 }}
            value={listName}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" disabled={isButtonDisabled} onClick={handleSubmit}>Add List</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddList