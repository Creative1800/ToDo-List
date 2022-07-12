import { Box } from '@mui/system'
import React from 'react'
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskBox = (props: any) => {
  
  
  const mappedTodos = props.todos.map((item: any) => {
    const date = new Date(item.deadline);
    console.log(date.toDateString())
    return (
      <Box
        width='100%'
        border="1px solid #d4d4d4"
        borderRadius={1}
        marginTop={3}
        padding=".5em 0"
        display='flex'
        key={ item.taskId}
        > 
          <Box marginTop={2} marginX={.5}>
            <Checkbox 
                sx={{
                  '&.Mui-checked': {
                    color: '#262d32',
                },
              }}
            />
          </Box>
          <Box marginRight={2} sx={{width: '100%'}}> 
            <Box display='flex' justifyContent='space-between'>
              <h2 >{ item.taskName }</h2>
              <Box display='flex' marginTop={1.5}>
                <p><span style={{ fontWeight: 'bold'}}>End Date: </span>{ date.toDateString() }</p>
                <Box>
                  <IconButton sx={{mt: .8, ml: 2}} aria-label="delete"  color="primary">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <p>{ item.plainText }</p>
          </Box>
      </Box>
    )
  })

  const noTasksYet = () => {
    return (
      <Box
        width='100%'
        borderRadius={1}
        marginTop={3}
        padding=".5em 0"
        >
        <p>No tasks yet!</p>
      </Box>
    )
  }

  return (
    <>
      { mappedTodos.length > 0 ? mappedTodos : noTasksYet()}
    </>
  )
}

export default TaskBox