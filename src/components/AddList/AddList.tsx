import React, { ChangeEvent, TextareaHTMLAttributes, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addList} from '../../redux/todoSlice';


const AddList = () => {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const dispatch = useDispatch() 

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
    
    /* axios.post('https://62c88f300f32635590da738f.mockapi.io/Lists', {
      "listName": listName,
      "tasks": []
    })
    .then(res => console.log(res)) */

    dispatch(addList({
      title: listName,
    }))
    
    setListName('');
  }

  const handleChange = (e: ChangeEvent): void => {
    setListName((e.target as HTMLTextAreaElement).value)
    console.log((e.target as HTMLTextAreaElement).value)
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
            required
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