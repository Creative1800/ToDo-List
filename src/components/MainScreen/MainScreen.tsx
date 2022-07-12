import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import Searchbar from '../Searchbar/Searchbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosByListId } from '../../redux/features/todoSlice';
import TaskBox from '../TaskBox/TaskBox';
import AddTask from '../AddTask/AddTask';


const MainScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos);
  const [ filterValue, setFilterValue ] = useState('10');

  const changeFilterValue = (value: string) => {
    setFilterValue(value)
  }


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
      <TaskBox todos={ todos } />
    </>
  );
}

export default MainScreen;
