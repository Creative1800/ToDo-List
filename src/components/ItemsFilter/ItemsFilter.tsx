import { FormControl, MenuItem, Select } from '@mui/material';

const ItemsFilter = (props: any) => {

  return (
    <>
      <FormControl sx={{ minWidth: 150, marginX: 2 }}>
        <Select
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