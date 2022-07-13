import { TextField } from '@mui/material';



const Searchbar = (props: any) => {
  return (
    <>
      <TextField
        id="outlined-name"
        label="Search for..."
        value={props.searchValue}
        onChange={props.handleSearchValueChange}
      />
    </>
  );
}

export default Searchbar;