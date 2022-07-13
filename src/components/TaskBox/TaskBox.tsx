import { Box } from '@mui/system';
import { Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTaskById, toggleIsTaskDone } from '../../redux/features/todoSlice';
import { useDispatch } from 'react-redux';

const TaskBox = (props: any) => {
  const dispatch = useDispatch();

  const deleteTask = (listId: string, taskId: string) => {
    dispatch(
      deleteTaskById({
        listId: listId,
        taskId: taskId
      })
    )
  }

  const toggleCheckbox = (isDone: boolean, taskId: string, listId: string) => {
    dispatch(
      toggleIsTaskDone({
        done: !isDone,
        taskId: taskId,
        listId: listId
      })
    )
  }

  const filteredTodos = () => {
    switch (props.filterValue) {
      case 30:
        return props.todos.filter((item: {done: boolean}) => item.done === true)
      case 20:
        return props.todos.filter((item: {done: boolean}) => item.done === false)
      default:
        return props.todos
    }
  }

  const searchedTodos = () => {
    if ( props.filterValue === '' ) return filteredTodos()
    return filteredTodos().filter(
      (item: {taskName: string}) => 
        item.taskName.toLowerCase().includes((props.searchValue).toLowerCase())
    )
  }

  const mappedTodos = searchedTodos().map((item: any) => {
    const date = new Date(item.deadline);
    return (
      <Box
        width='100%'
        border="1px solid #d4d4d4"
        borderRadius={1}
        marginBottom={3}
        padding=".5em 0"
        display='flex'
        key={ item.taskId}
        > 
          <Box marginTop={2} marginX={.5}>
            { item.done ?
              <Checkbox 
                checked={true}
                onChange={() => toggleCheckbox(true, item.taskId, item.ListId)}
                sx={{
                  '&.Mui-checked': {
                    color: '#262d32',
                },
              }}
              /> :
              
              <Checkbox 
                checked={false}
                onChange={() => toggleCheckbox(false, item.taskId, item.ListId)}
                sx={{
                  '&.Mui-checked': {
                    color: '#262d32',
                },
              }}
              />
              
            }
          </Box>
          <Box marginRight={2} marginBottom={2} sx={{width: '100%'}}> 
            <Box display='flex' justifyContent='space-between'>
              <h2 >{ item.taskName }</h2>
              <Box display='flex' justifyContent='space-between' minWidth={260} marginTop={1.5}>
                <p><span style={{ fontWeight: 'bold'}}>End Date: </span>{ date.toDateString() }</p>
                <Box>
                  <IconButton 
                    onClick={() => deleteTask(item.ListId, item.taskId)} 
                    sx={{mt: .8, ml: 2}} 
                    aria-label="delete" 
                    color="error"
                    >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography>{ item.description }</Typography>
            </Box>
          </Box>
      </Box>
    )
  })

  return (
    <>
      { 
      mappedTodos.length > 0 ? 
      mappedTodos : 
      <Box
        width='100%'
        borderRadius={1}
        marginTop={3}
        padding=".5em 0"
        >
        <Typography variant='h5'>{'No tasks!'.toUpperCase()}</Typography>
      </Box>
      }
    </>
  )
}

export default TaskBox