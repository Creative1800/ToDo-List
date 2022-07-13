import { SyntheticEvent, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Divider, Tab, Tabs, tabsClasses, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddList from '../AddList/AddList';
import { useSelector, useDispatch } from 'react-redux';
import { getListsAsync } from '../../redux/features/listsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteListById } from '../../redux/features/listsSlice' 


const Topbar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const listId:number = Number(
    window.location.pathname.charAt(window.location.pathname.length - 1)
  );
  const lists: (Array<{"listName": "","tasks": [],"id": ""}>) = useSelector((state: any) => state.lists);
  
  const [ activeTabName, setActiveTabName ] = useState("");
  const [tabsValue, setTabsValue] = useState(listId ? listId - 1 : 0);
  
  
  useEffect(() => {
    dispatch(getListsAsync());
  },[dispatch])

  useEffect(() => {
    if(lists.find(item => Number(item.id) === tabsValue+1) === undefined && lists.length > 0) {
      setTabsValue(prevState => prevState - 1)
      navigate(`/lists/${Number(tabsValue)}`)
    }
  },[lists.length])

  useEffect(() => {
    if(lists.length > 0 && lists.find(
      (item) => Number(item.id) === listId) !== undefined) {
        setActiveTabName((lists[tabsValue].listName).toUpperCase())
    }
  }, [lists.length, listId, tabsValue])

  const handleTabsChange = (event: SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  const deleteList = () => {
    dispatch(
      deleteListById({
        listId: (listId),
    }))
  }

  const listsNames = lists.map(
    (item: {id: string, listName: string}) => {
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
            <Typography 
              variant='h4' 
              fontWeight='bold' 
              style={{margin: 0}}
              >
              { activeTabName }
            </Typography>
            <Button 
              onClick={deleteList} 
              variant="outlined" 
              startIcon={<DeleteIcon />}
              color='error'
              >
              Delete List
            </Button>
          </Box>
        <Divider style={{width:'100%'}}/>
      </Box>
    </>
  );
}

export default Topbar;
