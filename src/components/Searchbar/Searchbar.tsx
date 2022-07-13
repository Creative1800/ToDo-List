import { TextField } from '@mui/material';
import React, { useState } from 'react';



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