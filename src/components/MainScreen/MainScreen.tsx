import React, { useEffect } from 'react';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import Searchbar from '../Searchbar/Searchbar';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const MainScreen = () => {
  const params = useParams();


  return (
    <>
      <h2>List {params.id}</h2>
      <Divider />
      <Box 
        display='flex' 
        marginTop='2em'
        >
        <Searchbar />
        <ItemsFilter />
      </Box>
      <p color='primary'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Orci a scelerisque purus semper eget duis. Vulputate dignissim suspendisse in est ante. Mi eget mauris pharetra et ultrices. 
      Consequat nisl vel pretium lectus quam id leo in vitae. Ipsum dolor sit amet consectetur. Malesuada fames ac turpis egestas integer eget. 
      Vulputate sapien nec sagittis aliquam. Enim lobortis scelerisque fermentum dui faucibus in. Commodo elit at imperdiet dui accumsan 
      sit amet nulla. Egestas egestas fringilla phasellus faucibus scelerisque. Sed blandit libero volutpat sed cras ornare. Ultricies 
      tristique nulla aliquet enim. Amet luctus venenatis lectus magna fringilla urna. Nunc sed augue lacus viverra. Tincidunt augue 
      interdum velit euismod in pellentesque massa placerat. Varius sit amet mattis vulputate enim nulla aliquet. Egestas sed sed risus 
      pretium quam vulputate dignissim suspendisse.
      </p>
    </>
  );
}

export default MainScreen;
