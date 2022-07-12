import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Divider, Tab, Tabs, tabsClasses} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddList from '../AddList/AddList';
import { useSelector, useDispatch } from 'react-redux';
import { getListsAsync } from '../../redux/features/listsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteListById } from '../../redux/features/listsSlice' 


const Topbar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const lists: (Array<{"listName": "","tasks": [],"id": ""}>) = useSelector((state: any) => state.lists);
  const [ activeTabName, setActiveTabName ] = useState("");

  const listId:number = Number(window.location.pathname.charAt(window.location.pathname.length - 1));
  const [tabsValue, setTabsValue] = useState(listId ? listId - 1 : 0);
  
  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  const deleteList = () => {
    dispatch(
      deleteListById({
        listId: (tabsValue + 1),
    }))
  }


  useEffect(() => {
    dispatch(getListsAsync());

    
  },[dispatch])

  useEffect(() => {
    if(lists.length > 0) {
      setActiveTabName((lists[tabsValue].listName).toUpperCase())
    }
  }, [lists.length, tabsValue])

  /* useEffect(() => {
    axios.get('https://62c88f300f32635590da738f.mockapi.io/Lists')
    .then(response => {
      setLists(response.data)
    })
    .catch(err => console.log(err))
  },[]) */

  const listsNames = lists.map((item: any) => {
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
          width="95%"
          maxWidth={1150}
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
      <Box 
        display='flex' 
        flexDirection='column' 
        margin='0 auto'
        width='95%'
        maxWidth={1150}
        justifyContent="center"
        marginTop='2em'
        >
          <Box display='flex' justifyContent='space-between' paddingBottom={1}>
            <h2 style={{ margin: 0}}>{ activeTabName }</h2>
            <Button onClick={deleteList} variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box>
        <Divider style={{width:'100%'}}/>
      </Box>
    </>
  );
}

export default Topbar;
