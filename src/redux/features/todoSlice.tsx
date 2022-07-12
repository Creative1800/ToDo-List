import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLists: any = createAsyncThunk( // nahradit axiosom
	'lists/getTodos',
	async function() {
    return true
  }
);

export const getTodosByListId: any = createAsyncThunk( // nahradit axiosom
	'lists/getTodosByListId',
	async (payload: any) => {
		const resp = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.id}/task`);
		if (resp.ok) {
			const lists = await resp.json();
			return { lists };
		}
	}
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getTodosByListId.fulfilled as any]: (state: any, action: any) => {
      return action.payload.lists
    }
  }
})

//export const { addList } = listSlice.actions;

export default todoSlice.reducer;