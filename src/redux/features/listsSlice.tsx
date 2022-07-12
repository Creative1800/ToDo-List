import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

/* export const getTodosAsync: any = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    await axios.get('https://62c88f300f32635590da738f.mockapi.io/Lists')
    .then(response => {
      return response.data
    })
  }
) */

export const getListsAsync: any = createAsyncThunk( // nahradit axiosom
	'lists/getLists',
	async () => {
		const resp = await fetch('https://62c88f300f32635590da738f.mockapi.io/Lists');
		if (resp.ok) {
			const lists = await resp.json();
			return { lists };
		}
	}
);



/* axios.post('https://62c88f300f32635590da738f.mockapi.io/Lists', {
      "listName": listName,
      "tasks": []
    })
    .then(res => console.log(res)) */

export const addListAsync: any = createAsyncThunk(
  'lists/addLists',
  async (payload: any) => {
    const response = await fetch('https://62c88f300f32635590da738f.mockapi.io/Lists',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"listName": payload.listName, tasks: []})
    })
    if(response.ok) {
      const list = await response.json();
      return { list }
    }
  }

)

export const deleteListById: any = createAsyncThunk(
  'lists/deleteListById',
  async (payload: {"listId": number}) => {
    const response = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(response.ok) {
      const list = await response.json();
      console.log(list)
      return list.id 
    }
  }
)

const listSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getListsAsync.fulfilled as any]: (state: any, action: any) => {
      return action.payload.lists;
    },
    [addListAsync.fulfilled as any]: (state: any, action: any) => {
      console.log(state)
      state.push(action.payload.list)
    },
    [deleteListById.fulfilled as any]: (state: any, action: any) => {
      const navigate = useNavigate()
      navigate(`/lists/${action.payload-2}`)
      return state.filter((list: {"id": number}) => list.id !== action.payload)
    },
    
  }
})

//export const { addList } = listSlice.actions;

export default listSlice.reducer;