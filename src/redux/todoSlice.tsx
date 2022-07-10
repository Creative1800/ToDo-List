import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

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
	'lists/getListsAsync',
	async () => {
		const resp = await fetch('https://62c88f300f32635590da738f.mockapi.io/Lists');
		if (resp.ok) {
			const lists = await resp.json();
			return { lists };
		}
	}
);

const listSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {
    addList: (state: any, action: any) => {
			const list = {
				id: Date.now(),
				title: action.payload.title,
				completed: false,
			};
			state.push(list);
		},
  },
  extraReducers: {
    [getListsAsync.fulfilled as any]: (state: any, action: any) => {
      return action.payload.lists;
    }
  }
})

export const { addList } = listSlice.actions;

export default listSlice.reducer;