import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import Searchbar from '../Searchbar/Searchbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosByListId } from '../../redux/features/todoSlice';
import TaskBox from '../TaskBox/TaskBox';
import AddTask from '../AddTask/AddTask';
import { SelectChangeEvent } from '@mui/material';


const MainScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos);
  const [ filterValue, setFilterValue ] = useState('10');

  const changeFilterValue = (event: SelectChangeEvent) => {
      setFilterValue(event.target.value as string);
  };


  useEffect(() => {
    dispatch(
      getTodosByListId({
        id: params.id,
    }))
  },[dispatch, params.id, todos.length])

  return (
    <>
      <Box 
        display='flex' 
        marginTop='2em'
        >
        <Box width='100%' marginBottom={3}>
          <Searchbar />
          <ItemsFilter 
            filterValue={filterValue}
            changeFilterValue={changeFilterValue}
          />
        </Box>
        <Box  minWidth="130px" margin="auto 0">
          <AddTask />
        </Box>
      </Box>
      <TaskBox 
        todos={ todos } 
        filterValue={filterValue}
        />
    </>
  );
}

export default MainScreen;
