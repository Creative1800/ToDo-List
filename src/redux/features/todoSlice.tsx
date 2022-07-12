import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosByListId: any = createAsyncThunk( // nahradit axiosom
	'todo/getTodosByListId',
	async (payload: any) => {
		const resp = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.id}/task`);
		if (resp.ok) {
			const lists = await resp.json();
			return { lists };
		}
	}
);

export const addTodo: any = createAsyncThunk(
  'todo/addTodo',
  async (payload: any) => {
    const response = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "taskName": payload.todoName, 
        "description": payload.description,
        "done": false,
        "ListId": payload.listId,
        "deadline": payload.deadline
      })
    })
    if(response.ok) {
      const todo = await response.json();
      return { todo }
    }
  }
)

export const deleteTaskById: any = createAsyncThunk(
  'todo/deleteTaskById',
  async (payload: {'listId': string, 'taskId': string}) => {
    const response = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task/${payload.taskId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(response.ok) {
      const task = await response.json();
      return task.taskId
    }
  }
)

export const toggleIsTaskDone: any = createAsyncThunk(
  'todo/toggleIsTaskDone',
  async (payload: {'listId': string, 'taskId': string, 'done': boolean}) => {
    const response = await fetch(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task/${payload.taskId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({done: payload.done})
    })
    if(response.ok) {
      const task = await response.json();
      return {taskId: task.taskId, done: task.done}
    }
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    filterTodos: (state, action) => {
      const filteredState = state.filter((item: {done: boolean}) => {
        
        
      })

      return filteredState
    }
  },
  extraReducers: {
    [getTodosByListId.fulfilled as any]: (state: any, action: any) => {
      return action.payload.lists
    },
    [addTodo.fulfilled as any]: (state: any, action: any) => {
      state.push(action.payload.todo)
    },
    [deleteTaskById.fulfilled as any]: (state: any, action: any) => {
      return state.filter((task: {"taskId": number}) => task.taskId !== action.payload)
    },
    [toggleIsTaskDone.fulfilled as any]: (state: any, action: any) => {
      const index = state.findIndex(
        (task: {taskId: string}) => task.taskId === action.payload.taskId
      )
      state[index].done = action.payload.done
    }
  }
})

export const { filterTodos } = todoSlice.actions;

export default todoSlice.reducer;