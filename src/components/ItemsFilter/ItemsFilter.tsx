import React from 'react'
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos } from '../../redux/features/todoSlice';


const ItemsFilter = (props: any) => {
  //const [filterValue, setFilterValue] = React.useState('10');
  const todos = useSelector((state: any) => state.todos);

  return (
    <>
      <FormControl sx={{ minWidth: 150, marginX: 2 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.filterValue}
          onChange={props.changeFilterValue}
        >
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Active</MenuItem>
          <MenuItem value={30}>Completed</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default ItemsFilter