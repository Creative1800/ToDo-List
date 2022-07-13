import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addTodo } from '../../redux/features/todoSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const listId: string = window.location.pathname[window.location.pathname.length - 1];

  
  useEffect(() => {
    todoName.length > 0 && dateValue !== null ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  },[todoName, dateValue])

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSubmit = (): void => {
    setOpen(false);
    
    dispatch(
      addTodo({
        todoName: todoName,
        description: taskDescription,
        listId: listId,
        deadline: dateValue?.toISOString()
    }))
    
    resetDialog()
  }

  const resetDialog = () => {
    setTodoName('');
    setTaskDescription('');
    setDateValue(null)
  }

  return (
    <>
    <Button 
        variant="contained" 
        endIcon={<AddIcon />}
        onClick={handleClickOpen} 
        >
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{minWidth: 500}}>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            value={todoName}
            onChange={(e) => {
              setTodoName((e.target as HTMLTextAreaElement).value)
            }}
            sx={{
              marginBottom: 2
            }}
          />
          <TextField
            label="Task Description"
            value={taskDescription}
            fullWidth
            multiline
            inputProps={{ maxLength: 300 }}
            onChange={(e) => {
              setTaskDescription((e.target as HTMLTextAreaElement).value)
            }}
            rows={4}
            sx={{
              marginBottom: 2
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Task End Date"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" disabled={isButtonDisabled} onClick={handleSubmit}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddTask