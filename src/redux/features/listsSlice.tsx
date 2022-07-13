import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getListsAsync: any = createAsyncThunk(
	'lists/getLists',
	async () => {
		let lists = {}
    await axios.get('https://62c88f300f32635590da738f.mockapi.io/Lists')
		.then(res => lists = res.data)
    return { lists }
	}
);

export const addListAsync: any = createAsyncThunk(
  'lists/addLists',
  async (payload: {listName: string}) => {
    let list = {}
    await axios.post('https://62c88f300f32635590da738f.mockapi.io/Lists',{
      "listName": payload.listName, 
      tasks: []
    })
    .then(res => list = res.data)
    return { list }
  }
)

export const deleteListById: any = createAsyncThunk(
  'lists/deleteListById',
  async (payload: {"listId": number}) => {
    let id = 0
    await axios.delete(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}`)
    .then(res => id = res.data.id)
    return id
  }
) 

const listSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getListsAsync.fulfilled]: (state: any, action: any) => {
      return action.payload.lists;
    },
    [addListAsync.fulfilled]: (state: any, action: any) => {
      state.push(action.payload.list)
    },
    [deleteListById.fulfilled]: (state: any, action: any) => {
      return state.filter(
        (list: {"id": number}) => list.id !== action.payload
      )
    },
    
  }
})

export default listSlice.reducer;