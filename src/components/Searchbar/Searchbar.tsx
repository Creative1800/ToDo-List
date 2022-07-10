import { TextField } from '@mui/material';
import React from 'react';



const Searchbar = () => {
  
  const [name, setName] = React.useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-name"
        label="Search for..."
        value={name}
        onChange={handleNameChange}
      />
    </>
  );
}

export default Searchbar;