import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Tab, Tabs, tabsClasses} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddList from '../AddList/AddList';


const Topbar = () => {
  const listId:number = Number(window.location.pathname.charAt(window.location.pathname.length - 1))
  let navigate = useNavigate()
  const [tabsValue, setTabsValue] = useState(listId ? listId - 1 : 0);
  const [lists, setLists] = useState<Array<any>>([])
  
  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  useEffect(() => {
    axios.get('https://62c88f300f32635590da738f.mockapi.io/Lists')
    .then(response => {
      setLists(response.data)
    })
    .catch(err => console.log(err))
  },[])

  const listsNames = lists.map(item => {
    return (
      <Tab 
        key={item.id}
        label={item.listName}
        onClick={() => navigate(`/lists/${Number(item.id)}`)}
      />
    )
  })

  return (
    <>
      <Box sx={{ 
          maxWidth: '100vw', 
          bgcolor: '#ccccc7'
        }}
          display='flex'
          justifyContent='center'
        >

        <Box 
          display="flex"
          justifyContent="space-between"
          width="100%"
          sx={{ 
            maxWidth: { xs: 320, sm: 480, lg: 1150 }, 
            color: '#262D32' 
          }}
        >
          <Tabs
            value={tabsValue}
            onChange={handleTabsChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor='primary'
            indicatorColor='primary'
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            { listsNames }
          </Tabs>
          <Box  minWidth="123px" margin="auto 0">
            <AddList />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Topbar;
