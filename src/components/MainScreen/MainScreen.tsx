import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import Searchbar from '../Searchbar/Searchbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosByListId } from '../../redux/features/todoSlice';
import TaskBox from '../TaskBox/TaskBox';


const MainScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos);


  useEffect(() => {
    dispatch(
      getTodosByListId({
        id: params.id,
    }))
  },[dispatch, params.id])

    
  

  return (
    <>
      <Box 
        display='flex' 
        marginTop='2em'
        >
        <Searchbar />
        <ItemsFilter />
      </Box>
      <TaskBox todos={ todos } />
    </>
  );
}

export default MainScreen;
